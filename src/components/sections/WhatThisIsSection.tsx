import { useEffect, useRef, useState } from "react";

const WhatThisIsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

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

  useEffect(() => {
    if (!isVisible) return;
    const intervals = transformations.map((_, i) => {
      return setTimeout(() => setActiveIndex(i), 400 + i * 300);
    });
    return () => intervals.forEach(clearTimeout);
  }, [isVisible]);

  const transformations = [
    {
      before: "Trained but invisible",
      after: "Recognized and chosen",
      icon: "◇",
    },
    {
      before: "Guessing what to post",
      after: "Strategic clarity",
      icon: "◈",
    },
    {
      before: "Vendor roulette",
      after: "Authored infrastructure",
      icon: "◆",
    },
    {
      before: "Competing on price",
      after: "Commanding premiums",
      icon: "✦",
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className={`absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl transition-all duration-[2000ms] ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
          }`}
        />
        <div 
          className={`absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-foreground/5 blur-3xl transition-all duration-[2000ms] delay-500 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
          }`}
        />
      </div>

      <div className="container relative z-10 max-w-6xl mx-auto px-4">
        {/* Header with animated reveal */}
        <div className="text-center mb-20">
          <p 
            className={`text-sm tracking-[0.3em] uppercase text-primary mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            What This Is
          </p>
          
          <h2 
            className={`text-4xl md:text-5xl lg:text-6xl font-serif text-foreground leading-tight max-w-4xl mx-auto transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            A <span className="relative inline-block">
              <span className="relative z-10">45-day</span>
              <span 
                className={`absolute inset-0 bg-primary/20 -skew-x-6 transition-transform duration-700 delay-700 origin-left ${
                  isVisible ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </span> system that transforms aesthetic dentists into{" "}
            <span className="text-primary">recognized authorities</span>.
          </h2>
        </div>

        {/* Transformation Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {transformations.map((item, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-700 ${
                activeIndex >= index 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative p-8 lg:p-10 border border-border/30 bg-card/5 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-primary/40 hover:bg-card/20">
                {/* Animated corner accent */}
                <div 
                  className={`absolute top-0 left-0 w-16 h-16 transition-all duration-500 ${
                    activeIndex >= index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-primary to-transparent" />
                  <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-primary to-transparent" />
                </div>
                
                {/* Icon */}
                <div className="mb-6 text-3xl text-primary/60 group-hover:text-primary transition-colors duration-300 group-hover:scale-110 transform">
                  {item.icon}
                </div>

                {/* Before/After Content */}
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex-1">
                    <p className="text-sm uppercase tracking-wider text-muted-foreground/50 mb-2">From</p>
                    <p className="text-lg text-muted-foreground line-through decoration-muted-foreground/30">
                      {item.before}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-6">
                  {/* Animated arrow */}
                  <div className="flex items-center gap-2">
                    <div 
                      className={`h-px bg-gradient-to-r from-muted-foreground/30 to-primary transition-all duration-700 ${
                        activeIndex >= index ? "w-12" : "w-0"
                      }`}
                    />
                    <div 
                      className={`text-primary transition-all duration-500 ${
                        activeIndex >= index ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                      }`}
                    >
                      →
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm uppercase tracking-wider text-primary/70 mb-2">To</p>
                    <p className="text-xl font-serif font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {item.after}
                    </p>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA hint */}
        <div 
          className={`mt-16 text-center transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-muted-foreground text-sm tracking-wide">
            Built by practitioners. Refined by results.
          </p>
          <div className="mt-6 flex justify-center">
            <div className="w-px h-16 bg-gradient-to-b from-primary/50 to-transparent animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatThisIsSection;
