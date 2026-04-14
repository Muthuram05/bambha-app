import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import styles from '../policy.module.css';

export const metadata = {
  title: 'Return & Refund Policy – BamBha',
};

export default function ReturnPolicyPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link> &rsaquo; <span>Return &amp; Refund Policy</span>
          </div>

          <div className={styles.header}>
            <h1 className={styles.title}>Return &amp; Refund Policy</h1>
            <p className={styles.updated}>Last updated: April 2026</p>
          </div>

          <div className={styles.body}>
            <div className={styles.highlight}>
              We want you to be completely satisfied with your BamBha purchase. If you're not happy for any reason, we're here to help.
            </div>

            <div className={styles.section}>
              <h2>1. Return Eligibility</h2>
              <p>We accept returns within <strong>7 days</strong> of delivery under the following conditions:</p>
              <ul>
                <li>The product is unused, unopened, and in its original packaging</li>
                <li>The product was received damaged or defective</li>
                <li>An incorrect product was delivered</li>
              </ul>
              <p>We do not accept returns for opened or partially used products due to hygiene and safety reasons.</p>
            </div>

            <div className={styles.section}>
              <h2>2. Non-Returnable Items</h2>
              <ul>
                <li>Opened or used products</li>
                <li>Products purchased during sale or promotional offers (unless defective)</li>
                <li>Items damaged due to misuse or improper handling by the customer</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2>3. How to Initiate a Return</h2>
              <ol>
                <li>Email us at <strong>bambhanaturals@gmail.com</strong> within 7 days of delivery</li>
                <li>Include your order ID, reason for return, and photos of the product if damaged</li>
                <li>Our team will review your request within 2 business days</li>
                <li>If approved, we will arrange a pickup or provide return shipping instructions</li>
              </ol>
            </div>

            <div className={styles.section}>
              <h2>4. Refund Process</h2>
              <p>Once we receive and inspect the returned product:</p>
              <ul>
                <li>Approved refunds will be processed within <strong>5–7 business days</strong></li>
                <li>Refunds will be credited to your original payment method</li>
                <li>You will receive an email confirmation once the refund is processed</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2>5. Damaged or Defective Products</h2>
              <p>If you receive a damaged or defective product, please contact us within 48 hours of delivery with photos. We will arrange a replacement or full refund at no additional cost to you.</p>
            </div>

            <div className={styles.section}>
              <h2>6. Exchange Policy</h2>
              <p>We currently do not offer direct exchanges. If you wish to exchange a product, please initiate a return and place a new order for the desired item.</p>
            </div>

            <div className={styles.section}>
              <h2>7. Contact Us</h2>
              <div className={styles.contactBox}>
                <p>For return or refund requests, reach out to us:</p>
                <p>Email: <a href="mailto:bambhanaturals@gmail.com">bambhanaturals@gmail.com</a></p>
                <p>Phone/WhatsApp: <a href="tel:8270727878">8270727878</a></p>
                <p>Business hours: Monday – Saturday, 9 AM – 6 PM IST</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
