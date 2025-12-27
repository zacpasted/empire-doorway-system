const WhatItIsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-cream-dark">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-6">
            The Offer Ladder
          </p>
          
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-8">
            Access to the Same Infrastructure.<br />
            <span className="text-muted-foreground">At Different Altitudes.</span>
          </h2>
          
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed mb-12">
            <p>
              Your portfolio already supports a clean ladder that reinforces authority rather than cannibalizing it.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 text-left mb-12">
            <div className="p-6 border border-border/50 rounded-lg bg-card/30">
              <p className="text-primary text-sm uppercase tracking-wider mb-2">Entry Point</p>
              <h3 className="text-xl font-serif text-foreground mb-3">Associate to Empire™</h3>
              <p className="text-muted-foreground">
                For future stars to build identity early and stop being invisible.
              </p>
            </div>
            
            <div className="p-6 border border-border/50 rounded-lg bg-card/30">
              <p className="text-primary text-sm uppercase tracking-wider mb-2">Cinematic Execution</p>
              <h3 className="text-xl font-serif text-foreground mb-3">PASTED Studio</h3>
              <p className="text-muted-foreground">
                For the best in the world. The output is not "content"—it is cultural signal.
              </p>
            </div>
            
            <div className="p-6 border border-border/50 rounded-lg bg-card/30">
              <p className="text-primary text-sm uppercase tracking-wider mb-2">Full-Stack</p>
              <h3 className="text-xl font-serif text-foreground mb-3">PASTED Bespoke</h3>
              <p className="text-muted-foreground">
                Brand, conversion, and growth architecture for practices that want an ecosystem, not a campaign.
              </p>
            </div>
            
            <div className="p-6 border border-border/50 rounded-lg bg-card/30">
              <p className="text-primary text-sm uppercase tracking-wider mb-2">Amplifier</p>
              <h3 className="text-xl font-serif text-foreground mb-3">Cosmetic Social Club</h3>
              <p className="text-muted-foreground">
                Paid media scales what already works. It does not create meaning from scratch.
              </p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground italic">
            The altitude metaphor keeps it premium, coherent, and non-commoditized.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatItIsSection;