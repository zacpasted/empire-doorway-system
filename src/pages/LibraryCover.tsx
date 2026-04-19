import { useEffect, useState } from "react";
import libraryCoverHero from "@/assets/library-cover-hero.jpg";

/**
 * THE PASTED LIBRARY · COVER
 * Volume I · Dispatch One — frontispiece for "The Private Doctrine on Brand."
 *
 * Standalone static cover. Single hero photograph, typographic overlay.
 * Magazine register: The Gentlewoman × Cereal × Soho House booklet.
 *
 * To swap the cover photo:
 *   Replace the value of `coverImageSrc` below with an imported asset, e.g.
 *     import coverHero from "@/assets/library-cover-hero.jpg";
 *     const coverImageSrc = coverHero;
 *
 *   PHOTO GUIDANCE:
 *   - Landscape compositions with soft negative space in the center work best
 *     (the title block sits in the vertical middle)
 *   - Warm/neutral tones preferred; extremely cool or saturated photos will
 *     fight the duotone filter
 *   - Avoid photos with faces in the dead center — the title overlays that zone
 *   - Recommended subjects: architectural interior, still life (objects, bookshelf,
 *     vintage document), a practice space in warm afternoon light, a single
 *     artifact (camera, book, sculpture) against a neutral ground
 *   - Resolution: at least 2400px on the long edge for retina-quality viewport display
 */

const FONT_LINK_ID = "library-cover-fonts";

const ensureFonts = () => {
  if (document.getElementById(FONT_LINK_ID)) return;
  const pc1 = document.createElement("link");
  pc1.rel = "preconnect";
  pc1.href = "https://fonts.googleapis.com";
  document.head.appendChild(pc1);

  const pc2 = document.createElement("link");
  pc2.rel = "preconnect";
  pc2.href = "https://fonts.gstatic.com";
  pc2.crossOrigin = "";
  document.head.appendChild(pc2);

  const link = document.createElement("link");
  link.id = FONT_LINK_ID;
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap";
  document.head.appendChild(link);
};

// Cover hero image — swap this import to replace the cover photo.
const coverImageSrc: string | null = libraryCoverHero;

const LibraryCover = () => {
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    ensureFonts();
    document.title = "The Private Doctrine on Brand · The PASTED Library";
    const desc =
      "Volume I, Dispatch One. On what a brand actually is, what yours is not, and how the practices that compound quietly pulled ahead.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, []);

  return (
    <main className="library-cover" aria-label="The PASTED Library — Volume I cover">
      <style>{`
        .library-cover {
          --bone: #EDE7DB;
          --ink: #1C1B18;
          --cream: #F5EFE1;
          --cream-quiet: rgba(245, 239, 225, 0.72);
          --cream-whisper: rgba(245, 239, 225, 0.52);
          --brass: #B89968;
          --brass-line: rgba(184, 153, 104, 0.48);
          --bone-quiet: #A59E8E;

          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          height: 100svh;
          overflow: hidden;
          background: var(--ink);
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          font-feature-settings: "liga", "dlig", "kern", "tnum";
          color: var(--cream);
          display: flex;
          flex-direction: column;
        }

        /* ---- Photo layer (z 0) ---- */
        .lc-photo-wrap {
          position: absolute; inset: 0; z-index: 0;
          background: var(--ink);
          opacity: 0;
          transform: scale(1.02);
          animation: lc-photo-in 1200ms ease-out forwards;
        }
        .lc-photo {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          display: block;
          filter: sepia(0.12) contrast(1.02) brightness(0.96);
        }
        .lc-photo-placeholder {
          position: absolute; inset: 0;
          background: var(--bone);
        }
        .lc-photo-placeholder span {
          position: absolute;
          left: 50%; top: 18px;
          transform: translateX(-50%);
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-weight: 400;
          font-size: 12px; color: var(--bone-quiet);
          letter-spacing: 0.18em; text-transform: lowercase;
          opacity: 0.55;
        }

        /* ---- Readability gradient (z 1) ---- */
        .lc-gradient {
          position: absolute; inset: 0; z-index: 1;
          pointer-events: none;
          background: linear-gradient(
            to bottom,
            rgba(28, 27, 24, 0.55) 0%,
            rgba(28, 27, 24, 0.15) 40%,
            rgba(28, 27, 24, 0.15) 60%,
            rgba(28, 27, 24, 0.45) 100%
          );
        }

        /* ---- Grain overlay (z 2) ---- */
        .lc-grain {
          position: absolute; inset: 0; z-index: 2;
          pointer-events: none;
          opacity: 0.18;
          mix-blend-mode: multiply;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'><filter id='p'><feTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' seed='4'/><feColorMatrix values='0 0 0 0 0.1 0 0 0 0 0.08 0 0 0 0 0.06 0 0 0 0.5 0'/></filter><rect width='100%25' height='100%25' filter='url(%23p)'/></svg>");
        }

        /* ---- Zone A · Masthead ---- */
        .lc-masthead {
          position: relative; z-index: 10;
          padding: 64px 64px 0;
          opacity: 0;
          animation: lc-fade-in 600ms ease-out 400ms forwards;
        }
        .lc-masthead-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
        }
        .lc-monogram {
          width: 48px; height: 48px;
          border: 1px solid var(--brass);
          border-radius: 1px;
          background: transparent;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-weight: 500; font-size: 18px;
          color: var(--brass);
          letter-spacing: 0.08em;
          flex-shrink: 0;
        }
        .lc-spine {
          flex: 1; height: 1px;
          background: var(--brass-line);
          margin: 0 32px;
        }
        .lc-masthead-meta {
          text-align: right;
          display: flex; flex-direction: column; gap: 4px;
          flex-shrink: 0;
        }
        .lc-masthead-meta .l1 {
          font-weight: 500; font-size: 10px;
          letter-spacing: 0.36em; text-transform: uppercase;
          color: var(--brass);
        }
        .lc-masthead-meta .l2 {
          font-weight: 500; font-size: 9px;
          letter-spacing: 0.36em; text-transform: uppercase;
          color: var(--cream-quiet);
        }

        /* ---- Zone B · Title block ---- */
        .lc-center {
          position: relative; z-index: 10;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 48px 24px;
        }
        .lc-titleblock {
          max-width: 720px;
          width: 100%;
          display: flex; flex-direction: column; align-items: center;
          text-align: center;
        }
        .lc-stagger > * { opacity: 0; animation: lc-fade-in 800ms ease-out forwards; }
        .lc-stagger > *:nth-child(1) { animation-delay: 200ms; }
        .lc-stagger > *:nth-child(2) { animation-delay: 280ms; }
        .lc-stagger > *:nth-child(3) { animation-delay: 360ms; }
        .lc-stagger > *:nth-child(4) { animation-delay: 440ms; }
        .lc-stagger > *:nth-child(5) { animation-delay: 520ms; }
        .lc-stagger > *:nth-child(6) { animation-delay: 600ms; }
        .lc-stagger > *:nth-child(7) { animation-delay: 680ms; }

        .lc-series {
          font-family: 'Inter', sans-serif;
          font-weight: 500; font-size: 11px;
          letter-spacing: 0.42em; text-transform: uppercase;
          color: var(--brass);
          margin: 0;
        }
        .lc-ornament {
          margin-top: 16px;
          color: var(--brass);
          font-size: 10px;
          line-height: 1;
        }
        .lc-rule {
          width: 56px; height: 1px;
          background: var(--brass);
          border: 0;
        }
        .lc-rule.top { margin-top: 24px; }
        .lc-rule.bottom { margin-top: 48px; }

        .lc-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(56px, 8vw, 96px);
          line-height: 0.96;
          letter-spacing: -0.02em;
          color: var(--cream);
          margin: 48px 0 0;
        }
        .lc-title em {
          font-style: italic;
          color: var(--brass);
          font-feature-settings: "liga", "dlig", "kern", "swsh", "salt";
        }

        .lc-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-weight: 300;
          font-size: clamp(17px, 1.6vw, 20px);
          line-height: 1.5;
          color: var(--cream-quiet);
          max-width: 540px;
          margin: 32px 0 0;
        }

        /* ---- Zone C · Bottom meta ---- */
        .lc-footer {
          position: relative; z-index: 10;
          padding: 0 64px 64px;
          opacity: 0;
          animation: lc-fade-in 600ms ease-out 400ms forwards;
        }
        .lc-footer-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; align-items: flex-end; justify-content: space-between;
          gap: 32px;
        }
        .lc-footer-left { display: flex; flex-direction: column; gap: 4px; }
        .lc-footer-left .l1 {
          font-weight: 500; font-size: 10px;
          letter-spacing: 0.36em; text-transform: uppercase;
          color: var(--brass);
        }
        .lc-footer-left .l2 {
          font-weight: 500; font-size: 9px;
          letter-spacing: 0.32em; text-transform: uppercase;
          color: var(--cream-whisper);
        }
        .lc-footer-right {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-weight: 400;
          font-size: 16px;
          color: var(--cream-quiet);
          text-align: right;
        }

        /* ---- Animations ---- */
        @keyframes lc-fade-in {
          to { opacity: 1; }
        }
        @keyframes lc-photo-in {
          to { opacity: 1; transform: scale(1.0); }
        }

        /* ---- Tablet ---- */
        @media (max-width: 1023px) {
          .lc-masthead { padding: 48px 40px 0; }
          .lc-footer { padding: 0 40px 48px; }
          .lc-title { font-size: clamp(48px, 7vw, 80px); }
          .lc-subtitle { max-width: 480px; }
        }

        /* ---- Mobile ---- */
        @media (max-width: 719px) {
          .lc-masthead { padding: 32px 24px 0; }
          .lc-footer { padding: 0 24px 32px; }
          .lc-spine { margin: 0 20px; }
          .lc-monogram { width: 42px; height: 42px; font-size: 16px; }
          .lc-masthead-meta .l1 { font-size: 9px; letter-spacing: 0.32em; }
          .lc-masthead-meta .l2 { font-size: 8px; letter-spacing: 0.32em; }

          .lc-center { padding: 32px 20px; }
          .lc-title {
            font-size: clamp(40px, 11vw, 56px);
            margin-top: 36px;
          }
          .lc-rule.bottom { margin-top: 36px; }
          .lc-subtitle {
            font-size: 16px;
            max-width: 90%;
            margin-top: 24px;
          }

          .lc-footer-inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          .lc-footer-right { text-align: left; }
        }

        /* ---- Reduced motion ---- */
        @media (prefers-reduced-motion: reduce) {
          .lc-photo-wrap,
          .lc-masthead,
          .lc-footer,
          .lc-stagger > * {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Photo layer */}
      <div className="lc-photo-wrap">
        {coverImageSrc ? (
          <img
            src={coverImageSrc}
            alt=""
            className="lc-photo"
            onLoad={() => setImgLoaded(true)}
            decoding="async"
          />
        ) : (
          <div className="lc-photo-placeholder" aria-label="Cover image · 16:9 or 3:4, min 2400px wide, warm tones work best">
            <span>Cover image</span>
          </div>
        )}
      </div>

      {/* Readability gradient */}
      <div className="lc-gradient" aria-hidden="true" />

      {/* Grain overlay */}
      <div className="lc-grain" aria-hidden="true" />

      {/* Zone A — Masthead */}
      <header className="lc-masthead">
        <div className="lc-masthead-inner">
          <div className="lc-monogram" aria-label="The PASTED Library">PL</div>
          <div className="lc-spine" aria-hidden="true" />
          <div className="lc-masthead-meta">
            <span className="l1">VOLUME I</span>
            <span className="l2">MMXXVI</span>
          </div>
        </div>
      </header>

      {/* Zone B — Title block */}
      <section className="lc-center">
        <div className="lc-titleblock lc-stagger">
          <p className="lc-series">THE PASTED LIBRARY</p>
          <div className="lc-ornament" aria-hidden="true">✦</div>
          <hr className="lc-rule top" aria-hidden="true" />
          <h1 className="lc-title">
            The Private<br />
            Doctrine on<br />
            <em>Brand.</em>
          </h1>
          <hr className="lc-rule bottom" aria-hidden="true" />
          <p className="lc-subtitle">
            On what a brand actually is, what yours is not, and how the practices that compound quietly pulled ahead.
          </p>
        </div>
      </section>

      {/* Zone C — Bottom meta */}
      <footer className="lc-footer">
        <div className="lc-footer-inner">
          <div className="lc-footer-left">
            <span className="l1">DISPATCH ONE</span>
            <span className="l2">THE PRIVATE DOCTRINE ON BRAND</span>
          </div>
          <div className="lc-footer-right">
            <em>Where Dentistry Becomes Iconic.</em>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default LibraryCover;
