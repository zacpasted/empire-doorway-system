import { motion } from "framer-motion";
import { X, TrendingDown, Zap, AlertTriangle } from "lucide-react";

const WhyPathsFailSection = () => {
  const paths = [
    {
      traditional: "Dental school",
      result: "Clinical skill, no visibility",
      icon: AlertTriangle,
      effort: "4+ years",
      outcome: "0% brand equity"
    },
    {
      traditional: "Continuing education",
      result: "More credentials, same obscurity",
      icon: TrendingDown,
      effort: "Ongoing investment",
      outcome: "No differentiation"
    },
    {
      traditional: "Social media ads",
      result: "Noise without narrative",
      icon: Zap,
      effort: "$$$$ spend",
      outcome: "Commoditized leads"
    },
    {
      traditional: "Marketing agencies",
      result: "Commoditized templates",
      icon: X,
      effort: "Monthly retainers",
      outcome: "Generic output"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        delay: 0.5
      }
    }
  };

  return (
    <section className="py-32 md:py-48 bg-card/30 relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-destructive/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <span className="inline-block px-4 py-1.5 text-xs tracking-[0.3em] uppercase text-destructive/80 bg-destructive/10 border border-destructive/20 rounded-full">
            The Diagnosis
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl font-serif text-center text-foreground mb-6"
        >
          Why Most Paths Break Down
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-muted-foreground max-w-2xl mx-auto mb-20"
        >
          The traditional playbook optimizes for effort, not leverage. 
          Here's why working harder doesn't work.
        </motion.p>

        {/* Diagnostic Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 gap-6 mb-16"
        >
          {paths.map((path, index) => {
            const Icon = path.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                className="group relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-xl p-8 overflow-hidden transition-colors hover:border-destructive/30"
              >
                {/* Danger glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                  <div className="absolute top-3 right-3 w-2 h-2 border-t border-r border-destructive/40" />
                </div>

                <div className="relative z-10">
                  {/* Icon and effort badge */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center justify-center group-hover:bg-destructive/20 transition-colors">
                      <Icon className="w-5 h-5 text-destructive/70" />
                    </div>
                    <span className="text-xs tracking-wider uppercase text-muted-foreground/50 bg-secondary/50 px-3 py-1 rounded-full">
                      {path.effort}
                    </span>
                  </div>

                  {/* Traditional path */}
                  <h3 className="text-xl font-serif text-foreground mb-3">
                    {path.traditional}
                  </h3>

                  {/* Animated strike-through line */}
                  <motion.div
                    variants={lineVariants}
                    className="h-px bg-gradient-to-r from-transparent via-destructive/50 to-transparent mb-4 origin-left"
                  />

                  {/* Result */}
                  <div className="flex items-center gap-3">
                    <X className="w-4 h-4 text-destructive/60 flex-shrink-0" />
                    <p className="text-muted-foreground">
                      {path.result}
                    </p>
                  </div>

                  {/* Outcome badge */}
                  <div className="mt-6 pt-4 border-t border-border/30">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground/50">Outcome:</span>
                      <span className="text-xs font-medium text-destructive/70">
                        {path.outcome}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom insight block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative"
        >
          <div className="relative bg-background/60 backdrop-blur-sm border border-border/30 rounded-2xl p-10 text-center overflow-hidden">
            {/* Animated border glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: "linear-gradient(90deg, transparent, hsl(var(--destructive) / 0.1), transparent)",
                backgroundSize: "200% 100%"
              }}
              animate={{
                backgroundPosition: ["200% 0%", "-200% 0%"]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative z-10">
              <motion.p
                className="text-2xl md:text-4xl font-serif text-foreground mb-4"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Effort ≠ Leverage
              </motion.p>
              <p className="text-muted-foreground max-w-lg mx-auto">
                The problem isn't that you haven't worked hard enough. 
                It's that the system was never designed to make you visible.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyPathsFailSection;
