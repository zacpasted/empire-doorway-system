import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { X, Check } from "lucide-react";

const FilterSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.3
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
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariantsLeft = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  };

  const itemVariantsRight = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  };

  const cardVariants = {
    rest: { 
      scale: 1,
      boxShadow: "0 0 0 0 hsl(var(--primary) / 0)"
    },
    hover: { 
      scale: 1.02,
      boxShadow: "0 0 40px -10px hsl(var(--primary) / 0.3)"
    }
  };

  const cardVariantsMuted = {
    rest: { 
      scale: 1,
      boxShadow: "0 0 0 0 hsl(var(--muted-foreground) / 0)"
    },
    hover: { 
      scale: 1.02,
      boxShadow: "0 0 30px -10px hsl(var(--muted-foreground) / 0.15)"
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-16 md:py-20 bg-background relative overflow-hidden"
    >
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-primary/[0.02] blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Compact Header */}
        <motion.div 
          className="text-center mb-10"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headingVariants}
        >
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3 tracking-tight">
            The Gate
          </h2>
          <p className="text-base text-muted-foreground max-w-md mx-auto">
            This isn't for everyone. That's the point.
          </p>
        </motion.div>
        
        {/* Two-column layout with hover glow cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          {/* Not For - Left panel */}
          <motion.div 
            className="relative"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div 
              className="relative p-6 rounded-xl border border-muted/40 bg-muted/10 overflow-hidden cursor-default"
              variants={cardVariantsMuted}
              initial="rest"
              whileHover="hover"
            >
              {/* Dark overlay for contrast */}
              <div className="absolute inset-0 bg-gradient-to-br from-background/60 to-background/40 pointer-events-none" />
              
              <h3 className="text-xs uppercase tracking-[0.15em] text-muted-foreground/40 mb-5 flex items-center gap-2 relative z-10">
                <span className="w-4 h-px bg-muted-foreground/15" />
                Not For
              </h3>
              
              <div className="space-y-3 relative z-10">
                {notFor.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariantsLeft}
                    className="flex items-center gap-3 group/item"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full border border-muted-foreground/10 flex items-center justify-center bg-background/50 group-hover/item:border-muted-foreground/20 transition-colors">
                      <X className="w-3 h-3 text-muted-foreground/30 group-hover/item:text-muted-foreground/50 transition-colors" />
                    </div>
                    <span className="text-muted-foreground/50 text-sm group-hover/item:text-muted-foreground/70 transition-colors duration-200 line-through decoration-muted-foreground/20">
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          {/* Built For - Right panel */}
          <motion.div 
            className="relative"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Animated border glow */}
            <motion.div 
              className="absolute -inset-px rounded-xl bg-gradient-to-r from-primary/40 via-primary/20 to-primary/40 opacity-60 blur-[1px]"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              style={{ backgroundSize: "200% 200%" }}
            />
            
            <motion.div 
              className="relative p-6 rounded-xl border border-primary/30 bg-primary/[0.08] overflow-hidden cursor-default"
              variants={cardVariants}
              initial="rest"
              whileHover="hover"
            >
              {/* Glowing gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/[0.05] to-transparent pointer-events-none" />
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
              
              <h3 className="text-xs uppercase tracking-[0.15em] text-primary/80 mb-5 flex items-center gap-2 relative z-10">
                <span className="w-4 h-px bg-primary/50" />
                Built For
              </h3>
              
              <div className="space-y-3 relative z-10">
                {isFor.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariantsRight}
                    className="flex items-center gap-3 group/item"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div 
                      className="flex-shrink-0 w-6 h-6 rounded-full border border-primary/25 flex items-center justify-center bg-primary/10 group-hover/item:bg-primary/15 group-hover/item:border-primary/40 transition-all"
                      whileHover={{ scale: 1.1, boxShadow: "0 0 12px hsl(var(--primary) / 0.4)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <Check className="w-3 h-3 text-primary/80 group-hover/item:text-primary transition-colors" />
                    </motion.div>
                    <span className="text-foreground/80 text-sm group-hover/item:text-foreground transition-colors duration-200">
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Compact closing statement */}
        <motion.p 
          className="text-center mt-8 text-muted-foreground/50 text-xs max-w-sm mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          If this distinction feels uncomfortable, this is not the right place.
        </motion.p>
      </div>
    </section>
  );
};

export default FilterSection;
