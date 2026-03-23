import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
const TransformationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const transformations = [
    { before: "Invisible", after: "Category Leader" },
    { before: "Price Shoppers", after: "High-Value Patients" },
    { before: "Fragmented Vendors", after: "One Strategic System" },
    { before: "Hoping for Growth", after: "Engineering Demand" },
    { before: "Harder Consultations", after: "Pre-Sold Patients" },
  ];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } }
  };
  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            The Shift
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            What 12 months inside the partnership changes — structurally, not just visually.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {transformations.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 text-center"
            >
              <span className="text-muted-foreground text-sm uppercase tracking-wider">{item.before}</span>
              <div className="my-4 flex justify-center">
                <ArrowRight className="h-5 w-5 text-primary" />
              </div>
              <span className="text-foreground font-display text-lg">{item.after}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
export default TransformationSection;
