import shelfWallUrl from "@/assets/stacks-shelf-wall.jpg";

/**
 * The Stacks hero: floor-to-ceiling walnut shelf wall, briefcases as objects,
 * a brass catalogue cabinet anchoring the foreground. Candlelit, oxblood, warm.
 */
export const StacksShelfWallHero = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        height: "clamp(420px, 62vh, 720px)",
        backgroundColor: "#1A0C08",
      }}
    >
      <style>{`
        @keyframes lib-stacks-flicker {
          0%, 100% { opacity: 0.92; }
          47% { opacity: 0.78; }
          53% { opacity: 1; }
          71% { opacity: 0.86; }
        }
      `}</style>

      <img
        src={shelfWallUrl}
        alt=""
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          filter: "brightness(0.86) contrast(1.06) saturate(0.95)",
          animation: "lib-stacks-flicker 5.4s ease-in-out infinite",
        }}
        decoding="async"
      />

      {/* Vignette + candlelight wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 70%, rgba(232,168,90,0.18) 0%, transparent 55%), radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Grain */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />

      {/* Title block — bottom-left, editorial */}
      <div className="absolute inset-0 flex items-end">
        <div className="w-full px-6 md:px-12 pb-10 md:pb-14">
          <div
            style={{
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 10,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "rgba(212,181,122,0.85)",
            }}
          >
            Room II · The Stacks
          </div>
          <h1
            className="mt-3"
            style={{
              fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(34px, 5.4vw, 68px)",
              lineHeight: 1.02,
              color: "#F4F1EC",
              textShadow: "0 2px 24px rgba(0,0,0,0.55)",
              maxWidth: 720,
            }}
          >
            The briefcases. Catalogued.
          </h1>
          <p
            className="mt-4 max-w-[520px]"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(15px, 1.4vw, 18px)",
              lineHeight: 1.55,
              color: "rgba(244,241,236,0.78)",
            }}
          >
            Every framework, script and deck the proprietor has used in the room. Take one down. Read it tonight.
          </p>
          <div
            className="mt-5"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              fontSize: 13,
              color: "rgba(212,181,122,0.75)",
            }}
          >
            — Z.
          </div>
        </div>
      </div>
    </section>
  );
};

export default StacksShelfWallHero;