import { useEffect, useRef, useState } from "react";

const WhyPathsFailSection = () => {
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

  const paths = [
    {
      traditional: "Dental school",
      result: "Clinical skill, no visibility",
    },
    {
      traditional: "Continuing education",
      result: "More credentials, same obscurity",
    },
    {
      traditional: "Social media ads",
      result: "Noise without narrative",
    },
    {
      traditional: "Marketing agencies",
      result: "Commoditized templates",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-48 bg-card/30 relative"
    >
      <div className="container max-w-5xl mx-auto px-4">
        {/* Section label */}
        <p
          className={`text-xs tracking-[0.4em] uppercase text-muted-foreground/60 text-center mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          The Diagnosis
        </p>

        {/* Title */}
        <h2
          className={`text-2xl md:text-4xl font-serif text-center text-foreground mb-20 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Why Most Paths Break Down
        </h2>

        {/* Two-column contrast grid */}
        <div className="grid md:grid-cols-2 gap-px bg-border/20 rounded-lg overflow-hidden">
          {/* Left column header */}
          <div
            className={`bg-background/50 p-6 md:p-8 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground/50 mb-2">
              The Effort
            </p>
            <p className="text-lg font-serif text-foreground/70">
              What you've tried
            </p>
          </div>

          {/* Right column header */}
          <div
            className={`bg-background p-6 md:p-8 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground/50 mb-2">
              The Reality
            </p>
            <p className="text-lg font-serif text-foreground">
              What it produced
            </p>
          </div>

          {/* Path rows */}
          {paths.map((path, index) => (
            <>
              <div
                key={`traditional-${index}`}
                className={`bg-background/50 p-6 md:p-8 border-t border-border/10 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                <p className="text-muted-foreground/60 font-light">
                  {path.traditional}
                </p>
              </div>
              <div
                key={`result-${index}`}
                className={`bg-background p-6 md:p-8 border-t border-border/10 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                }`}
                style={{ transitionDelay: `${450 + index * 100}ms` }}
              >
                <p className="text-foreground/80">
                  {path.result}
                </p>
              </div>
            </>
          ))}
        </div>

        {/* Key insight */}
        <div
          className={`mt-16 text-center transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-lg md:text-xl font-serif text-foreground/70 italic">
            Effort ≠ Leverage
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyPathsFailSection;
