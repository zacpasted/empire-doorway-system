import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const FilterSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const notFor = [
    { text: "Trend chasers", icon: "◇" },
    { text: "Loud marketers", icon: "◈" },
    { text: "Volume-first clinicians", icon: "◆" },
    { text: "Those who outsource responsibility", icon: "◇" },
  ];

  const isFor = [
    { text: "Dentists who feel overlooked despite merit", icon: "△" },
    { text: "Those ready to author their own position", icon: "▲" },
    { text: "Practitioners who value restraint over noise", icon: "△" },
    { text: "The ones who understand patience", icon: "▲" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const }
    },
  };

  const itemVariantsRight = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const }
    },
  };

  return (
    <section ref={sectionRef} className="py-32 md:py-48 bg-card/30 overflow-hidden relative">
      {/* Ambient background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={isInView ? { 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          } : {}}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-destructive/5 rounded-full blur-3xl"
          animate={isInView ? { 
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3]
          } : {}}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>

      <div className="container max-w-5xl mx-auto px-4 relative">
        {/* Animated border container */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Animated corner accents */}
          {[
            { pos: "-top-px -left-px", border: "border-t border-l", delay: 0.2 },
            { pos: "-top-px -right-px", border: "border-t border-r", delay: 0.3 },
            { pos: "-bottom-px -left-px", border: "border-b border-l", delay: 0.4 },
            { pos: "-bottom-px -right-px", border: "border-b border-r", delay: 0.5 },
          ].map((corner, i) => (
            <motion.div
              key={i}
              className={`absolute ${corner.pos} w-20 h-20 ${corner.border} border-primary/50`}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: corner.delay, ease: "easeOut" }}
            />
          ))}

          {/* Scanning line effect */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { 
              scaleX: [0, 1, 1, 0],
              opacity: [0, 1, 1, 0],
              top: ["0%", "0%", "100%", "100%"]
            } : {}}
            transition={{ duration: 3, delay: 0.8, ease: "easeInOut" }}
          />

          {/* Main container */}
          <div className="border border-border/30 p-10 md:p-16 lg:p-20 bg-gradient-to-br from-background via-background to-card/50 relative overflow-hidden">
            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-destructive/5 opacity-50" />
            
            <div className="relative">
              {/* Header */}
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="inline-flex items-center gap-4 mb-6">
                  <motion.div 
                    className="h-px bg-gradient-to-r from-transparent to-primary/50"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: 48 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  />
                  <motion.div
                    className="relative"
                    animate={isInView ? { 
                      boxShadow: ["0 0 0px hsl(var(--primary)/0)", "0 0 20px hsl(var(--primary)/0.3)", "0 0 0px hsl(var(--primary)/0)"]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <p className="text-sm tracking-[0.3em] uppercase text-primary font-medium px-4 py-2 border border-primary/30 bg-primary/5">
                      The Gate
                    </p>
                  </motion.div>
                  <motion.div 
                    className="h-px bg-gradient-to-l from-transparent to-primary/50"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: 48 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  />
                </div>
                <motion.p
                  className="text-muted-foreground/60 text-sm max-w-md mx-auto"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Not everyone is meant to work with us. This is intentional.
                </motion.p>
              </motion.div>
              
              <div className="grid md:grid-cols-2 gap-12 md:gap-8 lg:gap-16">
                {/* Not For */}
                <motion.div 
                  className="relative"
                  variants={containerVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  {/* Vertical accent line */}
                  <motion.div
                    className="absolute left-4 top-16 bottom-4 w-px bg-gradient-to-b from-destructive/30 via-destructive/10 to-transparent"
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : {}}
                    transition={{ duration: 1, delay: 0.5 }}
                    style={{ originY: 0 }}
                  />
                  
                  <div className="flex items-center gap-4 mb-10">
                    <motion.div 
                      className="w-10 h-10 rounded-full border border-destructive/40 flex items-center justify-center bg-destructive/5 relative overflow-hidden"
                      whileHover={{ scale: 1.1, borderColor: "hsl(var(--destructive)/0.6)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-destructive/20 to-transparent"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      />
                      <span className="text-destructive/80 text-lg font-light relative z-10">✕</span>
                    </motion.div>
                    <div>
                      <p className="text-lg text-muted-foreground font-medium">This is not for</p>
                      <p className="text-xs text-muted-foreground/50 tracking-wider uppercase">Filter out</p>
                    </div>
                  </div>
                  
                  <div className="space-y-5 pl-14">
                    {notFor.map((item, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="group cursor-default"
                      >
                        <motion.p 
                          className="text-foreground/40 flex items-center gap-3 transition-all duration-300 group-hover:text-foreground/60 group-hover:translate-x-2"
                          whileHover={{ color: "hsl(var(--foreground)/0.7)" }}
                        >
                          <span className="text-destructive/40 text-xs transition-colors group-hover:text-destructive/60">{item.icon}</span>
                          <span className="relative">
                            {item.text}
                            <motion.span
                              className="absolute bottom-0 left-0 h-px bg-destructive/30"
                              initial={{ width: 0 }}
                              whileHover={{ width: "100%" }}
                              transition={{ duration: 0.3 }}
                            />
                          </span>
                        </motion.p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                {/* Divider for mobile */}
                <div className="md:hidden h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
                
                {/* For */}
                <motion.div 
                  className="relative"
                  variants={containerVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  {/* Vertical accent line */}
                  <motion.div
                    className="absolute left-4 top-16 bottom-4 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent"
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : {}}
                    transition={{ duration: 1, delay: 0.6 }}
                    style={{ originY: 0 }}
                  />
                  
                  <div className="flex items-center gap-4 mb-10">
                    <motion.div 
                      className="w-10 h-10 rounded-full border border-primary/50 bg-primary/10 flex items-center justify-center relative overflow-hidden"
                      whileHover={{ scale: 1.1, borderColor: "hsl(var(--primary)/0.8)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      />
                      <span className="text-primary text-lg font-light relative z-10">✓</span>
                    </motion.div>
                    <div>
                      <p className="text-lg text-foreground font-medium">This is for</p>
                      <p className="text-xs text-primary/50 tracking-wider uppercase">Welcome in</p>
                    </div>
                  </div>
                  
                  <div className="space-y-5 pl-14">
                    {isFor.map((item, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariantsRight}
                        className="group cursor-default"
                      >
                        <motion.p 
                          className="text-primary/70 flex items-center gap-3 transition-all duration-300 group-hover:text-primary group-hover:translate-x-2"
                          whileHover={{ color: "hsl(var(--primary))" }}
                        >
                          <span className="text-primary/50 text-xs transition-colors group-hover:text-primary/80">{item.icon}</span>
                          <span className="relative">
                            {item.text}
                            <motion.span
                              className="absolute bottom-0 left-0 h-px bg-primary/50"
                              initial={{ width: 0 }}
                              whileHover={{ width: "100%" }}
                              transition={{ duration: 0.3 }}
                            />
                          </span>
                        </motion.p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
              
              {/* Bottom statement */}
              <motion.div 
                className="mt-16 pt-12 border-t border-border/20 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <motion.p 
                  className="text-muted-foreground/50 italic text-sm"
                  animate={isInView ? { 
                    opacity: [0.5, 0.7, 0.5]
                  } : {}}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  If this distinction feels uncomfortable, this is not the right place.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FilterSection;
