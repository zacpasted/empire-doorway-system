import { useEffect, useRef, useState } from "react";

interface AggregateMetric {
  label: string;
  value: string;
}
interface CaseStudy {
  title: string;
  metrics: {
    label: string;
    value: string;
    highlight?: boolean;
  }[];
  roasValue?: string;
}

const aggregateMetrics: AggregateMetric[] = [
  { label: "Revenue Generated", value: "$100M+" },
  { label: "Client Retention", value: "97%" },
  { label: "Avg Engagement", value: "22.4 mo" },
  { label: "Practices at $250k+/mo", value: "41" },
  { label: "120-Day Revenue Lift", value: "+63%" },
];

const caseStudies: CaseStudy[] = [
  {
    title: "High-Ticket Veneer Growth",
    roasValue: "86.1x",
    metrics: [
      { label: "Ad spend", value: "$6,000/mo" },
      { label: "Leads (60 days)", value: "418" },
      { label: "Cost per lead", value: "$14.35" },
      { label: "Cases accepted", value: "34" },
      { label: "Case revenue", value: "$516,800", highlight: true },
    ],
  },
  {
    title: "Conversion Infrastructure",
    metrics: [
      { label: "Show rate (before)", value: "44%" },
      { label: "Show rate (after)", value: "69%" },
      { label: "Close rate lift", value: "+95%" },
      { label: "Monthly lift", value: "$110k–$165k", highlight: true },
    ],
  },
  {
    title: "Market Domination",
    metrics: [
      { label: "Monthly reach", value: "380k" },
      { label: "Brand recall lift", value: "+64%" },
      { label: "Consults (before/after)", value: "52 → 141" },
      { label: "Monthly revenue", value: "$496,800", highlight: true },
    ],
  },
];

const AnimatedNumber = ({
  value,
  isVisible,
  delay = 0,
}: {
  value: string;
  isVisible: boolean;
  delay?: number;
}) => {
  const [displayValue, setDisplayValue] = useState("0");
  useEffect(() => {
    if (!isVisible) return;
    const timeout = setTimeout(() => {
      const numMatch = value.match(/[\d,]+\.?\d*/);
      if (!numMatch) {
        setDisplayValue(value);
        return;
      }
      const numStr = numMatch[0].replace(/,/g, "");
      const targetNum = parseFloat(numStr);
      const prefix = value.substring(0, value.indexOf(numMatch[0]));
      const suffix = value.substring(value.indexOf(numMatch[0]) + numMatch[0].length);
      let startTime: number;
      const duration = 1500;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = targetNum * easeOut;
        let formatted: string;
        if (numMatch[0].includes(".")) {
          formatted = current.toLocaleString("en-US", {
            minimumFractionDigits: numMatch[0].split(".")[1]?.length || 0,
            maximumFractionDigits: numMatch[0].split(".")[1]?.length || 0,
          });
        } else {
          formatted = Math.round(current).toLocaleString("en-US");
        }
        setDisplayValue(`${prefix}${formatted}${suffix}`);
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, delay);
    return () => {};
  }, [value, isVisible, delay]);
  return <span>{displayValue}</span>;
};

const AdCaseStudiesSection = () => {
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
    <section ref={sectionRef} className="py-28 md:py-36 bg-background">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="section-label text-xs tracking-[0.3em] text-foreground/50 uppercase mb-4">
            Performance
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-6">
            Real numbers. Real accounts. No composites.
          </h2>
          <p className="text-sm text-muted-foreground/70 max-w-xl mx-auto">
            Every number below comes from a real PASTED partner account.
          </p>
        </div>

        {/* Aggregate Metrics Card */}
        <div
          className={`mb-12 p-8 rounded-lg border border-foreground/10 bg-foreground/5 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-xs tracking-[0.2em] text-foreground/50 uppercase mb-6 text-center">
            PASTED — Aggregate Performance Metrics
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {aggregateMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <p className="text-2xl md:text-3xl font-serif text-foreground mb-1">
                  <AnimatedNumber value={metric.value} isVisible={isVisible} delay={index * 100} />
                </p>
                <p className="text-xs text-foreground/50">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Case Study Cards Grid — 3 cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg transition-all duration-700 hover:border-primary/30 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${200 + index * 100}ms`,
                background: 'rgba(185,146,79,0.04)',
                border: '1px solid rgba(185,146,79,0.1)',
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-serif text-foreground">{study.title}</h3>
                {study.roasValue && (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-primary text-primary-foreground font-medium">
                    {study.roasValue} ROAS
                  </span>
                )}
              </div>
              <div className="space-y-3">
                {study.metrics.map((metric, mIndex) => (
                  <div key={mIndex} className="flex justify-between items-baseline">
                    <span className="text-sm text-foreground/50">{metric.label}</span>
                    <span
                      className={`text-sm ${
                        metric.highlight ? "text-foreground font-medium" : "text-foreground/70"
                      }`}
                    >
                      <AnimatedNumber value={metric.value} isVisible={isVisible} delay={300 + index * 100} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdCaseStudiesSection;
