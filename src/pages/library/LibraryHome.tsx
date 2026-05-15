import { useEffect, useMemo, useRef, useState } from "react";
import { ReadingPanel, type ReadingContent } from "@/components/library/ReadingPanel";
import { BOOKS, getReadingFor } from "@/data/books";
import corridorImg from "@/assets/library-v8-corridor.jpg";
import plaqueImg from "@/assets/library-v8-plaque.jpg";
import doorImg from "@/assets/library-v8-door.jpg";
import shelfWallImg from "@/assets/library-v8-shelfwall.jpg";
import volumeImg from "@/assets/library-v8-volume.jpg";
import deskNightImg from "@/assets/library-v8-desk-night.jpg";
import chamberImg from "@/assets/library-v8-chamber.jpg";
import librarianDeskImg from "@/assets/library-v8-librarian-desk.jpg";
import keyholeImg from "@/assets/library-v9-keyhole.png";
import courtyardImg from "@/assets/library-v9-courtyard.webp";
import aceImg from "@/assets/library-v9-ace.png";
import pawnImg from "@/assets/library-v9-pawn.webp";
import courierImg from "@/assets/library-v9-courier.png";

// === PALETTE ===
const WALNUT = "#3A2418";
const WALNUT_DEEP = "#14100C";
const BRASS = "#B8862B";
const BRASS_BRIGHT = "#D4A04F";
const IVORY = "#F4F1EC";
const OXBLOOD = "#5C1A1F";
const CHARCOAL = "#0A0A0A";

const PLAYFAIR = "'Quaria Display', Georgia, serif";
const DM = "'DM Sans', system-ui, sans-serif";
const MONO_S: React.CSSProperties = {
  fontFamily: "'DM Sans', system-ui, sans-serif",
  fontSize: 11,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  fontWeight: 500,
};

const EASE = "cubic-bezier(0.32, 0.72, 0, 1)";

// === SCENES ===
const SCENES = [
  { id: "corridor",   numeral: "I",   label: "The Corridor" },
  { id: "threshold",  numeral: "II",  label: "The Threshold" },
  { id: "wings",      numeral: "III", label: "The Wings" },
  { id: "archive",    numeral: "IV",  label: "The Archive" },
  { id: "reading",    numeral: "V",   label: "The Reading Room" },
  { id: "ethos",      numeral: "VI",  label: "On the Library" },
  { id: "request",    numeral: "VII", label: "Request Access" },
];

const WINGS = [
  { roman: "I",   name: "NOTES",       title: "Notes",       desc: "Short observations, kept on file." },
  { roman: "II",  name: "CASES",       title: "Cases",       desc: "Field reports from work in progress." },
  { roman: "III", name: "PRINCIPLES",  title: "Principles",  desc: "What we will and won't do." },
  { roman: "IV",  name: "TRANSCRIPTS", title: "Transcripts", desc: "Conversations kept on record." },
];

const VOLUMES = BOOKS.slice(0, 12);

const PHASES = [
  { phase: "Phase I — MMXXIV",  title: "First volumes",          desc: "The methods, written down." },
  { phase: "Phase II — MMXXV",  title: "Cases on record",        desc: "Field reports, added quarterly." },
  { phase: "Phase III — MMXXVI", title: "The reading room opens", desc: "Transcripts, live sessions." },
];

// === Walnut wood texture (SVG, very subtle) ===
const walnutBg = (deep = false): React.CSSProperties => ({
  background: `
    radial-gradient(1200px 600px at 50% 0%, rgba(184,134,43,0.06), transparent 60%),
    linear-gradient(180deg, ${deep ? WALNUT_DEEP : WALNUT} 0%, ${WALNUT_DEEP} 100%),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Cfilter id='w'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.012 0.6' numOctaves='2' seed='4'/%3E%3CfeColorMatrix values='0 0 0 0 0.05  0 0 0 0 0.03  0 0 0 0 0.02  0 0 0 0.4 0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23w)' opacity='0.4'/%3E%3C/svg%3E")
  `,
  backgroundBlendMode: "normal, normal, multiply",
});

// === Sconce — small radial brass glow that pulses ===
const Sconce = ({ x, y, size = 220, opacity = 0.75 }: { x: string; y: string; size?: number; opacity?: number }) => (
  <div
    aria-hidden
    className="absolute pointer-events-none"
    style={{
      left: x,
      top: y,
      width: size,
      height: size,
      transform: "translate(-50%, -50%)",
      background: `radial-gradient(circle, rgba(232,180,122,${opacity}) 0%, rgba(184,134,43,${opacity * 0.5}) 25%, transparent 65%)`,
      animation: `v8-sconce-pulse 4s ${EASE} infinite`,
      mixBlendMode: "screen",
      filter: "blur(6px)",
    }}
  />
);

// === Scene counter (fixed top-right) ===
const SceneCounter = ({ active }: { active: number }) => (
  <div className="hidden md:flex flex-col gap-1.5 fixed top-1/2 -translate-y-1/2 right-6 z-40 pointer-events-none">
    {SCENES.map((s, i) => (
      <div
        key={s.id}
        style={{
          ...MONO_S,
          fontSize: 10,
          letterSpacing: "0.22em",
          color: i === active ? IVORY : "rgba(184,134,43,0.4)",
          transition: `color 600ms ${EASE}`,
          textAlign: "right",
        }}
      >
        {s.numeral} — {s.label}
      </div>
    ))}
  </div>
);

// === Brass plaque (small, mounted) ===
const BrassPlaque = ({ children, width = 280 }: { children: React.ReactNode; width?: number }) => (
  <div
    style={{
      width,
      padding: "16px 28px",
      background: `linear-gradient(135deg, ${BRASS_BRIGHT} 0%, ${BRASS} 50%, #8a6420 100%)`,
      border: "1px solid rgba(0,0,0,0.3)",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.3), 0 4px 18px rgba(0,0,0,0.45)",
      position: "relative",
    }}
  >
    {/* corner screws */}
    {[
      { top: 5, left: 6 }, { top: 5, right: 6 }, { bottom: 5, left: 6 }, { bottom: 5, right: 6 },
    ].map((p, i) => (
      <span
        key={i}
        className="absolute"
        style={{ ...p, width: 5, height: 5, borderRadius: "50%", background: "radial-gradient(circle at 30% 30%, #d4a04f, #5a3f0e)" }}
      />
    ))}
    <div
      style={{
        fontFamily: PLAYFAIR,
        textAlign: "center",
        color: "#2a1a08",
        textShadow: "0 1px 0 rgba(255,255,255,0.25), 0 -1px 0 rgba(0,0,0,0.4)",
        letterSpacing: "0.12em",
        fontSize: 13,
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  </div>
);

// === Header ===
const Header = ({ scrolled }: { scrolled: boolean }) => (
  <header
    className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 flex items-center justify-between"
    style={{
      background: scrolled ? "rgba(20,16,12,0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(8px)" : "none",
      borderBottom: scrolled ? `1px solid rgba(184,134,43,0.18)` : "1px solid transparent",
      transition: `all 600ms ${EASE}`,
    }}
  >
    <a href="/" style={{ ...MONO_S, color: IVORY, opacity: 0.85 }}>
      ← Pasted
    </a>
    <div style={{ ...MONO_S, color: BRASS_BRIGHT, fontSize: 10 }}>
      The Pasted Library · Est. MMXXIV
    </div>
    <a
      href="#request"
      style={{ ...MONO_S, color: IVORY, paddingBottom: 4, borderBottom: `1px solid ${BRASS}` }}
    >
      Request Access
    </a>
  </header>
);

// === SCENE 1 — Corridor ===
const SceneCorridor = () => (
  <section id="corridor" className="relative w-full" style={{ height: "100vh", background: WALNUT_DEEP }}>
    <img
      src={keyholeImg}
      alt="A view through a keyhole into a private chamber: a man in a chair, lamp lit, smoke rising."
      className="absolute inset-0 w-full h-full object-contain md:object-cover"
      style={{ animation: `v8-kenburns 24s ease-in-out infinite alternate` }}
    />
    <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,8,6,0.55) 0%, rgba(10,8,6,0.05) 45%, rgba(10,8,6,0.85) 100%)" }} />

    {/* Overlay copy — left wall */}
    <div className="absolute z-10 px-6 md:px-16 max-w-[480px]" style={{ left: "4%", top: "32%" }}>
      <div style={{ ...MONO_S, color: BRASS_BRIGHT, marginBottom: 24 }}>
        Volume Archive · MMXXVI
      </div>
      <h1
        style={{
          fontFamily: PLAYFAIR,
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(56px, 11vw, 140px)",
          lineHeight: 0.95,
          color: IVORY,
          letterSpacing: "-0.02em",
          margin: 0,
        }}
      >
        Through the<br/>keyhole.
      </h1>
      <div style={{ height: 1, width: 60, background: BRASS, opacity: 0.55, margin: "32px 0 24px" }} />
      <p style={{ fontFamily: DM, fontSize: 16, lineHeight: 1.6, color: "rgba(244,241,236,0.78)", margin: 0 }}>
        What the team has written down. Kept for the people we work with.
      </p>
    </div>

    {/* Scroll hint */}
    <div className="absolute bottom-8 right-8 flex flex-col items-end gap-3 z-10">
      <div style={{ ...MONO_S, color: "rgba(244,241,236,0.55)" }}>Scroll to enter</div>
      <div
        style={{
          width: 1,
          height: 28,
          background: `linear-gradient(180deg, ${BRASS_BRIGHT}, transparent)`,
          animation: "lib-scroll-pulse 2.4s ease-in-out infinite",
        }}
      />
    </div>
  </section>
);

// === SCENE 2 — Threshold (Plaque) ===
const SceneThreshold = () => (
  <section id="threshold" className="relative w-full" style={{ minHeight: "100vh", ...walnutBg(true) }}>
    <Sconce x="6%" y="20%" size={300} opacity={0.5} />
    <Sconce x="94%" y="22%" size={260} opacity={0.4} />

    <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 py-32 md:py-40">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <img
            src={plaqueImg}
            alt="An engraved brass plaque on a walnut door reads The Pasted Library."
            className="w-full h-auto"
            style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.6)" }}
            loading="lazy"
          />
        </div>
        <div>
          <div style={{ ...MONO_S, color: BRASS_BRIGHT, marginBottom: 24 }}>II — The Threshold</div>
          <h2
            style={{
              fontFamily: PLAYFAIR,
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(36px, 5vw, 56px)",
              color: IVORY,
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            By invitation.
          </h2>
          <div style={{ height: 1, width: 48, background: BRASS, opacity: 0.5, margin: "28px 0" }} />
          <p style={{ fontFamily: DM, fontSize: 15, color: "rgba(244,241,236,0.6)", lineHeight: 1.7, maxWidth: 380, margin: 0 }}>
            If you are reading this, you have been let in.
          </p>
        </div>
      </div>
    </div>
  </section>
);

// === SCENE 3 — Wings ===
const SceneWings = () => (
  <section id="wings" className="relative w-full overflow-hidden" style={walnutBg()}>
    <Sconce x="10%" y="15%" size={240} opacity={0.45} />
    <Sconce x="90%" y="15%" size={240} opacity={0.45} />

    <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-28 md:py-40">
      <div className="flex justify-center mb-16">
        <BrassPlaque width={360}>The Four Wings</BrassPlaque>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
        {WINGS.map((w) => (
          <div key={w.name} className="group cursor-pointer">
            <div
              className="relative overflow-hidden"
              style={{
                aspectRatio: "3 / 4",
                background: WALNUT_DEEP,
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                perspective: "1200px",
              }}
            >
              <img
                src={doorImg}
                alt={`Door to the ${w.title} wing.`}
                className="w-full h-full object-cover"
                loading="lazy"
                style={{
                  transformOrigin: "left center",
                  transition: `transform 800ms ${EASE}, filter 800ms ${EASE}`,
                }}
              />
              <style>{`
                .group:hover img[alt="Door to the ${w.title} wing."] {
                  transform: rotateY(-6deg);
                  filter: brightness(1.15);
                }
              `}</style>
              {/* Oval brass nameplate overlay */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: "55%",
                  padding: "10px 14px",
                  borderRadius: "999px",
                  background: `linear-gradient(135deg, ${BRASS_BRIGHT}, ${BRASS} 60%, #8a6420)`,
                  border: "1px solid rgba(0,0,0,0.4)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 12px rgba(0,0,0,0.6)",
                  textAlign: "center",
                  fontFamily: PLAYFAIR,
                  color: "#2a1a08",
                  letterSpacing: "0.15em",
                  fontSize: 11,
                  textShadow: "0 1px 0 rgba(255,255,255,0.25)",
                }}
              >
                {w.roman}. {w.name}
              </div>
            </div>
            <div className="mt-5">
              <div style={{ ...MONO_S, color: BRASS_BRIGHT, marginBottom: 6 }}>{w.roman}</div>
              <div style={{ fontFamily: PLAYFAIR, fontSize: 22, color: IVORY, marginBottom: 6 }}>{w.title}</div>
              <div style={{ fontFamily: DM, fontSize: 13, color: "rgba(244,241,236,0.6)", lineHeight: 1.5 }}>{w.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// === SCENE 4 — Archive ===
const SceneArchive = ({ onOpen }: { onOpen: (b: typeof BOOKS[0]) => void }) => (
  <section id="archive" className="relative w-full overflow-hidden" style={{ background: WALNUT_DEEP }}>
    <img src={shelfWallImg} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.42 }} loading="lazy" />
    <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(20,16,12,0.85) 0%, rgba(20,16,12,0.55) 50%, rgba(20,16,12,0.95) 100%)" }} />
    <Sconce x="15%" y="30%" size={300} opacity={0.45} />
    <Sconce x="85%" y="60%" size={300} opacity={0.4} />

    <div className="relative max-w-[1500px] mx-auto px-6 md:px-10 py-28 md:py-40">
      <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <BrassPlaque width={380}>The Archive — Volumes in Rotation</BrassPlaque>
        <div style={{ ...MONO_S, color: BRASS_BRIGHT, opacity: 0.7 }}>
          Drag or arrow keys · {VOLUMES.length} volumes currently open
        </div>
      </div>

      <div className="lib-shelf-scroll flex gap-6 md:gap-8 overflow-x-auto pb-8 -mx-6 md:-mx-10 px-6 md:px-10">
        {VOLUMES.map((b) => (
          <button
            key={b.id}
            onClick={() => onOpen(b)}
            className="group relative flex-shrink-0 text-left"
            style={{ width: "min(78vw, 280px)" }}
          >
            <div
              className="relative overflow-hidden"
              style={{
                aspectRatio: "2 / 3",
                background: WALNUT_DEEP,
                boxShadow: "0 18px 50px rgba(0,0,0,0.55)",
                transition: `transform 900ms ${EASE}, box-shadow 900ms ${EASE}`,
              }}
            >
              <img
                src={volumeImg}
                alt=""
                aria-hidden
                className="w-full h-full object-cover"
                style={{
                  transition: `transform 900ms ${EASE}, filter 900ms ${EASE}`,
                  filter: "brightness(0.85) saturate(0.95)",
                }}
                loading="lazy"
              />
              {/* spine tint per category */}
              <div
                className="absolute inset-0 mix-blend-color"
                style={{
                  background:
                    b.category === "NOTES" ? "rgba(20,33,61,0.35)" :
                    b.category === "CASES" ? "rgba(90,47,24,0.35)" :
                    b.category === "PRINCIPLES" ? "rgba(58,74,42,0.35)" :
                    b.category === "TRANSCRIPTS" ? "rgba(74,31,31,0.35)" :
                    "rgba(0,0,0,0)",
                }}
              />
            </div>
            <style>{`
              button.group:hover > div:first-child { transform: translateY(-6px) rotate(-1.2deg); box-shadow: 0 32px 70px rgba(0,0,0,0.7), 0 0 80px rgba(232,180,122,0.18); }
              button.group:hover img { filter: brightness(1.05) saturate(1.05); }
            `}</style>
            <div className="mt-5">
              <div style={{ ...MONO_S, color: BRASS_BRIGHT, marginBottom: 6 }}>Vol. {b.vol} · {b.year}</div>
              <div style={{ fontFamily: PLAYFAIR, fontSize: 19, color: IVORY, lineHeight: 1.2, marginBottom: 6 }}>{b.title}</div>
              <div style={{ ...MONO_S, color: OXBLOOD, fontSize: 10 }}>{b.category}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  </section>
);

// === SCENE 5 — Reading Room (cinematic interlude) ===
const SceneReadingRoom = () => (
  <section id="reading" className="relative w-full" style={{ minHeight: "100vh", background: CHARCOAL }}>
    <img src={deskNightImg} alt="A reading desk lit by a single brass lamp." className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
    <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 80%)" }} />

    <div className="relative max-w-[900px] mx-auto px-6 py-32 md:py-44 text-center flex flex-col items-center">
      <div style={{ ...MONO_S, color: BRASS_BRIGHT, marginBottom: 28 }}>On the Library</div>
      <h2
        style={{
          fontFamily: PLAYFAIR,
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(48px, 8vw, 96px)",
          color: IVORY,
          lineHeight: 1.0,
          margin: 0,
          letterSpacing: "-0.02em",
        }}
      >
        Read by<br />those who built it.
      </h2>
      <p style={{ fontFamily: DM, fontSize: 15, color: "rgba(244,241,236,0.7)", lineHeight: 1.7, maxWidth: 400, margin: "32px 0" }}>
        A short film. Twelve minutes inside the room.
      </p>

      {/* Play button */}
      <button
        className="relative group"
        aria-label="Play short film"
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          border: `1px solid ${IVORY}`,
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: `background 400ms ${EASE}, border-color 400ms ${EASE}`,
        }}
      >
        <span
          aria-hidden
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            border: `1px solid ${BRASS_BRIGHT}`,
            animation: "v8-play-ring 1.8s ease-out infinite",
          }}
        />
        <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
          <path d="M2 2 L18 11 L2 20 Z" fill={IVORY} />
        </svg>
        <style>{`button[aria-label="Play short film"]:hover { background: ${OXBLOOD}; border-color: ${OXBLOOD}; }`}</style>
      </button>
    </div>
  </section>
);

// === SCENE 6 — Ethos / On the Library ===
const SceneEthos = () => (
  <section id="ethos" className="relative w-full overflow-hidden" style={walnutBg()}>
    <img src={chamberImg} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.32 }} loading="lazy" />
    <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(20,16,12,0.85), rgba(20,16,12,0.95))" }} />
    <Sconce x="20%" y="40%" size={280} opacity={0.4} />

    <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-28 md:py-40 grid md:grid-cols-12 gap-10 md:gap-20">
      {/* LEFT 5/12 */}
      <div className="md:col-span-5">
        <div style={{ ...MONO_S, color: BRASS_BRIGHT, marginBottom: 28 }}>VI — On the Library</div>
        <h2
          style={{
            fontFamily: PLAYFAIR,
            fontWeight: 300,
            fontSize: "clamp(36px, 5vw, 56px)",
            color: IVORY,
            lineHeight: 1.05,
            margin: 0,
          }}
        >
          Not a content hub.<br />
          <span style={{ fontStyle: "italic", color: "#c47a7e" }}>A record.</span>
        </h2>
        <div className="mt-10 space-y-5" style={{ fontFamily: DM, fontSize: 16, lineHeight: 1.75, color: "rgba(244,241,236,0.78)" }}>
          <p>The library is closed by default.</p>
          <p>Inside, you'll find what we've written down for our partners — methods we deploy, principles we defend, conversations we keep on record.</p>
          <p>It is not designed to be discovered. It is designed to be useful to those who already know why they are here.</p>
        </div>
      </div>

      {/* RIGHT 6/12 — phase tiles */}
      <div className="md:col-span-6 md:col-start-7 space-y-6">
        {PHASES.map((p, i) => (
          <div
            key={i}
            className="group relative overflow-hidden"
            style={{
              minHeight: 140,
              padding: 28,
              border: `1px solid rgba(184,134,43,0.18)`,
              background: `linear-gradient(90deg, rgba(20,16,12,0.92), rgba(58,36,24,0.6))`,
              transition: `border-color 600ms ${EASE}, transform 600ms ${EASE}`,
            }}
          >
            <img src={shelfWallImg} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.18 }} loading="lazy" />
            <div className="relative">
              <div style={{ ...MONO_S, color: BRASS_BRIGHT, marginBottom: 12 }}>{p.phase}</div>
              <div style={{ fontFamily: PLAYFAIR, fontSize: 22, color: IVORY, marginBottom: 6 }}>{p.title}</div>
              <div style={{ fontFamily: DM, fontSize: 13, color: "rgba(244,241,236,0.65)" }}>{p.desc}</div>
            </div>
            <style>{`
              .group:hover { border-color: rgba(184,134,43,0.45) !important; transform: translateY(-3px); }
            `}</style>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// === SCENE 7 — Request Access ===
const SceneRequest = () => {
  const [form, setForm] = useState({ name: "", email: "", reason: "" });
  const [sent, setSent] = useState(false);

  return (
    <section id="request" className="relative w-full overflow-hidden" style={{ background: WALNUT_DEEP }}>
      <img src={librarianDeskImg} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.32 }} loading="lazy" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(20,16,12,0.7), rgba(20,16,12,0.92))" }} />
      <Sconce x="15%" y="20%" size={260} opacity={0.4} />
      <Sconce x="85%" y="20%" size={260} opacity={0.4} />

      <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 py-28 md:py-40">
        <div
          className="relative mx-auto"
          style={{
            background: IVORY,
            padding: "64px 48px",
            border: `1px solid ${BRASS}`,
            boxShadow: "0 40px 100px rgba(0,0,0,0.55)",
          }}
        >
          {/* P-in-oval seal */}
          <div className="absolute" style={{ top: 18, right: 18 }}>
            <svg width="28" height="36" viewBox="0 0 28 36">
              <ellipse cx="14" cy="18" rx="12" ry="16" fill="none" stroke={OXBLOOD} strokeWidth="1.2" />
              <text x="14" y="23" textAnchor="middle" style={{ fontFamily: PLAYFAIR }} fontSize="16" fill={OXBLOOD}>P</text>
            </svg>
          </div>

          <div className="grid md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-6">
              <div style={{ ...MONO_S, color: OXBLOOD, marginBottom: 24 }}>Request Access</div>
              <h2
                style={{
                  fontFamily: PLAYFAIR,
                  fontWeight: 300,
                  fontSize: "clamp(36px, 5vw, 56px)",
                  color: CHARCOAL,
                  lineHeight: 1.05,
                  margin: 0,
                }}
              >
                Want a key?<br />
                <span style={{ fontStyle: "italic" }}>Leave a note.</span>
              </h2>
              <p style={{ fontFamily: DM, fontSize: 15, color: "rgba(10,10,10,0.7)", lineHeight: 1.7, maxWidth: 380, marginTop: 28 }}>
                Access is by invitation. If we don't know you yet, write to us. We read everything that comes in.
              </p>
            </div>

            <div className="md:col-span-6">
              {sent ? (
                <div style={{ fontFamily: PLAYFAIR, fontStyle: "italic", fontSize: 28, color: CHARCOAL }}>
                  Received. We'll write back.
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                  className="space-y-8"
                >
                  {[
                    { k: "name", label: "Your name", type: "text" },
                    { k: "email", label: "Your email", type: "email" },
                  ].map((f) => (
                    <div key={f.k}>
                      <div style={{ ...MONO_S, color: OXBLOOD, marginBottom: 8 }}>{f.label}</div>
                      <input
                        required
                        type={f.type}
                        value={(form as any)[f.k]}
                        onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                        className="w-full bg-transparent outline-none"
                        style={{
                          fontFamily: DM,
                          fontSize: 16,
                          color: CHARCOAL,
                          paddingBottom: 8,
                          borderBottom: "1px solid rgba(10,10,10,0.18)",
                        }}
                      />
                    </div>
                  ))}
                  <div>
                    <div style={{ ...MONO_S, color: OXBLOOD, marginBottom: 8 }}>Why are you here?</div>
                    <textarea
                      required
                      rows={3}
                      value={form.reason}
                      onChange={(e) => setForm({ ...form, reason: e.target.value })}
                      className="w-full bg-transparent outline-none resize-none"
                      style={{
                        fontFamily: DM,
                        fontSize: 16,
                        color: CHARCOAL,
                        paddingBottom: 8,
                        borderBottom: "1px solid rgba(10,10,10,0.18)",
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="group relative"
                    style={{
                      ...MONO_S,
                      color: IVORY,
                      background: OXBLOOD,
                      padding: "18px 36px",
                      border: "1px solid transparent",
                      transition: `border-color 300ms ${EASE}, padding 300ms ${EASE}`,
                    }}
                  >
                    <span style={{ display: "inline-block", transition: `transform 300ms ${EASE}` }}>SEND →</span>
                    <style>{`
                      button[type="submit"]:hover { border-color: ${BRASS} !important; }
                      button[type="submit"]:hover span { transform: translateX(4px); }
                    `}</style>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// === SCENE 8 — Footer (herringbone) ===
const SceneFooter = () => (
  <footer className="relative w-full" style={{ ...walnutBg(true), borderTop: `1px solid rgba(184,134,43,0.25)` }}>
    {/* Herringbone subtle */}
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity: 0.12,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='none' stroke='%23B8862B' stroke-width='0.5'%3E%3Cpath d='M0 20 L20 0 L40 20 L20 40 Z'/%3E%3Cpath d='M0 0 L20 20 L0 40'/%3E%3Cpath d='M40 0 L20 20 L40 40'/%3E%3C/g%3E%3C/svg%3E")`,
      }}
    />
    <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-16">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center">
        <div style={{ ...MONO_S, color: IVORY }}>Pasted Library<br /><span style={{ opacity: 0.5 }}>Est. MMXXIV</span></div>
        <div className="hidden md:flex justify-center">
          <svg width="40" height="50" viewBox="0 0 28 36">
            <ellipse cx="14" cy="18" rx="12" ry="16" fill="none" stroke={BRASS_BRIGHT} strokeWidth="1.2" />
            <text x="14" y="24" textAnchor="middle" style={{ fontFamily: PLAYFAIR }} fontSize="18" fill={BRASS_BRIGHT}>P</text>
          </svg>
        </div>
        <div className="text-right space-y-1.5" style={{ ...MONO_S, color: IVORY }}>
          {["Partnership", "Studio", "Library", "Experiences"].map((l) => (
            <div key={l} style={{ opacity: 0.75 }}>{l}</div>
          ))}
        </div>
      </div>
      <div className="mt-12 pt-6" style={{ borderTop: "1px solid rgba(184,134,43,0.15)", ...MONO_S, color: "rgba(244,241,236,0.35)", fontSize: 9, textAlign: "center" }}>
        © Pasted MMXXVI. By invitation.
      </div>
    </div>
  </footer>
);

// === MAIN ===
const LibraryHome = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeScene, setActiveScene] = useState(0);
  const [reading, setReading] = useState<ReadingContent | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.6);
      // Determine active scene by position
      const els = SCENES.map((s) => document.getElementById(s.id));
      const mid = window.scrollY + window.innerHeight * 0.4;
      let idx = 0;
      els.forEach((el, i) => { if (el && el.offsetTop <= mid) idx = i; });
      setActiveScene(idx);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openReading = (b: typeof BOOKS[0]) => {
    const content = getReadingFor(b.id);
    if (content) setReading(content);
  };

  return (
    <div style={{ background: WALNUT_DEEP, color: IVORY, minHeight: "100vh" }}>
      <Header scrolled={scrolled} />
      <SceneCounter active={activeScene} />

      <SceneCorridor />
      <SceneThreshold />
      <SceneWings />
      <SceneArchive onOpen={openReading} />
      <SceneReadingRoom />
      <SceneEthos />
      <SceneRequest />
      <SceneFooter />

      <ReadingPanel content={reading} onClose={() => setReading(null)} />

      <style>{`
        @keyframes v8-sconce-pulse {
          0%, 100% { opacity: 0.85; transform: translate(-50%, -50%) scale(0.96); }
          50%      { opacity: 1;    transform: translate(-50%, -50%) scale(1.04); }
        }
        @keyframes v8-kenburns {
          0%   { transform: scale(1.06); }
          100% { transform: scale(1.00); }
        }
        @keyframes v8-play-ring {
          0%   { transform: scale(1);   opacity: 0.9; }
          100% { transform: scale(1.4); opacity: 0;   }
        }
      `}</style>
    </div>
  );
};

export default LibraryHome;
