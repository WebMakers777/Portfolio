import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import RainOverlay from "@/components/RainOverlay";
import CodeToProductHero from "@/components/makers/CodeToProductHero";
import APIConnectivityMap from "@/components/makers/APIConnectivityMap";
import DeplymentTimeline from "@/components/makers/DeploymentTimeline";
import AIFlowAutomation from "@/components/makers/AIFlowAutomation";

const ElixorTech = () => {
  return (
    <div className="theme-elixortech relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Rain only on ElixorTech */}
      <div className="pointer-events-none fixed inset-0 z-[4]">
        <RainOverlay density={80} speed={1.0} color="#2472b7" zIndex={4} />
      </div>

      <Navigation />
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <CodeToProductHero />
      <APIConnectivityMap />
      <DeplymentTimeline />
      <AIFlowAutomation />
      {/* <AboutSection /> */}
      <ContactSection />
      <Footer />
    </div>
  );
};

export default ElixorTech;
