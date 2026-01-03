const FoundersLetterSection = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="container max-w-2xl mx-auto px-4">
        <p className="text-sm tracking-[0.2em] text-muted-foreground uppercase mb-8 text-center">
          What We Do
        </p>

        <div className="space-y-8 text-lg text-muted-foreground leading-relaxed text-center">
          <p className="text-xl md:text-2xl font-serif text-foreground">
            We help aesthetic dentists go from trained but invisible<br />
            to chosen, trusted, and known —
          </p>

          <p className="text-foreground">
            with a caseload, reputation, and career trajectory that actually reflects their skill.
          </p>

          <div className="h-px bg-border/50 my-8 max-w-xs mx-auto" />

          <div className="space-y-2 text-foreground/80">
            <p>Not louder.</p>
            <p>Not busier.</p>
            <p>Not cheaper.</p>
          </div>

          <div className="space-y-2 text-foreground font-medium">
            <p>Clearer.</p>
            <p>Recognised.</p>
            <p>Selected.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundersLetterSection;
