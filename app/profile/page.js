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

const RETURN_STATUS_STYLE = {
  requested: { bg: '#fff8e1', color: '#f57f17' },
  approved:  { bg: '#e8f5e9', color: '#2e7d32' },
  rejected:  { bg: '#fce4ec', color: '#c62828' },
  refunded:  { bg: '#e3f2fd', color: '#1565c0' },
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
  const [returns, setReturns] = useState([]);
  const [returnModal, setReturnModal] = useState(null); // order_id or null
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [modalError, setModalError] = useState('');

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading]);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false }),
      fetch('/api/returns').then(r => r.json()),
    ]).then(([{ data: ordersData }, { data: returnsData }]) => {
      setOrders(ordersData || []);
      setReturns(returnsData || []);
    }).finally(() => setOrdersLoading(false));
  }, [user]);

  if (loading || !user) return null;

  const firstName = user.user_metadata?.first_name || '';
  const lastName = user.user_metadata?.last_name || '';
  const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'User';
  const initials = [firstName[0], lastName[0]].filter(Boolean).join('').toUpperCase() || user.email[0].toUpperCase();

  const returnsByOrderId = Object.fromEntries(returns.map(r => [r.order_id, r]));

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const openReturnModal = (e, orderId) => {
    e.stopPropagation();
    setReturnModal(orderId);
    setReason('');
    setModalError('');
  };

  const closeReturnModal = () => {
    setReturnModal(null);
    setReason('');
    setModalError('');
  };

  const handleReturnSubmit = async () => {
    if (!reason.trim()) {
      setModalError('Please describe the reason for your return.');
      return;
    }
    setSubmitting(true);
    setModalError('');
    try {
      const res = await fetch('/api/returns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: returnModal, reason }),
      });
      const json = await res.json();
      if (!res.ok) {
        setModalError(json.error || 'Failed to submit return request.');
        return;
      }
      setReturns(prev => [json.data, ...prev]);
      closeReturnModal();
    } catch {
      setModalError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
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
                  const existingReturn = returnsByOrderId[order.id];
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
                          {order.status === 'delivered' && (
                            existingReturn ? (
                              <span
                                className={styles.returnBadge}
                                style={{
                                  background: RETURN_STATUS_STYLE[existingReturn.status].bg,
                                  color: RETURN_STATUS_STYLE[existingReturn.status].color,
                                }}
                              >
                                Return: {existingReturn.status.charAt(0).toUpperCase() + existingReturn.status.slice(1)}
                              </span>
                            ) : (
                              <button className={styles.returnBtn} onClick={e => openReturnModal(e, order.id)}>
                                Return
                              </button>
                            )
                          )}
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

                          {existingReturn && (
                            <div className={styles.returnDetail}>
                              <p className={styles.returnDetailLabel}>Return Request</p>
                              <p className={styles.returnDetailReason}>{existingReturn.reason}</p>
                              {existingReturn.admin_notes && (
                                <p className={styles.returnDetailNotes}>Admin note: {existingReturn.admin_notes}</p>
                              )}
                            </div>
                          )}
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

      {/* Return Request Modal */}
      {returnModal && (
        <div className={styles.modalBackdrop} onClick={closeReturnModal}>
          <div className={styles.modalCard} onClick={e => e.stopPropagation()}>
            <p className={styles.modalTitle}>Request a Return</p>
            <p className={styles.modalOrderId}>Order #{returnModal.slice(0, 8).toUpperCase()}</p>
            <textarea
              className={styles.reasonTextarea}
              placeholder="Describe why you'd like to return this order…"
              value={reason}
              onChange={e => setReason(e.target.value)}
              rows={4}
            />
            {modalError && <p className={styles.modalError}>{modalError}</p>}
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={closeReturnModal} disabled={submitting}>
                Cancel
              </button>
              <button className={styles.submitBtn} onClick={handleReturnSubmit} disabled={submitting}>
                {submitting ? 'Submitting…' : 'Submit Request'}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
