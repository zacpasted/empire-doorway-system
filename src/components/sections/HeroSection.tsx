import { useRef, useState, memo, useMemo, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import VideoPlayer from "@/components/VideoPlayer";
import { trackCTAClick } from "@/hooks/useCTAAnalytics";
import logoFigs from "@/assets/logos/figs-white.png";
import logoCocofloss from "@/assets/logos/cocofloss-white.png";
import logoSolventum from "@/assets/logos/solventum-white.png";
import logoMHM from "@/assets/logos/marshall-hanson-method-white.png";
import logoSmileVirtual from "@/assets/logos/smile-virtual-white.png";

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

// Memoized Metrics Bar Component
const MetricsBar = memo(() => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px"
  });
  const metrics = useMemo(() => [{
    label: "Aesthetic Revenue Generated",
    numValue: 100,
    prefix: "$",
    suffix: "M+",
    barWidth: 95
  }, {
    label: "Practices Accepted / Year",
    numValue: 30,
    prefix: "",
    suffix: "",
    barWidth: 100
  }, {
    label: "Avg Revenue Added / Partner",
    numValue: 500,
    prefix: "$",
    suffix: "K+",
    barWidth: 88
  }, {
    label: "Client Retention",
    numValue: 97,
    prefix: "",
    suffix: "%",
    barWidth: 97
  }], []);
  return <div ref={ref} className="max-w-3xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {metrics.map((metric, index) => {
        const count = useCounter(metric.numValue, 1.2, isInView, 0.1 + index * 0.05);
        return <motion.div key={metric.label} className="relative" initial={{
          opacity: 0,
          y: 15
        }} animate={isInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.3,
          delay: index * 0.05
        }}>
              {/* Value with counter */}
              <motion.div className="text-xl md:text-2xl font-serif font-bold text-foreground mb-0.5" initial={{
            opacity: 0,
            scale: 0.9
          }} animate={isInView ? {
            opacity: 1,
            scale: 1
          } : {}} transition={{
            duration: 0.4,
            delay: 0.1 + index * 0.05
          }}>
                {metric.prefix}{count}{metric.suffix}
              </motion.div>
              
              {/* Label */}
              <p className="text-[9px] md:text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-1.5">
                {metric.label}
              </p>
              
              {/* Animated Bar */}
              <div className="h-0.5 bg-border/30 rounded-full overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-primary/60 to-primary/30 rounded-full" initial={{
              width: 0
            }} animate={isInView ? {
              width: `${metric.barWidth}%`
            } : {}} transition={{
              duration: 0.8,
              delay: 0.2 + index * 0.08,
              ease: [0.22, 1, 0.36, 1] as const
            }} />
              </div>
            </motion.div>;
      })}
      </div>
    </div>;
});
MetricsBar.displayName = 'MetricsBar';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Load Calendly script immediately for faster calendar rendering
  useEffect(() => {
    const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Listen for Calendly events
  useEffect(() => {
    const handleCalendlyMessage = (e: MessageEvent) => {
      if (e.data.event === 'calendly.event_type_viewed') {
        setCalendlyLoaded(true);
      }
      // Booking confirmed
      if (e.data.event === 'calendly.event_scheduled') {
        setBookingConfirmed(true);
        trackCTAClick({ ctaId: 'calendly-booking', ctaText: 'Call Booked', section: 'hero-calendly' });
      }
    };
    
    window.addEventListener('message', handleCalendlyMessage);
    return () => window.removeEventListener('message', handleCalendlyMessage);
  }, []);

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
  const logos = useMemo(() => [{
    src: logoFigs,
    alt: "FIGS"
  }, {
    src: logoCocofloss,
    alt: "Cocofloss"
  }, {
    src: logoSolventum,
    alt: "Solventum"
  }, {
    src: logoMHM,
    alt: "Marshall Hanson Method"
  }, {
    src: logoSmileVirtual,
    alt: "Smile Virtual"
  }], []);

  // Reduce duplicates from 4x to 2x for CSS animation
  const duplicatedLogos = useMemo(() => [...logos, ...logos], [logos]);
  return <section ref={sectionRef} className="relative min-h-screen py-10 md:py-24 overflow-hidden">
      {/* CSS animation for logo marquee */}
      <style>{`
        @keyframes logo-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-logo-marquee {
          animation: logo-marquee 20s linear infinite;
        }
      `}</style>
      
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
        <motion.div className="text-center mb-4 md:mb-8" style={{
        opacity
      }}>
          {/* Logo Header - Instant visibility, no animation delay */}
          <div className="flex flex-col items-center mb-3 md:mb-6">
           <span className="font-display text-base md:text-lg tracking-[0.15em] uppercase text-foreground">
              PASTED
            </span>
            <span className="text-[8px] md:text-[9px] tracking-[0.4em] uppercase text-muted-foreground/50 mt-0.5 font-sans">
              Private Growth Partnership
            </span>
          </div>
          
          {/* Single powerful headline - Instant render, no delay */}
          <h1 className="font-serif text-foreground mb-3 md:mb-5 leading-[1.1] tracking-[-0.01em]">
            <span className="block text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold">
              Where Aesthetic Dentists Add
            </span>
            <span className="block text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold">
              $500K–$1M+ Annually
            </span>
            <motion.span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl font-light italic text-muted-foreground/80 mt-2" initial={{
            opacity: 0.7
          }} animate={{
            opacity: 1
          }} transition={{
            duration: 0.5,
            delay: 0.1
          }}>
              And Build the Practice They Actually Want.
            </motion.span>
          </h1>
          
          <p className="hidden md:block text-sm sm:text-base md:text-lg text-muted-foreground/70 max-w-2xl mx-auto leading-relaxed font-sans font-light tracking-wide">
            A private, in-house growth infrastructure that transforms aesthetic practices into category leaders through positioning, systems, and an uncompromising commitment to experience.<br />
            <span className="italic">Built from real data across the world's top-performing cosmetic practices.</span>
          </p>
          <p className="hidden md:block text-xs text-muted-foreground/50 mt-2 tracking-wide">
            30 practices per year. Carefully selected.
          </p>
        </motion.div>
        
        {/* VSL - Instant visibility, no animation delay */}
        <div className="mb-4 md:mb-8">
          <VideoPlayer />
        </div>

        {/* Animated Metrics Bar - Instant container, animated content */}
        <div className="mb-5 md:mb-10">
          <MetricsBar />
        </div>

        {/* Transition Headline - Below Metrics */}
        

        {/* Discreet Logo Marquee - Instant visibility */}
        <div className="mb-5 overflow-hidden relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <p className="text-center text-muted-foreground/40 text-[10px] uppercase tracking-[0.2em] mb-3">
            Trusted by
          </p>
          
          {/* Fade edges */}
          <div className="absolute left-0 top-5 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-5 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className={`flex items-center ${isHovered ? '' : 'animate-logo-marquee'}`} style={{
          animationPlayState: isHovered ? 'paused' : 'running'
        }}>
            {duplicatedLogos.map((logo, index) => <div key={index} className="flex-shrink-0 mx-6 md:mx-10 flex items-center justify-center">
                <img src={logo.src} alt={logo.alt} loading="eager" decoding="async" className="h-5 md:h-6 w-auto max-w-[90px] md:max-w-[100px] object-contain" />
              </div>)}
          </div>
        </div>
        
        {/* Application Section - Calendly Embed */}
        <div id="eligibility-form" className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-6 md:p-10">
          {bookingConfirmed ? (
            // Confirmation Screen
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16 md:py-24"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center"
              >
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4"
              >
                You're Confirmed
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-muted-foreground max-w-md mx-auto mb-6"
              >
                Thank you for scheduling your strategy call. You'll receive a calendar invite and confirmation email shortly.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <p className="text-sm text-muted-foreground/70">
                  In the meantime, prepare to discuss:
                </p>
                <ul className="text-sm text-foreground/80 space-y-2 max-w-xs mx-auto text-left">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    Your current practice situation
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    Your brand vision and goals
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    Your timeline for growth
                  </li>
                </ul>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-xs text-muted-foreground/50 mt-8"
              >
                We look forward to speaking with you.
              </motion.p>
            </motion.div>
          ) : (
            // Calendly Widget
            <>
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-3">
                  If You've Outgrown What the Industry Offers — This Is the Next Step
                </h2>
                <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto mb-4">
                  We'll break down where your current growth is leaking, what's holding back case value and consistency,
                  and how the PASTED Partnership restructures your practice for long-term, predictable growth.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground/60 mb-2">
                  <span>Average call: 20–30 minutes</span>
                  <span className="hidden sm:inline">·</span>
                  <span>Applications reviewed within 48 hours</span>
                  <span className="hidden sm:inline">·</span>
                  <span>Limited partnership availability</span>
                </div>
                <p className="text-xs text-muted-foreground/50 italic">
                  This is a fit-based conversation. Not every practice is accepted.
                </p>
              </div>
              
              <div id="eligibility-form" className="relative" style={{ minHeight: '700px' }}>
                {/* Loading skeleton */}
                {!calendlyLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1a1a1a] rounded-xl border border-border/30">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                      <p className="text-sm text-muted-foreground">Loading calendar...</p>
                    </div>
                    {/* Skeleton lines matching Calendly dark theme */}
                    <div className="mt-8 space-y-3 w-full max-w-sm px-4">
                      <div className="h-4 bg-white/10 rounded animate-pulse" />
                      <div className="h-4 bg-white/8 rounded animate-pulse w-3/4" />
                      <div className="h-10 bg-white/5 rounded animate-pulse mt-4" />
                      <div className="h-10 bg-white/5 rounded animate-pulse" />
                      <div className="h-10 bg-white/5 rounded animate-pulse" />
                    </div>
                  </div>
                )}
                
                {/* Always render widget - Calendly script will find and initialize it */}
                <div 
                  className={`calendly-inline-widget rounded-xl overflow-hidden transition-opacity duration-500 ${calendlyLoaded ? 'opacity-100' : 'opacity-0'}`}
                  data-url="https://calendly.com/getpasted/pasted-partner-discovery?primary_color=ff0000"
                  style={{ minWidth: '320px', height: '700px' }}
                />
              </div>
            </>
          )}
        </div>

        {/* Secondary Statement - Below Form */}
        <div className="text-center mt-14 space-y-1 md:space-y-2">
          
          
          
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