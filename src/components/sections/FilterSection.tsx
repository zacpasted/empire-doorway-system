import { useRef } from "react";
import { motion, useInView } from "framer-motion";
const FilterSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const notFor = [
    { text: "Practices looking for quick leads or cheap marketing", icon: "◇" },
    { text: "Dentists who want a vendor, not a strategic partner", icon: "◈" },
    { text: "Volume-first clinicians with no interest in cosmetic positioning", icon: "◆" },
    { text: "Those who confuse templates and shortcuts for brand building", icon: "◇" },
  ];
  const isFor = [
    { text: "Cosmetic dentists who want to be the undeniable authority in their city", icon: "△" },
    { text: "Doctors who understand that reputation compounds over time", icon: "▲" },
    { text: "Practitioners who want a growth system that reflects their clinical excellence", icon: "△" },
    { text: "Those committed to building something iconic — not just running ads", icon: "▲" },
  ];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const } }
  };
  const itemVariantsRight = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const } }
  };
  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">
            Selectivity
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            Not Everyone Gets In.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            We partner with a limited number of practices each year. Because access matters. Focus matters. Execution matters. This is built for those serious about operating at the highest level.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
