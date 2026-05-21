import { cn } from "@/lib/utils";
import { PMonogram } from "@/components/library/PMonogram";

type Props = {
  size?: number;
  variant?: "gold-on-charcoal" | "charcoal-on-bone" | "gold-on-bone";
  className?: string;
};

export const Monogram = ({ size = 32, variant = "gold-on-charcoal", className }: Props) => {
  const fill =
    variant === "charcoal-on-bone" ? "#0A0A0A" : "#C9A96E";
  const bg = variant === "gold-on-charcoal" ? "#0A0A0A" : "transparent";
  return (
    <span
      className={cn("inline-flex items-center justify-center select-none", className)}
      style={{ width: size, height: size, background: bg, borderRadius: 999 }}
      aria-label="The PASTED Library"
      role="img"
    >
      <PMonogram size={Math.round(size * 0.86)} color={fill} />
    </span>
  );
};

export default Monogram;