'use client';
import { motion } from 'framer-motion';
import styles from './KeyFeatures.module.css';

const features = [
  {
    title: 'Natural Ingredients',
    desc: 'Our flagship Monkfruit Sweetener is plant-based and contains no artificial preservatives or fillers.',
    image: null,
    color: '#eef5e6',
  },
  {
    title: null,
    desc: null,
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&q=80',
    alt: 'Monkfruit bowl with fresh ingredients',
  },
  {
    title: 'Versatility',
    desc: 'Unlike many sweeteners, BamBha\'s formula remains stable under heat, making them suitable for baking and cooking in addition to beverages.',
    image: null,
    color: '#eef5e6',
  },
  {
    title: null,
    desc: null,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
    alt: 'Coffee beverage with sweetener',
  },
  {
    title: null,
    desc: null,
    image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=600&q=80',
    alt: 'Family using BamBha',
  },
  {
    title: 'Health Focused',
    desc: 'The products are marketed as diabetic-friendly, keto-friendly, and safe for all age groups due to having a zero glycemic impact.',
    image: null,
    color: '#eef5e6',
  },
  {
    title: null,
    desc: null,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    alt: 'Cooking with BamBha sweetener',
  },
  {
    title: 'Taste Profile',
    desc: 'Unlike many sweeteners, BamBha\'s formula remains stable under heat, making them suitable for baking and cooking in addition to beverages.',
    image: null,
    color: '#eef5e6',
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
          <h2 className={styles.title}>KEY PRODUCT <span>FEATURES</span></h2>
          <div className={styles.titleLine} />
        </motion.div>

        <div className={styles.bento}>
          {features.map((f, i) => (
            <motion.div
              key={i}
              className={`${styles.cell} ${f.image ? styles.imageCell : styles.textCell}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.08 }}
              style={!f.image ? { background: f.color } : {}}
            >
              {f.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={f.image} alt={f.alt} className={styles.cellImg} />
              ) : (
                <div className={styles.textContent}>
                  <h3 className={styles.cellTitle}>{f.title} <span className={styles.dot}>›</span></h3>
                  <p className={styles.cellDesc}>{f.desc}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
