import { motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

// Animated counter hook
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

// Animated number component
const AnimatedStat = ({ value, suffix = "%", isVisible, delay = 0, className }: { 
  value: number; 
  suffix?: string; 
  isVisible: boolean; 
  delay?: number;
  className?: string;
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
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const proofBlocks = [
    {
      title: "Choice Happens Before the Click",
      statValue: 77,
      statLabel: "of patients decide who they trust before ever contacting a practice",
      points: ["Content", "Reviews", "Brand presence", "Perceived authority"],
      conclusion: "If your organic presence doesn't differentiate you, ads just amplify mediocrity."
    },
    {
      title: "Content Determines Conversion",
      statValue: 74,
      statLabel: "higher-quality demand from content-driven brands",
      points: ["Engaged audiences spend 20–40% more per case", "Strong narrative = higher consult-to-case conversion"],
      conclusion: "Ads bring attention. Content converts attention into revenue."
    },
    {
      title: "Why 'Copying What Works' Fails",
      statValue: 0,
      statLabel: "differentiation when everyone copies the same playbook",
      points: ["Same veneers posts", "Same captions", "Same before-and-after angles"],
      conclusion: "When everyone looks the same, patients choose the cheapest or the loudest."
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        
        {/* Hero Opening */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6">The Simple Truth</p>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-foreground mb-8 leading-tight">
            You Don't Need Better Ads.<br />
            <span className="text-foreground/70">You Need to Be Chosen.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            And that only happens when your brand does the talking for you.
          </p>
        </motion.div>

        {/* The Uncomfortable Truth */}
        <motion.div 
          className="max-w-3xl mx-auto mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="space-y-4 text-center">
            <p className="text-xl md:text-2xl text-foreground/90">You can target perfectly.</p>
            <p className="text-xl md:text-2xl text-foreground/90">You can run ads flawlessly.</p>
            <p className="text-xl md:text-2xl text-foreground/90">You can hire the best agency in the world.</p>
            <div className="py-6">
              <p className="text-2xl md:text-3xl font-serif text-foreground font-medium">And it still won't matter.</p>
            </div>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Because if your organic content isn't powerful, differentiated, and emotionally clear—you will not get chosen at the rate you want.
            </p>
          </div>
        </motion.div>

        {/* The 97% Rule - Visual Block */}
        <motion.div 
          className="mb-24"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative bg-card/50 border border-border/30 rounded-lg p-8 md:p-12">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/30 rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/30 rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/30 rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/30 rounded-br-lg" />

            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-8 text-center">The 97% Rule</p>
            
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* 97% Side */}
              <div className="text-center md:text-left">
                <motion.div 
                  className="text-7xl md:text-8xl font-serif text-foreground mb-4"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={isVisible ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <AnimatedStat value={97} isVisible={isVisible} delay={500} />
                </motion.div>
                <p className="text-lg text-foreground/80 mb-4">of production growth is driven by:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2 justify-center md:justify-start">
                    <span className="w-1.5 h-1.5 bg-primary/60 rounded-full" />
                    Brand clarity
                  </li>
                  <li className="flex items-center gap-2 justify-center md:justify-start">
                    <span className="w-1.5 h-1.5 bg-primary/60 rounded-full" />
                    Content quality
                  </li>
                  <li className="flex items-center gap-2 justify-center md:justify-start">
                    <span className="w-1.5 h-1.5 bg-primary/60 rounded-full" />
                    Strategic positioning
                  </li>
                </ul>
              </div>

              {/* 3% Side */}
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
                    Targeting mechanics
                  </li>
                  <li className="flex items-center gap-2 justify-center md:justify-start">
                    <span className="w-1.5 h-1.5 bg-foreground/20 rounded-full" />
                    Platform hacks
                  </li>
                  <li className="flex items-center gap-2 justify-center md:justify-start">
                    <span className="w-1.5 h-1.5 bg-foreground/20 rounded-full" />
                    Agency optimization tricks
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-border/30 text-center">
              <p className="text-xl font-serif text-foreground">
                If the 97% is weak, the 3% is irrelevant.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Proof Blocks */}
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

        {/* The Growth Equation */}
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-8">The Real Growth Equation</p>
          
          <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap mb-8">
            <span className="text-2xl md:text-4xl font-serif text-foreground">Visibility</span>
            <span className="text-3xl md:text-5xl text-primary/60">×</span>
            <span className="text-2xl md:text-4xl font-serif text-foreground">Differentiation</span>
            <span className="text-3xl md:text-5xl text-primary/60">=</span>
            <span className="text-2xl md:text-4xl font-serif text-foreground font-medium">Demand</span>
          </div>
          
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            Most dentists only work on visibility.<br />
            <span className="text-foreground/80">That's why they plateau.</span>
          </p>
        </motion.div>

        {/* Mic Drop Closing */}
        <motion.div 
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-12" />
          
          <p className="text-xl md:text-2xl text-foreground/90 mb-4">
            Ads amplify what exists.
          </p>
          <p className="text-2xl md:text-3xl font-serif text-foreground">
            Brand decides whether it's worth amplifying.
          </p>
          
          <div className="mt-10 pt-8">
            <p className="text-sm text-muted-foreground italic mb-8">
              Stop copying. Build authority. Create demand that compounds.
            </p>
            <motion.a 
              href="#eligibility-form"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 text-base font-medium tracking-wide uppercase bg-primary text-primary-foreground rounded-sm overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] hover:scale-[1.02]"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
              <span className="absolute inset-0 bg-gradient-to-r from-primary/90 via-red-500 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">See If You Qualify</span>
            </motion.a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default TheTruthSection;
