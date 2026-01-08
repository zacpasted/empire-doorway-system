import { motion } from "framer-motion";

const ProblemSolutionSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        {/* The Problem */}
        <motion.div 
          className="mb-20 md:mb-28"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-12 md:mb-16">
            The Problem
          </h2>
          
          <div className="space-y-8 text-lg md:text-xl text-muted-foreground leading-relaxed">
            <p className="text-foreground font-medium">
              Almost every dentist struggles with their brand.
              <br />
              <span className="text-muted-foreground font-normal">Most don't know what actually works.</span>
            </p>
            
            <p>
              Dentistry looks boring and sterile because no one was taught how to make it human.
              <br />
              Content feels awkward, time-consuming, and inconsistent — so it gets avoided or abandoned.
            </p>
            
            <p>
              <span className="text-foreground font-medium">Associates are told to wait until ownership to build a brand.</span>
              <br />
              That makes no sense.
            </p>
            
            <div className="space-y-2">
              <p>You're expected to be authentic, visible, and trusted — without ever being trained how.</p>
              <p>You don't know who to trust.</p>
              <p>The best are inaccessible or too expensive.</p>
              <p>Most vendors don't specialize, don't care, or don't last.</p>
            </div>
            
            <p className="text-foreground font-medium">
              Content is non-negotiable, yet it feels risky, draining, and unproductive.
            </p>
          </div>
        </motion.div>
        
        {/* Divider */}
        <div className="w-16 h-px bg-border mx-auto mb-20 md:mb-28" />
        
        {/* The Solution */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-12 md:mb-16">
            The Solution
          </h2>
          
          <div className="space-y-8 text-lg md:text-xl text-muted-foreground leading-relaxed">
            <p className="text-foreground font-medium text-xl md:text-2xl">
              Associate to Empire fixes this.
            </p>
            
            <p>
              We give ambitious dentists a simple, reliable system to build their brand before ownership — with clear direction, done-for-you structure, and content that actually compounds into opportunity and revenue.
            </p>
            
            <div className="space-y-2 text-foreground font-medium">
              <p>No guessing.</p>
              <p>No vendor roulette.</p>
              <p>No wasted time.</p>
            </div>
            
            <p className="text-muted-foreground italic">
              Built by the most successful premium international agency in aesthetic dentistry — now made accessible.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
