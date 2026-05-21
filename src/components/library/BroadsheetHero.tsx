import broadsheetUrl from "@/assets/periodicals-broadsheet.jpg";

/**
 * The Periodicals hero: an aged broadsheet under candlelight, with a typeset
 * masthead overlaid in our own typography (avoids generated gibberish text).
 */
export const BroadsheetHero = () => {
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        height: "clamp(420px, 62vh, 720px)",
        backgroundColor: "#1A0C08",
      }}
    >
      <img
        src={broadsheetUrl}
        alt=""
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.78) contrast(1.05) blur(1.5px)" }}
        decoding="async"
      />
      {/* dark vignette so AI text in image is unreadable */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 55%, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.75) 80%)",
        }}
      />
      {/* candlelight wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 10% 30%, rgba(232,168,90,0.20) 0%, transparent 45%)",
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

      {/* Editorial masthead overlay */}
      <div className="absolute inset-0 flex flex-col">
        <div className="px-6 md:px-12 pt-10 md:pt-14 text-center">
          <div
            style={{
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 10,
              letterSpacing: "0.34em",
              textTransform: "uppercase",
              color: "rgba(212,181,122,0.85)",
            }}
          >
            Room III · The Periodicals
          </div>
          <h1
            className="mt-3"
            style={{
              fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
              fontWeight: 500,
              fontStyle: "italic",
              fontSize: "clamp(40px, 7vw, 96px)",
              lineHeight: 0.98,
              color: "#F4F1EC",
              letterSpacing: "-0.01em",
              textShadow: "0 2px 28px rgba(0,0,0,0.7)",
            }}
          >
            The Broadsheet
          </h1>
          <div
            className="mt-3 mx-auto flex items-center justify-center gap-4 max-w-[640px]"
            style={{
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 10,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(244,241,236,0.7)",
            }}
          >
            <span style={{ flex: 1, height: 1, background: "rgba(212,181,122,0.45)" }} />
            <span>Vol. III · {today}</span>
            <span style={{ flex: 1, height: 1, background: "rgba(212,181,122,0.45)" }} />
          </div>
        </div>

        <div className="flex-1 flex items-end">
          <div className="w-full px-6 md:px-12 pb-10 md:pb-14 text-center">
            <p
              className="mx-auto max-w-[640px]"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(16px, 1.6vw, 22px)",
                lineHeight: 1.5,
                color: "rgba(244,241,236,0.86)",
              }}
            >
              Essays, dispatches and field notes from the desk. Printed weekly. Read once.
            </p>
            <div
              className="mt-4"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                fontSize: 13,
                color: "rgba(212,181,122,0.78)",
              }}
            >
              — Z.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BroadsheetHero;