import { useEffect, useRef, useState } from "react";

interface AggregateMetric { label: string; value: string; }
interface CaseStudy {
  title: string;
  metrics: { label: string; value: string; highlight?: boolean; }[];
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
  { title: "High-Ticket Veneer Growth", roasValue: "86.1x", metrics: [
    { label: "Ad spend", value: "$6,000/mo" }, { label: "Leads (60 days)", value: "418" },
    { label: "Cost per lead", value: "$14.35" }, { label: "Cases accepted", value: "34" },
    { label: "Case revenue", value: "$516,800", highlight: true },
  ]},
  { title: "Cold Market Authority", roasValue: "22.4x", metrics: [
    { label: "Ad spend", value: "$8,500/mo" }, { label: "New patient consults", value: "67/mo" },
    { label: "Avg case value", value: "$12,400" }, { label: "Monthly revenue", value: "$380,000", highlight: true },
  ]},
  { title: "Conversion Infrastructure", metrics: [
    { label: "Show rate (before)", value: "44%" }, { label: "Show rate (after)", value: "69%" },
    { label: "Close rate lift", value: "+95%" }, { label: "Monthly lift", value: "$110k–$165k", highlight: true },
  ]},
  { title: "Education-First Funnel", roasValue: "31.7x", metrics: [
    { label: "Ad spend", value: "$4,200/mo" }, { label: "Webinar registrations", value: "312/mo" },
    { label: "Consults booked", value: "48" }, { label: "Revenue closed", value: "$133,200", highlight: true },
  ]},
  { title: "Retargeting System", metrics: [
    { label: "Retarget pool", value: "28,000+" }, { label: "Cost per re-engaged lead", value: "$3.12" },
    { label: "Recovery rate", value: "18%" }, { label: "Recovered revenue/mo", value: "$94,500", highlight: true },
  ]},
  { title: "Market Domination", metrics: [
    { label: "Monthly reach", value: "380k" }, { label: "Brand recall lift", value: "+64%" },
    { label: "Consults (before/after)", value: "52 → 141" }, { label: "Monthly revenue", value: "$496,800", highlight: true },
  ]},
];

const AnimatedNumber = ({ value, isVisible, delay = 0 }: { value: string; isVisible: boolean; delay?: number }) => {
  const [displayValue, setDisplayValue] = useState("0");
  useEffect(() => {
    if (!isVisible) return;
    const timeout = setTimeout(() => {
      const numMatch = value.match(/[\d,]+\.?\d*/);
      if (!numMatch) { setDisplayValue(value); return; }
      const numStr = numMatch[0].replace(/,/g, "");
      const targetNum = parseFloat(numStr);
      const prefix = value.substring(0, value.indexOf(numMatch[0]));
      const suffix = value.substring(value.indexOf(numMatch[0]) + numMatch[0].length);
      let startTime: number;
      const duration = 2000;
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
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: 'clamp(64px, 10vw, 120px) 0' }}>
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="section-label text-center justify-center mb-4">Performance</p>
          <h2 className="font-serif mb-6" style={{ fontSize: 'clamp(34px, 6vw, 52px)', color: 'var(--color-text)', lineHeight: '1.1', letterSpacing: '-0.01em' }}>
            Real numbers. Real accounts. No composites.
          </h2>
          <p className="font-sans max-w-xl mx-auto" style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
            Every number below comes from a real PASTED partner account.
          </p>
        </div>

        {/* Aggregate Metrics */}
        <div
          className={`mb-12 p-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '2px' }}
        >
          <p className="font-sans uppercase text-center mb-6" style={{ fontSize: '11px', letterSpacing: '0.25em', color: 'var(--color-text-muted)' }}>
            PASTED — Aggregate Performance Metrics
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {aggregateMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <p className="font-serif text-primary mb-1" style={{ fontSize: '48px', lineHeight: '1' }}>
                  <AnimatedNumber value={metric.value} isVisible={isVisible} delay={index * 100} />
                </p>
                <p className="font-sans uppercase" style={{ fontSize: '11px', letterSpacing: '0.15em', color: 'var(--color-text-muted)' }}>{metric.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Case Study Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className={`p-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                transitionDelay: `${200 + index * 100}ms`,
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '2px',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(185,146,79,0.3)';
                (e.currentTarget as HTMLElement).style.background = 'var(--color-surface-2)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
                (e.currentTarget as HTMLElement).style.background = 'var(--color-surface)';
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-serif" style={{ fontSize: '18px', color: 'var(--color-text)' }}>{study.title}</h3>
                {study.roasValue && (
                  <span className="font-sans font-medium text-primary-foreground" style={{
                    fontSize: '11px', padding: '4px 10px', background: '#B8924F', borderRadius: '2px',
                  }}>
                    {study.roasValue} ROAS
                  </span>
                )}
              </div>
              <div className="space-y-3">
                {study.metrics.map((metric, mIndex) => (
                  <div key={mIndex} className="flex justify-between items-baseline">
                    <span className="font-sans" style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>{metric.label}</span>
                    <span className="font-sans" style={{
                      fontSize: '14px',
                      color: metric.highlight ? 'var(--color-text)' : 'var(--color-text-muted)',
                      fontWeight: metric.highlight ? 500 : 300,
                    }}>
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
