import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Target, Palette, Video, Rocket, Users, TrendingUp, Clock, CheckCircle2, Zap, Shield, Star, Play } from "lucide-react";

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activePhase, setActivePhase] = useState<number | null>(null);
  const [hoveredMetric, setHoveredMetric] = useState<number | null>(null);

  const scrollToShowcase = () => {
    const showcaseSection = document.getElementById('brands-showcase');
    if (showcaseSection) {
      showcaseSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const phases = [
    {
      number: "01",
      title: "Strategy",
      subtitle: "Understanding the doctor's ambitions, vision, and desired lifestyle",
      feeling: "Clarity",
      icon: Target,
      timeframe: "Week 1-2",
      stats: { metric: "100%", label: "Strategic clarity" },
      description: "Every engagement begins with understanding who you are and what you're building toward. We map your ambitions, vision, lifestyle goals, and market position before a single piece of content is created.",
      details: [
        "Deep-dive into your ambitions & desired lifestyle",
        "Market positioning & competitive landscape analysis",
        "Patient attraction strategy & ideal case profiling",
        "Business model alignment with personal vision"
      ],
      outcome: "You finally have a clear strategic foundation that informs every decision moving forward.",
      highlight: "This is where most practitioners finally understand why nothing worked before.",
      testimonial: {
        quote: "For the first time, I actually understood what I was building and why. The clarity was immediate.",
        name: "Dr. Drew Ballard",
        role: "Halo Veneers, TX"
      }
    },
    {
      number: "02",
      title: "Brand & Positioning",
      subtitle: "Defining the identity and narrative that attracts the right patients",
      feeling: "Confidence",
      icon: Palette,
      timeframe: "Week 2-4",
      stats: { metric: "360°", label: "Brand identity" },
      description: "We define your unique aesthetic lane, craft your narrative, and build a brand identity that separates you from every other practice in your market. This is not a logo exercise — it is the foundation of perception.",
      details: [
        "Unique positioning & aesthetic lane identification",
        "Brand narrative & messaging architecture",
        "Visual identity & tone of voice definition",
        "Competitive differentiation strategy"
      ],
      outcome: "Your brand stops being generic. You become the only option for the patients you actually want.",
      highlight: "Positioning is the single most underleveraged asset in aesthetic dentistry.",
      testimonial: {
        quote: "I used to blend in with every other cosmetic dentist. Now patients fly in specifically because of our brand.",
        name: "Dr. Michael Allen",
        role: "Celebrity Dentist, Tucson"
      }
    },
    {
      number: "03",
      title: "Content & Creative",
      subtitle: "Producing world-class content that reflects the quality of the practice",
      feeling: "Simplicity",
      icon: Video,
      timeframe: "Week 3-6",
      stats: { metric: "12+", label: "Monthly pieces" },
      description: "We script, film, edit, and produce content that matches the caliber of your clinical work. Every piece is crafted with intention — designed to build authority, not chase trends.",
      details: [
        "AI-assisted scripting shaped by strategy",
        "Professional editing & cinematic production",
        "Filming guidance or full videographer coordination",
        "Narrative sequencing & content cadence"
      ],
      outcome: "Your content becomes your most powerful asset — attracting the right patients before they ever call.",
      highlight: "Every piece is crafted, not mass-produced. Quality over quantity, always.",
      testimonial: {
        quote: "I film on Monday mornings before patients. 20 minutes, done for the week. It's become effortless.",
        name: "Dr. Beau Murphey",
        role: "Private Practice Owner, OK"
      }
    },
    {
      number: "04",
      title: "Distribution",
      subtitle: "Deploying organic content and paid media together to drive demand",
      feeling: "Momentum",
      icon: Rocket,
      timeframe: "Week 4+",
      stats: { metric: "3-5x", label: "ROI typical" },
      description: "Organic content builds authority. Paid media amplifies reach. We integrate both into one system — the same creative assets that build trust organically are strategically deployed in advertising to drive demand.",
      details: [
        "Strategic organic publishing & scheduling",
        "Paid media management & optimization",
        "Unified creative across organic and paid",
        "Audience targeting refined by brand positioning"
      ],
      outcome: "You are not guessing where patients come from. You are engineering demand.",
      highlight: "Ads on a strong brand convert 3-5x better than ads alone.",
      testimonial: {
        quote: "We waited until the brand was working to run ads. ROI was immediate because trust already existed.",
        name: "Dr. Brian Harris",
        role: "Practice Owner, LA"
      }
    },
    {
      number: "05",
      title: "Systems & Conversion",
      subtitle: "Optimizing the consultation experience and internal systems",
      feeling: "Trust",
      icon: Users,
      timeframe: "Ongoing",
      stats: { metric: "97%", label: "Client retention" },
      description: "Most agencies stop at lead generation. We continue into the practice itself — building conversion systems, consultation frameworks, patient communication workflows, and internal tools that turn attention into revenue.",
      details: [
        "Consultation process optimization",
        "Patient communication frameworks",
        "CRM systems & internal workflow design",
        "Conversion tracking & refinement"
      ],
      outcome: "Leads stop being wasted. Every touchpoint in the practice reinforces your brand.",
      highlight: "Brand is not just visual identity — it includes how patients experience you.",
      testimonial: {
        quote: "They know my brand better than I do. The team feels like an extension of my practice.",
        name: "Dr. Serena Wong",
        role: "Aesthetic Specialist, CA"
      }
    },
    {
      number: "06",
      title: "Growth & Expansion",
      subtitle: "Scaling the practice while maintaining brand authority",
      feeling: "Leverage",
      icon: TrendingUp,
      timeframe: "Month 6+",
      stats: { metric: "4-5yr", label: "Avg partnership" },
      description: "Once the system is working, we help you scale — new locations, new markets, new revenue streams — without diluting the brand that made you successful. Growth is earned, not forced.",
      details: [
        "Multi-location brand consistency",
        "New market expansion strategy",
        "Revenue stream diversification",
        "Strategic advisory & ongoing partnership"
      ],
      outcome: "This is how scale is done without dilution. Authority compounds over time.",
      highlight: "Our longest partnerships are 4-5+ years — because the relationship keeps producing results.",
      testimonial: {
        quote: "We've been with PASTED for over four years. Every quarter is better than the last.",
        name: "Dr. Alan Clarke",
        role: "Paste Dental, UK"
      }
    },
  ];

  // Journey map data
  const journeyStages = [
    { label: "Unknown", week: 0, icon: "○" },
    { label: "Defined", week: 2, icon: "◐" },
    { label: "Creating", week: 4, icon: "◑" },
    { label: "Growing", week: 8, icon: "◕" },
    { label: "Recognized", week: 12, icon: "●" },
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
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/20"
            style={{
              left: `${(i * 2.5) % 100}%`,
              top: `${(i * 5.7) % 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.5, 0.1],
              scale: [1, 1.8, 1],
            }}
            transition={{
              duration: 3 + (i % 4),
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
        
        {/* Connecting lines */}
        <svg className="absolute inset-0 w-full h-full opacity-30">
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
          <motion.line
            x1="75%" y1="65%" x2="90%" y2="75%"
            stroke="hsl(var(--primary))" strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
          />
        </svg>
      </div>

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full bg-primary/[0.03] blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-primary/[0.02] blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-xs tracking-[0.3em] uppercase text-primary">The Complete System</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-foreground mb-6">
            How Associate to Empire Works
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground font-light italic max-w-2xl mx-auto">
            From invisible to in demand—built properly, step by step
          </p>
        </motion.div>

        {/* Journey Progress Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16 md:mb-24"
        >
          <div className="relative max-w-4xl mx-auto">
            {/* Background track */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-border/20 rounded-full -translate-y-1/2" />
            
            {/* Animated progress fill */}
            <motion.div
              className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-primary via-primary to-primary/50 rounded-full -translate-y-1/2"
              initial={{ width: "0%" }}
              animate={isInView ? { width: "100%" } : {}}
              transition={{ duration: 2.5, ease: "easeOut", delay: 0.5 }}
            />
            
            {/* Journey stages */}
            <div className="relative flex justify-between items-center py-8">
              {journeyStages.map((stage, index) => (
                <motion.div
                  key={stage.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.15, duration: 0.5 }}
                  className="relative flex flex-col items-center"
                  onMouseEnter={() => setHoveredMetric(index)}
                  onMouseLeave={() => setHoveredMetric(null)}
                >
                  {/* Node */}
                  <motion.div
                    className={`relative w-12 h-12 md:w-14 md:h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 cursor-pointer ${
                      hoveredMetric === index 
                        ? "bg-primary border-primary scale-110" 
                        : "bg-card border-primary/30"
                    }`}
                    whileHover={{ scale: 1.15 }}
                  >
                    <span className={`text-lg md:text-xl transition-colors duration-300 ${
                      hoveredMetric === index ? "text-primary-foreground" : "text-primary"
                    }`}>
                      {stage.icon}
                    </span>
                    
                    {/* Pulse animation */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-primary/50"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    />
                  </motion.div>
                  
                  {/* Label */}
                  <div className="mt-3 text-center">
                    <p className={`text-xs md:text-sm font-medium transition-colors duration-300 ${
                      hoveredMetric === index ? "text-foreground" : "text-muted-foreground"
                    }`}>
                      {stage.label}
                    </p>
                    <p className="text-[10px] md:text-xs text-muted-foreground/60 mt-0.5">
                      Week {stage.week}
                    </p>
                  </div>
                  
                  {/* Tooltip on hover */}
                  <AnimatePresence>
                    {hoveredMetric === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute -bottom-16 md:-bottom-14 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-card border border-primary/30 shadow-lg whitespace-nowrap z-10"
                      >
                        <p className="text-xs text-foreground">
                          {index === 0 && "Where most practitioners start"}
                          {index === 1 && "Brand clarity established"}
                          {index === 2 && "Content system active"}
                          {index === 3 && "Momentum building"}
                          {index === 4 && "Authority established"}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Opening statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <p className="text-muted-foreground leading-relaxed text-lg">
            Associate to Empire is not a content subscription, an agency retainer, or a templated personal brand package. 
            It is a <span className="text-foreground font-medium">structured system</span> designed to take a dentist from uncertainty and inconsistency to clarity, authority, and demand.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <motion.div 
              className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-primary/40"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ originX: 0 }}
            />
            <motion.p 
              className="text-sm text-primary tracking-wide font-medium"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Brand first. Execution second. Scale last.
            </motion.p>
            <motion.div 
              className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-primary/40"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ originX: 1 }}
            />
          </div>
        </motion.div>

        {/* Key Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 max-w-4xl mx-auto"
        >
          {[
            { value: "45", label: "Day Build Phase", icon: Clock },
            { value: "6", label: "Phase System", icon: Shield },
            { value: "100%", label: "Done-For-You", icon: CheckCircle2 },
            { value: "24/7", label: "Team Access", icon: Users },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative p-5 rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm text-center group cursor-default overflow-hidden"
            >
              {/* Hover glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              
              <stat.icon className="w-5 h-5 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
              <p className="text-2xl md:text-3xl font-display text-foreground mb-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Phases with Timeline */}
        <div className="relative">
          {/* Vertical Timeline Line - Desktop */}
          <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-px">
            {/* Background track */}
            <div className="absolute inset-0 bg-border/20" />
            
            {/* Animated progress fill */}
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary via-primary to-primary/30"
              initial={{ height: "0%" }}
              animate={isInView ? { height: "100%" } : {}}
              transition={{ duration: 4, ease: "easeOut", delay: 0.5 }}
            />
            
            {/* Glowing orb that travels down */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/50"
              initial={{ top: "0%" }}
              animate={isInView ? { top: ["0%", "100%"] } : {}}
              transition={{ duration: 5, ease: "easeInOut", delay: 0.5 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-primary"
                animate={{ scale: [1, 2, 1], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6 lg:pl-20"
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
                  {/* Timeline Node - Desktop */}
                  <div className="hidden lg:flex absolute -left-20 top-8 items-center justify-center">
                    <motion.div
                      className={`relative w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                        isActive 
                          ? "bg-primary border-primary shadow-lg shadow-primary/30" 
                          : "bg-background border-primary/30"
                      }`}
                      whileHover={{ scale: 1.2 }}
                    >
                      <span className={`text-sm font-mono transition-colors duration-300 ${
                        isActive ? "text-primary-foreground" : "text-primary/60"
                      }`}>
                        {phase.number}
                      </span>
                      
                      {/* Pulse ring on hover */}
                      {isActive && (
                        <>
                          <motion.div
                            className="absolute inset-0 rounded-full border-2 border-primary"
                            animate={{ scale: [1, 1.8], opacity: [0.8, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                          <motion.div
                            className="absolute inset-0 rounded-full border border-primary"
                            animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                          />
                        </>
                      )}
                    </motion.div>
                    
                    {/* Connector line to card */}
                    <motion.div
                      className={`w-10 h-0.5 transition-colors duration-300 ${
                        isActive ? "bg-primary" : "bg-border/30"
                      }`}
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : {}}
                      transition={{ delay: 0.3 + index * 0.15 }}
                      style={{ originX: 0 }}
                    />
                  </div>

                  {/* Phase card */}
                  <motion.div 
                    className={`relative p-6 md:p-8 rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden ${
                      isActive 
                        ? "border-primary/50 bg-card/70 backdrop-blur-md shadow-xl shadow-primary/5" 
                        : "border-border/20 bg-card/20 hover:border-border/40"
                    }`}
                    whileHover={{ x: 5 }}
                  >
                    {/* Active glow */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Scanning line on hover */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
                        animate={{ y: [0, 300] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      />
                    )}

                    {/* Corner accents on active */}
                    {isActive && (
                      <>
                        <motion.div
                          className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/60 rounded-tl-2xl"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.div
                          className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/60 rounded-br-2xl"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        />
                      </>
                    )}

                    <div className="relative z-10">
                      {/* Header row */}
                      <div className="flex items-start gap-4 md:gap-6">
                        {/* Phase number & icon */}
                        <div className="flex-shrink-0">
                          <motion.div 
                            className={`relative w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center transition-all duration-300 ${
                              isActive ? "bg-primary/20" : "bg-card/50"
                            }`}
                            animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Icon className={`w-7 h-7 md:w-8 md:h-8 transition-colors duration-300 ${
                              isActive ? "text-primary" : "text-muted-foreground/60"
                            }`} />
                            <span className="absolute -top-2 -left-2 text-xs font-mono text-primary/60 lg:hidden">
                              {phase.number}
                            </span>
                            
                            {/* Pulsing ring on active */}
                            {isActive && (
                              <motion.div
                                className="absolute inset-0 rounded-xl border-2 border-primary/40"
                                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                            )}
                          </motion.div>
                        </div>

                        {/* Title & subtitle */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                            <h3 className={`text-lg md:text-xl font-serif transition-colors duration-300 ${
                              isActive ? "text-foreground" : "text-foreground/80"
                            }`}>
                              {phase.title}
                            </h3>
                            <span className={`px-3 py-1 text-[10px] tracking-[0.2em] uppercase rounded-full border transition-all duration-300 ${
                              isActive 
                                ? "bg-primary/10 border-primary/30 text-primary" 
                                : "bg-transparent border-border/30 text-muted-foreground/50"
                            }`}>
                              {phase.feeling}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground/60 italic mb-2">{phase.subtitle}</p>
                          
                          {/* Timeframe & Stats badges */}
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-background/50 border border-border/20 text-xs">
                              <Clock className="w-3 h-3 text-primary/70" />
                              <span className="text-muted-foreground">{phase.timeframe}</span>
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/5 border border-primary/20 text-xs">
                              <Star className="w-3 h-3 text-primary" />
                              <span className="text-foreground font-medium">{phase.stats.metric}</span>
                              <span className="text-muted-foreground">{phase.stats.label}</span>
                            </span>
                          </div>
                        </div>

                        {/* Expand indicator */}
                        <motion.div
                          animate={{ rotate: isActive ? 45 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0 mt-2"
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isActive ? "bg-primary/20" : "bg-transparent"
                          }`}>
                            <Play className={`w-4 h-4 transition-colors duration-300 ${
                              isActive ? "text-primary" : "text-muted-foreground/30"
                            }`} />
                          </div>
                        </motion.div>
                      </div>

                      {/* Expandable content */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="pt-6 md:pt-8 md:pl-22 lg:pl-26">
                              <p className="text-muted-foreground leading-relaxed mb-6 text-base">
                                {phase.description}
                              </p>

                              {/* Highlight callout */}
                              <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="mb-6 p-4 rounded-lg bg-primary/5 border-l-2 border-primary"
                              >
                                <p className="text-sm text-foreground/90 italic flex items-start gap-2">
                                  <Zap className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                  {phase.highlight}
                                </p>
                              </motion.div>

                              {/* Details grid */}
                              <div className="grid md:grid-cols-2 gap-3 mb-6">
                                {phase.details.map((detail, dIndex) => (
                                  <motion.div
                                    key={dIndex}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + dIndex * 0.08 }}
                                    className="flex items-start gap-3 p-3 rounded-lg bg-background/30 border border-border/10"
                                  >
                                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-foreground/80">{detail}</span>
                                  </motion.div>
                                ))}
                              </div>

                              {/* Testimonial */}
                              {phase.testimonial && (
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.35 }}
                                  className="p-5 rounded-xl bg-card/50 border border-border/30 mb-6"
                                >
                                  <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                      <span className="text-primary text-lg">"</span>
                                    </div>
                                    <div>
                                      <p className="text-foreground/90 italic text-sm leading-relaxed mb-3">
                                        "{phase.testimonial.quote}"
                                      </p>
                                      <div className="flex items-center gap-2">
                                        <span className="text-xs font-medium text-foreground">{phase.testimonial.name}</span>
                                        <span className="text-xs text-muted-foreground">•</span>
                                        <span className="text-xs text-muted-foreground">{phase.testimonial.role}</span>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              )}

                              {/* Outcome */}
                              <motion.div 
                                className="p-5 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                              >
                                <p className="text-xs uppercase tracking-wider text-primary/70 mb-2">The Outcome</p>
                                <p className="text-foreground/90 font-medium italic">
                                  "{phase.outcome}"
                                </p>
                              </motion.div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>

                  {/* Mobile connecting line between phases */}
                  {index < phases.length - 1 && (
                    <div className="flex justify-center py-3 lg:hidden">
                      <motion.div
                        className="w-0.5 h-8 bg-gradient-to-b from-primary/40 via-primary/20 to-transparent rounded-full"
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
        </div>

        {/* What This Creates - Summary */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-24 md:mt-32 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent rounded-3xl" />
          
          <div className="relative p-8 md:p-12 rounded-2xl border border-primary/30 bg-card/40 backdrop-blur-sm overflow-hidden">
            {/* Animated border glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.2), transparent)",
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 1.3, type: "spring" }}
                className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-6"
              >
                <Star className="w-8 h-8 text-primary" />
              </motion.div>
              
              <p className="text-xs tracking-[0.4em] uppercase text-primary/70 text-center mb-4">
                What This Ultimately Creates
              </p>
              
              <h3 className="text-2xl md:text-3xl font-serif text-center text-foreground mb-10">
                Associate to Empire gives you more than content.
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-10">
                {[
                  { text: "A brand that attracts instead of chases.", icon: Target },
                  { text: "Systems that remove friction instead of adding work.", icon: Zap },
                  { text: "Confidence rooted in clarity, not performance anxiety.", icon: Shield },
                  { text: "Access to a community, events, and opportunities that only open once the brand is built properly.", icon: Users }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 1.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-start gap-4 p-5 rounded-xl bg-background/50 border border-border/20 hover:border-primary/30 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-foreground/80 text-sm leading-relaxed pt-2">{item.text}</p>
                  </motion.div>
                ))}
              </div>

              <div className="text-center pt-8 border-t border-border/20">
                <p className="text-lg md:text-xl text-foreground font-light mb-3">
                  You don't just post more.
                </p>
                <motion.p
                  className="text-2xl md:text-3xl font-display text-primary"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  You stop being overlooked.
                </motion.p>
              </div>
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
          <motion.button
            onClick={scrollToShowcase}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-primary/30 bg-card/30 text-foreground hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-sm font-medium">See the work we create</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
