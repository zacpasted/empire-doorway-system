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
  { label: "Total aesthetic case revenue generated", value: "$100,000,000+" },
  { label: "Client retention rate", value: "97%" },
  { label: "Average client engagement length", value: "22.4 months" },
  { label: "Practices scaled to $250k+/month", value: "41" },
  { label: "Average revenue lift within first 120 days", value: "+63%" },
];

const caseStudies: CaseStudy[] = [
  {
    title: "High-Ticket Veneer Growth System",
    roasValue: "86.1x",
    metrics: [
      { label: "Monthly ad spend", value: "$6,000" },
      { label: "Leads generated (60 days)", value: "418" },
      { label: "Cost per lead", value: "$14.35" },
      { label: "Consults booked", value: "132" },
      { label: "Show rate", value: "73%" },
      { label: "Consults completed", value: "96" },
      { label: "Cases accepted", value: "34" },
      { label: "Close rate", value: "35.4%" },
      { label: "Average case value", value: "$15,200" },
      { label: "Total case revenue", value: "$516,800", highlight: true },
    ],
  },
  {
    title: "Cold Market Authority Ads (No Offers / No Discounts)",
    roasValue: "78.3x",
    metrics: [
      { label: "Monthly ad spend", value: "$4,000" },
      { label: "Video impressions", value: "412,000" },
      { label: "3-second view rate", value: "41%" },
      { label: "50% watch rate", value: "22%" },
      { label: "Leads generated", value: "186" },
      { label: "Cost per lead", value: "$21.50" },
      { label: "Consults completed", value: "61" },
      { label: "Cases accepted", value: "18" },
      { label: "Average case value", value: "$17,400" },
      { label: "Revenue generated", value: "$313,200", highlight: true },
    ],
  },
  {
    title: "Follow-Up + Conversion Infrastructure",
    metrics: [
      { label: "Monthly ad spend", value: "$3,500" },
      { label: "Leads per month", value: "128" },
      { label: "Consult show rate (before)", value: "44%" },
      { label: "Consult show rate (after)", value: "69%" },
      { label: "Close rate (before)", value: "6.2%" },
      { label: "Close rate (after)", value: "12.1%" },
      { label: "Average case value", value: "$9,800–$18,400" },
      { label: "Incremental monthly revenue", value: "$110,000–$165,000", highlight: true },
    ],
  },
  {
    title: "Education-First Aesthetic Funnel",
    roasValue: "71.7x",
    metrics: [
      { label: "Monthly ad spend", value: "$5,500" },
      { label: "Long-form video views (2+ min)", value: "68,000" },
      { label: "Cost per engaged view", value: "$0.19" },
      { label: "Leads generated", value: "254" },
      { label: "Cost per lead", value: "$21.65" },
      { label: "Consults completed", value: "89" },
      { label: "Cases accepted", value: "29" },
      { label: "Average case value", value: "$13,600" },
      { label: "Revenue generated", value: "$394,400", highlight: true },
    ],
  },
  {
    title: "Re-Activation & Retargeting System",
    roasValue: "92.6x",
    metrics: [
      { label: "Monthly ad spend", value: "$1,800" },
      { label: "Dormant lead pool", value: "3,200" },
      { label: "CTR", value: "3.9%" },
      { label: "Reactivated leads", value: "94" },
      { label: "Consults booked", value: "37" },
      { label: "Show rate", value: "81%" },
      { label: "Cases accepted", value: "14" },
      { label: "Average case value", value: "$11,900" },
      { label: "Revenue generated", value: "$166,600", highlight: true },
    ],
  },
  {
    title: "Single-City Market Domination",
    metrics: [
      { label: "Monthly ad spend", value: "$7,500" },
      { label: "Metro population", value: "1.1M" },
      { label: "Monthly reach", value: "380,000" },
      { label: "Brand recall lift", value: "+64%" },
      { label: "Monthly consults (before)", value: "52" },
      { label: "Monthly consults (after)", value: "141" },
      { label: "Cases accepted (monthly)", value: "46" },
      { label: "Average case value", value: "$10,800" },
      { label: "Monthly aesthetic revenue", value: "$496,800", highlight: true },
    ],
  },
  {
    title: "Entry Offer → High-Ticket Ascension",
    roasValue: "44.7x",
    metrics: [
      { label: "Monthly ad spend", value: "$3,000" },
      { label: "Entry offer starts", value: "31" },
      { label: "Aesthetic upsells", value: "9" },
      { label: "Upsell conversion rate", value: "29%" },
      { label: "Average veneer case value", value: "$14,900" },
      { label: "Upsell revenue", value: "$134,100", highlight: true },
    ],
  },
  {
    title: "12-Month Evergreen Scaling",
    roasValue: "68.6x",
    metrics: [
      { label: "Total ad spend (12 months)", value: "$62,000" },
      { label: "Total leads generated", value: "3,840" },
      { label: "Average CPL", value: "$16.14" },
      { label: "Consults completed", value: "1,104" },
      { label: "Cases accepted", value: "346" },
      { label: "Average case value", value: "$12,300" },
      { label: "Total case revenue", value: "$4,255,800", highlight: true },
    ],
  },
  {
    title: "High-End Cosmetic Repositioning",
    metrics: [
      { label: "Monthly ad spend", value: "$5,000" },
      { label: "Initial monthly aesthetic revenue", value: "$185,000" },
      { label: "Revenue after 6 months", value: "$332,000" },
      { label: "Monthly consult volume increase", value: "+118%" },
      { label: "Case acceptance rate increase", value: "+67%" },
      { label: "Average case value increase", value: "+31%" },
      { label: "Revenue volatility reduction", value: "−54%", highlight: true },
    ],
  },
];

// Animated number component
const AnimatedNumber = ({ 
  value, 
  isVisible 
}: { 
  value: string; 
  isVisible: boolean;
}) => {
  const [displayValue, setDisplayValue] = useState("0");
  
  useEffect(() => {
    if (!isVisible) return;
    
    // Extract numeric part and suffix
    const numMatch = value.match(/[\d,]+\.?\d*/);
    if (!numMatch) {
      setDisplayValue(value);
      return;
    }
    
    const numStr = numMatch[0].replace(/,/g, '');
    const targetNum = parseFloat(numStr);
    const prefix = value.substring(0, value.indexOf(numMatch[0]));
    const suffix = value.substring(value.indexOf(numMatch[0]) + numMatch[0].length);
    
    let startTime: number;
    const duration = 1500;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = targetNum * easeOut;
      
      // Format the number
      let formatted: string;
      if (numMatch[0].includes('.')) {
        formatted = current.toLocaleString('en-US', { 
          minimumFractionDigits: numMatch[0].split('.')[1]?.length || 0,
          maximumFractionDigits: numMatch[0].split('.')[1]?.length || 0
        });
      } else {
        formatted = Math.round(current).toLocaleString('en-US');
      }
      
      setDisplayValue(`${prefix}${formatted}${suffix}`);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value, isVisible]);
  
  return <span>{displayValue}</span>;
};

// Case study card component
const CaseStudyCard = ({ 
  study, 
  index 
}: { 
  study: CaseStudy; 
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`
        relative p-6 rounded-xl border border-border/30
        bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm
        transition-all duration-700 ease-out
        hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex-1">
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary mb-3">
            PASTED
          </span>
          <h3 className="text-lg font-semibold text-foreground leading-tight">
            {study.title}
          </h3>
        </div>
        
        {study.roasValue && (
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              <AnimatedNumber value={study.roasValue} isVisible={isVisible} />
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">
              ROAS
            </div>
          </div>
        )}
      </div>
      
      {/* Metrics */}
      <div className="space-y-2">
        {study.metrics.map((metric, i) => (
          <div
            key={i}
            className={`
              flex justify-between items-center py-2 border-b border-border/20 last:border-0
              ${metric.highlight ? 'bg-primary/5 -mx-2 px-2 rounded' : ''}
            `}
          >
            <span className={`text-sm ${metric.highlight ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              {metric.label}
            </span>
            <span className={`text-sm font-semibold ${metric.highlight ? 'text-primary' : 'text-foreground'}`}>
              <AnimatedNumber value={metric.value} isVisible={isVisible} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdCaseStudiesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-2 text-sm font-medium rounded-full bg-primary/10 text-primary mb-6">
            Performance Data
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            The Numbers Behind the Brand
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real results from real practices. No hypotheticals, no projections—just verified performance data.
          </p>
        </div>

        {/* Aggregate Metrics - Featured at Top */}
        <div className={`mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative p-8 md:p-12 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-2xl" />
            
            <div className="relative">
              <h3 className="text-center text-xl md:text-2xl font-display font-semibold text-foreground mb-10">
                PASTED — Aggregate Performance Metrics
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {aggregateMetrics.map((metric, index) => (
                  <div 
                    key={index} 
                    className="text-center p-4 rounded-xl bg-background/50 border border-border/20"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                      <AnimatedNumber value={metric.value} isVisible={isVisible} />
                    </div>
                    <div className="text-sm text-muted-foreground leading-tight">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={index} study={study} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdCaseStudiesSection;
