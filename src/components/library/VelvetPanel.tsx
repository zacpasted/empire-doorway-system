import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  tone?: "ink" | "forest";
};

/**
 * Full-bleed velvet wrapper. CSS-only — radial vignette + grain on a deep base.
 */
export const VelvetPanel = ({ children, className, tone = "ink" }: Props) => {
  const base = tone === "forest" ? "#1E2A22" : "#14110F";
  const lift = tone === "forest" ? "#2A3A30" : "#221C18";
  return (
    <div
      className={`relative overflow-hidden ${className ?? ""}`}
      style={{
        background: `radial-gradient(ellipse at 50% 40%, ${lift} 0%, ${base} 55%, #060504 100%)`,
      }}
    >
      {/* velvet pile — vertical streaks */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0) 2px, rgba(0,0,0,0.05) 4px)",
        }}
      />
      {/* film grain */}
      <div className="absolute inset-0 lib-grain pointer-events-none" />
      {/* vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 240px 60px rgba(0,0,0,0.65)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default VelvetPanel;