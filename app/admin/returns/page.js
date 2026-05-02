'use client';
import { useState, useEffect } from 'react';
import styles from './returns.module.css';

const RETURN_STATUS_STYLE = {
  requested: { bg: '#fff8e1', color: '#f57f17' },
  approved:  { bg: '#e8f5e9', color: '#2e7d32' },
  rejected:  { bg: '#fce4ec', color: '#c62828' },
  refunded:  { bg: '#e3f2fd', color: '#1565c0' },
};

const ADMIN_STATUS_OPTIONS = ['approved', 'rejected', 'refunded'];

function formatDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

function formatAmount(paise) {
  return `Rs. ${paise / 100}`;
}

export default function AdminReturnsPage() {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [notes, setNotes] = useState({}); // { [returnId]: string }
  const [savingNotes, setSavingNotes] = useState(null);

  useEffect(() => {
    fetch('/api/admin/returns')
      .then(res => res.json())
      .then(({ data, error }) => {
        if (error) setError(error);
        else {
          setReturns(data || []);
          const initialNotes = {};
          (data || []).forEach(r => { initialNotes[r.id] = r.admin_notes || ''; });
          setNotes(initialNotes);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (returnId, newStatus, currentStatus) => {
    if (newStatus === currentStatus) return;
    setUpdatingId(returnId);
    const res = await fetch('/api/admin/returns', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: returnId, status: newStatus }),
    });
    const { data, error } = await res.json();
    setUpdatingId(null);
    if (error) { alert('Update failed: ' + error); return; }
    setReturns(prev => prev.map(r => r.id === returnId ? { ...r, status: data.status } : r));
  };

  const handleSaveNotes = async (returnId, currentStatus) => {
    setSavingNotes(returnId);
    const res = await fetch('/api/admin/returns', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: returnId, status: currentStatus, admin_notes: notes[returnId] || '' }),
    });
    const { data, error } = await res.json();
    setSavingNotes(null);
    if (error) { alert('Failed to save notes: ' + error); return; }
    setReturns(prev => prev.map(r => r.id === returnId ? { ...r, admin_notes: data.admin_notes } : r));
  };

  const toggleExpand = (id) => setExpanded(prev => prev === id ? null : id);

  if (loading) return <p className={styles.loading}>Loading returns…</p>;
  if (error) return <p className={styles.errorText}>{error}</p>;

  return (
    <div>
      <div className={styles.headerRow}>
        <h1 className={styles.heading}>Returns</h1>
        <span className={styles.count}>{returns.length} total</span>
      </div>

      {returns.length === 0 ? (
        <p className={styles.empty}>No return requests yet.</p>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Return ID</th>
                <th>Customer</th>
                <th>Order ID</th>
                <th>Amount</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Date</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {returns.map((r) => {
                const style = RETURN_STATUS_STYLE[r.status] || RETURN_STATUS_STYLE.requested;
                const isExpanded = expanded === r.id;
                const order = r.orders;

                return (
                  <>
                    <tr key={r.id} className={isExpanded ? styles.expandedRow : ''}>
                      <td className={styles.returnId}>#{r.id.slice(0, 8).toUpperCase()}</td>
                      <td>
                        <p className={styles.customerName}>{order?.shipping_address?.fullName || '—'}</p>
                        <p className={styles.customerPhone}>{order?.shipping_address?.phone || ''}</p>
                      </td>
                      <td className={styles.orderId}>#{(order?.id || '').slice(0, 8).toUpperCase()}</td>
                      <td className={styles.amount}>{order ? formatAmount(order.amount) : '—'}</td>
                      <td className={styles.reasonCell}>{r.reason}</td>
                      <td>
                        <select
                          className={styles.statusSelect}
                          style={{ background: style.bg, color: style.color }}
                          value={r.status}
                          disabled={updatingId === r.id}
                          onChange={e => handleStatusChange(r.id, e.target.value, r.status)}
                        >
                          <option value="requested">Requested</option>
                          {ADMIN_STATUS_OPTIONS.map(s => (
                            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                          ))}
                        </select>
                      </td>
                      <td className={styles.date}>{formatDate(r.created_at)}</td>
                      <td>
                        <button className={styles.expandBtn} onClick={() => toggleExpand(r.id)}>
                          {isExpanded ? '▲' : '▼'}
                        </button>
                      </td>
                    </tr>

                    {isExpanded && (
                      <tr key={`${r.id}-detail`} className={styles.detailRow}>
                        <td colSpan={8}>
                          <div className={styles.detailGrid}>
                            {/* Return reason + admin notes */}
                            <div className={styles.detailSection}>
                              <p className={styles.detailTitle}>Return Reason</p>
                              <p className={styles.reasonFull}>{r.reason}</p>

                              <p className={styles.detailTitle} style={{ marginTop: 16 }}>Admin Notes</p>
                              <div className={styles.notesSection}>
                                <textarea
                                  className={styles.notesTextarea}
                                  value={notes[r.id] ?? ''}
                                  onChange={e => setNotes(prev => ({ ...prev, [r.id]: e.target.value }))}
                                  placeholder="Add internal notes…"
                                  rows={3}
                                />
                                <button
                                  className={styles.saveNotesBtn}
                                  disabled={savingNotes === r.id}
                                  onClick={() => handleSaveNotes(r.id, r.status)}
                                >
                                  {savingNotes === r.id ? 'Saving…' : 'Save Notes'}
                                </button>
                              </div>
                            </div>

                            {/* Order items */}
                            <div className={styles.detailSection}>
                              <p className={styles.detailTitle}>Items Ordered</p>
                              {order?.items?.map((item, i) => (
                                <div key={i} className={styles.detailItem}>
                                  {item.image && (
                                    <div className={styles.detailImg}>
                                      <img src={item.image} alt={item.name} onError={e => e.target.style.display = 'none'} />
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
                              <p>{order?.shipping_address?.fullName}</p>
                              <p>{order?.shipping_address?.address1}</p>
                              {order?.shipping_address?.address2 && <p>{order.shipping_address.address2}</p>}
                              <p>{order?.shipping_address?.city}, {order?.shipping_address?.state} – {order?.shipping_address?.pincode}</p>
                              <p>📞 {order?.shipping_address?.phone}</p>
                              <p className={styles.detailTitle} style={{ marginTop: 12 }}>Payment</p>
                              <p><span className={styles.metaLabel}>Payment ID:</span> {order?.razorpay_payment_id}</p>
                              <p><span className={styles.metaLabel}>Amount:</span> {order ? formatAmount(order.amount) : '—'}</p>
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
