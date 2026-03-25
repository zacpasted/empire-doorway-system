import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

interface ProgramDeliverablesSectionProps {
  onApplyClick?: () => void;
}

const deliverables = [
  {
    title: "Authority Positioning",
    items: ["Brand identity & visual system", "Strategic positioning framework", "Competitive differentiation"],
  },
  {
    title: "Content & Creative",
    items: ["Done-for-you scripting & editing", "Cinematic production quality", "Platform-optimized content"],
  },
  {
    title: "Patient Acquisition",
    items: ["Paid media management", "Cosmetic-targeted campaigns", "Revenue attribution & tracking"],
  },
  {
    title: "Conversion Systems",
    items: ["Consultation optimization", "Patient communication frameworks", "CRM & workflow design"],
  },
  {
    title: "Strategic Advisory",
    items: ["Ongoing strategy partnership", "Direct access to PASTED team", "Market intelligence & insights"],
  },
  {
    title: "Partnership Benefits",
    items: ["Ecosystem-level perspective", "Priority support", "Private community access"],
  },
];

const timeline = [
  { week: "1-2", phase: "Strategy & Positioning" },
  { week: "2-4", phase: "Brand & Identity" },
  { week: "4-6", phase: "Content System Launch" },
  { week: "6+", phase: "Full System Active" },
];

const ProgramDeliverablesSection = ({ onApplyClick }: ProgramDeliverablesSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 md:py-48 bg-card/30">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-20">
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-6">
            PASTED Partnership
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-6">
            Everything included. Nothing outsourced.
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            A 12-month private partnership. Six growth engines, one coordinated team, one point of accountability. Nothing is outsourced. Nothing is templated.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/30 mb-20">
          {deliverables.map((item, index) => (
            <div
              key={index}
              className={`bg-background p-8 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <h3 className="text-xl font-serif text-foreground mb-6">{item.title}</h3>
              <ul className="space-y-3">
                {item.items.map((listItem, i) => (
                  <li key={i} className="text-muted-foreground text-sm flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                    {listItem}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Revenue Framing */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className={`bg-background p-10 text-center border border-border/30 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4">
              12-Month Revenue Target
            </p>
            <p className="text-5xl font-serif text-primary mb-4">$500K–$1M+</p>
            <p className="text-muted-foreground max-w-lg mx-auto">
              in additional aesthetic case revenue. Most cosmetic cases range from $6K–$20K+.
              Adding 50–100 qualified cases per year — cases you actually want to do — creates structural transformation, not just revenue.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className={`max-w-3xl mx-auto mb-16 transition-all duration-700 delay-600 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground text-center mb-10">
            Onboarding Timeline
          </p>
          <div className="flex justify-between items-center relative">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-border/50 -translate-y-1/2" />
            {timeline.map((phase, index) => (
              <div key={index} className="relative text-center z-10">
                <div className="w-3 h-3 rounded-full bg-primary mx-auto mb-4" />
                <p className="text-xs text-primary mb-1">Week {phase.week}</p>
                <p className="text-sm text-foreground">{phase.phase}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={`text-center transition-all duration-700 delay-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <button
            onClick={onApplyClick}
            className="inline-flex items-center gap-3 text-sm tracking-[0.2em] uppercase text-background bg-primary px-10 py-5 hover:bg-primary/90 transition-colors duration-300"
          >
            Book Discovery Call →
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-sm text-muted-foreground mt-6">
            30 practices annually · Applications reviewed within 48 hours · Not all accepted
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProgramDeliverablesSection;