import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, FileText, Film, Video } from "lucide-react";

const services = [
  {
    icon: Sparkles,
    title: "Personal Brand Architecture",
    description: "Built by the best in the world",
    detail: "Your identity, positioning, and visual language—crafted by the team behind $100M+ in aesthetic case revenue."
  },
  {
    icon: FileText,
    title: "Done-For-You Scripting",
    description: "We write. You record.",
    detail: "Custom scripts designed for your voice, your audience, and your goals. No guesswork. No blank pages."
  },
  {
    icon: Film,
    title: "Done-For-You Editing",
    description: "Raw footage in. Polished content out.",
    detail: "Professional editing, captions, and formatting—optimized for every platform, every time."
  },
  {
    icon: Video,
    title: "Videography Management",
    description: "We source and manage it all",
    detail: "From finding local videographers to coordinating shoots—we handle the logistics so you can focus on dentistry."
  }
];

const WhatWeDoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-card/30 relative overflow-hidden">
      {/* Subtle background texture */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
      
      <div className="container max-w-6xl mx-auto px-4 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground/60 mb-4">
            The System
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-6">
            Everything. Done For You.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            We build the brand. Write the scripts. Edit the content. Even manage your videography.
            <span className="block mt-2 text-foreground font-medium">You just show up.</span>
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative"
            >
              <div className="relative p-8 md:p-10 bg-background/50 border border-border/50 rounded-sm overflow-hidden transition-all duration-500 hover:border-primary/20 hover:bg-background/80">
                {/* Corner accent */}
                <div className="absolute top-0 left-0 w-12 h-12 border-l border-t border-primary/20 rounded-tl-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-r border-b border-primary/20 rounded-br-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-sm bg-primary/5 border border-primary/10 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                    <service.icon className="w-5 h-5 text-primary/80" strokeWidth={1.5} />
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-xl md:text-2xl font-serif text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-sm uppercase tracking-widest text-primary/60 mb-4">
                  {service.description}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {service.detail}
                </p>
                
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-sm text-muted-foreground/50 tracking-wide mb-6">
            Your only job: <span className="text-foreground/70">15-30 minutes of raw footage per week.</span>
          </p>
          <a 
            href="#eligibility-form"
            className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium tracking-wide uppercase border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            See If You Qualify
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
