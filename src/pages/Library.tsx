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
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: ${INK};
          padding: 12px 22px;
          border: 1px solid ${BRASS};
          border-radius: 2px;
          text-decoration: none;
          transition: background 200ms ease, color 200ms ease;
        }
        .lib-cta:hover { background: ${BRASS}; color: ${CREAM}; }
        .lib-cta--solid { background: ${INK}; color: ${CREAM}; border-color: ${INK}; }
        .lib-cta--solid:hover { background: ${BRASS}; border-color: ${BRASS}; }
        .lib-nav-item {
          font-family: ${INTER};
          font-weight: 500;
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: ${INK};
          text-decoration: none;
          padding: 16px 8px;
          flex: 1;
          text-align: center;
          transition: color 200ms ease;
        }
        .lib-nav-item:hover { color: ${BRASS}; }
        .lib-nav-item + .lib-nav-item { border-left: 1px solid ${HAIR}; }
        @media (max-width: 640px) {
          .lib-row-2col, .lib-row-sidebar, .lib-footer-row {
            grid-template-columns: 1fr !important;
          }
          .lib-nav-strip { flex-wrap: wrap; }
          .lib-nav-item { flex: 1 0 50%; border-left: none !important; border-top: 1px solid ${HAIR}; }
          .lib-gallery { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      <div className="lib-grain" aria-hidden="true" />

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
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Emblem />
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
          {NAV_ITEMS.map((n) => (
            <span
              key={n}
              className="lib-nav-item"
              aria-disabled="true"
              title="Under construction — opening soon"
              style={{ cursor: "default", opacity: 0.55 }}
            >
              {n}
            </span>
          ))}
        </nav>

        {/* PANEL 3 — TWO COL: FIGURE / STATEMENT + CTAS */}
        <motion.section
          {...fade(0.15)}
          className="lib-row-2col"
          style={{
            display: "grid",
            gridTemplateColumns: "1.05fr 1fr",
          }}
        >
          <div
            style={{
              backgroundImage: `url(${figureBW})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: 360,
            }}
            aria-hidden="true"
          />
          <div
            style={{
              padding: "56px 44px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              background: CREAM,
            }}
          >
            <div style={{ ...mono, color: BRASS, marginBottom: 20 }}>The Atrium</div>
            <h1
              style={{
                fontFamily: SCRIPT,
                fontSize: "clamp(40px, 6vw, 58px)",
                color: INK,
                lineHeight: 1.05,
                margin: 0,
                letterSpacing: "0.005em",
              }}
            >
              Read, Watch,
              <br />
              Become.
            </h1>
            <p
              style={{
                fontFamily: CORMORANT,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: 18,
                lineHeight: 1.55,
                color: CREAM_QUIET,
                margin: "24px 0 32px",
                maxWidth: 320,
              }}
            >
              A private canon on becoming undeniable. A vault of work, given freely.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link to="/library/apply" className="lib-cta lib-cta--solid">
                Apply
              </Link>
              <Link to="/library/members" className="lib-cta">
                Enter
              </Link>
            </div>
            <div
              style={{
                ...mono,
                color: BRASS,
                marginTop: 22,
                opacity: 0.75,
              }}
            >
              The rooms — under construction · opening soon
            </div>
          </div>
        </motion.section>

        {/* PANEL 4 — GALLERY STRIP */}
        <motion.section
          {...fade(0.2)}
          style={{
            borderTop: `1px solid ${HAIR}`,
            background: CREAM_DEEP,
            padding: "36px 44px 40px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <h2
              style={{
                fontFamily: SCRIPT,
                fontSize: 36,
                color: INK,
                margin: 0,
                lineHeight: 1,
              }}
            >
              The Canon
            </h2>
            <span style={{ ...mono, color: BRASS }}>VOL · I — V</span>
          </div>
          <div
            className="lib-gallery"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 12,
            }}
          >
            {[thumb1, thumb2, thumb3, thumb4].map((src, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  aspectRatio: "1 / 1",
                  backgroundImage: `url(${src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  outline: `1px solid ${HAIR}`,
                  outlineOffset: -1,
                }}
                aria-hidden="true"
              />
            ))}
          </div>
        </motion.section>

        {/* PANEL 5 — SIDEBAR LINKS + PORTRAIT */}
        <motion.section
          {...fade(0.25)}
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
            {[
              { label: "Membership Card", to: "/library/apply" },
              { label: "Forthcoming Volumes", to: "/library/apply" },
              { label: "Sign In", to: "/library/login" },
              { label: "Visit the Studio", to: "/" },
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
            gridTemplateColumns: "1fr 1.4fr 1fr",
            alignItems: "center",
            gap: 20,
            padding: "36px 44px",
            borderTop: `1px solid ${HAIR}`,
            background: CREAM,
          }}
        >
          {/* Monogram */}
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div
              style={{
                width: 64,
                height: 64,
                border: `1px solid ${BRASS}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: SCRIPT,
                fontSize: 36,
                color: BRASS,
                lineHeight: 1,
              }}
              aria-label="PASTED Library monogram"
            >
              PL
            </div>
          </div>
          {/* Building */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={buildingLine}
              alt="Illustration of the Library"
              width={260}
              height={130}
              loading="lazy"
              style={{
                width: 260,
                height: "auto",
                mixBlendMode: "multiply",
                opacity: 0.92,
              }}
            />
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
            <div style={{ color: BRASS }}>MMXXVI</div>
          </div>
        </motion.footer>
      </motion.div>
    </div>
  );
};

export default Library;
