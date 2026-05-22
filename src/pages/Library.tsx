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
        @media (max-width: 640px) {
          .lib-row-2col, .lib-row-sidebar, .lib-footer-row {
            grid-template-columns: 1fr !important;
          }
          .lib-nav-strip { flex-wrap: wrap; }
          .lib-nav-item { flex: 1 0 50%; border-left: none !important; border-top: 1px solid ${HAIR}; }
          .lib-gallery { grid-template-columns: repeat(2, 1fr) !important; }
          .lib-steps-grid, .lib-rooms-grid { grid-template-columns: 1fr !important; }
          .lib-room-card { grid-template-columns: 48px 1fr !important; }
          .lib-room-card > .lib-room-arrow { display: none; }
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
          {/* Hero archival corner marks */}
          <div style={{ position: "absolute", top: 16, left: 20, ...mono, color: CREAM, opacity: 0.75, fontSize: 9 }}>
            EST · MMXXVI
          </div>
          <div style={{ position: "absolute", top: 16, right: 20, ...mono, color: CREAM, opacity: 0.75, fontSize: 9 }}>
            VOL · I
          </div>
          <div style={{ position: "absolute", bottom: 16, left: 20, ...mono, color: CREAM, opacity: 0.75, fontSize: 9 }}>
            PRIVATE CANON
          </div>
          <div style={{ position: "absolute", bottom: 16, right: 20, ...mono, color: CREAM, opacity: 0.75, fontSize: 9 }}>
            ACCESSION · 001
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
                fontFamily: SCRIPT,
                fontSize: "clamp(44px, 7vw, 72px)",
                color: CREAM,
                margin: "20px 0 14px",
                lineHeight: 1,
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
                fontSize: "clamp(15px, 1.8vw, 18px)",
                color: CREAM_DEEP,
                maxWidth: 480,
                margin: 0,
                lineHeight: 1.5,
                textShadow: "0 1px 12px rgba(0,0,0,0.6)",
              }}
            >
              A private canon for the ones building taste, authority, signal, and selfhood in a world addicted to noise.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 22 }}>
              <Link to="/library/members" className="lib-cta lib-cta--solid" style={{ background: CREAM, color: INK, borderColor: CREAM }}>
                Enter the Library
              </Link>
              <Link to="/library/apply" className="lib-cta" style={{ color: CREAM, borderColor: CREAM }}>
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

        {/* PANEL — WHAT THE LIBRARY IS */}
        <motion.section
          {...fade(0.12)}
          style={{ padding: "72px 44px 64px", background: CREAM, borderTop: `1px solid ${HAIR}` }}
        >
          <div style={{ ...mono, color: BRASS, textAlign: "center", marginBottom: 14 }}>§ I · What The Library Is</div>
          <div className="lib-section-rule" />
          <h2 style={{ fontFamily: CORMORANT, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(28px, 4.4vw, 40px)", color: INK, textAlign: "center", margin: "0 0 28px", lineHeight: 1.15 }}>
            A vault of work, given freely.
          </h2>
          <div style={{ maxWidth: 560, margin: "0 auto", fontFamily: CORMORANT, fontSize: 17, lineHeight: 1.7, color: CREAM_QUIET }}>
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
          <div style={{ textAlign: "center", marginTop: 36, fontFamily: SCRIPT, fontSize: 34, color: BRASS, lineHeight: 1 }}>
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
              minHeight: 360,
            }}
            aria-hidden="true"
          />
          <div
            style={{
              padding: "64px 44px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              background: CREAM,
            }}
          >
            <div style={{ ...mono, color: BRASS, marginBottom: 16 }}>§ II · Why It Exists</div>
            <h2 style={{ fontFamily: CORMORANT, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(24px, 3.4vw, 32px)", color: INK, lineHeight: 1.2, margin: "0 0 20px" }}>
              Because the internet made everyone visible. It did not make everyone meaningful.
            </h2>
            <p style={{ fontFamily: CORMORANT, fontSize: 16, lineHeight: 1.65, color: CREAM_QUIET, margin: "0 0 14px" }}>
              Most people are not short on content. They are short on canon. They have tactics, templates, trends, posts, offers, hooks, frameworks, advice, and noise. What they do not have is a deeper architecture for who they are becoming.
            </p>
            <p style={{ fontFamily: CORMORANT, fontSize: 16, lineHeight: 1.65, color: CREAM_QUIET, margin: "0 0 14px" }}>
              The Library exists to restore that architecture. A place to think more clearly. To build more beautifully. To speak with more force. To sell without becoming cheap. To become known without becoming hollow.
            </p>
            <p style={{ fontFamily: CORMORANT, fontStyle: "italic", fontSize: 17, color: INK, margin: 0 }}>
              This is not here to make you louder. It is here to make you undeniable.
            </p>
          </div>
        </motion.section>

        {/* PANEL — HOW TO USE */}
        <motion.section
          {...fade(0.18)}
          style={{ padding: "72px 44px", background: CREAM_DEEP, borderTop: `1px solid ${HAIR}` }}
        >
          <div style={{ ...mono, color: BRASS, textAlign: "center", marginBottom: 14 }}>§ III · How To Use The Library</div>
          <div className="lib-section-rule" />
          <h2 style={{ fontFamily: CORMORANT, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(26px, 4vw, 34px)", color: INK, textAlign: "center", margin: "0 0 36px", lineHeight: 1.2 }}>
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
          style={{ padding: "72px 44px", background: CREAM, borderTop: `1px solid ${HAIR}` }}
        >
          <div style={{ ...mono, color: BRASS, textAlign: "center", marginBottom: 14 }}>§ IV · The Rooms</div>
          <div className="lib-section-rule" />
          <h2 style={{ fontFamily: CORMORANT, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(26px, 4vw, 34px)", color: INK, textAlign: "center", margin: "0 0 36px", lineHeight: 1.2 }}>
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
          style={{
            borderTop: `1px solid ${HAIR}`,
            background: CREAM_DEEP,
            padding: "64px 44px",
          }}
        >
          <div style={{ ...mono, color: BRASS, textAlign: "center", marginBottom: 14 }}>§ V · The Canon</div>
          <div className="lib-section-rule" />
          <h2 style={{ fontFamily: SCRIPT, fontSize: 44, color: INK, margin: "0 0 10px", textAlign: "center", lineHeight: 1 }}>
            The Canon
          </h2>
          <p style={{ fontFamily: CORMORANT, fontStyle: "italic", fontSize: 16, color: CREAM_QUIET, textAlign: "center", margin: "0 auto 32px", maxWidth: 460 }}>
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
                    outline: `1px solid ${HAIR}`,
                    outlineOffset: -1,
                  }}
                  aria-hidden="true"
                />
                <div style={{ marginTop: 10, ...mono, color: BRASS, fontSize: 9 }}>{v.n}</div>
                <div style={{ fontFamily: CORMORANT, fontStyle: "italic", fontSize: 16, color: INK, marginTop: 2 }}>{v.t}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <span className="lib-cta" style={{ cursor: "default", opacity: 0.6 }}>Opening Soon</span>
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
            gridTemplateColumns: "1fr 1.4fr 1fr",
            alignItems: "center",
            gap: 20,
            padding: "48px 44px",
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
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
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
            <div style={{ fontFamily: CORMORANT, fontStyle: "italic", fontSize: 14, color: CREAM_QUIET, marginTop: 10 }}>
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
