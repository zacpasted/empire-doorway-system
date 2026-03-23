import { useRef, useState, useEffect } from "react";
import { useWistiaLoader, getWistiaPlaceholderStyles } from "@/hooks/use-wistia";

interface VideoTestimonialsSectionProps {
  videoIds?: string[];
  title?: string;
  subtitle?: string;
}

const VideoTestimonialsSection = ({
  videoIds = [],
  title = "Hear it directly.",
  subtitle = "Unscripted. From dentists who've been through it.",
}: VideoTestimonialsSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1, rootMargin: "200px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useWistiaLoader(videoIds, { loadOnMount: isVisible });

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-background relative overflow-hidden"
    >
      <div className="container max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p
            className={`text-xs tracking-[0.4em] uppercase text-muted-foreground/60 mb-3 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Partner Testimonials
          </p>
          <h2
            className={`text-2xl md:text-3xl font-serif text-foreground mb-3 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {title}
          </h2>
          <p
            className={`text-muted-foreground max-w-md mx-auto text-sm transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {subtitle}
          </p>
        </div>

        {/* 3-video grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-3 gap-5 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {videoIds.map((videoId) => (
            <div
              key={videoId}
              className="relative rounded-xl overflow-hidden shadow-lg bg-card/50 aspect-[9/16]"
            >
              <style>{getWistiaPlaceholderStyles(videoId, "177.78%")}</style>
              {/* @ts-ignore */}
              <wistia-player media-id={videoId} aspect="0.5625" autoplay="false" end-video-behavior="default"></wistia-player>
            </div>
          ))}
        </div>

        {/* Bridge quote */}
        <p
          className={`text-center text-lg md:text-xl font-serif italic text-foreground/80 mt-10 max-w-2xl mx-auto transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          "If a doctor asks who they should trust with their brand, this is the answer." <span className="text-primary not-italic text-sm">— Dr. Brian Harris</span>
        </p>
      </div>
    </section>
  );
};

export default VideoTestimonialsSection;
