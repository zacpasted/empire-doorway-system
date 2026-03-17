import { useEffect, useRef, useState } from "react";
import { Scissors, Calendar, MessageSquare, TrendingUp, Shield, Users } from "lucide-react";

const MonthlyDeliverablesSection = () => {
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

  const deliverables = [
    { icon: Scissors, title: "8-12 Edited Videos", description: "Premium storytelling content — scripted, edited, and optimized for cosmetic patient attraction" },
    { icon: Calendar, title: "Done-For-You Publishing", description: "Strategic scheduling and publishing across all platforms — you never touch a post" },
    { icon: MessageSquare, title: "Ad Creative & Management", description: "Full paid media strategy, ad creative production, campaign management, and ongoing optimization" },
    { icon: TrendingUp, title: "On-Location Shoots", description: "We come to your practice for cinematic production days — capturing your story, your team, and your results" },
    { icon: Users, title: "Dedicated Strategic Team", description: "Your personal editor, strategist, ad manager, and growth partner — all coordinated as one" },
    { icon: Shield, title: "Hospitality-Led Conversion", description: "Ongoing refinement of consultation experience, patient communication, and treatment presentation" },
  ];

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-secondary/20">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className={`text-xs tracking-[0.4em] uppercase text-primary mb-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            Monthly Partnership
          </p>
          <h2 className={`text-2xl md:text-4xl font-serif text-foreground mb-4 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            What's Delivered Every Month
          </h2>
          <p className={`text-muted-foreground max-w-xl mx-auto transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            A complete done-for-you growth system — not a disconnected list of services
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {deliverables.map((item, index) => (
            <div
              key={index}
              className={`group p-6 border border-border/30 bg-background/50 hover:border-primary/30 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className={`text-center mt-12 text-sm text-muted-foreground/60 transition-all duration-700 delay-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          Your only requirement: record raw footage. We handle everything else.
        </p>
      </div>
    </section>
  );
};

export default MonthlyDeliverablesSection;