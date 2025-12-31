import { TrendingUp, DollarSign, Users, Target } from "lucide-react";

interface CaseStudy {
  title: string;
  description: string;
  metrics: {
    label: string;
    value: string;
    icon: React.ReactNode;
  }[];
  category: string;
}

const caseStudies: CaseStudy[] = [
  {
    title: "Aesthetic Practice Launch",
    description: "New associate built authority and filled schedule within 90 days using strategic brand positioning paired with targeted ad campaigns.",
    category: "Brand + Paid",
    metrics: [
      { label: "Case Revenue", value: "$180K+", icon: <DollarSign className="w-4 h-4" /> },
      { label: "New Patients", value: "47", icon: <Users className="w-4 h-4" /> },
      { label: "ROAS", value: "8.2x", icon: <TrendingUp className="w-4 h-4" /> },
    ],
  },
  {
    title: "Cosmetic Case Acceleration",
    description: "Established dentist transitioned from insurance-heavy to premium cosmetic cases through narrative repositioning and ad amplification.",
    category: "Repositioning",
    metrics: [
      { label: "Avg Case Value", value: "+340%", icon: <Target className="w-4 h-4" /> },
      { label: "Monthly Revenue", value: "+$95K", icon: <DollarSign className="w-4 h-4" /> },
      { label: "Ad Spend ROI", value: "11x", icon: <TrendingUp className="w-4 h-4" /> },
    ],
  },
  {
    title: "Multi-Location Scale",
    description: "Practice owner scaled from single location to regional authority using systematic content and paid acquisition strategy.",
    category: "Scale",
    metrics: [
      { label: "Locations", value: "1 → 3", icon: <Target className="w-4 h-4" /> },
      { label: "Annual Growth", value: "$2.4M", icon: <DollarSign className="w-4 h-4" /> },
      { label: "Patient Pipeline", value: "300+", icon: <Users className="w-4 h-4" /> },
    ],
  },
];

const AdCaseStudiesSection = () => {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Paid Acquisition Results
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-6">
            When Brand Meets Ad Spend
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Associate to Empire™ members receive 50% reduced rates on ad management services. 
            Here's what happens when strategic positioning meets paid amplification.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="bg-background border border-border/50 p-8 rounded-sm hover:border-primary/30 transition-colors duration-300"
            >
              <div className="mb-6">
                <span className="text-xs uppercase tracking-[0.2em] text-primary/70 font-medium">
                  {study.category}
                </span>
                <h3 className="font-display text-xl font-medium text-foreground mt-2 mb-3">
                  {study.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {study.description}
                </p>
              </div>

              <div className="space-y-4 pt-6 border-t border-border/50">
                {study.metrics.map((metric, metricIndex) => (
                  <div key={metricIndex} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-primary/70">{metric.icon}</span>
                      <span className="text-sm">{metric.label}</span>
                    </div>
                    <span className="font-display text-lg font-medium text-foreground">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Results vary by market, execution, and commitment. These outcomes represent documented client 
            results using PASTED's integrated brand + paid strategy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AdCaseStudiesSection;
