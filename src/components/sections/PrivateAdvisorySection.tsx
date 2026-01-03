const PrivateAdvisorySection = () => {
  return (
    <section className="py-24 md:py-32 border-y border-border/30">
      <div className="container max-w-3xl mx-auto px-4">
        <p className="text-primary uppercase tracking-[0.3em] text-sm text-center mb-12">
          Private Advisory
        </p>
        
        <p className="text-lg text-foreground text-center mb-8">
          A limited portion of Pasted operates as Private Advisory.
        </p>

        <div className="text-center space-y-4 mb-12">
          <p className="text-lg text-muted-foreground">Founder-led.</p>
          <p className="text-lg text-muted-foreground">Invitation-only.</p>
          <p className="text-lg text-foreground font-medium">Designed for globally relevant aesthetic dentists.</p>
        </div>

        <div className="h-px bg-border/50 my-12 max-w-xs mx-auto" />

        <p className="text-xl font-serif text-foreground text-center">
          This is not a programme.<br />
          <span className="text-primary">It is strategic alignment at the highest level.</span>
        </p>
      </div>
    </section>
  );
};

export default PrivateAdvisorySection;
