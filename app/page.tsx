import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import CTASection from "./components/CTASection";
import MantaNetworkSection from "./components/MantaNetworkSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CTASection />
        <MantaNetworkSection />
      </main>
      <Footer />
    </div>
  );
}
