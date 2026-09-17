import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Mail,
  Phone,
  Send,
  ShieldCheck,
  CheckCircle2,
  Linkedin,
  Instagram,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { contactService } from "@/lib/contactService";

const easeOutQuint = [0.22, 1, 0.36, 1] as const;

const serviceOptionMap: Record<string, string> = {
  "web-applications": "Web Applications",
  "saas": "SaaS Platforms",
  "crms": "Custom CRMs",
  "erp": "Enterprise ERPs",
  "automation": "AI & Workflow Automation",
  "mobile-apps": "Mobile Apps (iOS/Android)",
  "cloud-devops": "Cloud & DevOps",
  "digital-growth": "Digital Growth & SEO",
};

interface ContactFormSectionProps {
  source?: string;
  title?: string;
  subtitle?: string;
  id?: string;
}

export default function ContactFormSection({
  source = "website",
  title = "Connect with us.",
  subtitle = "Prefer a direct email or phone conversation? We reply to all inquiries within 24 business hours.",
  id = "contact",
}: ContactFormSectionProps) {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get("service");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "SaaS Platforms",
    budget: "$10k - $25k",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (serviceParam && serviceOptionMap[serviceParam]) {
      setFormData((prev) => ({
        ...prev,
        service: serviceOptionMap[serviceParam],
      }));
    }
  }, [serviceParam]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await contactService.submitInquiry({
        name: formData.name,
        email: formData.email,
        budget: formData.budget,
        service: formData.service,
        message: formData.message,
        source: source,
      });

      setIsSubmitted(true);
      toast({
        title: "Inquiry received.",
        description: "Our technical team will reach out within 24 hours.",
      });

      setFormData({
        name: "",
        email: "",
        budget: "$10k - $25k",
        service: "SaaS Platforms",
        message: "",
      });
    } catch (err) {
      toast({
        title: "Inquiry received.",
        description: "Thank you for reaching out. We will connect shortly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id={id} className="relative z-10 py-24 sm:py-32 px-6 md:px-12 bg-[#0A0A0A]">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Direct Channels Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: easeOutQuint }}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                {title}
              </h2>
              <p className="text-[#A3A3A3] font-light leading-relaxed text-base sm:text-lg mb-8">
                {subtitle}
              </p>

              <div className="flex flex-col gap-4 sm:gap-5">
                {/* Email Us */}
                <a
                  href="mailto:hello@vinciestudios.com"
                  className="flex items-center gap-5 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12] transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#151515] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5 text-white/80" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-widest text-[#888888] mb-0.5">
                      Email Us
                    </div>
                    <div className="text-sm sm:text-base font-medium text-white group-hover:text-white/80 transition-colors">
                      hello@vinciestudios.com
                    </div>
                  </div>
                </a>

                {/* Call Directly */}
                <a
                  href="tel:+917375038069"
                  className="flex items-center gap-5 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12] transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#151515] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5 text-white/80" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-widest text-[#888888] mb-0.5">
                      Call Directly
                    </div>
                    <div className="text-sm sm:text-base font-medium text-white group-hover:text-white/80 transition-colors">
                      +91 73750 38069
                    </div>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/111233207"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-5 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12] transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#151515] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Linkedin className="w-5 h-5 text-white/80" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-widest text-[#888888] mb-0.5">
                      LinkedIn
                    </div>
                    <div className="text-sm sm:text-base font-medium text-white group-hover:text-white/80 transition-colors">
                      linkedin.com/company/111233207
                    </div>
                  </div>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/studiovincie"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-5 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12] transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#151515] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Instagram className="w-5 h-5 text-white/80" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-widest text-[#888888] mb-0.5">
                      Instagram
                    </div>
                    <div className="text-sm sm:text-base font-medium text-white group-hover:text-white/80 transition-colors">
                      @studiovincie
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* The Vincie Guarantee */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: easeOutQuint }}
            className="lg:col-span-7 p-8 sm:p-12 rounded-3xl overflow-hidden relative backdrop-blur-xl"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
            }}
          >
            {/* Ambient light for form */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-white/[0.03] rounded-full blur-[80px] pointer-events-none" />

            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center text-center py-16 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white mb-6">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  Inquiry Received
                </h3>
                <p className="text-[#A3A3A3] max-w-[42ch] mb-8 text-sm sm:text-base leading-relaxed">
                  Thank you for reaching out. Our engineering team will review your project requirements and connect with you within 24 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3 rounded-xl border border-white/20 text-white text-xs font-semibold uppercase tracking-wider hover:bg-white/10 transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                {/* Row 1: Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-[10px] font-bold text-[#A3A3A3] tracking-[0.15em] uppercase"
                    >
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
                    <label
                      htmlFor="email"
                      className="text-[10px] font-bold text-[#A3A3A3] tracking-[0.15em] uppercase"
                    >
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

                {/* Row 2: Service & Estimated Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="service"
                      className="text-[10px] font-bold text-[#A3A3A3] tracking-[0.15em] uppercase"
                    >
                      Service Interested In
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full bg-[#0A0A0A]/60 border border-white/[0.08] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white/30 transition-colors text-sm"
                    >
                      <option value="Web Applications" className="bg-[#111]">Web Applications</option>
                      <option value="SaaS Platforms" className="bg-[#111]">SaaS Platforms</option>
                      <option value="Custom CRMs" className="bg-[#111]">Custom CRMs</option>
                      <option value="Enterprise ERPs" className="bg-[#111]">Enterprise ERPs</option>
                      <option value="AI & Workflow Automation" className="bg-[#111]">AI & Workflow Automation</option>
                      <option value="Mobile Apps (iOS/Android)" className="bg-[#111]">Mobile Apps (iOS/Android)</option>
                      <option value="Cloud & DevOps" className="bg-[#111]">Cloud & DevOps</option>
                      <option value="Digital Growth & SEO" className="bg-[#111]">Digital Growth & SEO</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="budget"
                      className="text-[10px] font-bold text-[#A3A3A3] tracking-[0.15em] uppercase"
                    >
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

                {/* Row 3: Project Details */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="text-[10px] font-bold text-[#A3A3A3] tracking-[0.15em] uppercase"
                  >
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

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-b from-[#FFFFFF] to-[#E5E5E5] text-[#0A0A0A] rounded-xl py-4 font-bold shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:-translate-y-0.5 active:scale-[0.98] transition-all disabled:opacity-50 mt-2"
                >
                  {isSubmitting ? "Submitting Inquiry..." : "Submit Inquiry"}
                  {!isSubmitting && <Send className="w-4 h-4 ml-1" />}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
