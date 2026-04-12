import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import Benefits from '@/components/Benefits/Benefits';
import WelcomeSection from '@/components/WelcomeSection/WelcomeSection';
import KeyFeatures from '@/components/KeyFeatures/KeyFeatures';
import WhyChoose from '@/components/WhyChoose/WhyChoose';
import HomeFooter from '@/components/HomeFooter/HomeFooter';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Benefits />
        <WelcomeSection />
        <KeyFeatures />
        <WhyChoose />
      </main>
      <HomeFooter />
    </>
  );
}
