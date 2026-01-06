import { useEffect, useRef, useState } from "react";

const TransformationSection = () => {
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

  const transformations = [
    { before: "Skilled", after: "Recognized" },
    { before: "Unknown", after: "Chosen" },
    { before: "Reactive", after: "In control" },
    { before: "Hoping", after: "Inevitable" },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-48 bg-background relative"
    >
      <div className="container max-w-4xl mx-auto px-4">
        {/* Section label */}
        <p
          className={`text-xs tracking-[0.4em] uppercase text-muted-foreground/60 text-center mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          The Shift
        </p>

        {/* Transformation pairs */}
        <div className="space-y-12 md:space-y-16">
          {transformations.map((item, index) => (
            <div
              key={index}
              className={`flex items-center justify-center gap-8 md:gap-16 transition-all duration-1000 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              {/* Before */}
              <div className="flex-1 text-right">
                <span className="text-xl md:text-3xl font-serif text-muted-foreground/40 line-through decoration-muted-foreground/20">
                  {item.before}
                </span>
              </div>

              {/* Arrow/transition indicator */}
              <div className="flex-shrink-0">
                <div className="w-12 md:w-20 h-px bg-gradient-to-r from-muted-foreground/20 via-foreground/40 to-foreground/60 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 border-t border-r border-foreground/60" />
                </div>
              </div>

              {/* After */}
              <div className="flex-1 text-left">
                <span className="text-xl md:text-3xl font-serif text-foreground font-medium">
                  {item.after}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Final feeling */}
        <div
          className={`mt-24 text-center transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-muted-foreground/50 text-sm mb-8">
            No gimmicks. No cheese. Just clarity.
          </p>
          <div className="inline-flex items-center gap-4">
            <div className="w-8 h-px bg-border/30" />
            <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground/40">
              Calm · Seen · Oriented · Confident
            </span>
            <div className="w-8 h-px bg-border/30" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransformationSection;