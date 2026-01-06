import { useEffect, useRef, useState } from "react";

const TheLongGameSection = () => {
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

  const trajectory = [
    { month: "Month 1–3", focus: "Foundation", description: "Identity, positioning, first content system" },
    { month: "Month 4–6", focus: "Momentum", description: "Consistency compounds, recognition builds" },
    { month: "Month 6+", focus: "Leverage", description: "Optionality emerges, amplification begins" },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-48 bg-card/30 relative overflow-hidden"
    >
      {/* Background trajectory line */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          className="w-full max-w-4xl h-48 opacity-[0.03]"
          viewBox="0 0 800 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 Q200,70 400,50 T800,10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-foreground"
          />
        </svg>
      </div>

      <div className="container max-w-4xl mx-auto px-4 relative z-10">
        {/* Section label */}
        <p
          className={`text-xs tracking-[0.4em] uppercase text-muted-foreground/60 text-center mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          The Trajectory
        </p>

        {/* Title */}
        <h2
          className={`text-2xl md:text-4xl font-serif text-center text-foreground mb-8 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          The Long Game
        </h2>

        {/* Subtitle */}
        <p
          className={`text-center text-muted-foreground mb-20 max-w-xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          This isn't about quick wins. It's about building something that compounds.
        </p>

        {/* Trajectory timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent hidden md:block" />

          <div className="grid md:grid-cols-3 gap-8 md:gap-4">
            {trajectory.map((phase, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${400 + index * 150}ms` }}
              >
                {/* Node */}
                <div className="relative mb-8 hidden md:flex justify-center">
                  <div className="w-4 h-4 rounded-full bg-background border-2 border-border/40" />
                </div>

                {/* Content */}
                <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground/50 mb-2">
                  {phase.month}
                </p>
                <h3 className="text-lg font-serif text-foreground mb-3">
                  {phase.focus}
                </h3>
                <p className="text-sm text-muted-foreground/70 leading-relaxed">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Key insights */}
        <div
          className={`mt-24 grid md:grid-cols-2 gap-8 pt-12 border-t border-border/10 transition-all duration-1000 delay-800 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground/50 mb-2">On Amplification</p>
            <p className="text-foreground/70 font-light">
              Ads scale what already works. They don't create meaning from scratch.
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground/50 mb-2">On Ownership</p>
            <p className="text-foreground/70 font-light">
              You own the direction. We build the vehicle.
            </p>
          </div>
        </div>

        {/* Emotional anchor */}
        <p
          className={`text-center mt-20 text-lg font-serif text-foreground/60 italic transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          "This grows with me."
        </p>
      </div>
    </section>
  );
};

export default TheLongGameSection;
