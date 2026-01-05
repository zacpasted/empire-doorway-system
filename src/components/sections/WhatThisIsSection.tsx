const WhatThisIsSection = () => {
  const transformations = [
    "From trained but invisible → to recognized and chosen",
    "From guessing what to post → to strategic clarity",
    "From vendor roulette → to authored infrastructure",
    "From competing on price → to commanding premiums",
  ];

  return (
    <section className="py-32 md:py-48">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left: Definition */}
          <div>
            <p className="text-sm tracking-[0.3em] uppercase text-primary mb-8">
              What This Is
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground leading-tight">
              A 45-day system that transforms aesthetic dentists into recognized authorities.
            </h2>
          </div>
          
          {/* Right: Transformations */}
          <div className="space-y-8 md:pt-16">
            {transformations.map((item, index) => (
              <p
                key={index}
                className="text-lg text-muted-foreground border-l-2 border-primary/30 pl-6"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatThisIsSection;
