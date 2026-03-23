import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWistiaLoader, getWistiaPlaceholderStyles } from "@/hooks/use-wistia";
import { ChevronDown, Play } from "lucide-react";

interface WistiaVideoEmbedSectionProps {
  title?: string;
  subtitle?: string;
  videoIds?: string[];
  initialVisibleCount?: number;
}

const WistiaVideoEmbedSection = ({ 
  title = "See It In Action",
  subtitle = "Real examples from our work",
  videoIds = [],
  initialVisibleCount = 3
}: WistiaVideoEmbedSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const visibleVideoIds = showAll ? videoIds : videoIds.slice(0, initialVisibleCount);
  const hiddenCount = videoIds.length - initialVisibleCount;
  const hasMore = hiddenCount > 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1, rootMargin: '200px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useWistiaLoader(visibleVideoIds, { loadOnMount: isVisible });

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-background relative overflow-hidden"
    >
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className={`text-xs tracking-[0.4em] uppercase text-muted-foreground/60 mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            The Creative
          </p>
          <h2
            className={`text-2xl md:text-4xl font-serif text-foreground mb-4 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {title}
          </h2>
          <p
            className={`text-muted-foreground max-w-xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {subtitle}
          </p>
        </div>

        {/* Video Grid */}
        <div
          className={`transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {videoIds.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {visibleVideoIds.map((videoId, index) => (
                    <motion.div
                      key={videoId}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="relative rounded-xl overflow-hidden shadow-lg bg-card/50 aspect-[9/16] group"
                    >
                      <style>{getWistiaPlaceholderStyles(videoId, '177.78%')}</style>
                      {/* @ts-ignore - Wistia custom element */}
                      <wistia-player media-id={videoId} aspect="0.5625" autoplay="false" end-video-behavior="default"></wistia-player>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Show More Button */}
              {hasMore && !showAll && (
                <motion.div
                  className="mt-10 flex justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <button
                    onClick={() => setShowAll(true)}
                    className="group flex items-center gap-3 px-8 py-4 rounded-full bg-card/50 border border-border/50 backdrop-blur-sm hover:bg-card/80 hover:border-primary/30 transition-all duration-300"
                  >
                    <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                      Show More Work →
                    </span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-y-0.5 transition-all" />
                  </button>
                </motion.div>
              )}
            </>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="relative rounded-xl overflow-hidden bg-card/30 border-2 border-dashed border-border/30 aspect-[9/16] flex items-center justify-center"
                >
                  <div className="text-center p-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/20 flex items-center justify-center">
                      <Play className="w-8 h-8 text-muted-foreground/40" />
                    </div>
                    <p className="text-sm text-muted-foreground/50">
                      Wistia Video {index + 1}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WistiaVideoEmbedSection;
