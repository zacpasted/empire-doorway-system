import VideoPlayer from "@/components/VideoPlayer";
import EligibilityForm from "@/components/EligibilityForm";
const HeroSection = () => {
  return <section className="relative min-h-screen py-24 md:py-32">
      {/* Abstract background texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/20" />
      <div className="absolute inset-0 opacity-[0.02]" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
    }} />
      
      <div className="container relative z-10 max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-8 animate-fade-up opacity-0" style={{
          animationDelay: "100ms",
          animationFillMode: "forwards"
        }}>
            PASTED
          </p>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground leading-[1.2] tracking-tight mb-6 animate-fade-up opacity-0" style={{
          animationDelay: "200ms",
          animationFillMode: "forwards"
        }}>
            Dental School Trains Skill. CE Improves Technique. <span className="font-bold">Without brand, story, and strategy—they just become debt with no destination.</span>
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed animate-fade-up opacity-0" style={{
          animationDelay: "250ms",
          animationFillMode: "forwards"
        }}>
            <span className="font-serif font-semibold text-foreground">Associate To Empire</span> by PASTED is the solution.
          </p>
        </div>
        
        {/* VSL */}
        <div className="mb-16 animate-fade-up opacity-0" style={{
        animationDelay: "300ms",
        animationFillMode: "forwards"
      }}>
          <VideoPlayer />
        </div>
        
        {/* Application Form */}
        <div id="apply" className="animate-fade-up opacity-0" style={{
        animationDelay: "400ms",
        animationFillMode: "forwards"
      }}>
          <EligibilityForm />
        </div>
        
        {/* Below Form: Metrics + Gate + Definition */}
        
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-foreground/30 to-transparent animate-pulse" />
      </div>
    </section>;
};
export default HeroSection;