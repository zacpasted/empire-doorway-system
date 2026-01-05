import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

interface ProgramDeliverablesSectionProps {
  onApplyClick?: () => void;
}

const deliverables = [
  {
    title: "Complete Brand Identity",
    items: ["Custom logo & visual system", "Brand guidelines", "Social templates"],
  },
  {
    title: "Professional Content Shoot",
    items: ["2 full production days", "Cinematic video content", "Professional photography"],
  },
  {
    title: "Video Asset Library",
    items: ["12+ edited short-form videos", "3+ long-form brand films", "Procedure highlights"],
  },
  {
    title: "Content Strategy",
    items: ["12-month content calendar", "Hook & caption frameworks", "Posting cadence"],
  },
  {
    title: "Private Advisory",
    items: ["Weekly strategy calls", "Direct Slack access", "Creative direction"],
  },
  {
    title: "Member Benefits",
    items: ["50% off ad management", "Priority booking", "Private community"],
  },
];

const timeline = [
  { week: "1-2", phase: "Discovery & Strategy" },
  { week: "2-3", phase: "Brand Architecture" },
  { week: "3-5", phase: "Content Production" },
  { week: "5-6", phase: "Launch & Amplify" },
];

const ProgramDeliverablesSection = ({ onApplyClick }: ProgramDeliverablesSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 md:py-48 bg-card/30">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-6">
            Associate to Empire™
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-6">
            Everything You Get
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            A complete personal brand transformation delivered in 45 days
          </p>
        </div>

        {/* Deliverables Grid */}
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

        {/* Pricing */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="grid md:grid-cols-2 gap-px bg-border/30">
            {/* Initial Build */}
            <div className={`bg-background p-10 text-center transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4">
                Initial Brand Build
              </p>
              <p className="text-5xl font-serif text-foreground mb-2">$3,500</p>
              <p className="text-sm text-muted-foreground">45-day launch</p>
            </div>

            {/* Monthly Retainer */}
            <div className={`bg-primary/5 p-10 text-center border-l border-primary/20 transition-all duration-700 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              <p className="text-sm tracking-[0.2em] uppercase text-primary mb-4">
                Monthly Retainer
              </p>
              <p className="text-5xl font-serif text-foreground mb-2">$2,750</p>
              <p className="text-sm text-muted-foreground">Ongoing support</p>
            </div>
          </div>

          <div className={`text-center mt-6 p-4 border border-border/30 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground">Month 4+:</span> Ad management from{" "}
              <span className="text-primary">$1,250/mo</span>
              <span className="text-muted-foreground/60"> (50% below market)</span>
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className={`max-w-3xl mx-auto mb-16 transition-all duration-700 delay-600 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground text-center mb-10">
            45-Day Timeline
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
            Apply Now
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-sm text-muted-foreground mt-6">
            Limited to 4 new members per quarter
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProgramDeliverablesSection;
