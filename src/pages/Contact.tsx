import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Navbar from "@/components/gateway/Navbar";
import Footer from "@/components/gateway/Footer";
import WhatsAppFloat from "@/components/WhatsappFloat";
import ContactFormSection from "@/components/gateway/ContactFormSection";

const easeOutQuint = [0.22, 1, 0.36, 1] as const;

export default function Contact() {
  return (
    <main className="relative min-h-screen w-full bg-[#0A0A0A] text-[#F5F5F5] selection:bg-[#F5F5F5] selection:text-[#0A0A0A] overflow-hidden font-inter">
      <Navbar />

      {/* Cinematic noise texture */}
      <div
        className="pointer-events-none fixed inset-0 z-40 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.8' numOctaves='3' type='fractalNoise' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ──────────────── HERO ──────────────── */}
      <section className="relative z-10 pt-[22vh] pb-[6vh] px-6 md:px-12">
        <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.04)_0%,_transparent_70%)] blur-[120px]" />

        <div className="mx-auto max-w-[1280px] text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeOutQuint }}
            className="max-w-[800px] mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#111111]/40 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A3A3A3] mb-6 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-white/80" />
              <span>Let's Build</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.08]">
              Start your project with{" "}
              <span className="bg-gradient-to-r from-white via-[#D0D0D0] to-[#888888] bg-clip-text text-transparent">
                Vincie Studios.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[#A3A3A3] font-light leading-relaxed max-w-[55ch] mx-auto">
              Have a high-scale platform requirement or an innovative product vision? Tell us your goals and we'll engineer the roadmap.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ──────────────── CONTACT FORM & DETAILS ──────────────── */}
      <ContactFormSection
        source="contact-page"
        title="Direct channels"
        subtitle="Prefer a direct email or phone conversation? We reply to all inquiries within 24 business hours."
      />

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
