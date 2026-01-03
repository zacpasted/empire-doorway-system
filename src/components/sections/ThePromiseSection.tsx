const ThePromiseSection = () => {
  return (
    <section className="py-24 md:py-32 border-y border-border/30">
      <div className="container max-w-3xl mx-auto px-4">
        <p className="text-primary uppercase tracking-[0.3em] text-sm text-center mb-12">
          The Promise
        </p>
        
        <div className="text-center space-y-6 mb-12">
          <p className="text-lg text-muted-foreground">We don't promise fame.</p>
          <p className="text-lg text-muted-foreground">We don't promise shortcuts.</p>
          <p className="text-lg text-muted-foreground">We don't promise overnight success.</p>
        </div>

        <div className="h-px bg-border/50 my-12" />

        <p className="text-lg text-foreground text-center mb-4">
          We promise this:
        </p>

        <p className="text-2xl md:text-3xl font-serif text-foreground text-center">
          You will not disappear quietly<br />
          <span className="text-primary">after doing everything right.</span>
        </p>
      </div>
    </section>
  );
};

export default ThePromiseSection;
