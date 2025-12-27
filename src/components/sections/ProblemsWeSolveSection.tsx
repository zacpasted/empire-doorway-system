const ProblemsWeSolveSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
            The Problem We Solve
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-6">
            You Know You Need to Build a Brand.<br />
            <span className="text-primary">You Just Don't Have Time to Guess.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            You're tired of figuring out what to post. Tired of editing on your phone at midnight. 
            Tired of watching other dentists win while you spin your wheels with agencies that don't understand your craft.
          </p>
        </div>

        {/* The Pain Points */}
        <div className="mb-16 max-w-3xl mx-auto space-y-6">
          <div className="flex items-start gap-4 p-6 border border-border/50 rounded-lg bg-card/30">
            <span className="flex-shrink-0 w-2 h-2 rounded-full bg-destructive mt-2.5" />
            <p className="text-lg text-muted-foreground leading-relaxed">
              <span className="text-foreground font-medium">Agency roulette.</span> You've hired marketers who promised the world and delivered recycled templates. Money gone. Months wasted. Trust burned.
            </p>
          </div>
          <div className="flex items-start gap-4 p-6 border border-border/50 rounded-lg bg-card/30">
            <span className="flex-shrink-0 w-2 h-2 rounded-full bg-destructive mt-2.5" />
            <p className="text-lg text-muted-foreground leading-relaxed">
              <span className="text-foreground font-medium">Content without direction.</span> You're posting to keep up, not to scale. The algorithm doesn't reward effort—it rewards intention.
            </p>
          </div>
          <div className="flex items-start gap-4 p-6 border border-border/50 rounded-lg bg-card/30">
            <span className="flex-shrink-0 w-2 h-2 rounded-full bg-destructive mt-2.5" />
            <p className="text-lg text-muted-foreground leading-relaxed">
              <span className="text-foreground font-medium">No leverage.</span> You're talented. You're credentialed. But the market doesn't understand who you are, why you're different, or why they should trust you at a premium.
            </p>
          </div>
        </div>

        {/* What We Do About It */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 border border-border rounded-lg bg-card/50 hover:border-primary/30 transition-all duration-300">
            <p className="text-primary uppercase tracking-[0.2em] text-xs mb-4">We Handle</p>
            <h3 className="text-xl font-serif text-foreground mb-4">Editing & Scheduling</h3>
            <p className="text-muted-foreground leading-relaxed">
              We take the work off your plate. All editing, all scheduling, all execution. 
              You focus on dentistry. We handle everything else.
            </p>
          </div>
          
          <div className="p-8 border border-border rounded-lg bg-card/50 hover:border-primary/30 transition-all duration-300">
            <p className="text-primary uppercase tracking-[0.2em] text-xs mb-4">We Provide</p>
            <h3 className="text-xl font-serif text-foreground mb-4">Expert Guidance</h3>
            <p className="text-muted-foreground leading-relaxed">
              Direction from the team behind some of the most recognized names in aesthetic dentistry. 
              Not templates. Not interns. The best in the business.
            </p>
          </div>
          
          <div className="p-8 border border-border rounded-lg bg-card/50 hover:border-primary/30 transition-all duration-300">
            <p className="text-primary uppercase tracking-[0.2em] text-xs mb-4">We Ensure</p>
            <h3 className="text-xl font-serif text-foreground mb-4">Intentional Direction</h3>
            <p className="text-muted-foreground leading-relaxed">
              Every piece of content scales into patients and momentum—not just "keeping up with posting." 
              Quality and strategy that compounds.
            </p>
          </div>
        </div>

        {/* Core Promise */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl" />
          <div className="relative p-8 md:p-12 text-center border border-primary/20 rounded-2xl">
            <p className="text-primary uppercase tracking-[0.3em] text-xs mb-6">
              The Result
            </p>
            <h3 className="text-2xl md:text-3xl font-serif text-foreground mb-6 leading-tight">
              We save you the guesswork. We save you time.<br />
              <span className="text-primary">We save you from bad vendors.</span>
            </h3>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
              We're tired of watching talented dentists get taken advantage of. 
              Associate to Empire™ exists because the best deserve better than agency roulette.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemsWeSolveSection;
