const WhatItIsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-cream-dark">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-8">
            What Associate to Empire™ Actually Is
          </h2>
          
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              Associate to Empire™ is not a content template library or a trend-based program.
            </p>
            <p>
              It is a structured brand and content system designed specifically for associate dentists and early owners who want clarity, confidence, and long-term authority.
            </p>
          </div>
          
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12">
            <span className="text-lg font-serif text-foreground">Minimal time.</span>
            <span className="hidden md:block w-px h-6 bg-border" />
            <span className="text-lg font-serif text-foreground">Maximum leverage.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatItIsSection;
