const MarketTeardownSection = () => {
  return (
    <section className="py-20 md:py-28 bg-card/30">
      <div className="container max-w-3xl mx-auto px-4">
        <p className="text-lg md:text-xl text-foreground mb-12 text-center font-serif">
          The dental industry is saturated with tactical solutions for strategic problems.
        </p>

        <div className="space-y-4 text-muted-foreground text-lg leading-relaxed mb-12">
          <p>Posting schedules are offered where <span className="text-foreground/80">positioning</span> is required.</p>
          <p>Templates are distributed where <span className="text-foreground/80">identity</span> is missing.</p>
          <p>Engagement is chased where <span className="text-foreground/80">trust</span> should be engineered.</p>
        </div>

        <p className="text-center text-muted-foreground text-lg mb-12">
          The result is a generation of dentists who are visible but <span className="text-foreground">indistinguishable</span>.
        </p>

        <div className="h-px bg-border/50 my-12" />

        <div className="space-y-6 text-lg">
          <p className="text-foreground font-medium text-center">
            Associate to Empire™ was built in opposition to that model.
          </p>

          <div className="space-y-3 text-muted-foreground text-center">
            <p>It treats brand as <span className="text-foreground/80">infrastructure</span>.</p>
            <p>It prioritizes <span className="text-foreground/80">coherence</span> over activity.</p>
            <p>It values <span className="text-foreground/80">long-term signal</span> over short-term reach.</p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/30">
          <p className="text-center text-foreground font-serif text-xl md:text-2xl">
            This is the disruption:
          </p>
          <p className="text-center text-muted-foreground text-lg mt-4 italic">
            Refusing to participate in noise—even when noise sells.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MarketTeardownSection;
