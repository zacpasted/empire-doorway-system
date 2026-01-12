import { useRef, useState, useEffect } from "react";
import { useWistiaLoader, getWistiaPlaceholderStyles } from "@/hooks/use-wistia";

interface WistiaVideoEmbedSectionProps {
  title?: string;
  subtitle?: string;
  videoIds?: string[]; // Array of Wistia media IDs to embed
}

const WistiaVideoEmbedSection = ({ 
  title = "See It In Action",
  subtitle = "Real examples from our work",
  videoIds = []
}: WistiaVideoEmbedSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '200px' } // Start loading earlier
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Use shared Wistia loader - only loads when visible
  useWistiaLoader(videoIds, { loadOnMount: isVisible });

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
            Examples
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

        {/* Video Grid / Carousel Area */}
        <div
          className={`transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {videoIds.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videoIds.map((videoId) => (
                <div
                  key={videoId}
                  className="relative rounded-xl overflow-hidden shadow-lg bg-card/50 aspect-[9/16]"
                >
                  <style>{getWistiaPlaceholderStyles(videoId, '177.78%')}</style>
                  {/* @ts-ignore - Wistia custom element */}
                  <wistia-player media-id={videoId} aspect="0.5625" autoplay="false" end-video-behavior="default"></wistia-player>
                </div>
              ))}
            </div>
          ) : (
            /* Placeholder state - empty slots for embedding */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="relative rounded-xl overflow-hidden bg-card/30 border-2 border-dashed border-border/30 aspect-[9/16] flex items-center justify-center"
                >
                  <div className="text-center p-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/20 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-muted-foreground/40"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
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
                    <p className="text-sm text-muted-foreground/50">
                      Wistia Video {index + 1}
                    </p>
                    <p className="text-xs text-muted-foreground/30 mt-1">
                      Ready to embed
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
