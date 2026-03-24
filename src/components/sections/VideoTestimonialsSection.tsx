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
      className="relative overflow-hidden"
      style={{ padding: 'clamp(64px, 10vw, 120px) 0' }}
    >
      <div className="container max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p
            className={`section-label text-center justify-center mb-3 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Partner Testimonials
          </p>
          <h2
            className={`font-serif mb-3 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ fontSize: '52px', color: 'var(--color-text)', lineHeight: '1.1', letterSpacing: '-0.01em' }}
          >
            {title}
          </h2>
          <p
            className={`font-serif italic max-w-md mx-auto transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ fontSize: '16px', color: 'var(--color-text-muted)', lineHeight: '1.3' }}
          >
            {subtitle}
          </p>
        </div>

        {/* 3-video grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {videoIds.map((videoId, index) => (
            <div
              key={videoId}
              className={`relative overflow-hidden aspect-[9/16] transition-all duration-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
                transitionDuration: '600ms',
                borderRadius: '2px',
                border: '1px solid var(--color-border)',
                background: 'var(--color-surface)',
              }}
            >
              <style>{getWistiaPlaceholderStyles(videoId, "177.78%")}</style>
              {/* @ts-ignore */}
              <wistia-player media-id={videoId} aspect="0.5625" autoplay="false" end-video-behavior="default"></wistia-player>
            </div>
          ))}
        </div>

        {/* Bridge quote */}
        <p
          className={`text-center font-serif italic mt-10 max-w-2xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: isVisible ? '500ms' : '0ms', fontSize: '18px', color: 'var(--color-text)', lineHeight: '1.75', opacity: 0.8 }}
        >
          "If a doctor asks who they should trust with their brand, this is the answer." <span className="text-primary not-italic" style={{ fontSize: '13px' }}><span className="text-primary">—</span> Dr. Brian Harris</span>
        </p>
      </div>
    </section>
  );
};

export default VideoTestimonialsSection;
