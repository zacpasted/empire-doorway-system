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
import shelfwallImg from "@/assets/library-v8-shelfwall.jpg";
import volumeImg from "@/assets/library-v8-volume.jpg";
import chamberImg from "@/assets/library-v8-chamber.jpg";

// === PALETTE ===
const BONE = "#F4F1EC";
const CHARCOAL = "#0A0A0A";
const GOLD = "#C9A96E";
const GOLD_BRIGHT = "#D4A04F";
const OXBLOOD = "#5C1A1F";
const OXBLOOD_DEEP = "#3e1014";

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
      <span style={{ color: "rgba(212,160,79,0.4)" }}>·</span>
      <span>57 Briefcases</span>
      <span style={{ color: "rgba(212,160,79,0.4)" }}>·</span>
      <span>12 Sessions</span>
      <span style={{ color: "rgba(212,160,79,0.4)" }}>·</span>
      <span>9 Essays</span>
    </div>
  </div>
);

// ===================== Editorial Status Pills =====================
const PILLS = [
  { key: "arrived", label: "Just Arrived", count: 3 },
  { key: "counter", label: "On the Counter" },
  { key: "proprietor", label: "From the Proprietor" },
] as const;

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
        <img src={waxSeal} alt="" className="w-12 h-12 object-contain" style={{ opacity: 0.92 }} />
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

// ===================== Page =====================
const LibraryHome = () => {
  const { session, member, loading } = useMember();
  useEffect(() => {
    document.title = "The Pasted Library";
  }, []);

  if (loading) return <div className="min-h-screen" style={{ background: BONE }} />;

  const firstName = member?.first_name || "Guest";

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden" style={{ background: BONE, color: CHARCOAL }}>
      <style>{`
        @keyframes lib-hero-breathe { 0% { transform: scale(1); } 100% { transform: scale(1.03); } }
        @keyframes lib-atrium-in { 0% { opacity: 0; transform: translateY(6px); } 100% { opacity: 1; transform: translateY(0); } }
        .lib-atrium-in { animation: lib-atrium-in 480ms cubic-bezier(0.22, 1, 0.36, 1) both; }
      `}</style>

      <LeftRail />

      <div className="lib-atrium-in" style={{ paddingLeft: 0 }}>
        <div className="md:pl-[var(--rail-w-left)]">
          {/* Hero strip */}
          <Hero />

          {/* Welcome line */}
          <section className="px-6 md:px-10 pt-20 md:pt-24 pb-12 md:pb-16 text-center">
            <h1
              style={{
                fontFamily: CORMORANT,
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(36px, 5.6vw, 56px)",
                color: CHARCOAL,
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
                margin: 0,
              }}
            >
              Welcome back, {firstName}.
            </h1>
            <div
              className="mt-5"
              style={{
                ...MONO,
                color: "rgba(10,10,10,0.5)",
                fontSize: 11,
                letterSpacing: "0.28em",
              }}
            >
              The Library is Fuller than When You Left
            </div>
          </section>

          {/* Modular grid */}
          <section className="px-6 md:px-10">
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
          </section>

          {/* Dispatch */}
          <div className="px-6 py-20 md:py-24 text-center">
            <p
              style={{
                fontFamily: CORMORANT,
                fontStyle: "italic",
                fontSize: 22,
                color: "rgba(10,10,10,0.7)",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              — A new release joins the Vault on Friday at noon. Set your hour. —
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
            <div style={{ ...MONO, color: "rgba(10,10,10,0.4)", fontSize: 10, lineHeight: 1.9 }}>
              The Pasted Library · Madrid · MMXXVI
              <br />
              New Briefcases Arrive Weekly · Visit Your Card Any Time
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
