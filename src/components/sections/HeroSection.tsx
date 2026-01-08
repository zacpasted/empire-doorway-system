import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
import logo7 from "@/assets/logos/brand-logo-07.jpeg";
import logo8 from "@/assets/logos/brand-logo-08.webp";
import logo9 from "@/assets/logos/brand-logo-09.jpeg";
import logo10 from "@/assets/logos/brand-logo-10.jpeg";
const HeroSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Parallax scroll effect
  const {
    scrollYProgress
  } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textureY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const logos = [{
    src: logo1,
    alt: "Brand Partner 1",
    needsFilter: false
  }, {
    src: logo2,
    alt: "Brand Partner 2",
    needsFilter: false
  }, {
    src: logo3,
    alt: "Brand Partner 3",
    needsFilter: false
  }, {
    src: logo4,
    alt: "Brand Partner 4",
    needsFilter: false
  }, {
    src: logo5,
    alt: "Brand Partner 5",
    needsFilter: false
  }, {
    src: logo6,
    alt: "Brand Partner 6",
    needsFilter: false
  }, {
    src: logoCocofloss,
    alt: "Cocofloss",
    needsFilter: false
  }, {
    src: logoSolventum,
    alt: "Solventum",
    needsFilter: false
  }, {
    src: logo7,
    alt: "Brand Partner 7",
    needsFilter: true
  }, {
    src: logo8,
    alt: "Brand Partner 8",
    needsFilter: true
  }, {
    src: logo9,
    alt: "Brand Partner 9",
    needsFilter: true
  }, {
    src: logo10,
    alt: "Brand Partner 10",
    needsFilter: true
  }];
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
  return <section ref={sectionRef} className="relative min-h-screen py-24 md:py-32 overflow-hidden">
      {/* Parallax background layers */}
      <motion.div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/20" style={{
      y: backgroundY
    }} />
      <motion.div className="absolute inset-0 opacity-[0.02]" style={{
      y: textureY,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
    }} />
      
      <div className="container relative z-10 max-w-5xl mx-auto px-4">
        {/* Primary Headline - Above VSL */}
        <motion.div className="text-center mb-12 md:mb-16" style={{
        opacity
      }}>
          <motion.p 
            className="text-[10px] md:text-[11px] tracking-[0.6em] uppercase text-muted-foreground/40 mb-10 md:mb-14 font-sans font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            PASTED
          </motion.p>
          
          <h1 className="font-serif font-bold text-foreground mb-8 md:mb-10 leading-[1.05] tracking-[-0.02em] overflow-hidden">
            <motion.span 
              className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl" 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Great Dentists Don't Struggle
            </motion.span>
            <motion.span 
              className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-muted-foreground/60 font-normal italic mt-1" 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Because They Lack Skill.
            </motion.span>
            <motion.span 
              className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-4 md:mt-6" 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              They Struggle Because
            </motion.span>
            <motion.span 
              className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl" 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="text-primary/90">Branding</span> and <span className="text-primary/90">Content</span>
            </motion.span>
            <motion.span 
              className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-muted-foreground/60 font-normal italic" 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Were Never Simplified.
            </motion.span>
          </h1>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground/70 max-w-3xl mx-auto leading-relaxed font-sans font-light tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            We fixed that — built by the most successful premium international agency in aesthetic dentistry.
          </motion.p>
        </motion.div>
        
        {/* VSL */}
        <div className="mb-12 md:mb-16 animate-fade-up opacity-0" style={{
        animationDelay: "300ms",
        animationFillMode: "forwards"
      }}>
          <VideoPlayer />
        </div>

        {/* Post-VSL Headline */}
        

        {/* Secondary Headline - Below Post-VSL */}
        <div className="text-center mb-16 md:mb-20 animate-fade-up opacity-0" style={{
        animationDelay: "400ms",
        animationFillMode: "forwards"
      }}>
          <p className="text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-muted-foreground/40 mb-8 font-medium">
            Associate to Empire™
          </p>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif text-foreground leading-[1.2] tracking-tight max-w-4xl mx-auto mb-6">
            We Take Aesthetic Dentists
            <br className="hidden sm:block" />
            <span className="text-muted-foreground/70 font-normal">From Skilled and Invisible</span>
            <br className="hidden sm:block" />
            <span className="text-muted-foreground/70 font-normal">to </span>
            <span className="text-foreground font-semibold">Recognized and Chosen</span>
          </h3>
          <p className="text-base md:text-lg text-muted-foreground/50 font-light tracking-wide">
            Without Waiting for Ownership
          </p>
        </div>

        {/* Discreet Logo Marquee */}
        <div className="mb-12 animate-fade-up opacity-0 overflow-hidden relative" style={{
        animationDelay: "400ms",
        animationFillMode: "forwards"
      }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <p className="text-center text-muted-foreground/40 text-xs uppercase tracking-[0.2em] mb-4">
            Trusted by
          </p>
          
          {/* Fade edges */}
          <div className="absolute left-0 top-6 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-6 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10" />

          <div ref={scrollRef} className="flex items-center will-change-transform">
            {duplicatedLogos.map((logo, index) => <div key={index} className="flex-shrink-0 mx-6 md:mx-10 flex items-center justify-center">
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className={`h-14 md:h-20 w-auto max-w-[160px] md:max-w-[220px] object-contain opacity-50 hover:opacity-80 transition-opacity duration-300 ${logo.needsFilter ? 'grayscale invert brightness-90' : ''}`} 
                />
              </div>)}
          </div>
        </div>
        
        {/* Application Form */}
        <div id="apply" className="animate-fade-up opacity-0" style={{
        animationDelay: "450ms",
        animationFillMode: "forwards"
      }}>
          <EligibilityForm />
        </div>

        {/* Secondary Statement - Below Form */}
        <div className="text-center mt-16 animate-fade-up opacity-0" style={{
        animationDelay: "500ms",
        animationFillMode: "forwards"
      }}>
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-4">
            Dental School Trains Skill. CE Improves Technique. <span className="font-semibold text-foreground">Without brand, story, and strategy—they just become debt with no destination.</span>
          </p>
          <p className="text-xl md:text-2xl text-muted-foreground">
            <span className="font-serif font-semibold text-foreground">Associate To Empire</span> by PASTED is the solution.
          </p>
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