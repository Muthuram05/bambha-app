import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import styles from "../policy.module.css";

export const metadata = {
  title: "Return & Refund Policy – BamBha",
};

export default function ReturnPolicyPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link> - <span>Return &amp; Refund Policy</span>
        </div>
        <div className={styles.container}>
          <div className={styles.header}>Returns and Refunds :</div>
          <br />
          <div className={styles.content}>
            <span className={styles.sectionTitle}>Food Safety Policy :</span>{" "}
            Due to the nature of food products, we cannot accept returns of
            opened packages.
          </div>
          <div className={styles.content}>
            <span className={styles.sectionTitle}>Damaged Goods :</span>{" "}
            If your product arrives damaged or tamapered with please contact us
            within 48 hours of delivery with photographic evidence for a
            replacement or refund.
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
