const MarketTeardownSection = () => {
  return (
    <section className="py-20 md:py-28 bg-card/30">
      <div className="container max-w-3xl mx-auto px-4">
        <p className="text-lg md:text-xl text-foreground mb-12 text-center font-serif">
          Taste Is Not Aesthetics. It Is Decision-Making Under Constraints.
        </p>

        <div className="space-y-6 text-muted-foreground text-lg leading-relaxed mb-12 text-center">
          <p>It is knowing what to <span className="text-foreground/80">remove</span>.</p>
          <p>What <span className="text-foreground/80">not to say</span>.</p>
          <p>What <span className="text-foreground/80">not to offer</span>.</p>
          <p>What to <span className="text-foreground/80">avoid</span>.</p>
        </div>

        <p className="text-center text-muted-foreground text-lg mb-12">
          In a market drowning in "before/after," discounts, and generic reassurance—<br />
          <span className="text-foreground font-medium">restraint becomes authority</span>.
        </p>

        <div className="h-px bg-border/50 my-12" />

        <div className="space-y-6 text-lg">
          <p className="text-foreground font-medium text-center">
            Competitors can copy tactics.
          </p>
          <p className="text-foreground font-serif text-xl md:text-2xl text-center">
            They cannot copy taste.
          </p>
        </div>

        <div className="mt-16 pt-8 border-t border-border/30">
          <p className="text-center text-muted-foreground text-lg italic mb-4">
            Our tonality behaves like a private members' prospectus:
          </p>
          <p className="text-center text-foreground/80 text-lg">
            Calm. Declarative. Selective.<br />
            Slightly confrontational toward mediocrity.<br />
            <span className="text-foreground font-medium">Never pleading.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default MarketTeardownSection;