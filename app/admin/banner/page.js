'use client';
import { useState } from 'react';
import styles from './banner.module.css';

export default function BannerPage() {
  const [form, setForm] = useState({ title: 'Naturally Sweet', subtitle: 'Zero Sugar_ Pure Health', image: null });
  const [preview, setPreview] = useState('/images/hero-product.png');
  const [saved, setSaved] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm(prev => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Upload to Supabase storage and update banner record
    console.log('Saving banner:', form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <h1 className={styles.heading}>Banner Update</h1>
      {saved && <div className={styles.successMsg}>✅ Banner updated successfully!</div>}

      <div className={styles.preview}>
        <p className={styles.previewLabel}>Current Banner Preview</p>
        <div className={styles.bannerPreview}>
          <img src={preview} alt="Banner preview" />
          <div className={styles.bannerOverlay}>
            <p className={styles.bannerTitle}>{form.title}</p>
            <p className={styles.bannerSubtitle}>{form.subtitle}</p>
          </div>
        </div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label}>Banner Title</label>
          <input
            className={styles.input}
            value={form.title}
            onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
            placeholder="Banner headline"
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Banner Subtitle</label>
          <input
            className={styles.input}
            value={form.subtitle}
            onChange={e => setForm(p => ({ ...p, subtitle: e.target.value }))}
            placeholder="Subtitle text"
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Upload Banner Image</label>
          <input type="file" accept="image/*" onChange={handleImage} className={styles.fileInput} />
        </div>
        <button type="submit" className={styles.submitBtn}>Save Banner</button>
      </form>
    </div>
  );
}
