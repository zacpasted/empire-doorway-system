const WhyPastedSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-6">
            Why PASTED
          </p>
          
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-8 leading-tight">
            We Operate Where<br />
            <span className="text-primary">Competitors Cannot Follow.</span>
          </h2>

          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-12">
            <p>
              Performance agencies can buy attention.<br />
              <span className="text-foreground/80">They struggle to manufacture belief.</span>
            </p>
            <p>
              Platform companies can automate workflows.<br />
              <span className="text-foreground/80">They cannot create cultural signal.</span>
            </p>
            <p>
              Traditional consultants can advise.<br />
              <span className="text-foreground/80">They rarely produce modern, high-taste creative with authority psychology built in.</span>
            </p>
          </div>

          <div className="h-px bg-border/50 my-12 max-w-xs mx-auto" />

          <p className="text-foreground font-serif text-xl md:text-2xl mb-8">
            PASTED sits at the intersection of all three—<br />
            <span className="text-primary">and executes at the highest tier.</span>
          </p>

          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12">
            <span className="text-lg font-serif text-foreground/80">Identity as infrastructure.</span>
            <span className="hidden md:block w-px h-6 bg-border" />
            <span className="text-lg font-serif text-foreground/80">Belief at scale.</span>
            <span className="hidden md:block w-px h-6 bg-border" />
            <span className="text-lg font-serif text-foreground/80">Authority by design.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyPastedSection;