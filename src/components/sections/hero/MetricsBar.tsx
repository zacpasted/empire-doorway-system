import { useRef, useState, useMemo, useEffect, memo } from "react";
import { motion, useInView } from "framer-motion";

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

const MetricsBar = memo(() => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const metrics = useMemo(() => [
    { label: "Aesthetic Revenue Generated", numValue: 100, prefix: "$", suffix: "M+", barWidth: 95 },
    { label: "Practices Accepted / Year", numValue: 30, prefix: "", suffix: "", barWidth: 100 },
    { label: "Avg Revenue Added / Partner", numValue: 500, prefix: "$", suffix: "K+", barWidth: 88 },
    { label: "Client Retention", numValue: 97, prefix: "", suffix: "%", barWidth: 97 },
  ], []);

  return (
    <div ref={ref} className="max-w-3xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {metrics.map((metric, index) => {
          const count = useCounter(metric.numValue, 1.2, isInView, 0.1 + index * 0.05);
          return (
            <motion.div
              key={metric.label}
              className="relative"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <motion.div
                className="text-xl md:text-2xl font-serif font-bold text-foreground mb-0.5"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
              >
                {metric.prefix}{count}{metric.suffix}
              </motion.div>
              <p className="text-[9px] md:text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-1.5">
                {metric.label}
              </p>
              <div className="h-0.5 bg-border/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary/60 to-primary/30 rounded-full"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${metric.barWidth}%` } : {}}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
});

MetricsBar.displayName = "MetricsBar";
export default MetricsBar;
