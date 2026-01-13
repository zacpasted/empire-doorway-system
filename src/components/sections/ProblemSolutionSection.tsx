import { motion, useScroll, useTransform } from "framer-motion";
import { X, Check, ArrowRight, Sparkles } from "lucide-react";
import { useRef } from "react";

const ProblemSolutionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const leftGlowY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rightGlowY = useTransform(scrollYProgress, [0, 1], [-80, 120]);
  const leftGlowX = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const rightGlowX = useTransform(scrollYProgress, [0, 1], [50, -30]);
  const problems = [
    "You know branding matters but don't know where to start.",
    "You know content is required but don't know what to say.",
    "Creating feels unnatural, inconsistent, and time-consuming.",
    "Most dental content looks the same.",
    "Attention doesn't turn into patients.",
    "Virality is confused for growth.",
    "You don't know who to trust.",
    "Agencies promise exposure, not outcomes.",
    "Branding feels hard to justify financially.",
    "You worry about the payoff.",
    "You delay because the risk feels unclear.",
  ];

  const solutions = [
    "A clear system for brand, content, and conversion.",
    "Direction on exactly what to say and why it works.",
    "A repeatable creation process that fits real clinical life.",
    "Positioning that immediately differentiates you.",
    "Content designed to convert, not just attract.",
    "Strategy built for qualified patient demand.",
    "Guidance from a team that's done this at the highest level.",
    "Proven frameworks used by the best in the world.",
    "Branding treated as a revenue asset.",
    "Confidence in spend and direction.",
    "Momentum that compounds over time.",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20, filter: "blur(4px)" },
    visible: { 
      opacity: 1, 
      x: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: "easeOut" as const }
    },
  };

  const solutionItemVariants = {
    hidden: { opacity: 0, x: 20, filter: "blur(4px)" },
    visible: { 
      opacity: 1, 
      x: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: "easeOut" as const }
    },
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Ambient background effects with parallax */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-muted-foreground/5 rounded-full blur-[120px]"
          style={{ y: leftGlowY, x: leftGlowX }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]"
          style={{ y: rightGlowY, x: rightGlowX }}
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Additional subtle glow */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/3 rounded-full blur-[180px]"
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative">
        {/* Section header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.span 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4" />
            The Diagnosis
          </motion.span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
            Why Most Dentists Stay{" "}
            <span className="text-muted-foreground italic">Invisible</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            And how we solve it — systematically.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 relative">
          {/* The Problem */}
          <motion.div 
            className="relative group"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Card glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-br from-muted-foreground/20 via-transparent to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative p-8 md:p-10 rounded-2xl bg-card/40 backdrop-blur-sm border border-border/40 h-full">
              {/* Animated corner accents */}
              <motion.div 
                className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-muted-foreground/30 rounded-tl-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
              <motion.div 
                className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-muted-foreground/30 rounded-br-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              />
              
              {/* Scanning line effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-muted-foreground/5 via-transparent to-transparent rounded-2xl"
                initial={{ y: "-100%" }}
                whileInView={{ y: "200%" }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
              />
              
              <div className="flex items-center gap-4 mb-8">
                <motion.div 
                  className="w-12 h-12 rounded-xl bg-muted-foreground/10 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </motion.div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                  The Problem
                </h3>
              </div>
              
              <motion.ul 
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {problems.map((problem, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3 text-muted-foreground group/item"
                    variants={itemVariants}
                  >
                    <span className="mt-1.5 w-5 h-5 rounded-full bg-muted-foreground/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-muted-foreground/20 transition-colors">
                      <X className="w-3 h-3 text-muted-foreground/60" />
                    </span>
                    <span className="text-sm md:text-base leading-relaxed group-hover/item:text-foreground transition-colors duration-300">
                      {problem}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>

          {/* Animated Arrow Connector */}
          <motion.div 
            className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5, type: "spring" }}
          >
            <motion.div 
              className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/40 flex items-center justify-center backdrop-blur-md shadow-lg shadow-primary/20"
              animate={{ 
                x: [0, 6, 0],
                boxShadow: [
                  "0 10px 40px -10px hsl(var(--primary) / 0.2)",
                  "0 10px 60px -10px hsl(var(--primary) / 0.4)",
                  "0 10px 40px -10px hsl(var(--primary) / 0.2)",
                ]
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Inner glow */}
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/20 to-transparent" />
              <ArrowRight className="w-6 h-6 text-primary relative z-10" />
            </motion.div>
          </motion.div>

          {/* Mobile arrow */}
          <motion.div 
            className="flex lg:hidden justify-center -my-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center rotate-90"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight className="w-4 h-4 text-primary" />
            </motion.div>
          </motion.div>

          {/* The Solution */}
          <motion.div 
            className="relative group"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {/* Card glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 via-primary/10 to-transparent rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative p-8 md:p-10 rounded-2xl bg-gradient-to-br from-primary/10 via-card/60 to-card/40 backdrop-blur-sm border border-primary/30 h-full overflow-hidden">
              {/* Animated corner accents */}
              <motion.div 
                className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-primary/40 rounded-tl-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              />
              <motion.div 
                className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-primary/40 rounded-br-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              />
              
              {/* Scanning line effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent rounded-2xl"
                initial={{ y: "-100%" }}
                whileInView={{ y: "200%" }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.7, ease: "easeInOut" }}
              />
              
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl" />
              
              <div className="relative">
                <div className="flex items-center gap-4 mb-8">
                  <motion.div 
                    className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Check className="w-5 h-5 text-primary" />
                  </motion.div>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                    The Solution
                  </h3>
                </div>
                
                <motion.ul 
                  className="space-y-4"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {solutions.map((solution, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3 text-foreground/90 group/item"
                      variants={solutionItemVariants}
                    >
                      <span className="mt-1.5 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover/item:bg-primary/30 transition-colors">
                        <Check className="w-3 h-3 text-primary" />
                      </span>
                      <span className="text-sm md:text-base leading-relaxed group-hover/item:text-foreground transition-colors duration-300">
                        {solution}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>
                
                {/* Authority Line */}
                <motion.div 
                  className="mt-8 pt-8 border-t border-primary/20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  <div className="flex items-start gap-3">
                    <motion.div
                      className="w-1 h-full min-h-[60px] bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 1.2 }}
                      style={{ originY: 0 }}
                    />
                    <p className="text-sm md:text-base text-muted-foreground italic leading-relaxed">
                      We've turned brand and content into patient demand for some of the best aesthetic practices in the world.{" "}
                      <span className="text-foreground font-medium not-italic">This is proven, not theoretical.</span>
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
