'use client';
import { useState, useEffect } from 'react';
import styles from './adminProducts.module.css';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const { data, error } = await res.json();
      if (error) throw new Error(error);
      setProducts(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch('/api/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const { error } = await res.json();
      if (error) throw new Error(error);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  return (
    <div>
      <h1 className={styles.heading}>All Product List</h1>

      {error && <p className={styles.error}>{error}</p>}

      {loading ? (
        <p className={styles.loading}>Loading products…</p>
      ) : products.length === 0 ? (
        <p className={styles.empty}>No products found. Add your first product.</p>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Weight</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className={styles.imgCell}>
                      <img
                        src={p.main_image || '/images/logo.png'}
                        alt={p.name}
                        onError={(e) => { e.target.src = '/images/logo.png'; }}
                      />
                    </div>
                  </td>
                  <td className={styles.nameCell}>{p.name}</td>
                  <td>{p.weights?.join(', ') || '—'}</td>
                  <td>Rs. {p.price}</td>
                  <td>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(p.id)}
                      aria-label="Delete product"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
