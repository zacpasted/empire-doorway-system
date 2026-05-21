type Props = {
  kicker: string;          // ESSAY · 9 MIN
  title: string;           // Why we close the door.
  dropCapBody: string;     // first paragraph, first letter rendered as drop cap
  pullquote?: string;
  byline: string;
};

/**
 * A single broadsheet essay rendered with a true drop cap, a centred
 * pullquote rule, and editorial typography. The "above the fold" feature.
 */
export const BroadsheetFeature = ({
  kicker,
  title,
  dropCapBody,
  pullquote,
  byline,
}: Props) => {
  const first = dropCapBody.charAt(0);
  const rest = dropCapBody.slice(1);

  return (
    <article
      className="w-full"
      style={{
        background:
          "linear-gradient(180deg, #F7F1E2 0%, #EFE6CF 100%)",
        border: "1px solid rgba(120,90,40,0.35)",
        boxShadow:
          "inset 0 1px 0 rgba(255,250,235,0.7), 0 18px 40px rgba(0,0,0,0.35)",
        padding: "clamp(24px, 4vw, 56px)",
        color: "#1A140E",
      }}
    >
      <div
        className="text-center"
        style={{
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 10,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#7A4E1C",
        }}
      >
        {kicker}
      </div>
      <h2
        className="text-center mt-3 mx-auto"
        style={{
          fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
          fontStyle: "italic",
          fontWeight: 500,
          fontSize: "clamp(28px, 4.2vw, 52px)",
          lineHeight: 1.05,
          maxWidth: 760,
          color: "#1A140E",
        }}
      >
        {title}
      </h2>

      {/* ornament rule */}
      <div className="mx-auto mt-5 mb-6 flex items-center justify-center gap-3" style={{ maxWidth: 320 }}>
        <span style={{ flex: 1, height: 1, background: "rgba(120,90,40,0.45)" }} />
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#B8924F" }} />
        <span style={{ flex: 1, height: 1, background: "rgba(120,90,40,0.45)" }} />
      </div>

      <div
        className="mx-auto"
        style={{
          maxWidth: 680,
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(16px, 1.4vw, 19px)",
          lineHeight: 1.65,
          color: "#231A12",
          textAlign: "justify",
          hyphens: "auto",
        }}
      >
        <p>
          <span
            style={{
              float: "left",
              fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
              fontWeight: 600,
              fontSize: "clamp(56px, 7vw, 86px)",
              lineHeight: 0.85,
              padding: "6px 10px 0 0",
              color: "#7A1F1F",
            }}
          >
            {first}
          </span>
          {rest}
        </p>

        {pullquote && (
          <blockquote
            className="my-8 mx-auto text-center"
            style={{
              maxWidth: 540,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(20px, 2.2vw, 28px)",
              lineHeight: 1.35,
              color: "#3A1F10",
              borderTop: "1px solid rgba(120,90,40,0.45)",
              borderBottom: "1px solid rgba(120,90,40,0.45)",
              padding: "16px 8px",
            }}
          >
            “{pullquote}”
          </blockquote>
        )}
      </div>

      <div
        className="text-center mt-6"
        style={{
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 10,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "#7A4E1C",
        }}
      >
        {byline}
      </div>
    </article>
  );
};

export default BroadsheetFeature;