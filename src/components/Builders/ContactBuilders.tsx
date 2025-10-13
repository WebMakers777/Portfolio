export default function ContactBuilders() {
  return (
    <section id="contact" className="relative py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-2xl border border-border bg-card shadow-sm p-8">
          <h2 className="text-3xl font-semibold text-foreground">Get a custom proposal</h2>
          <p className="mt-2 text-foreground/70">
            Tell us your goals—leads, sales, awareness—and we’ll map a sprint.
          </p>

          <form
            className="mt-6 grid gap-4 sm:grid-cols-2"
            onSubmit={(e) => { e.preventDefault(); alert("Thanks! We’ll reach out shortly."); }}
          >
            <input className="rounded-xl bg-input border border-border px-4 py-3 outline-none text-foreground placeholder:text-muted-foreground" placeholder="Your name" required />
            <input className="rounded-xl bg-input border border-border px-4 py-3 outline-none text-foreground placeholder:text-muted-foreground" placeholder="Work email" type="email" required />
            <input className="rounded-xl bg-input border border-border px-4 py-3 outline-none text-foreground placeholder:text-muted-foreground" placeholder="Brand / Company" />
            <input className="rounded-xl bg-input border border-border px-4 py-3 outline-none text-foreground placeholder:text-muted-foreground" placeholder="Website / Instagram" />
            <textarea className="sm:col-span-2 min-h-[120px] rounded-xl bg-input border border-border px-4 py-3 outline-none text-foreground placeholder:text-muted-foreground" placeholder="What do you want to achieve in the next 90 days?" />
            <button className="sm:col-span-2 rounded-xl bg-[hsl(var(--primary))] text-white px-5 py-3 text-sm font-medium shadow-md hover:opacity-90">
              Request Proposal
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
