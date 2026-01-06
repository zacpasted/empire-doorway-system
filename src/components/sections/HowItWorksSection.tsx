import { useEffect, useRef, useState } from "react";

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      number: "01",
      title: "Identity & Positioning",
      description: "Define what makes you singular. Ground your brand in truth, not trends.",
      feeling: "Clarity",
    },
    {
      number: "02",
      title: "Brand & Story",
      description: "Craft a narrative that resonates. Human-centered, cinematic, editorial.",
      feeling: "Recognition",
    },
    {
      number: "03",
      title: "Content System",
      description: "Build a repeatable, professional engine. Control without chaos.",
      feeling: "Consistency",
    },
    {
      number: "04",
      title: "Demand & Leverage",
      description: "Amplify what already works. Authority compounds into optionality.",
      feeling: "Choice",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-48 bg-background relative"
    >
      {/* Subtle vertical line */}
      <div className="absolute left-1/2 top-32 bottom-32 w-px bg-gradient-to-b from-transparent via-border/30 to-transparent hidden lg:block" />

      <div className="container max-w-6xl mx-auto px-4">
        {/* Section label */}
        <p
          className={`text-xs tracking-[0.4em] uppercase text-muted-foreground/60 text-center mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          The Infrastructure
        </p>

        {/* Title */}
        <h2
          className={`text-2xl md:text-4xl font-serif text-center text-foreground mb-24 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          How Associate to Empire Works
        </h2>

        {/* Steps - alternating layout */}
        <div className="space-y-16 md:space-y-24">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`grid md:grid-cols-2 gap-8 md:gap-16 items-center transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
            >
              {/* Left side - alternates position */}
              <div
                className={`${
                  index % 2 === 1 ? "md:order-2" : ""
                } text-center md:text-left ${
                  index % 2 === 1 ? "md:text-right" : ""
                }`}
              >
                <span className="text-6xl md:text-8xl font-serif text-foreground/[0.08] block mb-4">
                  {step.number}
                </span>
                <h3 className="text-xl md:text-2xl font-serif text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-md mx-auto md:mx-0 ${index % 2 === 1 ? 'md:ml-auto' : ''}">
                  {step.description}
                </p>
              </div>

              {/* Right side - feeling indicator */}
              <div
                className={`${
                  index % 2 === 1 ? "md:order-1" : ""
                } flex justify-center`}
              >
                <div className="relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-border/30 flex items-center justify-center">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-border/20 flex items-center justify-center">
                      <span className="text-sm tracking-[0.2em] uppercase text-muted-foreground/60">
                        {step.feeling}
                      </span>
                    </div>
                  </div>
                  {/* Connecting line to center */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-1/2 -bottom-16 md:-bottom-24 w-px h-16 md:h-24 bg-gradient-to-b from-border/30 to-transparent hidden md:block" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p
          className={`text-center mt-24 text-sm text-muted-foreground/50 transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Infrastructure, not conversion tricks.
        </p>
      </div>
    </section>
  );
};

export default HowItWorksSection;
