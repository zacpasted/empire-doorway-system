const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Abstract background texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/20" />
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />
      
      <div className="container relative z-10 max-w-5xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-foreground leading-[0.9] tracking-tight mb-8">
          The Institution<br />
          <span className="text-primary">Forgot You.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-16">
          We didn't.
        </p>
        
        <a
          href="#apply"
          className="inline-block text-sm tracking-[0.3em] uppercase text-foreground border-b border-primary pb-2 hover:text-primary transition-colors duration-300"
        >
          Enter the Program
        </a>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
