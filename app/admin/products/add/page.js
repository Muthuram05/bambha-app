'use client';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import styles from './addProduct.module.css';

const WEIGHTS = ['100gm', '150gm', '200gm', '250gm', '400gm', '500gm', '1kg'];

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
  const [form, setForm] = useState({ name: '', description: '', mrp: '', price: '' });
  const [selectedWeights, setSelectedWeights] = useState([]);
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

  const toggleWeight = (w) => {
    setSelectedWeights(prev =>
      prev.includes(w) ? prev.filter(x => x !== w) : [...prev, w]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Upload main image
      let mainImageUrl = null;
      if (mainImage) {
        mainImageUrl = await uploadImage(mainImage, 'main');
      }

      // Upload gallery images
      const galleryUrls = await Promise.all(
        gallery.map(file => file ? uploadImage(file, 'gallery') : null)
      );

      // Insert product into Supabase
      const { error: insertError } = await supabase.from('products').insert({
        name: form.name,
        description: form.description,
        mrp: parseFloat(form.mrp),
        price: parseFloat(form.price),
        weights: selectedWeights,
        main_image: mainImageUrl,
        gallery: galleryUrls.filter(Boolean),
      });

      if (insertError) throw insertError;

      // Reset form
      setForm({ name: '', description: '', mrp: '', price: '' });
      setSelectedWeights([]);
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

      {/* Upload Image Section */}
      <h2 className={styles.sectionTitle}>Upload Image</h2>

      {/* Product Image */}
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

      {/* Product Gallery */}
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

      {/* Form */}
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
          <textarea
            className={styles.textarea}
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Write Content  here"
            rows={6}
          />
        </div>

        <div className={styles.bottomRow}>
          <div className={styles.priceGroup}>
            <div className={styles.priceField}>
              <label className={styles.fieldLabel}>MRP</label>
              <input
                className={styles.priceInput}
                name="mrp"
                type="number"
                value={form.mrp}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.priceField}>
              <label className={styles.fieldLabel}>Price</label>
              <input
                className={styles.priceInput}
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.weightGroup}>
            <label className={styles.fieldLabel}>Weight</label>
            <div className={styles.weightPills}>
              {WEIGHTS.map((w) => (
                <button
                  key={w}
                  type="button"
                  className={`${styles.pill} ${selectedWeights.includes(w) ? styles.pillActive : ''}`}
                  onClick={() => toggleWeight(w)}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button type="submit" className={styles.addBtn} disabled={loading}>
          {loading ? 'Saving…' : 'Add'}
        </button>
      </form>
    </div>
  );
}
