import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useWistiaLoader, getWistiaPlaceholderStyles } from "@/hooks/use-wistia";
import { ChevronDown } from "lucide-react";

interface CommunitySectionProps {
  videoIds?: string[];
  initialVisibleCount?: number; // Number of smaller videos to show initially (plus 1 main)
}

const CommunitySection = ({ 
  videoIds = [],
  initialVisibleCount = 3 // Show main + 3 smaller videos initially
}: CommunitySectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Main video is always shown, smaller videos are limited
  const mainVideoId = videoIds[0];
  const smallerVideoIds = videoIds.slice(1);
  const visibleSmallerIds = showAll ? smallerVideoIds : smallerVideoIds.slice(0, initialVisibleCount);
  const allVisibleIds = mainVideoId ? [mainVideoId, ...visibleSmallerIds] : visibleSmallerIds;
  const hiddenCount = smallerVideoIds.length - initialVisibleCount;
  const hasMore = hiddenCount > 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Use shared Wistia loader - only loads visible videos when section is visible
  useWistiaLoader(allVisibleIds, { loadOnMount: isVisible });

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
          {mainVideoId && (
            <motion.div
              className="lg:col-span-5 lg:row-span-2 relative aspect-[9/16] bg-card/50 rounded-2xl border border-border/30 overflow-hidden group"
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
              <style>{getWistiaPlaceholderStyles(mainVideoId, '177.78%')}</style>
              {/* @ts-ignore - Wistia custom element */}
              <wistia-player media-id={mainVideoId} aspect="0.5625" autoplay="false" end-video-behavior="default" style={{ height: '100%', width: '100%' }}></wistia-player>
            </motion.div>
          )}

          {/* Smaller Videos Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {visibleSmallerIds.map((videoId, index) => (
                <motion.div
                  key={videoId}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.08 }}
                  className="relative aspect-[9/16] bg-card/50 rounded-xl border border-border/30 overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                  <style>{getWistiaPlaceholderStyles(videoId, '177.78%')}</style>
                  {/* @ts-ignore - Wistia custom element */}
                  <wistia-player media-id={videoId} aspect="0.5625" autoplay="false" end-video-behavior="default" style={{ height: '100%', width: '100%' }}></wistia-player>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Show More Button */}
        {hasMore && !showAll && (
          <motion.div
            className="mt-10 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
          >
            <button
              onClick={() => setShowAll(true)}
              className="group flex items-center gap-3 px-8 py-4 rounded-full bg-card/50 border border-border/50 backdrop-blur-sm hover:bg-card/80 hover:border-primary/30 transition-all duration-300"
            >
              <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                Show {hiddenCount} More Videos
              </span>
              <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-y-0.5 transition-all" />
            </button>
          </motion.div>
        )}

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
