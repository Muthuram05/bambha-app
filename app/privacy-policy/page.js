import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import styles from '../policy.module.css';

export const metadata = {
  title: 'Privacy Policy – BamBha',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link> &rsaquo; <span>Privacy Policy</span>
          </div>

          <div className={styles.header}>
            <h1 className={styles.title}>Privacy Policy</h1>
            <p className={styles.updated}>Last updated: April 2026</p>
          </div>

          <div className={styles.body}>
            <div className={styles.highlight}>
              At BamBha, we respect your privacy and are committed to protecting your personal information. This policy explains what we collect, how we use it, and your rights.
            </div>

            <div className={styles.section}>
              <h2>1. Information We Collect</h2>
              <p>When you use our website or place an order, we may collect:</p>
              <ul>
                <li>Name, email address, and phone number</li>
                <li>Shipping and billing address</li>
                <li>Payment information (processed securely via Razorpay — we do not store card details)</li>
                <li>Order history and preferences</li>
                <li>Device and browser information for improving our website</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2>2. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul>
                <li>Process and fulfill your orders</li>
                <li>Send order confirmations and shipping updates</li>
                <li>Respond to customer service requests</li>
                <li>Improve our website and product offerings</li>
                <li>Send promotional emails (only if you opt in)</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2>3. Information Sharing</h2>
              <p>We do not sell or rent your personal information to third parties. We may share information with:</p>
              <ul>
                <li>Logistics and delivery partners to fulfill your orders</li>
                <li>Payment processors (Razorpay) to complete transactions</li>
                <li>Service providers who assist in operating our website</li>
              </ul>
              <p>All third parties are contractually obligated to keep your information confidential.</p>
            </div>

            <div className={styles.section}>
              <h2>4. Cookies</h2>
              <p>We use cookies to enhance your browsing experience, remember your cart, and analyze website traffic. You can disable cookies in your browser settings, though some features may not function properly.</p>
            </div>

            <div className={styles.section}>
              <h2>5. Data Security</h2>
              <p>We implement industry-standard security measures to protect your personal data. However, no method of transmission over the internet is 100% secure. We encourage you to use a strong password and keep your account credentials safe.</p>
            </div>

            <div className={styles.section}>
              <h2>6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access the personal data we hold about you</li>
                <li>Request correction or deletion of your data</li>
                <li>Opt out of marketing communications at any time</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2>7. Contact Us</h2>
              <div className={styles.contactBox}>
                <p>For any privacy-related concerns, please reach out to us:</p>
                <p>Email: <a href="mailto:bambhanaturals@gmail.com">bambhanaturals@gmail.com</a></p>
                <p>Phone/WhatsApp: 8270727878</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
