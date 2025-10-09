export default function AboutBuilders() {
  return (
    <section id="about" className="relative py-16">
      <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold">A content team that ships</h2>
          <p className="mt-3 text-black/70">
            We’re strategists, editors, designers, and media buyers under one roof.
            Our process is sprint-based: research → hooks → scripts → production → iterate.
            You get predictable output and numbers that move.
          </p>
          <ul className="mt-6 space-y-2 text-black/80">
            <li>• In-house studio & motion team</li>
            <li>• UGC creator roster across niches</li>
            <li>• Performance + creative testing loop</li>
            <li>• Weekly scorecards with next steps</li>
          </ul>
        </div>

        <div className="card-hover">
          <h3 className="text-xl font-semibold text-black/85">Engagement Models</h3>
          <div className="mt-4 space-y-3 text-black/70">
            <p><span className="text-black">Content Sprint:</span> 12–20 assets in 2 weeks.</p>
            <p><span className="text-black">Monthly Retainer:</span> Always-on content plus ads.</p>
            <p><span className="text-black">Launch Playbook:</span> 30-day go-to-market kit.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
