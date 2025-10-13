export default function AboutBuilders() {
  return (
    <section id="about" className="relative py-16">
      <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground">A content team that ships</h2>
          <p className="mt-3 text-foreground/75">
            We’re strategists, editors, designers, and media buyers under one roof.
            Our process is sprint-based: research → hooks → scripts → production → iterate.
            You get predictable output and numbers that move.
          </p>
          <ul className="mt-6 space-y-2 text-foreground/80">
            <li>• In-house studio & motion team</li>
            <li>• UGC creator roster across niches</li>
            <li>• Performance + creative testing loop</li>
            <li>• Weekly scorecards with next steps</li>
          </ul>
        </div>

        <div className="card-hover">
          <h3 className="text-xl font-semibold text-foreground/90">Engagement Models</h3>
          <div className="mt-4 space-y-3 text-foreground/75">
            <p><span className="text-foreground font-medium">Content Sprint:</span> 12–20 assets in 2 weeks.</p>
            <p><span className="text-foreground font-medium">Monthly Retainer:</span> Always-on content plus ads.</p>
            <p><span className="text-foreground font-medium">Launch Playbook:</span> 30-day go-to-market kit.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
