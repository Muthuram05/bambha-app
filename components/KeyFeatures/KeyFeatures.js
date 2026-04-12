'use client';
import { motion } from 'framer-motion';
import styles from './KeyFeatures.module.css';

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2a10 10 0 0 1 10 10c0 4-2.5 7.5-6 9.5"/>
        <path d="M12 2C8 2 4 5 4 9c0 2.5 1.5 5 4 7"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    title: 'Natural Ingredients',
    desc: 'Our flagship Monkfruit Sweetener is 100% plant-based and contains no artificial preservatives or fillers.',
    color: '#eef5e6',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/>
      </svg>
    ),
    title: 'Versatility',
    desc: "BamBha's formula stays stable under heat — perfect for baking, cooking, and beverages without any compromise.",
    color: '#e8f4fd',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    title: 'Health Focused',
    desc: 'Diabetic-friendly, keto-friendly, and safe for all age groups with zero glycemic impact on blood sugar levels.',
    color: '#fdf3e8',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 12.5s1.5 2 4 2 4-2 4-2"/>
        <path d="M9 9h.01M15 9h.01"/>
      </svg>
    ),
    title: 'Taste Profile',
    desc: 'No bitter aftertaste. BamBha delivers the pure, clean sweetness of real sugar — 150x sweeter with zero calories.',
    color: '#f3e8fd',
  },
];

export default function KeyFeatures() {
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
          <span className={styles.eyebrow}>What Sets Us Apart</span>
          <h2 className={styles.title}>Key Product <span>Features</span></h2>
        </motion.div>

        <div className={styles.grid}>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className={styles.iconWrap} style={{ background: f.color }}>
                <span className={styles.iconInner}>{f.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
