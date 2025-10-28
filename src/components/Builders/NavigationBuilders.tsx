import { Link } from "react-router-dom";

export default function NavigationBuilders() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-card/75 backdrop-blur-md border-b border-border shadow-sm">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link to="/builders" className="text-lg md:text-xl font-semibold gradient-text">
          Click Crafters
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <button onClick={() => scrollToSection('services')} className="text-foreground/70 hover:text-foreground nav-link">Services</button>
          <button onClick={() => scrollToSection('portfolio')} className="text-foreground/70 hover:text-foreground nav-link">Work</button>
          <button onClick={() => scrollToSection('about')} className="text-foreground/70 hover:text-foreground nav-link">About</button>
          <button onClick={() => scrollToSection('contact')} className="text-foreground/70 hover:text-foreground nav-link">Contact</button>
          <Link to="/makers" className="text-foreground/50 hover:text-foreground">← Makers</Link>
        </nav>

        <button
          onClick={() => scrollToSection('contact')}
          className="ml-4 inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] text-white px-4 py-2 text-sm font-medium hover:opacity-90 shadow-md"
        >
          Get Proposal
        </button>
      </div>
    </header>
  );
}
