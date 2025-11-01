import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast"; // Assuming this path is correct for your project

export default function Gateway() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <main className="relative min-h-screen w-full bg-[#0B1120] text-white overflow-hidden">
      {/* ---------- Background décor (subtle grid + floating glows) ---------- */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.075] grid-noise" />
      <div className="pointer-events-none absolute -top-24 -left-24 h-[42rem] w-[42rem] rounded-full blur-3xl bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-transparent animate-float-slow" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-[36rem] w-[36rem] rounded-full blur-3xl bg-gradient-to-br from-fuchsia-500/20 via-purple-500/10 to-transparent animate-float-slower" />

      {/* ---------- Header / Quote ---------- */}
      <motion.header
        className="relative z-10 mx-auto max-w-6xl px-6 pt-14 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="text-xs tracking-widest text-white/60 uppercase mb-2"
          variants={itemVariants}
        >
          Vincie Studios
        </motion.p>
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight"
          variants={itemVariants}
        >
          Crafting Digital Experiences that
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-fuchsia-300">
            Build Products & Grow Brands
          </span>
        </motion.h1>
        <motion.p
          className="mt-6 text-white/70 max-w-3xl mx-auto text-base md:text-lg leading-relaxed"
          variants={itemVariants}
        >
          "ElixorTech turns ideas into products. ClickCrafters turn stories into
          demand." Choose your path below.
        </motion.p>
      </motion.header>

      {/* ---------- Stats Section ---------- */}
      <motion.section
        className="relative z-10 mx-auto max-w-6xl px-6 py-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-8">
          <motion.div className="text-center" variants={itemVariants}>
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-cyan-300">
              50+
            </div>
            <div className="text-xs md:text-sm text-white/60 mt-2">
              Projects Delivered
            </div>
          </motion.div>
          <motion.div className="text-center" variants={itemVariants}>
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-fuchsia-300">
              100+
            </div>
            <div className="text-xs md:text-sm text-white/60 mt-2">
              Happy Clients
            </div>
          </motion.div>
          <motion.div className="text-center" variants={itemVariants}>
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-purple-300">
              5+
            </div>
            <div className="text-xs md:text-sm text-white/60 mt-2">
              Years Experience
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ---------- Features Section ---------- */}
      <motion.section
        className="relative z-10 mx-auto max-w-6xl px-6 py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-semibold text-center mb-12"
          variants={itemVariants}
        >
          Why Choose{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-fuchsia-300">
            Vincie Studios?
          </span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition"
            variants={itemVariants}
            whileHover={{ y: -4 }}
          >
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="font-semibold mb-2 text-lg">Fast & Scalable</h3>
            <p className="text-white/60 text-sm">
              Built for growth with modern tech stacks that scale from MVP to
              enterprise.
            </p>
          </motion.div>
          <motion.div
            className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition"
            variants={itemVariants}
            whileHover={{ y: -4 }}
          >
            <div className="text-3xl mb-3">✨</div>
            <h3 className="font-semibold mb-2 text-lg">Design Excellence</h3>
            <p className="text-white/60 text-sm">
              Beautiful, intuitive interfaces that users love and brands trust.
            </p>
          </motion.div>
          <motion.div
            className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition"
            variants={itemVariants}
            whileHover={{ y: -4 }}
          >
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-semibold mb-2 text-lg">Results Driven</h3>
            <p className="text-white/60 text-sm">
              Every project backed by strategy, analytics, and proven success
              metrics.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* ---------- CTA Section ---------- */}
      <motion.section
        className="relative z-10 mx-auto max-w-4xl px-6 py-16 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Ready to Build Something Amazing?
        </h2>
        <p className="text-white/60 mb-8">
          Whether you need a powerful product or a compelling brand presence,
          we're here to make it happen.
        </p>
      </motion.section>

      {/* ---------- Portal Cards ---------- */}
      <motion.section
        className="relative z-10 mx-auto max-w-6xl px-6 py-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ElixorTech */}
          <motion.div variants={itemVariants}>
            <Link
              to="/elixortech"
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.06] transition will-change-transform h-full block"
              aria-label="Enter ElixorTech site"
            >
              {/* Shine */}
              <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl group-hover:opacity-100 opacity-80 transition" />
              {/* Content */}
              <div className="relative aspect-[4/3] md:aspect-[3/2] p-8 flex flex-col items-start justify-end">
                <motion.span
                  className="text-xs px-2 py-1 rounded-full bg-cyan-400/15 text-cyan-200 border border-cyan-400/20 mb-3"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  Product Development & Engineering
                </motion.span>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                  ElixorTech
                </h2>
                <p className="mt-4 text-white/70 max-w-[42ch] text-sm md:text-base">
                  Custom web & mobile solutions engineered for scale. We build
                  React, Next.js, Node, Flutter & AWS applications that drive
                  real business results.
                </p>
                <motion.span
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/90 group-hover:translate-x-1 transition"
                  whileHover={{ x: 4 }}
                >
                  Enter ElixorTech →
                </motion.span>
              </div>
              {/* Bottom border glow */}
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
            </Link>
          </motion.div>

          {/* ClickCrafters */}
          <motion.div variants={itemVariants}>
            <Link
              to="/clickcrafters"
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.06] transition will-change-transform h-full block"
              aria-label="Enter ClickCrafters site"
            >
              {/* Shine */}
              <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-fuchsia-500/25 blur-3xl group-hover:opacity-100 opacity-80 transition" />
              {/* Content */}
              <div className="relative aspect-[4/3] md:aspect-[3/2] p-8 flex flex-col items-start justify-end">
                <motion.span
                  className="text-xs px-2 py-1 rounded-full bg-fuchsia-500/15 text-fuchsia-200 border border-fuchsia-500/20 mb-3"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  Digital Marketing & Social Media
                </motion.span>
                <h2 className="text-3xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
                  ClickCrafters
                </h2>
                <p className="mt-4 text-white/70 max-w-[44ch] text-sm md:text-base">
                  Strategic content & creative campaigns that connect your brand
                  with audiences. From viral moments to sustained engagement, we
                  build your digital presence.
                </p>
                <motion.span
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/90 group-hover:translate-x-1 transition"
                  whileHover={{ x: 4 }}
                >
                  Experience The Growth →
                </motion.span>
              </div>
              {/* Bottom border glow */}
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/40 to-transparent" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* ---------- NEW: Contact Section ---------- */}
      <ContactSection />

      {/* ---------- Footer ---------- */}
      <motion.footer
        className="relative z-10 pb-10 text-center text-white/50 text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        © {new Date().getFullYear()} Vincie Studios — ElixorTech & ClickCrafters
      </motion.footer>
    </main>
  );
}

// ==================================================================
// ================== NEW CONTACT COMPONENT =========================
// ==================================================================

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <motion.section
      id="contact"
      className="relative z-10 mx-auto max-w-6xl px-6 py-20 lg:py-32"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Section Header */}
      <motion.div className="text-center mb-16" variants={itemVariants}>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          Get In{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-fuchsia-300">
            Touch
          </span>
        </h2>
        <p className="text-lg lg:text-xl text-white/70 max-w-3xl mx-auto">
          Ready to start your project? We'd love to hear from you. Send us a
          message and we'll respond as soon as possible.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        variants={containerVariants}
      >
        {/* Contact Info */}
        <motion.div className="space-y-8" variants={itemVariants}>
          <div>
            <h3 className="text-2xl font-bold mb-6">Let's Start a Conversation</h3>
            <p className="text-white/70 mb-8 leading-relaxed">
              Whether you have a project in mind, need a consultation, or just
              want to say hello, we're here to help. Our team is ready to bring
              your digital vision to life.
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-cyan-400/15 rounded-lg flex items-center justify-center border border-cyan-400/20">
                <Mail className="w-5 h-5 text-cyan-300" />
              </div>
              <div>
                <p className="font-medium">Email Us</p>
                <p className="text-white/70">vinciestudios@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-cyan-400/15 rounded-lg flex items-center justify-center border border-cyan-400/20">
                <Phone className="w-5 h-5 text-cyan-300" />
              </div>
              <div>
                <p className="font-medium">Call Us</p>
                <p className="text-white/70">+91 93581 01310, +91 62049 58883</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-cyan-400/15 rounded-lg flex items-center justify-center border border-cyan-400/20">
                <MapPin className="w-5 h-5 text-cyan-300" />
              </div>
              <div>
                <p className="font-medium">Visit Us</p>
                <p className="text-white/70">Jaipur, Rajasthan, 302031</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <p className="font-medium mb-4">Follow Us</p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/[0.02] border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/[0.05] hover:text-cyan-300 transition-colors duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/[0.02] border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/[0.05] hover:text-cyan-300 transition-colors duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/[0.02] border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/[0.05] hover:text-cyan-300 transition-colors duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="rounded-2xl border border-white/10 bg-white/[0.04] p-8"
          variants={itemVariants}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2 text-white/80"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all duration-200"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-white/80"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2 text-white/80"
              >
                Project Details
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Tell us about your project, timeline, and budget..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-600 py-3 px-6 text-white font-semibold transition hover:opacity-90 disabled:opacity-50 group"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  Send Message
                  <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};