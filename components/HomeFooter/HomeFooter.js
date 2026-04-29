import Link from 'next/link';
import styles from './HomeFooter.module.css';

const cards = [
  {
    href: '/contact',
    label: 'Contact us',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.64 3.38 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
  {
    href: '/terms',
    label: 'Terms and services',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
  {
    href: '/shipping-policy',
    label: 'Shipping, Refund and cancellation policy',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="1" y="3" width="15" height="13" rx="1"/>
        <path d="M16 8h4l3 5v3h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
  {
    href: '/privacy-policy',
    label: 'Privacy policy',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <circle cx="12" cy="11" r="2"/>
        <path d="M12 13v3"/>
      </svg>
    ),
  },
  {
    href: '/return-policy',
    label: 'Return and Refund policy',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 1 0 .49-4.95"/>
      </svg>
    ),
  },
  
];

export default function HomeFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.row1}>
          {cards.slice(0, 3).map((card) => (
            <Link key={card.href} href={card.href} className={styles.card}>
              <img src="/single-left.png" alt="" className={styles.leafLeft} aria-hidden="true" />
              <img src="/single-left.png" alt="" className={styles.leafRight} aria-hidden="true" />
              <div className={styles.iconCircle}>{card.icon}</div>
              <span className={styles.label}>{card.label}</span>
            </Link>
          ))}
        </div>
        <div className={styles.row2}>
          {cards.slice(3).map((card) => (
            <Link key={card.href} href={card.href} className={styles.card}>
              <img src="/single-left.png" alt="" className={styles.leafLeft} aria-hidden="true" />
              <img src="/single-left.png" alt="" className={styles.leafRight} aria-hidden="true" />
              <div className={styles.iconCircle}>{card.icon}</div>
              <span className={styles.label}>{card.label}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; 2026, Bambha.</p>
      </div>
    </footer>
  );
}
