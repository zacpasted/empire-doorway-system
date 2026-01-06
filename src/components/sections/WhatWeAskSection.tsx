import { useEffect, useRef, useState } from "react";

const WhatWeAskSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const asks = [
    "Show up as you are — no performance required.",
    "Trust the process, even when it feels slow.",
    "Be honest about what you actually want.",
    "Stay consistent, not perfect.",
  ];

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-40 bg-card/20 relative"
    >
      <div className="container max-w-3xl mx-auto px-4">
        {/* Section label */}
        <p
          className={`text-xs tracking-[0.4em] uppercase text-muted-foreground/60 text-center mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          The Ask
        </p>

        {/* Title */}
        <h2
          className={`text-2xl md:text-4xl font-serif text-center text-foreground mb-16 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          What We Ask From You
        </h2>

        {/* Asks list */}
        <div className="space-y-6">
          {asks.map((ask, index) => (
            <div
              key={index}
              className={`flex items-start gap-6 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <span className="text-muted-foreground/30 text-sm mt-1">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-lg md:text-xl text-foreground/80 font-light leading-relaxed">
                {ask}
              </p>
            </div>
          ))}
        </div>

        {/* Disarming note */}
        <div
          className={`mt-16 pt-12 border-t border-border/10 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-center text-muted-foreground/60 text-sm leading-relaxed max-w-lg mx-auto">
            You don't need to be an influencer. You don't need to be extroverted. 
            You just need to be willing to be seen for who you actually are.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatWeAskSection;
