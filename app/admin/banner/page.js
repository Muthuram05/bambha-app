'use client';
import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import styles from './banner.module.css';

const supabase = createClient();

export default function BannerPage() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [form, setForm] = useState({ title: '', redirect_url: '', is_active: true });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    setLoading(true);
    const res = await fetch('/api/banners');
    const { data } = await res.json();
    setBanners(data || []);
    setLoading(false);
  };

  const handleFilePick = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFilePick(e.dataTransfer.files[0]);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    if (!imageFile) { setError('Please upload a banner image.'); return; }
    if (!form.title.trim()) { setError('Please enter a banner name.'); return; }

    setSaving(true);
    try {
      // Upload image to Supabase Storage
      const ext = imageFile.name.split('.').pop();
      const fileName = `banner_${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from('banners').upload(fileName, imageFile);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('banners').getPublicUrl(fileName);

      const nextOrder = banners.length > 0
        ? Math.max(...banners.map(b => b.display_order)) + 1
        : 1;

      const { data, error: insertErr } = await supabase.from('banners').insert({
        title: form.title,
        image_url: publicUrl,
        redirect_url: form.redirect_url || null,
        display_order: nextOrder,
        is_active: form.is_active,
      }).select().single();
      if (insertErr) throw insertErr;

      setBanners(prev => [...prev, data].sort((a, b) => a.display_order - b.display_order));
      setForm({ title: '', redirect_url: '', is_active: true });
      setImageFile(null);
      setImagePreview(null);
      setSuccess('Banner saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm({ title: '', redirect_url: '', is_active: true });
    setImageFile(null);
    setImagePreview(null);
    setError('');
  };

  const handleToggleActive = async (banner) => {
    // Optimistic update
    setBanners(prev => prev.map(b => b.id === banner.id ? { ...b, is_active: !b.is_active } : b));
    const { error } = await supabase
      .from('banners')
      .update({ is_active: !banner.is_active })
      .eq('id', banner.id);
    // Revert on failure
    if (error) setBanners(prev => prev.map(b => b.id === banner.id ? { ...b, is_active: banner.is_active } : b));
  };

  const handleDelete = async (banner) => {
    if (!confirm(`Delete banner "${banner.title}"?`)) return;
    // Remove from storage
    if (banner.image_url) {
      const path = banner.image_url.split('/banners/')[1];
      if (path) await supabase.storage.from('banners').remove([path]);
    }
    const { error } = await supabase.from('banners').delete().eq('id', banner.id);
    if (!error) setBanners(prev => prev.filter(b => b.id !== banner.id));
  };

  const handleMove = async (index, direction) => {
    const newBanners = [...banners];
    const swapIndex = index + direction;
    if (swapIndex < 0 || swapIndex >= newBanners.length) return;

    // Swap display_order values
    const tempOrder = newBanners[index].display_order;
    newBanners[index] = { ...newBanners[index], display_order: newBanners[swapIndex].display_order };
    newBanners[swapIndex] = { ...newBanners[swapIndex], display_order: tempOrder };
    newBanners.sort((a, b) => a.display_order - b.display_order);
    setBanners(newBanners);

    await Promise.all([
      supabase.from('banners').update({ display_order: newBanners[index].display_order }).eq('id', newBanners[index].id),
      supabase.from('banners').update({ display_order: newBanners[swapIndex].display_order }).eq('id', newBanners[swapIndex].id),
    ]);
  };

  return (
    <div className={styles.page}>
      {/* Add New Banner Form */}
      <div className={styles.formCard}>
        <h2 className={styles.cardTitle}>Add New Banner</h2>

        {success && <p className={styles.successMsg}>{success}</p>}
        {error && <p className={styles.errorMsg}>{error}</p>}

        <form onSubmit={handleSave}>
          <div className={styles.field}>
            <label className={styles.label}>Product Name</label>
            <input
              className={styles.input}
              placeholder="Your Banner Title"
              value={form.title}
              onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Upload Banner Image</label>
            <div
              className={`${styles.dropZone} ${dragging ? styles.dragging : ''}`}
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className={styles.hiddenInput}
                onChange={e => handleFilePick(e.target.files[0])}
              />
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className={styles.dropPreviewImg} />
              ) : (
                <div className={styles.dropContent}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.5">
                    <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
                    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
                  </svg>
                  <p className={styles.dropText}>Drag & Drop Image Here or <span className={styles.browseLink}>Browse Files</span></p>
                  <p className={styles.dropHint}>Recommended Size : 1920 × 600px | JPG, PNG, WEBP | Max Size : 5MB</p>
                </div>
              )}
            </div>
          </div>

          {imagePreview && (
            <div className={styles.field}>
              <label className={styles.label}>Preview</label>
              <div className={styles.bannerPreview}>
                <img src={imagePreview} alt="Banner preview" />
              </div>
            </div>
          )}

          <div className={styles.field}>
            <label className={styles.label}>Redirect URL</label>
            <input
              className={styles.input}
              placeholder="https://www.example.com"
              value={form.redirect_url}
              onChange={e => setForm(p => ({ ...p, redirect_url: e.target.value }))}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Status</label>
            <div className={styles.toggleRow}>
              <button
                type="button"
                className={`${styles.toggle} ${form.is_active ? styles.toggleOn : ''}`}
                onClick={() => setForm(p => ({ ...p, is_active: !p.is_active }))}
                aria-label="Toggle active"
              >
                <span className={styles.toggleThumb} />
              </button>
              <span className={styles.toggleLabel}>{form.is_active ? 'Active' : 'Inactive'}</span>
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={handleCancel}>Cancel</button>
            <button type="submit" className={styles.saveBtn} disabled={saving}>
              {saving ? 'Saving…' : 'Save Banner'}
            </button>
          </div>
        </form>
      </div>

      {/* Banner List */}
      <div className={styles.listCard}>
        <h2 className={styles.cardTitle}>All Banners</h2>

        {loading ? (
          <p className={styles.loadingText}>Loading…</p>
        ) : banners.length === 0 ? (
          <p className={styles.emptyText}>No banners yet.</p>
        ) : (
          <div className={styles.bannerList}>
            {banners.map((banner, index) => (
              <div key={banner.id} className={styles.bannerRow}>
                <div className={styles.reorderBtns}>
                  <button
                    className={styles.reorderBtn}
                    onClick={() => handleMove(index, -1)}
                    disabled={index === 0}
                    title="Move up"
                  >▲</button>
                  <button
                    className={styles.reorderBtn}
                    onClick={() => handleMove(index, 1)}
                    disabled={index === banners.length - 1}
                    title="Move down"
                  >▼</button>
                </div>

                <div className={styles.bannerThumb}>
                  <img src={banner.image_url} alt={banner.title} />
                </div>

                <div className={styles.bannerInfo}>
                  <p className={styles.bannerTitle}>{banner.title}</p>
                  {banner.redirect_url && (
                    <p className={styles.bannerUrl}>{banner.redirect_url}</p>
                  )}
                  <p className={styles.bannerOrder}>Order: {banner.display_order}</p>
                </div>

                <div className={styles.bannerActions}>
                  <button
                    type="button"
                    className={`${styles.toggle} ${styles.toggleSm} ${banner.is_active ? styles.toggleOn : ''}`}
                    onClick={() => handleToggleActive(banner)}
                    aria-label="Toggle active"
                  >
                    <span className={styles.toggleThumb} />
                  </button>
                  <span className={`${styles.statusLabel} ${banner.is_active ? styles.active : styles.inactive}`}>
                    {banner.is_active ? 'Active' : 'Inactive'}
                  </span>
                  <button className={styles.deleteBtn} onClick={() => handleDelete(banner)}>✕</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
