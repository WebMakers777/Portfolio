import { useEffect } from "react";
import NavigationBuilders from "@/components/Builders/NavigationBuilders";
import HeroBuilders from "@/components/Builders/HeroBuilders";
import LogosBuilders from "@/components/Builders/LogosBuilders";
import ServicesBuilders from "@/components/Builders/ServicesBuilders";
import PortfolioBuilders from "@/components/Builders/PortfolioBuilders";
import AboutBuilders from "@/components/Builders/AboutBuilders";
import ContactBuilders from "@/components/Builders/ContactBuilders";
import FooterBuilders from "@/components/Builders/FooterBuilders";

export default function Builders() {
  // Scroll reveal for ".fade-up" sections
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-up");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show");
        });
      },
      { threshold: 0.2 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <div className="theme-builders relative min-h-screen bg-gradient-to-b from-white to-[#f8faff] text-foreground overflow-hidden">
      {/* ambient gradient orbs */}
      <div className="bg-orb one" />
      <div className="bg-orb two" />

      <NavigationBuilders />
      <HeroBuilders />

      <div className="fade-up">
        <LogosBuilders />
      </div>
      <section className="fade-up">
        <ServicesBuilders />
      </section>
      <section className="fade-up">
        <PortfolioBuilders />
      </section>
      <section className="fade-up">
        <AboutBuilders />
      </section>
      <section className="fade-up">
        <ContactBuilders />
      </section>

      <FooterBuilders />
    </div>
  );
}
