import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
};

const sizeMap = {
  sm: "text-2xl md:text-3xl",
  md: "text-3xl md:text-4xl",
  lg: "text-4xl md:text-5xl",
  xl: "text-5xl md:text-7xl",
};

export const HeroQuote = ({ children, className, size = "lg" }: Props) => (
  <p className={cn("lib-editorial", sizeMap[size], className)}>{children}</p>
);

export default HeroQuote;