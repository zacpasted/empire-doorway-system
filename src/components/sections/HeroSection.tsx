import VideoPlayer from "@/components/VideoPlayer";
import EligibilityForm from "@/components/EligibilityForm";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen py-24 md:py-32">
      {/* Abstract background texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/20" />
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />
      
      <div className="container relative z-10 max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-8 animate-fade-up opacity-0" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
            PASTED
          </p>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-foreground leading-[1.1] tracking-tight mb-8 animate-fade-up opacity-0" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
            <span className="text-primary">Associate to Empire</span> by Pasted allows aesthetic dentists to build a world-class dental brand, guarantee demand, and build their dream life in less than 2 hours per month—without owning a practice.
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-up opacity-0" style={{ animationDelay: "300ms", animationFillMode: "forwards" }}>
            Dental School Trains Skill. CE Improves Technique. Without brand, story, and strategy—they just become debt with no destination.
          </p>
        </div>
        
        {/* VSL */}
        <div className="mb-16 animate-fade-up opacity-0" style={{ animationDelay: "400ms", animationFillMode: "forwards" }}>
          <VideoPlayer />
        </div>
        
        {/* Application Form */}
        <div id="apply" className="animate-fade-up opacity-0" style={{ animationDelay: "500ms", animationFillMode: "forwards" }}>
          <EligibilityForm />
        </div>
        
        {/* Below Form: Metrics + Gate + Definition */}
        <div className="mt-24 animate-fade-up opacity-0" style={{ animationDelay: "600ms", animationFillMode: "forwards" }}>
          {/* Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { value: "$100M+", label: "Revenue Generated" },
              { value: "97%", label: "Client Retention" },
              { value: "41", label: "Practices to $250k+/mo" },
              { value: "+63%", label: "Avg Lift in 120 days" },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <p className="text-2xl md:text-3xl font-serif text-primary mb-1 transition-transform group-hover:scale-105">{stat.value}</p>
                <p className="text-xs text-muted-foreground tracking-wide uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
          
          {/* What This Is - Compact */}
          <div className="text-center mb-12">
            <p className="text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto">
              A 45-day system that transforms aesthetic dentists into recognized authorities.
            </p>
          </div>
          
          {/* Gate - Horizontal */}
          <div className="border border-border/30 bg-card/20 backdrop-blur-sm p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">Not For</p>
                <div className="flex flex-wrap gap-2">
                  {["Trend chasers", "Loud marketers", "Volume-first clinicians"].map((item, i) => (
                    <span key={i} className="text-sm text-foreground/50 border border-border/30 px-3 py-1.5">{item}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-primary mb-4">For</p>
                <div className="flex flex-wrap gap-2">
                  {["Merit overlooked", "Ready to author position", "Value restraint over noise"].map((item, i) => (
                    <span key={i} className="text-sm text-primary border border-primary/30 px-3 py-1.5">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary/50 to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default HeroSection;
