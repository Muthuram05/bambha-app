import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import styles from "../policy.module.css";

export const metadata = {
  title: "Shipping, Refund & Cancellation Policy – BamBha",
};

export default function ShippingPolicyPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link> - <span>Shipping Policy</span>
        </div>
        <div className={styles.container}>
          <div className={styles.header}>Shipping Policy :</div>
          <div className={styles.content}>
            We aim to get your sweetener to your doorstep as quickly and safely
            as possible.
          </div>
          <br />
          <div className={styles.content}>
            <span className={styles.sectionTitle}>Processing Time :</span>{" "}
            Orders are typically processed and dispatched within 24 to 48 hours
            (Including Sundays and Public Holidays).
          </div>
          <div className={styles.content}>
            <span className={styles.sectionTitle}>Delivery Timelines :</span>{" "}
            Metros: 3-5 business days. Rest of India: 5-7 business days.
          </div>
          <div className={styles.content}>
            <span className={styles.sectionTitle}>Shipping Charges :</span>{" "}
            Free shipping is available on orders above 499. For orders below
            this amount, a flat shipping fee of ₹50 will apply.
          </div>
          <div className={styles.content}>
            <span className={styles.sectionTitle}>Tracking :</span> Once your
            order is shipped, you will receive a tracking link via email/SMS to
            monitor your delivery in real-time.
          </div>
          <br />
          <div className={styles.header}>Cancellation Policy :</div>
          <div className={styles.content}>
            We understand that plans change. Here is how we handle
            cancellations.
          </div>
          <br />
          <div className={styles.content}>
            <span className={styles.sectionTitle}>Before Dispatch :</span> You
            can cancel your order at any time before it has been dispatched from
            our warehouse. You can do this via the "My Orders" section or by
            contacting our support team. A full refund will be processed to your
            original payment method.
          </div>
          <div className={styles.content}>
            <span className={styles.sectionTitle}>After Dispatch :</span> Once
            an order has been handed over to our courier partner, it cannot be
            cancelled. If you no longer want the package, please do not accept
            the delivery. Once the package is returned to us by the courier, we
            will process a refund minus the shipping costs.
          </div>
          <br />
          <div className={styles.header}>Refund &amp; Return Policy :</div>
          <div className={styles.content}>
            Because our products are perishable food items, we have a specific
            policy to ensure health and safety standards.
          </div>
          <br />
          <div className={styles.content}>
            <span className={styles.sectionTitle}>Non-Returnable Items :</span>{" "}
            To maintain hygiene, we do not accept returns on food products once
            they have been delivered, even if they are unopened.
          </div>
          <div className={styles.content}>
            <span className={styles.sectionTitle}>
              Damaged or Incorrect Orders :
            </span>{" "}
            If you receive a product that is damaged, tampered with, or if you
            received the wrong item, we will fix it immediately.
          </div>
          <div className={styles.content}>
            <span className={styles.sectionTitle}>Reporting Period :</span> You
            must report the issue within 48 hours of delivery.
          </div>
          <div className={styles.content}>
            <span className={styles.sectionTitle}>Proof Required :</span>{" "}
            Please share a clear photo or video of the damaged packaging/product
            with your order ID to bambhanaturals@gmail.com.
          </div>
          <div className={styles.content}>
            <span className={styles.sectionTitle}>Resolution :</span> Upon
            verification, we will either send a free replacement or issue a full
            refund.
          </div>
          <br />
          <div className={styles.header}>Refund Processing :</div>
          <div className={styles.content}>
            <span className={styles.sectionTitle}>Method :</span> Refunds are
            credited back to the original payment method (Credit Card, Debit
            Card, UPI, or Net Banking).
          </div>
          <div className={styles.content}>
            <span className={styles.sectionTitle}>COD Orders :</span> For Cash
            on Delivery orders, refunds will be issued via bank transfer or a
            store credit coupon. You will be asked to provide your bank details
            securely.
          </div>
          <br />
          <div className={styles.header}>Contact Us</div>
          <div className={styles.content}>
            For any queries regarding your order status or refunds:
          </div>
          <div className={styles.content}>
            <span className={styles.sectionTitle}>Email:</span>{" "}
            bambhanaturals@gmail.com
          </div>
          <div className={styles.content}>
            <span className={styles.sectionTitle}>Phone/WhatsApp:</span>{" "}
            8270727878
          </div>
          <div className={styles.content}>
            <span className={styles.sectionTitle}>Hours:</span> Monday –
            Saturday, 10:00 AM – 6:00 PM
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
