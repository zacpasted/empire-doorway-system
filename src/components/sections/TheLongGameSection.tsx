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

        {/* The Result - Enhanced Visual Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-32 relative"
        >
          {/* Ambient background glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent rounded-3xl" />
          <motion.div 
            className="absolute -inset-4 bg-primary/5 rounded-[2rem] blur-3xl"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <div className="relative border border-primary/20 rounded-2xl p-10 md:p-16 bg-background/80 backdrop-blur-md overflow-hidden">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-primary/30 rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-primary/30 rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-primary/30 rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-primary/30 rounded-br-2xl" />
            
            {/* Scanning line effect */}
            <motion.div
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
              animate={{ y: [0, 400, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-xs tracking-[0.4em] uppercase text-primary text-center mb-8"
            >
              The Result
            </motion.p>
            
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-3xl md:text-4xl lg:text-5xl font-display text-center text-foreground mb-10 max-w-4xl mx-auto leading-tight"
            >
              A brand that distinguishes you.
              <span className="block mt-2 text-primary/90">A system that delivers patients.</span>
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mb-12"
            >
              A team that understands your vision—and knows exactly how to realize it. 
              Because we've done this before. Many times.
            </motion.p>

            {/* Visual Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1 }}
              className="grid grid-cols-3 gap-6 md:gap-10 mb-12 max-w-3xl mx-auto"
            >
              {[
                { value: "100%", label: "Renewal Rate" },
                { value: "6+", label: "Months Average" },
                { value: "0", label: "Failed Investments" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                  className="text-center group"
                >
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <p className="text-4xl md:text-5xl lg:text-6xl font-display text-foreground relative">
                      {stat.value}
                    </p>
                  </motion.div>
                  <p className="text-xs md:text-sm tracking-wider uppercase text-muted-foreground mt-3">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* The Proof Statement */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 1.3 }}
              className="text-center pt-10 border-t border-primary/10 relative"
            >
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 -top-3 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center"
                animate={{ boxShadow: ["0 0 0 0 rgba(var(--primary), 0.2)", "0 0 0 12px rgba(var(--primary), 0)", "0 0 0 0 rgba(var(--primary), 0.2)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-2 h-2 rounded-full bg-primary" />
              </motion.div>
              
              <p className="text-foreground font-light text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
                Not a single A2E member has failed to renew past six months—
                <span className="font-semibold text-primary"> or to recoup their investment.</span>
              </p>
              <motion.p 
                className="text-muted-foreground/60 text-sm mt-6 italic"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                That's not a claim. It's a record.
              </motion.p>
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
