'use client';
import { useState, useEffect } from 'react';
import styles from './orders.module.css';

const STATUS_OPTIONS = ['pending', 'paid', 'processing', 'shipped', 'delivered', 'failed'];

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
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
}

function formatAmount(paise) {
  return `Rs. ${paise / 100}`;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetch('/api/admin/orders')
      .then(res => res.json())
      .then(({ data, error }) => {
        if (error) setError(error);
        else setOrders(data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    const res = await fetch('/api/admin/orders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: orderId, status: newStatus }),
    });
    const { data, error } = await res.json();
    setUpdatingId(null);
    if (error) { alert('Update failed: ' + error); return; }
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: data.status } : o));
  };

  const toggleExpand = (id) => setExpanded(prev => prev === id ? null : id);

  if (loading) return <p className={styles.loading}>Loading orders…</p>;
  if (error) return <p className={styles.errorText}>{error}</p>;

  return (
    <div>
      <div className={styles.headerRow}>
        <h1 className={styles.heading}>Orders</h1>
        <span className={styles.count}>{orders.length} total</span>
      </div>

      {orders.length === 0 ? (
        <p className={styles.empty}>No orders yet.</p>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => {
                const style = STATUS_STYLE[o.status] || STATUS_STYLE.pending;
                const isExpanded = expanded === o.id;
                const itemsSummary = o.items?.map(i => `${i.name?.split('|')[0].trim()} x${i.qty}`).join(', ') || '—';

                return (
                  <>
                    <tr key={o.id} className={isExpanded ? styles.expandedRow : ''}>
                      <td className={styles.orderId}>#{o.id.slice(0, 8).toUpperCase()}</td>
                      <td>
                        <p className={styles.customerName}>{o.shipping_address?.fullName || '—'}</p>
                        <p className={styles.customerPhone}>{o.shipping_address?.phone || ''}</p>
                      </td>
                      <td className={styles.itemsCell}>{itemsSummary}</td>
                      <td className={styles.amount}>{formatAmount(o.amount)}</td>
                      <td>
                        <select
                          className={styles.statusSelect}
                          style={{ background: style.bg, color: style.color }}
                          value={o.status}
                          disabled={updatingId === o.id}
                          onChange={e => handleStatusChange(o.id, e.target.value)}
                        >
                          {STATUS_OPTIONS.map(s => (
                            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                          ))}
                        </select>
                      </td>
                      <td className={styles.date}>{formatDate(o.created_at)}</td>
                      <td>
                        <button className={styles.expandBtn} onClick={() => toggleExpand(o.id)}>
                          {isExpanded ? '▲' : '▼'}
                        </button>
                      </td>
                    </tr>

                    {isExpanded && (
                      <tr key={`${o.id}-detail`} className={styles.detailRow}>
                        <td colSpan={7}>
                          <div className={styles.detailGrid}>
                            {/* Items */}
                            <div className={styles.detailSection}>
                              <p className={styles.detailTitle}>Items Ordered</p>
                              {o.items?.map((item, i) => (
                                <div key={i} className={styles.detailItem}>
                                  {item.image && (
                                    <div className={styles.detailImg}>
                                      <img src={item.image} alt={item.name} onError={e => e.target.style.display='none'} />
                                    </div>
                                  )}
                                  <div>
                                    <p className={styles.detailItemName}>{item.name}</p>
                                    <p className={styles.detailItemMeta}>
                                      {item.weight && `${item.weight} · `}Qty: {item.qty} · Rs. {item.price * item.qty}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Shipping */}
                            <div className={styles.detailSection}>
                              <p className={styles.detailTitle}>Shipping Address</p>
                              <p>{o.shipping_address?.fullName}</p>
                              <p>{o.shipping_address?.address1}</p>
                              {o.shipping_address?.address2 && <p>{o.shipping_address.address2}</p>}
                              <p>{o.shipping_address?.city}, {o.shipping_address?.state} – {o.shipping_address?.pincode}</p>
                              <p>📞 {o.shipping_address?.phone}</p>
                            </div>

                            {/* Payment */}
                            <div className={styles.detailSection}>
                              <p className={styles.detailTitle}>Payment</p>
                              <p><span className={styles.metaLabel}>Razorpay Order:</span> {o.razorpay_order_id}</p>
                              <p><span className={styles.metaLabel}>Payment ID:</span> {o.razorpay_payment_id}</p>
                              <p><span className={styles.metaLabel}>Amount:</span> {formatAmount(o.amount)}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
