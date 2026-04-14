import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import styles from '../policy.module.css';

export const metadata = {
  title: 'Shipping, Refund & Cancellation Policy – BamBha',
};

export default function ShippingPolicyPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link> &rsaquo; <span>Shipping, Refund &amp; Cancellation Policy</span>
          </div>

          <div className={styles.header}>
            <h1 className={styles.title}>Shipping, Refund &amp; Cancellation Policy</h1>
            <p className={styles.updated}>Last updated: April 2026</p>
          </div>

          <div className={styles.body}>
            <div className={styles.highlight}>
              We are committed to delivering your BamBha products safely and on time across India. Here's everything you need to know about our shipping process.
            </div>

            <div className={styles.section}>
              <h2>1. Shipping Coverage</h2>
              <p>We ship to all major cities and towns across India. Delivery to remote or rural areas may take additional time. We currently do not offer international shipping.</p>
            </div>

            <div className={styles.section}>
              <h2>2. Processing Time</h2>
              <ul>
                <li>Orders are processed within <strong>1–2 business days</strong> after payment confirmation</li>
                <li>Orders placed on weekends or public holidays will be processed the next business day</li>
                <li>You will receive an email with tracking information once your order is dispatched</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2>3. Estimated Delivery Time</h2>
              <ul>
                <li><strong>Metro cities</strong> (Chennai, Mumbai, Delhi, Bangalore): 2–4 business days</li>
                <li><strong>Tier 2 & Tier 3 cities</strong>: 4–6 business days</li>
                <li><strong>Remote areas</strong>: 6–10 business days</li>
              </ul>
              <p>Delivery timelines are estimates and may vary due to courier delays, weather conditions, or other unforeseen circumstances.</p>
            </div>

            <div className={styles.section}>
              <h2>4. Shipping Charges</h2>
              <p>We offer <strong>free shipping</strong> on all orders across India. No minimum order value required.</p>
            </div>

            <div className={styles.section}>
              <h2>5. Order Tracking</h2>
              <p>Once your order is shipped, you will receive a tracking number via email. You can use this to track your package on the courier partner's website.</p>
            </div>

            <div className={styles.section}>
              <h2>6. Cancellation Policy</h2>
              <p>Orders can be cancelled under the following conditions:</p>
              <ul>
                <li>Cancellations are accepted within <strong>12 hours</strong> of placing the order</li>
                <li>Once an order has been dispatched, it cannot be cancelled</li>
                <li>To cancel, email us at <strong>bambhanaturals@gmail.com</strong> with your order ID</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2>7. Refunds for Cancelled Orders</h2>
              <ul>
                <li>If your cancellation is approved, a full refund will be processed within <strong>5–7 business days</strong></li>
                <li>Refunds will be credited to your original payment method</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2>8. Failed Deliveries</h2>
              <p>If a delivery attempt fails due to an incorrect address or unavailability, the courier will attempt redelivery. After 2 failed attempts, the package may be returned to us. Re-shipping charges may apply in such cases.</p>
            </div>

            <div className={styles.section}>
              <h2>9. Contact Us</h2>
              <div className={styles.contactBox}>
                <p>For any shipping or cancellation queries:</p>
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
