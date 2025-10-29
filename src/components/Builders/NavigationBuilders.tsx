import { Link } from "react-router-dom";

export default function NavigationBuilders() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 bg-card/75 backdrop-blur-md border-b border-border shadow-sm">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="text-lg md:text-xl font-semibold gradient-text hover:opacity-80 transition"
        >
          ClickCrafters
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <button
            onClick={() => scrollToSection("home")}
            className="text-foreground/70 hover:text-foreground nav-link"
          >
            Home
          </button>
          <a
            href="#services"
            className="text-foreground/70 hover:text-foreground nav-link"
          >
            Services
          </a>
          <a
            href="#portfolio"
            className="text-foreground/70 hover:text-foreground nav-link"
          >
            Work
          </a>
          <a
            href="#about"
            className="text-foreground/70 hover:text-foreground nav-link"
          >
            About
          </a>
          <a
            href="#contact"
            className="text-foreground/70 hover:text-foreground nav-link"
          >
            Contact
          </a>
          <Link
            to="/elixortech"
            className="relative inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-400/20 to-pink-400/20 border border-purple-400/50 text-purple-300 hover:text-purple-200 hover:border-purple-300 hover:shadow-[0_0_20px_rgba(192,132,250,0.5)] transition-all duration-300 text-sm font-medium"
          >
            ElixorTech
          </Link>
        </nav>

        <button
          onClick={() => scrollToSection("contact")}
          className="ml-4 inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] text-white px-4 py-2 text-sm font-medium hover:opacity-90 shadow-md"
        >
          Get Proposal
        </button>
      </div>
    </header>
  );
}
