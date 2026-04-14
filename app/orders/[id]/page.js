'use client';
import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { createClient } from '@/utils/supabase/client';
import styles from './order.module.css';

const supabase = createClient();

export default function OrderSuccessPage({ params }) {
  const { id } = use(params);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => setOrder(data))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {loading ? null : !order ? (
          <div className={styles.container}>
            <p className={styles.notFound}>Order not found.</p>
          </div>
        ) : (
          <div className={styles.container}>
            <div className={styles.successIcon}>
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>

            <h1 className={styles.title}>Order Confirmed!</h1>
            <p className={styles.subtitle}>Thank you for your purchase. We'll send you a shipping update soon.</p>

            <div className={styles.card}>
              <div className={styles.row}>
                <span className={styles.rowLabel}>Order ID</span>
                <span className={styles.rowValue}>{order.id.slice(0, 8).toUpperCase()}</span>
              </div>
              <div className={styles.row}>
                <span className={styles.rowLabel}>Payment ID</span>
                <span className={styles.rowValue}>{order.razorpay_payment_id}</span>
              </div>
              <div className={styles.row}>
                <span className={styles.rowLabel}>Amount Paid</span>
                <span className={styles.rowValue}>Rs. {order.amount / 100}</span>
              </div>
              <div className={styles.row}>
                <span className={styles.rowLabel}>Status</span>
                <span className={`${styles.rowValue} ${styles.paid}`}>Paid</span>
              </div>
            </div>

            {order.items?.length > 0 && (
              <div className={styles.itemsSection}>
                <h2 className={styles.itemsTitle}>Items Ordered</h2>
                {order.items.map((item, i) => (
                  <div key={i} className={styles.item}>
                    {item.image && (
                      <div className={styles.itemImg}>
                        <img src={item.image} alt={item.name} onError={e => e.target.style.display = 'none'} />
                      </div>
                    )}
                    <div className={styles.itemInfo}>
                      <p className={styles.itemName}>{item.name}</p>
                      <p className={styles.itemMeta}>{item.weight && `${item.weight} · `}Qty: {item.qty}</p>
                    </div>
                    <p className={styles.itemPrice}>Rs. {item.price * item.qty}</p>
                  </div>
                ))}
              </div>
            )}

            <div className={styles.address}>
              <h2 className={styles.itemsTitle}>Shipping To</h2>
              <p>{order.shipping_address?.fullName}</p>
              <p>{order.shipping_address?.address1}</p>
              {order.shipping_address?.address2 && <p>{order.shipping_address.address2}</p>}
              <p>{order.shipping_address?.city}, {order.shipping_address?.state} – {order.shipping_address?.pincode}</p>
              <p>📞 {order.shipping_address?.phone}</p>
            </div>

            <div className={styles.actions}>
              <Link href="/products" className="btn-primary">Continue Shopping</Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
