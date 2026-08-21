import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Monitor,
  Layers,
  Database,
  Building2,
  Cpu,
  Smartphone,
  Cloud,
  TrendingUp,
} from "lucide-react";
import { servicesData } from "@/data/servicesData";

const easeOutQuint = [0.22, 1, 0.36, 1] as const;

const serviceIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "web-applications": Monitor,
  "saas": Layers,
  "crms": Database,
  "erp": Building2,
  "automation": Cpu,
  "mobile-apps": Smartphone,
  "cloud-devops": Cloud,
  "digital-growth": TrendingUp,
};

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [location.pathname]);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setServicesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 180);
  };

  const isServicesActive = location.pathname.startsWith("/services");

  return (
    <motion.nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0A0A0A]/50 backdrop-blur-2xl backdrop-saturate-[180%] py-4 shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
          : "bg-transparent py-5"
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: easeOutQuint }}
    >
      <div className="mx-auto max-w-[1280px] flex items-center justify-between px-6 md:px-12">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group" aria-label="Home">
          <img
            src="/vinciestudio.png"
            alt="Vincie Studios Logo"
            className="h-8 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
          />
          <span className="text-base font-semibold tracking-wide text-[#F5F5F5] hidden sm:inline-block">
            Vincie Studios
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/about"
            className={`relative text-[13px] font-medium tracking-wide uppercase transition-colors duration-300 ${
              location.pathname === "/about" ? "text-white font-semibold" : "text-[#888888] hover:text-white"
            }`}
          >
            About
            {location.pathname === "/about" && (
              <motion.div
                layoutId="activeNavUnderline"
                className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-white rounded-full shadow-[0_0_8px_white]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>

          {/* Services Dropdown Trigger */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex items-center gap-1">
              <Link
                to="/services"
                className={`relative flex items-center gap-1.5 text-[13px] font-medium tracking-wide uppercase transition-colors duration-300 py-1 ${
                  isServicesActive ? "text-white font-semibold" : "text-[#888888] hover:text-white"
                }`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    servicesDropdownOpen ? "rotate-180 text-white" : "text-[#888888]"
                  }`}
                />
                {isServicesActive && (
                  <motion.div
                    layoutId="activeNavUnderline"
                    className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-white rounded-full shadow-[0_0_8px_white]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            </div>

            {/* Desktop Mega Dropdown Panel */}
            <AnimatePresence>
              {servicesDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: easeOutQuint }}
                  className="absolute top-full -left-28 w-[640px] pt-3 pointer-events-auto"
                >
                  <div className="rounded-2xl bg-[#0D0D0D]/95 backdrop-blur-2xl border border-white/[0.1] shadow-[0_25px_70px_rgba(0,0,0,0.85)] p-5 overflow-hidden">
                    <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-white/[0.06]">
                      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#888888]">
                        Engineering & Growth Capabilities
                      </span>
                      <Link
                        to="/services"
                        onClick={() => setServicesDropdownOpen(false)}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-white/80 hover:text-white transition-colors"
                      >
                        All Capabilities
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {servicesData.map((service) => {
                        const Icon = serviceIconMap[service.slug] || Monitor;
                        const isCurrent = location.pathname === `/services/${service.slug}`;

                        return (
                          <Link
                            key={service.slug}
                            to={`/services/${service.slug}`}
                            onClick={() => setServicesDropdownOpen(false)}
                            className={`group flex items-start gap-3.5 p-3 rounded-xl transition-all duration-200 ${
                              isCurrent
                                ? "bg-white/[0.08] border border-white/[0.15]"
                                : "hover:bg-white/[0.05] border border-transparent hover:border-white/[0.06]"
                            }`}
                          >
                            <div
                              className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                                isCurrent
                                  ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                                  : "bg-[#181818] border border-white/[0.08] text-[#D4D4D4] group-hover:bg-white group-hover:text-black group-hover:border-white"
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-semibold text-white group-hover:text-white transition-colors">
                                  {service.shortTitle}
                                </span>
                              </div>
                              <p className="text-[11px] text-[#888888] line-clamp-1 group-hover:text-[#A3A3A3] font-light transition-colors mt-0.5">
                                {service.tagline}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between bg-white/[0.02] -mx-5 -mb-5 px-5 py-3">
                      <span className="text-[11px] text-[#888888]">
                        Need custom enterprise architecture or a custom stack?
                      </span>
                      <Link
                        to="/contact"
                        onClick={() => setServicesDropdownOpen(false)}
                        className="text-xs font-semibold text-white hover:underline flex items-center gap-1"
                      >
                        Talk to an engineer &rarr;
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/process"
            className={`relative text-[13px] font-medium tracking-wide uppercase transition-colors duration-300 ${
              location.pathname === "/process" ? "text-white font-semibold" : "text-[#888888] hover:text-white"
            }`}
          >
            Process
            {location.pathname === "/process" && (
              <motion.div
                layoutId="activeNavUnderline"
                className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-white rounded-full shadow-[0_0_8px_white]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>

          <Link
            to="/contact"
            className={`relative text-[13px] font-medium tracking-wide uppercase transition-colors duration-300 ${
              location.pathname === "/contact" ? "text-white font-semibold" : "text-[#888888] hover:text-white"
            }`}
          >
            Contact
            {location.pathname === "/contact" && (
              <motion.div
                layoutId="activeNavUnderline"
                className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-white rounded-full shadow-[0_0_8px_white]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-4">
          <Link
            to="/contact"
            className="hidden md:inline-flex group relative px-5 py-2.5 rounded-lg text-sm font-semibold bg-gradient-to-b from-white to-[#E5E5E5] text-black shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] active:scale-[0.98] transition-all overflow-hidden"
          >
            <span className="relative z-10">Start a Project</span>
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.03] text-white/80 hover:bg-white/[0.06] transition-all"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: easeOutQuint }}
            className="md:hidden overflow-hidden border-t border-white/[0.08] bg-[#0A0A0A]/95 backdrop-blur-2xl max-h-[85vh] overflow-y-auto"
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-sm font-medium py-3 border-b border-white/[0.04] tracking-wide uppercase transition-colors ${
                  location.pathname === "/about" ? "text-white font-semibold" : "text-[#A3A3A3] hover:text-white"
                }`}
              >
                About
              </Link>

              {/* Mobile Services Accordion */}
              <div className="border-b border-white/[0.04] py-1">
                <div className="flex items-center justify-between">
                  <Link
                    to="/services"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block text-sm font-medium py-2.5 tracking-wide uppercase transition-colors ${
                      isServicesActive ? "text-white font-semibold" : "text-[#A3A3A3] hover:text-white"
                    }`}
                  >
                    Services
                  </Link>
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="p-2 text-[#888888] hover:text-white transition-colors"
                    aria-label="Toggle services list"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        mobileServicesOpen ? "rotate-180 text-white" : ""
                      }`}
                    />
                  </button>
                </div>

                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden pl-2 pr-1 pb-3 space-y-1"
                    >
                      <Link
                        to="/services"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 py-2 px-2 rounded-lg text-xs font-semibold text-white/90 hover:bg-white/[0.06] transition-colors"
                      >
                        <ArrowRight className="w-3.5 h-3.5 text-white/60" />
                        <span>All Capabilities Overview</span>
                      </Link>
                      {servicesData.map((service) => {
                        const Icon = serviceIconMap[service.slug] || Monitor;
                        const isCurrent = location.pathname === `/services/${service.slug}`;
                        return (
                          <Link
                            key={service.slug}
                            to={`/services/${service.slug}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center gap-2.5 py-2 px-2 rounded-lg text-xs transition-colors ${
                              isCurrent
                                ? "bg-white/[0.1] text-white font-semibold"
                                : "text-[#888888] hover:text-white hover:bg-white/[0.04]"
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5 shrink-0" />
                            <span>{service.shortTitle}</span>
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/process"
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-sm font-medium py-3 border-b border-white/[0.04] tracking-wide uppercase transition-colors ${
                  location.pathname === "/process" ? "text-white font-semibold" : "text-[#A3A3A3] hover:text-white"
                }`}
              >
                Process
              </Link>

              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-sm font-medium py-3 border-b border-white/[0.04] last:border-0 tracking-wide uppercase transition-colors ${
                  location.pathname === "/contact" ? "text-white font-semibold" : "text-[#A3A3A3] hover:text-white"
                }`}
              >
                Contact
              </Link>

              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 mb-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#FFFFFF] to-[#E5E5E5] text-black px-6 py-3 text-sm font-semibold shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-[0.98] transition-all"
              >
                Start a Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
