import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import styles from "../policy.module.css";

export const metadata = {
  title: "Terms of Service – BamBha",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.breadcrumb}>
            <Link href="/">Home</Link> - <span>Terms of Service</span>
          </div>
        <div className={styles.container}>
          
          <div className={styles.header}>
            Product information & Health Disclaimer :
          </div>
          <div className={styles.content}>
            <span className={styles.sectionTitle}>General Information :</span>
            Bambha Monk fruit sweetener is a food product intended for use as a
            sugar substitute.
          </div>
          <div className={styles.sectionTitle}>
            All information provided on our website is for educational purposes
            only.
          </div>
          <div className={styles.content}>
            <span className={styles.sectionTitle}>Accuracy : </span>while we
            strive for 100% accuracy, we do not warrant that product
            descriptions or nutritional information are error-free
          </div>
          <div className={styles.sectionTitle}>
            Quality & Compliances (FSSAI/Regulatory);
          </div>
          <div className={styles.content}>
            <span className={styles.sectionTitle}>Licensing :</span>Bambha
            operates under valid FSSAI (Food Safety and Standards Authority of
            india) licensing.
          </div>
          <div className={styles.content}>
            <span className={styles.sectionTitle}>Shelf Life :</span>In
            accordance with 2026 regulations , we guarantee that all products
            delivered will have a minimum of 30% of their shelf life remaining
            (or at least 45 days) at the time of delivery.
          </div>
          <div className={styles.content}>
            <span className={styles.sectionTitle}>Storage :</span>the Consumer
            is responsible for following the storage instructions (eg., “store
            in a cool, dry place”) provided on the packaging to maintain product
            integrity.
          </div>
          <br />
          <div className={styles.sectionTitle}>Orders and payments :</div>
          <div className={styles.content}>
            <span className={styles.sectionTitle}>Acceptance :</span> we reserve
            the right to refuse or cancel any order for reasons including
            product availability, errors in pricing, or suspicion of fraudulent
            activity.
          </div>
          <div className={styles.content}>
            <span className={styles.sectionTitle}>Pricing :</span> All prices
            are subject to change without notice prices are inclusive of
            applicable GST unless stated otherwise.
          </div>
          <div className={styles.content}>
            <span className={styles.sectionTitle}>Payment :</span>
            payments must be made via our authorized third-party payment
            gateways. we do not store your credit card information .
          </div>
          <br />
          <div className={styles.sectionTitle}>Shipping and Delivery :</div>
          <div className={styles.content}>
            Timeline: we aim to process orders within 1-2 business days.
            delivery times are estimates and may vary based on location and
            courier performance.
          </div>
          <div className={styles.content}>
            <span className={styles.sectionTitle}>Risk of Loss :</span>
            Risk of loss and title for the products pass to you upon our
            delivery to the carrier.
          </div>
          <br />
          <div className={styles.sectionTitle}> Intellectual Property :</div>
          <div className={styles.content}>
            All content on this site, including the name “Bambha,” logos, text
            and images is the property of bambha and is protected by copyright
            and trademark laws. you may not use our branding without express
            written consent.
          </div>
          <div className={styles.sectionTitle}> Limitation of Liability :</div>
          <div className={styles.content}>
            To the maximum extent permitted by law, Bambha shall not be liable
            for any indirect, incidental, or consequential damages resulting
            from the use or inability to use our products or website.
          </div>
          <div className={styles.sectionTitle}>Governing Law :</div>
          <div className={styles.content}>
            These Terms are governed by the laws of india. any disputes arising
            from these terms shall be subject to the exclusive jurisdiction of
            the courts in Tamilnadu & Bangalore.
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
