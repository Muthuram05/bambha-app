'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import styles from './products.module.css';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(({ data }) => setProducts(data || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link> &rsaquo; <span>Our Products</span>
          </div>
          <h1 className={styles.heading}>Our Products</h1>

          {loading ? (
            <div className={styles.loadingGrid}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={styles.skeleton} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <p className={styles.empty}>No products available yet.</p>
          ) : (
            <div className={styles.grid}>
              {products.map((p) => (
                <Link href={`/products/${p.id}`} key={p.id} className={styles.card}>
                  <div className={styles.imgWrap}>
                    <img
                      src={p.main_image || '/images/logo.png'}
                      alt={p.name}
                      onError={(e) => { e.target.src = '/images/logo.png'; }}
                    />
                  </div>
                  <div className={styles.info}>
                    <p className={styles.category}>{p.category || 'Natural'}</p>
                    <h3 className={styles.name}>{p.name}</h3>
                    <div className={styles.stars}>{'★'.repeat(5)}</div>
                    <div className={styles.pricing}>
                      <span className={styles.price}>Rs. {p.price}</span>
                      {p.mrp && p.mrp > p.price && (
                        <span className={styles.originalPrice}>Rs. {p.mrp}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
