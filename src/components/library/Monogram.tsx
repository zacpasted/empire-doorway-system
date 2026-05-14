import { cn } from "@/lib/utils";

type Props = {
  size?: number;
  variant?: "gold-on-charcoal" | "charcoal-on-bone" | "gold-on-bone";
  className?: string;
};

export const Monogram = ({ size = 32, variant = "gold-on-charcoal", className }: Props) => {
  const fill =
    variant === "charcoal-on-bone"
      ? "#0A0A0A"
      : variant === "gold-on-bone"
        ? "#C9A96E"
        : "#C9A96E";
  const bg =
    variant === "charcoal-on-bone"
      ? "transparent"
      : variant === "gold-on-bone"
        ? "transparent"
        : "#0A0A0A";
  const stroke = variant === "gold-on-charcoal" ? "#C9A96E" : fill;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block select-none", className)}
      aria-label="The PASTED Library"
    >
      <circle cx="32" cy="32" r="30" fill={bg} stroke={stroke} strokeWidth="1.25" />
      <text
        x="50%"
        y="54%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="'Playfair Display', Georgia, serif"
        fontStyle="italic"
        fontWeight={400}
        fontSize="36"
        fill={fill}
      >
        P
      </text>
    </svg>
  );
};

export default Monogram;