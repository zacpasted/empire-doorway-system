import { useRef } from "react";
import { motion, useInView } from "framer-motion";
const FilterSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2
  });
  const notFor = [{
    text: "Trend chasers looking for quick wins",
    icon: "◇"
  }, {
    text: "Practices seeking a vendor, not a partner",
    icon: "◈"
  }, {
    text: "Volume-first clinicians with no brand vision",
    icon: "◆"
  }, {
    text: "Those unwilling to invest in long-term positioning",
    icon: "◇"
  }];
  const isFor = [{
    text: "Ambitious aesthetics-focused practices ready to lead",
    icon: "△"
  }, {
    text: "Doctors who understand brand is the foundation of growth",
    icon: "▲"
  }, {
    text: "Practitioners who value taste, restraint, and authority",
    icon: "△"
  }, {
    text: "Those committed to a long-term strategic partnership",
    icon: "▲"
  }];
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -20
    },
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
    hidden: {
      opacity: 0,
      x: 20
    },
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
    <section ref={sectionRef} className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            The Gate
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            This isn't for everyone. That's the point.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Not For */}
          <motion.div 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h3 className="text-lg font-medium text-muted-foreground mb-6 text-center md:text-left">Not For</h3>
            {notFor.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-center gap-3 text-muted-foreground/80"
              >
                <span className="text-primary/60">{item.icon}</span>
                <span>{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Is For */}
          <motion.div 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h3 className="text-lg font-medium text-foreground mb-6 text-center md:text-left">Built For</h3>
            {isFor.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariantsRight}
                className="flex items-center gap-3 text-foreground"
              >
                <span className="text-primary">{item.icon}</span>
                <span>{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default FilterSection;