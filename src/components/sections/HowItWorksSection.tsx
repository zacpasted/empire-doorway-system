import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Target, Palette, Video, Rocket, Users, TrendingUp, Clock, CheckCircle2, Zap, Shield, Star, Sparkles, ArrowDown } from "lucide-react";

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activePhase, setActivePhase] = useState<number | null>(null);
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.9]);

  const scrollToShowcase = () => {
    const showcaseSection = document.getElementById('brands-showcase');
    if (showcaseSection) {
      showcaseSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const phases = [
    {
      number: "01",
      title: "Foundation & Direction",
      subtitle: "Before a single piece of content is created",
      feeling: "Clarity",
      icon: Target,
      timeframe: "Week 1-2",
      stats: { metric: "100%", label: "Strategic clarity" },
      color: "from-emerald-500/20 to-emerald-500/5",
      accentColor: "emerald",
      description: "The process begins with clarity. We work with you to define who you are, what you stand for, and how you should be perceived in the market.",
      details: [
        "Guided onboarding & deep strategic inputs",
        "Unique positioning & aesthetic lane identification",
        "Tone, ambitions & patient attraction strategy",
        "Clear brand foundation that informs every decision"
      ],
      outcome: "Content stops being random. Messaging stops being borrowed. You finally know what you're building.",
      highlight: "This is where most practitioners finally understand why nothing worked before.",
      testimonial: {
        quote: "For the first time, I actually understood what I was building and why. The clarity was immediate.",
        name: "Dr. Drew Ballard",
        role: "Halo Veneers, TX"
      }
    },
    {
      number: "02",
      title: "Strategy & Scripting",
      subtitle: "Once your brand direction is locked",
      feeling: "Confidence",
      icon: Palette,
      timeframe: "Week 2-3",
      stats: { metric: "40+", label: "Scripts created" },
      color: "from-violet-500/20 to-violet-500/5",
      accentColor: "violet",
      description: "We build the systems that make execution easy and repeatable. You are given access to AI-assisted scripting systems trained on high-performing content.",
      details: [
        "AI-assisted scripting shaped by strategy",
        "Hooks, story arcs & delivery guidance",
        "Scripts written for you or with you",
        "Room for your natural personality"
      ],
      outcome: "You are never left staring at a blank screen. This is where confidence begins to compound.",
      highlight: "Our scripting system has been trained on 500+ high-performing pieces of content.",
      testimonial: {
        quote: "I used to spend hours figuring out what to say. Now I just show up and the scripts are ready.",
        name: "Dr. Michael Allen",
        role: "Celebrity Dentist, Tucson"
      }
    },
    {
      number: "03",
      title: "Filming Made Easy",
      subtitle: "Self-filmed or fully supported",
      feeling: "Simplicity",
      icon: Video,
      timeframe: "Week 3-4",
      stats: { metric: "15min", label: "Weekly filming" },
      color: "from-amber-500/20 to-amber-500/5",
      accentColor: "amber",
      description: "Associate to Empire is designed to meet you where you are. Self-film with our guidance, or we coordinate vetted videographers.",
      details: [
        "Clear filming guidance & prompts",
        "Framing instructions & shoot structures",
        "Videographer sourcing & coordination",
        "In-person branding intensives (select clients)"
      ],
      outcome: "Easy capture, no friction, no wasted energy. Most clients are surprised how simple this becomes.",
      highlight: "Average filming time: 15-30 minutes per week. That's it.",
      testimonial: {
        quote: "I film on Monday mornings before patients. 20 minutes, done for the week. It's become effortless.",
        name: "Dr. Beau Murphey",
        role: "Private Practice Owner, OK"
      }
    },
    {
      number: "04",
      title: "Drop & Done-For-You",
      subtitle: "Once filmed, your job is effectively done",
      feeling: "Relief",
      icon: Rocket,
      timeframe: "Week 4+",
      stats: { metric: "12+", label: "Monthly pieces" },
      color: "from-rose-500/20 to-rose-500/5",
      accentColor: "rose",
      description: "Our team handles editing, refinement, formatting, and distribution. Everything is intentional, nothing is rushed.",
      details: [
        "Professional editing & final polish",
        "Strategic scheduling & publishing",
        "Narrative sequencing & cadence",
        "Audience psychology, not just posting"
      ],
      outcome: "You are not chasing trends. You are building authority.",
      highlight: "Every piece is crafted, not mass-produced. Quality over quantity, always.",
      testimonial: {
        quote: "I drop the footage and forget about it. A week later, content is live. It feels like magic.",
        name: "Dr. Alan Clarke",
        role: "Paste Dental, UK"
      }
    },
    {
      number: "05",
      title: "Relationship & Partnership",
      subtitle: "This is not transactional",
      feeling: "Trust",
      icon: Users,
      timeframe: "Ongoing",
      stats: { metric: "24/7", label: "Team access" },
      color: "from-sky-500/20 to-sky-500/5",
      accentColor: "sky",
      description: "We build real relationships with our clients. Ongoing access to the team, regular check-ins, and strategic feedback loops.",
      details: [
        "Ongoing team access & check-ins",
        "Messaging adjustments as you evolve",
        "Positioning refinement opportunities",
        "Strategic guidance beyond content"
      ],
      outcome: "This is why outcomes compound over time instead of plateauing.",
      highlight: "You're not a number. You're a partner in building something meaningful.",
      testimonial: {
        quote: "They know my brand better than I do. The team feels like an extension of my practice.",
        name: "Dr. Serena Wong",
        role: "Aesthetic Specialist, CA"
      }
    },
    {
      number: "06",
      title: "Scale (At the Right Time)",
      subtitle: "Advertising is not introduced on day one",
      feeling: "Leverage",
      icon: TrendingUp,
      timeframe: "Month 4+",
      stats: { metric: "3-5x", label: "ROI typical" },
      color: "from-primary/20 to-primary/5",
      accentColor: "primary",
      description: "Around month four, once your brand and organic presence are working, we offer paid media management.",
      details: [
        "Ads amplify what already resonates",
        "Efficient targeting (message is clear)",
        "Improved conversion (trust exists)",
        "Preferred rates for A2E members"
      ],
      outcome: "This is how scale is done without dilution.",
      highlight: "Ads on a strong brand convert 3-5x better than ads alone.",
      testimonial: {
        quote: "We waited until month 4 to run ads. Best decision we made—ROI was immediate.",
        name: "Dr. Brian Harris",
        role: "Practice Owner, LA"
      }
    },
  ];

  const journeyStages = [
    { label: "Unknown", week: 0, description: "Where most start" },
    { label: "Defined", week: 2, description: "Brand clarity" },
    { label: "Creating", week: 4, description: "System active" },
    { label: "Growing", week: 8, description: "Momentum" },
    { label: "Recognized", week: 12, description: "Authority" },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-48 bg-background relative overflow-hidden"
    >
      {/* Immersive Background System */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated grid */}
        <motion.div 
          className="absolute inset-0 opacity-[0.03]"
          style={{ y: backgroundY }}
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }} />
        </motion.div>
        
        {/* Floating orbs with parallax */}
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] rounded-full"
          style={{ 
            scale: orbScale,
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)'
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-[800px] h-[800px] rounded-full"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.03, 0.08, 0.03],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ 
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.05) 0%, transparent 60%)'
          }}
        />
        
        {/* Constellation dots */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{
              left: `${(i * 2.1 + 5) % 100}%`,
              top: `${(i * 3.7 + 10) % 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: i * 0.08,
            }}
          />
        ))}
        
        {/* Animated connection lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          {[
            { x1: "5%", y1: "15%", x2: "20%", y2: "25%" },
            { x1: "80%", y1: "10%", x2: "95%", y2: "20%" },
            { x1: "10%", y1: "80%", x2: "25%", y2: "90%" },
            { x1: "70%", y1: "75%", x2: "88%", y2: "85%" },
          ].map((line, i) => (
            <motion.line
              key={i}
              x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
              stroke="hsl(var(--primary))" strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 0], opacity: [0, 0.5, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
        </svg>
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Epic Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-20"
        >
          {/* Animated badge */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 mb-8 relative overflow-hidden"
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
              animate={{ x: ["-200%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <Sparkles className="w-4 h-4 text-primary relative z-10" />
            <span className="text-xs tracking-[0.3em] uppercase text-primary font-medium relative z-10">The Complete System</span>
          </motion.div>
          
          {/* Main headline with gradient text */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-foreground mb-6 leading-tight">
            How Associate to Empire
            <span className="block mt-2 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              Actually Works
            </span>
          </h2>
          
          {/* Subtitle with animated underline */}
          <div className="relative inline-block">
            <p className="text-xl md:text-2xl text-muted-foreground font-light italic">
              From invisible to in demand—built properly, step by step
            </p>
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Journey Progress Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-24 relative"
        >
          <div className="relative max-w-5xl mx-auto p-8 rounded-3xl border border-border/20 bg-card/20 backdrop-blur-sm overflow-hidden">
            {/* Background glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            {/* Progress track */}
            <div className="relative">
              <div className="absolute top-1/2 left-[5%] right-[5%] h-1 bg-border/10 rounded-full -translate-y-1/2" />
              
              {/* Animated progress fill */}
              <motion.div
                className="absolute top-1/2 left-[5%] h-1 rounded-full -translate-y-1/2 overflow-hidden"
                style={{ width: "90%" }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full"
                  initial={{ width: "0%" }}
                  animate={isInView ? { width: "100%" } : {}}
                  transition={{ duration: 2.5, ease: "easeOut", delay: 0.5 }}
                />
                {/* Glowing head */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50"
                  initial={{ left: "0%" }}
                  animate={isInView ? { left: "100%" } : {}}
                  transition={{ duration: 2.5, ease: "easeOut", delay: 0.5 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary"
                    animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.div>
              </motion.div>
              
              {/* Journey nodes */}
              <div className="relative flex justify-between items-center py-12">
                {journeyStages.map((stage, index) => (
                  <motion.div
                    key={stage.label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.6 + index * 0.12, duration: 0.5, type: "spring" }}
                    className="relative flex flex-col items-center group cursor-pointer"
                  >
                    {/* Node container */}
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {/* Outer ring */}
                      <motion.div
                        className="absolute -inset-2 rounded-full border border-primary/20 group-hover:border-primary/40 transition-colors duration-300"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      />
                      
                      {/* Main node */}
                      <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-card via-card to-background border-2 border-primary/30 group-hover:border-primary/60 flex items-center justify-center transition-all duration-300 shadow-lg group-hover:shadow-primary/20">
                        <span className="text-xl md:text-2xl font-display text-primary group-hover:scale-110 transition-transform duration-300">
                          {index + 1}
                        </span>
                      </div>
                      
                      {/* Pulse effect */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-primary/50"
                        animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
                      />
                    </motion.div>
                    
                    {/* Labels */}
                    <div className="mt-4 text-center">
                      <p className="text-sm md:text-base font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                        {stage.label}
                      </p>
                      <p className="text-[10px] md:text-xs text-muted-foreground mt-1">
                        Week {stage.week}
                      </p>
                    </div>
                    
                    {/* Hover tooltip */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-20 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-card border border-primary/30 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20"
                    >
                      <p className="text-xs text-foreground font-medium">{stage.description}</p>
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-card border-l border-t border-primary/30" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Stats - Immersive Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-24 max-w-5xl mx-auto"
        >
          {[
            { value: "45", label: "Day Build", sublabel: "Phase", icon: Clock, gradient: "from-emerald-500/20" },
            { value: "6", label: "Phase", sublabel: "System", icon: Shield, gradient: "from-violet-500/20" },
            { value: "100%", label: "Done-For", sublabel: "You", icon: CheckCircle2, gradient: "from-amber-500/20" },
            { value: "24/7", label: "Team", sublabel: "Access", icon: Users, gradient: "from-rose-500/20" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <div className="relative p-6 md:p-8 rounded-2xl border border-border/20 bg-card/30 backdrop-blur-sm overflow-hidden h-full">
                {/* Gradient background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                
                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), transparent)",
                    backgroundSize: "200% 100%",
                  }}
                  animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  <motion.div
                    className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <stat.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <p className="text-3xl md:text-4xl font-display text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className="text-xs text-muted-foreground/70 uppercase tracking-wider">
                    {stat.sublabel}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Opening Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Associate to Empire is not a content subscription, an agency retainer, or a templated personal brand package. 
            It is a <span className="text-foreground font-medium">structured system</span> designed to take a dentist from uncertainty and inconsistency to clarity, authority, and demand.
          </p>
          
          {/* Animated divider */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <motion.div 
              className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-primary/40"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              style={{ originX: 0 }}
            />
            <motion.div
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5"
              animate={{ boxShadow: ["0 0 0 0 hsl(var(--primary) / 0.2)", "0 0 20px 5px hsl(var(--primary) / 0.1)", "0 0 0 0 hsl(var(--primary) / 0.2)"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Brand first. Execution second. Scale last.</span>
            </motion.div>
            <motion.div 
              className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-primary/40"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              style={{ originX: 1 }}
            />
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="flex flex-col items-center mb-16"
        >
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Explore Each Phase</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="w-5 h-5 text-primary/60" />
          </motion.div>
        </motion.div>

        {/* Phase Cards - Premium Timeline */}
        <div className="relative">
          {/* Central timeline line - Desktop */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px">
            <div className="absolute inset-0 bg-border/10" />
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary via-primary/50 to-primary/20"
              initial={{ height: "0%" }}
              animate={isInView ? { height: "100%" } : {}}
              transition={{ duration: 4, ease: "easeOut", delay: 0.5 }}
            />
          </div>

          <div className="space-y-8 lg:space-y-16">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              const isExpanded = expandedPhase === index;
              const isHovered = activePhase === index;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-12 ${isEven ? '' : 'lg:direction-rtl'}`}
                  onMouseEnter={() => setActivePhase(index)}
                  onMouseLeave={() => setActivePhase(null)}
                  onClick={() => setExpandedPhase(isExpanded ? null : index)}
                >
                  {/* Timeline node - Center */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-8 z-20 items-center justify-center">
                    <motion.div
                      className={`relative w-16 h-16 rounded-2xl border-2 flex items-center justify-center transition-all duration-500 cursor-pointer ${
                        isHovered || isExpanded
                          ? "bg-primary border-primary shadow-lg shadow-primary/30" 
                          : "bg-card border-primary/30"
                      }`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Icon className={`w-7 h-7 transition-colors duration-300 ${
                        isHovered || isExpanded ? "text-primary-foreground" : "text-primary"
                      }`} />
                      
                      {/* Phase number badge */}
                      <div className={`absolute -top-2 -right-2 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono transition-all duration-300 ${
                        isHovered || isExpanded
                          ? "bg-foreground text-background"
                          : "bg-primary/20 text-primary"
                      }`}>
                        {phase.number}
                      </div>
                      
                      {/* Pulse rings */}
                      {(isHovered || isExpanded) && (
                        <>
                          <motion.div
                            className="absolute inset-0 rounded-2xl border-2 border-primary"
                            animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                          <motion.div
                            className="absolute inset-0 rounded-2xl border border-primary"
                            animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                          />
                        </>
                      )}
                    </motion.div>
                  </div>

                  {/* Content card */}
                  <div className={`${isEven ? 'lg:pr-16' : 'lg:pl-16 lg:col-start-2'}`}>
                    <motion.div 
                      className={`relative p-6 md:p-8 rounded-3xl border transition-all duration-500 cursor-pointer overflow-hidden ${
                        isHovered || isExpanded
                          ? "border-primary/40 bg-card/60 backdrop-blur-md shadow-2xl shadow-primary/5" 
                          : "border-border/20 bg-card/20 hover:border-border/40"
                      }`}
                      whileHover={{ x: isEven ? 5 : -5 }}
                      layout
                    >
                      {/* Background gradient */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${phase.color} opacity-0 transition-opacity duration-500`}
                        animate={{ opacity: isHovered || isExpanded ? 1 : 0 }}
                      />
                      
                      {/* Scanning line */}
                      {(isHovered || isExpanded) && (
                        <motion.div
                          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
                          animate={{ y: [0, 400] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                      )}
                      
                      {/* Corner accents */}
                      {(isHovered || isExpanded) && (
                        <>
                          <motion.div
                            className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-primary/60 rounded-tl-3xl"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                          />
                          <motion.div
                            className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-primary/60 rounded-br-3xl"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                          />
                        </>
                      )}

                      <div className="relative z-10">
                        {/* Mobile phase indicator */}
                        <div className="lg:hidden flex items-center gap-3 mb-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                            isHovered || isExpanded ? "bg-primary/20" : "bg-card/50"
                          }`}>
                            <Icon className={`w-6 h-6 ${isHovered || isExpanded ? "text-primary" : "text-muted-foreground"}`} />
                          </div>
                          <span className="text-xs font-mono text-primary/60">{phase.number}</span>
                        </div>

                        {/* Header */}
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                              <h3 className={`text-xl md:text-2xl font-serif transition-colors duration-300 ${
                                isHovered || isExpanded ? "text-foreground" : "text-foreground/80"
                              }`}>
                                {phase.title}
                              </h3>
                              <span className={`px-3 py-1 text-[10px] tracking-[0.2em] uppercase rounded-full border transition-all duration-300 ${
                                isHovered || isExpanded
                                  ? "bg-primary/10 border-primary/30 text-primary" 
                                  : "bg-transparent border-border/30 text-muted-foreground/50"
                              }`}>
                                {phase.feeling}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground/60 italic">{phase.subtitle}</p>
                          </div>
                          
                          {/* Stats badge */}
                          <div className={`px-4 py-2 rounded-xl border transition-all duration-300 ${
                            isHovered || isExpanded
                              ? "bg-primary/10 border-primary/30"
                              : "bg-card/50 border-border/20"
                          }`}>
                            <p className="text-2xl font-display text-primary mb-0.5">{phase.stats.metric}</p>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{phase.stats.label}</p>
                          </div>
                        </div>

                        {/* Timeframe badge */}
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background/50 border border-border/20 text-xs">
                            <Clock className="w-3 h-3 text-primary/70" />
                            <span className="text-muted-foreground">{phase.timeframe}</span>
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {phase.description}
                        </p>

                        {/* Expandable content */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              {/* Highlight callout */}
                              <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.15 }}
                                className="mb-6 p-4 rounded-xl bg-primary/5 border-l-2 border-primary"
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
                                    className="flex items-start gap-3 p-3 rounded-xl bg-background/30 border border-border/10 group/item hover:border-primary/20 transition-colors duration-300"
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
                                  className="p-5 rounded-2xl bg-card/50 border border-border/30 mb-6"
                                >
                                  <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                                      <span className="text-primary text-xl font-serif">"</span>
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
                                className="p-5 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                              >
                                <p className="text-xs uppercase tracking-wider text-primary/70 mb-2 flex items-center gap-2">
                                  <Star className="w-3 h-3" />
                                  The Outcome
                                </p>
                                <p className="text-foreground/90 font-medium">
                                  {phase.outcome}
                                </p>
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Expand indicator */}
                        <motion.div 
                          className="mt-4 flex items-center justify-center"
                          animate={{ opacity: isHovered ? 1 : 0.5 }}
                        >
                          <motion.div
                            className={`px-4 py-2 rounded-full text-xs transition-all duration-300 ${
                              isExpanded 
                                ? "bg-primary/10 text-primary"
                                : "bg-background/50 text-muted-foreground"
                            }`}
                            animate={{ scale: isHovered ? 1.05 : 1 }}
                          >
                            {isExpanded ? "Click to collapse" : "Click to expand"}
                          </motion.div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className={`hidden lg:block ${isEven ? 'lg:col-start-2' : 'lg:col-start-1 lg:row-start-1'}`} />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* What This Creates - Grand Summary */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="mt-32 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent rounded-3xl" />
          
          <div className="relative p-8 md:p-16 rounded-3xl border border-primary/30 bg-card/40 backdrop-blur-md overflow-hidden">
            {/* Animated border */}
            <motion.div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), transparent)",
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-primary/30 rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-primary/30 rounded-br-3xl" />
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center mx-auto mb-8"
              >
                <Sparkles className="w-10 h-10 text-primary" />
              </motion.div>
              
              <p className="text-xs tracking-[0.4em] uppercase text-primary/70 text-center mb-4">
                What This Ultimately Creates
              </p>
              
              <h3 className="text-3xl md:text-4xl font-serif text-center text-foreground mb-12">
                Associate to Empire gives you more than content.
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-12">
                {[
                  { text: "A brand that attracts instead of chases.", icon: Target },
                  { text: "Systems that remove friction instead of adding work.", icon: Zap },
                  { text: "Confidence rooted in clarity, not performance anxiety.", icon: Shield },
                  { text: "Access to opportunities that only open once the brand is built.", icon: Users }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 8 }}
                    className="flex items-start gap-4 p-6 rounded-2xl bg-background/50 border border-border/20 hover:border-primary/30 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-foreground/80 leading-relaxed pt-3">{item.text}</p>
                  </motion.div>
                ))}
              </div>

              <div className="text-center pt-10 border-t border-border/20">
                <p className="text-xl md:text-2xl text-foreground font-light mb-4">
                  You don't just post more.
                </p>
                <motion.p
                  className="text-3xl md:text-4xl font-display bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  You stop being overlooked.
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16"
        >
          <motion.button
            onClick={scrollToShowcase}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-primary/30 bg-card/30 text-foreground hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 group"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(var(--primary) / 0.2)" }}
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
