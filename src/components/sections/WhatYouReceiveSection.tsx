import { useEffect, useRef, useState } from "react";

const WhatYouReceiveSection = () => {
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

  const deliverables = [
    {
      category: "Production",
      items: [
        "Monthly high-end video edits",
        "Professional color grading",
        "Platform-optimized formats",
      ],
    },
    {
      category: "Strategy",
      items: [
        "Scripting and narrative guidance",
        "Content calendar architecture",
        "Positioning refinement",
      ],
    },
    {
      category: "Operations",
      items: [
        "Done-for-you editing pipeline",
        "Clear delivery cadence",
        "Quality control at every stage",
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-48 bg-background relative"
    >
      <div className="container max-w-5xl mx-auto px-4">
        {/* Section label */}
        <p
          className={`text-xs tracking-[0.4em] uppercase text-muted-foreground/60 text-center mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          The Delivery
        </p>

        {/* Title */}
        <h2
          className={`text-2xl md:text-4xl font-serif text-center text-foreground mb-20 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          What You Receive
        </h2>

        {/* Deliverables grid */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {deliverables.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${300 + groupIndex * 150}ms` }}
            >
              {/* Category header */}
              <div className="pb-4 mb-6 border-b border-border/20">
                <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground/50">
                  {group.category}
                </p>
              </div>

              {/* Items */}
              <ul className="space-y-4">
                {group.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="flex items-start gap-3 text-foreground/70"
                  >
                    <span className="text-muted-foreground/30 mt-1.5">·</span>
                    <span className="font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Reassurance */}
        <div
          className={`mt-20 text-center transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-muted-foreground/50 text-sm">
            Predictable. Professional. No surprises.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatYouReceiveSection;
