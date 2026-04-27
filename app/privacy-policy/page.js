import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import styles from "../policy.module.css";

export const metadata = {
  title: "Privacy Policy – BamBha",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.breadcrumb}>
            <Link href="/">Home</Link> - <span>Privacy Policy</span>
          </div>
        <div className={styles.container}>
          
          <div className={styles.header}>Privacy Policy :</div>
          <div className={styles.sectionTitle}>Bambha Healthcare</div>
          <div className={styles.content}>
            <span className={styles.sectionTitle}>Last Updated :</span> January
            12, 2026 at Bambha, we understand that your health is personal this
            privacy policy outlines our commitment to protecting the data of our
            customers who use our instant healthcare powders.
          </div>
          <br />
          <div className={styles.content}>
            <span className={styles.sectionTitle}>1. &nbsp; Information we collect :</span>{" "}
            In addition to standard contact and shipping details, we may collect
          </div>
          <div className={styles.content}>
            <span className={styles.sectionTitle}>2. &nbsp; Health Interests :</span>{" "}
            Information you provide voluntarily through surveys, quizzes, or
            health-goal forms
          </div>
          <div className={styles.content}>
            <span className={styles.sectionTitle}>3. &nbsp; Transaction History :</span>{" "}
            Details of the specific healthcare powders purchased to help us
            provide tailored usage instructions.
          </div>
          <div className={styles.content}>
            <span className={styles.sectionTitle}>4. &nbsp; Correspondence :</span>{" "}
            Records of any health-related questions you send to our support
            team.
          </div>
          <br />
          <div className={styles.sectionTitle}>
            How we use your Health-Related Data
          </div>
          <div className={styles.content}>
            We use your information strictly to enhance your wellness journey
          </div>
          <br />
          <div className={styles.content}>
            <span className={styles.sectionTitle}>&#8226; &nbsp; Personalization :</span>{" "}
            Suggesting the correct dosage or complementary powders based on your
            goals.
          </div>
          <div className={styles.content}>
            <span className={styles.sectionTitle}>&#8226; &nbsp; Safety Alerts :</span>{" "}
            Notifying you of any critical updates regarding ingredients or
            allergen information.
          </div>
          <div className={styles.content}>
            <span className={styles.sectionTitle}>&#8226; &nbsp; Compliance :</span>{" "}
            Meeting rigorous standards for food and supplement safety records.
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
