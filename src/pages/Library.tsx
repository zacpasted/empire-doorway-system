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
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=DM+Sans:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap";
  document.head.appendChild(link);
};

const NIGHT = "#2A1B14";
const DARK_CARD = "#3A2618";
const CREAM = "#F1ECE2";
const CREAM_DEEP = "#E8E0D0";
const CREAM_QUIET = "rgba(42, 27, 20, 0.62)";
const INK = "#1F1611";
const BRASS = "#B8924F";
const BRASS_BRIGHT = "#D4AA6A";
const HAIR = "rgba(31, 22, 17, 0.14)";

const CORMORANT = "'Cormorant Garamond', Georgia, 'Times New Roman', serif";
const DISPLAY = "'Playfair Display', 'Cormorant Garamond', Georgia, serif";
const SANS = "'DM Sans', system-ui, -apple-system, sans-serif";
const MONO_FF = "'JetBrains Mono', ui-monospace, monospace";
const FEATURES = '"liga","dlig","swsh","salt","kern"';
const EASE = [0.16, 1, 0.3, 1] as const;

const mono = {
  fontFamily: MONO_FF,
  fontWeight: 500 as const,
  fontSize: 10,
  letterSpacing: "0.28em",
  textTransform: "uppercase" as const,
};

/* PASTED typography scale — standardized across Library */
const TYPE = {
  h1: {
    fontFamily: CORMORANT,
    fontStyle: "italic" as const,
    fontWeight: 400 as const,
    fontSize: "clamp(44px, 7vw, 64px)",
    lineHeight: 1.05,
    letterSpacing: "-0.005em",
  },
  h2: {
    fontFamily: CORMORANT,
    fontStyle: "italic" as const,
    fontWeight: 400 as const,
    fontSize: "clamp(34px, 6vw, 52px)",
    lineHeight: 1.12,
    letterSpacing: "-0.005em",
  },
  h3: {
    fontFamily: DISPLAY,
    fontStyle: "italic" as const,
    fontWeight: 400 as const,
    fontSize: "clamp(22px, 3vw, 32px)",
    lineHeight: 1.15,
    letterSpacing: "0",
  },
  h3Mini: {
    fontFamily: DISPLAY,
    fontStyle: "italic" as const,
    fontWeight: 400 as const,
    fontSize: 22,
    lineHeight: 1.15,
    letterSpacing: "0",
  },
  body: {
    fontFamily: CORMORANT,
    fontSize: 16,
    lineHeight: 1.65,
  },
  caption: {
    fontFamily: CORMORANT,
    fontStyle: "italic" as const,
    fontSize: 15,
    lineHeight: 1.55,
  },
  label: {
    fontFamily: MONO_FF,
    fontWeight: 500 as const,
    fontSize: 10,
    letterSpacing: "0.28em",
    textTransform: "uppercase" as const,
  },
  labelTiny: {
    fontFamily: MONO_FF,
    fontWeight: 500 as const,
    fontSize: 9,
    letterSpacing: "0.32em",
    textTransform: "uppercase" as const,
  },
} as const;

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
          fontFamily: DISPLAY,
          fontStyle: "italic",
          fontWeight: 400,
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
        /* Gold pill button — unified across every CTA and section */
        .lib-pill {
          display: inline-flex; align-items: center; justify-content: center;
          gap: 8px;
          font-family: ${SANS};
          font-weight: 500;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: ${INK};
          background: ${BRASS};
          padding: 12px 22px;
          border-radius: 999px;
          border: 1px solid ${BRASS};
          text-decoration: none;
          transition: background 220ms ease, color 220ms ease, border-color 220ms ease;
          cursor: pointer;
        }
        .lib-pill:hover { background: ${BRASS_BRIGHT}; border-color: ${BRASS_BRIGHT}; }
        .lib-pill--light {
          background: transparent;
          color: ${CREAM};
          border-color: rgba(245,238,220,0.6);
        }
        .lib-pill--light:hover { background: ${BRASS}; color: ${INK}; border-color: ${BRASS}; }
        .lib-pill--disabled {
          cursor: default;
          opacity: 0.75;
          pointer-events: none;
        }
        /* Royal-Stable-style top nav */
        .lib-topnav {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: 18px 28px;
          background: ${CREAM};
          border-bottom: 1px solid ${HAIR};
        }
        .lib-topnav .lib-topnav-left {
          display: flex; align-items: center; gap: 22px;
          font-family: ${SANS}; font-size: 12px; color: ${INK};
        }
        .lib-topnav .lib-topnav-left a {
          color: ${INK}; text-decoration: none;
          letter-spacing: 0.04em;
          transition: color 200ms ease;
        }
        .lib-topnav .lib-topnav-left a:hover { color: ${BRASS}; }
        .lib-topnav .lib-topnav-mark {
          font-family: ${DISPLAY}; font-style: italic; font-weight: 400;
          font-size: 22px; color: ${INK}; letter-spacing: 0.01em;
          white-space: nowrap;
        }
        .lib-topnav .lib-topnav-right { display: flex; justify-content: flex-end; }
        @media (max-width: 720px) {
          .lib-topnav { grid-template-columns: 1fr auto; padding: 14px 18px; }
          .lib-topnav .lib-topnav-left { display: none; }
          .lib-topnav .lib-topnav-mark { font-size: 18px; }
        }
        /* Alternating Rooms cards inspired by Royal Stable Club */
        .lib-rsc-card {
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          gap: 0;
          border-radius: 18px;
          overflow: hidden;
          background: ${DARK_CARD};
          color: ${CREAM};
          box-shadow: 0 20px 60px -28px rgba(0,0,0,0.45);
        }
        .lib-rsc-card--invert { grid-template-columns: 1fr 1.05fr; background: ${CREAM}; color: ${INK}; }
        .lib-rsc-card--invert .lib-rsc-img { order: 2; }
        .lib-rsc-card--invert .lib-rsc-body { order: 1; }
        .lib-rsc-img {
          min-height: 320px;
          background-size: cover; background-position: center;
        }
        .lib-rsc-body {
          padding: 56px 52px;
          display: flex; flex-direction: column; justify-content: center;
          gap: 18px;
        }
        .lib-rsc-icon {
          width: 48px; height: 48px; border-radius: 999px;
          display: inline-flex; align-items: center; justify-content: center;
          color: ${BRASS}; font-family: ${DISPLAY}; font-style: italic; font-size: 26px;
          border: 1px solid currentColor;
          margin-bottom: 6px;
        }
        /* Mini rsc card — same language at smaller scale (for triptychs / grids) */
        .lib-rsc-mini {
          display: flex; flex-direction: column;
          border-radius: 16px;
          overflow: hidden;
          background: ${CREAM};
          color: ${INK};
          border: 1px solid rgba(184,149,76,0.22);
          box-shadow: 0 18px 50px -28px rgba(0,0,0,0.4);
          transition: box-shadow 320ms ease, transform 320ms ease;
        }
        .lib-rsc-mini:hover { box-shadow: 0 26px 60px -26px rgba(0,0,0,0.5); transform: translateY(-2px); }
        .lib-rsc-mini--dark { background: ${DARK_CARD}; color: ${CREAM}; border-color: rgba(184,149,76,0.32); }
        .lib-rsc-mini .lib-rsc-mini-img {
          width: 100%; aspect-ratio: 4 / 3;
          background-size: cover; background-position: center;
          filter: grayscale(1) brightness(0.95);
        }
        .lib-rsc-mini .lib-rsc-mini-body {
          padding: 28px 26px 30px;
          display: flex; flex-direction: column; gap: 12px;
        }
        .lib-rsc-mini .lib-rsc-icon { width: 40px; height: 40px; font-size: 22px; margin-bottom: 2px; }
        @media (max-width: 720px) {
          .lib-rsc-card, .lib-rsc-card--invert {
            grid-template-columns: 1fr !important;
          }
          .lib-rsc-card--invert .lib-rsc-img { order: 0; }
          .lib-rsc-card--invert .lib-rsc-body { order: 1; }
          .lib-rsc-body { padding: 32px 24px; }
          .lib-rsc-img { min-height: 220px; }
        }
        .lib-nav-item {
          font-family: ${SANS};
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
          color: ${BRASS}; font-family: ${SANS}; font-size: 14px;
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
          font-family: ${SANS};
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
          font-family: ${SANS}; font-weight: 500; font-size: 9px;
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
                ...TYPE.h1,
                color: CREAM,
                margin: "28px 0 16px",
                textShadow: "0 2px 18px rgba(0,0,0,0.55)",
              }}
            >
              Read, Watch, Become.
            </h1>
            <p
              style={{
                ...TYPE.caption,
                fontSize: "clamp(16px, 1.9vw, 18px)",
                color: CREAM_DEEP,
                maxWidth: 500,
                margin: 0,
                textShadow: "0 1px 12px rgba(0,0,0,0.6)",
              }}
            >
              A private canon for the ones building taste, authority, signal, and selfhood in a world addicted to noise.
            </p>
            <div style={{ display: "flex", gap: 28, flexWrap: "wrap", justifyContent: "center", marginTop: 28 }}>
              <Link to="/library/members" className="lib-pill">
                Enter the Library
              </Link>
              <Link to="/library/apply" className="lib-pill lib-pill--light">
                Request Access
              </Link>
            </div>
            <div style={{ ...TYPE.labelTiny, color: BRASS, marginTop: 20, opacity: 0.85 }}>
              The rooms are being restored · New volumes opening soon
            </div>
          </div>
        </motion.section>

        {/* PANEL 2 — TOP NAV (Royal Stable inspired) */}
        <nav className="lib-topnav" aria-label="Library sections">
          <div className="lib-topnav-left">
            {NAV_ITEMS.map((n) => (
              <span key={n} title="Opening soon" style={{ opacity: 0.55, cursor: "default" }}>
                {n}
              </span>
            ))}
          </div>
          <Link to="/library" className="lib-topnav-mark" aria-label="The Library of PASTED">
            The Library<span style={{ fontStyle: "normal", color: BRASS, margin: "0 8px" }}>·</span><span style={{ fontFamily: SANS, fontStyle: "normal", fontWeight: 500, fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase" }}>PASTED</span>
          </Link>
          <div className="lib-topnav-right">
            <Link to="/library/apply" className="lib-pill">Request Access</Link>
          </div>
        </nav>

        {/* PANEL — WHAT THE LIBRARY IS */}
        <motion.section
          {...fade(0.12)}
          className="lib-section-pad"
          style={{ padding: "104px 44px", background: CREAM, borderTop: `1px solid ${HAIR}`, position: "relative" }}
        >
          <div style={{ ...TYPE.label, color: BRASS, textAlign: "center", marginBottom: 20 }}>
            Filed under · Foundations
          </div>
          <div className="lib-section-rule" />
          <h2 style={{ ...TYPE.h2, color: INK, textAlign: "center", margin: "0 0 48px" }}>
            A vault of work, given freely.
          </h2>
          <article className="lib-rsc-card lib-rsc-card--invert">
            <div className="lib-rsc-body">
              <div className="lib-rsc-icon" aria-hidden="true">F</div>
              <h3 style={{ ...TYPE.h3, margin: 0, color: "inherit" }}>
                Not a blog. Not a feed.
              </h3>
              <div style={{ ...TYPE.label, color: BRASS }}>
                Folio Ref · Foundations
              </div>
              <p style={{ ...TYPE.body, color: CREAM_QUIET, margin: 0, maxWidth: 460 }}>
                A private canon of essays, films, frameworks, and operating principles for people trying to become harder to ignore. Built for doctors, founders, creators, operators, and uncommon minds no longer interested in sounding like everyone else.
              </p>
              <div style={{ marginTop: 10 }}>
                <Link to="/library/apply" className="lib-pill">Request a Card</Link>
              </div>
            </div>
            <div className="lib-rsc-img" style={{ backgroundImage: `url(${worldArrivalCypress})` }} aria-hidden="true" />
          </article>
          <div style={{ textAlign: "center", marginTop: 64, fontFamily: DISPLAY, fontStyle: "italic", fontSize: "clamp(24px, 3vw, 32px)", color: BRASS, lineHeight: 1.1 }}>
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
              <div style={{ ...TYPE.label, color: BRASS, marginBottom: 22 }}>
                Filed under · Purpose
              </div>
              <h3 style={{ ...TYPE.h3, fontFamily: CORMORANT, color: INK, margin: "0 auto 24px", maxWidth: 480 }}>
                The internet made everyone visible.{" "}
                <span style={{ color: BRASS }}>It did not make everyone meaningful.</span>
              </h3>
              <p style={{ ...TYPE.body, lineHeight: 1.75, color: "rgba(26,20,16,0.82)", margin: "0 auto 16px", maxWidth: 460 }}>
                Most people are not short on content. They are short on canon. The Library exists to restore the deeper architecture — to think more clearly, build more beautifully, speak with more force, and become known without becoming hollow.
              </p>
              <p style={{ ...TYPE.caption, fontSize: 16, color: INK, margin: "0 auto", maxWidth: 440 }}>
                Not here to make you louder. Here to make you undeniable.
              </p>
              <div style={{ ...TYPE.labelTiny, color: BRASS, marginTop: 28, opacity: 0.8 }}>
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
          <div style={{ ...TYPE.label, color: BRASS, textAlign: "center", marginBottom: 20 }}>
            Filed under · Practice
          </div>
          <div className="lib-section-rule" />
          <h2 style={{ ...TYPE.h2, color: INK, textAlign: "center", margin: "0 0 64px" }}>
            Three ways to move through it
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="lib-rooms-grid">
            {[
              { t: "Read", glyph: "R", img: worldLibraryCorridor, tag: "The Stacks", c: "Begin with the essays, notes, and frameworks that meet you where you are." },
              { t: "Watch", glyph: "W", img: worldScreeningRoom, tag: "The Cinema", c: "Films and visual studies to sharpen taste, rhythm, story, and perception." },
              { t: "Build", glyph: "B", img: worldManorGrounds, tag: "The Forge", c: "Take what matters, discard what does not, and let the work change how you show up." },
            ].map((s) => (
              <article key={s.t} className="lib-rsc-mini">
                <div className="lib-rsc-mini-img" style={{ backgroundImage: `url(${s.img})` }} aria-hidden="true" />
                <div className="lib-rsc-mini-body">
                  <div className="lib-rsc-icon" aria-hidden="true">{s.glyph}</div>
                  <h3 style={{ ...TYPE.h3Mini, margin: 0, color: "inherit" }}>
                    {s.t}
                  </h3>
                  <div style={{ ...TYPE.label, color: BRASS }}>
                    {s.tag}
                  </div>
                  <p style={{ ...TYPE.body, fontSize: 15, color: CREAM_QUIET, margin: 0 }}>
                    {s.c}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        {/* PANEL — THE ROOMS */}
        <motion.section
          {...fade(0.2)}
          className="lib-section-pad"
          style={{ padding: "104px 44px", background: CREAM, borderTop: `1px solid ${HAIR}` }}
        >
          <div style={{ ...TYPE.label, color: BRASS, textAlign: "center", marginBottom: 20 }}>
            Filed under · Architecture
          </div>
          <div className="lib-section-rule" />
          <h2 style={{ ...TYPE.h2, color: INK, textAlign: "center", margin: "0 0 48px" }}>
            Each room holds a different kind of becoming.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>
            {[
              { name: "The Stacks", glyph: "S", status: "Open Soon", img: worldLibraryCorridor, desc: "Essays, manifestos, frameworks, and field notes on brand, desire, psychology, authority, and the architecture of becoming known." },
              { name: "The Reading Room", glyph: "R", status: "Under Construction", img: worldManorGrounds, desc: "Long-form pieces for slower thinking. Fewer answers. Better questions. The kind of work you return to when the noise gets too loud." },
              { name: "The Vault", glyph: "V", status: "Under Construction", img: worldManorNight, desc: "Private frameworks, internal notes, strategic systems, and deeper operating principles from inside the PASTED world." },
              { name: "The Cinema", glyph: "C", status: "Under Construction", img: worldScreeningRoom, desc: "Films, visual studies, content breakdowns, brand references, and cinematic artifacts for those learning to see before they create." },
              { name: "Periodicals", glyph: "P", status: "Under Construction", img: worldManorPasture, desc: "Ongoing dispatches, observations, cultural notes, and timely pieces from the edges of brand, business, dentistry, beauty, and taste." },
            ].map((r, i) => {
              const invert = i % 2 === 1;
              const isDark = !invert;
              const subColor = isDark ? "rgba(241,236,226,0.72)" : CREAM_QUIET;
              return (
                <article
                  key={r.name}
                  className={`lib-rsc-card${invert ? " lib-rsc-card--invert" : ""}`}
                >
                  <div className="lib-rsc-body">
                    <div className="lib-rsc-icon" aria-hidden="true">{r.glyph}</div>
                    <h3 style={{ ...TYPE.h3, margin: 0, color: "inherit" }}>
                      {r.name}
                    </h3>
                    <div style={{ ...TYPE.label, color: BRASS }}>
                      {r.status}
                    </div>
                    <p style={{ ...TYPE.body, color: subColor, margin: 0, maxWidth: 460 }}>
                      {r.desc}
                    </p>
                    <div style={{ marginTop: 10 }}>
                      <span className={`lib-pill${isDark ? " lib-pill--light" : ""} lib-pill--disabled`}>
                        Learn more
                      </span>
                    </div>
                  </div>
                  <div className="lib-rsc-img" style={{ backgroundImage: `url(${r.img})` }} aria-hidden="true" />
                </article>
              );
            })}
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
          <div style={{ ...TYPE.label, color: BRASS, textAlign: "center", marginBottom: 20, opacity: 0.85 }}>
            Filed under · Selected Volumes
          </div>
          <div className="lib-section-rule" style={{ background: "rgba(245,238,220,0.2)" }} />
          <h2 style={{ ...TYPE.h2, color: CREAM, margin: "0 0 16px", textAlign: "center" }}>
            The Canon
          </h2>
          <p style={{ ...TYPE.caption, fontSize: 16, color: "rgba(245,238,220,0.7)", textAlign: "center", margin: "0 auto 36px", maxWidth: 480 }}>
            Selected volumes from the Library. Fragments, studies, and principles worth returning to.
          </p>
          <div
            className="lib-gallery"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 24,
            }}
          >
            {[
              { src: worldEstateDusk, t: "Taste", g: "T", n: "Vol. I" },
              { src: worldLibraryCorridor, t: "Authority", g: "A", n: "Vol. II" },
              { src: worldArrivalCypress, t: "Restraint", g: "R", n: "Vol. III" },
              { src: worldManorNight, t: "Signal", g: "S", n: "Vol. IV" },
            ].map((v) => (
              <article key={v.t} className="lib-rsc-mini lib-rsc-mini--dark">
                <div className="lib-rsc-mini-img" style={{ backgroundImage: `url(${v.src})`, aspectRatio: "1 / 1" }} aria-hidden="true" />
                <div className="lib-rsc-mini-body" style={{ padding: "22px 22px 24px", gap: 10 }}>
                  <div className="lib-rsc-icon" aria-hidden="true">{v.g}</div>
                  <h3 style={{ ...TYPE.h3Mini, margin: 0, color: "inherit" }}>
                    {v.t}
                  </h3>
                  <div style={{ ...TYPE.labelTiny, color: BRASS }}>
                    {v.n}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <span className="lib-pill lib-pill--light lib-pill--disabled">Opening Soon</span>
          </div>
        </motion.section>

        {/* PANEL 5 — ENTRY (sidebar links framed as the rsc-card system) */}
        <motion.section
          {...fade(0.24)}
          className="lib-section-pad"
          style={{ padding: "104px 44px", background: CREAM_DEEP, borderTop: `1px solid ${HAIR}` }}
        >
          <div style={{ ...mono, color: BRASS, textAlign: "center", marginBottom: 18, fontSize: 9, letterSpacing: "0.4em" }}>
            Filed under · Entry
          </div>
          <div className="lib-section-rule" />
          <h2 style={{ fontFamily: CORMORANT, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(26px, 4vw, 34px)", color: INK, textAlign: "center", margin: "0 0 44px", lineHeight: 1.2 }}>
            For those entering deeper.
          </h2>
          <article className="lib-rsc-card">
            <div className="lib-rsc-img" style={{ backgroundImage: `url(${portraitBW})` }} aria-hidden="true" />
            <div className="lib-rsc-body">
              <div className="lib-rsc-icon" aria-hidden="true">E</div>
              <h3 style={{ fontFamily: DISPLAY, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(28px, 3.4vw, 38px)", margin: 0, lineHeight: 1.05, color: "inherit" }}>
                Free yourself,<br/>the rest follows.
              </h3>
              <div style={{ fontFamily: MONO_FF, fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: BRASS }}>
                Four doors · One canon
              </div>
              <p style={{ fontFamily: CORMORANT, fontSize: 16, lineHeight: 1.65, color: "rgba(241,236,226,0.72)", margin: 0, maxWidth: 460 }}>
                Choose where to begin. New volumes open weekly. Cards are issued to those who actually intend to read.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 12 }}>
                {[
                  { label: "Request Access", to: "/library/apply", primary: true },
                  { label: "See What's Coming", to: "/library/apply" },
                  { label: "Member Sign In", to: "/library/login" },
                  { label: "Visit PASTED", to: "/" },
                ].map((item) => (
                  <Link key={item.label} to={item.to} className={`lib-pill${item.primary ? "" : " lib-pill--light"}`}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </article>
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
                fontFamily: DISPLAY,
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
