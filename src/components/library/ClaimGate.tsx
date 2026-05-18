import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import waxSeal from "@/assets/library-wax-seal.png";

const schema = z.object({
  full_name: z.string().trim().min(2, "Required").max(120).refine(
    (v) => v.split(/\s+/).filter(Boolean).length >= 2,
    "Enter your full name"
  ),
  email: z.string().trim().email("Enter a valid email").max(255),
  location: z.string().trim().min(2, "Required").max(120),
  career_stage: z.enum(["student", "associate", "principal"], {
    errorMap: () => ({ message: "Choose a chapter" }),
  }),
});

type Phase = "idle" | "pressing" | "out";
type Stage = "" | "student" | "associate" | "principal";

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

const Monogram56 = () => (
  <svg width="56" height="56" viewBox="0 0 64 64" aria-hidden="true">
    <ellipse cx="32" cy="32" rx="20" ry="28" fill="none" stroke="#C9A96E" strokeWidth="1.2" />
    <text x="32" y="46" textAnchor="middle" fontFamily="Playfair Display, Georgia, serif" fontStyle="italic" fontWeight="500" fontSize="40" fill="#C9A96E">P</text>
  </svg>
);

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
};

export const ClaimGate = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [careerStage, setCareerStage] = useState<Stage>("");
  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const submitting = phase !== "idle";

  const runSupabase = async () => {
    const redirectTo = `${window.location.origin}/gate`;
    const trimmed = fullName.trim().replace(/\s+/g, " ");
    const parts = trimmed.split(" ");
    const first_name = parts[0] ?? "";
    const last_name = parts.slice(1).join(" ");
    const { error: authError } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: redirectTo,
        shouldCreateUser: true,
        data: {
          first_name,
          last_name,
          full_name: trimmed,
          location: location.trim(),
          career_stage: careerStage,
        },
      },
    });
    return authError;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsed = schema.safeParse({
      full_name: fullName,
      email,
      location,
      career_stage: careerStage,
    });
    if (!parsed.success) {
      const first = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
      setError(first ?? "Check the form.");
      return;
    }

    setPhase("pressing");
    const [authError] = await Promise.all([
      runSupabase(),
      new Promise((r) => setTimeout(r, 900)),
    ]);

    if (authError) {
      setPhase("idle");
      setError("That email did not arrive. Try again.");
      return;
    }

    setPhase("out");
    try {
      const first = fullName.trim().split(/\s+/)[0] ?? "";
      sessionStorage.setItem("pasted_first_name", first);
      sessionStorage.setItem("pasted_full_name", fullName.trim().replace(/\s+/g, " "));
    } catch { /* noop */ }
    setTimeout(() => navigate("/welcome"), 320);
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
      @keyframes lib-card-enter {
        0% { opacity: 0; transform: translateY(14px) scale(0.985); filter: blur(2px); }
        100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
      }
      .lib-card-enter {
        animation: lib-card-enter 880ms cubic-bezier(0.22, 1, 0.36, 1) both;
        will-change: opacity, transform, filter;
      }
      @media (prefers-reduced-motion: reduce) {
        .lib-card-enter { animation: none; }
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
          A vault of work,<br />given freely.
        </div>
        <p className="lib-body text-lib-charcoal/70 mt-2 text-xs md:text-sm">
          Claim a Card. Walk the shelves. Take what is useful.
        </p>

        <div className="my-3"><KeyDivider /></div>

        <form onSubmit={handleSubmit} className="space-y-3 text-left">
          {renderField({ id: "full_name", type: "text", label: "NAME", value: fullName, onChange: setFullName, autoComplete: "name" })}
          {renderField({ id: "email", type: "email", label: "EMAIL", value: email, onChange: setEmail, autoComplete: "email" })}

          {/* YOUR CHAPTER — stamp-style selector, no boxes */}
          <div>
            <label style={labelStyle} className="block mb-2.5">YOUR CHAPTER</label>
            <div className="flex items-center justify-between gap-2">
              {(["student", "associate", "principal"] as const).map((stage) => {
                const active = careerStage === stage;
                return (
                  <button
                    key={stage}
                    type="button"
                    disabled={submitting}
                    onClick={() => setCareerStage(stage)}
                    className="relative pb-1 cursor-pointer"
                    style={{
                      fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                      fontSize: "10px",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: active ? "#7A1F1F" : "rgba(10,10,10,0.55)",
                      background: "transparent",
                      border: "none",
                      transition: "color 200ms ease",
                    }}
                  >
                    {stage}
                    <span
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        left: 0,
                        bottom: -2,
                        height: 1,
                        width: "100%",
                        background: "#C9A96E",
                        transformOrigin: "left center",
                        transform: active ? "scaleX(1)" : "scaleX(0)",
                        transition: "transform 240ms cubic-bezier(0.22, 1, 0.36, 1)",
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {renderField({ id: "location", type: "text", label: "CITY", value: location, onChange: setLocation, autoComplete: "address-level2", placeholder: "City, Country" })}

          {error && <p className="lib-mono" style={{ color: "#7A1F1F" }}>{error}</p>}

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
            <span className="relative">CLAIM MY CARD</span>
          </button>
        </form>

        {/* Closing italic line */}
        <p
          className="lib-body italic leading-relaxed text-center"
          style={{ color: "rgba(10,10,10,0.55)", fontSize: "11px", marginTop: 14 }}
        >
          The Card is the threshold. The Library is the first room. There are others.
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
          ONE EMAIL. NO SPAM. UNSUBSCRIBE AT ANY LINE.
        </p>
      </div>
    </div>
    </>
  );
};

export default ClaimGate;
