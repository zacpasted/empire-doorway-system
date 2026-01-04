import { Check, Calendar, Video, Palette, FileText, Users, Sparkles, Camera, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProgramDeliverablesSectionProps {
  onApplyClick?: () => void;
}

const deliverables = [
  {
    icon: Palette,
    title: "Complete Brand Identity",
    items: [
      "Custom logo & visual system",
      "Brand color palette & typography",
      "Brand guidelines document",
      "Social media templates",
    ],
  },
  {
    icon: Camera,
    title: "Professional Content Shoot",
    items: [
      "2 full production days",
      "Cinematic video content",
      "Professional photography",
      "Behind-the-scenes footage",
    ],
  },
  {
    icon: Video,
    title: "Video Asset Library",
    items: [
      "12+ edited short-form videos",
      "3+ long-form brand films",
      "Procedure highlight reels",
      "Patient journey stories",
    ],
  },
  {
    icon: FileText,
    title: "Content Strategy",
    items: [
      "12-month content calendar",
      "Posting schedule & cadence",
      "Hook & caption frameworks",
      "Hashtag strategy",
    ],
  },
  {
    icon: MessageSquare,
    title: "Private Advisory",
    items: [
      "Weekly strategy calls",
      "Direct Slack access",
      "Creative direction support",
      "Performance reviews",
    ],
  },
  {
    icon: Sparkles,
    title: "Exclusive Member Benefits",
    items: [
      "50% off ad management",
      "Priority booking for shoots",
      "Access to private community",
      "Quarterly trend briefings",
    ],
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

const ProgramDeliverablesSection = ({ onApplyClick }: ProgramDeliverablesSectionProps) => {
  return (
    <section className="py-24 bg-card/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
            Associate to Empire™
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-6">
            Everything You Get
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A complete personal brand transformation delivered in 12 weeks
          </p>
        </div>

        {/* Deliverables Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {deliverables.map((item, index) => (
            <div
              key={index}
              className="bg-background/50 border border-border/30 rounded-xl p-6 hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl text-foreground mb-4">
                {item.title}
              </h3>
              <ul className="space-y-2">
                {item.items.map((listItem, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{listItem}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Pricing Card */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="bg-gradient-to-br from-primary/10 via-background to-primary/5 border border-primary/30 rounded-2xl p-8 md:p-12 text-center">
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-2">
              Investment
            </p>
            <div className="flex items-baseline justify-center gap-2 mb-4">
              <span className="font-display text-5xl md:text-6xl text-foreground">£15,000</span>
              <span className="text-muted-foreground text-lg">one-time</span>
            </div>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Payment plans available. Includes everything listed above plus 12 months of advisory support.
            </p>
            <Button 
              onClick={onApplyClick}
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-medium"
            >
              Apply for Associate to Empire™
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-muted-foreground/60 text-sm mt-4">
              Limited to 4 new members per quarter
            </p>
          </div>
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
