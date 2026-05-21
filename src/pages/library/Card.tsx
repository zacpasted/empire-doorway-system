import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LibraryCard } from "@/components/library/LibraryCard";
import { useMember } from "@/hooks/useMember";
import { supabase } from "@/integrations/supabase/client";
import pMonogramUrl from "@/assets/pasted-p-oval.png";

// === PALETTE (matches LibraryHome cinematic) ===
const WALNUT_DEEP = "#14100C";
const BRASS = "#B8862B";
const BRASS_BRIGHT = "#D4A04F";
const IVORY = "#F4F1EC";
const OXBLOOD = "#5C1A1F";
const OXBLOOD_HI = "#6E1E26";

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

const pad4 = (n: number) => n.toString().padStart(4, "0");
const monthYear = (iso?: string | null) => {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

const CardPage = () => {
  const { member, loading } = useMember();
  useEffect(() => { document.title = "Your Card — The PASTED Library"; }, []);

  if (loading) {
    return <div className="min-h-screen" style={{ background: WALNUT_DEEP }} />;
  }

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden flex flex-col"
      style={{
        background: `linear-gradient(135deg, ${OXBLOOD_HI} 0%, ${OXBLOOD} 55%, #3e1014 100%)`,
        fontFamily: DM,
        color: IVORY,
      }}
    >
      {/* repeating P monogram pattern at low opacity */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.09,
          backgroundImage: `url(${pMonogramUrl})`,
          backgroundSize: "110px 115px",
          backgroundRepeat: "repeat",
        }}
      />
      {/* upper-left tungsten light wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 20% 10%, rgba(232,180,122,0.20) 0%, transparent 55%)` }}
      />
      {/* film grain */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.05,
          mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Header */}
      <header className="relative z-20 px-6 md:px-10 py-5 flex items-center justify-between">
        <Link to="/library" style={{ ...MONO, color: IVORY, opacity: 0.85 }}>
          ← The Library
        </Link>
        <div className="hidden md:block" style={{ ...MONO, color: BRASS_BRIGHT, fontSize: 10 }}>
          Pasted Society / Member Record
        </div>
        <button
          onClick={() => supabase.auth.signOut().then(() => { window.location.href = "/"; })}
          style={{ ...MONO, color: IVORY, paddingBottom: 4, borderBottom: `1px solid ${BRASS}`, background: "transparent" }}
        >
          Sign Out
        </button>
      </header>

      {/* Internal structural frame */}
      <div
        aria-hidden
        className="absolute z-10 pointer-events-none"
        style={{
          top: "clamp(20px, 4vw, 48px)",
          right: "clamp(20px, 4vw, 48px)",
          bottom: "clamp(20px, 4vw, 48px)",
          left: "clamp(20px, 4vw, 48px)",
          border: `1px solid rgba(184,134,43,0.18)`,
        }}
      />

      {/* Main */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-6 py-16 md:py-20 text-center">
        <div className="flex items-center gap-3 md:gap-4 mb-8" style={{ ...MONO, color: BRASS_BRIGHT, fontSize: 10, letterSpacing: "0.4em" }}>
          <span aria-hidden className="block" style={{ height: 1, width: "clamp(24px, 5vw, 48px)", background: "rgba(184,134,43,0.4)" }} />
          <span>Member № {pad4(member.member_number)}</span>
          <span aria-hidden className="block" style={{ height: 1, width: "clamp(24px, 5vw, 48px)", background: "rgba(184,134,43,0.4)" }} />
        </div>

        <h1
          style={{
            fontFamily: PLAYFAIR,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(44px, 8vw, 96px)",
            lineHeight: 0.9,
            color: IVORY,
            letterSpacing: "-0.02em",
            margin: 0,
            textShadow: "0 4px 32px rgba(0,0,0,0.45)",
          }}
        >
          Your card.
        </h1>
        <p
          className="mt-5 max-w-md"
          style={{ fontFamily: DM, fontSize: 14, color: "rgba(244,241,236,0.72)", lineHeight: 1.7 }}
        >
          Kept on record since {monthYear(member.created_at)}. Show it at the door.
        </p>

        {/* The card */}
        <div className="w-full mt-14 md:mt-20 flex justify-center">
          <LibraryCard
            firstName={member.first_name || "Friend"}
            memberNumber={member.member_number}
            joinedAt={member.created_at}
          />
        </div>

        {/* Return */}
        <div className="mt-16 md:mt-20">
          <Link
            to="/library"
            className="group inline-flex items-center gap-4"
            style={{ ...MONO, color: IVORY, transition: `opacity 400ms ${EASE}` }}
          >
            <span aria-hidden className="block" style={{ height: 1, width: 56, background: BRASS }} />
            <span>Return to the Library</span>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default CardPage;