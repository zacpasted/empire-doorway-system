import { useRef, useState, useEffect, memo } from "react";
import { motion, useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const useCounter = (end: number, duration: number, isInView: boolean, delay: number) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * end));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [end, duration, isInView, delay]);
  return count;
};

const METRICS = [
  { label: "Aesthetic Revenue", numValue: 100, prefix: "$", suffix: "M+", barWidth: 95 },
  { label: "Clinics Scaled to 8 Figures", numValue: 41, prefix: "", suffix: "+", barWidth: 100 },
  { label: "Retention", numValue: 97, prefix: "", suffix: "%", barWidth: 97 },
  { label: "Practices/yr", numValue: 30, prefix: "", suffix: "", barWidth: 88 },
];

const MetricCard = memo(({ metric, index, isInView }: { metric: typeof METRICS[0]; index: number; isInView: boolean }) => {
  const count = useCounter(metric.numValue, 1.8, isInView, 0.15 * index);
  return (
    <motion.div
      className="relative cursor-default"
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, delay: index * 0.15 }}
      whileHover={{ y: -3, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
      whileTap={{ scale: 0.97, transition: { duration: 0.15 } }}
    >
      <motion.div
        className="text-2xl font-serif font-bold mb-0.5 leading-none"
        style={{ color: '#F5F0E8' }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.1 + index * 0.15 }}
      >
        {metric.prefix}{count}{metric.suffix}
      </motion.div>
      <p className="text-[10px] uppercase tracking-wider mb-1.5" style={{ color: 'rgba(245,240,232,0.45)' }}>
        {metric.label}
      </p>
      <div className="h-0.5 bg-border/30 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary/60 to-primary/30 rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${metric.barWidth}%` } : {}}
          transition={{ duration: 1.2, delay: 0.2 + index * 0.15, ease: [0.22, 1, 0.36, 1] as const }}
        />
      </div>
    </motion.div>
  );
});
MetricCard.displayName = "MetricCard";

const MetricsBar = memo(() => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div ref={ref} className="max-w-md mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] font-sans">
          {METRICS.map((m, i) => (
            <span key={m.label} className="whitespace-nowrap">
              <span className="text-primary font-bold">{m.prefix}{m.numValue}{m.suffix}</span>
              <span style={{ color: 'rgba(245,240,232,0.5)' }}> {m.label}</span>
              {i < METRICS.length - 1 && <span style={{ color: 'rgba(245,240,232,0.2)' }}> ·</span>}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="max-w-3xl mx-auto">
      <div className="grid grid-cols-4 gap-6">
        {METRICS.map((metric, index) => (
          <MetricCard key={metric.label} metric={metric} index={index} isInView={isInView} />
        ))}
      </div>
    </div>
  );
});

MetricsBar.displayName = "MetricsBar";
export default MetricsBar;
