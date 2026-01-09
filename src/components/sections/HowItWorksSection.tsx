import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Target, Palette, Video, Rocket, Users, TrendingUp } from "lucide-react";

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activePhase, setActivePhase] = useState<number | null>(null);

  const scrollToShowcase = () => {
    const showcaseSection = document.getElementById('brands-showcase');
    if (showcaseSection) {
      showcaseSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const phases = [
    {
      number: "01",
      title: "Foundation, Identity & Direction",
      subtitle: "Before a single piece of content is created",
      feeling: "Clarity",
      icon: Target,
      description: "The process begins with clarity. We work with you to define who you are, what you stand for, and how you should be perceived in the market.",
      details: [
        "Guided onboarding & deep strategic inputs",
        "Unique positioning & aesthetic lane identification",
        "Tone, ambitions & patient attraction strategy",
        "Clear brand foundation that informs every decision"
      ],
      outcome: "Content stops being random. Messaging stops being borrowed. You finally know what you're building."
    },
    {
      number: "02",
      title: "Strategy, Systems & Scripting",
      subtitle: "Once your brand direction is locked",
      feeling: "Confidence",
      icon: Palette,
      description: "We build the systems that make execution easy and repeatable. You are given access to AI-assisted scripting systems trained on high-performing content and real-world conversion patterns.",
      details: [
        "AI-assisted scripting shaped by strategy",
        "Hooks, story arcs & delivery guidance",
        "Scripts written for you or with you",
        "Room for your natural personality"
      ],
      outcome: "You are never left staring at a blank screen. This is where confidence begins to compound."
    },
    {
      number: "03",
      title: "Filming Made Easy",
      subtitle: "Self-filmed or fully supported",
      feeling: "Simplicity",
      icon: Video,
      description: "Associate to Empire is designed to meet you where you are. Self-film with our guidance, or we coordinate vetted videographers in your area.",
      details: [
        "Clear filming guidance & prompts",
        "Framing instructions & shoot structures",
        "Videographer sourcing & coordination",
        "In-person branding intensives (select clients)"
      ],
      outcome: "Easy capture, no friction, no wasted energy. Most clients are surprised how simple this becomes."
    },
    {
      number: "04",
      title: "Shoot, Drop & Done-For-You",
      subtitle: "Once content is filmed, your job is effectively done",
      feeling: "Relief",
      icon: Rocket,
      description: "Our team handles editing, refinement, formatting, and distribution. Everything is intentional, nothing is rushed or overproduced.",
      details: [
        "Professional editing & final polish",
        "Strategic scheduling & publishing",
        "Narrative sequencing & cadence",
        "Audience psychology, not just posting frequency"
      ],
      outcome: "You are not chasing trends. You are building authority."
    },
    {
      number: "05",
      title: "Relationship & Partnership",
      subtitle: "This is not transactional",
      feeling: "Trust",
      icon: Users,
      description: "We build real relationships with our clients. Ongoing access to the team, regular check-ins, and strategic feedback loops.",
      details: [
        "Ongoing team access & check-ins",
        "Messaging adjustments as you evolve",
        "Positioning refinement as opportunities change",
        "Strategic guidance beyond content"
      ],
      outcome: "This is why outcomes compound over time instead of plateauing."
    },
    {
      number: "06",
      title: "Scale (At the Right Time)",
      subtitle: "Advertising is not introduced on day one",
      feeling: "Leverage",
      icon: TrendingUp,
      description: "Around month four, once your brand and organic presence are working, we offer paid media management at preferred rates.",
      details: [
        "Ads amplify what already resonates",
        "Efficient targeting (message is clear)",
        "Improved conversion (trust exists)",
        "Preferred rates for A2E members"
      ],
      outcome: "This is how scale is done without dilution."
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const phaseVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-48 bg-background relative overflow-hidden"
    >
      {/* Constellation background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/20"
            style={{
              left: `${(i * 3.3) % 100}%`,
              top: `${(i * 7.7) % 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
        
        {/* Connecting lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <motion.line
            x1="5%" y1="15%" x2="15%" y2="25%"
            stroke="hsl(var(--primary))" strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.line
            x1="85%" y1="20%" x2="95%" y2="30%"
            stroke="hsl(var(--primary))" strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1 }}
          />
          <motion.line
            x1="10%" y1="75%" x2="20%" y2="85%"
            stroke="hsl(var(--primary))" strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3.5, repeat: Infinity, repeatType: "reverse", delay: 2 }}
          />
        </svg>
      </div>

      {/* Animated gradient orb */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/[0.02] blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
            The Infrastructure
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-foreground mb-6">
            How Associate to Empire Works
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground font-light italic max-w-2xl mx-auto">
            From invisible to in demand—built properly, step by step
          </p>
        </motion.div>

        {/* Opening statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <p className="text-muted-foreground leading-relaxed">
            Associate to Empire is not a content subscription, an agency retainer, or a templated personal brand package. 
            It is a structured system designed to take a dentist from uncertainty and inconsistency to clarity, authority, and demand.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-primary/30" />
            <p className="text-sm text-primary tracking-wide">Brand first. Execution second. Scale last.</p>
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-primary/30" />
          </div>
        </motion.div>

        {/* Phases */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-6"
        >
          {phases.map((phase, index) => {
            const Icon = phase.icon;
            const isActive = activePhase === index;
            
            return (
              <motion.div
                key={index}
                variants={phaseVariants}
                className="relative"
                onMouseEnter={() => setActivePhase(index)}
                onMouseLeave={() => setActivePhase(null)}
              >
                {/* Phase card */}
                <div 
                  className={`relative p-6 md:p-8 rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden ${
                    isActive 
                      ? "border-primary/40 bg-card/60 backdrop-blur-md" 
                      : "border-border/20 bg-card/20 hover:border-border/40"
                  }`}
                >
                  {/* Active glow */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}

                  {/* Scanning line on hover */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
                      animate={{ y: [0, 200] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}

                  <div className="relative z-10">
                    {/* Header row */}
                    <div className="flex items-start gap-4 md:gap-6">
                      {/* Phase number & icon */}
                      <div className="flex-shrink-0">
                        <div className={`relative w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isActive ? "bg-primary/20" : "bg-card/50"
                        }`}>
                          <Icon className={`w-6 h-6 md:w-7 md:h-7 transition-colors duration-300 ${
                            isActive ? "text-primary" : "text-muted-foreground/60"
                          }`} />
                          <span className="absolute -top-2 -left-2 text-xs font-mono text-primary/60">
                            {phase.number}
                          </span>
                          
                          {/* Pulsing ring on active */}
                          {isActive && (
                            <motion.div
                              className="absolute inset-0 rounded-xl border border-primary/40"
                              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          )}
                        </div>
                      </div>

                      {/* Title & subtitle */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className={`text-lg md:text-xl font-serif transition-colors duration-300 ${
                            isActive ? "text-foreground" : "text-foreground/80"
                          }`}>
                            {phase.title}
                          </h3>
                          <span className={`hidden md:inline-block px-3 py-1 text-[10px] tracking-[0.2em] uppercase rounded-full border transition-all duration-300 ${
                            isActive 
                              ? "bg-primary/10 border-primary/30 text-primary" 
                              : "bg-transparent border-border/30 text-muted-foreground/50"
                          }`}>
                            {phase.feeling}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground/60 italic">{phase.subtitle}</p>
                      </div>

                      {/* Expand indicator */}
                      <motion.div
                        animate={{ rotate: isActive ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0 mt-2"
                      >
                        <ArrowRight className={`w-5 h-5 transition-colors duration-300 ${
                          isActive ? "text-primary" : "text-muted-foreground/30"
                        }`} />
                      </motion.div>
                    </div>

                    {/* Expandable content */}
                    <motion.div
                      initial={false}
                      animate={{ 
                        height: isActive ? "auto" : 0,
                        opacity: isActive ? 1 : 0 
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 md:pt-8 md:pl-20 lg:pl-22">
                        <p className="text-muted-foreground leading-relaxed mb-6">
                          {phase.description}
                        </p>

                        {/* Details grid */}
                        <div className="grid md:grid-cols-2 gap-3 mb-6">
                          {phase.details.map((detail, dIndex) => (
                            <motion.div
                              key={dIndex}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: dIndex * 0.1 }}
                              className="flex items-start gap-3"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 flex-shrink-0" />
                              <span className="text-sm text-foreground/70">{detail}</span>
                            </motion.div>
                          ))}
                        </div>

                        {/* Outcome */}
                        <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                          <p className="text-sm text-foreground/80 italic">
                            "{phase.outcome}"
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Connecting line between phases */}
                {index < phases.length - 1 && (
                  <div className="flex justify-center py-2">
                    <motion.div
                      className="w-px h-6 bg-gradient-to-b from-primary/30 to-transparent"
                      initial={{ scaleY: 0 }}
                      animate={isInView ? { scaleY: 1 } : {}}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* What This Creates - Summary */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20 md:mt-28 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent rounded-3xl" />
          
          <div className="relative p-8 md:p-12 rounded-2xl border border-primary/20 bg-card/30 backdrop-blur-sm">
            <p className="text-xs tracking-[0.4em] uppercase text-primary/60 text-center mb-6">
              What This Ultimately Creates
            </p>
            
            <h3 className="text-2xl md:text-3xl font-serif text-center text-foreground mb-8">
              Associate to Empire gives you more than content.
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-10">
              {[
                "A brand that attracts instead of chases.",
                "Systems that remove friction instead of adding work.",
                "Confidence rooted in clarity, not performance anxiety.",
                "Access to a community, events, and opportunities that only open once the brand is built properly."
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1.4 + index * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-lg bg-background/50"
                >
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-foreground/80 text-sm leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center pt-8 border-t border-border/10">
              <p className="text-lg md:text-xl text-foreground font-light">
                You don't just post more.
              </p>
              <motion.p
                className="text-xl md:text-2xl font-serif text-primary mt-2"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                You stop being overlooked.
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Bottom link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="text-center mt-12"
        >
          <button
            onClick={scrollToShowcase}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground/60 hover:text-foreground transition-colors group"
          >
            <span className="relative">
              See the work
              <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-foreground/40 group-hover:w-full transition-all duration-300" />
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;