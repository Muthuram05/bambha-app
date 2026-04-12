import styles from './WhyChoose.module.css';

const reasons = [
  { icon: '🌱', title: '100% Natural', desc: 'Made from monk fruit extract with no artificial additives' },
  { icon: '🔬', title: 'Zero Glycemic Index', desc: 'Safe for diabetics and those on keto diet' },
  { icon: '🍰', title: 'Heat Stable', desc: 'Perfect for baking, cooking, and all beverages' },
  { icon: '💚', title: 'No Aftertaste', desc: 'Clean sweetness that tastes just like sugar' },
];

export default function WhyChoose() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>
          WHY CHOOSE <span>BAMBHA MONK FRUIT?</span> 🌿
        </h2>
        <div className={styles.grid}>
          {reasons.map((r) => (
            <div key={r.title} className={styles.card}>
              <div className={styles.icon}>{r.icon}</div>
              <h3 className={styles.cardTitle}>{r.title}</h3>
              <p className={styles.cardDesc}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
