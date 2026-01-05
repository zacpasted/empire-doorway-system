const ProofSection = () => {
  return (
    <section className="py-32 md:py-48 bg-card/20">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="text-center mb-20">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            PASTED
          </p>
          <p className="text-lg text-foreground/80">
            A decade of career curation. 100+ authorities built.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-serif text-primary mb-2">$100M+</p>
            <p className="text-sm text-muted-foreground tracking-wide">Revenue Generated</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-serif text-primary mb-2">97%</p>
            <p className="text-sm text-muted-foreground tracking-wide">Client Retention</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-serif text-primary mb-2">41</p>
            <p className="text-sm text-muted-foreground tracking-wide">Practices Scaled to $250k+/mo</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-serif text-primary mb-2">+63%</p>
            <p className="text-sm text-muted-foreground tracking-wide">Avg Revenue Lift (120 days)</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProofSection;
