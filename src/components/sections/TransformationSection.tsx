import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const TransformationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const transformations = [
    { before: "Skilled", after: "Recognized" },
    { before: "Unknown", after: "Chosen" },
    { before: "Reactive", after: "In Control" },
    { before: "Hoping", after: "Inevitable" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 bg-background overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-primary/80 mb-4">The Shift</p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">
            45 Days From Now
          </h2>
        </motion.div>

        {/* Transformation Grid - Compact horizontal cards */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {transformations.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative bg-card/50 backdrop-blur-sm border border-border/30 rounded-lg p-4 md:p-5 overflow-hidden transition-all duration-500 hover:border-primary/30 hover:bg-card/80">
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Before state */}
                <div className="relative z-10 mb-3">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground/50 block mb-1">From</span>
                  <span className="text-muted-foreground/70 font-light text-lg line-through decoration-primary/40 decoration-1">
                    {item.before}
                  </span>
                </div>

                {/* Animated arrow */}
                <motion.div 
                  className="relative z-10 flex items-center gap-2 mb-3"
                  initial={{ x: 0 }}
                  animate={isInView ? { x: [0, 4, 0] } : {}}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    repeatDelay: 2,
                    delay: index * 0.2 
                  }}
                >
                  <ArrowRight className="w-4 h-4 text-primary/60" />
                  <div className="flex-1 h-px bg-gradient-to-r from-primary/40 to-transparent" />
                </motion.div>

                {/* After state */}
                <div className="relative z-10">
                  <span className="text-xs uppercase tracking-wider text-primary/60 block mb-1">To</span>
                  <span className="text-foreground font-semibold text-xl">
                    {item.after}
                  </span>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-8 h-8">
                  <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-primary/30 to-transparent" />
                  <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-primary/30 to-transparent" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom statement */}
        <motion.p 
          className="text-center text-muted-foreground/60 text-sm mt-10 tracking-wide"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          The work speaks. The calendar fills. The leverage compounds.
        </motion.p>
      </div>
    </section>
  );
};

export default TransformationSection;
