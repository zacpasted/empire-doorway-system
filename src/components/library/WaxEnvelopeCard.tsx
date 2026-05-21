import envelopeImg from "@/assets/vault-envelope-sealed.jpg";

export type EnvelopeState = "soon" | "now" | "past";

type Props = {
  state: EnvelopeState;
  title: string;        // for "soon", first letter shown, rest as em-dashes
  meta: string;         // e.g. "OPENS FRI · NOON" / "OPENED 14 NOV" / "SEALED 09 SEPT · OPENED 12 SEPT"
  cta?: string;         // overrides default
  onClick?: () => void;
};

const MONO = {
  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
  textTransform: "uppercase" as const,
  letterSpacing: "0.22em",
  fontSize: 10,
};

const CORM = {
  fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
  fontStyle: "italic" as const,
  fontWeight: 400,
  lineHeight: 1.05,
  letterSpacing: "-0.01em",
};

function redact(title: string): string {
  // Reveal first letter of each word, em-dash the rest. Keep word breaks.
  return title
    .split(/(\s+)/)
    .map((tok) => {
      if (/^\s+$/.test(tok)) return tok;
      if (tok.length === 0) return tok;
      const first = tok[0];
      return first + "—".repeat(Math.max(0, tok.length - 1));
    })
    .join("");
}

export const WaxEnvelopeCard = ({ state, title, meta, cta, onClick }: Props) => {
  const isPast = state === "past";
  const isNow = state === "now";
  const isSoon = state === "soon";
  const displayTitle = isSoon ? redact(title) : title;
  const defaultCta =
    state === "soon" ? "Witness the Opening" : state === "now" ? "Take it With You" : "View Record";

  return (
    <a
      href="#"
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className="relative block group overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgba(28,10,12,0.5) 0%, rgba(20,8,10,0.7) 100%)",
        border: `1px solid ${isNow ? "rgba(212,181,122,0.7)" : "rgba(201,169,110,0.28)"}`,
        borderRadius: 4,
        boxShadow: isNow
          ? "0 10px 36px rgba(0,0,0,0.55), inset 0 1px 0 rgba(212,181,122,0.25)"
          : "0 6px 24px rgba(0,0,0,0.45)",
        opacity: isPast ? 0.65 : 1,
        transition: "transform 240ms ease-out, border-color 240ms ease-out, opacity 240ms ease-out",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.borderColor = "rgba(212,181,122,0.85)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = isNow
          ? "rgba(212,181,122,0.7)"
          : "rgba(201,169,110,0.28)";
      }}
    >
      {/* Envelope image — letterboxed, with the wax seal glow-breathing */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "5/4" }}>
        <img
          src={envelopeImg}
          alt=""
          aria-hidden
          loading="lazy"
          className="w-full h-full object-cover"
          style={{
            filter: isPast
              ? "grayscale(0.4) brightness(0.7)"
              : isNow
              ? "brightness(1.05) contrast(1.05)"
              : "brightness(0.92)",
          }}
        />
        {/* Seal breathe glow centered */}
        {!isPast && (
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              left: "50%",
              top: "52%",
              width: 180,
              height: 180,
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle, rgba(212,181,122,0.35) 0%, rgba(212,181,122,0.08) 40%, transparent 70%)",
              animation: "lib-wax-breathe 4s ease-in-out infinite",
              mixBlendMode: "screen",
              filter: "blur(8px)",
            }}
          />
        )}
        {/* Open-seal hint for "now": faint crack of light at the bottom */}
        {isNow && (
          <div
            aria-hidden
            className="absolute left-0 right-0 bottom-0"
            style={{
              height: 28,
              background:
                "linear-gradient(0deg, rgba(212,181,122,0.35) 0%, transparent 100%)",
              mixBlendMode: "screen",
            }}
          />
        )}
      </div>

      {/* Caption block */}
      <div className="p-6 md:p-8">
        <div
          style={{
            ...MONO,
            color: isNow ? "#D4B57A" : "rgba(201,169,110,0.7)",
          }}
        >
          {meta}
        </div>
        <div
          className="mt-3"
          style={{
            ...CORM,
            fontSize: "clamp(22px, 2.4vw, 30px)",
            color: isNow ? "#F4F1EC" : "#E8DEC9",
          }}
        >
          {displayTitle}
        </div>

        {!isPast && (
          <div
            className="mt-6 inline-flex items-center gap-3 px-4 py-2.5"
            style={{
              border: "1px solid rgba(201,169,110,0.55)",
              borderRadius: 3,
              color: "#D4B57A",
              ...MONO,
              transition: "background 200ms ease-out, color 200ms ease-out",
            }}
          >
            <span>{cta ?? defaultCta}</span>
            <span aria-hidden>→</span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes lib-wax-breathe {
          0%, 100% { opacity: 0.55; transform: translate(-50%, -50%) scale(0.98); }
          50%      { opacity: 1;    transform: translate(-50%, -50%) scale(1.04); }
        }
      `}</style>
    </a>
  );
};

export default WaxEnvelopeCard;