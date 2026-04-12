'use client';
import { motion } from 'framer-motion';
import styles from './Benefits.module.css';

const benefits = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        <path d="M8 12.5s1.5 2 4 2 4-2 4-2"/>
        <path d="M9 9h.01M15 9h.01"/>
      </svg>
    ),
    label: '100% Natural',
    desc: 'No artificial additives or preservatives',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10"/>
        <line x1="8" y1="12" x2="16" y2="12"/>
      </svg>
    ),
    label: 'Zero Calories',
    desc: 'Guilt-free sweetness every time',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    label: 'No Bitter After Taste',
    desc: 'Pure, clean taste like real sugar',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    label: 'Diabetic Friendly',
    desc: 'Zero glycemic index impact',
  },
];

export default function Benefits() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.eyebrow}>Why BamBha</span>
          <h2 className={styles.title}>Benefits of <span>BamBha</span></h2>
        </motion.div>

        <div className={styles.grid}>
          {benefits.map((b, i) => (
            <motion.div
              key={b.label}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className={styles.iconWrap}>{b.icon}</div>
              <h3 className={styles.cardLabel}>{b.label}</h3>
              <p className={styles.cardDesc}>{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
