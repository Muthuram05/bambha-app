"use client";
import { motion } from "framer-motion";
import styles from "./WhyChoose.module.css";

const reasons = [
  {
    number: "01",
    title: "The Perfect 1:1 Replacement",
    desc: "Forget complicated math. BamBha is formulated to match the sweetness of sugar exactly. Whether you're baking a cake or sweetening your morning coffee, just swap sugar for BamBha — teaspoon for teaspoon.",
    image: "/images/1.png",
  },
  {
    number: "02",
    title: "Zero Calories. Zero Guilt.",
    desc: "BamBha is the ultimate choice for diabetics, keto enthusiasts, and weight-conscious eaters. With zero calories and zero net carbs, it won't spike your blood sugar or kick you out of ketosis.",
    image: "/images/2.png",
  },
  {
    number: "03",
    title: "Heat Stable for Every Recipe",
    desc: "Unlike many sweeteners that break down under heat, BamBha stays stable at high temperatures — making it perfect for baking, cooking curries, and brewing hot beverages without losing sweetness.",
    image: "/images/3.png",
  },
];

export default function WhyChoose() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* HEADER */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <img src="/images/bamboo.png" alt="" className={styles.titleLine} aria-hidden="true" />
          <div className={styles.title}>
            WHY CHOOSE <span>BAMBHA MONK FRUIT?</span>
          </div>
          <img src="/images/bamboo.png" alt="" className={styles.titleLine} aria-hidden="true" />
        </motion.div>

        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className={styles.wrapper}>
            {/* Top Left Image */}
            <div className={styles.imageTopLeft}>
              <img src="/images/1.png" alt="food" />
            </div>

            {/* Top Right Circle Number */}
            <div className={styles.topRightCircle}>01</div>

            {/* Content Box */}
            <div className={styles.contentBox}>
              <p>
                The Perfect 1:1 Replacement Forget Complicated Math. Bambha Is
                Formulated To Match The Sweetness Of Sugar Exactly. Whether
                You’re Baking A Cake Or Sweetening Your Morning Coffee, Just
                Swap Sugar For Bambha—Teaspoon.
              </p>
            </div>

            {/* Bottom Right Decoration */}
            <div className={styles.bottomRightImage}>
              <img src="/images/fruit.png" alt="decoration" />
            </div>
          </div>
        </motion.div>
        <motion.div
          className={styles.rightContent}
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className={styles.rightWrapper}>
            {/* Top Left Image */}
            <div className={styles.reverseLeftTop}>
              02
            </div>

            {/* Top Right Circle Number */}
            <div className={styles.reverseRightImage}><img src="/images/2.png" alt="food" /></div>

            {/* Content Box */}
            <div className={styles.contentBox}>
              <p>
                The Perfect 1:1 Replacement Forget Complicated Math. Bambha Is
                Formulated To Match The Sweetness Of Sugar Exactly. Whether
                You’re Baking A Cake Or Sweetening Your Morning Coffee, Just
                Swap Sugar For Bambha—Teaspoon.
              </p>
            </div>

            {/* Bottom Right Decoration */}
            <div className={styles.bottomRightImage}>
              <img src="/images/fruit.png" alt="decoration" />
            </div>
          </div>
        </motion.div>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className={styles.wrapper}>
            {/* Top Left Image */}
            <div className={styles.imageTopLeft}>
              <img src="/images/3.png" alt="food" />
            </div>

            {/* Top Right Circle Number */}
            <div className={styles.topRightCircle}>03</div>

            {/* Content Box */}
            <div className={styles.contentBox}>
              <p>
                The Perfect 1:1 Replacement Forget Complicated Math. Bambha Is
                Formulated To Match The Sweetness Of Sugar Exactly. Whether
                You’re Baking A Cake Or Sweetening Your Morning Coffee, Just
                Swap Sugar For Bambha—Teaspoon.
              </p>
            </div>

            {/* Bottom Right Decoration */}
            <div className={styles.bottomRightImage}>
              <img src="/images/fruit.png" alt="decoration" />
            </div>
          </div>
        </motion.div>
        <motion.div
          className={styles.rightContent}
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className={styles.rightWrapper}>
            {/* Top Left Image */}
            <div className={styles.reverseLeftTop}>
              04
            </div>

            {/* Top Right Circle Number */}
            <div className={styles.reverseRightImage}>
              <img src="/images/4.png" alt="food" />
            </div>

            {/* Content Box */}
            <div className={styles.contentBox}>
              <p>
                The Perfect 1:1 Replacement Forget Complicated Math. Bambha Is
                Formulated To Match The Sweetness Of Sugar Exactly. Whether
                You’re Baking A Cake Or Sweetening Your Morning Coffee, Just
                Swap Sugar For Bambha—Teaspoon.
              </p>
            </div>

            {/* Bottom Right Decoration */}
            <div className={styles.bottomRightImage}>
              <img src="/images/fruit.png" alt="decoration" />
            </div>
          </div>
        </motion.div>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className={styles.wrapper}>
            {/* Top Left Image */}
            <div className={styles.imageTopLeft}>
              <img src="/images/5.png" alt="food" />
            </div>

            {/* Top Right Circle Number */}
            <div className={styles.topRightCircle}>05</div>

            {/* Content Box */}
            <div className={styles.contentBox}>
              <p>
                The Perfect 1:1 Replacement Forget Complicated Math. Bambha Is
                Formulated To Match The Sweetness Of Sugar Exactly. Whether
                You’re Baking A Cake Or Sweetening Your Morning Coffee, Just
                Swap Sugar For Bambha—Teaspoon.
              </p>
            </div>

            {/* Bottom Right Decoration */}
            <div className={styles.bottomRightImage}>
              <img src="/images/fruit.png" alt="decoration" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
