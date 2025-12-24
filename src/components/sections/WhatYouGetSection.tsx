const WhatYouGetSection = () => {
  const features = [
    "Monthly content scripting built for dentists",
    "Personal brand positioning and narrative clarity",
    "Filming frameworks requiring under two hours per month",
    "Ongoing guidance from the PASTED team",
    "Group calls focused on execution and confidence",
    "Content designed to build trust and authority",
  ];

  return (
    <section className="py-20 md:py-28 bg-cream-dark">
      <div className="container max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif text-foreground text-center mb-12">
          Inside Associate to Empire™
        </h2>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-4 py-4 border-b border-border/50 last:border-0"
            >
              <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2.5" />
              <span className="text-lg text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-12">
          No pricing. No timelines. No fluff.
        </p>
      </div>
    </section>
  );
};

export default WhatYouGetSection;
