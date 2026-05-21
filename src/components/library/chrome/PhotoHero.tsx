import type { ZoneDef } from "@/data/library-zones";

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
        style={{ filter: "brightness(0.5) contrast(1.05) saturate(0.85)" }}
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
      {/* Label inset bottom-left */}
      <div
        className="absolute bottom-5 left-6 md:left-10 flex items-center gap-3"
        style={{
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 11,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#C9A96E",
        }}
      >
        <span>{zone.label}</span>
        <span aria-hidden style={{ color: "rgba(201,169,110,0.5)" }}>·</span>
        <span className="lib-hero-live-dot" aria-hidden />
        <span>Live</span>
        <span aria-hidden style={{ color: "rgba(201,169,110,0.5)" }}>·</span>
        <span>{zone.totalCount} entries</span>
      </div>
    </div>
  );
};

export default PhotoHero;