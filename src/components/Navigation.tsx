import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/elixor.png";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link
              to="/"
              className="flex items-center space-x-2 hover:opacity-80 transition"
            >
              <img
                src={logo}
                alt="ElixorTech Logo"
                className="h-8 w-auto sm:h-10 md:h-12 lg:h-14"
              />
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gradient">
                ElixorTech
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => scrollToSection("home")}
                className="nav-link"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="nav-link"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("work")}
                className="nav-link"
              >
                Our Work
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="nav-link"
              >
                About Us
              </button>
              <Link
                to="/clickcrafters"
                className="relative inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400/20 to-blue-400/20 border border-cyan-400/50 text-cyan-300 hover:text-cyan-200 hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300 text-sm font-medium"
              >
                ClickCrafters
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card/95 backdrop-blur-md rounded-lg mt-2 border border-border">
              <button
                onClick={() => scrollToSection("home")}
                className="block px-3 py-2 text-base font-medium nav-link w-full text-left"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="block px-3 py-2 text-base font-medium nav-link w-full text-left"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("work")}
                className="block px-3 py-2 text-base font-medium nav-link w-full text-left"
              >
                Our Work
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block px-3 py-2 text-base font-medium nav-link w-full text-left"
              >
                About Us
              </button>

              <Link
                to="/clickcrafters"
                className="block px-3 py-2 text-base font-medium rounded-lg bg-gradient-to-r from-cyan-400/20 to-blue-400/20 border border-cyan-400/50 text-cyan-300 hover:text-cyan-200 hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300 mt-2"
              >
                ClickCrafters
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
