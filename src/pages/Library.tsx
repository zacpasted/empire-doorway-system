import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

/**
 * THE PASTED LIBRARY — Atrium
 * A magazine cover for an institution that has been around for a hundred years.
 * Single viewport. Three zones: masthead, hero, shelf. One CTA.
 */

const FONT_LINK_ID = "library-fonts";
const ensureFonts = () => {
  if (document.getElementById(FONT_LINK_ID)) return;
  const pre1 = document.createElement("link");
  pre1.rel = "preconnect";
  pre1.href = "https://fonts.googleapis.com";
  document.head.appendChild(pre1);
  const pre2 = document.createElement("link");
  pre2.rel = "preconnect";
  pre2.href = "https://fonts.gstatic.com";
  pre2.crossOrigin = "";
  document.head.appendChild(pre2);
  const link = document.createElement("link");
  link.id = FONT_LINK_ID;
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Inter:wght@400;500&display=swap";
  document.head.appendChild(link);
};

const NIGHT = "#1A1410";
const CREAM = "#F5EEDC";
const CREAM_QUIET = "rgba(245, 238, 220, 0.72)";
const BRASS = "#B8954C";
const BRASS_GLOW = "#C89B4A";

const EASE = [0.16, 1, 0.3, 1] as const;
const CORMORANT =
  "'Cormorant Garamond', Georgia, 'Times New Roman', serif";
const INTER = "Inter, system-ui, -apple-system, sans-serif";
const FEATURES = '"liga","dlig","swsh","salt","kern"';

/* ============================================================
   Word Reveal
============================================================ */
const WordReveal = ({
  text,
  startDelay = 0,
  stagger = 0.08,
  extraDelayOnIndex,
  extraDelay = 0,
}: {
  text: string;
  startDelay?: number;
  stagger?: number;
  extraDelayOnIndex?: number;
  extraDelay?: number;
}) => {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    return (
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: startDelay }}
        style={{ display: "inline" }}
      >
        {text}
      </motion.span>
    );
  }

  let cumulative = startDelay;
  return (
    <>
      {words.map((w, i) => {
        const delay = cumulative;
        cumulative += stagger + (extraDelayOnIndex === i ? extraDelay : 0);
        return (
          <span
            key={i}
            style={{ display: "inline-block", overflow: "hidden", verticalAlign: "baseline" }}
          >
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay, ease: EASE }}
              style={{ display: "inline-block" }}
            >
              {w}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        );
      })}
    </>
  );
};

/* ============================================================
   Shelf — five static spines
============================================================ */
const SHELF_VOLUMES = [
  { w: 84, h: "80%", bg: "linear-gradient(180deg, #C89B4A 0%, #6A5C36 100%)", op: 1, glow: true, title: true, mobileW: 64 },
  { w: 64, h: "72%", bg: "#9B8456", op: 0.65, glow: false, title: false, mobileW: 48 },
  { w: 54, h: "64%", bg: "#8B7A5A", op: 0.4, glow: false, title: false, mobileW: 40 },
  { w: 46, h: "56%", bg: "#7A6F58", op: 0.25, glow: false, title: false, mobileW: 34 },
  { w: 40, h: "50%", bg: "#6E6450", op: 0.15, glow: false, title: false, mobileW: 28 },
];

const Shelf = () => {
  const reduced = useReducedMotion();
  return (
    <motion.div
      aria-label="Five volumes in the canon: one in circulation, four forthcoming"
      initial={{ opacity: 0, y: reduced ? 0 : 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 1.6, ease: EASE }}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 80,
        height: "30vh",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 40,
          right: 40,
          bottom: 0,
          height: 8,
          background:
            "linear-gradient(180deg, rgba(184, 149, 76, 0.2) 0%, rgba(184, 149, 76, 0) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 24,
          paddingBottom: 8,
        }}
      >
        {SHELF_VOLUMES.map((v, i) => (
          <div
            key={i}
            aria-hidden="true"
            className="lib-spine"
            data-mobile-w={v.mobileW}
            style={{
              width: v.w,
              height: v.h,
              background: v.bg,
              opacity: v.op,
              borderTop: v.glow
                ? "1px solid rgba(245, 239, 225, 0.2)"
                : "1px solid rgba(255,255,255,0.08)",
              borderRadius: v.glow ? "1px 1px 0 0" : 0,
              boxShadow: v.glow
                ? "0 -8px 20px rgba(0,0,0,0.45), 0 0 40px rgba(184, 153, 104, 0.28)"
                : "none",
              position: "relative",
              ["--mw" as string]: `${v.mobileW}px`,
            } as React.CSSProperties}
          >
            {v.title && (
              <>
                <span
                  style={{
                    position: "absolute",
                    top: 12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontFamily: CORMORANT,
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: 18,
                    color: CREAM,
                    lineHeight: 1,
                    fontFeatureSettings: FEATURES,
                  }}
                >
                  I
                </span>
                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%) rotate(180deg)",
                    writingMode: "vertical-rl",
                    fontFamily: CORMORANT,
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: 11,
                    color: CREAM_QUIET,
                    letterSpacing: "0.08em",
                    fontFeatureSettings: FEATURES,
                    whiteSpace: "nowrap",
                  }}
                >
                  The Art of Becoming
                </span>
              </>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

/* ============================================================
   Page
============================================================ */
const Library = () => {
  const reduced = useReducedMotion();

  useEffect(() => {
    ensureFonts();
    document.title =
      "The PASTED Library — A private canon on becoming undeniable";
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

  return (
    <div
      className="lib-root"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: NIGHT,
        color: CREAM,
        fontFamily: CORMORANT,
        fontFeatureSettings: FEATURES,
        overflow: "hidden",
      }}
    >
      <style>{`
        .lib-root * { font-feature-settings: ${FEATURES}; }
        .lib-vignette {
          position: fixed; inset: 0; z-index: 1; pointer-events: none;
          background: radial-gradient(ellipse 90% 70% at 35% 25%,
            rgba(255, 220, 160, 0.06) 0%,
            rgba(255, 220, 160, 0.0) 35%,
            rgba(58, 69, 85, 0.0) 60%,
            rgba(58, 69, 85, 0.18) 100%);
          mix-blend-mode: multiply;
        }
        .lib-grain {
          position: fixed; inset: 0; z-index: 2; pointer-events: none;
          opacity: 0.10; mix-blend-mode: multiply;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
        }
        .lib-apply-link::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -6px;
          height: 1px;
          background: ${BRASS};
          transform-origin: left;
        }
        .lib-apply-link {
          position: relative;
          padding: 8px 0;
        }
        .lib-apply-link:focus-visible,
        .lib-nav-apply:focus-visible {
          outline: 2px solid ${BRASS};
          outline-offset: 4px;
        }
        .lib-apply-link:hover { opacity: 0.7; }
        .lib-nav-apply:hover { opacity: 0.7; }
        .lib-nav-apply {
          position: relative;
          padding-bottom: 4px;
          border-bottom: 1px solid ${BRASS};
        }
        @media (max-width: 720px) {
          .lib-masthead-row {
            flex-direction: column !important;
            gap: 32px !important;
            align-items: center !important;
            text-align: center;
          }
          .lib-masthead-side { justify-content: center !important; }
          .lib-nav-inner { padding: 0 24px !important; }
          .lib-nav-title { font-size: 16px !important; }
          .lib-footer-row {
            flex-direction: column !important;
            gap: 8px !important;
            text-align: center;
          }
          .lib-spine { width: var(--mw) !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      <div className="lib-vignette" aria-hidden="true" />
      <div className="lib-grain" aria-hidden="true" />

      {/* TOP NAV */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 56,
          zIndex: 40,
          background: "rgba(26, 20, 16, 0.72)",
          backdropFilter: "blur(20px) saturate(1.2)",
          WebkitBackdropFilter: "blur(20px) saturate(1.2)",
          borderBottom: "1px solid rgba(184, 149, 76, 0.12)",
        }}
      >
        <div
          className="lib-nav-inner"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            height: "100%",
            padding: "0 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            to="/library"
            className="lib-nav-title"
            style={{
              fontFamily: CORMORANT,
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: 18,
              color: CREAM,
              letterSpacing: "0.08em",
              textDecoration: "none",
              fontFeatureSettings: FEATURES,
            }}
          >
            PASTED <span style={{ color: BRASS }}>·</span> THE LIBRARY
          </Link>
          <Link
            to="/library/apply"
            className="lib-nav-apply"
            style={{
              fontFamily: INTER,
              fontWeight: 500,
              fontSize: 11,
              color: BRASS,
              textTransform: "uppercase",
              letterSpacing: "0.32em",
              textDecoration: "none",
              transition: "opacity 200ms ease",
            }}
          >
            Apply
          </Link>
        </div>
      </motion.nav>

      {/* PAGE BODY */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          minHeight: "100vh",
          paddingTop: 56,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* MASTHEAD ZONE */}
        <header
          style={{
            padding: "64px 48px 0",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="lib-masthead-row"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
            }}
          >
            {/* Monogram */}
            <div
              className="lib-masthead-side"
              style={{ display: "flex", justifyContent: "flex-start", flex: "1 1 0" }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  border: `1px solid ${BRASS}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: CORMORANT,
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: 20,
                  color: BRASS,
                  letterSpacing: "0.02em",
                  fontFeatureSettings: FEATURES,
                }}
              >
                PL
              </div>
            </div>
            {/* Publication name */}
            <div
              style={{
                fontFamily: CORMORANT,
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: 22,
                color: CREAM,
                letterSpacing: "0.08em",
                whiteSpace: "nowrap",
                fontFeatureSettings: FEATURES,
              }}
            >
              THE PASTED LIBRARY
            </div>
            {/* Issue mark */}
            <div
              className="lib-masthead-side"
              style={{ display: "flex", justifyContent: "flex-end", flex: "1 1 0" }}
            >
              <span
                style={{
                  fontFamily: INTER,
                  fontWeight: 500,
                  fontSize: 10,
                  color: BRASS,
                  textTransform: "uppercase",
                  letterSpacing: "0.42em",
                  whiteSpace: "nowrap",
                }}
              >
                VOL&nbsp;·&nbsp;I&nbsp;·&nbsp;NO&nbsp;·&nbsp;01&nbsp;·&nbsp;MMXXVI
              </span>
            </div>
          </motion.div>

          {/* Hairline beneath */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            style={{
              height: 1,
              background: BRASS,
              opacity: 0.3,
              marginTop: 24,
              transformOrigin: "left",
            }}
          />
        </header>

        {/* HERO ZONE */}
        <main
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px 24px 0",
            position: "relative",
            zIndex: 5,
          }}
        >
          <div style={{ maxWidth: 640, width: "100%", textAlign: "center" }}>
            <h1
              style={{
                fontFamily: CORMORANT,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(48px, 7.5vw, 88px)",
                lineHeight: 1.02,
                letterSpacing: "-0.025em",
                color: CREAM,
                margin: 0,
                fontFeatureSettings: FEATURES,
              }}
            >
              <span style={{ display: "block" }}>
                <WordReveal text="A private canon" startDelay={0.6} />
              </span>
              <span style={{ display: "block" }}>
                <WordReveal text="on becoming" startDelay={0.6 + 3 * 0.08} extraDelayOnIndex={1} extraDelay={0.1} />
              </span>
              <span style={{ display: "block" }}>
                <WordReveal text="undeniable." startDelay={0.6 + 5 * 0.08 + 0.1} />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.4 }}
              style={{
                fontFamily: CORMORANT,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(20px, 2.2vw, 26px)",
                lineHeight: 1.45,
                color: CREAM_QUIET,
                marginTop: 56,
                marginBottom: 0,
                marginLeft: "auto",
                marginRight: "auto",
                maxWidth: 420,
                fontFeatureSettings: FEATURES,
              }}
            >
              A vault of work,
              <br />
              given freely.
            </motion.p>

            {/* Ruled fleuron divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.8 }}
              aria-hidden="true"
              style={{
                marginTop: 64,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
                width: "fit-content",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <span style={{ width: 60, height: 1, background: "rgba(184, 149, 76, 0.6)" }} />
              <span
                style={{
                  fontFamily: CORMORANT,
                  color: BRASS,
                  fontSize: 14,
                  lineHeight: 1,
                }}
              >
                ✦
              </span>
              <span style={{ width: 60, height: 1, background: "rgba(184, 149, 76, 0.6)" }} />
            </motion.div>

            {/* Apply link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.2 }}
              style={{ marginTop: 40 }}
            >
              <Link
                to="/library/apply"
                aria-label="Apply for your Library Card"
                className="lib-apply-link"
                style={{
                  fontFamily: CORMORANT,
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: 22,
                  color: BRASS,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                  transition: "opacity 200ms ease",
                  fontFeatureSettings: FEATURES,
                }}
              >
                Apply for your card
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 2.4 }}
                  style={{ display: "inline-block", transform: "translateY(-1px)" }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </main>

        {/* SHELF ZONE */}
        <Shelf />

        {/* FOOTER */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 0.5, delay: 2.4 }}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 32,
            padding: "0 40px",
            zIndex: 6,
          }}
        >
          <div
            className="lib-footer-row"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: INTER,
              fontWeight: 400,
              fontSize: 10,
              color: CREAM,
              textTransform: "uppercase",
              letterSpacing: "0.32em",
            }}
          >
            <span>EST · MMXXVI</span>
            <span>A publication of PASTED</span>
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default Library;