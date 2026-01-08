import { motion } from "framer-motion";

const TheLongGameSection = () => {
  const trajectory = [
    { month: "Month 1–3", focus: "Foundation", description: "Identity, positioning, first content system" },
    { month: "Month 4–6", focus: "Momentum", description: "Consistency compounds, recognition builds" },
    { month: "Month 6+", focus: "Leverage", description: "Optionality emerges, amplification begins" },
  ];

  return (
    <section className="py-32 md:py-48 bg-card/30 relative overflow-hidden">
      {/* Animated background lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.05 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <svg
            className="w-full max-w-5xl h-64"
            viewBox="0 0 1000 150"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0,120 C200,100 300,80 500,60 C700,40 800,20 1000,10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-foreground"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
      </div>

      <div className="container max-w-5xl mx-auto px-4 relative z-10">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-[0.4em] uppercase text-muted-foreground/60 text-center mb-6"
        >
          The Trajectory
        </motion.p>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl md:text-5xl font-serif text-center text-foreground mb-8"
        >
          The Long Game
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-muted-foreground mb-24 max-w-xl mx-auto text-lg"
        >
          This isn't about quick wins. It's about building something that compounds.
        </motion.p>

        {/* Trajectory timeline */}
        <div className="relative">
          {/* Animated connecting line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            className="absolute top-10 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent hidden md:block origin-left"
          />

          <div className="grid md:grid-cols-3 gap-12 md:gap-6">
            {trajectory.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 + index * 0.2 }}
                className="text-center group"
              >
                {/* Animated Node */}
                <div className="relative mb-10 hidden md:flex justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.2, type: "spring" }}
                    className="relative"
                  >
                    <div className="w-5 h-5 rounded-full bg-background border-2 border-primary/40 group-hover:border-primary/80 transition-colors duration-300" />
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1.5, opacity: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 1.5, 
                        delay: 0.7 + index * 0.2,
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                      className="absolute inset-0 rounded-full bg-primary/20"
                    />
                  </motion.div>
                </div>

                {/* Content */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                  className="text-xs tracking-[0.3em] uppercase text-primary/60 mb-3 font-medium"
                >
                  {phase.month}
                </motion.p>
                <h3 className="text-xl md:text-2xl font-serif text-foreground mb-4 group-hover:text-primary/90 transition-colors duration-300">
                  {phase.focus}
                </h3>
                <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-[200px] mx-auto">
                  {phase.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* The Result - New Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-32 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent rounded-3xl" />
          
          <div className="relative border border-border/20 rounded-2xl p-10 md:p-16 bg-background/50 backdrop-blur-sm">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-xs tracking-[0.4em] uppercase text-primary/60 text-center mb-6"
            >
              The Result
            </motion.p>
            
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-2xl md:text-3xl font-serif text-center text-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              A brand that distinguishes you. A system that delivers patients.
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-center text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10"
            >
              A team that understands your vision—and knows exactly how to realize it. 
              Because we've done this before. Many times.
            </motion.p>

            {/* The Proof Statement */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 1 }}
              className="text-center pt-8 border-t border-border/10"
            >
              <p className="text-foreground/80 font-light text-lg md:text-xl max-w-2xl mx-auto">
                Not a single A2E member has failed to renew past six months—
                <span className="font-medium text-foreground"> or to recoup their investment.</span>
              </p>
              <p className="text-muted-foreground/50 text-sm mt-4 italic">
                That's not a claim. It's a record.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Key insights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-24 grid md:grid-cols-2 gap-8 pt-12 border-t border-border/10"
        >
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center md:text-left"
          >
            <p className="text-sm text-muted-foreground/50 mb-2">On Amplification</p>
            <p className="text-foreground/70 font-light">
              Ads scale what already works. They don't create meaning from scratch.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center md:text-right"
          >
            <p className="text-sm text-muted-foreground/50 mb-2">On Ownership</p>
            <p className="text-foreground/70 font-light">
              You own the direction. We build the vehicle.
            </p>
          </motion.div>
        </motion.div>

        {/* Emotional anchor */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center mt-20 text-xl font-serif text-foreground/60 italic"
        >
          "This grows with me."
        </motion.p>
      </div>
    </section>
  );
};

export default TheLongGameSection;
