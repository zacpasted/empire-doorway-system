const WhatWeStandAgainstSection = () => {
  const standAgainst = [
    "Soulless, faceless dentistry that rewards throughput over meaning.",
    "Education that sells hope but stops at skill.",
    "Systems that reward output while erasing authorship.",
    "Practices that strip identity in the name of efficiency.",
    "Marketing that chases attention instead of earning trust.",
    "An industry that asks clinicians to disappear quietly after \"doing everything right.\""
  ];

  return (
    <section className="py-24 md:py-32 bg-secondary/30">
      <div className="container max-w-3xl mx-auto px-4">
        <p className="text-primary uppercase tracking-[0.3em] text-sm text-center mb-4">
          What We Stand Against
        </p>
        
        <p className="text-sm text-muted-foreground text-center mb-12 italic">
          (This is not positioning. This is alignment.)
        </p>
        
        <div className="space-y-6 mb-16">
          {standAgainst.map((item, index) => (
            <p key={index} className="text-lg md:text-xl text-foreground/80 text-center">
              {item}
            </p>
          ))}
        </div>

        <div className="h-px bg-border/50 my-12" />

        <div className="space-y-6 text-center">
          <p className="text-muted-foreground text-lg">
            We are not here to compete with other dentists.
          </p>
          <p className="text-foreground font-medium text-lg">
            We are here to name what went wrong — clearly — so the right people can finally find each other.
          </p>
        </div>

        <div className="h-px bg-border/50 my-12" />

        <div className="text-center">
          <p className="text-muted-foreground text-lg mb-2">When people feel weak, they scatter.</p>
          <p className="text-foreground font-serif text-xl md:text-2xl">
            When they understand they were wronged, they unite.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatWeStandAgainstSection;
