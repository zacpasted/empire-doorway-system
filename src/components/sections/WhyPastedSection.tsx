const WhyPastedSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-6">
            Why PASTED
          </p>
          
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-8 leading-tight">
            The Track Record<br />
            <span className="text-primary">Speaks for Itself.</span>
          </h2>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-8 border border-border/50 rounded-lg bg-card/30">
            <p className="text-4xl md:text-5xl font-serif text-primary mb-3">$100M+</p>
            <p className="text-muted-foreground">In aesthetic case revenue driven by our content strategy</p>
          </div>
          <div className="text-center p-8 border border-border/50 rounded-lg bg-card/30">
            <p className="text-4xl md:text-5xl font-serif text-primary mb-3">97%</p>
            <p className="text-muted-foreground">Client retention rate since 2022</p>
          </div>
          <div className="text-center p-8 border border-border/50 rounded-lg bg-card/30">
            <p className="text-4xl md:text-5xl font-serif text-primary mb-3">3+ Years</p>
            <p className="text-muted-foreground">Average client tenure before opening A2E</p>
          </div>
        </div>

        {/* The Why */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            We've built brands for some of the most recognized names in aesthetic dentistry. 
            Our content strategy has driven hundreds of millions in case revenue for the best in the world.
          </p>
          <p className="text-lg text-foreground leading-relaxed">
            Now it's time to bring that to the dentists who need it most—<br />
            <span className="text-primary">because we're tired of watching talented doctors get taken advantage of.</span>
          </p>
        </div>

        <div className="h-px bg-border/50 my-12 max-w-xs mx-auto" />

        {/* What Makes Us Different */}
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p className="text-center">
              Performance agencies can buy attention.<br />
              <span className="text-foreground/80">They struggle to manufacture belief.</span>
            </p>
            <p className="text-center">
              Platform companies can automate workflows.<br />
              <span className="text-foreground/80">They cannot create cultural signal.</span>
            </p>
            <p className="text-center">
              Traditional consultants can advise.<br />
              <span className="text-foreground/80">They rarely produce modern, high-taste creative with authority psychology built in.</span>
            </p>
          </div>

          <p className="text-foreground font-serif text-xl md:text-2xl text-center mt-12">
            PASTED sits at the intersection of all three—<br />
            <span className="text-primary">and executes at the highest tier.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyPastedSection;
