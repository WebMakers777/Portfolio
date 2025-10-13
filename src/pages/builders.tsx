import { useEffect } from "react";
import NavigationBuilders from "@/components/Builders/NavigationBuilders";
import HeroBuilders from "@/components/Builders/HeroBuilders";
import LogosBuilders from "@/components/Builders/LogosBuilders";
import ServicesBuilders from "@/components/Builders/ServicesBuilders";
import PortfolioBuilders from "@/components/Builders/PortfolioBuilders";
import AboutBuilders from "@/components/Builders/AboutBuilders";
import ContactBuilders from "@/components/Builders/ContactBuilders";
import FooterBuilders from "@/components/Builders/FooterBuilders";
import AnimatedBackground from "@/components/Builders/AnimatedBackground";
export default function Builders() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1333] via-[#1f1744] to-[#15102b] relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <NavigationBuilders />
        <main>
          <HeroBuilders />
          <LogosBuilders />
          <ServicesBuilders />
          <PortfolioBuilders />
          <AboutBuilders />
          <ContactBuilders />
        </main>
        <FooterBuilders />
      </div>
    </div>
  );
}
