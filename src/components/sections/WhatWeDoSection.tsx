import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Crown, Eye, Target, Settings, ChevronRight, Check, Zap, TrendingUp, Clock } from "lucide-react";

const services = [
  {
    icon: Crown,
    title: "Authority Engine",
    tagline: "Be seen as the cosmetic expert",
    description: "We position the practice so patients clearly see you as the cosmetic authority in your market. Through strategic storytelling, brand narrative, and identity work — we shape how the market perceives you and why patients choose you over anyone else.",
    features: [
      "Strategic positioning & competitive differentiation",
      "Brand narrative & storytelling architecture",
      "Visual identity aligned to cosmetic authority",
      "On-location brand shoots — we come to you"
    ],
    stat: 100,
    statSuffix: "M+",
    statPrefix: "$",
    statLabel: "Aesthetic revenue driven",
    gradient: "from-amber-500/20 via-orange-500/10 to-red-500/5"
  },
  {
    icon: Eye,
    title: "Visibility Engine",
    tagline: "30+ pieces of creative per month",
    description: "Full creative from the best teams in aesthetic dentistry — informed by the highest insider knowledge in the world, in real time. From cinematic on-location shoots to done-for-you scripting, editing, and publishing — 30+ assets per month — built on the same insider knowledge that powers the most recognised aesthetic brands in the world.",
    features: [
      "30+ creative assets per month — video, storytelling, ad content",
      "On-location production shoots — we fly to your practice",
      "Done-for-you scripting, editing & strategic publishing",
      "Full paid media management & ad creative from the same team"
    ],
    stat: 30,
    statSuffix: "+",
    statPrefix: "",
    statLabel: "Creative assets monthly",
    gradient: "from-blue-500/20 via-indigo-500/10 to-purple-500/5"
  },
  {
    icon: Target,
    title: "Patient Acquisition Engine",
    tagline: "Attract cosmetic patients, not price shoppers",
    description: "We build and manage high-performance ad campaigns designed specifically for cosmetic dentistry. Every dollar is engineered for qualified demand — not low-intent leads or price shoppers. Your ads run on content that already builds trust.",
    features: [
      "Full paid media strategy, build & management",
      "Cosmetic-specific ad creative & campaign architecture",
      "Lead quality scoring & filtering",
      "Revenue attribution & ROI tracking"
    ],
    stat: 50,
    statSuffix: "-100",
    statPrefix: "",
    statLabel: "Additional qualified cosmetic cases/year",
    gradient: "from-emerald-500/20 via-teal-500/10 to-cyan-500/5"
  },
  {
    icon: Settings,
    title: "Conversion Engine",
    tagline: "Turn inquiries into high-value accepted cases",
    description: "We rebuild the entire patient journey — from the first touchpoint to the consultation room — so every interaction reflects the quality of your clinical work.",
    features: [
      "Hospitality-driven consultation optimization",
      "Patient communication & storytelling frameworks",
      "CRM workflows & follow-up sequences",
      "Treatment presentation systems"
    ],
    stat: 0,
    statSuffix: "",
    statPrefix: "",
    statLabel: "Wasted leads",
    isZero: true,
    gradient: "from-rose-500/20 via-pink-500/10 to-fuchsia-500/5"
  }
];

const highlights = [
  { icon: Zap, label: "One unified system", value: "360°" },
  { icon: Target, label: "Cosmetic-focused", value: "100%" },
  { icon: TrendingUp, label: "Revenue target", value: "$500K-1M+" },
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
              The System
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
              One Unified System.
            </motion.span>
            <motion.span 
              className="relative inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <span className="bg-gradient-to-r from-foreground via-primary/80 to-foreground bg-clip-text text-transparent">
                Not Fragmented Vendors.
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
            Most practices grow through disconnected vendors — an agency for ads, a freelancer for content, a consultant for strategy — none of whom talk to each other.
          </motion.p>
          <motion.p 
            className="mt-6 text-2xl md:text-3xl text-foreground font-serif"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9 }}
          >
            PASTED replaces that fragmentation with{" "}
            <span className="relative">
              <span className="text-primary">one in-house system, coordinated around a single goal: high-value, predictable aesthetic growth.</span>
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
                
                {/* Animated corner accents */}
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
                <motion.div
                  className="absolute top-6 right-6 text-6xl md:text-7xl font-display text-foreground/[0.03] select-none"
                  animate={hoveredIndex === index ? { opacity: 0.08, scale: 1.1 } : { opacity: 0.03, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {String(index + 1).padStart(2, '0')}
                </motion.div>
                
                <div className="relative z-10">
                  {/* Icon and title */}
                  <div className="flex items-start gap-4 mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:border-primary/40 transition-colors duration-500"
                    >
                      <service.icon className="w-7 h-7 text-primary" />
                    </motion.div>
                    <div>
                      <h3 className="font-display text-2xl md:text-3xl text-foreground group-hover:text-foreground transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-primary/80 text-sm mt-1 font-medium tracking-wide">
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed mb-8 text-base">
                    {service.description}
                  </p>

                  {/* Features list */}
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        custom={i}
                        variants={featureVariants}
                        className="flex items-center gap-3 text-sm group/feature"
                      >
                        <motion.div
                          className="w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover/feature:bg-primary/20 transition-colors"
                          whileHover={{ scale: 1.2 }}
                        >
                          <Check className="w-3 h-3 text-primary" />
                        </motion.div>
                        <span className="text-foreground/70 group-hover/feature:text-foreground transition-colors">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Stat */}
                  <div className="pt-6 border-t border-border/30">
                    <div className="flex items-end gap-2">
                      <span className="text-3xl md:text-4xl font-display text-foreground">
                        <AnimatedCounter 
                          value={service.stat} 
                          prefix={service.statPrefix} 
                          suffix={service.statSuffix}
                          isZero={service.isZero}
                        />
                      </span>
                      <span className="text-sm text-muted-foreground/70 mb-1 ml-1">{service.statLabel}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Revenue framing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <div className="max-w-3xl mx-auto p-8 md:p-12 border border-border/30 bg-card/20 rounded-2xl">
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-6">The Revenue Math</p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-4">
              Most cosmetic cases range from <span className="text-foreground font-medium">$6K–$20K+</span>.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              Adding <span className="text-foreground font-medium">50–100 additional cosmetic cases per year</span> creates{" "}
              <span className="text-primary font-serif text-2xl md:text-3xl">$500K–$1M+</span> in additional revenue.
            </p>
            <p className="text-muted-foreground/70">
              PASTED Partnership is designed to help practices move toward that outcome through a coordinated, unified system.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
