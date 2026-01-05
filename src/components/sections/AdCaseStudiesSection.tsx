import { useEffect, useRef, useState } from "react";
import { TrendingUp, DollarSign, Users, Target, Eye, BarChart3, Zap, ArrowUpRight } from "lucide-react";

interface CaseStudy {
  title: string;
  tag: string;
  tagColor: string;
  metrics: {
    label: string;
    value: string;
    highlight?: boolean;
  }[];
  roasValue?: string;
}

const caseStudies: CaseStudy[] = [
  {
    title: "High-Ticket Veneer Scale",
    tag: "CSC",
    tagColor: "from-amber-500/20 to-amber-600/20",
    roasValue: "86.1x",
    metrics: [
      { label: "Monthly Ad Spend", value: "$6,000" },
      { label: "Leads Generated (60 days)", value: "418" },
      { label: "Cost Per Lead", value: "$14.35" },
      { label: "Consults Completed", value: "96" },
      { label: "Cases Accepted", value: "34" },
      { label: "Average Case Value", value: "$15,200" },
      { label: "Total Revenue", value: "$516,800", highlight: true },
    ],
  },
  {
    title: "Cold Market Authority Ads",
    tag: "CSC",
    tagColor: "from-amber-500/20 to-amber-600/20",
    roasValue: "78.3x",
    metrics: [
      { label: "Monthly Ad Spend", value: "$4,000" },
      { label: "Video Impressions", value: "412,000" },
      { label: "3-Second View Rate", value: "41%" },
      { label: "Leads Generated", value: "186" },
      { label: "Cases Accepted", value: "18" },
      { label: "Average Case Value", value: "$17,400" },
      { label: "Revenue Generated", value: "$313,200", highlight: true },
    ],
  },
  {
    title: "Re-Activation + Retargeting",
    tag: "CSC",
    tagColor: "from-amber-500/20 to-amber-600/20",
    roasValue: "92.6x",
    metrics: [
      { label: "Monthly Ad Spend", value: "$1,800" },
      { label: "Audience Size", value: "3,200" },
      { label: "CTR", value: "3.9%" },
      { label: "Reactivated Leads", value: "94" },
      { label: "Cases Accepted", value: "14" },
      { label: "Average Case Value", value: "$11,900" },
      { label: "Revenue Generated", value: "$166,600", highlight: true },
    ],
  },
  {
    title: "Education-First Funnel",
    tag: "CSC",
    tagColor: "from-amber-500/20 to-amber-600/20",
    roasValue: "71.7x",
    metrics: [
      { label: "Monthly Ad Spend", value: "$5,500" },
      { label: "Video Views (2+ min)", value: "68,000" },
      { label: "Cost Per Engaged View", value: "$0.19" },
      { label: "Leads Generated", value: "254" },
      { label: "Cases Accepted", value: "29" },
      { label: "Average Case Value", value: "$13,600" },
      { label: "Revenue Generated", value: "$394,400", highlight: true },
    ],
  },
  {
    title: "Personal Brand + Paid Amplification",
    tag: "PASTED",
    tagColor: "from-primary/20 to-primary/30",
    metrics: [
      { label: "Monthly Budget", value: "$2,500" },
      { label: "Reach Increase", value: "+480%" },
      { label: "Profile Visits", value: "+610%" },
      { label: "Inbound DMs", value: "6 → 41" },
      { label: "Booked Consults", value: "3 → 17" },
      { label: "Closed Retainers", value: "5" },
      { label: "Annualized Revenue", value: "$270,000", highlight: true },
    ],
  },
  {
    title: "Authority Ads for Course Offer",
    tag: "PASTED",
    tagColor: "from-primary/20 to-primary/30",
    roasValue: "41.6x",
    metrics: [
      { label: "Ad Spend", value: "$3,200" },
      { label: "Video Impressions", value: "287,000" },
      { label: "Applications Submitted", value: "461" },
      { label: "Qualified Applicants", value: "92" },
      { label: "Seats Sold", value: "28" },
      { label: "Average Ticket", value: "$4,750" },
      { label: "Total Revenue", value: "$133,000", highlight: true },
    ],
  },
  {
    title: "Market Domination (Single City)",
    tag: "CSC × PASTED",
    tagColor: "from-amber-500/10 via-primary/20 to-amber-500/10",
    metrics: [
      { label: "Monthly Ad Spend", value: "$7,500" },
      { label: "Market Population", value: "1.1M" },
      { label: "Monthly Reach", value: "380,000" },
      { label: "Brand Recall Lift", value: "+64%" },
      { label: "Monthly Consults", value: "48 → 137" },
      { label: "Cases Accepted (Monthly)", value: "44" },
      { label: "Monthly Aesthetic Revenue", value: "$475,200", highlight: true },
    ],
  },
  {
    title: "Evergreen Scaling (12 Months)",
    tag: "CSC",
    tagColor: "from-amber-500/20 to-amber-600/20",
    roasValue: "68.6x",
    metrics: [
      { label: "Total Ad Spend (12mo)", value: "$62,000" },
      { label: "Total Leads", value: "3,840" },
      { label: "Average CPL", value: "$16.14" },
      { label: "Total Consults Completed", value: "1,104" },
      { label: "Total Cases Accepted", value: "346" },
      { label: "Average Case Value", value: "$12,300" },
      { label: "Total Case Revenue", value: "$4,255,800", highlight: true },
    ],
  },
  {
    title: "Entry Offer → High-Ticket Ascension",
    tag: "CSC",
    tagColor: "from-amber-500/20 to-amber-600/20",
    roasValue: "44.7x",
    metrics: [
      { label: "Ad Spend", value: "$3,000" },
      { label: "Entry Offer Starts", value: "31" },
      { label: "Upsells to Veneers", value: "9" },
      { label: "Upsell Conversion Rate", value: "29%" },
      { label: "Average Veneer Case Value", value: "$14,900" },
      { label: "Upsell Revenue", value: "$134,100", highlight: true },
    ],
  },
];

const AnimatedNumber = ({ value, inView }: { value: string; inView: boolean }) => {
  const [displayValue, setDisplayValue] = useState(value);
  
  useEffect(() => {
    if (!inView) return;
    
    // Extract numeric part for animation
    const numericMatch = value.match(/[\d,]+\.?\d*/);
    if (!numericMatch) {
      setDisplayValue(value);
      return;
    }
    
    const numericPart = numericMatch[0].replace(/,/g, '');
    const targetNum = parseFloat(numericPart);
    const prefix = value.substring(0, value.indexOf(numericMatch[0]));
    const suffix = value.substring(value.indexOf(numericMatch[0]) + numericMatch[0].length);
    
    if (isNaN(targetNum)) {
      setDisplayValue(value);
      return;
    }
    
    let startTime: number;
    const duration = 1500;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = targetNum * easeOut;
      
      // Format with commas if original had them
      let formatted: string;
      if (value.includes(',')) {
        formatted = current.toLocaleString('en-US', {
          minimumFractionDigits: value.includes('.') ? 2 : 0,
          maximumFractionDigits: value.includes('.') ? 2 : 0,
        });
      } else if (value.includes('.')) {
        formatted = current.toFixed(2);
      } else {
        formatted = Math.round(current).toString();
      }
      
      setDisplayValue(prefix + formatted + suffix);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value, inView]);
  
  return <span>{displayValue}</span>;
};

const CaseStudyCard = ({ study, index }: { study: CaseStudy; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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
      className={`group relative bg-gradient-to-br from-card/80 to-card border border-border/30 rounded-sm overflow-hidden transition-all duration-700 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Header */}
      <div className="relative p-6 pb-4 border-b border-border/30">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className={`inline-block px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium rounded-full bg-gradient-to-r ${study.tagColor} text-foreground/80 mb-3`}>
              {study.tag}
            </span>
            <h3 className="font-display text-lg md:text-xl font-medium text-foreground leading-tight">
              {study.title}
            </h3>
          </div>
          
          {study.roasValue && (
            <div className="flex-shrink-0 text-right">
              <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-1">ROAS</div>
              <div className="font-display text-2xl md:text-3xl font-light text-primary">
                <AnimatedNumber value={study.roasValue} inView={isVisible} />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Metrics */}
      <div className="relative p-6 space-y-3">
        {study.metrics.map((metric, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-between py-2 ${
              metric.highlight 
                ? 'bg-gradient-to-r from-primary/10 to-transparent -mx-6 px-6 border-l-2 border-primary' 
                : 'border-b border-border/20 last:border-0'
            }`}
          >
            <span className={`text-sm ${metric.highlight ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              {metric.label}
            </span>
            <span className={`font-display text-base md:text-lg ${
              metric.highlight 
                ? 'text-primary font-medium' 
                : 'text-foreground'
            }`}>
              <AnimatedNumber value={metric.value} inView={isVisible} />
            </span>
          </div>
        ))}
      </div>
      
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

const AdCaseStudiesSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    
    if (headerRef.current) {
      observer.observe(headerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 max-w-7xl relative">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 md:mb-20 transition-all duration-1000 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-primary/70 mb-4 flex items-center justify-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Growth Metrics
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-6">
            When <span className="text-primary">Strategy</span> Meets <span className="text-primary">Scale</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Documented results from brand-led advertising. Strictly numbers. No narrative.
          </p>
        </div>

        {/* Stats bar */}
        <div 
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 transition-all duration-1000 delay-200 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            { label: "Combined Revenue", value: "$6.6M+", icon: <DollarSign className="w-5 h-5" /> },
            { label: "Average ROAS", value: "72.4x", icon: <TrendingUp className="w-5 h-5" /> },
            { label: "Total Leads", value: "5,700+", icon: <Users className="w-5 h-5" /> },
            { label: "Cases Closed", value: "550+", icon: <Target className="w-5 h-5" /> },
          ].map((stat, idx) => (
            <div 
              key={idx} 
              className="bg-card/50 border border-border/30 rounded-sm p-4 md:p-6 text-center group hover:border-primary/30 transition-colors"
            >
              <div className="flex justify-center mb-2 text-primary/60 group-hover:text-primary transition-colors">
                {stat.icon}
              </div>
              <div className="font-display text-2xl md:text-3xl font-light text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={index} study={study} index={index} />
          ))}
        </div>

        {/* Footer note */}
        <div 
          className={`mt-16 text-center transition-all duration-1000 delay-500 ${
            headerVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Results vary by market, execution, and commitment. All metrics represent documented client 
            outcomes using PASTED's integrated brand + paid acquisition methodology.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AdCaseStudiesSection;
