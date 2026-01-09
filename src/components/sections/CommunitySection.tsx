import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CommunitySectionProps {
  videoIds?: string[];
}

const CommunitySection = ({ videoIds = [] }: CommunitySectionProps) => {
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
    if (!isVisible || videoIds.length === 0) return;

    // Load Wistia player script
    const playerScript = document.createElement('script');
    playerScript.src = 'https://fast.wistia.com/player.js';
    playerScript.async = true;

    // Load embed scripts for each video
    const embedScripts = videoIds.map(id => {
      const script = document.createElement('script');
      script.src = `https://fast.wistia.com/embed/${id}.js`;
      script.async = true;
      script.type = 'module';
      return script;
    });

    document.head.appendChild(playerScript);
    embedScripts.forEach(script => document.head.appendChild(script));

    return () => {
      if (document.head.contains(playerScript)) {
        document.head.removeChild(playerScript);
      }
      embedScripts.forEach(script => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      });
    };
  }, [isVisible, videoIds]);

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
              <style>
                {`
                  wistia-player[media-id='${videoIds[0]}']:not(:defined) {
                    background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/${videoIds[0]}/swatch');
                    display: block;
                    filter: blur(5px);
                    height: 100%;
                    width: 100%;
                  }
                `}
              </style>
              {/* @ts-ignore - Wistia custom element */}
              <wistia-player 
                media-id={videoIds[0]} 
                aspect="0.5625"
                style={{ height: '100%', width: '100%' }}
              />
            </motion.div>
          )}

          {/* Smaller Videos Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-4">
            {videoIds.slice(1).map((videoId, index) => (
              <motion.div
                key={videoId}
                className="relative aspect-[9/16] bg-card/50 rounded-xl border border-border/30 overflow-hidden group"
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                
                <style>
                  {`
                    wistia-player[media-id='${videoId}']:not(:defined) {
                      background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/${videoId}/swatch');
                      display: block;
                      filter: blur(5px);
                      height: 100%;
                      width: 100%;
                    }
                  `}
                </style>
                {/* @ts-ignore - Wistia custom element */}
                <wistia-player 
                  media-id={videoId} 
                  aspect="0.5625"
                  style={{ height: '100%', width: '100%' }}
                />
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
