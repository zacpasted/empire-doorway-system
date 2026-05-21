import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import waxSeal from "@/assets/library-wax-seal.png";

const schema = z.object({
  first_name: z.string().trim().min(1, "Required").max(60),
  last_name: z.string().trim().min(1, "Required").max(60),
  email: z.string().trim().email("Enter a valid email").max(255),
  practice_name: z.string().trim().min(2, "Required").max(160),
  role: z.enum(["owner", "associate", "building"], {
    errorMap: () => ({ message: "Choose your role" }),
  }),
  why_now: z.string().trim().min(2, "One line, please").max(200),
});

type Phase = "idle" | "pressing" | "reviewing" | "out";
type Role = "" | "owner" | "associate" | "building";

const CornerFiligree = ({ rotate = 0 }: { rotate?: number }) => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 40 40"
    style={{ transform: `rotate(${rotate}deg)`, opacity: 0.28 }}
    aria-hidden="true"
  >
    <path
      d="M2 14 Q2 2 14 2 M2 14 Q6 10 10 10 M14 2 Q10 6 10 10 M10 10 L14 14 M6 6 Q8 8 10 10"
      fill="none"
      stroke="#C9A96E"
      strokeWidth="0.9"
      strokeLinecap="round"
    />
    <circle cx="10" cy="10" r="0.9" fill="#C9A96E" />
  </svg>
);

const KeyDivider = () => (
  <svg
    width="180"
    height="18"
    viewBox="0 0 180 18"
    aria-hidden="true"
    style={{ opacity: 0.5 }}
    className="mx-auto"
  >
    <circle cx="14" cy="9" r="6" fill="none" stroke="#C9A96E" strokeWidth="0.9" />
    <circle cx="14" cy="9" r="2.5" fill="none" stroke="#C9A96E" strokeWidth="0.8" />
    <line x1="20" y1="9" x2="150" y2="9" stroke="#C9A96E" strokeWidth="0.9" />
    <line x1="60" y1="6" x2="60" y2="12" stroke="#C9A96E" strokeWidth="0.8" />
    <line x1="64" y1="6" x2="64" y2="12" stroke="#C9A96E" strokeWidth="0.8" />
    <path d="M150 9 L168 9 L168 14 L162 14 L162 11 L156 11 L156 13 L150 13 Z" fill="none" stroke="#C9A96E" strokeWidth="0.9" strokeLinejoin="round" />
  </svg>
);

const ExLibrisWatermark = () => (
  <svg
    viewBox="0 0 380 380"
    aria-hidden="true"
    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    style={{ width: 380, height: 380, opacity: 0.03 }}
  >
    <circle cx="190" cy="190" r="180" fill="none" stroke="#0A0A0A" strokeWidth="1.5" />
    <circle cx="190" cy="190" r="160" fill="none" stroke="#0A0A0A" strokeWidth="0.8" />
    <text x="190" y="120" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" letterSpacing="6" fill="#0A0A0A">EX LIBRIS</text>
    <text x="190" y="220" textAnchor="middle" fontFamily="Playfair Display, Georgia, serif" fontStyle="italic" fontSize="160" fill="#0A0A0A">P</text>
    <text x="190" y="280" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="5" fill="#0A0A0A">THE PASTED LIBRARY</text>
  </svg>
);

import { PMonogram } from "@/components/library/PMonogram";
const Monogram56 = () => <PMonogram size={56} color="#C9A96E" />;

// Shared label styles per spec
const labelStyle: React.CSSProperties = {
  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
  fontSize: "11px",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "rgba(10,10,10,0.5)",
};

const inputStyle: React.CSSProperties = {
  borderBottom: "1px solid rgba(10,10,10,0.18)",
  transition: "border-color 200ms ease",
  fontFamily: '"Cormorant Garamond", Georgia, serif',
  fontSize: "16px",
  lineHeight: 1.3,
};

export const ClaimGate = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [practiceName, setPracticeName] = useState("");
  const [role, setRole] = useState<Role>("");
  const [whyNow, setWhyNow] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const submitting = phase !== "idle";

  const runSupabase = async () => {
    const { error: insertError } = await supabase.from("applications").insert({
      first_name: firstName.trim().slice(0, 60),
      last_name: lastName.trim().slice(0, 60),
      email: email.trim().toLowerCase(),
      practice_name: practiceName.trim().slice(0, 160),
      role: role as "owner" | "associate" | "building",
      why_now: whyNow.trim().slice(0, 200) || null,
    });
    return insertError;
  };

  const runSubmission = async (skipPressBeat = false) => {
    setError(null);
    if (!skipPressBeat) {
      setPhase("pressing");
      await new Promise((r) => setTimeout(r, 600));
    }
    setPhase("reviewing");
    const authError = await runSupabase();

    if (authError) {
      setPhase("idle");
      setError("That email did not arrive. Try again.");
      return;
    }

    setPhase("out");
    try {
      sessionStorage.setItem("pasted_first_name", firstName.trim());
      sessionStorage.setItem(
        "pasted_full_name",
        `${firstName.trim()} ${lastName.trim()}`.trim()
      );
    } catch { /* noop */ }
    setTimeout(() => navigate("/library/pending"), 320);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsed = schema.safeParse({
      first_name: firstName,
      last_name: lastName,
      email,
      practice_name: practiceName,
      role,
      why_now: whyNow,
    });
    if (!parsed.success) {
      const first = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
      setError(first ?? "Check the form.");
      return;
    }
    await runSubmission();
  };

  const handleRetry = async () => {
    // Re-validate in case the user edited fields after the error.
    const parsed = schema.safeParse({
      first_name: firstName,
      last_name: lastName,
      email,
      practice_name: practiceName,
      role,
      why_now: whyNow,
    });
    if (!parsed.success) {
      const first = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
      setError(first ?? "Check the form.");
      return;
    }
    await runSubmission(true);
  };

  const renderField = (props: {
    id: string;
    type: string;
    label: string;
    value: string;
    onChange: (v: string) => void;
    autoComplete?: string;
    placeholder?: string;
  }) => (
    <div key={props.id}>
      <label htmlFor={props.id} style={labelStyle} className="block mb-1.5">{props.label}</label>
      <input
        id={props.id}
        type={props.type}
        autoComplete={props.autoComplete}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        onFocus={() => setFocusedField(props.id)}
        onBlur={() => setFocusedField((f) => (f === props.id ? null : f))}
        disabled={submitting}
        className="w-full bg-transparent px-0 py-1.5 text-sm text-charcoal placeholder:text-charcoal/25 focus:outline-none"
        style={{
          ...inputStyle,
          borderBottomColor:
            focusedField === props.id ? "rgba(201,169,110,0.6)" : "rgba(10,10,10,0.18)",
        }}
      />
    </div>
  );

  return (
    <>
    <style>{`
      /* Storybook page-open: hinges from the left like a turning leaf,
         settles flat with a soft paper-weight bounce. */
      @keyframes lib-card-open {
        0% {
          opacity: 0;
          transform: perspective(1600px) rotateY(-58deg) translateZ(-40px) translateY(6px);
          filter: blur(3px) brightness(0.9);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        45% {
          opacity: 1;
          filter: blur(0.4px) brightness(0.98);
        }
        72% {
          transform: perspective(1600px) rotateY(2.4deg) translateZ(0) translateY(0);
          filter: blur(0) brightness(1);
        }
        100% {
          opacity: 1;
          transform: perspective(1600px) rotateY(0deg) translateZ(0) translateY(0);
          filter: blur(0) brightness(1);
          box-shadow: 0 30px 80px rgba(0,0,0,0.5);
        }
      }
      /* Sweeping highlight as the page opens — like light catching paper */
      @keyframes lib-card-gloss {
        0%   { opacity: 0; transform: translateX(-120%) skewX(-12deg); }
        25%  { opacity: 0.55; }
        100% { opacity: 0; transform: translateX(160%) skewX(-12deg); }
      }
      .lib-card-enter {
        transform-origin: left center;
        backface-visibility: hidden;
        animation: lib-card-open 1100ms cubic-bezier(0.22, 1, 0.36, 1) both;
        will-change: opacity, transform, filter;
      }
      .lib-card-enter::after {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        background: linear-gradient(110deg,
          transparent 0%,
          rgba(255,244,214,0) 35%,
          rgba(255,244,214,0.55) 50%,
          rgba(255,244,214,0) 65%,
          transparent 100%);
        mix-blend-mode: screen;
        animation: lib-card-gloss 1200ms cubic-bezier(0.22, 1, 0.36, 1) 120ms both;
        border-radius: inherit;
      }
      @media (prefers-reduced-motion: reduce) {
        .lib-card-enter,
        .lib-card-enter::after { animation: none; }
      }
      /* Reviewing-application overlay */
      @keyframes lib-review-in {
        0%   { opacity: 0; transform: translateY(8px) scale(0.985); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }
      @keyframes lib-review-pulse {
        0%, 100% { opacity: 0.55; transform: scale(1); }
        50%      { opacity: 1;    transform: scale(1.04); }
      }
      @keyframes lib-review-dot {
        0%, 100% { opacity: 0.2; }
        50%      { opacity: 1; }
      }
      @keyframes lib-review-bar {
        0%   { transform: translateX(-100%); }
        100% { transform: translateX(260%); }
      }
      .lib-review-overlay {
        animation: lib-review-in 420ms cubic-bezier(0.22,1,0.36,1) both;
        backdrop-filter: blur(2px);
        -webkit-backdrop-filter: blur(2px);
      }
      .lib-review-seal { animation: lib-review-pulse 1800ms ease-in-out infinite; }
      .lib-review-dot { animation: lib-review-dot 1400ms ease-in-out infinite; }
      .lib-review-dot:nth-child(2) { animation-delay: 200ms; }
      .lib-review-dot:nth-child(3) { animation-delay: 400ms; }
      .lib-review-bar-fill {
        position: absolute; top: 0; left: 0; height: 100%; width: 40%;
        background: linear-gradient(90deg, transparent, rgba(122,31,31,0.7), transparent);
        animation: lib-review-bar 1600ms cubic-bezier(0.45,0,0.55,1) infinite;
      }
      @media (prefers-reduced-motion: reduce) {
        .lib-review-seal, .lib-review-dot, .lib-review-bar-fill { animation: none; }
      }
    `}</style>
    <div
      className={`relative w-[300px] md:w-[440px] lib-paper lib-deboss lib-card-enter ${
        phase === "pressing" ? "lib-card-press" : ""
      } ${phase === "out" ? "lib-card-out" : ""}`}
      style={{
        borderRadius: 2,
        boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
        padding: "24px 22px 16px",
        background:
          "linear-gradient(135deg, #F5EFE0 0%, #EFE6D2 50%, #E8DCC2 100%)",
      }}
    >
      {/* Linen / papyrus fibre overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.18,
          mixBlendMode: "multiply",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' seed='9'/%3E%3CfeColorMatrix values='0 0 0 0 0.45  0 0 0 0 0.32  0 0 0 0 0.18  0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23f)'/%3E%3C/svg%3E\")",
        }}
      />
      {/* Horizontal linen fibres */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.08,
          mixBlendMode: "multiply",
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(120,90,50,0.35) 0 1px, transparent 1px 3px), repeating-linear-gradient(0deg, rgba(120,90,50,0.2) 0 1px, transparent 1px 4px)",
        }}
      />

      {/* Debossed inner border — 20px inside */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: 20,
          border: "1px solid rgba(10,10,10,0.08)",
          boxShadow: "0 1px 0 rgba(255,255,255,0.4)",
        }}
      />

      {/* Corner filigree — just inside the deboss border */}
      <div className="absolute" style={{ top: 22, left: 22 }}><CornerFiligree rotate={0} /></div>
      <div className="absolute" style={{ top: 22, right: 22 }}><CornerFiligree rotate={90} /></div>
      <div className="absolute" style={{ bottom: 22, right: 22 }}><CornerFiligree rotate={180} /></div>
      <div className="absolute" style={{ bottom: 22, left: 22 }}><CornerFiligree rotate={270} /></div>

      <ExLibrisWatermark />

      <div className="relative text-center">
        <div className="flex justify-center mb-2"><Monogram56 /></div>
        <div className="lib-mono lib-emboss-gold" style={{ letterSpacing: "0.28em", fontSize: "10px" }}>
          THE PASTED LIBRARY
        </div>
        <div className="mt-2.5 mx-auto" style={{ width: 40, height: 1, background: "rgba(201,169,110,0.55)" }} />

        <div className="lib-editorial text-lib-charcoal text-xl md:text-3xl leading-tight mt-4">
          Apply for your<br />Library Card.
        </div>
        <p className="lib-body text-lib-charcoal/70 mt-2 text-xs md:text-sm italic">
          A few questions. We read every application<br />by hand. You'll hear back within 24 hours.
        </p>

        <div className="my-3"><KeyDivider /></div>

        <form onSubmit={handleSubmit} className="space-y-3 text-left">
          <div className="grid grid-cols-2 gap-3">
            {renderField({ id: "first_name", type: "text", label: "FIRST NAME", value: firstName, onChange: setFirstName, autoComplete: "given-name" })}
            {renderField({ id: "last_name", type: "text", label: "LAST NAME", value: lastName, onChange: setLastName, autoComplete: "family-name" })}
          </div>
          {renderField({ id: "email", type: "email", label: "EMAIL", value: email, onChange: setEmail, autoComplete: "email" })}
          {renderField({ id: "practice_name", type: "text", label: "PRACTICE (CITY, STATE)", value: practiceName, onChange: setPracticeName, autoComplete: "organization", placeholder: "Practice — City, State" })}

          {/* YOUR ROLE — stamp-style selector, no boxes */}
          <div>
            <label style={labelStyle} className="block mb-2.5">YOUR ROLE</label>
            <div className="flex items-center gap-2">
              {(["owner", "associate", "building"] as const).map((r) => {
                const active = role === r;
                return (
                  <button
                    key={r}
                    type="button"
                    disabled={submitting}
                    onClick={() => setRole(r)}
                    className="cg-chip relative cursor-pointer overflow-hidden flex-1"
                    style={{
                      fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                      fontSize: "10px",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: active ? "#7A1F1F" : "rgba(10,10,10,0.65)",
                      background: active
                        ? "linear-gradient(180deg, rgba(201,169,110,0.18) 0%, rgba(201,169,110,0.08) 100%)"
                        : "linear-gradient(180deg, rgba(201,169,110,0.06) 0%, rgba(201,169,110,0.02) 100%)",
                      border: `1px solid ${active ? "rgba(122,31,31,0.55)" : "rgba(201,169,110,0.45)"}`,
                      borderRadius: 10,
                      padding: "9px 12px",
                      boxShadow: active
                        ? "inset 0 1px 0 rgba(255,255,255,0.5), 0 1px 0 rgba(122,31,31,0.08)"
                        : "inset 0 1px 0 rgba(255,255,255,0.45)",
                      transition: "color 220ms ease, border-color 220ms ease, background 220ms ease, box-shadow 220ms ease",
                    }}
                  >
                    <span className="relative z-10">{r}</span>
                    <span aria-hidden className="cg-chip-shimmer" />
                  </button>
                );
              })}
            </div>
            <style>{`
              .cg-chip { position: relative; }
              .cg-chip-shimmer {
                position: absolute;
                top: 0; left: -120%;
                width: 60%; height: 100%;
                background: linear-gradient(110deg, transparent 0%, rgba(255,236,196,0) 35%, rgba(255,236,196,0.45) 50%, rgba(255,236,196,0) 65%, transparent 100%);
                pointer-events: none;
                animation: cg-chip-shimmer 4.2s cubic-bezier(0.22,1,0.36,1) infinite;
              }
              .cg-chip:nth-child(2) .cg-chip-shimmer { animation-delay: 1.4s; }
              .cg-chip:nth-child(3) .cg-chip-shimmer { animation-delay: 2.8s; }
              .cg-chip:hover { border-color: rgba(122,31,31,0.45) !important; }
              @keyframes cg-chip-shimmer {
                0%   { left: -120%; }
                55%  { left: 160%; }
                100% { left: 160%; }
              }
              @media (prefers-reduced-motion: reduce) {
                .cg-chip-shimmer { animation: none; display: none; }
              }
            `}</style>
          </div>

          {/* WHY NOW — single-line textarea */}
          <div>
            <label htmlFor="why_now" style={labelStyle} className="block mb-1.5">WHY NOW — ONE LINE</label>
            <textarea
              id="why_now"
              rows={2}
              maxLength={200}
              value={whyNow}
              onChange={(e) => setWhyNow(e.target.value)}
              onFocus={() => setFocusedField("why_now")}
              onBlur={() => setFocusedField((f) => (f === "why_now" ? null : f))}
              disabled={submitting}
              className="w-full bg-transparent px-0 py-1.5 text-sm text-charcoal placeholder:text-charcoal/25 focus:outline-none resize-none"
              style={{
                ...inputStyle,
                borderBottomColor:
                  focusedField === "why_now" ? "rgba(201,169,110,0.6)" : "rgba(10,10,10,0.18)",
                fontFamily: "inherit",
              }}
            />
          </div>

          {error && (
            <div className="flex items-center justify-between gap-3">
              <p className="lib-mono" style={{ color: "#7A1F1F" }}>{error}</p>
              <button
                type="button"
                onClick={handleRetry}
                disabled={submitting}
                className="lib-mono shrink-0 cursor-pointer"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#7A1F1F",
                  border: "1px solid rgba(122,31,31,0.55)",
                  borderRadius: 10,
                  padding: "6px 10px",
                  background:
                    "linear-gradient(180deg, rgba(201,169,110,0.12) 0%, rgba(201,169,110,0.04) 100%)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.45)",
                  transition: "background 200ms ease, border-color 200ms ease",
                }}
              >
                Retry
              </button>
            </div>
          )}

          {/* Grained oxblood CTA */}
          <button
            type="submit"
            disabled={submitting}
            className="relative w-full py-3 px-6 lib-mono cursor-pointer overflow-hidden group mt-1"
            style={{
              borderRadius: 10,
              background:
                "linear-gradient(135deg, #8A2626 0%, #7A1F1F 50%, #5C1414 100%)",
              color: "#F4F1EC",
              transition: "filter 220ms ease",
              transform: phase === "pressing" ? "translateY(2px)" : undefined,
              filter: phase === "pressing" ? "brightness(0.85)" : undefined,
              boxShadow:
                "inset 0 1px 0 rgba(255,220,180,0.18), inset 0 -1px 0 rgba(0,0,0,0.35), 0 6px 14px rgba(60,10,10,0.35)",
            }}
          >
            {/* papyrus fibre overlay on red */}
            <span
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-50"
              style={{
                opacity: 0.35,
                mixBlendMode: "overlay",
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' seed='11'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")",
              }}
            />
            {/* horizontal fibre striations */}
            <span
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: 0.18,
                mixBlendMode: "multiply",
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(40,5,5,0.6) 0 1px, transparent 1px 3px), repeating-linear-gradient(0deg, rgba(40,5,5,0.35) 0 1px, transparent 1px 5px)",
              }}
            />
            <span className="relative">SUBMIT APPLICATION →</span>
          </button>
        </form>

        {/* Closing italic line */}
        <p
          className="lib-body italic leading-relaxed text-center"
          style={{ color: "rgba(10,10,10,0.55)", fontSize: "11px", marginTop: 14 }}
        >
          No noise. No pitch-mail. Unsubscribe any time.
        </p>

        {/* Wax seal — signature at the foot of a letter */}
        <div className="relative flex justify-center" style={{ marginTop: 12, height: 48 }}>
          {phase !== "idle" && (
            <div
              className="absolute lib-seal-glow pointer-events-none"
              style={{
                width: 140,
                height: 140,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "radial-gradient(circle, rgba(201,169,110,0.35) 0%, rgba(201,169,110,0) 60%)",
              }}
            />
          )}
          <img
            src={waxSeal}
            alt=""
            width={44}
            height={44}
            className={phase === "pressing" || phase === "out" ? "lib-seal-press" : ""}
            style={{
              width: 44,
              height: 44,
              objectFit: "contain",
              filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.35))",
              transformOrigin: "center",
            }}
          />
        </div>

        {/* Fine print */}
        <p
          className="lib-mono text-center"
          style={{
            marginTop: 10,
            fontSize: "9px",
            letterSpacing: "0.2em",
            color: "rgba(10,10,10,0.45)",
          }}
        >
          WE READ EVERY APPLICATION BY HAND.
        </p>
      </div>

      {phase === "reviewing" && (
        <div
          className="lib-review-overlay absolute inset-0 z-20 flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(245,239,224,0.92) 0%, rgba(232,220,194,0.94) 100%)",
            borderRadius: 2,
          }}
          role="status"
          aria-live="polite"
        >
          <div className="relative text-center px-8" style={{ maxWidth: 320 }}>
            <div className="flex justify-center mb-3">
              <div className="lib-review-seal">
                <Monogram56 />
              </div>
            </div>
            <div
              className="lib-mono lib-emboss-gold"
              style={{ letterSpacing: "0.28em", fontSize: "10px" }}
            >
              REVIEWING APPLICATION
            </div>
            <div
              className="mt-2 mx-auto"
              style={{ width: 40, height: 1, background: "rgba(201,169,110,0.55)" }}
            />
            <p
              className="lib-editorial text-lib-charcoal text-base md:text-lg leading-snug mt-3"
              style={{ fontStyle: "italic" }}
            >
              The librarian is examining your card
              <span className="lib-review-dot">.</span>
              <span className="lib-review-dot">.</span>
              <span className="lib-review-dot">.</span>
            </p>
            <div
              className="relative mx-auto mt-4 overflow-hidden"
              style={{
                width: 160,
                height: 2,
                background: "rgba(122,31,31,0.12)",
                borderRadius: 1,
              }}
            >
              <span className="lib-review-bar-fill" />
            </div>
            <p
              className="lib-mono"
              style={{
                marginTop: 14,
                fontSize: "9px",
                letterSpacing: "0.2em",
                color: "rgba(10,10,10,0.5)",
              }}
            >
              A MOMENT, PLEASE
            </p>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default ClaimGate;
