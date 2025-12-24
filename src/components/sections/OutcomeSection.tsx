const OutcomeSection = () => {
  const outcomes = [
    "You stop guessing what to post.",
    "You show up with clarity and confidence.",
    "People recognize you before they meet you.",
    "Opportunities start finding you.",
  ];

  return (
    <section className="py-20 md:py-28 bg-cream-dark">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center">
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

          <p className="text-lg text-primary font-medium">
            This is what authority compounds into.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OutcomeSection;
