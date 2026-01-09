import { useEffect, useRef, useState } from 'react';

// Founders philosophy video section - Zac & Alan
const FoundersPhilosophySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
    if (!isVisible) return;

    // Load Wistia scripts
    const playerScript = document.createElement('script');
    playerScript.src = 'https://fast.wistia.com/player.js';
    playerScript.async = true;

    const embedScript = document.createElement('script');
    embedScript.src = 'https://fast.wistia.com/embed/h2xbzknj3f.js';
    embedScript.async = true;
    embedScript.type = 'module';

    document.head.appendChild(playerScript);
    document.head.appendChild(embedScript);

    return () => {
      if (document.head.contains(playerScript)) {
        document.head.removeChild(playerScript);
      }
      if (document.head.contains(embedScript)) {
        document.head.removeChild(embedScript);
      }
    };
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Subtle background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 
            className={`font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Why We Do This
          </h2>
          <p 
            className={`text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            A message from our founders on the philosophy behind everything we build.
          </p>
        </div>
        
        {/* Video Container - Vertical aspect ratio */}
        <div 
          className={`max-w-md mx-auto transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-border/50">
            <style>
              {`
                wistia-player[media-id='h2xbzknj3f']:not(:defined) {
                  background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/h2xbzknj3f/swatch');
                  display: block;
                  filter: blur(5px);
                  padding-top: 176.67%;
                }
              `}
            </style>
            {/* @ts-ignore - Wistia custom element */}
            <wistia-player 
              media-id="h2xbzknj3f" 
              aspect="0.5660377358490566"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundersPhilosophySection;
