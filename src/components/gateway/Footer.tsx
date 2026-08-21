import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#0A0A0A] pt-20 pb-12 px-6 md:px-12 border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4 group" aria-label="Home">
              <img
                src="/vinciestudio.png"
                alt="Vincie Studios Logo"
                className="h-8 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
              <span className="text-base font-semibold tracking-wide text-[#F5F5F5]">
                Vincie Studios
              </span>
            </Link>
            <p className="text-sm text-[#888888] font-light max-w-[40ch] leading-relaxed mb-6">
              Obsessive product engineering combined with elite digital strategy to build market-leading software and scale ambitious brands.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-sm text-[#888888]">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">All Services</Link>
              </li>
              <li>
                <Link to="/process" className="hover:text-white transition-colors">Process & Lifecycle</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Key Capabilities</h4>
            <ul className="space-y-2.5 text-sm text-[#888888]">
              <li>
                <Link to="/services/web-applications" className="hover:text-white transition-colors">Web Applications</Link>
              </li>
              <li>
                <Link to="/services/saas" className="hover:text-white transition-colors">SaaS Platforms</Link>
              </li>
              <li>
                <Link to="/services/crms" className="hover:text-white transition-colors">Custom CRMs</Link>
              </li>
              <li>
                <Link to="/services/erp" className="hover:text-white transition-colors">Enterprise ERPs</Link>
              </li>
              <li>
                <Link to="/services/automation" className="hover:text-white transition-colors">AI & Automation</Link>
              </li>
              <li>
                <Link to="/services/cloud-devops" className="hover:text-white transition-colors">Cloud & DevOps</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Get in Touch</h4>
            <ul className="space-y-2.5 text-sm text-[#888888]">
              <li>
                <a href="mailto:vinciestudios@gmail.com" className="hover:text-white transition-colors">
                  vinciestudios@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+917375038069" className="hover:text-white transition-colors">
                  +91 73750 38069
                </a>
              </li>
              <li className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-white/80 transition-colors uppercase tracking-wider"
                >
                  Start a Project &rarr;
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-[#666666]">
          <span>© {new Date().getFullYear()} Vincie Studios. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
