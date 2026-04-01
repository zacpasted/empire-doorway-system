import { motion } from "framer-motion";

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

/** 30 partnerships/year ≈ 7–8 per quarter. Hardcoded quarterly availability. */
const SLOTS_PER_QUARTER = 8;

function getCurrentQuarter(): { label: string; remaining: number } {
  const now = new Date();
  const month = now.getMonth(); // 0-indexed
  const quarter = Math.floor(month / 3) + 1;
  const quarterLabels = ["Q1", "Q2", "Q3", "Q4"];

  // Simulate fill rate: later in the quarter → fewer slots
  const monthInQuarter = month % 3; // 0, 1, 2
  const dayOfMonth = now.getDate();
  const progressInQuarter = (monthInQuarter * 30 + dayOfMonth) / 90;
  
  // Deterministic "remaining" based on progress through the quarter
  const filled = Math.floor(progressInQuarter * SLOTS_PER_QUARTER * 0.85);
  const remaining = Math.max(1, SLOTS_PER_QUARTER - filled);

  return {
    label: `${quarterLabels[quarter - 1]} ${now.getFullYear()}`,
    remaining,
  };
}

interface AvailabilityIndicatorProps {
  variant?: "inline" | "card";
  className?: string;
  delay?: number;
}

const AvailabilityIndicator = ({ variant = "inline", className = "", delay = 0 }: AvailabilityIndicatorProps) => {
  const { label, remaining } = getCurrentQuarter();
  const fillPercent = ((SLOTS_PER_QUARTER - remaining) / SLOTS_PER_QUARTER) * 100;
  const isLow = remaining <= 3;

  if (variant === "inline") {
    return (
      <motion.div
        className={`flex items-center justify-center gap-2 ${className}`}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay, ease: APPLE_EASE }}
      >
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isLow ? 'bg-amber-400' : 'bg-emerald-400'}`} />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${isLow ? 'bg-amber-400' : 'bg-emerald-400'}`} />
        </span>
        <span className="text-[10px] md:text-xs tracking-wide text-muted-foreground">
          <span className="font-semibold text-foreground/80">{remaining} spot{remaining !== 1 ? 's' : ''}</span>
          {' '}remaining for {label}
        </span>
      </motion.div>
    );
  }

  // Card variant — for sections like TheOfferSection
  return (
    <motion.div
      className={`text-center ${className}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: APPLE_EASE }}
    >
      <div className="inline-flex flex-col items-center gap-2.5 px-6 py-4 rounded-lg border border-border/40 bg-card/30">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isLow ? 'bg-amber-400' : 'bg-emerald-400'}`} />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isLow ? 'bg-amber-400' : 'bg-emerald-400'}`} />
          </span>
          <span className="text-xs tracking-wider uppercase text-muted-foreground font-medium">
            {label} Availability
          </span>
        </div>
        {/* Progress bar */}
        <div className="w-40 h-1.5 bg-muted/30 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${isLow ? 'bg-amber-400/80' : 'bg-primary/60'}`}
            initial={{ width: 0 }}
            animate={{ width: `${fillPercent}%` }}
            transition={{ duration: 1.2, delay: delay + 0.3, ease: APPLE_EASE }}
          />
        </div>
        <p className="text-[11px] text-muted-foreground">
          <span className={`font-bold ${isLow ? 'text-amber-400' : 'text-foreground/80'}`}>{remaining}</span> of {SLOTS_PER_QUARTER} partnership slots remaining
        </p>
      </div>
    </motion.div>
  );
};

export default AvailabilityIndicator;
