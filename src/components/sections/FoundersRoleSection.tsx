const FoundersRoleSection = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="container max-w-3xl mx-auto px-4">
        <p className="text-primary uppercase tracking-[0.3em] text-sm text-center mb-12">
          The Role of Alan & Zac
        </p>
        
        <div className="text-center space-y-8">
          <p className="text-lg text-muted-foreground">
            Alan and Zac are not here as marketers.
          </p>

          <p className="text-xl md:text-2xl font-serif text-foreground leading-relaxed">
            They are here as witnesses to what the profession became —<br />
            <span className="text-primary">and architects of what it must become next.</span>
          </p>

          <div className="h-px bg-border/50 my-8 max-w-xs mx-auto" />

          <p className="text-lg text-foreground">
            Pasted is not a platform.
          </p>
          <p className="text-xl font-serif text-primary">
            It is a line of defence.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FoundersRoleSection;
