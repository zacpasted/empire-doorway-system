import { useRef, useState, memo, useMemo, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import VideoPlayer from "@/components/VideoPlayer";
import EligibilityForm from "@/components/EligibilityForm";
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
    label: "Revenue Generated",
    numValue: 100,
    prefix: "$",
    suffix: "M+",
    barWidth: 95
  }, {
    label: "8 Figure Practices Built",
    numValue: 42,
    prefix: "",
    suffix: "+",
    barWidth: 100
  }, {
    label: "Careers Curated",
    numValue: 200,
    prefix: "",
    suffix: "+",
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
      
      
      
      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-foreground/30 to-transparent animate-pulse" />
      </div>
    </section>;
};
export default HeroSection;