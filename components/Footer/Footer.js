import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logoText}>
            <span className={styles.logoB}>B</span>am<span className={styles.logoB}>B</span>ha
          </span>
          <p className={styles.tagline}>Eat Fit Be Fit</p>
          <p className={styles.desc}>100% natural, zero-calorie monk fruit sweetener for a healthier life.</p>
        </div>
        <div className={styles.links}>
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className={styles.links}>
          <h4>Products</h4>
          <ul>
            <li><Link href="/products">Monk Fruit Sweetener</Link></li>
            <li><Link href="/products">Moringa Powder</Link></li>
          </ul>
        </div>
        <div className={styles.contact}>
          <h4>Contact</h4>
          <p>support@bambha.in</p>
          <p>+91 99999 00000</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} BamBha. All rights reserved.</p>
      </div>
    </footer>
  );
}
