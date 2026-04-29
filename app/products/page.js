'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { useCart } from '@/context/CartContext';
import styles from './products.module.css';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cart, addToCart, updateQty } = useCart();

  const getCartItem = (p) => {
    const weight = p.weight_options?.[0] || null;
    return cart.find(c => c.id === p.id && c.weight === weight) || null;
  };

  const handleAdd = (e, p) => {
    e.preventDefault();
    addToCart(p, p.weight_options?.[0] || null, p.price, 1);
  };

  const handleInc = (e, p) => {
    e.preventDefault();
    const weight = p.weight_options?.[0] || null;
    const item = getCartItem(p);
    if (item) updateQty(p.id, weight, item.qty + 1);
  };

  const handleDec = (e, p) => {
    e.preventDefault();
    const weight = p.weight_options?.[0] || null;
    const item = getCartItem(p);
    if (item) updateQty(p.id, weight, item.qty - 1);
  };

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
          {/* <div className={styles.breadcrumb}>
            <Link href="/">Home</Link> &rsaquo; <span>Our Products</span>
          </div> */}
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
              {products.map((p) => {
                const cartItem = getCartItem(p);
                return (
                  <div key={p.id} className={styles.card}>
                    <Link href={`/products/${p.id}`} className={styles.cardLink}>
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
                        <div className={styles.stars}>
                          {p.avg_rating && p.avg_rating > 0
                            ? '★'.repeat(Math.round(p.avg_rating)) + '☆'.repeat(5 - Math.round(p.avg_rating))
                            : '☆☆☆☆☆'}
                        </div>
                        {p.review_count > 0 && (
                          <p className={styles.ratingText}>{Number(p.avg_rating).toFixed(1)} ({p.review_count})</p>
                        )}
                        <div className={styles.pricing}>
                          <span className={styles.price}>Rs. {p.price}</span>
                          {p.mrp && p.mrp > p.price && (
                            <span className={styles.originalPrice}>Rs. {p.mrp}</span>
                          )}
                        </div>
                      </div>
                    </Link>
                    <div className={styles.cartRow}>
                      {cartItem ? (
                        <div className={styles.qtyControl}>
                          <button onClick={(e) => handleDec(e, p)} className={styles.qtyBtn}>−</button>
                          <span className={styles.qtyNum}>{cartItem.qty}</span>
                          <button onClick={(e) => handleInc(e, p)} className={styles.qtyBtn}>+</button>
                        </div>
                      ) : (
                        <button onClick={(e) => handleAdd(e, p)} className={styles.addBtn}>Add to Cart</button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
