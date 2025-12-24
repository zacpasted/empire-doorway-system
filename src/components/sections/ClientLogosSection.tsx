const ClientLogosSection = () => {
  // Placeholder logos - duplicate for seamless loop
  const logos = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <section className="py-16 md:py-20 overflow-hidden">
      <div className="container max-w-6xl mx-auto px-4 mb-10">
        <p className="text-center text-muted-foreground text-sm uppercase tracking-widest">
          Trusted by Leading Dentists
        </p>
      </div>

      {/* Rolling Marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Marquee track */}
        <div className="flex animate-marquee">
          {/* First set */}
          {logos.map((logo, index) => (
            <div
              key={`first-${index}`}
              className="flex-shrink-0 mx-8 md:mx-12"
            >
              <div className="w-32 md:w-40 h-16 bg-secondary/50 rounded-lg flex items-center justify-center border border-border/30">
                <span className="text-muted-foreground text-sm">Logo {logo}</span>
              </div>
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {logos.map((logo, index) => (
            <div
              key={`second-${index}`}
              className="flex-shrink-0 mx-8 md:mx-12"
            >
              <div className="w-32 md:w-40 h-16 bg-secondary/50 rounded-lg flex items-center justify-center border border-border/30">
                <span className="text-muted-foreground text-sm">Logo {logo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogosSection;
