const ProblemsWeSolveSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
            The Category We Define
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-6">
            Brand Infrastructure.<br />
            <span className="text-primary">Authority Engineering.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The profession is full of skilled operators and short on authority, coherence, and trust at scale. 
            Most competitors treat symptoms. We treat the cause.
          </p>
        </div>

        {/* The Problem Statement */}
        <div className="mb-16 max-w-3xl mx-auto">
          <p className="text-lg text-muted-foreground text-center leading-relaxed mb-8">
            Performance agencies buy attention. They struggle to manufacture <span className="text-foreground">belief</span>.
          </p>
          <p className="text-lg text-muted-foreground text-center leading-relaxed mb-8">
            Platform companies automate workflows. They cannot create <span className="text-foreground">cultural signal</span>.
          </p>
          <p className="text-lg text-muted-foreground text-center leading-relaxed">
            Traditional consultants advise. They rarely produce modern, high-taste creative with <span className="text-foreground">authority psychology</span> built in.
          </p>
        </div>

        {/* Three Leverage Pillars */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 border border-border rounded-lg bg-card/50 hover:border-primary/30 transition-all duration-300">
            <p className="text-primary uppercase tracking-[0.2em] text-xs mb-4">Pillar One</p>
            <h3 className="text-xl font-serif text-foreground mb-4">Identity Clarity</h3>
            <p className="text-muted-foreground leading-relaxed">
              Most dentists have skills, credentials, and CE—but no singular meaning in the market. 
              We turn a practitioner into a recognizable, coherent entity with a point of view.
            </p>
          </div>
          
          <div className="p-8 border border-border rounded-lg bg-card/50 hover:border-primary/30 transition-all duration-300">
            <p className="text-primary uppercase tracking-[0.2em] text-xs mb-4">Pillar Two</p>
            <h3 className="text-xl font-serif text-foreground mb-4">Narrative Control</h3>
            <p className="text-muted-foreground leading-relaxed">
              Rather than "posting," we build a repeatable storyline that patients and peers can retell. 
              This is what creates referrals, trust, and pricing power.
            </p>
          </div>
          
          <div className="p-8 border border-border rounded-lg bg-card/50 hover:border-primary/30 transition-all duration-300">
            <p className="text-primary uppercase tracking-[0.2em] text-xs mb-4">Pillar Three</p>
            <h3 className="text-xl font-serif text-foreground mb-4">Conversion Architecture</h3>
            <p className="text-muted-foreground leading-relaxed">
              We do not simply generate interest. We shape patient certainty before the consult 
              and remove the friction that kills premium case acceptance.
            </p>
          </div>
        </div>

        {/* Core Promise */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl" />
          <div className="relative p-8 md:p-12 text-center border border-primary/20 rounded-2xl">
            <p className="text-primary uppercase tracking-[0.3em] text-xs mb-6">
              The PASTED Promise
            </p>
            <h3 className="text-2xl md:text-3xl font-serif text-foreground mb-6 leading-tight">
              We build dentists into the obvious choice<br />
              <span className="text-primary">by engineering belief at scale.</span>
            </h3>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
              Patients arrive pre-sold. Pricing stops being debated. 
              Growth becomes compounding rather than reactive.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemsWeSolveSection;