import { Link } from "react-router-dom";

export default function FooterBuilders() {
  return (
    <footer className="bg-gradient-to-t from-card/50 to-transparent border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-foreground/60 text-sm">
          © {new Date().getFullYear()} The Builders • Digital Marketing & Social Content
        </div>
        <div className="flex items-center gap-5 text-sm">
            <button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="text-foreground/60 hover:text-foreground">Services</button>
            <button onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })} className="text-foreground/60 hover:text-foreground">Work</button>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="text-foreground/60 hover:text-foreground">Contact</button>
            <Link to="/makers" className="text-foreground/50 hover:text-foreground">← Makers</Link>
        </div>
      </div>
    </footer>
  );
}
