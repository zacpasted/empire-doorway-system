const WhatWeWillNeverDoSection = () => {
  const promises = [
    "We will never force you into a mould. Your individuality is the asset.",
    "We will never sell hope without outcomes. Every path must lead somewhere tangible.",
    "We will never promise mastery without leverage. Skill must be rewarded with visibility.",
    "We will never take your money and leave your talent unseen.",
    "We will never confuse certificates with progress. Recognition is the metric.",
    "We will never offer inspiration without a path forward. Strategy matters.",
    "We will never treat you as a commodity. You are an artist and a professional.",
    "We will never optimise for volume at the expense of meaning. Fulfilment is the goal."
  ];

  return (
    <section className="py-24 md:py-32 bg-secondary/30">
      <div className="container max-w-3xl mx-auto px-4">
        <p className="text-primary uppercase tracking-[0.3em] text-sm text-center mb-4">
          What We Will Never Do
        </p>
        
        <p className="text-sm text-muted-foreground text-center mb-12 italic">
          (Non-negotiable.)
        </p>

        <p className="text-lg text-foreground text-center mb-12">
          Our foundation is built on a single truth:
        </p>

        <p className="text-xl md:text-2xl font-serif text-foreground text-center mb-12">
          We will never monetise your insecurity.<br />
          <span className="text-primary">We build confidence by amplifying your existing excellence.</span>
        </p>

        <div className="h-px bg-border/50 my-12" />

        <p className="text-sm text-muted-foreground text-center mb-8 uppercase tracking-widest">
          Specifically:
        </p>

        <div className="space-y-4">
          {promises.map((promise, index) => (
            <p key={index} className="text-lg text-foreground/80 text-center">
              {promise}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeWillNeverDoSection;
