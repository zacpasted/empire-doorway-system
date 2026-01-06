import { useEffect, useRef, useState } from "react";
import { Scissors, Calendar, MessageSquare, TrendingUp, Shield, Users } from "lucide-react";

const MonthlyDeliverablesSection = () => {
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

  const deliverables = [
    {
      icon: Scissors,
      title: "8-12 Edited Videos",
      description: "Premium short-form content, professionally edited and color graded",
    },
    {
      icon: Calendar,
      title: "Done-For-You Posting",
      description: "Strategic scheduling and publishing across all platforms",
    },
    {
      icon: MessageSquare,
      title: "Caption & Hook Writing",
      description: "Scroll-stopping copy crafted for engagement and authority",
    },
    {
      icon: TrendingUp,
      title: "Performance Reviews",
      description: "Monthly analytics and strategy adjustments",
    },
    {
      icon: Users,
      title: "Dedicated Creative Team",
      description: "Your personal editor and content manager on standby",
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Every piece reviewed against our proven frameworks",
    },
  ];

  const replacementCosts = [
    { role: "In-House Video Editor", cost: "$4,500+/mo", note: "salary + benefits" },
    { role: "Content Manager", cost: "$3,500+/mo", note: "salary + benefits" },
    { role: "Social Media Agency", cost: "$3,000-8,000/mo", note: "generic templates" },
    { role: "Freelance Editor", cost: "$2,000+/mo", note: "no strategy included" },
  ];

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-secondary/20">
      <div className="container max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className={`text-xs tracking-[0.4em] uppercase text-primary mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Monthly Retainer
          </p>
          <h2
            className={`text-2xl md:text-4xl font-serif text-foreground mb-4 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            What's Included Every Month
          </h2>
          <p
            className={`text-muted-foreground max-w-xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            After your 45-day launch, this is what you receive on the $2,750/mo retainer
          </p>
        </div>

        {/* Deliverables Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {deliverables.map((item, index) => (
            <div
              key={index}
              className={`group p-6 border border-border/30 bg-background/50 hover:border-primary/30 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cost Comparison */}
        <div
          className={`max-w-3xl mx-auto transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground/60 mb-2">
              What This Replaces
            </p>
            <h3 className="text-xl md:text-2xl font-serif text-foreground">
              All of this for <span className="text-primary">$2,750/mo</span>
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {replacementCosts.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-border/20 bg-background/30"
              >
                <div>
                  <p className="text-foreground/80 text-sm">{item.role}</p>
                  <p className="text-xs text-muted-foreground/50">{item.note}</p>
                </div>
                <p className="text-muted-foreground line-through decoration-destructive/50 text-sm">
                  {item.cost}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center p-6 border border-primary/30 bg-primary/5">
            <p className="text-sm text-muted-foreground mb-2">Combined market rate</p>
            <p className="text-2xl font-serif text-foreground mb-1">
              <span className="line-through decoration-destructive/50 text-muted-foreground">$13,000+/mo</span>
              <span className="mx-3">→</span>
              <span className="text-primary">$2,750/mo</span>
            </p>
            <p className="text-xs text-muted-foreground/60">
              Premium quality. Fraction of the cost.
            </p>
          </div>
        </div>

        {/* Bottom note */}
        <p
          className={`text-center mt-12 text-sm text-muted-foreground/60 transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Your only job: record raw footage. We handle everything else.
        </p>
      </div>
    </section>
  );
};

export default MonthlyDeliverablesSection;
