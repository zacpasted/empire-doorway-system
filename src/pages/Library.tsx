import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import heroStacks from "@/assets/library-hero-stacks.jpg";
import figureBW from "@/assets/library-figure-bw.jpg";
import portraitBW from "@/assets/library-portrait-bw.jpg";
import buildingLine from "@/assets/library-building-line.jpg";
import thumb1 from "@/assets/library-thumb-1.jpg";
import thumb2 from "@/assets/library-thumb-2.jpg";
import thumb3 from "@/assets/library-thumb-3.jpg";
import thumb4 from "@/assets/library-thumb-4.jpg";

/**
 * THE PASTED LIBRARY — Atrium
 * Editorial panel composition (Lovebirdie-style) cast in PASTED palette.
 * Centered frame, stacked panels divided by brass hairlines, on the night ground.
 */

const FONT_LINK_ID = "library-fonts";
const ensureFonts = () => {
  if (document.getElementById(FONT_LINK_ID)) return;
  const link = document.createElement("link");
  link.id = FONT_LINK_ID;
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Inter:wght@400;500&family=Pinyon+Script&display=swap";
  document.head.appendChild(link);
};

const NIGHT = "#1A1410";
const CREAM = "#F5EEDC";
const CREAM_DEEP = "#EFE6CF";
const CREAM_QUIET = "rgba(26, 20, 16, 0.62)";
const INK = "#1A1410";
const BRASS = "#B8954C";
const HAIR = "rgba(26, 20, 16, 0.16)";

const CORMORANT = "'Cormorant Garamond', Georgia, 'Times New Roman', serif";
const SCRIPT = "'Pinyon Script', 'Cormorant Garamond', cursive";
const INTER = "Inter, system-ui, -apple-system, sans-serif";
const FEATURES = '"liga","dlig","swsh","salt","kern"';
const EASE = [0.16, 1, 0.3, 1] as const;

const mono = {
  fontFamily: INTER,
  fontWeight: 500 as const,
  fontSize: 10,
  letterSpacing: "0.32em",
  textTransform: "uppercase" as const,
};

/* Diamond emblem with wordmark */
const Emblem = () => (
  <div
    style={{
      position: "relative",
      width: 280,
      height: 168,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
    aria-hidden="true"
  >
    <svg viewBox="0 0 280 168" width="280" height="168" style={{ position: "absolute", inset: 0 }}>
      <polygon
        points="140,8 272,84 140,160 8,84"
        fill={CREAM}
        stroke={BRASS}
        strokeWidth="1.2"
      />
      <polygon
        points="140,16 264,84 140,152 16,84"
        fill="none"
        stroke={BRASS}
        strokeWidth="0.5"
        opacity="0.55"
      />
    </svg>
    <div style={{ position: "relative", textAlign: "center", padding: "0 36px" }}>
      <div
        style={{
          ...mono,
          color: BRASS,
          fontSize: 9,
          letterSpacing: "0.42em",
          marginBottom: 6,
        }}
      >
        EST · MMXXVI
      </div>
      <div
        style={{
          fontFamily: SCRIPT,
          fontSize: 42,
          color: INK,
          lineHeight: 1,
          letterSpacing: "0.01em",
        }}
      >
        The Library
      </div>
      <div
        style={{
          fontFamily: CORMORANT,
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 13,
          color: BRASS,
          marginTop: 6,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
        }}
      >
        of PASTED
      </div>
    </div>
  </div>
);

const NAV_ITEMS = ["Stacks", "Reading Room", "Vault", "Cinema", "Periodicals"];

const TOP_NAV = [
  { label: "Atrium", to: "/library" },
  { label: "Stacks", to: "/library/stacks" },
  { label: "Reading Room", to: "/library/reading-room" },
  { label: "Vault", to: "/library/vault" },
  { label: "Cinema", to: "/library/cinema" },
  { label: "Periodicals", to: "/library/periodicals" },
  { label: "Apply", to: "/library/apply" },
];

/* Damask SVG ground used for the masthead band (Mansion-style). */
const DAMASK_BG =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'><g fill='none' stroke='%23B8954C' stroke-opacity='0.18' stroke-width='0.6'><path d='M80 4 C 110 30 110 60 80 80 C 50 60 50 30 80 4 Z'/><path d='M80 156 C 110 130 110 100 80 80 C 50 100 50 130 80 156 Z'/><path d='M4 80 C 30 50 60 50 80 80 C 60 110 30 110 4 80 Z'/><path d='M156 80 C 130 50 100 50 80 80 C 100 110 130 110 156 80 Z'/><circle cx='80' cy='80' r='2.2' fill='%23B8954C' fill-opacity='0.35' stroke='none'/></g></svg>\")";

const Library = () => {
  const reduced = useReducedMotion();

  useEffect(() => {
    ensureFonts();
    document.title = "The PASTED Library — A private canon on becoming undeniable";
    const desc =
      "A vault of work, given freely. A canon on becoming undeniable, from the studio at PASTED.";
    let tag = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!tag) {
      tag = document.createElement("meta");
      tag.name = "description";
      document.head.appendChild(tag);
    }
    tag.content = desc;
  }, []);

  const fade = (delay = 0) =>
    reduced
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: EASE },
        };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        background: NIGHT,
        color: CREAM,
        fontFamily: CORMORANT,
        fontFeatureSettings: FEATURES,
        padding: "56px 24px 80px",
      }}
    >
      <style>{`
        .lib-grain {
          position: fixed; inset: 0; z-index: 1; pointer-events: none;
          opacity: 0.07; mix-blend-mode: multiply;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
        }
        .lib-link {
          position: relative;
          color: ${INK};
          text-decoration: none;
          transition: color 200ms ease;
        }
        .lib-link:hover { color: ${BRASS}; }
        .lib-cta {
          display: inline-block;
          font-family: ${INTER};
          font-weight: 500;
          font-size: 10px;
          letter-spacing: 0.36em;
          text-transform: uppercase;
          color: ${INK};
          padding: 14px 0 10px;
          border: none;
          border-top: 1px solid ${BRASS};
          border-bottom: 1px solid ${BRASS};
          border-radius: 0;
          text-decoration: none;
          transition: color 200ms ease, border-color 200ms ease;
        }
        .lib-cta:hover { color: ${BRASS}; border-color: ${BRASS}; }
        .lib-cta--invite {
          display: inline-flex; align-items: baseline; gap: 10px;
          font-family: ${INTER}; font-weight: 500;
          font-size: 10px; letter-spacing: 0.36em; text-transform: uppercase;
          color: ${INK}; padding: 12px 0;
          border-top: 1px solid ${HAIR}; border-bottom: 1px solid ${HAIR};
          min-width: 220px; justify-content: space-between;
          text-decoration: none; transition: color 200ms ease, border-color 200ms ease;
        }
        .lib-cta--invite:hover { color: ${BRASS}; border-color: ${BRASS}; }
        .lib-cta--invite .mark { color: ${BRASS}; font-size: 9px; letter-spacing: 0.2em; }
        .lib-nav-item {
          font-family: ${INTER};
          font-weight: 500;
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: ${INK};
          text-decoration: none;
          padding: 18px 8px;
          flex: 1;
          text-align: center;
          transition: color 200ms ease;
          position: relative;
        }
        .lib-nav-item .nav-status {
          display: block; margin-top: 6px; font-size: 8px;
          letter-spacing: 0.32em; color: ${BRASS}; opacity: 0.7;
        }
        .lib-nav-item:hover { color: ${BRASS}; }
        .lib-nav-item + .lib-nav-item { border-left: 1px solid ${HAIR}; }
        .lib-room-card {
          position: relative;
          padding: 28px 28px 26px;
          border: 1px solid ${HAIR};
          background: ${CREAM};
          display: grid;
          grid-template-columns: 64px 1fr auto;
          gap: 20px;
          align-items: start;
        }
        .lib-room-card[data-disabled="true"] { opacity: 0.78; }
        .lib-room-card[data-disabled="true"]::after {
          content: "UNDER CONSTRUCTION";
          position: absolute;
          top: 14px; right: -6px;
          transform: rotate(4deg);
          font-family: ${INTER};
          font-size: 9px;
          letter-spacing: 0.3em;
          color: ${BRASS};
          border: 1px solid ${BRASS};
          padding: 4px 8px;
          opacity: 0.55;
        }
        .lib-step {
          padding: 28px;
          border: 1px solid ${HAIR};
          background: ${CREAM};
        }
        .lib-section-rule {
          height: 1px;
          background: ${HAIR};
          width: 56px;
          margin: 0 auto 18px;
        }
        @media (max-width: 720px) {
          .lib-row-2col, .lib-row-sidebar, .lib-footer-row {
            grid-template-columns: 1fr !important;
          }
          .lib-nav-strip { flex-direction: column; }
          .lib-nav-item { flex: 1 0 100%; border-left: none !important; border-top: 1px solid ${HAIR}; text-align: left; padding: 18px 24px; display: flex; justify-content: space-between; align-items: baseline; }
          .lib-nav-item .nav-status { margin-top: 0; }
          .lib-gallery { grid-template-columns: repeat(2, 1fr) !important; }
          .lib-steps-grid, .lib-rooms-grid { grid-template-columns: 1fr !important; }
          .lib-room-card { grid-template-columns: 48px 1fr !important; }
          .lib-room-card > .lib-room-arrow { display: none; }
          .lib-section-pad { padding-left: 24px !important; padding-right: 24px !important; }
          .lib-2col-text { padding: 48px 24px !important; }
        }
      `}</style>

      <div className="lib-grain" aria-hidden="true" />

      {/* MASTHEAD BAND — dark damask, centered crest + horizontal nav (Mansion / Anderson Social) */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 720,
          margin: "0 auto",
          background: "#120D0A",
          color: CREAM,
          backgroundImage: DAMASK_BG,
          backgroundSize: "160px 160px",
          borderBottom: `1px solid rgba(184,149,76,0.35)`,
          boxShadow: "0 40px 80px rgba(0,0,0,0.45)",
        }}
      >
        <div style={{ padding: "26px 24px 18px", textAlign: "center" }}>
          <div style={{ ...mono, color: BRASS, opacity: 0.85, marginBottom: 10 }}>
            EST · MMXXVI · MADRID
          </div>
          <div
            aria-label="PASTED Library crest"
            style={{
              width: 48,
              height: 48,
              margin: "0 auto 8px",
              borderRadius: "50%",
              border: `1px solid ${BRASS}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: SCRIPT,
              fontSize: 22,
              color: CREAM,
              lineHeight: 1,
            }}
          >
            P.L
          </div>
          <div
            style={{
              fontFamily: CORMORANT,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 22,
              letterSpacing: "0.04em",
              color: CREAM,
            }}
          >
            The PASTED Library
          </div>
        </div>
        <nav
          className="lib-top-nav"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 0,
            padding: "10px 16px 18px",
            borderTop: "1px solid rgba(184,149,76,0.18)",
          }}
        >
          {TOP_NAV.map((n, i) => (
            <span key={n.label} style={{ display: "inline-flex", alignItems: "center" }}>
              <Link
                to={n.to}
                style={{
                  ...mono,
                  color: CREAM,
                  opacity: 0.82,
                  textDecoration: "none",
                  padding: "6px 14px",
                }}
              >
                {n.label}
              </Link>
              {i < TOP_NAV.length - 1 && (
                <span aria-hidden style={{ color: BRASS, opacity: 0.55, fontSize: 8 }}>·</span>
              )}
            </span>
          ))}
        </nav>
      </div>

      <motion.div
        {...fade(0)}
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 720,
          margin: "0 auto",
          background: CREAM,
          color: INK,
          boxShadow: "0 40px 120px rgba(0,0,0,0.55), 0 2px 0 rgba(184,149,76,0.25)",
        }}
      >
        {/* PANEL 1 — HERO PHOTOGRAPH + EMBLEM */}
        <motion.section
          {...fade(0.1)}
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 11",
            backgroundImage: `url(${heroStacks})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at center, rgba(26,20,16,0.15) 0%, rgba(26,20,16,0.55) 100%)",
            }}
          />
          {/* Hero archival corner marks */}
          <div style={{ position: "absolute", top: 16, left: 20, ...mono, color: CREAM, opacity: 0.75, fontSize: 9 }}>
            PASTED
          </div>
          <div style={{ position: "absolute", top: 16, right: 20, ...mono, color: CREAM, opacity: 0.75, fontSize: 9 }}>
            AW · MMXXVI
          </div>
          <div style={{ position: "absolute", bottom: 16, left: 20, ...mono, color: CREAM, opacity: 0.75, fontSize: 9 }}>
            PRIVATE CANON
          </div>
          <div style={{ position: "absolute", bottom: 16, right: 20, ...mono, color: CREAM, opacity: 0.75, fontSize: 9 }}>
            ACCESSION · 001
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 24px",
              textAlign: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 28, marginBottom: 18 }}>
              <span style={{ ...mono, color: CREAM, opacity: 0.8, fontSize: 10 }}>PASTED</span>
              <span aria-hidden style={{ width: 28, height: 1, background: "rgba(245,238,220,0.5)" }} />
              <span style={{ ...mono, color: BRASS, fontSize: 10 }}>AW · MMXXVI</span>
            </div>
            <div
              style={{
                fontFamily: CORMORANT,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(64px, 11vw, 120px)",
                color: CREAM,
                lineHeight: 0.95,
                letterSpacing: "0.005em",
                textShadow: "0 4px 28px rgba(0,0,0,0.6)",
                marginBottom: 6,
              }}
            >
              The Library
            </div>
            <div style={{ ...mono, color: BRASS, opacity: 0.9, fontSize: 9, marginBottom: 22 }}>
              A PRIVATE CANON · VOLUME I
            </div>
            <h1
              style={{
                fontFamily: CORMORANT,
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(24px, 3.6vw, 34px)",
                color: CREAM,
                margin: "0 0 14px",
                lineHeight: 1.05,
                letterSpacing: "0.005em",
                textShadow: "0 2px 18px rgba(0,0,0,0.55)",
              }}
            >
              Read, Watch, Become.
            </h1>
            <p
              style={{
                fontFamily: CORMORANT,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(16px, 1.9vw, 19px)",
                color: CREAM_DEEP,
                maxWidth: 480,
                margin: 0,
                lineHeight: 1.55,
                textShadow: "0 1px 12px rgba(0,0,0,0.6)",
              }}
            >
              A private canon for the ones building taste, authority, signal, and selfhood in a world addicted to noise.
            </p>
            <div style={{ display: "flex", gap: 28, flexWrap: "wrap", justifyContent: "center", marginTop: 28 }}>
              <Link to="/library/members" className="lib-cta" style={{ color: CREAM, borderColor: "rgba(245,238,220,0.45)" }}>
                Enter the Library
              </Link>
              <Link to="/library/apply" className="lib-cta" style={{ color: CREAM, borderColor: "rgba(245,238,220,0.25)" }}>
                Request Access
              </Link>
            </div>
            <div style={{ ...mono, color: BRASS, marginTop: 18, opacity: 0.85, fontSize: 9 }}>
              The rooms are being restored · New volumes opening soon
            </div>
          </div>
        </motion.section>

        {/* PANEL — STATUS BAND (Anderson Social-style horizontal rooms band) */}
        <div
          className="lib-status-band"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            borderTop: `1px solid ${HAIR}`,
            borderBottom: `1px solid ${HAIR}`,
            background: CREAM,
          }}
        >
          {[
            { name: "The Atrium", hours: "Open · Daily", note: "You are here" },
            { name: "The Stacks", hours: "Opening Soon", note: "Essays · Frameworks" },
            { name: "The Cinema", hours: "Opening Soon", note: "Films · Visual Studies" },
          ].map((s, i) => (
            <div
              key={s.name}
              style={{
                padding: "28px 22px",
                textAlign: "center",
                borderLeft: i === 0 ? "none" : `1px solid ${HAIR}`,
              }}
              className="lib-status-cell"
            >
              <div style={{ ...mono, color: BRASS, marginBottom: 10, fontSize: 9 }}>{s.hours}</div>
              <div
                style={{
                  fontFamily: CORMORANT,
                  fontStyle: "italic",
                  fontSize: 22,
                  color: INK,
                  lineHeight: 1.1,
                  marginBottom: 6,
                }}
              >
                {s.name}
              </div>
              <div style={{ ...mono, color: INK, opacity: 0.5, fontSize: 9 }}>{s.note}</div>
            </div>
          ))}
        </div>

        {/* PANEL 2 — NAV STRIP (full room index) */}
        <nav
          className="lib-nav-strip"
          style={{
            display: "flex",
            alignItems: "stretch",
            borderTop: `1px solid ${HAIR}`,
            borderBottom: `1px solid ${HAIR}`,
            background: CREAM,
          }}
        >
          {NAV_ITEMS.map((n, i) => (
            <span
              key={n}
              className="lib-nav-item"
              aria-disabled="true"
              title="Under construction — opening soon"
              style={{ cursor: "default" }}
            >
              <span style={{ opacity: 0.65 }}>{`${String(i + 1).padStart(2, "0")} · ${n}`}</span>
              <span className="nav-status">Closed</span>
            </span>
          ))}
        </nav>

        {/* PANEL — WHAT THE LIBRARY IS */}
        <motion.section
          {...fade(0.12)}
          className="lib-section-pad"
          style={{ padding: "112px 44px 96px", background: CREAM, borderTop: `1px solid ${HAIR}` }}
        >
          <div style={{ ...mono, color: BRASS, textAlign: "center", marginBottom: 6 }}>§ I</div>
          <div style={{ ...mono, color: INK, opacity: 0.55, textAlign: "center", marginBottom: 18, fontSize: 9 }}>
            Filed under · Foundations
          </div>
          <div className="lib-section-rule" />
          <h2 style={{ fontFamily: CORMORANT, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(28px, 4.4vw, 40px)", color: INK, textAlign: "center", margin: "0 0 36px", lineHeight: 1.15 }}>
            A vault of work, given freely.
          </h2>
          <div style={{ maxWidth: 560, margin: "0 auto", fontFamily: CORMORANT, fontSize: 18, lineHeight: 1.75, color: "rgba(26,20,16,0.82)" }}>
            <p style={{ margin: "0 0 16px" }}>
              The Library of PASTED is not a blog. It is not a content feed. It is not another place to collect information you will never use.
            </p>
            <p style={{ margin: "0 0 16px" }}>
              It is a private canon of ideas, essays, films, frameworks, observations, and operating principles for people trying to become harder to ignore.
            </p>
            <p style={{ margin: "0 0 16px" }}>
              Built for doctors, founders, creators, operators, and uncommon minds who are no longer interested in sounding like everyone else.
            </p>
            <p style={{ margin: 0 }}>
              This is where we place the thinking behind the work. The psychology. The taste. The strategy. The restraint. The rebellion. The parts of brand, business, and becoming that rarely fit inside a caption.
            </p>
          </div>
          <div style={{ textAlign: "center", marginTop: 56, fontFamily: SCRIPT, fontSize: 38, color: BRASS, lineHeight: 1 }}>
            For those who know there is more.
          </div>
        </motion.section>

        {/* PANEL — FIGURE PHOTOGRAPH (kept) */}
        <motion.section
          {...fade(0.15)}
          className="lib-row-2col"
          style={{
            display: "grid",
            gridTemplateColumns: "1.05fr 1fr",
            borderTop: `1px solid ${HAIR}`,
          }}
        >
          <div
            style={{
              backgroundImage: `url(${figureBW})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: 420,
            }}
            aria-hidden="true"
          />
          <div
            className="lib-2col-text"
            style={{
              padding: "88px 48px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              background: CREAM,
            }}
          >
            <div style={{ ...mono, color: BRASS, marginBottom: 6 }}>§ II</div>
            <div style={{ ...mono, color: INK, opacity: 0.55, marginBottom: 18, fontSize: 9 }}>Filed under · Purpose</div>
            <h2 style={{ fontFamily: CORMORANT, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(24px, 3.4vw, 32px)", color: INK, lineHeight: 1.25, margin: "0 0 24px" }}>
              Because the internet made everyone visible.{" "}
              <span style={{ color: BRASS }}>It did not make everyone meaningful.</span>
            </h2>
            <p style={{ fontFamily: CORMORANT, fontSize: 17, lineHeight: 1.7, color: "rgba(26,20,16,0.82)", margin: "0 0 16px" }}>
              Most people are not short on content. They are short on canon. They have tactics, templates, trends, posts, offers, hooks, frameworks, advice, and noise. What they do not have is a deeper architecture for who they are becoming.
            </p>
            <p style={{ fontFamily: CORMORANT, fontSize: 17, lineHeight: 1.7, color: "rgba(26,20,16,0.82)", margin: "0 0 18px" }}>
              The Library exists to restore that architecture. A place to think more clearly. To build more beautifully. To speak with more force. To sell without becoming cheap. To become known without becoming hollow.
            </p>
            <p style={{ fontFamily: CORMORANT, fontStyle: "italic", fontSize: 18, color: INK, margin: 0 }}>
              This is not here to make you louder. It is here to make you undeniable.
            </p>
          </div>
        </motion.section>

        {/* PANEL — HOW TO USE */}
        <motion.section
          {...fade(0.18)}
          className="lib-section-pad"
          style={{ padding: "104px 44px", background: CREAM_DEEP, borderTop: `1px solid ${HAIR}` }}
        >
          <div style={{ ...mono, color: BRASS, textAlign: "center", marginBottom: 6 }}>§ III</div>
          <div style={{ ...mono, color: INK, opacity: 0.55, textAlign: "center", marginBottom: 18, fontSize: 9 }}>
            Filed under · Practice
          </div>
          <div className="lib-section-rule" />
          <h2 style={{ fontFamily: CORMORANT, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(26px, 4vw, 34px)", color: INK, textAlign: "center", margin: "0 0 44px", lineHeight: 1.2 }}>
            Three ways to move through it.
          </h2>
          <div className="lib-steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {[
              { n: "01", t: "Read Slowly", c: "These are not scraps for skimming. Begin with the essays, notes, and frameworks that meet you where you are." },
              { n: "02", t: "Watch Carefully", c: "The films and visual studies are designed to sharpen taste, rhythm, story, and perception." },
              { n: "03", t: "Build Differently", c: "Take what matters, discard what does not, and let the work change the way you show up in the world." },
            ].map((s) => (
              <div key={s.n} className="lib-step">
                <div style={{ ...mono, color: BRASS, marginBottom: 14 }}>{s.n}</div>
                <h3 style={{ fontFamily: CORMORANT, fontStyle: "italic", fontWeight: 400, fontSize: 24, color: INK, margin: "0 0 10px" }}>{s.t}</h3>
                <p style={{ fontFamily: CORMORANT, fontSize: 15, lineHeight: 1.6, color: CREAM_QUIET, margin: 0 }}>{s.c}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* PANEL — THE ROOMS */}
        <motion.section
          {...fade(0.2)}
          className="lib-section-pad"
          style={{ padding: "104px 44px", background: CREAM, borderTop: `1px solid ${HAIR}` }}
        >
          <div style={{ ...mono, color: BRASS, textAlign: "center", marginBottom: 6 }}>§ IV</div>
          <div style={{ ...mono, color: INK, opacity: 0.55, textAlign: "center", marginBottom: 18, fontSize: 9 }}>
            Filed under · Architecture
          </div>
          <div className="lib-section-rule" />
          <h2 style={{ fontFamily: CORMORANT, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(26px, 4vw, 34px)", color: INK, textAlign: "center", margin: "0 0 44px", lineHeight: 1.2 }}>
            Each room holds a different kind of becoming.
          </h2>
          <div className="lib-rooms-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
            {[
              { n: "I", name: "The Stacks", status: "Open Soon", disabled: true, desc: "Essays, manifestos, frameworks, and field notes on brand, desire, psychology, authority, and the architecture of becoming known." },
              { n: "II", name: "The Reading Room", status: "Under Construction", disabled: true, desc: "Long-form pieces for slower thinking. Fewer answers. Better questions. The kind of work you return to when the noise gets too loud." },
              { n: "III", name: "The Vault", status: "Under Construction", disabled: true, desc: "Private frameworks, internal notes, strategic systems, and deeper operating principles from inside the PASTED world." },
              { n: "IV", name: "The Cinema", status: "Under Construction", disabled: true, desc: "Films, visual studies, content breakdowns, brand references, and cinematic artifacts for those learning to see before they create." },
              { n: "V", name: "Periodicals", status: "Under Construction", disabled: true, desc: "Ongoing dispatches, observations, cultural notes, and timely pieces from the edges of brand, business, dentistry, beauty, and taste." },
            ].map((r) => (
              <div key={r.n} className="lib-room-card" data-disabled={r.disabled || undefined}>
                <div style={{ ...mono, color: BRASS, fontSize: 11, paddingTop: 4 }}>RM · {r.n}</div>
                <div>
                  <h3 style={{ fontFamily: CORMORANT, fontStyle: "italic", fontWeight: 400, fontSize: 26, color: INK, margin: "0 0 6px", lineHeight: 1.1 }}>{r.name}</h3>
                  <div style={{ ...mono, color: BRASS, fontSize: 9, marginBottom: 10 }}>{r.status}</div>
                  <p style={{ fontFamily: CORMORANT, fontSize: 15, lineHeight: 1.6, color: CREAM_QUIET, margin: 0, maxWidth: 540 }}>{r.desc}</p>
                </div>
                <div className="lib-room-arrow" style={{ ...mono, color: BRASS, opacity: 0.5, paddingTop: 4 }}>→</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* PANEL 4 — GALLERY STRIP */}
        <motion.section
          {...fade(0.22)}
          className="lib-section-pad"
          style={{
            borderTop: `1px solid ${HAIR}`,
            background: "#2A1B1B",
            padding: "104px 44px",
          }}
        >
          <div style={{ ...mono, color: BRASS, textAlign: "center", marginBottom: 6 }}>§ V</div>
          <div style={{ ...mono, color: CREAM, opacity: 0.55, textAlign: "center", marginBottom: 18, fontSize: 9 }}>
            Filed under · Selected Volumes
          </div>
          <div className="lib-section-rule" style={{ background: "rgba(245,238,220,0.2)" }} />
          <h2 style={{ fontFamily: CORMORANT, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(28px, 4.2vw, 38px)", color: CREAM, margin: "0 0 14px", textAlign: "center", lineHeight: 1.1 }}>
            The Canon
          </h2>
          <p style={{ fontFamily: CORMORANT, fontStyle: "italic", fontSize: 16, color: "rgba(245,238,220,0.7)", textAlign: "center", margin: "0 auto 32px", maxWidth: 460 }}>
            Selected volumes from the Library. Fragments, studies, and principles worth returning to.
          </p>
          <div
            className="lib-gallery"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 16,
            }}
          >
            {[
              { src: thumb1, n: "VOL · I", t: "Taste" },
              { src: thumb2, n: "VOL · II", t: "Authority" },
              { src: thumb3, n: "VOL · III", t: "Restraint" },
              { src: thumb4, n: "VOL · IV", t: "Signal" },
            ].map((v) => (
              <div key={v.n}>
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "1 / 1",
                    backgroundImage: `url(${v.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    outline: `1px solid rgba(184,149,76,0.35)`,
                    outlineOffset: -1,
                    filter: "grayscale(1)",
                    transition: "filter 700ms ease",
                  }}
                  aria-hidden="true"
                />
                <div style={{ marginTop: 10, ...mono, color: BRASS, fontSize: 9 }}>{v.n}</div>
                <div style={{ fontFamily: CORMORANT, fontStyle: "italic", fontSize: 16, color: CREAM, marginTop: 2 }}>{v.t}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <span className="lib-cta" style={{ cursor: "default", opacity: 0.7, color: CREAM, borderColor: "rgba(184,149,76,0.45)" }}>Opening Soon</span>
          </div>
        </motion.section>

        {/* PANEL 5 — SIDEBAR LINKS + PORTRAIT */}
        <motion.section
          {...fade(0.24)}
          className="lib-row-sidebar"
          style={{
            display: "grid",
            gridTemplateColumns: "0.9fr 1.1fr",
            borderTop: `1px solid ${HAIR}`,
          }}
        >
          <div
            style={{
              padding: "44px 44px",
              display: "flex",
              flexDirection: "column",
              gap: 0,
              background: CREAM,
            }}
          >
            <div style={{ ...mono, color: BRASS, marginBottom: 18, opacity: 0.8 }}>
              For those entering deeper.
            </div>
            {[
              { label: "Request Access", to: "/library/apply" },
              { label: "See What's Coming", to: "/library/apply" },
              { label: "Member Sign In", to: "/library/login" },
              { label: "Visit PASTED", to: "/" },
            ].map((item, i, arr) => (
              <Link
                key={item.label}
                to={item.to}
                className="lib-link"
                style={{
                  ...mono,
                  padding: "20px 0",
                  borderBottom: i < arr.length - 1 ? `1px solid ${HAIR}` : "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{item.label}</span>
                <span style={{ color: BRASS }}>→</span>
              </Link>
            ))}
          </div>
          <div
            style={{
              position: "relative",
              backgroundImage: `url(${portraitBW})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: 380,
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: 28,
                right: 28,
                textAlign: "right",
                fontFamily: SCRIPT,
                fontSize: 34,
                color: INK,
                lineHeight: 1.05,
                textShadow: "0 1px 8px rgba(245,238,220,0.55)",
              }}
            >
              Free yourself,
              <br />
              the rest follows.
            </div>
          </div>
        </motion.section>

        {/* PANEL 6 — FOOTER: monogram / building / colophon */}
        <motion.footer
          {...fade(0.3)}
          className="lib-footer-row"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr 1fr",
            alignItems: "start",
            gap: 20,
            padding: "72px 44px 48px",
            borderTop: `1px solid ${HAIR}`,
            background: CREAM,
          }}
        >
          {/* Deeper entry links (left) */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ ...mono, color: BRASS, opacity: 0.8, marginBottom: 4 }}>For those entering deeper</div>
            {[
              { label: "Request Access", to: "/library/apply" },
              { label: "Member Sign In", to: "/library/login" },
              { label: "Visit PASTED", to: "/" },
            ].map((l) => (
              <Link key={l.label} to={l.to} className="lib-link" style={{ ...mono, color: INK, opacity: 0.7 }}>
                {l.label} —
              </Link>
            ))}
          </div>
          {/* Centered circular monogram */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <div
              style={{
                width: 88,
                height: 88,
                borderRadius: "50%",
                border: `1px solid ${BRASS}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: SCRIPT,
                fontSize: 38,
                color: INK,
                lineHeight: 1,
                marginBottom: 18,
              }}
              aria-label="PASTED Library monogram"
            >
              P.L
            </div>
            <img
              src={buildingLine}
              alt="Illustration of the Library"
              width={200}
              height={100}
              loading="lazy"
              style={{
                width: 200,
                height: "auto",
                mixBlendMode: "multiply",
                opacity: 0.7,
              }}
            />
            <div style={{ fontFamily: CORMORANT, fontStyle: "italic", fontSize: 13, color: CREAM_QUIET, marginTop: 12, maxWidth: 280 }}>
              Signal over sound. Taste over tricks. Becoming over performance.
            </div>
          </div>
          {/* Colophon */}
          <div
            style={{
              ...mono,
              color: CREAM_QUIET,
              textAlign: "right",
              lineHeight: 2,
            }}
          >
            <div>The Library</div>
            <div>of PASTED</div>
            <div style={{ fontFamily: CORMORANT, fontStyle: "italic", textTransform: "none", letterSpacing: 0, fontSize: 13, marginTop: 4 }}>
              A private canon on becoming undeniable.
            </div>
            <div style={{ color: BRASS }}>MMXXVI</div>
          </div>
        </motion.footer>
      </motion.div>
    </div>
  );
};

export default Library;
