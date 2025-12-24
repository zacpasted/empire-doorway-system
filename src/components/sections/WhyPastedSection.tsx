const WhyPastedSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-8">
            Why PASTED
          </h2>

          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            <p>
              PASTED builds brands for some of the most respected names in aesthetic dentistry.
            </p>
            <p>
              Associate to Empire™ applies the same philosophy and standards to dentists earlier in their journey—without watering it down.
            </p>
          </div>

          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12">
            <span className="text-lg font-serif text-foreground">Built for longevity.</span>
            <span className="hidden md:block w-px h-6 bg-border" />
            <span className="text-lg font-serif text-foreground">Built with intent.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyPastedSection;
