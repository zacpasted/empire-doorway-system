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
          
          {/* What This Is - Visual Transformation */}
          <div className="mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-primary text-center mb-10">The Transformation</p>
            
            <div className="relative flex flex-col md:flex-row items-stretch justify-center gap-0">
              {/* Before Card */}
              <div className="flex-1 max-w-xs mx-auto md:mx-0 p-8 border border-border/30 bg-card/10 backdrop-blur-sm relative group transition-all duration-500 hover:bg-card/20">
                <div className="absolute top-4 left-4 text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50">Before</div>
                <div className="pt-4 space-y-3">
                  <p className="text-muted-foreground/40 line-through decoration-muted-foreground/20">Trained but invisible</p>
                  <p className="text-muted-foreground/40 line-through decoration-muted-foreground/20">Guessing what to post</p>
                  <p className="text-muted-foreground/40 line-through decoration-muted-foreground/20">Competing on price</p>
                </div>
              </div>
              
              {/* Arrow/Timeline Center */}
              <div className="flex items-center justify-center py-6 md:py-0 md:px-8 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="hidden md:block w-full h-px bg-gradient-to-r from-border/50 via-primary to-border/50" />
                  <div className="md:hidden h-full w-px bg-gradient-to-b from-border/50 via-primary to-border/50" />
                </div>
                <div className="relative z-10 bg-background border border-primary/50 px-4 py-2 shadow-[0_0_20px_hsl(var(--primary)/0.3)]">
                  <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium">45 Days</p>
                </div>
              </div>
              
              {/* After Card */}
              <div className="flex-1 max-w-xs mx-auto md:mx-0 p-8 border border-primary/30 bg-primary/5 backdrop-blur-sm relative group transition-all duration-500 hover:bg-primary/10 hover:border-primary/50 hover:shadow-[0_0_40px_hsl(var(--primary)/0.15)]">
                <div className="absolute top-4 left-4 text-[10px] tracking-[0.2em] uppercase text-primary">After</div>
                <div className="pt-4 space-y-3">
                  <p className="text-foreground animate-fade-in" style={{ animationDelay: "100ms" }}>Recognized & chosen</p>
                  <p className="text-foreground animate-fade-in" style={{ animationDelay: "200ms" }}>Strategic clarity</p>
                  <p className="text-foreground animate-fade-in" style={{ animationDelay: "300ms" }}>Commanding premiums</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* The Gate */}
          <div className="relative">
            <p className="text-xs tracking-[0.3em] uppercase text-primary text-center mb-10">The Gate</p>
            
            <div className="grid md:grid-cols-2 gap-0 relative">
              {/* Divider Line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border/50 to-transparent" />
              
              {/* Not For Side */}
              <div className="p-8 md:p-10 border border-border/20 bg-card/5 md:border-r-0 group hover:bg-card/10 transition-all duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full border border-muted-foreground/30 flex items-center justify-center">
                    <span className="text-muted-foreground/50 text-lg">✕</span>
                  </div>
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground/70">Not For</p>
                </div>
                <div className="space-y-4">
                  {[
                    { text: "Trend chasers", delay: "0ms" },
                    { text: "Loud marketers", delay: "50ms" },
                    { text: "Volume-first clinicians", delay: "100ms" },
                  ].map((item, i) => (
                    <div 
                      key={i} 
                      className="flex items-center gap-3 opacity-0 animate-fade-in group-hover:translate-x-1 transition-transform duration-300"
                      style={{ animationDelay: item.delay, animationFillMode: "forwards" }}
                    >
                      <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                      <p className="text-muted-foreground/50">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* For Side */}
              <div className="p-8 md:p-10 border border-primary/20 bg-primary/5 group hover:bg-primary/10 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_60px_hsl(var(--primary)/0.1)]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full border border-primary/50 flex items-center justify-center shadow-[0_0_15px_hsl(var(--primary)/0.3)] group-hover:shadow-[0_0_25px_hsl(var(--primary)/0.5)] transition-shadow duration-500">
                    <span className="text-primary text-lg">✓</span>
                  </div>
                  <p className="text-xs tracking-[0.2em] uppercase text-primary">For</p>
                </div>
                <div className="space-y-4">
                  {[
                    { text: "Dentists who feel overlooked despite merit", delay: "100ms" },
                    { text: "Those ready to author their own position", delay: "150ms" },
                    { text: "Practitioners who value restraint over noise", delay: "200ms" },
                  ].map((item, i) => (
                    <div 
                      key={i} 
                      className="flex items-center gap-3 opacity-0 animate-fade-in group-hover:translate-x-1 transition-transform duration-300"
                      style={{ animationDelay: item.delay, animationFillMode: "forwards" }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.5)]" />
                      <p className="text-foreground">{item.text}</p>
                    </div>
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
