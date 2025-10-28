// Your main page file: Builders.js

import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import ScrollProgressBar from "@/components/ScrollProgressBar"; // 1. Import the new component

// Import your other components as before...
import NavigationBuilders from "@/components/Builders/NavigationBuilders";
import HeroBuilders from "@/components/Builders/HeroBuilders";
import LogosBuilders from "@/components/Builders/LogosBuilders";
import ServicesBuilders from "@/components/Builders/ServicesBuilders";
import PortfolioBuilders from "@/components/Builders/PortfolioBuilders";
import AboutBuilders from "@/components/Builders/AboutBuilders";
import ContactBuilders from "@/components/Builders/ContactBuilders";
import AnimatedBackground from "@/components/Builders/AnimatedBackground";
import BuildersAdvanced, { NewFooterBuilders } from "@/components/Builders/BuildersAdvanced";
import AnimatedSection from "@/components/AnimatedSection";

export default function Builders() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1333] via-[#1f1744] to-[#15102b] relative overflow-hidden">
      {/* <ScrollProgressBar />  */}
      <AnimatedBackground />

      <div className="relative z-10">
        <NavigationBuilders />

        <main>
          {/* Your other sections remain the same */}
          <AnimatedSection direction="fade">
            <HeroBuilders />
          </AnimatedSection>
          
          <AnimatedSection direction="up">
            <LogosBuilders />
          </AnimatedSection>

          <AnimatedSection direction="up">
            <ServicesBuilders />
          </AnimatedSection>

          <AnimatedSection direction="left">
            <PortfolioBuilders />
          </AnimatedSection>

          <AnimatedSection direction="right">
            <AboutBuilders />
          </AnimatedSection>

          {/* <AnimatedSection direction="up"> */}
            <BuildersAdvanced />
          {/* </AnimatedSection> */}

          <AnimatedSection direction="fade">
            <ContactBuilders />
          </AnimatedSection>
        </main>

        <NewFooterBuilders />
      </div>
    </div>
  );
}