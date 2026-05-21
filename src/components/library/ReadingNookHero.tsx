import chairUrl from "@/assets/reading-room-chair.jpg";
import { useMember } from "@/hooks/useMember";

/**
 * The Reading Room hero: a personal nook. The member's own wing chair,
 * a Bankers lamp pool of light, a book left open from last time.
 * Greets the member by name; signed by the proprietor.
 */
export const ReadingNookHero = () => {
  const { member } = useMember();
  const name = member?.first_name?.trim();

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        height: "clamp(420px, 62vh, 720px)",
        backgroundColor: "#160A06",
      }}
    >
      <style>{`
        @keyframes lib-lamp-breathe {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 0.78; }
        }
        @keyframes lib-candle-flicker {
          0%, 100% { opacity: 0.9; transform: scale(1); }
          47% { opacity: 0.75; transform: scale(0.98); }
          71% { opacity: 1; transform: scale(1.02); }
        }
      `}</style>

      <img
        src={chairUrl}
        alt=""
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.84) contrast(1.04) saturate(0.96)" }}
        decoding="async"
      />

      {/* lamp pool glow */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          left: "22%",
          top: "30%",
          width: 380,
          height: 380,
          background:
            "radial-gradient(circle, rgba(122,210,140,0.28) 0%, rgba(122,210,140,0.0) 60%)",
          animation: "lib-lamp-breathe 4.6s ease-in-out infinite",
          mixBlendMode: "screen",
        }}
      />

      {/* candle flicker right */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          right: "8%",
          top: "32%",
          width: 160,
          height: 160,
          background:
            "radial-gradient(circle, rgba(232,168,90,0.35) 0%, transparent 65%)",
          animation: "lib-candle-flicker 5.2s ease-in-out infinite",
          mixBlendMode: "screen",
        }}
      />

      {/* vignette */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 60% 55%, transparent 35%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* grain */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />

      {/* greeting block */}
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
            Room IV · The Reading Room
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
              textShadow: "0 2px 24px rgba(0,0,0,0.6)",
              maxWidth: 760,
            }}
          >
            {name ? <>The chair is yours, {name}.</> : <>Your chair, kept warm.</>}
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
            What you’ve taken down. What you’ve set aside. What the proprietor is holding for you next.
          </p>
          <div
            className="mt-5"
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
    </section>
  );
};

export default ReadingNookHero;