import { Link } from "react-router-dom";

export default function NavigationBuilders() {
  return (
    <header className="sticky top-0 z-50 bg-white/75 backdrop-blur-md border-b border-border shadow-sm">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link to="/builders" className="text-lg md:text-xl font-semibold gradient-text">
          The Builders
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#services" className="text-black/70 hover:text-black nav-link">Services</a>
          <a href="#portfolio" className="text-black/70 hover:text-black nav-link">Work</a>
          <a href="#about" className="text-black/70 hover:text-black nav-link">About</a>
          <a href="#contact" className="text-black/70 hover:text-black nav-link">Contact</a>
          <Link to="/makers" className="text-black/50 hover:text-black">← Makers</Link>
        </nav>

        <a
          href="#contact"
          className="ml-4 inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] text-white px-4 py-2 text-sm font-medium hover:opacity-90 shadow-md"
        >
          Get Proposal
        </a>
      </div>
    </header>
  );
}
