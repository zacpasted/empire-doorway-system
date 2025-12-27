const AuthoritySection = () => {
  return (
    <section className="py-24 md:py-32 border-y border-border/30">
      <div className="container max-w-3xl mx-auto px-4">
        <p className="text-primary uppercase tracking-[0.3em] text-sm text-center mb-8">
          Top-Down Positioning
        </p>
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground text-center mb-12 leading-tight">
          The International Bridge to<br />
          <span className="text-primary">Aesthetic Dentistry's Highest Tier.</span>
        </h2>

        <div className="space-y-8 text-lg md:text-xl text-muted-foreground leading-relaxed">
          <p className="text-center">
            PASTED turns talented clinicians into recognized brands through narrative, identity design, and conversion architecture.
          </p>

          <div className="h-px bg-border/50 my-8" />

          <p className="text-center text-foreground/80 py-4">
            The market does not understand who you are,<br />
            why you're different, and why it should trust you at a premium.<br />
            <span className="text-foreground font-medium mt-2 block">That is the cause. Everything else is a symptom.</span>
          </p>

          <div className="h-px bg-border/50 my-8" />

          <p className="text-center italic">
            Most competitors treat symptoms—traffic, followers, "more leads."
          </p>

          <p className="text-center text-foreground font-serif text-xl md:text-2xl pt-4">
            PASTED treats the cause.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AuthoritySection;