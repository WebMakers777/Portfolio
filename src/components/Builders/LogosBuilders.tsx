export default function LogosBuilders() {
  const logos = ["logo-1.svg","logo-2.svg","logo-3.svg","logo-4.svg","logo-5.svg","logo-6.svg","logo-7.svg","logo-8.svg"];
  return (
    <section className="py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center text-black/50 text-sm mb-3">Trusted by teams who move fast</div>
        <div className="tool-marquee border border-border rounded-xl bg-white/70">
          <div className="tool-track">
            {logos.concat(logos).map((src, i) => (
              <img key={i} src={`/builders/${src}`} alt="logo" className="h-7 opacity-70" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
