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
import robes from "@/assets/library-robes.jpg";
import worldEstateDusk from "@/assets/world-estate-dusk.jpg";
import worldArrivalCypress from "@/assets/world-arrival-cypress.jpg";
import worldLibraryCorridor from "@/assets/world-library-corridor.jpg";
import worldScreeningRoom from "@/assets/world-screening-room.jpg";
import worldManorNight from "@/assets/world-manor-night.jpg";
import worldManorGrounds from "@/assets/world-manor-grounds.jpg";
import worldManorPasture from "@/assets/world-manor-pasture.jpg";

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
const SKY = "#B7CCDA";
const SKY_DEEP = "#94B0C2";
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
        The Library of PASTED
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
        background: `linear-gradient(180deg, ${SKY} 0%, ${SKY_DEEP} 100%)`,
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
          padding: 18px 22px 18px 18px;
          border: 1px solid ${HAIR};
          background: ${CREAM};
          display: grid;
          grid-template-columns: 132px 1fr auto;
          gap: 24px;
          align-items: center;
          border-radius: 14px;
          transition: box-shadow 300ms ease, transform 300ms ease;
        }
        .lib-room-card:hover { box-shadow: 0 18px 40px -22px rgba(26,20,16,0.45); }
        .lib-room-thumb {
          width: 132px; height: 96px;
          border-radius: 12px;
          background-size: cover; background-position: center;
          filter: grayscale(1) brightness(0.95);
          box-shadow: inset 0 0 0 1px rgba(184,149,76,0.35);
        }
        .lib-room-arrow-chip {
          width: 36px; height: 36px; border-radius: 999px;
          border: 1px solid ${HAIR};
          display: inline-flex; align-items: center; justify-content: center;
          color: ${BRASS}; font-family: ${INTER}; font-size: 14px;
          transition: border-color 200ms ease, color 200ms ease, background 200ms ease;
        }
        .lib-room-card:hover .lib-room-arrow-chip {
          border-color: ${BRASS}; background: rgba(184,149,76,0.08);
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
        /* Torn paper edges, weaving editorial inspiration */
        .lib-torn-bottom {
          clip-path: polygon(0% 0%, 100% 0%, 100% 96%, 97% 92%, 94% 98%, 90% 93%, 86% 99%, 82% 94%, 77% 99%, 73% 93%, 68% 98%, 63% 94%, 58% 99%, 53% 93%, 48% 98%, 43% 94%, 38% 99%, 33% 93%, 28% 98%, 23% 94%, 18% 99%, 13% 93%, 8% 97%, 3% 93%, 0% 98%);
        }
        .lib-torn-top {
          clip-path: polygon(0% 4%, 3% 1%, 8% 5%, 13% 2%, 18% 6%, 23% 1%, 28% 4%, 33% 1%, 38% 5%, 43% 2%, 48% 6%, 53% 1%, 58% 5%, 63% 2%, 68% 6%, 73% 1%, 77% 4%, 82% 1%, 86% 5%, 90% 2%, 94% 5%, 97% 1%, 100% 4%, 100% 100%, 0% 100%);
        }
        .lib-polaroid {
          background: #FFFFFF;
          padding: 14px 14px 44px;
          box-shadow: 0 18px 40px -10px rgba(26,20,16,0.45), 0 2px 0 rgba(26,20,16,0.05);
          position: relative;
        }
        .lib-polaroid .lib-polaroid-caption {
          position: absolute; left: 0; right: 0; bottom: 12px;
          text-align: center; font-family: ${CORMORANT}; font-style: italic;
          font-size: 16px; color: ${INK};
        }
        .lib-callout-card {
          background: ${CREAM};
          padding: 40px 36px 36px;
          box-shadow: 0 30px 70px -20px rgba(26,20,16,0.55), 0 2px 0 rgba(184,149,76,0.18);
          border: 1px solid rgba(184,149,76,0.18);
          position: relative;
        }
        .lib-margin-anno {
          font-family: ${INTER}; font-weight: 500; font-size: 9px;
          letter-spacing: 0.5em; text-transform: uppercase;
          color: ${INK}; opacity: 0.32;
          writing-mode: vertical-rl; transform: rotate(180deg);
          white-space: nowrap;
        }
        .lib-foundations-grid {
          display: grid;
          grid-template-columns: 5fr 7fr;
          gap: 56px;
          align-items: center;
        }
        .lib-purpose-stage {
          position: relative;
          width: 100%;
          min-height: 560px;
        }
        .lib-purpose-stage > .lib-purpose-img {
          width: 100%; height: 560px; object-fit: cover;
          filter: grayscale(1) brightness(0.7);
        }
        .lib-purpose-stage > .lib-purpose-callout {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%) rotate(1deg);
          width: min(440px, 86%);
        }
        .lib-practice-cluster {
          display: flex; flex-wrap: wrap; justify-content: center;
          gap: 40px; padding: 0 12px;
        }
        .lib-practice-cluster > * { width: 220px; }
        .lib-canon-grid > div:nth-child(2n) { transform: translateY(36px); }
        /* Ghost / outlined italic display word, Saile-style */
        .lib-ghost-word {
          font-family: ${CORMORANT};
          font-style: italic;
          font-weight: 400;
          color: transparent;
          -webkit-text-stroke: 1px ${INK};
          letter-spacing: -0.01em;
          line-height: 0.9;
          display: inline-block;
        }
        /* Polaroid scatter cluster over landscape */
        .lib-scatter-stage {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          background-size: cover;
          background-position: center;
          overflow: hidden;
        }
        .lib-scatter-stage::before {
          content: ""; position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(183,204,218,0.08) 0%, rgba(26,20,16,0.32) 100%);
        }
        .lib-scatter-item {
          position: absolute;
        }
        /* Lens/Vesica band — woven from editorial inspiration.
           A painting-backed band with a cream card whose top + bottom
           edges curve inward, like the inspiration's concave panels. */
        .lib-lens-band {
          position: relative;
          width: 100%;
          overflow: hidden;
          isolation: isolate;
        }
        .lib-lens-band .lens-bg {
          position: absolute; inset: 0;
          background-size: cover; background-position: center;
          filter: grayscale(0.15) brightness(0.78) contrast(1.05);
          z-index: 0;
        }
        .lib-lens-band .lens-bg::after {
          content: ""; position: absolute; inset: 0;
          background: radial-gradient(ellipse at center, rgba(26,20,16,0.25) 0%, rgba(26,20,16,0.55) 100%);
        }
        .lib-lens-band .lens-inner {
          position: relative; z-index: 1;
          padding: 96px 24px;
          display: flex; align-items: center; justify-content: center;
        }
        .lib-lens-card {
          position: relative;
          width: min(620px, 92%);
          background: ${CREAM};
          padding: 96px 56px 96px;
          -webkit-clip-path: url(#lib-lens-clip);
          clip-path: url(#lib-lens-clip);
          text-align: center;
        }
        .lib-lens-card--dark {
          background: #1A1410;
          color: ${CREAM};
        }
        @media (max-width: 720px) {
          .lib-lens-band .lens-inner { padding: 56px 16px; }
          .lib-lens-card { padding: 72px 28px; }
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
          .lib-room-card { grid-template-columns: 88px 1fr !important; padding: 12px !important; gap: 14px !important; }
          .lib-room-thumb { width: 88px !important; height: 72px !important; }
          .lib-room-card > .lib-room-arrow-chip { display: none; }
          .lib-section-pad { padding-left: 24px !important; padding-right: 24px !important; }
          .lib-2col-text { padding: 48px 24px !important; }
          .lib-foundations-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .lib-margin-anno { display: none; }
          .lib-purpose-stage > .lib-purpose-img { height: 420px; }
          .lib-canon-grid > div:nth-child(2n) { transform: none !important; }
          .lib-practice-cluster > * { width: 70%; }
        }
      `}</style>

      <div className="lib-grain" aria-hidden="true" />

      {/* Shared SVG clip path for the lens/vesica panels */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <clipPath id="lib-lens-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.18 Q 0.5,-0.08 1,0.18 L 1,0.82 Q 0.5,1.08 0,0.82 Z" />
          </clipPath>
        </defs>
      </svg>

      <motion.div
        {...fade(0)}
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 960,
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
            backgroundImage: `url(${worldEstateDusk})`,
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
            The Library
          </div>
          <div style={{ position: "absolute", top: 16, right: 20, ...mono, color: CREAM, opacity: 0.75, fontSize: 9 }}>
            of PASTED
          </div>
          <div style={{ position: "absolute", bottom: 16, left: 20, ...mono, color: CREAM, opacity: 0.75, fontSize: 9 }}>
            PRIVATE CANON
          </div>
          <div style={{ position: "absolute", bottom: 16, right: 20, ...mono, color: CREAM, opacity: 0.75, fontSize: 9 }}>
            By Invitation
          </div>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, textAlign: "center", padding: "44px 20px 0", ...mono, color: CREAM, opacity: 0.85 }}>
            The Library of PASTED
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
            <Emblem />
            <h1
              style={{
                fontFamily: CORMORANT,
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(36px, 5.6vw, 58px)",
                color: CREAM,
                margin: "24px 0 14px",
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

        {/* PANEL 2 — NAV STRIP */}
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
              <span style={{ opacity: 0.65 }}>{n}</span>
              <span className="nav-status">Closed</span>
            </span>
          ))}
        </nav>

        {/* PANEL — WHAT THE LIBRARY IS */}
        <motion.section
          {...fade(0.12)}
          className="lib-section-pad"
          style={{ padding: "120px 56px 112px", background: CREAM, borderTop: `1px solid ${HAIR}`, position: "relative" }}
        >
          <div className="lib-foundations-grid">
            {/* LEFT: label + headline + folio callout */}
            <div>
              <div style={{ ...mono, color: BRASS, marginBottom: 22, fontSize: 9, letterSpacing: "0.4em" }}>
                Filed under · Foundations
              </div>
              <h2 style={{ fontFamily: CORMORANT, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(38px, 6vw, 64px)", color: INK, margin: "0 0 36px", lineHeight: 0.98, letterSpacing: "-0.005em" }}>
                A vault of work,<br/>
                <span className="lib-ghost-word" style={{ fontSize: "clamp(46px, 7.2vw, 76px)" }}>given</span>{" "}
                freely.
              </h2>
              <div className="lib-callout-card" style={{ transform: "rotate(-1deg)", maxWidth: 420 }}>
                <p style={{ fontFamily: CORMORANT, fontStyle: "italic", fontSize: 17, lineHeight: 1.65, color: "rgba(26,20,16,0.85)", margin: "0 0 14px" }}>
                  Not a blog. Not a feed. A private canon of essays, films, frameworks, and operating principles for people trying to become harder to ignore.
                </p>
                <p style={{ fontFamily: CORMORANT, fontSize: 15, lineHeight: 1.7, color: CREAM_QUIET, margin: 0 }}>
                  Built for doctors, founders, creators, operators, and uncommon minds no longer interested in sounding like everyone else. Where we place the thinking behind the work — the psychology, the taste, the restraint, the rebellion.
                </p>
                <div style={{ ...mono, color: BRASS, fontSize: 8, letterSpacing: "0.36em", marginTop: 20 }}>
                  Folio Ref · Foundations
                </div>
              </div>
            </div>
            {/* RIGHT: image + polaroid overlay + margin annotation */}
            <div style={{ position: "relative" }}>
              <div
                style={{
                  width: "100%",
                  aspectRatio: "4 / 5",
                  backgroundImage: `url(${worldArrivalCypress})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "grayscale(1) brightness(1.02)",
                  boxShadow: "0 30px 80px -20px rgba(26,20,16,0.55)",
                }}
                aria-hidden="true"
              />
              {/* Polaroid overlay bottom-left */}
              <div
                className="lib-polaroid"
                style={{ position: "absolute", left: -28, bottom: -36, width: 168, transform: "rotate(-4deg)" }}
              >
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    backgroundImage: `url(${thumb1})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "grayscale(1)",
                  }}
                  aria-hidden="true"
                />
                <div className="lib-polaroid-caption">Marginalia</div>
              </div>
              {/* Margin annotation */}
              <div className="lib-margin-anno" style={{ position: "absolute", right: -36, top: "12%" }}>
                Archive Section — Foundations
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 96, fontFamily: SCRIPT, fontSize: 38, color: BRASS, lineHeight: 1 }}>
            For those who know there is more.
          </div>
        </motion.section>

        {/* PANEL — PURPOSE: dark stage with floating callout */}
        <motion.section
          {...fade(0.15)}
          className="lib-torn-top lib-lens-band"
          style={{ background: "#2A1B1B", position: "relative" }}
        >
          <div className="lens-bg" style={{ backgroundImage: `url(${worldLibraryCorridor})` }} aria-hidden="true" />
          <div className="lens-inner">
            <div className="lib-lens-card">
              <div style={{ ...mono, color: BRASS, marginBottom: 22, fontSize: 9, letterSpacing: "0.4em" }}>
                Filed under · Purpose
              </div>
              <h3 style={{ fontFamily: CORMORANT, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(24px, 3.4vw, 32px)", color: INK, lineHeight: 1.2, margin: "0 auto 22px", maxWidth: 460 }}>
                The internet made everyone visible.{" "}
                <span style={{ color: BRASS }}>It did not make everyone meaningful.</span>
              </h3>
              <p style={{ fontFamily: CORMORANT, fontSize: 16, lineHeight: 1.75, color: "rgba(26,20,16,0.82)", margin: "0 auto 14px", maxWidth: 440 }}>
                Most people are not short on content. They are short on canon. The Library exists to restore the deeper architecture — to think more clearly, build more beautifully, speak with more force, and become known without becoming hollow.
              </p>
              <p style={{ fontFamily: CORMORANT, fontStyle: "italic", fontSize: 16, color: INK, margin: "0 auto", maxWidth: 420 }}>
                Not here to make you louder. Here to make you undeniable.
              </p>
              <div style={{ ...mono, color: BRASS, fontSize: 8, letterSpacing: "0.36em", marginTop: 24, opacity: 0.8 }}>
                Depth over breadth
              </div>
            </div>
          </div>
        </motion.section>

        {/* PANEL — HOW TO USE */}
        <motion.section
          {...fade(0.18)}
          className="lib-section-pad"
          style={{ padding: "120px 44px 132px", background: CREAM_DEEP, borderTop: `1px solid ${HAIR}` }}
        >
          <div style={{ ...mono, color: BRASS, textAlign: "center", marginBottom: 18, fontSize: 9, letterSpacing: "0.4em" }}>
            Filed under · Practice
          </div>
          <div className="lib-section-rule" />
          <h2 style={{ fontFamily: CORMORANT, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(30px, 4.6vw, 42px)", color: INK, textAlign: "center", margin: "0 0 64px", lineHeight: 1.15 }}>
            Three ways to move through it
          </h2>
          <div className="lib-practice-cluster">
            {[
              { t: "Read", img: worldLibraryCorridor, tag: "The Stacks", rot: -3, lift: 0, c: "Begin with the essays, notes, and frameworks that meet you where you are." },
              { t: "Watch", img: worldScreeningRoom, tag: "The Cinema", rot: 2, lift: 32, c: "Films and visual studies to sharpen taste, rhythm, story, and perception." },
              { t: "Build", img: worldManorGrounds, tag: "The Forge", rot: -1, lift: 0, c: "Take what matters, discard what does not, and let the work change how you show up." },
            ].map((s, i) => (
              <div key={s.t} style={{ marginTop: s.lift }}>
                <div className="lib-polaroid" style={{ transform: `rotate(${s.rot}deg)` }}>
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "4 / 5",
                      backgroundImage: `url(${s.img})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      filter: "grayscale(1)",
                    }}
                    aria-hidden="true"
                  />
                  <div className="lib-polaroid-caption">{s.t}</div>
                </div>
                <div style={{ ...mono, color: BRASS, fontSize: 9, letterSpacing: "0.32em", marginTop: 18, textAlign: "center", opacity: 0.7 }}>
                  {s.tag}
                </div>
                <p style={{ fontFamily: CORMORANT, fontStyle: "italic", fontSize: 15, lineHeight: 1.6, color: CREAM_QUIET, margin: "10px auto 0", maxWidth: 200, textAlign: "center" }}>
                  {s.c}
                </p>
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
          <div style={{ ...mono, color: BRASS, textAlign: "center", marginBottom: 18, fontSize: 9, letterSpacing: "0.4em" }}>
            Filed under · Architecture
          </div>
          <div className="lib-section-rule" />
          <h2 style={{ fontFamily: CORMORANT, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(26px, 4vw, 34px)", color: INK, textAlign: "center", margin: "0 0 44px", lineHeight: 1.2 }}>
            Each room holds a different kind of becoming.
          </h2>
          <div className="lib-rooms-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
            {[
              { name: "The Stacks", status: "Open Soon", disabled: true, img: worldLibraryCorridor, desc: "Essays, manifestos, frameworks, and field notes on brand, desire, psychology, authority, and the architecture of becoming known." },
              { name: "The Reading Room", status: "Under Construction", disabled: true, img: worldManorGrounds, desc: "Long-form pieces for slower thinking. Fewer answers. Better questions. The kind of work you return to when the noise gets too loud." },
              { name: "The Vault", status: "Under Construction", disabled: true, img: worldManorNight, desc: "Private frameworks, internal notes, strategic systems, and deeper operating principles from inside the PASTED world." },
              { name: "The Cinema", status: "Under Construction", disabled: true, img: worldScreeningRoom, desc: "Films, visual studies, content breakdowns, brand references, and cinematic artifacts for those learning to see before they create." },
              { name: "Periodicals", status: "Under Construction", disabled: true, img: worldManorPasture, desc: "Ongoing dispatches, observations, cultural notes, and timely pieces from the edges of brand, business, dentistry, beauty, and taste." },
            ].map((r) => (
              <div key={r.name} className="lib-room-card" data-disabled={r.disabled || undefined}>
                <div className="lib-room-thumb" style={{ backgroundImage: `url(${r.img})` }} aria-hidden="true" />
                <div>
                  <h3 style={{ fontFamily: CORMORANT, fontStyle: "italic", fontWeight: 400, fontSize: 26, color: INK, margin: "0 0 6px", lineHeight: 1.1 }}>{r.name}</h3>
                  <div style={{ ...mono, color: BRASS, fontSize: 9, marginBottom: 10 }}>{r.status}</div>
                  <p style={{ fontFamily: CORMORANT, fontSize: 15, lineHeight: 1.6, color: CREAM_QUIET, margin: 0, maxWidth: 540 }}>{r.desc}</p>
                </div>
                <div className="lib-room-arrow-chip" aria-hidden="true">→</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* PANEL 4 — GALLERY STRIP */}
        <motion.section
          {...fade(0.22)}
          className="lib-section-pad lib-torn-top"
          style={{
            borderTop: `1px solid ${HAIR}`,
            background: "#2A1B1B",
            padding: "120px 44px 132px",
          }}
        >
          <div style={{ ...mono, color: BRASS, textAlign: "center", marginBottom: 18, fontSize: 9, letterSpacing: "0.4em", opacity: 0.85 }}>
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
            className="lib-gallery lib-canon-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 28,
            }}
          >
            {[
              { src: worldEstateDusk, t: "Taste" },
              { src: worldLibraryCorridor, t: "Authority" },
              { src: worldArrivalCypress, t: "Restraint" },
              { src: worldManorNight, t: "Signal" },
            ].map((v) => (
              <div key={v.t}>
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
                <div style={{ fontFamily: CORMORANT, fontStyle: "italic", fontSize: 18, color: CREAM, marginTop: 12 }}>{v.t}</div>
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
          </div>
        </motion.footer>
      </motion.div>
    </div>
  );
};

export default Library;
