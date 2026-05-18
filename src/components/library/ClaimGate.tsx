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
  career_stage: z.enum(["student", "associate", "owner"], {
    errorMap: () => ({ message: "Choose a stage" }),
  }),
});

type Phase = "idle" | "pressing" | "out";

const CornerFiligree = ({ rotate = 0 }: { rotate?: number }) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    style={{ transform: `rotate(${rotate}deg)`, opacity: 0.3 }}
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
    {/* Bow (left) */}
    <circle cx="14" cy="9" r="6" fill="none" stroke="#C9A96E" strokeWidth="0.9" />
    <circle cx="14" cy="9" r="2.5" fill="none" stroke="#C9A96E" strokeWidth="0.8" />
    {/* Shaft */}
    <line x1="20" y1="9" x2="150" y2="9" stroke="#C9A96E" strokeWidth="0.9" />
    {/* Decorative collar */}
    <line x1="60" y1="6" x2="60" y2="12" stroke="#C9A96E" strokeWidth="0.8" />
    <line x1="64" y1="6" x2="64" y2="12" stroke="#C9A96E" strokeWidth="0.8" />
    {/* Bit (right) */}
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
    <text
      x="190"
      y="120"
      textAnchor="middle"
      fontFamily="JetBrains Mono, monospace"
      fontSize="11"
      letterSpacing="6"
      fill="#0A0A0A"
    >
      EX LIBRIS
    </text>
    <text
      x="190"
      y="220"
      textAnchor="middle"
      fontFamily="Playfair Display, Georgia, serif"
      fontStyle="italic"
      fontSize="160"
      fill="#0A0A0A"
    >
      P
    </text>
    <text
      x="190"
      y="280"
      textAnchor="middle"
      fontFamily="JetBrains Mono, monospace"
      fontSize="9"
      letterSpacing="5"
      fill="#0A0A0A"
    >
      THE PASTED LIBRARY
    </text>
  </svg>
);

const Monogram56 = () => (
  <svg width="56" height="56" viewBox="0 0 64 64" aria-hidden="true">
    <ellipse cx="32" cy="32" rx="20" ry="28" fill="none" stroke="#C9A96E" strokeWidth="1.2" />
    <text
      x="32"
      y="46"
      textAnchor="middle"
      fontFamily="Playfair Display, Georgia, serif"
      fontStyle="italic"
      fontWeight="500"
      fontSize="40"
      fill="#C9A96E"
    >
      P
    </text>
  </svg>
);

export const ClaimGate = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [careerStage, setCareerStage] = useState<"" | "student" | "associate" | "owner">("");
  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");

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

    // Kick off network + ritual in parallel
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

  return (
    <div
      className={`relative w-[340px] md:w-[460px] lib-paper lib-deboss ${
        phase === "pressing" ? "lib-card-press" : ""
      } ${phase === "out" ? "lib-card-out" : ""}`}
      style={{
        borderRadius: 2,
        boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
        padding: "48px 36px 28px",
      }}
    >
      {/* Inner debossed border outline */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: 20,
          border: "1px solid rgba(10,10,10,0.08)",
          boxShadow: "0 1px 0 rgba(255,255,255,0.4)",
        }}
      />

      {/* Corner filigree */}
      <div className="absolute" style={{ top: 14, left: 14 }}><CornerFiligree rotate={0} /></div>
      <div className="absolute" style={{ top: 14, right: 14 }}><CornerFiligree rotate={90} /></div>
      <div className="absolute" style={{ bottom: 14, right: 14 }}><CornerFiligree rotate={180} /></div>
      <div className="absolute" style={{ bottom: 14, left: 14 }}><CornerFiligree rotate={270} /></div>

      {/* Ex Libris watermark */}
      <ExLibrisWatermark />

      <div className="relative text-center">
        <div className="flex justify-center mb-3"><Monogram56 /></div>
        <div className="lib-mono lib-emboss-gold" style={{ letterSpacing: "0.28em", fontSize: "10px" }}>
          THE PASTED LIBRARY
        </div>
        <div className="mt-3 mx-auto" style={{ width: 40, height: 1, background: "rgba(201,169,110,0.55)" }} />

        <div className="lib-editorial text-lib-charcoal text-2xl md:text-3xl leading-tight mt-6">
          A vault of work,<br />given freely.
        </div>
        <p className="lib-body text-lib-charcoal/70 mt-4 text-sm">
          Claim a Card. Walk the shelves. Take what is useful.
        </p>

        {/* Key divider replaces the hr */}
        <div className="my-6"><KeyDivider /></div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label htmlFor="full_name" className="lib-mono block mb-2 text-charcoal/70">Full name</label>
            <input
              id="full_name"
              type="text"
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={submitting}
              className="w-full bg-transparent border-b border-charcoal/30 px-0 py-2 text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-oxblood transition-colors"
            />
          </div>
          <div>
            <label htmlFor="email" className="lib-mono block mb-2 text-charcoal/70">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitting}
              className="w-full bg-transparent border-b border-charcoal/30 px-0 py-2 text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-oxblood transition-colors"
            />
          </div>
          <div>
            <label className="lib-mono block mb-2 text-charcoal/70">Career stage</label>
            <div className="grid grid-cols-3 gap-2">
              {(["student", "associate", "owner"] as const).map((stage) => {
                const active = careerStage === stage;
                return (
                  <button
                    key={stage}
                    type="button"
                    disabled={submitting}
                    onClick={() => setCareerStage(stage)}
                    className={`lib-mono py-2 px-2 border transition-colors ${
                      active
                        ? "bg-oxblood text-bone border-oxblood"
                        : "bg-transparent text-charcoal/70 border-charcoal/25 hover:border-charcoal/60"
                    }`}
                    style={{ borderRadius: 2, fontSize: "10px", letterSpacing: "0.18em" }}
                  >
                    {stage.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <label htmlFor="location" className="lib-mono block mb-2 text-charcoal/70">Location</label>
            <input
              id="location"
              type="text"
              autoComplete="address-level2"
              placeholder="City, Country"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={submitting}
              className="w-full bg-transparent border-b border-charcoal/30 px-0 py-2 text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-oxblood transition-colors"
            />
          </div>
          {error && <p className="lib-mono text-oxblood">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-oxblood text-bone py-3 px-6 lib-mono hover:bg-charcoal transition-all duration-200 disabled:opacity-90 cursor-pointer"
            style={{
              borderRadius: 2,
              transform: phase === "pressing" ? "translateY(2px)" : undefined,
              filter: phase === "pressing" ? "brightness(0.85)" : undefined,
            }}
          >
            APPLY FOR MY LIBRARY CARD
          </button>

          <p className="lib-body text-charcoal/55 text-center pt-2 italic leading-relaxed" style={{ fontSize: "12px" }}>
            Your card is the threshold to the wider PASTED universe — the library, the society, the rooms beyond it.
          </p>
        </form>

        {/* Wax seal — centerpiece */}
        <div className="relative mt-6 flex justify-center" style={{ height: 72 }}>
          {/* gold glow */}
          {phase !== "idle" && (
            <div
              className="absolute lib-seal-glow pointer-events-none"
              style={{
                width: 140,
                height: 140,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background:
                  "radial-gradient(circle, rgba(201,169,110,0.35) 0%, rgba(201,169,110,0) 60%)",
              }}
            />
          )}
          <img
            src={waxSeal}
            alt=""
            width={64}
            height={64}
            className={phase === "pressing" || phase === "out" ? "lib-seal-press" : ""}
            style={{
              width: 64,
              height: 64,
              objectFit: "contain",
              filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.35))",
              transformOrigin: "center",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ClaimGate;
