import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        {/* Logo */}
        <div className={styles.brand}>
          <img src="/images/logo.png" alt="BamBha" className={styles.logo} />
        </div>

        {/* Explore Links */}
        <div className={styles.links}>
          <h4 className={styles.colTitle}>Explore</h4>
          <ul>
            <li><Link href="/contact">Contact us</Link></li>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms of service</Link></li>
            <li><Link href="/return-policy">Return &amp; refund policy</Link></li>
            <li><Link href="/shipping-policy">Shipping, Refund and cancellation policy</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className={styles.contact}>
          <h4 className={styles.colTitle}>Contact us</h4>
          <p className={styles.contactLabel}>bambhanaturals@gmail.com</p>
          <p className={styles.contactLabel}>Phone/WhatsApp: 8270727878</p>
        </div>

      </div>

      <div className={styles.bottom}>
        <p>&#169; 2026, Bambha.</p>
      </div>
    </footer>
  );
}
