import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Sparkles, FileText, Film, Video, ChevronRight, Check, Zap, Target, TrendingUp, Clock } from "lucide-react";

const services = [
  {
    icon: Sparkles,
    title: "Personal Brand Architecture",
    tagline: "Built by the best in the world",
    description: "Your identity, positioning, and visual language—crafted by the team behind $100M+ in aesthetic case revenue.",
    features: [
      "Complete brand identity system",
      "Strategic positioning framework",
      "Visual language & guidelines",
      "Competitive differentiation strategy"
    ],
    stat: 100,
    statSuffix: "M+",
    statPrefix: "$",
    statLabel: "Case revenue generated",
    gradient: "from-amber-500/20 via-orange-500/10 to-red-500/5"
  },
  {
    icon: FileText,
    title: "Done-For-You Scripting",
    tagline: "We write. You record.",
    description: "Custom scripts designed for your voice, your audience, and your goals. No guesswork. No blank pages.",
    features: [
      "Personalized content strategy",
      "Hook-driven script frameworks",
      "Platform-specific optimization",
      "Voice & tone calibration"
    ],
    stat: 40,
    statSuffix: "+",
    statPrefix: "",
    statLabel: "Scripts per quarter",
    gradient: "from-blue-500/20 via-indigo-500/10 to-purple-500/5"
  },
  {
    icon: Film,
    title: "Done-For-You Editing",
    tagline: "Raw footage in. Polished content out.",
    description: "Professional editing, captions, and formatting—optimized for every platform, every time.",
    features: [
      "Cinematic color grading",
      "Dynamic captions & text",
      "Multi-platform formatting",
      "Thumbnail & cover design"
    ],
    stat: 12,
    statSuffix: "",
    statPrefix: "",
    statLabel: "Edited videos monthly",
    gradient: "from-emerald-500/20 via-teal-500/10 to-cyan-500/5"
  },
  {
    icon: Video,
    title: "Videography Management",
    tagline: "We source and manage it all",
    description: "From finding local videographers to coordinating shoots—we handle the logistics so you can focus on dentistry.",
    features: [
      "Vetted videographer network",
      "Shoot coordination & scheduling",
      "Equipment & quality standards",
      "Full production oversight"
    ],
    stat: 0,
    statSuffix: "",
    statPrefix: "",
    statLabel: "Logistics on your plate",
    isZero: true,
    gradient: "from-rose-500/20 via-pink-500/10 to-fuchsia-500/5"
  }
];

const highlights = [
  { icon: Zap, label: "Instant turnaround", value: "48-72hr" },
  { icon: Target, label: "Platform optimization", value: "5+" },
  { icon: TrendingUp, label: "Growth focused", value: "100%" },
  { icon: Clock, label: "Your time saved", value: "40+ hrs/mo" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.4
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 80, rotateX: 8 },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
  }
};

const featureVariants = {
  hidden: { opacity: 0, x: -20, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" as const }
  })
};

// Animated counter component
const AnimatedCounter = ({ value, prefix = "", suffix = "", isZero = false }: { value: number; prefix?: string; suffix?: string; isZero?: boolean }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    if (isZero) {
      setCount(0);
      return;
    }
    
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value, isZero]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{isZero ? "Zero" : count}{suffix}
    </span>
  );
};

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const WhatWeDoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section className="py-32 md:py-48 bg-background relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0">
        <FloatingParticles />
        
        {/* Multiple gradient orbs */}
        <motion.div 
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/[0.04] rounded-full blur-[100px]"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [-50, 50, -50],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[80px]"
          animate={{ 
            scale: [1.2, 1, 1.2],
            y: [-30, 30, -30],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/[0.02] to-transparent rounded-full"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Enhanced grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              radial-gradient(circle at center, hsl(var(--primary)/0.3) 1px, transparent 1px),
              linear-gradient(hsl(var(--primary)/0.1) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary)/0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px, 40px 40px, 40px 40px'
          }}
        />
        
        {/* Diagonal lines */}
        <div className="absolute inset-0 opacity-[0.015]">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute h-[1px] w-[200%] bg-gradient-to-r from-transparent via-primary to-transparent -rotate-45"
              style={{ top: `${i * 15}%`, left: '-50%' }}
            />
          ))}
        </div>
      </div>
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        {/* Enhanced Section Header */}
        <motion.div 
          className="text-center mb-24 md:mb-32"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 mb-10 backdrop-blur-sm"
          >
            <motion.span 
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs tracking-[0.25em] uppercase text-primary font-semibold">
              The Complete System
            </span>
            <motion.span 
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </motion.div>
          
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-10 tracking-tight">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="block"
            >
              Everything.
            </motion.span>
            <motion.span 
              className="relative inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <span className="bg-gradient-to-r from-foreground via-primary/80 to-foreground bg-clip-text text-transparent">
                Done For You.
              </span>
              <motion.span
                className="absolute -bottom-3 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.9 }}
              />
            </motion.span>
          </h2>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            We build the brand. Write the scripts. Edit the content. Manage the videography.
          </motion.p>
          <motion.p 
            className="mt-6 text-2xl md:text-3xl text-foreground font-serif"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9 }}
          >
            You just show up and{" "}
            <span className="relative">
              <span className="text-primary">be yourself.</span>
              <motion.span
                className="absolute -inset-2 bg-primary/10 rounded-lg -z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.1, duration: 0.4 }}
              />
            </span>
          </motion.p>
        </motion.div>

        {/* Quick stats bar */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {highlights.map((item, i) => (
            <motion.div
              key={item.label}
              className="relative p-4 md:p-5 rounded-xl bg-card/30 border border-border/30 backdrop-blur-sm text-center group hover:border-primary/30 transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <item.icon className="w-5 h-5 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-xl md:text-2xl font-display text-foreground mb-1">{item.value}</div>
              <div className="text-xs text-muted-foreground/70 uppercase tracking-wider">{item.label}</div>
              <motion.div
                className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Services Grid */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setActiveCard(activeCard === index ? null : index)}
              className="group relative cursor-pointer perspective-1000"
            >
              <div className={`
                relative h-full p-8 md:p-10 lg:p-12 
                bg-gradient-to-br from-card/60 via-card/40 to-card/20 
                backdrop-blur-md border border-border/50 rounded-2xl 
                overflow-hidden transition-all duration-700 
                hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10
                ${activeCard === index ? 'ring-2 ring-primary/50' : ''}
              `}>
                {/* Unique gradient overlay per card */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                
                {/* Animated scan line */}
                <motion.div
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                >
                  <motion.div
                    className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"
                    animate={hoveredIndex === index ? { y: ['-100%', '500%'] } : {}}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
                
                {/* Animated corner accents - more elaborate */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <>
                      <motion.div 
                        className="absolute top-0 left-0 w-24 h-24"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div 
                          className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-transparent"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.4 }}
                          style={{ transformOrigin: 'left' }}
                        />
                        <motion.div 
                          className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-primary to-transparent"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                          style={{ transformOrigin: 'top' }}
                        />
                      </motion.div>
                      <motion.div 
                        className="absolute bottom-0 right-0 w-24 h-24"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div 
                          className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-primary to-transparent"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.4 }}
                          style={{ transformOrigin: 'right' }}
                        />
                        <motion.div 
                          className="absolute bottom-0 right-0 h-full w-[2px] bg-gradient-to-t from-primary to-transparent"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                          style={{ transformOrigin: 'bottom' }}
                        />
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
                
                {/* Card number indicator */}
                <div className="absolute top-6 right-6 md:top-8 md:right-8">
                  <motion.div 
                    className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-medium text-primary/70"
                    whileHover={{ scale: 1.1, borderColor: 'hsl(var(--primary)/0.5)' }}
                  >
                    0{index + 1}
                  </motion.div>
                </div>
                
                {/* Top row: Icon */}
                <div className="mb-8 relative z-10">
                  <motion.div 
                    className="w-16 h-16 md:w-18 md:h-18 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/25 flex items-center justify-center shadow-xl shadow-primary/10 relative overflow-hidden"
                    whileHover={{ scale: 1.08, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <service.icon className="w-7 h-7 text-primary relative z-10" strokeWidth={1.5} />
                    <motion.div 
                      className="absolute inset-0 bg-primary/20"
                      animate={hoveredIndex === index ? { opacity: [0.2, 0.4, 0.2] } : { opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </motion.div>
                </div>
                
                {/* Title & Tagline */}
                <div className="mb-6 relative z-10">
                  <h3 className="text-2xl md:text-3xl font-serif text-foreground mb-3 group-hover:text-primary transition-colors duration-500">
                    {service.title}
                  </h3>
                  <p className="text-sm uppercase tracking-[0.2em] text-primary/80 font-semibold flex items-center gap-2">
                    <motion.span
                      animate={hoveredIndex === index ? { x: [0, 4, 0] } : {}}
                      transition={{ duration: 0.6, repeat: Infinity }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.span>
                    {service.tagline}
                  </p>
                </div>
                
                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-8 relative z-10 text-base md:text-lg">
                  {service.description}
                </p>
                
                {/* Animated Stat */}
                <motion.div 
                  className="mb-8 p-4 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-l-2 border-primary/50 relative z-10"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1, x: 5 }}
                >
                  <div className="text-3xl md:text-4xl font-display text-foreground group-hover:text-primary transition-colors duration-500">
                    <AnimatedCounter 
                      value={service.stat} 
                      prefix={service.statPrefix} 
                      suffix={service.statSuffix}
                      isZero={service.isZero}
                    />
                  </div>
                  <div className="text-sm text-muted-foreground/70 uppercase tracking-wider mt-1">
                    {service.statLabel}
                  </div>
                </motion.div>
                
                {/* Features List - Always visible but enhanced on hover */}
                <div className="space-y-3 relative z-10">
                  {service.features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      custom={i}
                      variants={featureVariants}
                      initial="hidden"
                      animate={hoveredIndex === index || activeCard === index ? "visible" : "hidden"}
                      className="flex items-center gap-4 text-sm md:text-base"
                    >
                      <motion.div 
                        className="w-6 h-6 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0"
                        whileHover={{ scale: 1.2 }}
                      >
                        <Check className="w-3.5 h-3.5 text-primary" strokeWidth={2.5} />
                      </motion.div>
                      <span className="text-foreground/80">{feature}</span>
                    </motion.div>
                  ))}
                </div>
                
                {/* Bottom glow effect */}
                <motion.div
                  className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-full h-48 bg-primary/30 rounded-full blur-[80px] pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 0.6 : 0 }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Bottom Section */}
        <motion.div 
          className="mt-24 md:mt-32"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div className="relative max-w-4xl mx-auto">
            {/* Decorative elements */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-primary/50" />
              <motion.div 
                className="w-3 h-3 rotate-45 border border-primary/50 bg-background"
                animate={{ rotate: [45, 225, 45] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-primary/50" />
            </div>
            
            <div className="text-center p-10 md:p-14 rounded-3xl bg-gradient-to-b from-card/70 via-card/50 to-card/30 border border-border/50 backdrop-blur-md relative overflow-hidden">
              {/* Background animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              
              <div className="relative z-10">
                <motion.div 
                  className="inline-flex items-center gap-3 text-muted-foreground mb-8"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-sm tracking-[0.2em] uppercase font-medium">Your only commitment</span>
                </motion.div>
                
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-display text-foreground mb-6">
                  15-30 minutes of raw footage
                  <motion.span 
                    className="text-primary block md:inline"
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {" "}per week
                  </motion.span>
                </h3>
                
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  That's it. We handle everything else—strategy, production, posting, optimization.{" "}
                  <span className="text-foreground font-medium">
                    You focus on what you do best: changing lives through dentistry.
                  </span>
                </p>
                
                {/* Visual time indicator */}
                <div className="mt-10 flex items-center justify-center gap-2">
                  {[...Array(7)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`h-2 rounded-full ${i === 0 ? 'w-8 bg-primary' : 'w-2 bg-border/50'}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 1.5 + i * 0.1 }}
                    />
                  ))}
                  <span className="ml-3 text-xs text-muted-foreground/60 uppercase tracking-wider">
                    1 of 7 days
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
