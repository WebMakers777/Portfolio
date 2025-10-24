import { useEffect } from "react";
import NavigationBuilders from "@/components/Builders/NavigationBuilders";
import HeroBuilders from "@/components/Builders/HeroBuilders";
import LogosBuilders from "@/components/Builders/LogosBuilders";
import ServicesBuilders from "@/components/Builders/ServicesBuilders";
import PortfolioBuilders from "@/components/Builders/PortfolioBuilders";
import AboutBuilders from "@/components/Builders/AboutBuilders";
import ContactBuilders from "@/components/Builders/ContactBuilders";
import AnimatedBackground from "@/components/Builders/AnimatedBackground";

// Import new advanced section pack
import BuildersAdvanced, { NewFooterBuilders } from "@/components/Builders/BuildersAdvanced";

export default function Builders() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1333] via-[#1f1744] to-[#15102b] relative overflow-hidden">
      {/* animated aura background */}
      <AnimatedBackground />

      <div className="relative z-10">
        {/* navigation */}
        <NavigationBuilders />

        {/* main hero & core sections */}
        <main>
          <HeroBuilders />
          <LogosBuilders />
          <ServicesBuilders />
          <PortfolioBuilders />
          <AboutBuilders />

          {/* advanced UI pack (showreel, tools, before-after, etc.) */}
          <BuildersAdvanced />

          {/* contact section */}
          <ContactBuilders />
        </main>

        {/* replace old footer with modern one */}
        <NewFooterBuilders />
      </div>
    </div>
  );
}
