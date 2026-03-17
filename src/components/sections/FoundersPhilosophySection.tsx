import { useEffect, useRef, useState } from 'react';
import { useWistiaLoader, getWistiaPlaceholderStyles } from '@/hooks/use-wistia';

const FoundersPhilosophySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const mediaId = 'h2xbzknj3f';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1, rootMargin: '200px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useWistiaLoader(mediaId, { loadOnMount: isVisible });

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 
            className={`font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Getting Started Is the Hardest Part
          </h2>
          <p 
            className={`text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Your greatest competitive advantage is the most authentic version of your clinical philosophy and patient care. We help you build a brand around that truth.
          </p>
        </div>
        
        <div 
          className={`max-w-md mx-auto transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-border/50">
            <style>{getWistiaPlaceholderStyles(mediaId, '176.67%')}</style>
            {/* @ts-ignore - Wistia custom element */}
            <wistia-player 
              media-id={mediaId} 
              aspect="0.5660377358490566"
              autoplay="false"
              end-video-behavior="default"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundersPhilosophySection;