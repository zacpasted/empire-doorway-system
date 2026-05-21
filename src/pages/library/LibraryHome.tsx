import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import useMember from "@/hooks/useMember";
import { ReadingPanel, type ReadingContent } from "@/components/library/ReadingPanel";
import { BOOKS, getReadingFor } from "@/data/books";
import corridorImg from "@/assets/library-v8-corridor.jpg";
import plaqueImg from "@/assets/library-v8-plaque.jpg";
import deskNightImg from "@/assets/library-v8-desk-night.jpg";
import librarianDeskImg from "@/assets/library-v8-librarian-desk.jpg";
import shelfWallImg from "@/assets/library-v8-shelfwall.jpg";
import keyholeImg from "@/assets/library-v9-keyhole.png";
import courtyardImg from "@/assets/library-v9-courtyard.webp";
import aceImg from "@/assets/library-v9-ace.png";
import pawnImg from "@/assets/library-v9-pawn.webp";
import courierImg from "@/assets/library-v9-courier.png";
import waxSeal from "@/assets/library-wax-seal.png";

// === PALETTE ===
const WALNUT = "#3A2418";
const WALNUT_DEEP = "#14100C";
const BRASS = "#B8862B";
const BRASS_BRIGHT = "#D4A04F";
const IVORY = "#F4F1EC";
const BONE = "#E8DFD2";
const OXBLOOD = "#5C1A1F";
const OXBLOOD_HI = "#6E1E26";
const CHARCOAL = "#0A0A0A";

const PLAYFAIR = "'Playfair Display', Georgia, serif";
const DM = "'DM Sans', system-ui, sans-serif";
const MONO: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
  fontSize: 11,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  fontWeight: 500,
};

const EASE = "cubic-bezier(0.32, 0.72, 0, 1)";
const EASE_CARD = "cubic-bezier(0.16, 1, 0.3, 1)";

const SCENES = [
  { id: "corridor", numeral: "I",   label: "Corridor" },
  { id: "mark",     numeral: "II",  label: "The Mark" },
  { id: "wings",    numeral: "III", label: "The Four Wings" },
  { id: "dispatches", numeral: "IV", label: "Dispatches" },
  { id: "reading",  numeral: "V",   label: "The Reading Room" },
  { id: "ethos",    numeral: "VI",  label: "On the Library" },
];

const WINGS = [
  { roman: "I",   name: "NOTES",       title: "Notes",       desc: "Short observations, kept on file.",   img: librarianDeskImg },
  { roman: "II",  name: "CASES",       title: "Cases",       desc: "Field reports from work in progress.", img: courierImg },
  { roman: "III", name: "PRINCIPLES",  title: "Principles",  desc: "What we will and won't do.",           img: pawnImg },
  { roman: "IV",  name: "TRANSCRIPTS", title: "Transcripts", desc: "Conversations kept on record.",        img: deskNightImg },
];

const DISPATCHES = [
  { tag: "ON METHOD",    title: "On showing up.",            deck: "Practice over performance. The work is the proof.",                        img: aceImg },
  { tag: "FIELD REPORT", title: "Inside the room.",          deck: "Notes from a quarter spent rebuilding a clinic from the inside.",          img: courierImg },
  { tag: "INTERVIEW",    title: "What the librarian keeps.", deck: "A conversation about archives, restraint, and the closed door.",           img: keyholeImg },
  { tag: "OBSERVATION",  title: "The first read.",           deck: "On the moment a brand stops looking like a brand and starts looking like a house.", img: courtyardImg },
  { tag: "ON PRINCIPLE", title: "Why we close the door.",    deck: "Membership is a constraint, not a privilege.",                              img: pawnImg },
  { tag: "DISPATCH",     title: "Letters, sent later.",      deck: "Six pieces of mail held back, then released together.",                     img: deskNightImg },
];

// Random small lean angles, deterministic per index
const lean = (i: number, range = 1) => {
  const seq = [-0.8, 0.6, -0.4, 0.9, -0.7, 0.5, -0.5, 0.8];
  return (seq[i % seq.length] / 1) * range;
};

// === Scene counter (fixed top-right) ===
const SceneCounter = ({ active }: { active: number }) => (
  <div className="hidden md:flex flex-col gap-1.5 fixed top-1/2 -translate-y-1/2 right-6 z-40 pointer-events-none">
    {SCENES.map((s, i) => (
      <div
        key={s.id}
        style={{
          ...MONO,
          fontSize: 10,
          color: i === active ? IVORY : "rgba(184,134,43,0.42)",
          transition: `color 600ms ${EASE}`,
          textAlign: "right",
        }}
      >
        {s.numeral} — {s.label}
      </div>
    ))}
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
    <a href="/" style={{ ...MONO, color: IVORY, opacity: 0.85 }}>← Pasted</a>
    <div className="hidden md:block" style={{ ...MONO, color: BRASS_BRIGHT, fontSize: 10 }}>
      Pasted Society · Vol. III — The Library
    </div>
    <button
      onClick={() => supabase.auth.signOut().then(() => { window.location.href = "/"; })}
      style={{ ...MONO, color: IVORY, paddingBottom: 4, borderBottom: `1px solid ${BRASS}`, background: "transparent" }}
    >
      Sign Out
    </button>
  </header>
);

// === Pasted P-in-oval mark ===
const PMark = ({ size = 64, color = IVORY, strokeWidth = 1.2 }: { size?: number; color?: string; strokeWidth?: number }) => (
  <svg width={size} height={size * 1.28} viewBox="0 0 28 36" aria-label="Pasted">
    <ellipse cx="14" cy="18" rx="12" ry="16" fill="none" stroke={color} strokeWidth={strokeWidth} />
    <text x="14" y="24" textAnchor="middle" fontFamily={PLAYFAIR} fontStyle="italic" fontSize="18" fill={color}>P</text>
  </svg>
);

// === SCENE 1 — Corridor ===
const CORRIDOR_INDEX = [
  { roman: "I",   label: "Corridor",         id: "corridor" },
  { roman: "II",  label: "The Mark",         id: "mark" },
  { roman: "III", label: "The Four Wings",   id: "wings" },
  { roman: "IV",  label: "Dispatches",       id: "dispatches" },
  { roman: "V",   label: "The Reading Room", id: "reading" },
  { roman: "VI",  label: "On the Library",   id: "ethos" },
];

const SceneCorridor = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <section
      id="corridor"
      className="relative w-full overflow-hidden flex flex-col justify-between text-[#F4F1EC]"
      style={{
        minHeight: "100vh",
        background: WALNUT_DEEP,
        fontFamily: DM,
        padding: "clamp(20px, 4vw, 48px)",
      }}
    >
      {/* Background corridor - cinematic base */}
      <div className="absolute inset-0 z-0">
        <img
          src={corridorImg}
          alt="A walnut-panelled corridor leading to the Pasted Library."
          className="w-full h-full object-cover"
          style={{
            filter: "brightness(0.42) contrast(1.08) saturate(0.85)",
            animation: `v9-kenburns 32s ease-in-out infinite alternate`,
          }}
        />
        {/* Depth layering */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(20,16,12,0.78) 0%, rgba(20,16,12,0) 38%, rgba(20,16,12,0.95) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 0%, rgba(20,16,12,0.92) 96%)",
          }}
        />
        {/* faint oxblood tint in shadows */}
        <div
          className="absolute inset-0 mix-blend-overlay pointer-events-none"
          style={{ background: `${OXBLOOD}0F` }}
        />
      </div>

      {/* Internal structural frame */}
      <div
        aria-hidden
        className="absolute z-10 pointer-events-none"
        style={{
          top: "clamp(20px, 4vw, 48px)",
          right: "clamp(20px, 4vw, 48px)",
          bottom: "clamp(20px, 4vw, 48px)",
          left: "clamp(20px, 4vw, 48px)",
          border: `1px solid rgba(184,134,43,0.16)`,
        }}
      />

      {/* Header / Eyebrow */}
      <header className="relative z-20 flex justify-between items-start gap-6 pt-4 md:pt-6 px-4 md:px-8">
        <div className="flex items-center gap-3 md:gap-4" style={{ ...MONO, color: BRASS_BRIGHT, fontSize: 10, letterSpacing: "0.4em" }}>
          <span aria-hidden className="block" style={{ height: 1, width: "clamp(24px, 5vw, 48px)", background: "rgba(184,134,43,0.4)" }} />
          <span>Pasted Society / Vol. III — The Library</span>
        </div>
        <div className="hidden md:block" style={{ ...MONO, color: "rgba(244,241,236,0.3)", fontSize: 9, letterSpacing: "0.5em" }}>
          EST. MMXXIV
        </div>
      </header>

      {/* Centerpiece */}
      <main className="relative z-20 px-4 md:px-8 mb-8 md:mb-12">
        <div className="max-w-4xl">
          <h1
            style={{
              fontFamily: PLAYFAIR,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(56px, 12vw, 160px)",
              lineHeight: 0.85,
              color: IVORY,
              letterSpacing: "-0.02em",
              margin: 0,
              textShadow: "0 4px 32px rgba(0,0,0,0.5)",
            }}
          >
            What we<br />wrote down.
          </h1>
        </div>
      </main>

      {/* Footer / Index & Enter */}
      <footer className="relative z-20 flex flex-col md:flex-row md:justify-between md:items-end gap-8 pb-4 md:pb-6 px-4 md:px-8">
        {/* Corridor index */}
        <nav aria-label="Library sections" className="hidden md:block">
          <ul className="space-y-2.5" style={{ ...MONO, fontSize: 10, letterSpacing: "0.18em" }}>
            {CORRIDOR_INDEX.map((entry, i) => {
              const isActive = i === 0;
              return (
                <li key={entry.id}>
                  <button
                    onClick={() => scrollTo(entry.id)}
                    className="group flex items-center gap-4 text-left"
                    style={{
                      color: isActive ? IVORY : "rgba(244,241,236,0.32)",
                      transition: `color 500ms ${EASE}, opacity 500ms ${EASE}`,
                      background: "transparent",
                    }}
                  >
                    <span style={{ color: isActive ? BRASS_BRIGHT : "inherit", width: 18, display: "inline-block" }}>{entry.roman}</span>
                    <span
                      aria-hidden
                      className="block"
                      style={{
                        height: 1,
                        width: isActive ? 24 : 0,
                        background: BRASS,
                        transition: `width 500ms ${EASE}`,
                      }}
                    />
                    <span style={{ letterSpacing: "0.22em" }}>{entry.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action cue */}
        <button
          onClick={() => scrollTo("mark")}
          className="group self-end md:self-auto flex flex-col items-end cursor-pointer"
          style={{ background: "transparent" }}
          aria-label="Enter the Library"
        >
          <div style={{ ...MONO, color: BRASS_BRIGHT, fontSize: 10, letterSpacing: "0.3em", marginBottom: 18 }}>
            Accessing Archive
          </div>
          <div className="flex items-center gap-6 md:gap-8">
            <span
              aria-hidden
              className="enter-rule block"
              style={{
                height: 1,
                width: 96,
                background: "rgba(184,134,43,0.3)",
                transition: `width 900ms ${EASE}, background 900ms ${EASE}`,
              }}
            />
            <span
              className="enter-word"
              style={{
                fontFamily: PLAYFAIR,
                fontStyle: "italic",
                fontSize: "clamp(22px, 2.4vw, 30px)",
                color: IVORY,
                transition: `transform 500ms ${EASE}`,
                display: "inline-block",
              }}
            >
              Enter →
            </span>
          </div>
        </button>
      </footer>

      {/* Film grain texture */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          opacity: 0.05,
          mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <style>{`
        #corridor button.group:hover .enter-rule { width: 144px; background: ${BRASS_BRIGHT}; }
        #corridor button.group:hover .enter-word { transform: translateX(8px); }
      `}</style>
    </section>
  );
};

// === SCENE 2 — The Mark (oxblood) ===
const SceneMark = () => (
  <section
    id="mark"
    className="relative w-full flex items-center justify-center"
    style={{
      minHeight: "100vh",
      background: `linear-gradient(135deg, ${OXBLOOD_HI} 0%, ${OXBLOOD} 55%, #3e1014 100%)`,
    }}
  >
    {/* repeating P monogram pattern at low opacity */}
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity: 0.08,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='150' viewBox='0 0 120 150'%3E%3Cg fill='none' stroke='%23F4F1EC' stroke-width='1'%3E%3Cellipse cx='60' cy='75' rx='22' ry='30'/%3E%3C/g%3E%3Ctext x='60' y='86' text-anchor='middle' font-family='Playfair Display, Georgia, serif' font-style='italic' font-size='34' fill='%23F4F1EC'%3EP%3C/text%3E%3C/svg%3E")`,
        backgroundSize: "120px 150px",
      }}
    />
    {/* upper-left tungsten light wash */}
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `radial-gradient(ellipse at 20% 10%, rgba(232,180,122,0.22) 0%, transparent 55%)`,
      }}
    />

    <div className="relative text-center px-6 flex flex-col items-center">
      {/* embossed mark */}
      <div
        style={{
          filter: "drop-shadow(0 2px 0 rgba(0,0,0,0.4)) drop-shadow(0 -1px 0 rgba(255,255,255,0.18))",
          marginBottom: 56,
        }}
      >
        <PMark size={140} color={IVORY} strokeWidth={1.4} />
      </div>

      <h2
        style={{
          fontFamily: PLAYFAIR,
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "clamp(36px, 5.6vw, 56px)",
          color: IVORY,
          margin: 0,
          letterSpacing: "-0.01em",
        }}
      >
        The Pasted Library.
      </h2>
      <p style={{ fontFamily: DM, fontSize: 14, color: "rgba(244,241,236,0.7)", lineHeight: 1.7, maxWidth: 380, margin: "24px auto 0" }}>
        Volume III in the Society Record. By invitation, kept on record, closed by default.
      </p>
    </div>
  </section>
);

// === SCENE 3 — Four Wings ===
const SceneWings = () => (
  <section id="wings" className="relative w-full" style={{ background: WALNUT_DEEP }}>
    <img src={shelfWallImg} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.18 }} loading="lazy" />
    <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${WALNUT_DEEP} 0%, rgba(20,16,12,0.85) 50%, ${WALNUT_DEEP} 100%)` }} />

    <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-28 md:py-40 grid md:grid-cols-12 gap-12 md:gap-16">
      {/* opener 5/12 */}
      <div className="md:col-span-5 md:sticky md:top-32 md:self-start">
        <div style={{ ...MONO, color: BRASS_BRIGHT, marginBottom: 24 }}>The Four Wings</div>
        <h2
          style={{
            fontFamily: PLAYFAIR,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(40px, 6vw, 72px)",
            color: IVORY,
            lineHeight: 0.95,
            margin: 0,
          }}
        >
          What the library<br />holds.
        </h2>
      </div>

      {/* 7/12 grid */}
      <div className="md:col-span-7 grid grid-cols-2 gap-5 md:gap-7">
        {WINGS.map((w, i) => (
          <a
            key={w.name}
            href={`/library?wing=${w.name.toLowerCase()}`}
            className="group block relative overflow-hidden"
            style={{
              aspectRatio: "3 / 4",
              background: WALNUT_DEEP,
              boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
              transform: `rotate(${lean(i)}deg)`,
              transition: `transform 700ms ${EASE_CARD}`,
            }}
          >
            <img
              src={w.img}
              alt={w.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ transition: `transform 700ms ${EASE_CARD}, filter 700ms ${EASE_CARD}`, filter: "brightness(0.78)" }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(10,8,6,0.85) 100%)" }} />
            <div className="absolute left-5 right-5 bottom-5">
              <div style={{ ...MONO, color: "rgba(244,241,236,0.7)", marginBottom: 6 }}>{w.roman}</div>
              <div style={{ fontFamily: PLAYFAIR, fontStyle: "italic", fontSize: 26, color: IVORY, lineHeight: 1.05, marginBottom: 6 }}>{w.title}</div>
              <div style={{ fontFamily: DM, fontSize: 13, color: "rgba(244,241,236,0.65)", lineHeight: 1.45 }}>{w.desc}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
    <style>{`
      #wings a.group:hover { transform: rotate(0deg) !important; }
      #wings a.group:hover img { transform: scale(1.04); filter: brightness(0.92); }
    `}</style>
  </section>
);

// === SCENE 4 — Dispatches (bone) ===
const SceneDispatches = () => (
  <section id="dispatches" className="relative w-full" style={{ background: BONE }}>
    <div className="relative max-w-[1500px] mx-auto px-6 md:px-10 py-28 md:py-40">
      <div className="grid md:grid-cols-12 gap-12 md:gap-16 mb-16 md:mb-20">
        <div className="md:col-span-5">
          <div style={{ ...MONO, color: OXBLOOD, marginBottom: 24 }}>Dispatches</div>
          <h2
            style={{
              fontFamily: PLAYFAIR,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(40px, 5.5vw, 64px)",
              color: CHARCOAL,
              lineHeight: 1.0,
              margin: 0,
            }}
          >
            Reading.
          </h2>
        </div>
        <div className="md:col-span-6 md:col-start-7 flex md:items-end">
          <p style={{ fontFamily: DM, fontSize: 15, color: "rgba(10,10,10,0.65)", lineHeight: 1.7, maxWidth: 420, margin: 0 }}>
            Essays, field notes, conversations. Published when there's something worth saying. Read in any order.
          </p>
        </div>
      </div>

      {/* horizontal carousel */}
      <div className="lib-shelf-scroll flex gap-6 md:gap-8 overflow-x-auto pb-6 -mx-6 md:-mx-10 px-6 md:px-10" style={{ scrollSnapType: "x mandatory" }}>
        {DISPATCHES.map((d, i) => (
          <a
            key={d.title}
            href={`/library?dispatch=${i}`}
            className="group block flex-shrink-0"
            style={{
              width: "min(78vw, 320px)",
              transform: `rotate(${lean(i, 0.5)}deg)`,
              transition: `transform 700ms ${EASE_CARD}`,
              scrollSnapAlign: "start",
            }}
          >
            <div className="relative overflow-hidden" style={{ aspectRatio: "3 / 4", background: WALNUT_DEEP, boxShadow: "0 14px 40px rgba(0,0,0,0.18)" }}>
              <img
                src={d.img}
                alt={d.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ transition: `transform 700ms ${EASE_CARD}` }}
              />
            </div>
            <div className="pt-5">
              <div style={{ ...MONO, color: OXBLOOD, marginBottom: 8 }}>{d.tag}</div>
              <div style={{ fontFamily: PLAYFAIR, fontStyle: "italic", fontSize: 24, color: CHARCOAL, lineHeight: 1.1, marginBottom: 10 }}>{d.title}</div>
              <div style={{ fontFamily: DM, fontSize: 13, color: "rgba(10,10,10,0.65)", lineHeight: 1.55, marginBottom: 16 }}>{d.deck}</div>
              <div style={{ width: 40, height: 1, background: "rgba(10,10,10,0.35)", marginBottom: 14 }} />
              <div className="dispatch-read inline-block relative" style={{ ...MONO, color: CHARCOAL }}>
                READ →
                <span className="absolute left-0 -bottom-1 h-px bg-[var(--ox)]" style={{ ["--ox" as never]: OXBLOOD, width: 0, transition: `width 500ms ${EASE_CARD}` } as React.CSSProperties} />
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-10" style={{ ...MONO, color: OXBLOOD }}>
        Drag / 06 in rotation — Vol. III
      </div>
    </div>
    <style>{`
      #dispatches a.group:hover { transform: rotate(0deg) !important; }
      #dispatches a.group:hover img { transform: scale(1.04); }
      #dispatches a.group:hover .dispatch-read span { width: 100% !important; }
    `}</style>
  </section>
);

// === SCENE 5 — Reading Room (keyhole) ===
const SceneReadingRoom = () => (
  <section id="reading" className="relative w-full overflow-hidden" style={{ minHeight: "100vh", background: CHARCOAL }}>
    <img src={keyholeImg} alt="A view through a keyhole into a private chamber." className="absolute inset-0 w-full h-full object-contain md:object-cover opacity-90" loading="lazy" />
    <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.95) 100%)" }} />

    <div className="relative max-w-[900px] mx-auto px-6 pt-28 md:pt-32 text-center flex flex-col items-center">
      <div style={{ ...MONO, color: BRASS_BRIGHT, marginBottom: 24 }}>On the Library</div>
      <h2
        style={{
          fontFamily: PLAYFAIR,
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "clamp(48px, 8vw, 88px)",
          color: IVORY,
          lineHeight: 0.98,
          margin: 0,
          letterSpacing: "-0.02em",
        }}
      >
        Read by those<br />who built it.
      </h2>
    </div>

    <div className="absolute left-1/2 -translate-x-1/2 bottom-12 md:bottom-16 z-10 flex flex-col items-center px-6">
      <p style={{ fontFamily: DM, fontSize: 15, color: "rgba(244,241,236,0.7)", lineHeight: 1.7, maxWidth: 380, margin: 0, textAlign: "center" }}>
        A short film. Twelve minutes inside the room.
      </p>
      <div style={{ height: 24 }} />
      <button
        aria-label="Play short film"
        className="relative group"
        style={{
          width: 56, height: 56, borderRadius: "50%",
          border: `1px solid ${IVORY}`, background: "transparent",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: `background 400ms ${EASE}, border-color 400ms ${EASE}`,
        }}
      >
        <span aria-hidden className="absolute inset-0 rounded-full pointer-events-none" style={{ border: `1px solid ${OXBLOOD_HI}`, animation: "v9-play-ring 1.6s ease-out infinite" }} />
        <svg width="16" height="18" viewBox="0 0 20 22" fill="none">
          <path d="M2 2 L18 11 L2 20 Z" fill={IVORY} />
        </svg>
        <style>{`button[aria-label="Play short film"]:hover { background: ${OXBLOOD}; border-color: ${OXBLOOD}; }`}</style>
      </button>
    </div>
  </section>
);

// === SCENE 6 — Ethos ===
const SceneEthos = () => (
  <section id="ethos" className="relative w-full" style={{ background: WALNUT_DEEP }}>
    <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-28 md:py-40 grid md:grid-cols-12 gap-12 md:gap-16 items-center">
      {/* LEFT 5/12 */}
      <div className="md:col-span-5">
        <div style={{ ...MONO, color: BRASS_BRIGHT, marginBottom: 24 }}>VI — On the Library</div>
        <h2
          style={{
            fontFamily: PLAYFAIR,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(40px, 5vw, 56px)",
            color: IVORY,
            lineHeight: 1.0,
            margin: 0,
          }}
        >
          Not a<br />content hub.
        </h2>
        <div style={{ height: 32 }} />
        <div
          style={{
            fontFamily: PLAYFAIR,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(28px, 3.4vw, 36px)",
            color: "#c47a7e",
            lineHeight: 1.0,
          }}
        >
          A record.
        </div>
        <div className="mt-8 space-y-5" style={{ fontFamily: DM, fontSize: 16, lineHeight: 1.7, color: "rgba(244,241,236,0.75)" }}>
          <p>The library is closed by default.</p>
          <p>Inside, you'll find what we have written down for our partners — methods we deploy, principles we defend, conversations kept on record.</p>
          <p>Not designed to be discovered. Designed to be useful to those who already know why they are here.</p>
        </div>
      </div>

      {/* RIGHT 6/12 — courtyard photograph */}
      <div className="md:col-span-6 md:col-start-7">
        <div className="relative overflow-hidden" style={{ aspectRatio: "4 / 5", boxShadow: "0 30px 80px rgba(0,0,0,0.6)" }}>
          <img src={courtyardImg} alt="Three robed members in a stone courtyard." loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "rgba(10,8,6,0.10)" }} />
        </div>
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
      <img src={librarianDeskImg} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.30 }} loading="lazy" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(20,16,12,0.78), rgba(20,16,12,0.94))" }} />

      <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 py-28 md:py-40">
        <div
          className="relative mx-auto overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #F5EFE0 0%, #EFE6D2 50%, #E8DCC2 100%)",
            padding: "56px 40px",
            border: `1px solid ${BRASS}`,
            borderRadius: 2,
            boxShadow: "0 40px 100px rgba(0,0,0,0.55)",
          }}
        >
          {/* Papyrus fibre overlay — lifted from the signup gate */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.18,
              mixBlendMode: "multiply",
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Cfilter id='lf'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' seed='9'/%3E%3CfeColorMatrix values='0 0 0 0 0.45  0 0 0 0 0.32  0 0 0 0 0.18  0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23lf)'/%3E%3C/svg%3E\")",
            }}
          />
          {/* Horizontal linen fibres */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.08,
              mixBlendMode: "multiply",
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(120,90,50,0.35) 0 1px, transparent 1px 3px), repeating-linear-gradient(0deg, rgba(120,90,50,0.2) 0 1px, transparent 1px 4px)",
            }}
          />
          {/* Debossed inner border */}
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              inset: 20,
              border: "1px solid rgba(10,10,10,0.08)",
              boxShadow: "0 1px 0 rgba(255,255,255,0.4)",
            }}
          />
          {/* Corner filigree */}
          {([
            { top: 24, left: 24, r: 0 },
            { top: 24, right: 24, r: 90 },
            { bottom: 24, right: 24, r: 180 },
            { bottom: 24, left: 24, r: 270 },
          ] as const).map((pos, i) => (
            <svg
              key={i}
              width="36" height="36" viewBox="0 0 40 40"
              aria-hidden
              className="absolute pointer-events-none"
              style={{ ...pos, transform: `rotate(${pos.r}deg)`, opacity: 0.32 }}
            >
              <path
                d="M2 14 Q2 2 14 2 M2 14 Q6 10 10 10 M14 2 Q10 6 10 10 M10 10 L14 14 M6 6 Q8 8 10 10"
                fill="none" stroke={BRASS} strokeWidth="0.9" strokeLinecap="round"
              />
              <circle cx="10" cy="10" r="0.9" fill={BRASS} />
            </svg>
          ))}
          {/* Ex-Libris watermark */}
          <svg
            aria-hidden
            viewBox="0 0 380 380"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ width: 420, height: 420, opacity: 0.04 }}
          >
            <circle cx="190" cy="190" r="180" fill="none" stroke="#0A0A0A" strokeWidth="1.5" />
            <circle cx="190" cy="190" r="160" fill="none" stroke="#0A0A0A" strokeWidth="0.8" />
            <text x="190" y="120" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" letterSpacing="6" fill="#0A0A0A">EX LIBRIS</text>
            <text x="190" y="220" textAnchor="middle" fontFamily="Playfair Display, Georgia, serif" fontStyle="italic" fontSize="160" fill="#0A0A0A">P</text>
            <text x="190" y="280" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="5" fill="#0A0A0A">THE PASTED LIBRARY</text>
          </svg>

          {/* librarian's seal */}
          <div className="absolute" style={{ top: 18, right: 18 }}>
            <PMark size={24} color={OXBLOOD} strokeWidth={1.2} />
          </div>

          <div className="relative grid md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-7">
              <div style={{ ...MONO, color: OXBLOOD, marginBottom: 22 }}>Request Access</div>
              <h2
                style={{
                  fontFamily: PLAYFAIR,
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(40px, 5.4vw, 64px)",
                  color: CHARCOAL,
                  lineHeight: 1.0,
                  margin: 0,
                }}
              >
                Want a key?
              </h2>
              <div
                style={{
                  fontFamily: PLAYFAIR,
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(28px, 3.4vw, 40px)",
                  color: OXBLOOD,
                  lineHeight: 1.0,
                  marginTop: 14,
                }}
              >
                Leave a note.
              </div>
              <p style={{ fontFamily: DM, fontSize: 15, color: "rgba(10,10,10,0.7)", lineHeight: 1.7, maxWidth: 380, marginTop: 28 }}>
                Access is by invitation. If we don't know you yet, write to us. Everything is read.
              </p>
            </div>

            <div className="md:col-span-5">
              {sent ? (
                <div className="flex flex-col items-start gap-6">
                  <div style={{ fontFamily: PLAYFAIR, fontStyle: "italic", fontSize: 28, color: CHARCOAL }}>
                    Received. We'll write back.
                  </div>
                  <img
                    src={waxSeal}
                    alt=""
                    width={48}
                    height={48}
                    style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.35))" }}
                  />
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-7">
                  {[
                    { k: "name", label: "Your name", type: "text" },
                    { k: "email", label: "Your email", type: "email" },
                  ].map((f) => (
                    <div key={f.k}>
                      <div style={{ ...MONO, color: OXBLOOD, marginBottom: 8 }}>{f.label}</div>
                      <input
                        required
                        type={f.type}
                        value={(form as Record<string, string>)[f.k]}
                        onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                        className="w-full bg-transparent outline-none"
                        style={{ fontFamily: DM, fontSize: 16, color: CHARCOAL, paddingBottom: 8, borderBottom: "1px solid rgba(10,10,10,0.18)" }}
                      />
                    </div>
                  ))}
                  <div>
                    <div style={{ ...MONO, color: OXBLOOD, marginBottom: 8 }}>Why are you here?</div>
                    <textarea
                      required
                      rows={3}
                      value={form.reason}
                      onChange={(e) => setForm({ ...form, reason: e.target.value })}
                      className="w-full bg-transparent outline-none resize-none"
                      style={{ fontFamily: DM, fontSize: 16, color: CHARCOAL, paddingBottom: 8, borderBottom: "1px solid rgba(10,10,10,0.18)" }}
                    />
                  </div>
                  {/* Oxblood papyrus CTA — matches signup gate */}
                  <button
                    type="submit"
                    className="group relative overflow-hidden"
                    style={{
                      ...MONO,
                      color: IVORY,
                      background:
                        "linear-gradient(135deg, #8A2626 0%, #7A1F1F 50%, #5C1414 100%)",
                      padding: "18px 36px",
                      borderRadius: 10,
                      border: "1px solid transparent",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,220,180,0.18), inset 0 -1px 0 rgba(0,0,0,0.35), 0 6px 14px rgba(60,10,10,0.35)",
                      transition: `border-color 300ms ${EASE}, filter 220ms ${EASE}`,
                    }}
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-50"
                      style={{
                        opacity: 0.35,
                        mixBlendMode: "overlay",
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Cfilter id='lg'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' seed='11'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23lg)'/%3E%3C/svg%3E\")",
                      }}
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        opacity: 0.18,
                        mixBlendMode: "multiply",
                        backgroundImage:
                          "repeating-linear-gradient(90deg, rgba(40,5,5,0.6) 0 1px, transparent 1px 3px), repeating-linear-gradient(0deg, rgba(40,5,5,0.35) 0 1px, transparent 1px 5px)",
                      }}
                    />
                    <span className="lib-send-label relative inline-block" style={{ transition: `transform 300ms ${EASE}` }}>SEND →</span>
                    <style>{`
                      button[type="submit"]:hover { border-color: ${BRASS} !important; }
                      button[type="submit"]:hover .lib-send-label { transform: translateX(4px); }
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

// === SCENE 8 — Footer ===
const SceneFooter = () => (
  <footer className="relative w-full" style={{ background: WALNUT_DEEP, borderTop: `1px solid rgba(184,134,43,0.25)` }}>
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity: 0.10,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='none' stroke='%23B8862B' stroke-width='0.5'%3E%3Cpath d='M0 20 L20 0 L40 20 L20 40 Z'/%3E%3Cpath d='M0 0 L20 20 L0 40'/%3E%3Cpath d='M40 0 L20 20 L40 40'/%3E%3C/g%3E%3C/svg%3E")`,
      }}
    />
    <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-16">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center">
        <div style={{ ...MONO, color: IVORY }}>
          Pasted Society / Est. MMXXIV<br />
          <span style={{ opacity: 0.5 }}>Vol. III — Library</span>
        </div>
        <div className="hidden md:flex justify-center">
          <PMark size={36} color={BRASS_BRIGHT} />
        </div>
        <div className="text-right space-y-1.5" style={{ ...MONO, color: IVORY }}>
          {["Partnership", "Studio", "Library", "Experiences"].map((l) => (
            <div key={l} style={{ opacity: 0.75 }}>{l}</div>
          ))}
        </div>
      </div>
      <div className="mt-12 pt-6 text-center" style={{ borderTop: "1px solid rgba(184,134,43,0.15)", ...MONO, color: "rgba(244,241,236,0.35)", fontSize: 9 }}>
        © Pasted MMXXVI. By invitation.
      </div>
    </div>
  </footer>
);

// === MAIN ===
const LibraryHome = () => {
  const { session, loading } = useMember();
  const [scrolled, setScrolled] = useState(false);
  const [activeScene, setActiveScene] = useState(0);
  const [reading, setReading] = useState<ReadingContent | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.6);
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

  // keep BOOKS / reading panel wired up for future use even if not surfaced on landing
  void plaqueImg; void BOOKS; void getReadingFor; void SceneRequest; void waxSeal;

  // Public preview: /library is viewable without an active session.
  void session; void loading;

  return (
    <div style={{ background: WALNUT_DEEP, color: IVORY, minHeight: "100vh" }}>
      <Header scrolled={scrolled} />
      <SceneCounter active={activeScene} />

      <SceneCorridor />
      <SceneMark />
      <SceneWings />
      <SceneDispatches />
      <SceneReadingRoom />
      <SceneEthos />
      <SceneFooter />

      <ReadingPanel content={reading} onClose={() => setReading(null)} />

      <style>{`
        @keyframes v9-kenburns {
          0%   { transform: scale(1.06); }
          100% { transform: scale(1.00); }
        }
        @keyframes v9-play-ring {
          0%   { transform: scale(1);   opacity: 0.9; }
          100% { transform: scale(1.4); opacity: 0;   }
        }
      `}</style>
    </div>
  );
};

export default LibraryHome;
