import { useRef, useEffect, useState } from "react";
import VideoPlayer from "@/components/VideoPlayer";
import EligibilityForm from "@/components/EligibilityForm";

import logo1 from "@/assets/logos/brand-logo-01.png";
import logo2 from "@/assets/logos/brand-logo-02.png";
import logo3 from "@/assets/logos/brand-logo-03.png";
import logo4 from "@/assets/logos/brand-logo-04-dark.png";
import logo5 from "@/assets/logos/brand-logo-05-dark.png";
import logo6 from "@/assets/logos/brand-logo-06-dark.png";
import logoCocofloss from "@/assets/logos/brand-logo-cocofloss-dark.png";
import logoSolventum from "@/assets/logos/brand-logo-solventum-dark.png";

const HeroSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const logos = [
    { src: logo1, alt: "Brand Partner 1" },
    { src: logo2, alt: "Brand Partner 2" },
    { src: logo3, alt: "Brand Partner 3" },
    { src: logo4, alt: "Brand Partner 4" },
    { src: logo5, alt: "Brand Partner 5" },
    { src: logo6, alt: "Brand Partner 6" },
    { src: logoCocofloss, alt: "Cocofloss" },
    { src: logoSolventum, alt: "Solventum" },
  ];

  const duplicatedLogos = [...logos, ...logos, ...logos];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPos = 0;
    const speed = 1;

    const animate = () => {
      if (!isHovered) {
        scrollPos += speed;
        const totalWidth = scrollContainer.scrollWidth / 3;
        if (scrollPos >= totalWidth) {
          scrollPos = 0;
        }
        scrollContainer.style.transform = `translateX(-${scrollPos}px)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isHovered]);

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
        <div className="mb-10 animate-fade-up opacity-0" style={{
        animationDelay: "300ms",
        animationFillMode: "forwards"
      }}>
          <VideoPlayer />
        </div>

        {/* Discreet Logo Marquee */}
        <div 
          className="mb-12 animate-fade-up opacity-0 overflow-hidden relative"
          style={{ animationDelay: "350ms", animationFillMode: "forwards" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <p className="text-center text-muted-foreground/40 text-xs uppercase tracking-[0.2em] mb-4">
            Trusted by
          </p>
          
          {/* Fade edges */}
          <div className="absolute left-0 top-6 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-6 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10" />

          <div 
            ref={scrollRef}
            className="flex items-center will-change-transform"
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-6 md:mx-10 flex items-center justify-center"
              >
                <img 
                  src={logo.src} 
                  alt={logo.alt}
                  className="h-10 md:h-14 w-auto max-w-[120px] md:max-w-[160px] object-contain opacity-50 hover:opacity-80 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
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