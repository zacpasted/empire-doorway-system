import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Sparkles, FileText, Film, Video, ChevronRight, Check } from "lucide-react";

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
    stat: "$100M+",
    statLabel: "Case revenue generated"
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
    stat: "40+",
    statLabel: "Scripts per quarter"
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
    stat: "8-12",
    statLabel: "Edited videos monthly"
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
    stat: "Zero",
    statLabel: "Logistics on your plate"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" as const }
  }
};

const featureVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.4 }
  })
};

const WhatWeDoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-28 md:py-40 bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <motion.div 
          className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/[0.03] rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/[0.03] rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)/0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)/0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20 md:mb-24"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs tracking-[0.2em] uppercase text-primary/80 font-medium">
              The System
            </span>
          </motion.div>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 tracking-tight">
            Everything.{" "}
            <span className="relative">
              Done For You.
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We build the brand. Write the scripts. Edit the content. Manage the videography.
            <motion.span 
              className="block mt-4 text-xl md:text-2xl text-foreground font-serif"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              You just show up and be yourself.
            </motion.span>
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
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
              className="group relative"
            >
              <div className="relative h-full p-8 md:p-10 bg-card/40 backdrop-blur-sm border border-border/40 rounded-xl overflow-hidden transition-all duration-700 hover:border-primary/30 hover:bg-card/60 hover:shadow-2xl hover:shadow-primary/5">
                {/* Animated corner accents */}
                <motion.div 
                  className="absolute top-0 left-0 w-16 h-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary/60 to-transparent" />
                  <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-primary/60 to-transparent" />
                </motion.div>
                <motion.div 
                  className="absolute bottom-0 right-0 w-16 h-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-primary/60 to-transparent" />
                  <div className="absolute bottom-0 right-0 h-full w-[1px] bg-gradient-to-t from-primary/60 to-transparent" />
                </motion.div>
                
                {/* Top row: Icon + Stat */}
                <div className="flex items-start justify-between mb-8">
                  <motion.div 
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 flex items-center justify-center shadow-lg shadow-primary/5"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <service.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </motion.div>
                  
                  <div className="text-right">
                    <div className="text-2xl md:text-3xl font-display text-foreground group-hover:text-primary transition-colors duration-300">
                      {service.stat}
                    </div>
                    <div className="text-xs text-muted-foreground/60 uppercase tracking-wider">
                      {service.statLabel}
                    </div>
                  </div>
                </div>
                
                {/* Title & Tagline */}
                <div className="mb-6">
                  <h3 className="text-xl md:text-2xl font-serif text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm uppercase tracking-[0.15em] text-primary/70 font-medium flex items-center gap-2">
                    <ChevronRight className="w-3 h-3" />
                    {service.tagline}
                  </p>
                </div>
                
                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {service.description}
                </p>
                
                {/* Features List */}
                <div className="space-y-3">
                  {service.features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      custom={i}
                      variants={featureVariants}
                      initial="hidden"
                      animate={hoveredIndex === index ? "visible" : "hidden"}
                      className="flex items-center gap-3 text-sm"
                    >
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" strokeWidth={2.5} />
                      </div>
                      <span className="text-muted-foreground/80">{feature}</span>
                    </motion.div>
                  ))}
                </div>
                
                {/* Hover gradient overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-primary/[0.02] pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Bottom glow */}
                <motion.div
                  className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-3/4 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 0.5 : 0 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Section */}
        <motion.div 
          className="mt-20 md:mt-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="inline-flex flex-col items-center gap-6 p-8 md:p-10 rounded-2xl bg-gradient-to-b from-card/60 to-card/30 border border-border/40 backdrop-blur-sm">
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-border" />
              <span className="text-sm tracking-wider uppercase">Your only commitment</span>
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-border" />
            </div>
            
            <p className="text-2xl md:text-3xl font-display text-foreground">
              15-30 minutes of raw footage
              <span className="text-primary"> per week</span>
            </p>
            
            <p className="text-sm text-muted-foreground/60 max-w-md">
              That's it. We handle everything else—strategy, production, posting, optimization. 
              You focus on what you do best: changing lives through dentistry.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
