const OutcomeSection = () => {
  const outcomes = [
    "You stop guessing what to post.",
    "You stop editing at midnight.",
    "You stop wasting money on bad vendors.",
    "You show up with clarity and confidence.",
    "People recognize you before they meet you.",
    "Patients arrive pre-sold on premium care.",
    "Opportunities start finding you.",
  ];

  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-8">
            The Outcome
          </p>
          
          <div className="space-y-4 mb-12">
            {outcomes.map((outcome, index) => (
              <p
                key={index}
                className="text-xl md:text-2xl font-serif text-foreground"
              >
                {outcome}
              </p>
            ))}
          </div>

          <div className="h-px bg-border/50 my-12 max-w-xs mx-auto" />

          <p className="text-lg text-muted-foreground mb-4">
            Content that scales into patients. Momentum that compounds.
          </p>
          <p className="text-xl text-primary font-serif">
            This is what authority becomes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OutcomeSection;
