'use client';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import RichTextEditor from '@/components/RichTextEditor/RichTextEditor';
import styles from './addProduct.module.css';

const supabase = createClient();

async function uploadImage(file, folder) {
  const ext = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { data, error } = await supabase.storage.from('products').upload(fileName, file);
  if (error) throw error;
  const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(data.path);
  return publicUrl;
}

export default function AddProductPage() {
  const [form, setForm] = useState({ name: '', description: '' });
  const [weightRows, setWeightRows] = useState([{ weight: '', price: '', mrp: '' }]);
  const [mainImage, setMainImage] = useState(null);
  const [mainPreview, setMainPreview] = useState(null);
  const [gallery, setGallery] = useState([null, null, null]);
  const [galleryPreviews, setGalleryPreviews] = useState([null, null, null]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleMainImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(file);
      setMainPreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryImage = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newGallery = [...gallery];
      const newPreviews = [...galleryPreviews];
      newGallery[index] = file;
      newPreviews[index] = URL.createObjectURL(file);
      setGallery(newGallery);
      setGalleryPreviews(newPreviews);
    }
  };

  const addWeightRow = () => {
    setWeightRows(prev => [...prev, { weight: '', price: '', mrp: '' }]);
  };

  const removeWeightRow = (index) => {
    setWeightRows(prev => prev.filter((_, i) => i !== index));
  };

  const updateWeightRow = (index, field, value) => {
    setWeightRows(prev => prev.map((row, i) => i === index ? { ...row, [field]: value } : row));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate weight rows
    for (const row of weightRows) {
      if (!row.weight.trim() || !row.price || !row.mrp) {
        setError('Please fill in weight, price, and MRP for all weight options.');
        setLoading(false);
        return;
      }
    }

    try {
      let mainImageUrl = null;
      if (mainImage) {
        mainImageUrl = await uploadImage(mainImage, 'main');
      }

      const galleryUrls = await Promise.all(
        gallery.map(file => file ? uploadImage(file, 'gallery') : null)
      );

      const weights = weightRows.map(r => ({
        weight: r.weight.trim(),
        price: parseFloat(r.price),
        mrp: parseFloat(r.mrp),
      }));

      // Store first weight's price/mrp at top level for backward compat
      const { error: insertError } = await supabase.from('products').insert({
        name: form.name,
        description: form.description,
        price: weights[0].price,
        mrp: weights[0].mrp,
        weights,
        main_image: mainImageUrl,
        gallery: galleryUrls.filter(Boolean),
      });

      if (insertError) throw insertError;

      setForm({ name: '', description: '' });
      setWeightRows([{ weight: '', price: '', mrp: '' }]);
      setMainImage(null);
      setMainPreview(null);
      setGallery([null, null, null]);
      setGalleryPreviews([null, null, null]);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      {success && <div className={styles.successMsg}>✅ Product added successfully!</div>}
      {error && <div className={styles.errorMsg}>❌ {error}</div>}

      <h2 className={styles.sectionTitle}>Upload Image</h2>

      <div className={styles.uploadRow}>
        <div className={styles.uploadLabel}>
          <p className={styles.labelTitle}>Product Image</p>
          <p className={styles.labelSub}>Check Image Quality</p>
        </div>
        <label className={styles.uploadBox}>
          <input type="file" accept="image/*" hidden onChange={handleMainImage} />
          {mainPreview ? (
            <img src={mainPreview} alt="Main" className={styles.uploadedImg} />
          ) : (
            <>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.5">
                <polyline points="16 16 12 12 8 16"/>
                <line x1="12" y1="12" x2="12" y2="21"/>
                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
              </svg>
              <span className={styles.uploadText}>Upload</span>
            </>
          )}
        </label>
      </div>

      <div className={styles.uploadRow}>
        <div className={styles.uploadLabel}>
          <p className={styles.labelTitle}>Product Gallery</p>
          <p className={styles.labelSub}>Check Image Quality</p>
        </div>
        <div className={styles.galleryRow}>
          <label className={styles.uploadBox}>
            <input type="file" accept="image/*" hidden onChange={(e) => handleGalleryImage(e, 0)} />
            {galleryPreviews[0] ? (
              <img src={galleryPreviews[0]} alt="Gallery 1" className={styles.uploadedImg} />
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/><line x1="12" y1="8" x2="12" y2="14"/>
                <line x1="9" y1="11" x2="15" y2="11"/>
              </svg>
            )}
          </label>
          {[1, 2].map((i) => (
            <label key={i} className={styles.gallerySlot}>
              <input type="file" accept="image/*" hidden onChange={(e) => handleGalleryImage(e, i)} />
              {galleryPreviews[i] ? (
                <img src={galleryPreviews[i]} alt={`Gallery ${i + 1}`} className={styles.uploadedImg} />
              ) : (
                <svg width="100%" height="100%" viewBox="0 0 100 100" className={styles.xIcon}>
                  <line x1="0" y1="0" x2="100" y2="100" stroke="#ccc" strokeWidth="1.5"/>
                  <line x1="100" y1="0" x2="0" y2="100" stroke="#ccc" strokeWidth="1.5"/>
                </svg>
              )}
            </label>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label className={styles.fieldLabel}>Product Name</label>
          <input
            className={styles.input}
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Type here"
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.fieldLabel}>Product Description</label>
          <RichTextEditor
            value={form.description}
            onChange={(html) => setForm(prev => ({ ...prev, description: html }))}
          />
        </div>

        {/* Weight + Price rows */}
        <div className={styles.field}>
          <label className={styles.fieldLabel}>Weight Options & Pricing</label>
          <div className={styles.weightTable}>
            <div className={styles.weightTableHeader}>
              <span>Weight</span>
              <span>Price (Rs)</span>
              <span>MRP (Rs)</span>
              <span></span>
            </div>
            {weightRows.map((row, i) => (
              <div key={i} className={styles.weightTableRow}>
                <input
                  className={styles.weightInput}
                  placeholder="e.g. 250gm"
                  value={row.weight}
                  onChange={e => updateWeightRow(i, 'weight', e.target.value)}
                  required
                />
                <input
                  className={styles.weightInput}
                  type="number"
                  placeholder="199"
                  value={row.price}
                  onChange={e => updateWeightRow(i, 'price', e.target.value)}
                  required
                />
                <input
                  className={styles.weightInput}
                  type="number"
                  placeholder="249"
                  value={row.mrp}
                  onChange={e => updateWeightRow(i, 'mrp', e.target.value)}
                  required
                />
                <button
                  type="button"
                  className={styles.removeRowBtn}
                  onClick={() => removeWeightRow(i)}
                  disabled={weightRows.length === 1}
                >
                  ✕
                </button>
              </div>
            ))}
            <button type="button" className={styles.addRowBtn} onClick={addWeightRow}>
              + Add weight
            </button>
          </div>
        </div>

        <button type="submit" className={styles.addBtn} disabled={loading}>
          {loading ? 'Saving…' : 'Add'}
        </button>
      </form>
    </div>
  );
}
