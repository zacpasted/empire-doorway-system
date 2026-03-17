import { motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { trackCTAClick } from "@/hooks/useCTAAnalytics";

const useCounter = (end: number, duration: number = 2000, isActive: boolean) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isActive) return;
    let startTime: number | null = null;
    let animationFrame: number;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(easeOutCubic(progress) * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isActive]);
  
  return count;
};

const AnimatedStat = ({ value, suffix = "%", isVisible, delay = 0, className }: { 
  value: number; suffix?: string; isVisible: boolean; delay?: number; className?: string;
}) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setShouldAnimate(true), delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);
  const count = useCounter(value, 1500, shouldAnimate);
  return <span className={className}>{count}{suffix}</span>;
};

const TheTruthSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const proofBlocks = [
    {
      title: "Perception Drives Patient Choice",
      statValue: 77,
      statLabel: "of patients decide who they trust before ever contacting a practice",
      points: ["Brand authority", "Content quality", "Online presence", "Perceived expertise"],
      conclusion: "If patients don't perceive you as the cosmetic authority, they choose someone else — regardless of your clinical skill."
    },
    {
      title: "Authority Increases Case Value",
      statValue: 74,
      statLabel: "higher case acceptance from authority-positioned practices",
      points: ["Pre-sold patients accept larger treatment plans", "Strong brands reduce price sensitivity"],
      conclusion: "Patients who already trust your expertise accept more comprehensive — and more valuable — treatment."
    },
    {
      title: "Why 'Copying What Works' Fails",
      statValue: 0,
      statLabel: "differentiation when every practice copies the same playbook",
      points: ["Same before-and-after posts", "Same captions", "Same generic content"],
      conclusion: "When every cosmetic dentist looks the same, patients choose the cheapest or the loudest — not the most skilled."
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6">The Simple Truth</p>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-foreground mb-8 leading-tight">
            Cosmetic Dentistry Is a Perception Category.<br />
            <span className="text-foreground/70">The Best Brand Wins.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The practices that dominate their market control authority, perception, and patient demand — not just clinical outcomes.
          </p>
        </motion.div>

        <motion.div 
          className="max-w-3xl mx-auto mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="space-y-4 text-center">
            <p className="text-xl md:text-2xl text-foreground/90">You can have the best clinical skills in your city.</p>
            <p className="text-xl md:text-2xl text-foreground/90">You can invest in the latest technology.</p>
            <p className="text-xl md:text-2xl text-foreground/90">You can hire the most expensive agency available.</p>
            <div className="py-6">
              <p className="text-2xl md:text-3xl font-serif text-foreground font-medium">And patients will still choose someone else.</p>
            </div>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Because if your brand doesn't clearly position you as the cosmetic authority in your market — you will not attract the patients or the case values you deserve.
            </p>
          </div>
        </motion.div>

        <motion.div 
          className="mb-24"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative bg-card/50 border border-border/30 rounded-lg p-8 md:p-12">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/30 rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/30 rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/30 rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/30 rounded-br-lg" />

            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-8 text-center">What Drives Cosmetic Patient Choice</p>
            
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <div className="text-center md:text-left">
                <motion.div 
                  className="text-7xl md:text-8xl font-serif text-foreground mb-4"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={isVisible ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <AnimatedStat value={97} isVisible={isVisible} delay={500} />
                </motion.div>
                <p className="text-lg text-foreground/80 mb-4">of practice growth is driven by:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2 justify-center md:justify-start">
                    <span className="w-1.5 h-1.5 bg-primary/60 rounded-full" />
                    Brand authority & positioning
                  </li>
                  <li className="flex items-center gap-2 justify-center md:justify-start">
                    <span className="w-1.5 h-1.5 bg-primary/60 rounded-full" />
                    Content quality & consistency
                  </li>
                  <li className="flex items-center gap-2 justify-center md:justify-start">
                    <span className="w-1.5 h-1.5 bg-primary/60 rounded-full" />
                    Patient perception & trust
                  </li>
                </ul>
              </div>

              <div className="text-center md:text-left opacity-50">
                <motion.div 
                  className="text-7xl md:text-8xl font-serif text-foreground/40 mb-4"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={isVisible ? { scale: 1, opacity: 0.4 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <AnimatedStat value={3} isVisible={isVisible} delay={600} />
                </motion.div>
                <p className="text-lg text-foreground/50 mb-4">is influenced by:</p>
                <ul className="space-y-2 text-muted-foreground/50">
                  <li className="flex items-center gap-2 justify-center md:justify-start">
                    <span className="w-1.5 h-1.5 bg-foreground/20 rounded-full" />
                    Ad targeting mechanics
                  </li>
                  <li className="flex items-center gap-2 justify-center md:justify-start">
                    <span className="w-1.5 h-1.5 bg-foreground/20 rounded-full" />
                    Platform optimization tricks
                  </li>
                  <li className="flex items-center gap-2 justify-center md:justify-start">
                    <span className="w-1.5 h-1.5 bg-foreground/20 rounded-full" />
                    Generic agency templates
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-border/30 text-center">
              <p className="text-xl font-serif text-foreground">
                If the brand is weak, the ads are irrelevant.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {proofBlocks.map((block, index) => (
            <motion.div
              key={block.title}
              className="bg-card/30 border border-border/20 rounded-lg p-6 md:p-8 relative group hover:border-primary/20 transition-colors duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg" />
              
              <motion.div 
                className="text-5xl md:text-6xl font-serif text-primary/80 mb-4"
                initial={{ scale: 0.9 }}
                animate={isVisible ? { scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              >
                <AnimatedStat value={block.statValue} isVisible={isVisible} delay={600 + index * 100} />
              </motion.div>
              
              <p className="text-sm text-muted-foreground mb-4">{block.statLabel}</p>
              <h3 className="font-serif text-lg text-foreground mb-4">{block.title}</h3>
              
              <ul className="space-y-2 mb-6">
                {block.points.map((point, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="w-1 h-1 bg-foreground/30 rounded-full mt-2 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
              
              <p className="text-sm text-foreground/80 italic border-t border-border/30 pt-4">
                {block.conclusion}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-8">The Growth Equation</p>
          
          <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap mb-8">
            <span className="text-2xl md:text-4xl font-serif text-foreground">Authority</span>
            <span className="text-3xl md:text-5xl text-primary/60">×</span>
            <span className="text-2xl md:text-4xl font-serif text-foreground">Visibility</span>
            <span className="text-3xl md:text-5xl text-primary/60">=</span>
            <span className="text-2xl md:text-4xl font-serif text-foreground font-medium">Demand</span>
          </div>
          
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            Most cosmetic dentists only work on visibility.<br />
            <span className="text-foreground/80">Without authority, visibility just amplifies mediocrity.</span>
          </p>
        </motion.div>

        <motion.div 
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-12" />
          
          <p className="text-xl md:text-2xl text-foreground/90 mb-4">
            Ads amplify what already exists.
          </p>
          <p className="text-2xl md:text-3xl font-serif text-foreground">
            Brand determines whether it's worth amplifying.
          </p>
          
          <div className="mt-10 pt-8">
            <p className="text-sm text-muted-foreground italic mb-8">
              Stop competing on price. Build authority. Create demand that compounds.
            </p>
            <motion.a 
              href="#eligibility-form"
              onClick={(e) => {
                e.preventDefault();
                trackCTAClick({ ctaId: 'the-truth', ctaText: 'Schedule a Discovery Call', section: 'the-truth' });
                document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 text-base font-medium tracking-wide uppercase bg-primary text-primary-foreground rounded-sm overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] hover:scale-[1.02]"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
              <span className="absolute inset-0 bg-gradient-to-r from-primary/90 via-red-500 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Schedule a Discovery Call</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TheTruthSection;