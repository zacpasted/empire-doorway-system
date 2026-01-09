import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { X, Check } from "lucide-react";

const FilterSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2
  });

  const notFor = [
    { text: "Trend chasers" },
    { text: "Loud marketers" },
    { text: "Volume-first clinicians" },
    { text: "Those who outsource responsibility" }
  ];

  const isFor = [
    { text: "Dentists who feel overlooked despite merit" },
    { text: "Those ready to author their own position" },
    { text: "Practitioners who value restraint over noise" },
    { text: "The ones who understand patience" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4
      }
    }
  };

  const itemVariantsLeft = {
    hidden: { opacity: 0, x: -40, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  };

  const itemVariantsRight = {
    hidden: { opacity: 0, x: 40, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        delay: 0.2
      }
    }
  };

  const closingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-32 md:py-40 bg-background relative overflow-hidden"
    >
      {/* Ambient background glows */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-[120px] pointer-events-none"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-[100px] pointer-events-none"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      
      {/* Scanning line effect */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        initial={{ x: "-100%" }}
        animate={isInView ? { x: "100%" } : {}}
        transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headingVariants}
        >
          <motion.span 
            className="inline-block text-xs uppercase tracking-[0.3em] text-primary/80 mb-6"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Qualification
          </motion.span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 tracking-tight">
            The Gate
          </h2>
          <motion.div 
            className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-primary/60 to-transparent mb-8"
            variants={lineVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          />
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto font-light italic">
            This isn't for everyone. That's the point.
          </p>
        </motion.div>
        
        {/* Two-column layout with animated cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Not For - Left panel */}
          <motion.div 
            className="relative group"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Card with border glow */}
            <div className="relative p-8 md:p-10 rounded-2xl border border-muted-foreground/10 bg-card/30 backdrop-blur-sm overflow-hidden">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-muted-foreground/20" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-muted-foreground/20" />
              
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-muted-foreground/[0.02] to-transparent pointer-events-none" />
              
              <h3 className="text-sm uppercase tracking-[0.2em] text-muted-foreground/60 mb-8 flex items-center gap-3">
                <span className="w-6 h-px bg-muted-foreground/30" />
                Not For
              </h3>
              
              <div className="space-y-5">
                {notFor.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariantsLeft}
                    className="flex items-center gap-4 group/item"
                  >
                    <motion.div 
                      className="flex-shrink-0 w-8 h-8 rounded-full border border-muted-foreground/20 flex items-center justify-center bg-muted/30"
                      whileHover={{ scale: 1.1, borderColor: "hsl(var(--primary) / 0.4)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-4 h-4 text-muted-foreground/50" />
                    </motion.div>
                    <span className="text-muted-foreground/70 text-base md:text-lg transition-colors duration-300 group-hover/item:text-muted-foreground">
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Built For - Right panel */}
          <motion.div 
            className="relative group"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Card with primary border glow */}
            <div className="relative p-8 md:p-10 rounded-2xl border border-primary/20 bg-card/40 backdrop-blur-sm overflow-hidden">
              {/* Animated border glow */}
              <motion.div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--primary) / 0.1) 0%, transparent 50%, hsl(var(--primary) / 0.05) 100%)"
                }}
              />
              
              {/* Corner accents with primary color */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-primary/30" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-primary/30" />
              
              {/* Primary gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent pointer-events-none" />
              
              <h3 className="text-sm uppercase tracking-[0.2em] text-primary/70 mb-8 flex items-center gap-3 relative z-10">
                <span className="w-6 h-px bg-primary/40" />
                Built For
              </h3>
              
              <div className="space-y-5 relative z-10">
                {isFor.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariantsRight}
                    className="flex items-center gap-4 group/item"
                  >
                    <motion.div 
                      className="flex-shrink-0 w-8 h-8 rounded-full border border-primary/30 flex items-center justify-center bg-primary/10"
                      whileHover={{ scale: 1.1, boxShadow: "0 0 20px hsl(var(--primary) / 0.3)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <Check className="w-4 h-4 text-primary" />
                    </motion.div>
                    <span className="text-foreground/90 text-base md:text-lg transition-colors duration-300 group-hover/item:text-foreground">
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Closing statement */}
        <motion.div 
          className="text-center mt-20"
          variants={closingVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.p 
            className="text-muted-foreground/60 text-sm md:text-base max-w-md mx-auto italic"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            If this distinction feels uncomfortable, this is not the right place.
          </motion.p>
        </motion.div>
      </div>
      
      {/* Bottom scanning line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        initial={{ x: "100%" }}
        animate={isInView ? { x: "-100%" } : {}}
        transition={{ duration: 2.5, ease: "easeInOut", delay: 1 }}
      />
    </section>
  );
};

export default FilterSection;
