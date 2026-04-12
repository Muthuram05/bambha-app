'use client';
import { motion } from 'framer-motion';
import styles from './WelcomeSection.module.css';

const stats = [
  { value: '150x', label: 'Sweeter than sugar' },
  { value: '0', label: 'Calories per serving' },
  { value: '0', label: 'Glycemic index' },
  { value: '5+', label: 'Pack sizes available' },
];

export default function WelcomeSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          className={styles.left}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.eyebrow}>Our Story</span>
          <h2 className={styles.heading}>Welcome to <br /><span>BamBha</span></h2>
          <p className={styles.sub}>Created with a strong focus on metabolic health</p>
          <p className={styles.desc}>
            BamBha is an Indian wellness brand specializing in natural, zero-calorie sugar alternatives,
            primarily focused on monkfruit (luo han guo) extract — established to promote healthier
            lifestyles for those with a family history of diabetes. A direct 1:1 replacement for
            traditional sugar and artificial sweeteners like aspartame and erythritol.
          </p>

          <div className={styles.blocks}>
            <div className={styles.block}>
              <div className={styles.blockIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
                </svg>
              </div>
              <div>
                <p className={styles.blockTitle}>Mission</p>
                <p className={styles.blockText}>
                  To provide a guilt-free sweetening experience that empowers users to enjoy the sweetness of life without compromising metabolic health.
                </p>
              </div>
            </div>
            <div className={styles.block}>
              <div className={styles.blockIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div>
                <p className={styles.blockTitle}>Transparency</p>
                <p className={styles.blockText}>
                  We emphasize "Clean Sweetness" — declaring all ingredients upfront so they are simple and recognizable.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={styles.right}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className={styles.statsCard}>
            <p className={styles.statsHeading}>By the Numbers</p>
            <div className={styles.statsGrid}>
              {stats.map((s) => (
                <div key={s.label} className={styles.statItem}>
                  <span className={styles.statValue}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
            <div className={styles.availability}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              Available in 100G · 200G · 250G · 400G · 500G
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
