import { Check, Calendar, Video, Palette, FileText, Users, Sparkles } from "lucide-react";

const deliverables = [
  {
    icon: Palette,
    title: "Brand Identity System",
    description: "Complete visual identity including logo, typography, and color palette tailored to your clinical philosophy",
  },
  {
    icon: Video,
    title: "Cinematic Content Library",
    description: "Professional video and photo assets that capture your craft and differentiate you from competitors",
  },
  {
    icon: FileText,
    title: "Content Strategy Blueprint",
    description: "A 12-month editorial calendar with hooks, themes, and posting cadence mapped to your goals",
  },
  {
    icon: Users,
    title: "Private Advisory Access",
    description: "Direct access to our team for strategic guidance, creative direction, and ongoing refinement",
  },
  {
    icon: Sparkles,
    title: "50% Ad Management Discount",
    description: "Exclusive reduced rates on PASTED's performance advertising services for program members",
  },
];

const timeline = [
  {
    week: "Week 1-2",
    title: "Discovery & Strategy",
    description: "Deep-dive into your vision, clinical philosophy, and market positioning",
  },
  {
    week: "Week 3-4",
    title: "Brand Architecture",
    description: "Visual identity development and content strategy creation",
  },
  {
    week: "Week 5-8",
    title: "Content Production",
    description: "Cinematic shoot days and asset creation at your practice",
  },
  {
    week: "Week 9-12",
    title: "Launch & Amplify",
    description: "Strategic rollout, optimization, and ongoing advisory support",
  },
];

const ProgramDeliverablesSection = () => {
  return (
    <section className="py-24 bg-card/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
            Associate to Empire™
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-6">
            What You Get
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A complete personal brand transformation delivered in 12 weeks
          </p>
        </div>

        {/* Deliverables Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {deliverables.map((item, index) => (
            <div
              key={index}
              className="bg-background/50 border border-border/30 rounded-xl p-6 hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-12">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="font-display text-2xl md:text-3xl text-foreground">
              12-Week Timeline
            </h3>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-[22px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-border/50" />

            <div className="space-y-8">
              {timeline.map((phase, index) => (
                <div
                  key={index}
                  className={`relative flex items-start gap-6 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-11 h-11 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center z-10">
                    <Check className="w-5 h-5 text-primary" />
                  </div>

                  {/* Content */}
                  <div
                    className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                      index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"
                    }`}
                  >
                    <span className="inline-block text-primary font-medium text-sm tracking-wide mb-1">
                      {phase.week}
                    </span>
                    <h4 className="font-display text-xl text-foreground mb-1">
                      {phase.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {phase.description}
                    </p>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramDeliverablesSection;
