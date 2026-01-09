import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { X, Check, Shield, Sparkles } from "lucide-react";

const FilterSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2
  });

  const notFor = [
    { text: "Trend chasers who want viral hacks", icon: X },
    { text: "Loud marketers chasing volume", icon: X },
    { text: "Those looking to outsource all responsibility", icon: X },
    { text: "Practitioners who won't invest in themselves", icon: X },
  ];

  const isFor = [
    { text: "Dentists who feel overlooked despite clinical merit", icon: Check },
    { text: "Those ready to author their own position in the market", icon: Check },
    { text: "Practitioners who value restraint and authenticity over noise", icon: Check },
    { text: "The ones who understand long-term compounding beats short-term wins", icon: Check },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  const itemVariantsRight = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  return (
    <section ref={sectionRef} className="py-32 md:py-40 bg-background relative overflow-hidden">
      {/* Cinematic background layers */}
      <div className="absolute inset-0">
        {/* Gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
        
        {/* Pulsing ambient glows */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/[0.02] blur-3xl"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-xs tracking-[0.3em] uppercase text-primary">The Gate</span>
          </motion.div>
          
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            This Isn't for Everyone
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground font-light italic max-w-2xl mx-auto">
            That's the point.
          </p>
        </motion.div>
        
        {/* Two columns with dramatic divide */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 relative">
            
            {/* Center divider - Desktop */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2">
              <motion.div 
                className="w-px h-full bg-gradient-to-b from-transparent via-border to-transparent"
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
              />
              
              {/* Animated scanning line */}
              <motion.div
                className="absolute left-0 w-8 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent -translate-x-1/2"
                animate={isInView ? { top: ["0%", "100%", "0%"] } : {}}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            
            {/* NOT FOR - Left Column */}
            <motion.div 
              className="relative lg:pr-12"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {/* Card container */}
              <div className="relative p-8 md:p-10 rounded-2xl border border-border/30 bg-card/20 backdrop-blur-sm overflow-hidden">
                {/* Subtle red glow on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-border/50 rounded-tl-2xl" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-border/50 rounded-br-2xl" />
                
                <div className="relative z-10">
                  <h3 className="text-sm tracking-[0.3em] uppercase text-muted-foreground/60 mb-8 flex items-center gap-3">
                    <X className="w-4 h-4" />
                    Not For
                  </h3>
                  
                  <div className="space-y-5">
                    {notFor.map((item, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="flex items-start gap-4 group"
                      >
                        <div className="w-8 h-8 rounded-full bg-muted/20 border border-border/30 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:border-muted-foreground/30 transition-colors">
                          <item.icon className="w-3.5 h-3.5 text-muted-foreground/50" />
                        </div>
                        <span className="text-muted-foreground/70 leading-relaxed text-base">
                          {item.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* IS FOR - Right Column */}
            <motion.div 
              className="relative lg:pl-12"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {/* Card container */}
              <div className="relative p-8 md:p-10 rounded-2xl border border-primary/20 bg-card/30 backdrop-blur-sm overflow-hidden group">
                {/* Ambient glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] via-primary/[0.03] to-transparent"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                
                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border border-primary/30"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                
                {/* Corner accents */}
                <motion.div 
                  className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/40 rounded-tl-2xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.8 }}
                />
                <motion.div 
                  className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/40 rounded-br-2xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1 }}
                />
                
                <div className="relative z-10">
                  <h3 className="text-sm tracking-[0.3em] uppercase text-primary mb-8 flex items-center gap-3">
                    <Sparkles className="w-4 h-4" />
                    Built For
                  </h3>
                  
                  <div className="space-y-5">
                    {isFor.map((item, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariantsRight}
                        className="flex items-start gap-4 group"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                          <item.icon className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="text-foreground leading-relaxed text-base">
                          {item.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Bottom exclusivity statement */}
          <motion.div 
            className="mt-16 md:mt-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div className="relative inline-block">
              {/* Pulsing glow behind text */}
              <motion.div
                className="absolute -inset-4 bg-primary/10 rounded-lg blur-xl"
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              <p className="relative text-lg md:text-xl text-muted-foreground font-light italic">
                If this distinction feels uncomfortable,{" "}
                <motion.span 
                  className="text-foreground font-medium"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  this is not the right place.
                </motion.span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FilterSection;
