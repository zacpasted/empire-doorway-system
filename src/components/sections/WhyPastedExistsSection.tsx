const WhyPastedExistsSection = () => {
  return (
    <section className="py-24 md:py-32 border-y border-border/30">
      <div className="container max-w-3xl mx-auto px-4">
        <p className="text-primary uppercase tracking-[0.3em] text-sm text-center mb-8">
          Why Pasted Exists
        </p>
        
        <div className="space-y-8 text-lg md:text-xl text-muted-foreground leading-relaxed text-center">
          <p className="text-foreground font-serif text-2xl md:text-3xl">
            Pasted exists because aesthetic dentists were taught how to perfect a craft — but never how to be chosen.
          </p>

          <div className="h-px bg-border/50 my-8" />

          <div className="space-y-4">
            <p>Because talent without visibility doesn't create merit.</p>
            <p className="text-foreground font-medium">It creates despair.</p>
          </div>

          <div className="h-px bg-border/50 my-8" />

          <p>
            Because no one should spend years and tens of thousands of dollars becoming exceptional, only to feel invisible, replaceable, and alone.
          </p>

          <div className="h-px bg-border/50 my-8" />

          <p className="text-foreground">
            Because the profession built extraordinary clinicians — and then abandoned them at the moment that recognition, trust, and opportunity actually mattered.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyPastedExistsSection;
