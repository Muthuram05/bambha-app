'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { useAuth } from '@/context/AuthContext';
import { createClient } from '@/utils/supabase/client';
import styles from './profile.module.css';

const supabase = createClient();

const STATUS_STYLE = {
  pending:    { bg: '#fce4ec', color: '#c62828' },
  paid:       { bg: '#e8f5e9', color: '#2e7d32' },
  processing: { bg: '#fff8e1', color: '#f57f17' },
  shipped:    { bg: '#e3f2fd', color: '#1565c0' },
  delivered:  { bg: '#e8f5e9', color: '#2e7d32' },
  failed:     { bg: '#f3e5f5', color: '#6a1b9a' },
};

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function ProfilePage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => setOrders(data || []))
      .finally(() => setOrdersLoading(false));
  }, [user]);

  if (loading || !user) return null;

  const firstName = user.user_metadata?.first_name || '';
  const lastName = user.user_metadata?.last_name || '';
  const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'User';
  const initials = [firstName[0], lastName[0]].filter(Boolean).join('').toUpperCase() || user.email[0].toUpperCase();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>

          {/* Profile Card */}
          <div className={styles.profileCard}>
            <div className={styles.avatar}>{initials}</div>
            <div className={styles.profileInfo}>
              <h1 className={styles.name}>{fullName}</h1>
              <p className={styles.email}>{user.email}</p>
              <div className={styles.meta}>
                <span>Joined {new Date(user.created_at).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</span>
                <span className={styles.dot}>·</span>
                <span className={user.email_confirmed_at ? styles.verified : styles.unverified}>
                  {user.email_confirmed_at ? 'Verified' : 'Unverified'}
                </span>
              </div>
            </div>
            <button className={styles.signOutBtn} onClick={handleSignOut}>Sign out</button>
          </div>

          {/* Orders Section */}
          <div className={styles.ordersSection}>
            <h2 className={styles.sectionTitle}>Order History</h2>

            {ordersLoading ? (
              <div className={styles.skeletonList}>
                {[1, 2, 3].map(i => <div key={i} className={styles.skeletonRow} />)}
              </div>
            ) : orders.length === 0 ? (
              <div className={styles.emptyOrders}>
                <p>You haven't placed any orders yet.</p>
                <Link href="/products" className="btn-primary">Shop Now</Link>
              </div>
            ) : (
              <div className={styles.orderList}>
                {orders.map(order => {
                  const style = STATUS_STYLE[order.status] || STATUS_STYLE.pending;
                  const isOpen = expanded === order.id;
                  return (
                    <div key={order.id} className={styles.orderCard}>
                      <div className={styles.orderHeader} onClick={() => setExpanded(isOpen ? null : order.id)}>
                        <div className={styles.orderMeta}>
                          <span className={styles.orderId}>#{order.id.slice(0, 8).toUpperCase()}</span>
                          <span className={styles.orderDate}>{formatDate(order.created_at)}</span>
                        </div>
                        <div className={styles.orderRight}>
                          <span className={styles.orderAmount}>Rs. {order.amount / 100}</span>
                          <span className={styles.statusBadge} style={{ background: style.bg, color: style.color }}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                          <span className={styles.chevron}>{isOpen ? '▲' : '▼'}</span>
                        </div>
                      </div>

                      {isOpen && (
                        <div className={styles.orderDetail}>
                          <div className={styles.orderItems}>
                            {order.items?.map((item, i) => (
                              <div key={i} className={styles.orderItem}>
                                {item.image && (
                                  <div className={styles.itemImg}>
                                    <img src={item.image} alt={item.name} onError={e => e.target.style.display = 'none'} />
                                  </div>
                                )}
                                <div className={styles.itemInfo}>
                                  <p className={styles.itemName}>{item.name}</p>
                                  <p className={styles.itemMeta}>
                                    {item.weight && `${item.weight} · `}Qty: {item.qty}
                                  </p>
                                </div>
                                <p className={styles.itemPrice}>Rs. {item.price * item.qty}</p>
                              </div>
                            ))}
                          </div>

                          <div className={styles.orderFooter}>
                            <div className={styles.shippingInfo}>
                              <p className={styles.shippingLabel}>Shipping to</p>
                              <p>{order.shipping_address?.fullName}, {order.shipping_address?.address1}, {order.shipping_address?.city} – {order.shipping_address?.pincode}</p>
                            </div>
                            <div className={styles.totalInfo}>
                              <span>Total paid</span>
                              <strong>Rs. {order.amount / 100}</strong>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
