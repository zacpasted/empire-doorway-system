const WhyDifferentSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container max-w-3xl mx-auto px-4">
        <div className="space-y-8 text-lg md:text-xl leading-relaxed">
          <div className="space-y-4 text-muted-foreground">
            <p>
              Most dental programs optimize <span className="text-foreground">output</span>.
            </p>
            <p>
              Associate to Empire™ optimizes <span className="text-foreground font-medium">identity</span>.
            </p>
          </div>

          <div className="h-px bg-border/50 my-8" />

          <div className="space-y-4 text-muted-foreground">
            <p>
              Most programs teach you how to market dentistry.
            </p>
            <p>
              This system teaches the market how to <span className="text-foreground font-medium">understand you</span>.
            </p>
          </div>

          <div className="h-px bg-border/50 my-8" />

          <p className="text-center text-foreground/80">
            The difference is not production value.<br />
            <span className="text-foreground font-serif text-xl md:text-2xl">It is narrative control.</span>
          </p>

          <div className="h-px bg-border/50 my-8" />

          <p className="text-muted-foreground">
            Instead of asking dentists to perform louder, faster, or more often, Associate to Empire™ removes friction by creating clarity—about who you are, what you stand for, and why attention should naturally move toward you.
          </p>

          <p className="text-center text-foreground font-medium pt-4">
            That is why it compounds.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyDifferentSection;
