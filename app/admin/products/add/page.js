'use client';
import { useState } from 'react';
import styles from './addProduct.module.css';

export default function AddProductPage() {
  const [form, setForm] = useState({
    name: '',
    category: '',
    weight: '',
    price: '',
    originalPrice: '',
    description: '',
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm(prev => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to Supabase to insert product
    console.log('Submitting product:', form);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div>
      <h1 className={styles.heading}>Add New Product</h1>
      {success && <div className={styles.successMsg}>✅ Product added successfully!</div>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label}>Product Name *</label>
          <input
            className={styles.input}
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Monkfruit Sweetener Powder"
            required
          />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>Category *</label>
            <select className={styles.input} name="category" value={form.category} onChange={handleChange} required>
              <option value="">Select category</option>
              <option value="Sweetener">Sweetener</option>
              <option value="Superfood">Superfood</option>
            </select>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Weight *</label>
            <input
              className={styles.input}
              name="weight"
              value={form.weight}
              onChange={handleChange}
              placeholder="e.g. 100gm"
              required
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>Price (Rs.) *</label>
            <input
              className={styles.input}
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="e.g. 159"
              required
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Original Price (Rs.)</label>
            <input
              className={styles.input}
              name="originalPrice"
              type="number"
              value={form.originalPrice}
              onChange={handleChange}
              placeholder="e.g. 300"
            />
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Description</label>
          <textarea
            className={styles.textarea}
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Product description..."
            rows={4}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Product Image</label>
          <input
            type="file"
            accept="image/*"
            className={styles.fileInput}
            onChange={handleImage}
          />
          {preview && (
            <div className={styles.preview}>
              <img src={preview} alt="Preview" />
            </div>
          )}
        </div>

        <button type="submit" className={styles.submitBtn}>Add Product</button>
      </form>
    </div>
  );
}
