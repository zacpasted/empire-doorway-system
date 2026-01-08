import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import VideoPlayer from "@/components/VideoPlayer";
import EligibilityForm from "@/components/EligibilityForm";
import logoFigs from "@/assets/logos/figs-white.png";
import logoCocofloss from "@/assets/logos/cocofloss-white.png";
import logoSolventum from "@/assets/logos/solventum-transparent.png";
import logoMHM from "@/assets/logos/marshall-hanson-method-white.png";

// Animated Counter Hook
const useCounter = (end: number, duration: number, isInView: boolean, delay: number) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isInView) return;
    
    const timeout = setTimeout(() => {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        setCount(Math.floor(eased * end));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, delay * 1000);
    
    return () => clearTimeout(timeout);
  }, [end, duration, isInView, delay]);
  
  return count;
};

// Animated Metrics Bar Component
const MetricsBar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const metrics = [
    { label: "Revenue Generated", numValue: 100, prefix: "$", suffix: "M+", barWidth: 95 },
    { label: "Views Generated", numValue: 500, prefix: "", suffix: "M+", barWidth: 100 },
    { label: "Careers Curated", numValue: 200, prefix: "", suffix: "+", barWidth: 88 },
    { label: "Client Retention", numValue: 97, prefix: "", suffix: "%", barWidth: 97 },
  ];

  return (
    <div ref={ref} className="max-w-3xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {metrics.map((metric, index) => {
          const count = useCounter(metric.numValue, 1.5, isInView, 0.3 + index * 0.1);
          return (
            <motion.div
              key={metric.label}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Value with counter */}
              <motion.div
                className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                {metric.prefix}{count}{metric.suffix}
              </motion.div>
              
              {/* Label */}
              <p className="text-[10px] md:text-xs uppercase tracking-wider text-muted-foreground/60 mb-2">
                {metric.label}
              </p>
              
              {/* Animated Bar */}
              <div className="h-1 bg-border/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary/60 to-primary/30 rounded-full"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${metric.barWidth}%` } : {}}
                  transition={{ 
                    duration: 1.2, 
                    delay: 0.5 + index * 0.15,
                    ease: [0.22, 1, 0.36, 1] as const
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

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
  const logos = [
    { src: logoFigs, alt: "FIGS", invert: false },
    { src: logoCocofloss, alt: "Cocofloss", invert: false },
    { src: logoSolventum, alt: "Solventum", invert: true },
    { src: logoMHM, alt: "Marshall Hanson Method", invert: false },
  ];
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];
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
          
          <h1 className="font-serif text-foreground mb-8 md:mb-10 leading-[1.1] tracking-[-0.01em]">
            <motion.span 
              className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold" 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Great Dentists Don't Struggle
            </motion.span>
            <motion.span 
              className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light italic text-muted-foreground/70 mt-1" 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Because They Lack Skill.
            </motion.span>
            <motion.span 
              className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-6" 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              They Struggle Because Branding
            </motion.span>
            <motion.span 
              className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light italic text-muted-foreground/70" 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Was Never Simplified.
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
        <div className="mb-8 md:mb-10 animate-fade-up opacity-0" style={{
        animationDelay: "300ms",
        animationFillMode: "forwards"
      }}>
          <VideoPlayer />
        </div>

        {/* Animated Metrics Bar */}
        <div className="mb-12 md:mb-16 animate-fade-up opacity-0" style={{
          animationDelay: "350ms",
          animationFillMode: "forwards"
        }}>
          <MetricsBar />
        </div>
        {/* Post-VSL Headline */}
        

        {/* Secondary Headline - Below Post-VSL */}
        {/* Secondary Statement - Above Logo Marquee */}
        <div className="text-center mb-16 md:mb-20 animate-fade-up opacity-0" style={{
        animationDelay: "400ms",
        animationFillMode: "forwards"
      }}>
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-4">
            <span className="font-semibold text-foreground">Dental School</span> Trains Skill. <span className="font-semibold text-foreground">CE</span> Improves Technique. Without brand, story, and strategy—<span className="font-semibold text-foreground">they just become debt with no destination.</span>
          </p>
          <p className="text-xl md:text-2xl text-muted-foreground">
            <span className="font-serif font-semibold text-foreground">Associate To Empire</span> by PASTED is the solution.
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
            {duplicatedLogos.map((logo, index) => (
              <div key={index} className="flex-shrink-0 mx-8 md:mx-12 flex items-center justify-center">
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className={`h-8 md:h-10 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 ${logo.invert ? 'invert brightness-0 invert' : ''}`}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Application Form */}
        <div id="apply" className="animate-fade-up opacity-0" style={{
        animationDelay: "450ms",
        animationFillMode: "forwards"
      }}>
          <EligibilityForm />
        </div>

        {/* Transition Headline - Below Form */}
        <div className="text-center mt-16 animate-fade-up opacity-0" style={{
        animationDelay: "500ms",
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
        
        {/* Below Form: Metrics + Gate + Definition */}
        
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-foreground/30 to-transparent animate-pulse" />
      </div>
    </section>;
};
export default HeroSection;