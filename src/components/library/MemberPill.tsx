import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { PMonogram } from "./PMonogram";

const BONE = "#F4F1EC";
const CHARCOAL = "#0A0A0A";
const GOLD = "#C9A96E";
const GOLD_BRIGHT = "#D4A04F";
const CORMORANT = "'Cormorant Garamond', 'Playfair Display', Georgia, serif";
const MONO_FF = "'JetBrains Mono', ui-monospace, monospace";

interface MemberPillProps {
  name?: string;
  number?: string;
}

export const MemberPill = ({ name = "Guest", number = "0247" }: MemberPillProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Link
      to="/library/me"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed z-50 hidden md:inline-flex items-center gap-3"
      style={{
        right: 32,
        bottom: 32,
        height: 48,
        padding: "0 18px",
        borderRadius: 999,
        background: BONE,
        border: `1px solid ${hovered ? "rgba(201,169,110,0.7)" : "rgba(201,169,110,0.4)"}`,
        boxShadow: "0 8px 28px rgba(10,10,10,0.14)",
        transform: `translateY(${hovered ? -2 : 0}px) scale(${scrolled ? 0.92 : 1})`,
        opacity: scrolled ? 0.85 : 1,
        transformOrigin: "bottom right",
        transition: "transform 320ms cubic-bezier(0.22,1,0.36,1), opacity 320ms ease-out, border-color 200ms ease-out",
        color: CHARCOAL,
        textDecoration: "none",
      }}
    >
      <PMonogram size={22} color={GOLD_BRIGHT} />
      <span
        style={{
          fontFamily: CORMORANT,
          fontStyle: "italic",
          fontSize: 14,
          color: CHARCOAL,
          lineHeight: 1,
        }}
      >
        {name}
      </span>
      <span aria-hidden style={{ width: 4, height: 4, borderRadius: 999, background: GOLD }} />
      <span
        style={{
          fontFamily: MONO_FF,
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.16em",
          color: CHARCOAL,
        }}
      >
        № {number}
      </span>
      <ChevronRight size={14} strokeWidth={1.6} style={{ color: GOLD_BRIGHT, marginLeft: 2 }} />
    </Link>
  );
};

export default MemberPill;