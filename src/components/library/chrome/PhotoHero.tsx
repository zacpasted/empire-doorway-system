import type { ZoneDef } from "@/data/library-zones";
import { HeroAtmosphere } from "@/components/library/HeroAtmosphere";

type Props = { zone: ZoneDef };

export const PhotoHero = ({ zone }: Props) => {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: "16 / 6", background: "#14100C" }}
    >
      <img
        src={zone.hero}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          filter: "brightness(0.55) contrast(1.05) saturate(0.9) sepia(0.08)",
          animation: "lib-hero-breathe 12s ease-in-out infinite alternate",
        }}
      />
      {/* depth gradient */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,16,12,0.45) 0%, rgba(20,16,12,0) 40%, rgba(20,16,12,0.85) 100%)",
        }}
      />
      {/* film grain */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.06,
          mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      {/* candle glow + drifting dust */}
      <HeroAtmosphere />
      {/* Inlaid zone title — lower left, Cormorant italic */}
      <div className="absolute left-6 md:left-10 bottom-14 md:bottom-16">
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(28px, 4.2vw, 46px)",
            color: "#F4F1EC",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            margin: 0,
            textShadow: "0 2px 18px rgba(10,10,10,0.55), 0 1px 2px rgba(10,10,10,0.4)",
          }}
        >
          {zone.label}.
        </h1>
        <div
          className="mt-2 max-w-[34ch]"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: "italic",
            fontSize: 15,
            color: "rgba(244,241,236,0.78)",
            lineHeight: 1.4,
            textShadow: "0 1px 8px rgba(10,10,10,0.6)",
          }}
        >
          {zone.subtitle}
        </div>
      </div>
      {/* Label inset bottom-left */}
      <div
        className="absolute bottom-5 right-6 md:right-10 flex items-center gap-3"
        style={{
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 11,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#D4B57A",
          textShadow: "0 1px 8px rgba(10,10,10,0.6)",
        }}
      >
        <span>{zone.label}</span>
        <span aria-hidden style={{ color: "rgba(201,169,110,0.5)" }}>·</span>
        <span className="lib-hero-live-dot" aria-hidden />
        <span>Live</span>
        <span aria-hidden style={{ color: "rgba(201,169,110,0.5)" }}>·</span>
        <span>{zone.totalCount} entries</span>
      </div>
      <style>{`@keyframes lib-hero-breathe { 0% { transform: scale(1); } 100% { transform: scale(1.03); } }`}</style>
    </div>
  );
};

export default PhotoHero;