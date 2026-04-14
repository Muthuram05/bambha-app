import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import styles from '../policy.module.css';

export const metadata = {
  title: 'Terms of Service – BamBha',
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link> &rsaquo; <span>Terms of Service</span>
          </div>

          <div className={styles.header}>
            <h1 className={styles.title}>Terms of Service</h1>
            <p className={styles.updated}>Last updated: April 2026</p>
          </div>

          <div className={styles.body}>
            <div className={styles.highlight}>
              By accessing or purchasing from BamBha, you agree to be bound by these Terms of Service. Please read them carefully before using our website.
            </div>

            <div className={styles.section}>
              <h2>1. Use of Website</h2>
              <p>By using this website, you confirm that you are at least 18 years of age or are accessing the site under the supervision of a parent or guardian. You agree not to misuse our platform, attempt to gain unauthorized access, or engage in any activity that disrupts our services.</p>
            </div>

            <div className={styles.section}>
              <h2>2. Products</h2>
              <p>All products sold on BamBha are natural wellness products. While we strive for accuracy, product descriptions, images, and availability are subject to change without notice. We reserve the right to limit quantities or discontinue any product at any time.</p>
            </div>

            <div className={styles.section}>
              <h2>3. Pricing & Payments</h2>
              <ul>
                <li>All prices are listed in Indian Rupees (INR) and include applicable taxes</li>
                <li>We reserve the right to change prices at any time without prior notice</li>
                <li>Payments are processed securely through Razorpay</li>
                <li>Orders are confirmed only after successful payment</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2>4. Account Responsibility</h2>
              <p>You are responsible for maintaining the confidentiality of your account credentials. Any activity that occurs under your account is your responsibility. Please notify us immediately if you suspect unauthorized use of your account.</p>
            </div>

            <div className={styles.section}>
              <h2>5. Intellectual Property</h2>
              <p>All content on this website — including text, images, logos, and product descriptions — is the property of BamBha and is protected by applicable intellectual property laws. You may not reproduce, distribute, or use any content without our express written permission.</p>
            </div>

            <div className={styles.section}>
              <h2>6. Limitation of Liability</h2>
              <p>BamBha shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website. Our liability is limited to the amount paid for the specific product or service in question.</p>
            </div>

            <div className={styles.section}>
              <h2>7. Governing Law</h2>
              <p>These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of the courts in Tirunelveli, Tamil Nadu.</p>
            </div>

            <div className={styles.section}>
              <h2>8. Changes to Terms</h2>
              <p>We reserve the right to update these terms at any time. Continued use of our website after changes are posted constitutes acceptance of the revised terms.</p>
            </div>

            <div className={styles.section}>
              <h2>9. Contact Us</h2>
              <div className={styles.contactBox}>
                <p>For questions about these terms, contact us at:</p>
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
