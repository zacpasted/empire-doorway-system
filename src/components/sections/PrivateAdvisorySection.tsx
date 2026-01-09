import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles, Globe, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PrivateAdvisorySectionProps {
  videoId?: string;
  onApplyClick?: () => void;
}

const PrivateAdvisorySection = ({ videoId, onApplyClick }: PrivateAdvisorySectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.2
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Load Wistia script if video is provided
    if (videoId && !document.querySelector('script[src*="wistia"]')) {
      const script = document.createElement("script");
      script.src = "https://fast.wistia.com/assets/external/E-v1.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [videoId]);

  const features = [
    {
      icon: Crown,
      label: "Bespoke Service"
    },
    {
      icon: Sparkles,
      label: "Elite Execution"
    },
    {
      icon: Globe,
      label: "Global Ambition"
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 md:py-40 bg-gradient-to-b from-background via-card/30 to-background relative overflow-hidden">
      {/* Subtle background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/[0.02] rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/[0.02] rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="container max-w-5xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
            Beyond Associate to Empire
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-foreground mb-6">
            Pasted Studio
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
            Our bespoke service level for the most ambitious practitioners in the world.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          className={`flex flex-wrap justify-center gap-8 md:gap-16 mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center gap-3 group"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-300">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground tracking-wide">{feature.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Video Container */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="relative aspect-video max-w-3xl mx-auto rounded-2xl border border-border/30 bg-card/50 overflow-hidden">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-primary/30 rounded-tl-2xl pointer-events-none z-10" />
            <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-primary/30 rounded-tr-2xl pointer-events-none z-10" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-primary/30 rounded-bl-2xl pointer-events-none z-10" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-primary/30 rounded-br-2xl pointer-events-none z-10" />

            {videoId ? (
              <div 
                className={`wistia_embed wistia_async_${videoId} seo=false videoFoam=true h-full w-full`}
                style={{ height: '100%', width: '100%' }}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/40">
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-muted-foreground/20 flex items-center justify-center mb-4">
                  <svg 
                    className="w-10 h-10" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" 
                    />
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                </div>
                <span className="text-sm tracking-wide uppercase">Video Coming Soon</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Button
            onClick={onApplyClick}
            size="lg"
            className="relative group px-8 py-6 text-base font-medium bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl overflow-hidden"
          >
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <span className="relative flex items-center gap-2">
              Inquire About Pasted Studio
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
          
          <p className="mt-6 text-sm text-muted-foreground/50 italic">
            Limited availability. By application only.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PrivateAdvisorySection;