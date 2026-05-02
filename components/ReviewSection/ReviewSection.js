'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import styles from './ReviewSection.module.css';

const SORT_OPTIONS = ['Most Recent', 'Highest Rating', 'Lowest Rating'];
const PER_PAGE = 6;

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className={styles.starPicker}>
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          className={styles.starPickerBtn}
          style={{ color: n <= (hovered || value) ? 'var(--gold)' : '#ccc' }}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(n)}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function ReviewSection({ productId, avgRating, reviewCount }) {
  const { user, profile } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [sort, setSort] = useState('Most Recent');
  const [sortOpen, setSortOpen] = useState(false);
  const [page, setPage] = useState(1);

  // Write review modal
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ reviewer_name: '', rating: 0, review_body: '' });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    if (!productId) return;
    fetch(`/api/reviews?product_id=${productId}`)
      .then(res => res.json())
      .then(({ data }) => setReviews(data || []))
      .finally(() => setLoadingReviews(false));
  }, [productId]);

  useEffect(() => {
    if (modalOpen && user) {
      const name = profile?.first_name
        ? `${profile.first_name}${profile.last_name ? ' ' + profile.last_name : ''}`
        : user.user_metadata?.first_name || '';
      setForm(f => ({ ...f, reviewer_name: name }));
    }
  }, [modalOpen, user, profile]);

  const sorted = [...reviews].sort((a, b) => {
    if (sort === 'Highest Rating') return b.rating - a.rating;
    if (sort === 'Lowest Rating') return a.rating - b.rating;
    return new Date(b.created_at) - new Date(a.created_at);
  });

  const visible = sorted.slice(0, page * PER_PAGE);

  // Compute breakdown from actual reviews
  const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach(r => { if (breakdown[r.rating] !== undefined) breakdown[r.rating]++; });

  const displayAvg = reviews.length > 0
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(2)
    : avgRating?.toFixed(2) || '0.00';
  const displayCount = reviews.length || reviewCount || 0;

  const handleWriteReview = () => {
    if (!user) { window.location.href = '/login'; return; }
    setFormError('');
    setFormSuccess(false);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.rating === 0) { setFormError('Please select a rating.'); return; }
    if (!form.reviewer_name.trim()) { setFormError('Please enter your name.'); return; }
    if (!form.review_body.trim()) { setFormError('Please write a review.'); return; }

    setSubmitting(true);
    setFormError('');

    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: productId, ...form }),
    });
    const json = await res.json();
    setSubmitting(false);

    if (!res.ok) {
      setFormError(json.error || 'Failed to submit review.');
      return;
    }

    setFormSuccess(true);
    setReviews(prev => [json.data, ...prev]);
    setForm({ reviewer_name: '', rating: 0, review_body: '' });
    setTimeout(() => { setModalOpen(false); setFormSuccess(false); }, 1500);
  };

  return (
    <div className={styles.section}>
      {/* Summary */}
      <div className={styles.summary}>
        <div className={styles.summaryLeft}>
          <div className={styles.bigRating}>{displayAvg} out of 5</div>
          <div className={styles.stars}>{'★'.repeat(Math.round(Number(displayAvg)))}{'☆'.repeat(5 - Math.round(Number(displayAvg)))}</div>
          <p className={styles.basedOn}>Based on {displayCount} reviews</p>
        </div>
        <div className={styles.breakdown}>
          {[5, 4, 3, 2, 1].map(star => (
            <div key={star} className={styles.barRow}>
              <span className={styles.starLabel}>{'★'.repeat(star)}</span>
              <div className={styles.barTrack}>
                <div
                  className={styles.barFill}
                  style={{ width: displayCount > 0 ? `${(breakdown[star] / displayCount) * 100}%` : '0%' }}
                />
              </div>
              <span className={styles.barCount}>{breakdown[star]}</span>
            </div>
          ))}
        </div>
        <button className={styles.writeBtn} onClick={handleWriteReview}>
          Write a review
        </button>
      </div>

      <h2 className={styles.title}>Customer Reviews</h2>

      {/* Sort */}
      <div className={styles.sortRow}>
        <div className={styles.sortWrap}>
          <button className={styles.sortBtn} onClick={() => setSortOpen(!sortOpen)}>
            {sort} <img src="/left-arrow.png" alt="" className={`${styles.sortArrow} ${sortOpen ? styles.sortArrowOpen : ''}`} />
          </button>
          {sortOpen && (
            <div className={styles.dropdown}>
              {SORT_OPTIONS.map(opt => (
                <button
                  key={opt}
                  className={`${styles.dropItem} ${sort === opt ? styles.dropActive : ''}`}
                  onClick={() => { setSort(opt); setSortOpen(false); }}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Reviews Grid */}
      {loadingReviews ? (
        <div className={styles.grid}>
          {[1, 2, 3].map(i => <div key={i} className={styles.skeletonCard} />)}
        </div>
      ) : visible.length === 0 ? (
        <p className={styles.noReviews}>No reviews yet. Be the first to review this product!</p>
      ) : (
        <div className={styles.grid}>
          {visible.map((r) => (
            <div key={r.id} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.cardStars}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                <span className={styles.cardDate}>{formatDate(r.created_at)}</span>
              </div>
              <div className={styles.reviewer}>
                <div className={styles.avatar}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <span className={styles.reviewerName}>{r.reviewer_name}</span>
              </div>
              <p className={styles.reviewText}>{r.body}</p>
            </div>
          ))}
        </div>
      )}

      {visible.length < sorted.length && (
        <div className={styles.loadMore}>
          <button className={`btn-primary ${styles.loadBtn}`} onClick={() => setPage(p => p + 1)}>
            Load More
          </button>
        </div>
      )}

      {/* Write Review Modal */}
      {modalOpen && (
        <div className={styles.modalOverlay} onClick={() => setModalOpen(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Write a Review</h3>
              <button className={styles.modalClose} onClick={() => setModalOpen(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {formSuccess ? (
              <p className={styles.formSuccess}>Review submitted! Thank you.</p>
            ) : (
              <form onSubmit={handleSubmit} className={styles.reviewForm}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Rating</label>
                  <StarPicker value={form.rating} onChange={v => setForm(f => ({ ...f, rating: v }))} />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Your Name</label>
                  <input
                    className={styles.modalInput}
                    type="text"
                    value={form.reviewer_name}
                    onChange={e => setForm(f => ({ ...f, reviewer_name: e.target.value }))}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Review</label>
                  <textarea
                    className={styles.modalTextarea}
                    value={form.review_body}
                    onChange={e => setForm(f => ({ ...f, review_body: e.target.value }))}
                    placeholder="Share your experience with this product..."
                    rows={4}
                    required
                  />
                </div>

                {formError && <p className={styles.formError}>{formError}</p>}

                <div className={styles.modalActions}>
                  <button type="button" className={styles.cancelBtn} onClick={() => setModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className={styles.submitBtn} disabled={submitting}>
                    {submitting ? 'Submitting…' : 'Submit Review'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
