'use client';
import { motion } from 'framer-motion';
import styles from './Benefits.module.css';

const benefits = [
  { img: '/images/benefits/1.png', label: '100% Natural' },
  { img: '/images/benefits/2.png', label: 'Zero Calories' },
  { img: '/images/benefits/3.png', label: 'No Bitter After Taste' },
  { img: '/images/benefits/4.png', label: 'Diabetic Friendly' },
  { img: '/images/benefits/5.png', label: 'Safe For All Ages' },
  { img: '/images/benefits/6.png', label: 'No Preservatives' },
  { img: '/images/benefits/7.png', label: 'Zero Calories' },
  { img: '/images/benefits/8.png', label: 'No Bitter After Taste' },
  { img: '/images/benefits/9.png', label: 'Diabetic Friendly' },
  { img: '/images/benefits/10.png', label: 'No Preservatives' },
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
          <h2 className={styles.title}>
            BENEFITS OF <span>BAMBHA</span>
          </h2>
          <div className={styles.titleLine} />
        </motion.div>
      </div>

      <div className={styles.marqueeWrapper}>
        <div className={styles.marqueeTrack}>
          {[...benefits, ...benefits].map((b, i) => (
            <div key={i} className={styles.item}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.img} alt={b.label} className={styles.badge} />
              <p className={styles.label}>{b.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
