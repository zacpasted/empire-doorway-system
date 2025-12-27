const WhatYouGetSection = () => {
  const included = [
    "Personal brand positioning so the market understands who you are and why you're different",
    "A defined content narrative that removes posting guesswork",
    "Professionally edited short-form content built to premium standards",
    "Direction and guidance from the team behind dentistry's top 1%",
    "A strategy designed to compound into patients, referrals, and opportunity",
    "Operational relief: we handle editing, structure, cadence, and quality control",
  ];

  const replaces = [
    "Random posting",
    "Vendor roulette",
    "Wasted spend on agencies that don't understand dentistry",
    "Time lost managing creatives",
    "Content that looks busy but goes nowhere",
  ];

  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
            What Associate to Empire™ Gives You
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-8 leading-tight max-w-3xl mx-auto">
            The Guesswork, Time Drain, and Wasted Effort<br />
            <span className="text-primary">That Keeps Talented Dentists Invisible—Removed.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            You get clear brand positioning, a defined content narrative, and high-quality short-form content—edited, 
            directed, and structured by the same team that has driven hundreds of millions in aesthetic case revenue 
            for dentistry's elite.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* What's Included */}
          <div className="p-8 border border-primary/20 rounded-xl bg-card/30">
            <h3 className="text-xl font-serif text-foreground mb-6">What's Included</h3>
            <div className="space-y-4">
              {included.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                  <p className="text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What This Replaces */}
          <div className="p-8 border border-border/50 rounded-xl bg-background">
            <h3 className="text-xl font-serif text-foreground mb-6">What This Replaces</h3>
            <div className="space-y-4">
              {replaces.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-destructive/60 mt-2.5" />
                  <p className="text-muted-foreground line-through decoration-muted-foreground/30">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Statement */}
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-4 max-w-2xl mx-auto">
            We handle the thinking, the editing, and the standards—so your content builds authority 
            and momentum instead of just keeping up with posting.
          </p>
          <div className="h-px bg-border/50 my-8 max-w-xs mx-auto" />
          <p className="text-xl font-serif text-foreground mb-2">
            This is not social media management.
          </p>
          <p className="text-xl font-serif text-primary">
            It's career curation.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Built by PASTED.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatYouGetSection;
