'use client';
import { motion } from 'framer-motion';
import styles from './WhyChoose.module.css';

const reasons = [
  {
    number: '01',
    title: 'The Perfect 1:1 Replacement',
    desc: 'Forget complicated math. BamBha is formulated to match the sweetness of sugar exactly. Whether you\'re baking a cake or sweetening your morning coffee, just swap sugar for BamBha — teaspoon for teaspoon.',
    image: '/images/1.png',
    alt: 'Woman enjoying BamBha sweetener with her morning coffee',
  },
  {
    number: '02',
    title: 'Zero Calories. Zero Guilt.',
    desc: 'BamBha is the ultimate choice for diabetics, keto enthusiasts, and weight-conscious eaters. With zero calories and zero net carbs, it won\'t spike your blood sugar or kick you out of ketosis.',
    image: '/images/2.png',
    alt: 'Healthy lifestyle with BamBha monk fruit sweetener',
  },
  {
    number: '03',
    title: 'Heat Stable for Every Recipe',
    desc: 'Unlike many sweeteners that break down under heat, BamBha stays stable at high temperatures — making it perfect for baking, cooking curries, and brewing hot beverages without losing sweetness.',
    image: '/images/3.png',
    alt: 'Baking and cooking with BamBha monk fruit sweetener',
  },
  {
    number: '04',
    title: 'Heat Stable for Every Recipe',
    desc: 'Unlike many sweeteners that break down under heat, BamBha stays stable at high temperatures — making it perfect for baking, cooking curries, and brewing hot beverages without losing sweetness.',
    image: '/images/4.png',
    alt: 'Baking and cooking with BamBha monk fruit sweetener',
  },
];

export default function WhyChoose() {
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
            WHY CHOOSE <span>BAMBHA MONK FRUIT?</span>
          </h2>
          <div className={styles.titleUnderline} />
        </motion.div>

        <div className={styles.timeline}>
          {reasons.map((item, i) => {
            const isEven = i % 2 === 1;
            return (
              <motion.div
                key={item.number}
                className={`${styles.row} ${isEven ? styles.rowReverse : ''}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className={styles.imageCol}>
                  <div className={styles.imageWrap}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                      src={item.image}
                      alt={item.alt}
                      className={styles.image}
                    />
                  </div>
                </div>

                <div className={styles.connector}>
                  <div className={styles.numberBadge}>{item.number}</div>
                  {i < reasons.length - 1 && <div className={styles.line} />}
                </div>

                <div className={styles.contentCol}>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemDesc}>{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
