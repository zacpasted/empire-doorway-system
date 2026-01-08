import { motion } from "framer-motion";
import { X, Check, ArrowRight } from "lucide-react";

const ProblemSolutionSection = () => {
  const problems = [
    "No one taught you how to make dentistry feel human",
    "Content feels awkward, time-consuming, inconsistent",
    "Told to wait until ownership to build a brand",
    "Don't know who to trust with your image",
    "Best agencies are inaccessible or too expensive",
  ];

  const solutions = [
    "Clear direction from day one",
    "Done-for-you content that compounds",
    "Build authority before ownership",
    "Trusted by the industry's top names",
    "Premium quality, now accessible",
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 relative">
          {/* The Problem */}
          <motion.div 
            className="relative p-8 md:p-10 rounded-2xl bg-card/30 border border-border/30"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-muted-foreground/20 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-muted-foreground/20 rounded-br-2xl" />
            
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-muted-foreground/10 flex items-center justify-center">
                <X className="w-4 h-4 text-muted-foreground" />
              </span>
              The Problem
            </h3>
            
            <ul className="space-y-4">
              {problems.map((problem, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3 text-muted-foreground"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <X className="w-4 h-4 text-muted-foreground/50 mt-1 flex-shrink-0" />
                  <span className="text-sm md:text-base leading-relaxed">{problem}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Animated Arrow Connector */}
          <motion.div 
            className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div 
              className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center backdrop-blur-sm"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight className="w-5 h-5 text-primary" />
            </motion.div>
          </motion.div>

          {/* The Solution */}
          <motion.div 
            className="relative p-8 md:p-10 rounded-2xl bg-gradient-to-br from-primary/5 via-card/50 to-card/30 border border-primary/20"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/30 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/30 rounded-br-2xl" />
            
            {/* Subtle glow */}
            <div className="absolute -inset-px bg-gradient-to-br from-primary/10 to-transparent rounded-2xl blur-xl opacity-50" />
            
            <div className="relative">
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary" />
                </span>
                The Solution
              </h3>
              
              <ul className="space-y-4">
                {solutions.map((solution, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3 text-foreground/90"
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                  >
                    <Check className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm md:text-base leading-relaxed">{solution}</span>
                  </motion.li>
                ))}
              </ul>
              
              <motion.p 
                className="mt-6 pt-6 border-t border-primary/20 text-sm text-muted-foreground italic"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Built by the most successful premium agency in aesthetic dentistry — now made accessible.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;