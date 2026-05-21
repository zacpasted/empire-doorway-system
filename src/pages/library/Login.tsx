import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MagicLinkForm } from "@/components/library/MagicLinkForm";
import { useMember } from "@/hooks/useMember";
import pMonogramUrl from "@/assets/pasted-p-oval.png";

// === PALETTE (matches "/" Vault + /card cinematic) ===
const OXBLOOD = "#5C1A1F";
const OXBLOOD_HI = "#6E1E26";
const BRASS = "#B8862B";
const BRASS_BRIGHT = "#D4A04F";
const IVORY = "#F4F1EC";

const PLAYFAIR = "'Playfair Display', Georgia, serif";
const DM = "'DM Sans', system-ui, sans-serif";
const MONO: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
  fontSize: 11,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  fontWeight: 500,
};

const Login = () => {
  const { session, loading } = useMember();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Sign in — PASTED";
  }, []);
  useEffect(() => {
    if (!loading && session) navigate("/library", { replace: true });
  }, [loading, session, navigate]);

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden flex flex-col"
      style={{
        background: `linear-gradient(135deg, ${OXBLOOD_HI} 0%, ${OXBLOOD} 55%, #3e1014 100%)`,
        fontFamily: DM,
        color: IVORY,
      }}
    >
      {/* repeating P monogram pattern (same as /card) */}
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
        <Link to="/" style={{ ...MONO, color: IVORY, opacity: 0.85 }}>
          ← The Library
        </Link>
        <div className="hidden md:block" style={{ ...MONO, color: BRASS_BRIGHT, fontSize: 10 }}>
          Pasted Society / Members Entrance
        </div>
        <span style={{ ...MONO, color: "rgba(244,241,236,0.5)" }}>Sign In</span>
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
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-6 py-12 md:py-16 text-center">
        <div
          className="flex items-center gap-3 md:gap-4 mb-8"
          style={{ ...MONO, color: BRASS_BRIGHT, fontSize: 10, letterSpacing: "0.4em" }}
        >
          <span aria-hidden className="block" style={{ height: 1, width: "clamp(24px, 5vw, 48px)", background: "rgba(184,134,43,0.4)" }} />
          <span>The Library — Members</span>
          <span aria-hidden className="block" style={{ height: 1, width: "clamp(24px, 5vw, 48px)", background: "rgba(184,134,43,0.4)" }} />
        </div>

        <h1
          style={{
            fontFamily: PLAYFAIR,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(44px, 8vw, 88px)",
            lineHeight: 0.9,
            color: IVORY,
            letterSpacing: "-0.02em",
            margin: 0,
            textShadow: "0 4px 32px rgba(0,0,0,0.45)",
          }}
        >
          Welcome back.
        </h1>
        <p
          className="mt-5 max-w-md"
          style={{ fontFamily: DM, fontSize: 14, color: "rgba(244,241,236,0.72)", lineHeight: 1.7 }}
        >
          A sign-in link, sent to your email. One line — no password.
        </p>

        {/* The form panel */}
        <div className="w-full max-w-[520px] mt-12 md:mt-14">
          <div
            className="px-6 md:px-10 py-10 md:py-12 text-left"
            style={{
              background: IVORY,
              border: `1px solid ${BRASS}`,
              borderRadius: 2,
              boxShadow: "0 30px 80px -20px rgba(0,0,0,0.55)",
            }}
          >
            <MagicLinkForm mode="login" />
          </div>
        </div>

        {/* Footer link */}
        <div className="mt-12 md:mt-14">
          <Link
            to="/library"
            className="group inline-flex items-center gap-4"
            style={{ ...MONO, color: IVORY }}
          >
            <span aria-hidden className="block" style={{ height: 1, width: 56, background: BRASS }} />
            <span>No card yet? Claim a card</span>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Login;