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
    "Record raw footage on your phone — we handle the rest.",
    "Show up as you are — no performance required.",
    "Trust the process, even when it feels slow.",
    "Stay consistent, not perfect.",
  ];

  const notRequired = [
    "No editing skills needed",
    "No posting or scheduling",
    "No caption writing",
    "No social media expertise",
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

        {/* Not required list */}
        <div
          className={`mt-16 pt-12 border-t border-border/10 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-center text-xs tracking-[0.3em] uppercase text-muted-foreground/40 mb-6">
            What You Don't Need
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {notRequired.map((item, index) => (
              <span
                key={index}
                className="px-4 py-2 text-sm text-muted-foreground/70 border border-border/20 bg-background/30"
              >
                {item}
              </span>
            ))}
          </div>
          <p className="text-center text-muted-foreground/60 text-sm leading-relaxed max-w-lg mx-auto mt-8">
            You don't need to be an influencer. You just need to record raw footage. 
            We handle editing, posting, and everything in between.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatWeAskSection;
