'use client';
import { motion } from 'framer-motion';
import styles from './WelcomeSection.module.css';

export default function WelcomeSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <h2 className={styles.heading}>WELCOME TO <span>BAMBHA</span></h2>
          <p className={styles.sub}>Created with a strong focus on metabolic health</p>

          <p className={styles.desc}>
            BamBha is an Indian wellness brand specializing in natural, zero-calorie sugar alternatives,
            primarily focused on monkfruit (luo han guo) extract — established to promote healthier
            lifestyle specifically for those with family history of diabetes. The brand positions itself
            as a direct 1:1 replacement for traditional sugar and artificials and artificial sweeteners
            like aspartame erythritol.
          </p>

          <div className={styles.block}>
            <p className={styles.blockTitle}>MISSION :</p>
            <p className={styles.blockText}>
              To Provide A Guilt-Free Sweetening Experience that empowers users to enjoy the
              &quot;sweetness of life&quot; without compromising metabolic health.
            </p>
          </div>

          <div className={styles.block}>
            <p className={styles.blockTitle}>TRANSPARENCY :</p>
            <p className={styles.blockText}>
              The Brand Emphasizes &quot;Clean Sweetness,&quot; Declaring all ingredients upfront to
              ensure they are simple and recognizable.
            </p>
          </div>

          <p className={styles.availability}>
            BamBha products are commonly available in various sizes (100G To 500G) through major
            online retailers like amazon India.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
