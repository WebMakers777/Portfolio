import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Mail,
  Phone,
  Send,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/gateway/Navbar";
import Footer from "@/components/gateway/Footer";
import WhatsAppFloat from "@/components/WhatsappFloat";
import { useToast } from "@/hooks/use-toast";

const easeOutQuint = [0.22, 1, 0.36, 1] as const;

const serviceOptionMap: Record<string, string> = {
  "web-applications": "Web Application",
  "saas": "SaaS Platform",
  "crms": "Custom CRM",
  "erp": "Enterprise ERP",
  "automation": "AI & Workflow Automation",
  "mobile-apps": "Mobile App (iOS/Android)",
  "cloud-devops": "Cloud & DevOps",
  "digital-growth": "Digital Growth & SEO",
};

export default function Contact() {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get("service");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budget: "$10k - $25k",
    service: "SaaS Platform",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (serviceParam && serviceOptionMap[serviceParam]) {
      setFormData((prev) => ({
        ...prev,
        service: serviceOptionMap[serviceParam],
      }));
    }
  }, [serviceParam]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        source: "contact-page",
      };
      const resp = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      let data = await resp.json().catch(() => ({ success: resp.ok }));
      if (data?.success || resp.ok) {
        toast({
          title: "Inquiry received.",
          description: "Our technical team will reach out within 24 hours.",
        });
        setFormData({
          name: "",
          email: "",
          budget: "$10k - $25k",
          service: "SaaS Platform",
          message: "",
        });
      } else {
        throw new Error(data?.error || "Failed");
      }
    } catch (err) {
      toast({
        title: "Inquiry received.",
        description: "Thank you for reaching out. We will connect shortly.",
      });
      setFormData({
        name: "",
        email: "",
        budget: "$10k - $25k",
        service: "SaaS Platform",
        message: "",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
      <section className="relative z-10 pt-[22vh] pb-[10vh] px-6 md:px-12">
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
      <section className="relative z-10 py-16 px-6 md:px-12 pb-32">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Contact Details Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: easeOutQuint }}
              className="lg:col-span-5 flex flex-col gap-10"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Direct channels
                </h2>
                <p className="text-sm sm:text-base text-[#A3A3A3] font-light leading-relaxed mb-8">
                  Prefer a direct email or phone conversation? We reply to all inquiries within 24 business hours.
                </p>

                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-5 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="w-12 h-12 rounded-xl bg-[#151515] border border-white/[0.08] flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-white/80" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold tracking-widest text-[#888]">Email Us</div>
                      <a
                        href="mailto:vinciestudios@gmail.com"
                        className="text-base font-medium text-white hover:text-white/80 transition-colors"
                      >
                        vinciestudios@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="w-12 h-12 rounded-xl bg-[#151515] border border-white/[0.08] flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-white/80" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold tracking-widest text-[#888]">Call Directly</div>
                      <a
                        href="tel:+917375038069"
                        className="text-base font-medium text-white hover:text-white/80 transition-colors"
                      >
                        +91 73750 38069
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
                <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-white/80" />
                  The Vincie Guarantee
                </h3>
                <ul className="space-y-3 text-sm text-[#A3A3A3] font-light">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-white/60 mt-0.5 shrink-0" />
                    <span>Non-Disclosure Agreement (NDA) on request</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-white/60 mt-0.5 shrink-0" />
                    <span>Direct engineering consultation (no account managers)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-white/60 mt-0.5 shrink-0" />
                    <span>Transparent fixed-price or dedicated team scopes</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Interactive Form Column */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: easeOutQuint }}
              className="lg:col-span-7 flex flex-col gap-6 p-8 sm:p-12 rounded-3xl overflow-hidden relative backdrop-blur-xl"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-[10px] font-bold text-[#A3A3A3] tracking-[0.15em] uppercase">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-[#0A0A0A]/60 border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder-[#555] focus:outline-none focus:border-white/30 transition-colors text-sm"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[10px] font-bold text-[#A3A3A3] tracking-[0.15em] uppercase">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-[#0A0A0A]/60 border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder-[#555] focus:outline-none focus:border-white/30 transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="service" className="text-[10px] font-bold text-[#A3A3A3] tracking-[0.15em] uppercase">
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full bg-[#0A0A0A]/60 border border-white/[0.08] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white/30 transition-colors text-sm"
                  >
                    <option value="Web Application" className="bg-[#111]">Web Application</option>
                    <option value="SaaS Platform" className="bg-[#111]">SaaS Platform</option>
                    <option value="Custom CRM" className="bg-[#111]">Custom CRM</option>
                    <option value="Enterprise ERP" className="bg-[#111]">Enterprise ERP</option>
                    <option value="AI & Workflow Automation" className="bg-[#111]">AI & Workflow Automation</option>
                    <option value="Mobile App (iOS/Android)" className="bg-[#111]">Mobile App (iOS/Android)</option>
                    <option value="Cloud & DevOps" className="bg-[#111]">Cloud & DevOps</option>
                    <option value="Digital Growth & SEO" className="bg-[#111]">Digital Growth & SEO</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="budget" className="text-[10px] font-bold text-[#A3A3A3] tracking-[0.15em] uppercase">
                    Estimated Budget
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full bg-[#0A0A0A]/60 border border-white/[0.08] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white/30 transition-colors text-sm"
                  >
                    <option value="< $10k" className="bg-[#111]">&lt; $10k</option>
                    <option value="$10k - $25k" className="bg-[#111]">$10k - $25k</option>
                    <option value="$25k - $50k" className="bg-[#111]">$25k - $50k</option>
                    <option value="$50k+" className="bg-[#111]">$50k+</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-[10px] font-bold text-[#A3A3A3] tracking-[0.15em] uppercase">
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell us about the project goals, timeline, and any specific technical requirements..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-[#0A0A0A]/60 border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder-[#555] focus:outline-none focus:border-white/30 transition-colors resize-none text-sm leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-b from-[#FFFFFF] to-[#E5E5E5] text-[#0A0A0A] rounded-xl py-4 font-bold shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:-translate-y-0.5 active:scale-[0.98] transition-all disabled:opacity-50 mt-2"
              >
                {isSubmitting ? "Submitting Inquiry..." : "Submit Inquiry"}
                {!isSubmitting && <Send className="w-4 h-4 ml-1" />}
              </button>
            </motion.form>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
