import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function NavigationBuilders() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/75 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
      role="banner"
    >
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl md:text-3xl font-semibold gradient-text hover:opacity-80 transition"
        >
          ClickCrafters
        </Link>

        <nav className="hidden md:flex items-baseline ml-10 space-x-8">
          <button onClick={() => scrollToSection("home")} className="nav-link">
            Home
          </button>
          <button
            onClick={() => scrollToSection("services")}
            className="nav-link"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection("portfolio")}
            className="nav-link"
          >
            Our Work
          </button>
          <button onClick={() => scrollToSection("about")} className="nav-link">
            About Us
          </button>
          <Link
            to="/elixortech"
            className="relative inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-400/20 to-pink-400/20 border border-purple-400/50 text-purple-300 hover:text-purple-200 hover:border-purple-300 transition-all duration-300 text-sm font-medium"
          >
            ElixorTech
          </Link>
        </nav>

        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen((s) => !s)}
            className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card/95 backdrop-blur-md rounded-lg mt-2 border border-border">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                scrollToSection("home");
              }}
              className="block px-3 py-2 text-base font-medium nav-link w-full text-left"
            >
              Home
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                scrollToSection("services");
              }}
              className="block px-3 py-2 text-base font-medium nav-link w-full text-left"
            >
              Services
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                scrollToSection("portfolio");
              }}
              className="block px-3 py-2 text-base font-medium nav-link w-full text-left"
            >
              Our Work
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                scrollToSection("about");
              }}
              className="block px-3 py-2 text-base font-medium nav-link w-full text-left"
            >
              About Us
            </button>
            <Link
              to="/elixortech"
              className="block px-3 py-2 text-base font-medium rounded-lg bg-gradient-to-r from-purple-400/20 to-pink-400/20 border border-purple-400/50 text-purple-300 hover:text-purple-200 transition-all duration-300 mt-2"
            >
              ElixorTech
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
