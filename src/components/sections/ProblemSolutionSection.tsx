import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { X, Check, ArrowRight, AlertTriangle, Zap, Sparkles } from "lucide-react";
import { trackCTAClick } from "@/hooks/useCTAAnalytics";

const ProblemSolutionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Track when solution section enters viewport for grayscale effect
  const { scrollYProgress: solutionProgress } = useScroll({
    target: solutionRef,
    offset: ["start end", "center center"]
  });
  
  const leftGlowY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rightGlowY = useTransform(scrollYProgress, [0, 1], [-80, 120]);
  const leftGlowX = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const rightGlowX = useTransform(scrollYProgress, [0, 1], [50, -30]);
  
  // Problem section dramatic fade to grayscale as solution enters
  const problemGrayscale = useTransform(solutionProgress, [0, 0.6, 1], [0, 0.7, 1]);
  const problemOpacity = useTransform(solutionProgress, [0, 0.6, 1], [1, 0.6, 0.4]);
  const problemScale = useTransform(solutionProgress, [0, 0.6, 1], [1, 0.98, 0.96]);
  const problemBrightness = useTransform(solutionProgress, [0, 0.6, 1], [1, 0.7, 0.5]);
  
  // Solution section intensifies as it enters
  const solutionBrightness = useTransform(solutionProgress, [0, 0.5, 1], [0.8, 1, 1.1]);
  const solutionSaturation = useTransform(solutionProgress, [0, 0.5, 1], [0.5, 1, 1.2]);

  const problems = [
    "Clinically excellent — but patients don't know you exist.",
    "Losing cosmetic cases to louder, less skilled competitors.",
    "Multiple agencies and freelancers that never talk to each other.",
    "Getting leads that are price shoppers, not cosmetic patients.",
    "Running ads into a brand that isn't strong enough to close the patients it attracts.",
    "Consultations feel harder than they should — patients aren't pre-sold.",
    "Your reputation doesn't match the quality of your work.",
  ];

  const solutions = [
    "Everything in-house — no agencies, no handoffs, no dilution.",
    "Built from real-world data, not theory or recycled strategies.",
    "Elite creative + performance acquisition in one system.",
    "Authority positioning that pre-sells patients before they call.",
    "Focus isn't leads — it's who walks in, what they say yes to, and how much they spend.",
    "Behavioral psychology applied to patient conversion.",
    "Clear metrics and revenue attribution across every channel.",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -15, filter: "blur(4px)" },
    visible: { 
      opacity: 1, 
      x: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.4, ease: "easeOut" as const }
    },
  };

  const solutionItemVariants = {
    hidden: { opacity: 0, x: 15, filter: "blur(4px)" },
    visible: { 
      opacity: 1, 
      x: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.4, ease: "easeOut" as const }
    },
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Ambient background effects with parallax */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Red glow for problem side */}
        <motion.div 
          className="absolute top-1/4 left-0 w-[600px] h-[600px] rounded-full blur-[150px]"
          style={{ 
            y: leftGlowY, 
            x: leftGlowX,
            background: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(239,68,68,0.05) 50%, transparent 70%)"
          }}
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Green glow for solution side */}
        <motion.div 
          className="absolute bottom-1/4 right-0 w-[600px] h-[600px] rounded-full blur-[150px]"
          style={{ 
            y: rightGlowY, 
            x: rightGlowX,
            background: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(34,197,94,0.05) 50%, transparent 70%)"
          }}
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.span 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 text-foreground/80 text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4" />
            Why Nothing Has Worked
          </motion.span>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Others Help You Do More.<br />
            <span className="text-muted-foreground italic">PASTED Changes What You Become.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            If you've hired an agency and it underdelivered — that's not bad luck. That's the business model.
            The industry profits from your plateau by selling more tools, more tactics, more ads.
            None of it addresses the underlying structure. PASTED rebuilds the system that drives patient perception, case value, and predictable growth.
          </p>
        </motion.div>

        {/* Side by side cards */}
        <div className="grid lg:grid-cols-2 gap-0 relative">
          {/* The Problem - RED with grayscale fade */}
          <motion.div 
            className="relative group"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              opacity: problemOpacity,
              scale: problemScale,
              filter: useTransform(
                [problemGrayscale, problemBrightness],
                ([grayscale, brightness]) => `grayscale(${grayscale}) brightness(${brightness})`
              )
            }}
          >
            {/* Red glow effect */}
            <motion.div 
              className="absolute -inset-2 bg-gradient-to-br from-red-500/30 via-red-500/10 to-transparent rounded-3xl blur-2xl transition-opacity duration-700"
              style={{
                opacity: useTransform(problemOpacity, [0.4, 1], [0.2, 0.6])
              }}
            />
            
            <div className="relative p-8 md:p-10 lg:p-12 rounded-l-3xl lg:rounded-r-none rounded-r-3xl lg:border-r-0 bg-gradient-to-br from-red-950/40 via-red-950/20 to-card/40 backdrop-blur-sm border-2 border-red-500/30 h-full overflow-hidden">
              {/* Animated red pulse background */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Diagonal stripes pattern */}
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: "repeating-linear-gradient(135deg, transparent, transparent 10px, rgba(239,68,68,0.3) 10px, rgba(239,68,68,0.3) 20px)"
              }} />
              
              {/* Corner accent */}
              <motion.div 
                className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-red-500/60 rounded-tl-3xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
              <motion.div 
                className="absolute bottom-0 right-0 lg:hidden w-20 h-20 border-b-4 border-r-4 border-red-500/60 rounded-br-3xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              />
              
              {/* Scanning line effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-red-500/20 via-transparent to-transparent"
                initial={{ y: "-100%" }}
                whileInView={{ y: "200%" }}
                viewport={{ once: true }}
                transition={{ duration: 2.5, delay: 0.3, ease: "easeInOut" }}
              />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <motion.div 
                    className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    animate={{ 
                      boxShadow: ["0 0 20px rgba(239,68,68,0.3)", "0 0 40px rgba(239,68,68,0.5)", "0 0 20px rgba(239,68,68,0.3)"]
                    }}
                    transition={{ 
                      boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                      scale: { type: "spring", stiffness: 400 }
                    }}
                  >
                    <AlertTriangle className="w-7 h-7 text-red-400" />
                  </motion.div>
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                      The Problem
                    </h3>
                    <p className="text-red-300/80 text-sm font-medium">What's holding you back</p>
                  </div>
                </div>
                
                <motion.ul 
                  className="space-y-3"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {problems.map((problem, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3 group/item"
                      variants={itemVariants}
                    >
                      <span className="mt-1 w-6 h-6 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0 group-hover/item:bg-red-500/30 group-hover/item:border-red-500/50 transition-all duration-300">
                        <X className="w-3.5 h-3.5 text-red-400" />
                      </span>
                      <span className="text-sm md:text-base leading-relaxed text-red-100/80 group-hover/item:text-white transition-colors duration-300">
                        {problem}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </div>
          </motion.div>

          {/* Center divider with arrow */}
          <motion.div 
            className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6, type: "spring" }}
          >
            <motion.div 
              className="relative w-20 h-20 rounded-full bg-gradient-to-br from-red-500/20 via-background to-green-500/20 border-2 border-foreground/20 flex items-center justify-center backdrop-blur-xl shadow-2xl"
              animate={{ 
                x: [0, 8, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-1 rounded-full bg-background/80" />
              <ArrowRight className="w-8 h-8 text-foreground relative z-10" />
            </motion.div>
          </motion.div>

          {/* Mobile arrow */}
          <motion.div 
            className="flex lg:hidden justify-center py-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-14 h-14 rounded-full bg-gradient-to-b from-red-500/20 to-green-500/20 border border-foreground/20 flex items-center justify-center rotate-90"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight className="w-6 h-6 text-foreground" />
            </motion.div>
          </motion.div>

          {/* The Solution - GREEN with intensifying effect */}
          <motion.div 
            ref={solutionRef}
            className="relative group"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            style={{
              filter: useTransform(
                [solutionBrightness, solutionSaturation],
                ([brightness, saturation]) => `brightness(${brightness}) saturate(${saturation})`
              )
            }}
          >
            {/* Green glow effect - intensifies */}
            <motion.div 
              className="absolute -inset-2 bg-gradient-to-bl from-green-500/30 via-green-500/10 to-transparent rounded-3xl blur-2xl transition-opacity duration-700"
              style={{
                opacity: useTransform(solutionProgress, [0, 0.5, 1], [0.3, 0.6, 1])
              }}
            />
            
            <div className="relative p-8 md:p-10 lg:p-12 rounded-r-3xl lg:rounded-l-none rounded-l-3xl lg:border-l-0 bg-gradient-to-bl from-green-950/40 via-green-950/20 to-card/40 backdrop-blur-sm border-2 border-green-500/30 h-full overflow-hidden">
              {/* Animated green pulse background */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-bl from-green-500/10 to-transparent"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              
              {/* Diagonal stripes pattern */}
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: "repeating-linear-gradient(-135deg, transparent, transparent 10px, rgba(34,197,94,0.3) 10px, rgba(34,197,94,0.3) 20px)"
              }} />
              
              {/* Corner accent */}
              <motion.div 
                className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-green-500/60 rounded-tr-3xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              />
              <motion.div 
                className="absolute bottom-0 left-0 lg:hidden w-20 h-20 border-b-4 border-l-4 border-green-500/60 rounded-bl-3xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              />
              
              {/* Scanning line effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-green-500/20 via-transparent to-transparent"
                initial={{ y: "-100%" }}
                whileInView={{ y: "200%" }}
                viewport={{ once: true }}
                transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
              />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <motion.div 
                    className="w-14 h-14 rounded-2xl bg-green-500/20 border border-green-500/40 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    animate={{ 
                      boxShadow: ["0 0 20px rgba(34,197,94,0.3)", "0 0 40px rgba(34,197,94,0.5)", "0 0 20px rgba(34,197,94,0.3)"]
                    }}
                    transition={{ 
                      boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                      scale: { type: "spring", stiffness: 400 }
                    }}
                  >
                    <Zap className="w-7 h-7 text-green-400" />
                  </motion.div>
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                      The Solution
                    </h3>
                    <p className="text-green-300/80 text-sm font-medium">How we solve it</p>
                  </div>
                </div>
                
                <motion.ul 
                  className="space-y-3"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {solutions.map((solution, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3 group/item"
                      variants={solutionItemVariants}
                    >
                      <span className="mt-1 w-6 h-6 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0 group-hover/item:bg-green-500/30 group-hover/item:border-green-500/50 transition-all duration-300">
                        <Check className="w-3.5 h-3.5 text-green-400" />
                      </span>
                      <span className="text-sm md:text-base leading-relaxed text-green-100/80 group-hover/item:text-white transition-colors duration-300">
                        {solution}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Authority Line */}
        <motion.div 
          className="mt-12 md:mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="relative p-6 md:p-8 rounded-2xl bg-gradient-to-r from-red-500/5 via-foreground/5 to-green-500/5 border border-foreground/10 backdrop-blur-sm">
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/20 via-transparent to-green-500/20 opacity-50 blur-xl" />
            
            <div className="relative flex items-center gap-4 md:gap-6">
              <motion.div
                className="hidden md:block w-1.5 h-16 rounded-full bg-gradient-to-b from-red-500 via-foreground/50 to-green-500"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{ originY: 0 }}
              />
              <div className="text-center md:text-left">
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  We've turned brand and content into patient demand for some of the best aesthetic practices in the world.{" "}
                  <span className="text-foreground font-semibold">This is proven, not theoretical.</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Custom CTA Button */}
        <motion.div 
          className="mt-10 md:mt-14 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.a
            href="#eligibility-form"
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 text-base font-medium tracking-wide uppercase bg-primary text-primary-foreground rounded-sm overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] hover:scale-[1.02]"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.preventDefault();
              trackCTAClick({ ctaId: 'problem-solution', ctaText: 'See If You Qualify', section: 'problem-solution' });
              document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
          >
            {/* Animated background glow */}
            <span className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
            <span className="absolute inset-0 bg-gradient-to-r from-primary/90 via-red-500 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <span className="relative z-10">See If You Qualify</span>
            <ArrowRight className="relative z-10 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
