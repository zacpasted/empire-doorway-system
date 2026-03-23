const AuthoritySection = () => {
  return (
    <section className="py-24 md:py-32 border-y border-border/30">
      <div className="container max-w-3xl mx-auto px-4">
        <p className="text-primary uppercase tracking-[0.3em] text-sm text-center mb-8">
          Why PASTED
        </p>
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground text-center mb-16 leading-tight">
          We built the brands you already follow.{" "}
          <span className="block">Now we build yours.</span>
        </h2>

        <div className="space-y-10 text-lg md:text-xl text-muted-foreground leading-relaxed">
          <p>
            <span className="text-primary font-medium">Dr. Jon Marashi. Dr. Brian Harris. Dr. Marshall Hanson. Dr. Sam Saleh. Dr. Rhona Eksander. Dr. Patrick McCann. SmileTrend.</span>
            <br /><br />
            These are not client logos on a slide deck. These are practices and brands we built from the inside — strategy, brand, content, ads, and conversion systems — over years of real partnership.
          </p>

          <p>
            The $100M+ in aesthetic revenue we've driven is not an industry aggregate. It is our number. From our partners. Measured across every case, every campaign, every consultation system we've built and optimised. We own every result on this page.
          </p>

          <p>
            Thirty practices per year. Not because we can't take more. Because the work requires it. Every partner gets the full team, full access, and full accountability. That is only possible at 30. The selectivity is not a tactic — it is what makes the results real.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AuthoritySection;
