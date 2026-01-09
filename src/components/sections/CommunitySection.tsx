import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CommunitySectionProps {
  videoIds?: string[];
}

const CommunitySection = ({ videoIds = ["", "", ""] }: CommunitySectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Load Wistia script if not already loaded
    if (!document.querySelector('script[src*="wistia"]')) {
      const script = document.createElement("script");
      script.src = "https://fast.wistia.com/assets/external/E-v1.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-32 bg-gradient-to-b from-background via-secondary/10 to-background overflow-hidden"
    >
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-6">
            The Network
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-foreground mb-6 leading-tight">
            More Than a Program.{" "}
            <span className="block mt-2">A Table Worth Sitting At.</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Associate to Empire™ is the gateway into a community shaping the future of dentistry.
          </p>
        </motion.div>

        {/* Video Grid - Main + Smaller Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          {/* Main Featured Video */}
          {videoIds[0] && (
            <motion.div
              className="lg:col-span-5 lg:row-span-2 relative aspect-[9/16] bg-card/50 rounded-2xl border border-border/30 overflow-hidden group"
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
              <div 
                className={`wistia_embed wistia_async_${videoIds[0]} seo=false videoFoam=true h-full w-full`}
                style={{ height: '100%', width: '100%' }}
              />
            </motion.div>
          )}

          {/* Smaller Videos Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-4">
            {videoIds.slice(1).map((videoId, index) => (
              <motion.div
                key={index}
                className="relative aspect-[9/16] bg-card/50 rounded-xl border border-border/30 overflow-hidden group"
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                
                {videoId ? (
                  <div 
                    className={`wistia_embed wistia_async_${videoId} seo=false videoFoam=true h-full w-full`}
                    style={{ height: '100%', width: '100%' }}
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/40">
                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-muted-foreground/20 flex items-center justify-center mb-3">
                      <svg 
                        className="w-6 h-6" 
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
                    <span className="text-xs tracking-wide uppercase">Video {index + 2}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom accent */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-sm text-muted-foreground/50 italic">
            Where elite practitioners gather. Where standards are set.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySection;
