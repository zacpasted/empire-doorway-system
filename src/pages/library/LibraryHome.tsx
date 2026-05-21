import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { LeftRail } from "@/components/library/chrome/LeftRail";
import { useMember } from "@/hooks/useMember";
import heroImg from "@/assets/library-reading-room.jpg";
import counterImg from "@/assets/library-v8-librarian-desk.jpg";
import cinemaImg from "@/assets/library-v8-desk-night.jpg";
import briefcaseImg from "@/assets/briefcase-closed.jpg";
import waxSeal from "@/assets/library-wax-seal.png";
import pMonogramUrl from "@/assets/pasted-p-oval.png";
import { PMonogram } from "@/components/library/PMonogram";
import { MemberPill } from "@/components/library/MemberPill";
import { HeroAtmosphere } from "@/components/library/HeroAtmosphere";
import shelfwallImg from "@/assets/library-v8-shelfwall.jpg";
import volumeImg from "@/assets/library-v8-volume.jpg";
import chamberImg from "@/assets/library-v8-chamber.jpg";
import wallpaperUrl from "@/assets/atrium-wallpaper-damask.jpg";
import walnutShelfUrl from "@/assets/atrium-walnut-shelf.png";
import wainscotingUrl from "@/assets/atrium-wainscoting.jpg";
import giltFrameUrl from "@/assets/atrium-gilt-frame.png";

// === PALETTE ===
const BONE = "#F4F1EC";
const CHARCOAL = "#0A0A0A";
const INK = "#1A140E"; // warm ink for long-form copy
const GOLD = "#C9A96E";
const GOLD_BRIGHT = "#D4A04F";
const GOLD_LIT = "#D4B57A"; // amber-shift, near candle source
const OXBLOOD = "#5C1A1F";
const OXBLOOD_DEEP = "#3e1014";

// Fleuron set (used in place of middle-dots in editorial copy)
const Fleuron = ({ glyph = "❦", color = "rgba(201,169,110,0.65)", size = 11 }: { glyph?: string; color?: string; size?: number }) => (
  <span aria-hidden style={{ color, fontSize: size, lineHeight: 1, padding: "0 2px" }}>{glyph}</span>
);

const PLAYFAIR = "'Playfair Display', Georgia, serif";
const CORMORANT = "'Cormorant Garamond', 'Playfair Display', Georgia, serif";
const DM = "'DM Sans', system-ui, sans-serif";
const MONO_FF = "'JetBrains Mono', ui-monospace, monospace";

const MONO: React.CSSProperties = {
  fontFamily: MONO_FF,
  fontSize: 11,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  fontWeight: 500,
};

// ===================== Hero (16/7, welcome inlaid) =====================
const Hero = ({ firstName }: { firstName: string }) => (
  <div
    className="relative w-full overflow-hidden"
    style={{ aspectRatio: "16 / 7", background: CHARCOAL }}
  >
    <img
      src={heroImg}
      alt=""
      className="absolute inset-0 w-full h-full object-cover"
      style={{
        animation: "lib-hero-breathe 12s ease-in-out infinite alternate",
        filter: "brightness(0.78) saturate(1.05) sepia(0.06)",
      }}
    />
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(180deg, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.0) 35%, rgba(10,10,10,0.55) 100%)",
      }}
    />
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity: 0.06,
        mixBlendMode: "overlay",
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />

    {/* candle glow + drifting dust */}
    <HeroAtmosphere />

    {/* inlaid welcome — lower left */}
    <div className="absolute left-6 md:left-12 lg:left-16 bottom-[26%] md:bottom-[28%]">
      <h1
        style={{
          fontFamily: CORMORANT,
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "clamp(28px, 4.4vw, 48px)",
          color: BONE,
          lineHeight: 1.05,
          letterSpacing: "-0.01em",
          margin: 0,
          textShadow: "0 2px 18px rgba(10,10,10,0.55), 0 1px 2px rgba(10,10,10,0.4)",
        }}
      >
        Welcome back, {firstName}.
      </h1>
      <div
        className="mt-3"
        style={{
          ...MONO,
          color: GOLD_BRIGHT,
          fontSize: 11,
          letterSpacing: "0.28em",
          textShadow: "0 1px 8px rgba(10,10,10,0.6)",
        }}
      >
        The Library is Fuller Than When You Left
      </div>
    </div>

    {/* status — lower right */}
    <div
      className="absolute right-6 md:right-12 lg:right-16 bottom-[26%] md:bottom-[28%] hidden sm:flex items-center gap-3"
      style={{
        ...MONO,
        color: GOLD_BRIGHT,
        fontSize: 10,
        letterSpacing: "0.28em",
        textShadow: "0 1px 8px rgba(10,10,10,0.6)",
      }}
    >
      <span className="lib-hero-live-dot" aria-hidden />
      <span>Live</span>
      <Fleuron glyph="❧" color="rgba(212,181,122,0.7)" size={11} />
      <span>57 Briefcases</span>
      <Fleuron glyph="❦" color="rgba(212,181,122,0.7)" size={11} />
      <span>12 Sessions</span>
      <Fleuron glyph="✦" color="rgba(212,181,122,0.7)" size={10} />
      <span>9 Essays</span>
    </div>
  </div>
);

// ===================== Editorial Status Pills =====================
const PILLS: { key: string; label: string; count?: number }[] = [
  { key: "arrived", label: "Just Arrived", count: 3 },
  { key: "counter", label: "On the Counter" },
  { key: "proprietor", label: "From the Proprietor" },
];

const StatusPills = () => {
  const [active, setActive] = useState<string>("counter");
  return (
    <div className="flex items-center justify-center gap-3 flex-wrap md:flex-nowrap">
      {PILLS.map((p) => {
        const isActive = active === p.key;
        return (
          <button
            key={p.key}
            type="button"
            onClick={() => setActive(p.key)}
            className="inline-flex items-center gap-2"
            style={{
              height: 32,
              padding: "0 16px",
              borderRadius: 16,
              background: isActive ? OXBLOOD : BONE,
              border: `1px solid ${isActive ? OXBLOOD : "rgba(201,169,110,0.3)"}`,
              color: isActive ? BONE : CHARCOAL,
              fontFamily: MONO_FF,
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 500,
              transition: "border-color 180ms ease-out, background 180ms ease-out, color 180ms ease-out",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              if (!isActive) e.currentTarget.style.borderColor = "rgba(201,169,110,0.6)";
            }}
            onMouseLeave={(e) => {
              if (!isActive) e.currentTarget.style.borderColor = "rgba(201,169,110,0.3)";
            }}
          >
            <span>{p.label}</span>
            {p.count !== undefined && (
              <span style={{ color: isActive ? BONE : GOLD_BRIGHT }}>· {p.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
};

// ===================== Floating Welcome Card =====================
const WelcomeCard = () => (
  <div
    className="mx-auto"
    style={{
      width: "min(70%, 760px)",
      background: BONE,
      border: "1px solid rgba(201,169,110,0.25)",
      borderRadius: 12,
      padding: "36px 40px",
      boxShadow: "0 24px 64px rgba(10,10,10,0.18)",
      position: "relative",
    }}
  >
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity: 0.04,
        borderRadius: 12,
        backgroundImage: `url(${pMonogramUrl})`,
        backgroundSize: "60px 64px",
        backgroundRepeat: "repeat",
      }}
    />
    <div className="relative flex flex-col items-center text-center">
      <span
        aria-hidden
        style={{
          fontFamily: CORMORANT,
          fontSize: 18,
          color: GOLD_BRIGHT,
          lineHeight: 1,
          marginBottom: 12,
        }}
      >
        ❦
      </span>
      <div
        style={{
          fontFamily: CORMORANT,
          fontStyle: "italic",
          fontSize: "clamp(24px, 3vw, 32px)",
          color: CHARCOAL,
          lineHeight: 1.1,
          letterSpacing: "-0.01em",
        }}
      >
        The Atrium
      </div>
      <div
        style={{
          fontFamily: CORMORANT,
          fontStyle: "italic",
          fontSize: 18,
          color: "rgba(10,10,10,0.7)",
          marginTop: 6,
        }}
      >
        Where you begin.
      </div>
      <div
        aria-hidden
        style={{
          width: 80,
          height: 1,
          background: GOLD,
          opacity: 0.7,
          margin: "22px auto 24px",
        }}
      />
      <StatusPills />
    </div>
  </div>
);

// ===================== Card chrome =====================
const Kicker = ({ children, color = "rgba(10,10,10,0.55)" }: { children: React.ReactNode; color?: string }) => (
  <div style={{ ...MONO, color, marginBottom: 18 }}>{children}</div>
);

// ===================== Row 1: Counter + Cinema =====================
const CounterCard = () => (
  <Link
    to="/library/stacks"
    className="lib-card-shell group block overflow-hidden"
    style={{ padding: 0 }}
  >
    <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
      <div className="md:col-span-5 relative overflow-hidden" style={{ minHeight: 260 }}>
        <div className="lib-counter-breathe absolute inset-0">
          <img
            src={counterImg}
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.95) saturate(0.95)" }}
          />
        </div>
      </div>
      <div className="md:col-span-7 p-8 md:p-10 flex flex-col justify-center">
        <Kicker>On the Counter · Week of 14 May</Kicker>
        <h3
          style={{
            fontFamily: PLAYFAIR,
            fontSize: "clamp(24px, 2.4vw, 32px)",
            lineHeight: 1.1,
            color: CHARCOAL,
            margin: 0,
          }}
        >
          The Founder's Operating Framework.
        </h3>
        <p
          style={{
            fontFamily: DM,
            fontSize: 15,
            lineHeight: 1.65,
            color: "rgba(10,10,10,0.72)",
            marginTop: 14,
            marginBottom: 18,
          }}
        >
          Six pages on how to organise the first hour of every founder's week. The single document
          most of our members re-open more than any other.
        </p>
        <div style={{ ...MONO, color: "rgba(10,10,10,0.5)", marginBottom: 22 }}>
          Framework · PDF · 48 Pages
        </div>
        <div>
          <span
            className="inline-flex items-center gap-3 px-5 py-3"
            style={{
              ...MONO,
              color: BONE,
              background: OXBLOOD,
              borderRadius: 2,
              transition: "background 200ms ease-out",
            }}
          >
            Take it with you <ArrowRight size={14} strokeWidth={1.6} />
          </span>
        </div>
      </div>
    </div>
  </Link>
);

const CinemaCard = () => (
  <Link to="/library/cinema" className="lib-card-shell group block overflow-hidden">
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 9" }}>
      <img
        src={cinemaImg}
        alt=""
        className="w-full h-full object-cover"
        style={{ filter: "brightness(0.85) contrast(1.05) sepia(0.08)" }}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(10,10,10,0.45) 100%)" }} />
      <div
        className="absolute left-5 bottom-5 flex items-center justify-center"
        style={{
          width: 44,
          height: 44,
          background: "rgba(10,10,10,0.55)",
          border: `1px solid ${GOLD}`,
          borderRadius: 999,
          color: GOLD_BRIGHT,
        }}
        aria-hidden
      >
        <Play size={16} strokeWidth={1.6} fill={GOLD_BRIGHT} />
      </div>
    </div>
    <div className="p-7">
      <Kicker>In the Cinema</Kicker>
      <h3 style={{ fontFamily: PLAYFAIR, fontSize: 22, lineHeight: 1.15, color: CHARCOAL, margin: 0 }}>
        The Long Game, in plain words.
      </h3>
      <div
        style={{
          fontFamily: CORMORANT,
          fontStyle: "italic",
          fontSize: 16,
          color: "rgba(10,10,10,0.7)",
          marginTop: 8,
        }}
      >
        with Zac Wilkinson
      </div>
      <div style={{ ...MONO, color: "rgba(10,10,10,0.5)", marginTop: 14 }}>
        48 Min · Masterclass
      </div>
    </div>
  </Link>
);

// ===================== Row 2: Vault + Reading Room + Periodicals =====================
const VaultCard = () => (
  <Link
    to="/library/vault"
    className="group block overflow-hidden relative"
    style={{
      background: `linear-gradient(160deg, ${OXBLOOD} 0%, ${OXBLOOD_DEEP} 100%)`,
      border: "1px solid rgba(201,169,110,0.25)",
      borderRadius: 6,
      transition: "border-color 200ms ease-out, transform 200ms ease-out, box-shadow 200ms ease-out",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = "rgba(201,169,110,0.7)";
      e.currentTarget.style.transform = "translateY(-4px)";
      e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,0.25)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = "rgba(201,169,110,0.25)";
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "none";
    }}
  >
    {/* faint repeating P pattern */}
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity: 0.1,
        backgroundImage: `url(${pMonogramUrl})`,
        backgroundSize: "70px 74px",
        backgroundRepeat: "repeat",
      }}
    />
    <div className="relative p-7 flex flex-col" style={{ minHeight: 340 }}>
      <div className="flex items-start justify-between">
        <div style={{ ...MONO, color: GOLD_BRIGHT, fontSize: 10 }}>In the Vault · Sealed</div>
        <img src={waxSeal} alt="" className="w-12 h-12 object-contain lib-wax-breathe" style={{ opacity: 0.95 }} />
      </div>
      <h3
        style={{
          fontFamily: CORMORANT,
          fontStyle: "italic",
          fontSize: 26,
          lineHeight: 1.15,
          color: GOLD_BRIGHT,
          margin: "32px 0 0",
        }}
      >
        Volume IV — A Quiet Acquisition.
      </h3>
      <p
        style={{
          fontFamily: DM,
          fontSize: 13.5,
          lineHeight: 1.7,
          color: "rgba(244,241,236,0.7)",
          marginTop: 14,
        }}
      >
        Six chapters, witnessed once, then kept on record.
      </p>
      <div className="flex-1" />
      <div style={{ ...MONO, color: GOLD, marginTop: 24 }}>Opens in 48 Hours</div>
      <div className="mt-5">
        <span
          className="inline-flex items-center gap-3 px-5 py-2.5"
          style={{
            ...MONO,
            color: GOLD_BRIGHT,
            border: `1px solid ${GOLD}`,
            background: "transparent",
            borderRadius: 2,
          }}
        >
          Witness <ArrowRight size={12} strokeWidth={1.6} />
        </span>
      </div>
    </div>
  </Link>
);

const ReadingRoomCard = () => {
  const items = [
    { title: "The First Hour", date: "Checked Out 14 May" },
    { title: "Notes on Restraint", date: "Checked Out 12 May" },
    { title: "Letter — On the Closed Door", date: "Checked Out 09 May" },
  ];
  return (
    <Link to="/library/reading-room" className="lib-card-shell group block p-7 flex flex-col" style={{ minHeight: 340 }}>
      <Kicker>Your Reading Room</Kicker>
      <div
        style={{
          fontFamily: CORMORANT,
          fontStyle: "italic",
          fontSize: 18,
          color: CHARCOAL,
          lineHeight: 1.35,
          marginBottom: 22,
        }}
      >
        Three things waiting for you.
      </div>
      <ul className="space-y-4 flex-1">
        {items.map((it) => (
          <li key={it.title}>
            <div style={{ fontFamily: PLAYFAIR, fontSize: 14, color: CHARCOAL, lineHeight: 1.25 }}>
              {it.title}
            </div>
            <div style={{ ...MONO, color: "rgba(10,10,10,0.45)", fontSize: 10, marginTop: 2 }}>
              {it.date}
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-5 inline-flex items-center gap-2" style={{ ...MONO, color: OXBLOOD, fontSize: 10 }}>
        Visit the Room <ArrowRight size={12} strokeWidth={1.6} />
      </div>
    </Link>
  );
};

const PeriodicalsCard = () => (
  <Link to="/library/periodicals" className="lib-card-shell group block p-8 md:p-10 flex flex-col" style={{ minHeight: 340 }}>
    <Kicker>In the Periodicals</Kicker>
    <h3 style={{ fontFamily: PLAYFAIR, fontSize: 24, lineHeight: 1.15, color: CHARCOAL, margin: 0 }}>
      What the librarian keeps.
    </h3>
    <blockquote
      className="my-8 mx-auto"
      style={{
        fontFamily: CORMORANT,
        fontStyle: "italic",
        fontSize: 18,
        lineHeight: 1.55,
        color: "rgba(10,10,10,0.78)",
        textAlign: "center",
        maxWidth: 380,
      }}
    >
      “We did not build an archive to be admired. We built it so the work would have somewhere to
      sit when the noise stops.”
    </blockquote>
    <div className="flex-1" />
    <div style={{ ...MONO, color: "rgba(10,10,10,0.5)" }}>Essay · 9 Min · By the Proprietor</div>
    <div className="mt-4 inline-flex items-center gap-2" style={{ ...MONO, color: OXBLOOD, fontSize: 10 }}>
      Read <ArrowRight size={12} strokeWidth={1.6} />
    </div>
  </Link>
);

// ===================== Just Arrived =====================
const ARRIVALS = [
  { n: "003", title: "On Showing Up", meta: "PDF · 12 Pages" },
  { n: "004", title: "The Mark and the Method", meta: "PDF · 18 Pages" },
  { n: "005", title: "A Field Report", meta: "PDF · 22 Pages" },
  { n: "006", title: "Letters, Sent Later", meta: "PDF · 9 Pages" },
  { n: "007", title: "The Closed Door", meta: "PDF · 14 Pages" },
];

const JustArrived = () => (
  <section className="mt-20 md:mt-24">
    <div className="flex items-center gap-5 mb-7">
      <span style={{ ...MONO, color: "rgba(10,10,10,0.65)" }}>Just Arrived</span>
      <span aria-hidden className="flex-1 h-px" style={{ background: "var(--lib-border)" }} />
    </div>
    <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 md:mx-0 md:px-0">
      {ARRIVALS.map((a) => (
        <Link
          key={a.n}
          to="/library/stacks"
          className="lib-card-shell block snap-start flex-shrink-0 overflow-hidden"
          style={{ width: 220, padding: 0 }}
        >
          <div className="relative w-full" style={{ aspectRatio: "7 / 5", background: CHARCOAL }}>
            <img src={briefcaseImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[22%] opacity-90">
              <PMonogram size={48} color={GOLD} style={{ width: "100%", height: "auto", aspectRatio: "1 / 1.05" }} />
            </div>
          </div>
          <div className="p-4">
            <div style={{ ...MONO, color: "rgba(10,10,10,0.5)", fontSize: 10 }}>№ {a.n}</div>
            <div style={{ fontFamily: PLAYFAIR, fontSize: 16, color: CHARCOAL, marginTop: 6, lineHeight: 1.2 }}>
              {a.title}
            </div>
            <div style={{ ...MONO, color: "rgba(10,10,10,0.4)", fontSize: 10, marginTop: 6 }}>{a.meta}</div>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

// ===================== Framed Manifesto (centerpiece) =====================
const ManifestoFrame = () => (
  <section className="mt-20 md:mt-24 flex justify-center">
    <div
      className="relative"
      style={{
        width: "min(460px, 90vw)",
        aspectRatio: "0.83 / 1",
        filter: "drop-shadow(0 24px 36px rgba(10,5,2,0.55)) drop-shadow(0 6px 10px rgba(10,5,2,0.4))",
      }}
    >
      {/* parchment matte (sits inside the frame's window) */}
      <div
        className="absolute"
        style={{
          inset: "13% 12% 13% 12%",
          background:
            "radial-gradient(ellipse at 50% 30%, #F3E7CB 0%, #E8D9B4 60%, #D9C595 100%)",
          boxShadow: "inset 0 0 60px rgba(120,80,30,0.35), inset 0 0 8px rgba(80,50,20,0.5)",
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.12,
            mixBlendMode: "multiply",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <div
            style={{
              fontFamily: CORMORANT,
              fontStyle: "italic",
              fontSize: "clamp(20px, 2.4vw, 28px)",
              lineHeight: 1.25,
              color: "#3B2410",
              maxWidth: "22ch",
            }}
          >
            A vault of work,<br />given freely.
          </div>
          <div
            style={{
              ...MONO,
              color: "rgba(59,36,16,0.7)",
              fontSize: 10,
              letterSpacing: "0.3em",
              marginTop: 18,
            }}
          >
            — The Library —
          </div>
          <img
            src={waxSeal}
            alt=""
            className="lib-wax-breathe"
            style={{ width: 44, height: 44, marginTop: 22, opacity: 0.95 }}
          />
        </div>
      </div>
      {/* gilt frame on top */}
      <img
        src={giltFrameUrl}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        style={{ objectFit: "contain" }}
        draggable={false}
      />
      {/* picture-rail cord above */}
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top: -28,
          width: 1,
          height: 32,
          background: "linear-gradient(180deg, rgba(201,169,110,0) 0%, rgba(201,169,110,0.7) 30%, rgba(201,169,110,0.9) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          top: -36,
          width: 8,
          height: 8,
          background: "radial-gradient(circle at 35% 30%, #E8C97A 0%, #B8924F 60%, #6E521E 100%)",
          boxShadow: "0 1px 2px rgba(0,0,0,0.5)",
        }}
      />
    </div>
  </section>
);

// ===================== Walnut Shelf of Briefcases =====================
const SHELF_ARRIVALS = [
  { n: "003", title: "On Showing Up", meta: "PDF · 12pp", rot: -3 },
  { n: "004", title: "The Mark and the Method", meta: "PDF · 18pp", rot: 2 },
  { n: "005", title: "A Field Report", meta: "PDF · 22pp", rot: -1 },
  { n: "006", title: "Letters, Sent Later", meta: "PDF · 9pp", rot: 3 },
];

const ShelfBriefcase = ({
  item,
  delay,
}: {
  item: (typeof SHELF_ARRIVALS)[number];
  delay: number;
}) => {
  const [hover, setHover] = useState(false);
  return (
    <Link
      to="/library/stacks"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative flex-shrink-0"
      style={{
        width: 160,
        transform: hover
          ? `perspective(800px) rotateY(-4deg) translateY(-6px)`
          : `perspective(800px) rotateY(0deg) translateY(0)`,
        transformOrigin: "bottom center",
        transition: "transform 240ms cubic-bezier(0.22,1,0.36,1)",
        animation: `lib-briefcase-float 6s ease-in-out ${delay}s infinite`,
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          width: "100%",
          aspectRatio: "5 / 6",
          transform: `rotate(${item.rot * 0.5}deg)`,
          background: "#0A0A0A",
          boxShadow: hover
            ? "0 22px 32px -10px rgba(0,0,0,0.7), 0 6px 10px rgba(0,0,0,0.5)"
            : "0 14px 22px -10px rgba(0,0,0,0.7), 0 4px 6px rgba(0,0,0,0.5)",
          borderRadius: 2,
        }}
      >
        <img
          src={briefcaseImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.92) saturate(1.05)" }}
          loading="lazy"
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[28%] opacity-90">
          <PMonogram size={48} color={GOLD} style={{ width: "100%", height: "auto", aspectRatio: "1 / 1.05" }} />
        </div>
      </div>
      <div className="mt-3 text-center px-1">
        <div style={{ ...MONO, color: GOLD_BRIGHT, fontSize: 9, letterSpacing: "0.22em" }}>№ {item.n}</div>
        <div
          style={{
            fontFamily: CORMORANT,
            fontStyle: "italic",
            fontSize: 14,
            color: BONE,
            marginTop: 4,
            lineHeight: 1.2,
            textShadow: "0 1px 4px rgba(0,0,0,0.6)",
          }}
        >
          {item.title}
        </div>
      </div>
    </Link>
  );
};

const ShelfOfBriefcases = ({ label }: { label: string }) => (
  <section className="mt-20 md:mt-24 relative">
    {/* nameplate */}
    <div className="flex justify-center mb-5">
      <div
        style={{
          ...MONO,
          color: "#2A1A0A",
          background: "linear-gradient(180deg, #E8C97A 0%, #B8924F 60%, #8A6A2F 100%)",
          padding: "5px 16px",
          fontSize: 10,
          letterSpacing: "0.32em",
          borderRadius: 1,
          boxShadow: "inset 0 1px 0 rgba(255,235,180,0.5), 0 1px 2px rgba(0,0,0,0.45)",
          border: "1px solid rgba(0,0,0,0.25)",
        }}
      >
        {label}
      </div>
    </div>

    {/* briefcases sitting above shelf */}
    <div className="relative" style={{ paddingBottom: 38 }}>
      <div className="flex justify-center items-end gap-6 md:gap-10 px-4 relative" style={{ zIndex: 2 }}>
        {SHELF_ARRIVALS.map((a, i) => (
          <ShelfBriefcase key={a.n} item={a} delay={i * 1.3} />
        ))}
      </div>
      {/* the walnut shelf strip */}
      <div
        aria-hidden
        className="absolute left-0 right-0"
        style={{
          bottom: 0,
          height: 56,
          backgroundImage: `url(${walnutShelfUrl})`,
          backgroundSize: "100% 220%",
          backgroundPosition: "center 40%",
          backgroundRepeat: "no-repeat",
          mixBlendMode: "screen",
          opacity: 0.95,
          zIndex: 1,
        }}
      />
      {/* shelf cast shadow on wallpaper */}
      <div
        aria-hidden
        className="absolute left-0 right-0"
        style={{
          bottom: -8,
          height: 28,
          background: "radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, transparent 70%)",
          filter: "blur(4px)",
          zIndex: 0,
        }}
      />
    </div>
  </section>
);

// ===================== Rooms Constellation =====================
const ROOMS = [
  { to: "/library/stacks",       name: "The Stacks",        meta: "57 Briefcases", img: briefcaseImg },
  { to: "/library/cinema",       name: "The Cinema",        meta: "12 Sessions",   img: cinemaImg },
  { to: "/library/periodicals",  name: "The Periodicals",   meta: "9 Essays",      img: volumeImg },
  { to: "/library/vault",        name: "The Vault",         meta: "4 Sealed",      img: chamberImg },
  { to: "/library/reading-room", name: "The Reading Room",  meta: "Your 3 Items",  img: heroImg },
  { to: "/library/index",        name: "The Index",         meta: "All Records",   img: shelfwallImg },
];

const RoomTile = ({ room }: { room: typeof ROOMS[number] }) => {
  const [hover, setHover] = useState(false);
  return (
    <Link
      to={room.to}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="block flex-shrink-0"
      style={{
        width: 180,
        background: BONE,
        border: `1px solid ${hover ? "rgba(201,169,110,0.6)" : "rgba(201,169,110,0.25)"}`,
        borderRadius: 6,
        overflow: "hidden",
        transform: `translateY(${hover ? -4 : 0}px)`,
        transition: "transform 220ms cubic-bezier(0.22,1,0.36,1), border-color 220ms ease-out, box-shadow 220ms ease-out",
        boxShadow: hover ? "0 12px 28px rgba(10,10,10,0.14)" : "none",
      }}
    >
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 10" }}>
        <img
          src={room.img}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: hover ? "saturate(1.06) brightness(0.96)" : "saturate(1.0) brightness(0.94)",
            transition: "filter 220ms ease-out",
          }}
        />
      </div>
      <div className="px-3 pt-3 pb-3 text-center">
        <div
          style={{
            fontFamily: CORMORANT,
            fontStyle: "italic",
            fontSize: 18,
            color: CHARCOAL,
            lineHeight: 1.2,
          }}
        >
          {room.name}
        </div>
        <div
          style={{
            ...MONO,
            color: "rgba(10,10,10,0.5)",
            fontSize: 10,
            marginTop: 6,
          }}
        >
          {room.meta}
        </div>
        <div
          aria-hidden
          style={{
            fontFamily: CORMORANT,
            color: GOLD_BRIGHT,
            fontSize: 12,
            marginTop: 8,
            lineHeight: 1,
          }}
        >
          ❦
        </div>
      </div>
    </Link>
  );
};

const RoomsConstellation = () => (
  <section className="mt-20 md:mt-24">
    <div className="flex items-center gap-5 mb-7">
      <span aria-hidden className="flex-1 h-px" style={{ background: "rgba(201,169,110,0.35)" }} />
      <span style={{ ...MONO, color: "rgba(10,10,10,0.6)", letterSpacing: "0.28em" }}>
        The Rooms of the Library
      </span>
      <span aria-hidden className="flex-1 h-px" style={{ background: "rgba(201,169,110,0.35)" }} />
    </div>
    <div className="flex gap-4 overflow-x-auto pb-3 -mx-6 px-6 md:mx-0 md:px-0 md:justify-center snap-x snap-mandatory">
      {ROOMS.map((r) => (
        <div key={r.to} className="snap-start"><RoomTile room={r} /></div>
      ))}
    </div>
  </section>
);

// ===================== Page =====================
const LibraryHome = () => {
  const { session, member, loading } = useMember();
  useEffect(() => {
    document.title = "The Pasted Library";
  }, []);

  if (loading) return <div className="min-h-screen" style={{ background: BONE }} />;

  const firstName = member?.first_name || "Guest";

  return (
    <div
      className="lib-atrium-root relative min-h-screen w-full overflow-x-hidden"
      style={{
        background:
          "radial-gradient(at 30% 18%, #F9F4EA 0%, #F4F1EC 55%, #ECE3D5 100%)",
        color: CHARCOAL,
      }}
    >
      <style>{`
        @keyframes lib-hero-breathe { 0% { transform: scale(1); } 100% { transform: scale(1.03); } }
        @keyframes lib-atrium-in { 0% { opacity: 0; transform: translateY(6px); } 100% { opacity: 1; transform: translateY(0); } }
        .lib-atrium-in { animation: lib-atrium-in 480ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        @keyframes lib-candle-flicker-a {
          0%   { opacity: 0.82; transform: translate(-50%, -50%) scale(1.00); }
          40%  { opacity: 0.96; transform: translate(-50%, -50%) scale(1.025); }
          70%  { opacity: 0.88; transform: translate(-50%, -50%) scale(1.015); }
          100% { opacity: 1.00; transform: translate(-50%, -50%) scale(1.04); }
        }
        @keyframes lib-candle-flicker-b {
          0%   { opacity: 0.78; transform: translate(-50%, -50%) scale(1.00); }
          55%  { opacity: 0.92; transform: translate(-50%, -50%) scale(1.02); }
          100% { opacity: 1.00; transform: translate(-50%, -50%) scale(1.035); }
        }
        @keyframes lib-wax-breathe {
          0%, 100% { filter: drop-shadow(0 0 0 rgba(212,181,122,0)) brightness(1.0); }
          50%      { filter: drop-shadow(0 0 10px rgba(212,181,122,0.45)) brightness(1.08); }
        }
        .lib-wax-breathe { animation: lib-wax-breathe 4.2s ease-in-out infinite; }
        /* Custom cursors (scoped to Library) */
        .lib-atrium-root { cursor: url('/cursors/cursor-dot.svg') 7 7, default; }
        .lib-atrium-root a,
        .lib-atrium-root button,
        .lib-atrium-root [role="button"] { cursor: url('/cursors/cursor-key.svg') 7 12, pointer; }
        /* Drop cap on the dispatch line */
        .lib-dispatch::first-letter {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-style: italic;
          font-size: 2.4em;
          line-height: 0.9;
          color: #C9A96E;
          padding-right: 0.06em;
          vertical-align: -0.08em;
        }
      `}</style>

      <LeftRail />
      <MemberPill name={member?.first_name ? `Dr ${member.first_name}` : "Guest Reader"} number="0247" />

      <div className="lib-atrium-in" style={{ paddingLeft: 0 }}>
        <div className="md:pl-[var(--rail-w-left)]">
          {/* Hero + overlapping welcome card */}
          <div className="relative">
            <Hero firstName={firstName} />
            <div
              className="px-6 md:px-10 relative"
              style={{ marginTop: -88, zIndex: 5 }}
            >
              <WelcomeCard />
            </div>
          </div>

          {/* Modular grid */}
          <section className="px-6 md:px-10 mt-16 md:mt-20">
            <div className="grid grid-cols-12 gap-5 md:gap-7">
              {/* Row 1 */}
              <div className="col-span-12 lg:col-span-7"><CounterCard /></div>
              <div className="col-span-12 lg:col-span-5"><CinemaCard /></div>
              {/* Row 2 */}
              <div className="col-span-12 md:col-span-6 lg:col-span-4"><VaultCard /></div>
              <div className="col-span-12 md:col-span-6 lg:col-span-3"><ReadingRoomCard /></div>
              <div className="col-span-12 lg:col-span-5"><PeriodicalsCard /></div>
            </div>

            <JustArrived />
            <RoomsConstellation />
          </section>

          {/* Dispatch */}
          <div className="px-6 py-20 md:py-24 text-center">
            <p
              className="lib-dispatch mx-auto"
              style={{
                fontFamily: CORMORANT,
                fontStyle: "italic",
                fontSize: 22,
                color: INK,
                margin: 0,
                lineHeight: 1.55,
                maxWidth: 640,
              }}
            >
              A new release joins the Vault on Friday at noon. Set your hour.
              <Fleuron glyph="❦" color={GOLD} size={14} />
            </p>
          </div>

          {/* Footer */}
          <footer
            className="px-6 py-12 text-center"
            style={{
              background: BONE,
              borderTop: "1px solid var(--lib-border)",
            }}
          >
            <div className="inline-flex flex-col items-center" style={{ ...MONO, color: "rgba(26,20,14,0.45)", fontSize: 10, lineHeight: 1.9 }}>
              <span className="inline-flex items-center gap-1">
                The Pasted Library
                <Fleuron glyph="❦" color="rgba(201,169,110,0.55)" size={10} />
                Madrid
                <Fleuron glyph="❦" color="rgba(201,169,110,0.55)" size={10} />
                MMXXVI
              </span>
              <span className="inline-flex items-center gap-1">
                New Briefcases Arrive Weekly
                <Fleuron glyph="❧" color="rgba(201,169,110,0.55)" size={10} />
                Visit Your Card Any Time
              </span>
            </div>
            <div className="mx-auto mt-6 flex justify-center">
              <PMonogram size={28} color={CHARCOAL} opacity={0.3} />
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default LibraryHome;
