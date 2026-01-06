import { useEffect, useRef, useState } from "react";

const FilterSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const notFor = [
    "Trend chasers",
    "Loud marketers",
    "Volume-first clinicians",
    "Those who outsource responsibility",
  ];

  const isFor = [
    "Dentists who feel overlooked despite merit",
    "Those ready to author their own position",
    "Practitioners who value restraint over noise",
    "The ones who understand patience",
  ];

  return (
    <section ref={sectionRef} className="py-32 md:py-48 bg-card/30 overflow-hidden">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Animated border container */}
        <div className="relative">
          {/* Decorative corner accents */}
          <div 
            className={`absolute -top-px -left-px w-16 h-16 border-t border-l border-primary/50 transition-all duration-1000 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          />
          <div 
            className={`absolute -top-px -right-px w-16 h-16 border-t border-r border-primary/50 transition-all duration-1000 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
            style={{ transitionDelay: "300ms" }}
          />
          <div 
            className={`absolute -bottom-px -left-px w-16 h-16 border-b border-l border-primary/50 transition-all duration-1000 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          />
          <div 
            className={`absolute -bottom-px -right-px w-16 h-16 border-b border-r border-primary/50 transition-all duration-1000 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
            style={{ transitionDelay: "500ms" }}
          />

          {/* Main container */}
          <div className="border border-border/30 p-12 md:p-20 bg-gradient-to-br from-background via-background to-card/50">
            {/* Subtle glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-50" />
            
            <div className="relative">
              {/* Header */}
              <div 
                className={`text-center mb-16 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <div className="inline-flex items-center gap-4 mb-4">
                  <div className={`h-px w-12 bg-gradient-to-r from-transparent to-primary/50 transition-all duration-1000 delay-300 ${
                    isVisible ? "opacity-100 w-12" : "opacity-0 w-0"
                  }`} />
                  <p className="text-sm tracking-[0.3em] uppercase text-primary">
                    The Gate
                  </p>
                  <div className={`h-px w-12 bg-gradient-to-l from-transparent to-primary/50 transition-all duration-1000 delay-300 ${
                    isVisible ? "opacity-100 w-12" : "opacity-0 w-0"
                  }`} />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12 md:gap-16">
                {/* Not For */}
                <div 
                  className={`transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                  }`}
                  style={{ transitionDelay: "400ms" }}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 rounded-full border border-destructive/30 flex items-center justify-center">
                      <span className="text-destructive/70 text-lg">✕</span>
                    </div>
                    <p className="text-lg text-muted-foreground">This is not for</p>
                  </div>
                  <div className="space-y-5 pl-11">
                    {notFor.map((item, index) => (
                      <p 
                        key={index}
                        className={`text-foreground/50 transition-all duration-500 hover:text-foreground/70 hover:translate-x-1 ${
                          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                        }`}
                        style={{ transitionDelay: `${500 + index * 100}ms` }}
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
                
                {/* For */}
                <div 
                  className={`transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                  }`}
                  style={{ transitionDelay: "400ms" }}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 rounded-full border border-primary/50 bg-primary/10 flex items-center justify-center">
                      <span className="text-primary text-lg">✓</span>
                    </div>
                    <p className="text-lg text-foreground">This is for</p>
                  </div>
                  <div className="space-y-5 pl-11">
                    {isFor.map((item, index) => (
                      <p 
                        key={index}
                        className={`text-primary/80 transition-all duration-500 hover:text-primary hover:translate-x-1 ${
                          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                        }`}
                        style={{ transitionDelay: `${500 + index * 100}ms` }}
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Bottom statement */}
              <div 
                className={`mt-16 pt-12 border-t border-border/20 text-center transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "900ms" }}
              >
                <p className="text-muted-foreground/60 italic text-sm">
                  If this distinction feels uncomfortable, this is not the right place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterSection;
