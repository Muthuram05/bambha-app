import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Benefits from "@/components/Benefits/Benefits";
import WelcomeSection from "@/components/WelcomeSection/WelcomeSection";
import KeyFeatures from "@/components/KeyFeatures/KeyFeatures";
import WhyChoose from "@/components/WhyChoose/WhyChoose";
import HomeFooter from "@/components/HomeFooter/HomeFooter";

import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className={styles.mainContainer}>
          <Benefits />
          <WelcomeSection />
          <KeyFeatures />
          <WhyChoose />
        </div>
      </main>
      <HomeFooter />
    </>
  );
}
