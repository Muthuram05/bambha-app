'use client';
import { useState } from 'react';
import styles from './ReviewSection.module.css';

const mockReviews = [
  { id: 1, name: 'Revathi', rating: 5, date: '16/11/2025', text: '"I\'ve tried many sugar alternatives, and this monk fruit sweetener powder is by far the best!' },
  { id: 2, name: 'Revathi', rating: 5, date: '17/11/2025', text: 'It tastes natural, dissolves easily in drinks and baking, and has zero unpleasant aftertaste. Perfect for my coffee and oatmeal — finally a sweetener I actually enjoy!' },
  { id: 3, name: 'Revathi', rating: 5, date: '20/11/2025', text: 'I use this monk fruit sweetener powder every day in my coffee and tea. It dissolves instantly and gives just the right amount of sweetness without tasting fake.' },
  { id: 4, name: 'Revathi', rating: 5, date: '24/11/2025', text: 'It mixes beautifully in hot and cold drinks, from coffee and tea to iced drinks and smoothies. I also used it in baking: brownies, muffins, pancakes – and the results were amazing.' },
  { id: 5, name: 'Revathi', rating: 5, date: '16/11/2025', text: 'This monk fruit sweetener has become a staple in my kitchen! No weird taste, no calories, and works perfectly in all my recipes. Highly recommend' },
  { id: 6, name: 'Revathi', rating: 5, date: '17/11/2025', text: 'It tastes natural, dissolves easily in drinks and baking, and has zero unpleasant aftertaste. Perfect for my coffee and oatmeal.' },
  { id: 7, name: 'Revathi', rating: 5, date: '26/11/2025', text: 'Swapped sugar for monk fruit sweetener powder – same sweetness, zero guilt! Loving it in my morning latte and baking experiments' },
  { id: 8, name: 'Revathi', rating: 5, date: '20/11/2025', text: 'I use this monk fruit sweetener powder every day in my coffee and tea. It dissolves instantly and gives just the right amount of sweetness without tasting fake.' },
];

const SORT_OPTIONS = ['Most Recent', 'Highest Rating', 'Lowest Rating', 'Pictures First'];
const PER_PAGE = 6;

export default function ReviewSection({ product }) {
  const [sort, setSort] = useState('Most Recent');
  const [sortOpen, setSortOpen] = useState(false);
  const [page, setPage] = useState(1);

  const sorted = [...mockReviews].sort((a, b) => {
    if (sort === 'Highest Rating') return b.rating - a.rating;
    if (sort === 'Lowest Rating') return a.rating - b.rating;
    return 0;
  });

  const visible = sorted.slice(0, page * PER_PAGE);

  return (
    <div className={styles.section}>
      {/* Summary */}
      <div className={styles.summary}>
        <div className={styles.summaryLeft}>
          <div className={styles.bigRating}>{product.rating} out of 5</div>
          <div className={styles.stars}>{'★'.repeat(5)}</div>
          <p className={styles.basedOn}>Based on {product.reviews} reviews</p>
        </div>
        <div className={styles.breakdown}>
          {Object.entries(product.ratingBreakdown).reverse().map(([star, count]) => (
            <div key={star} className={styles.barRow}>
              <span className={styles.starLabel}>{'★'.repeat(Number(star))}</span>
              <div className={styles.barTrack}>
                <div
                  className={styles.barFill}
                  style={{ width: `${(count / product.reviews) * 100}%` }}
                />
              </div>
              <span className={styles.barCount}>{count}</span>
            </div>
          ))}
        </div>
        <button className={styles.writeBtn}>write a review</button>
      </div>

      <h2 className={styles.title}>Customer Reviews</h2>

      {/* Sort */}
      <div className={styles.sortRow}>
        <div className={styles.sortWrap}>
          <button className={styles.sortBtn} onClick={() => setSortOpen(!sortOpen)}>
            {sort} <span>∨</span>
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
      <div className={styles.grid}>
        {visible.map((r) => (
          <div key={r.id} className={styles.card}>
            <div className={styles.cardTop}>
              <span className={styles.cardStars}>{'★'.repeat(r.rating)}</span>
              <span className={styles.cardDate}>{r.date}</span>
            </div>
            <div className={styles.reviewer}>
              <div className={styles.avatar}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <span className={styles.reviewerName}>{r.name}</span>
            </div>
            <p className={styles.reviewText}>{r.text}</p>
          </div>
        ))}
      </div>

      {visible.length < sorted.length && (
        <div className={styles.loadMore}>
          <button className={`btn-primary ${styles.loadBtn}`} onClick={() => setPage(p => p + 1)}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
