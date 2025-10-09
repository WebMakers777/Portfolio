import { Link } from "react-router-dom";

export default function FooterBuilders() {
  return (
    <footer className="bg-gradient-to-t from-[#f2f5ff] to-transparent border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-black/60 text-sm">
          © {new Date().getFullYear()} The Builders • Digital Marketing & Social Content
        </div>
        <div className="flex items-center gap-5 text-sm">
          <a href="#services" className="text-black/60 hover:text-black">Services</a>
          <a href="#portfolio" className="text-black/60 hover:text-black">Work</a>
          <a href="#contact" className="text-black/60 hover:text-black">Contact</a>
          <Link to="/makers" className="text-black/50 hover:text-black">← Makers</Link>
        </div>
      </div>
    </footer>
  );
}
