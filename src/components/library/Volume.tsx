import { useEffect, useRef, useState } from "react";

export type VolumeData = {
  id: string;
  number: string; // "I", "II" or "01"
  title: string;
  year: string;
  shade: number; // 0..4 — 5 curated shades
  binding: number[]; // y positions (0..1) of irregular middle bands
};

const SHADES = ["#0A0A0A", "#111110", "#15130F", "#0E0D0B", "#1A1714"];

type Props = {
  v: VolumeData;
  active: boolean;
  dimmed: boolean;
  leanDir: 0 | -1 | 1; // adjacent lean
  hovered: boolean;
  candleBoost: number; // 0..1 proximity to cursor
  onHover: (v: VolumeData | null) => void;
  onClick: (v: VolumeData) => void;
};

export const Volume = ({ v, active, dimmed, leanDir, hovered, candleBoost, onHover, onClick }: Props) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const lift = hovered ? -8 : 0;
  const lean = leanDir * 2.5;
  const opacity = dimmed ? 0.3 : 1;
  // candle: brighten background subtly
  const brighten = Math.min(0.05, candleBoost * 0.05);

  return (
    <button
      ref={ref}
      data-volume-id={v.id}
      onMouseEnter={() => onHover(v)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(v)}
      className="relative shrink-0 outline-none focus-visible:ring-0"
      style={{
        width: 88,
        height: 400,
        transform: `translateY(${lift}px) rotate(${lean}deg)`,
        transformOrigin: "bottom center",
        opacity,
        transition: "transform 800ms cubic-bezier(0.22,1,0.36,1), opacity 600ms ease",
        willChange: "transform",
      }}
      aria-label={`Volume ${v.number} — ${v.title}, ${v.year}`}
    >
      {/* Spine body */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${SHADES[v.shade]} 0%, ${SHADES[v.shade]} 100%)`,
          boxShadow: `inset 1px 0 0 rgba(255,255,255,0.03), inset -1px 0 0 rgba(0,0,0,0.6), 0 ${hovered ? 14 : 6}px 24px -12px rgba(0,0,0,0.9)`,
          filter: `brightness(${1 + brighten})`,
        }}
      />
      {/* Hover gold rim light */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: hovered ? "inset 0 0 0 1px rgba(201,169,110,0.4)" : "inset 0 0 0 1px rgba(201,169,110,0)",
          transition: "box-shadow 800ms ease",
        }}
      />
      {/* Top hairline */}
      <div className="absolute left-2 right-2 top-3 h-px" style={{ background: "rgba(201,169,110,0.55)" }} />
      {/* Foot hairline */}
      <div className="absolute left-2 right-2 bottom-3 h-px" style={{ background: "rgba(201,169,110,0.55)" }} />
      {/* Irregular middle bands */}
      {v.binding.map((y, i) => (
        <div
          key={i}
          className="absolute left-3 right-3 h-px"
          style={{ top: `${y * 100}%`, background: "rgba(201,169,110,0.28)" }}
        />
      ))}
      {/* Spine text — vertical */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-between py-7"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            letterSpacing: "0.18em",
            color: "rgba(201,169,110,0.7)",
          }}
        >
          VOL. {v.number}
        </span>
        <span
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 300,
            fontSize: 14,
            letterSpacing: "0.02em",
            color: "#F4F1EC",
            opacity: 0.92,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxHeight: 240,
          }}
        >
          {v.title}
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            letterSpacing: "0.18em",
            color: "rgba(201,169,110,0.6)",
          }}
        >
          {v.year}
        </span>
      </div>
      {!mounted && null}
    </button>
  );
};

export default Volume;