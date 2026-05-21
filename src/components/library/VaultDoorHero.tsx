import { useEffect, useState } from "react";
import doorImg from "@/assets/vault-iron-door.jpg";

/** Next Friday at noon, in the viewer's local time. Madrid release in spirit. */
function nextFridayNoon(now = new Date()): Date {
  const d = new Date(now);
  const day = d.getDay(); // 0 Sun .. 5 Fri
  let add = (5 - day + 7) % 7;
  d.setHours(12, 0, 0, 0);
  if (add === 0 && now.getTime() >= d.getTime()) add = 7;
  d.setDate(d.getDate() + add);
  return d;
}

function fmt(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const mins = Math.floor((total % 3600) / 60);
  const secs = total % 60;
  return { days, hours, mins, secs };
}

export const VaultDoorHero = () => {
  const [target] = useState(() => nextFridayNoon());
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const { days, hours, mins, secs } = fmt(target.getTime() - now);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: "16 / 7", background: "#1A0608" }}
    >
      <img
        src={doorImg}
        alt="The Vault — an iron-bound arched doorway in the wallpapered wall, brass clock above."
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.92) contrast(1.05)" }}
      />

      {/* warm candle pool reinforced */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 18% 38%, rgba(212,181,122,0.22) 0%, transparent 38%), radial-gradient(ellipse at 50% 60%, rgba(0,0,0,0.45) 0%, transparent 65%)",
        }}
      />

      {/* film grain */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.07,
          mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* candle flicker overlay on left sconce */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          left: "10%",
          top: "32%",
          width: 220,
          height: 220,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(255,196,120,0.45) 0%, rgba(255,170,90,0.18) 35%, transparent 70%)",
          animation: "lib-vault-flicker 180ms infinite alternate",
          filter: "blur(8px)",
        }}
      />

      {/* Title block — lower left, Cormorant italic */}
      <div className="absolute left-6 md:left-10 bottom-14 md:bottom-20 max-w-[28ch]">
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(34px, 5vw, 56px)",
            color: "#F4F1EC",
            lineHeight: 1.0,
            letterSpacing: "-0.01em",
            margin: 0,
            textShadow: "0 2px 22px rgba(0,0,0,0.7)",
          }}
        >
          The Vault.
        </h1>
        <div
          className="mt-3"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: "italic",
            fontSize: 17,
            color: "rgba(244,241,236,0.78)",
            lineHeight: 1.4,
            textShadow: "0 1px 10px rgba(0,0,0,0.7)",
          }}
        >
          What waits.
        </div>
        <div
          className="mt-4 inline-flex items-center gap-3"
          style={{
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: 10,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#C9A96E",
            textShadow: "0 1px 8px rgba(0,0,0,0.7)",
          }}
        >
          <span>The Vault</span>
          <span aria-hidden style={{ color: "rgba(201,169,110,0.5)" }}>·</span>
          <span>Releases Noon Fridays</span>
        </div>
      </div>

      {/* Brass countdown panel — lower right */}
      <div
        className="absolute right-4 md:right-10 bottom-6 md:bottom-10 px-5 py-4 md:px-6 md:py-5"
        style={{
          background: "linear-gradient(180deg, rgba(20,8,10,0.78) 0%, rgba(10,4,6,0.85) 100%)",
          border: "1px solid rgba(201,169,110,0.55)",
          borderRadius: 4,
          boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,181,122,0.25)",
          backdropFilter: "blur(6px)",
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: 9,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(201,169,110,0.7)",
            marginBottom: 8,
          }}
        >
          Next Seal Opens In
        </div>
        <div className="flex items-baseline gap-3 md:gap-4">
          <Unit n={days} label="D" />
          <Sep />
          <Unit n={hours} label="H" />
          <Sep />
          <Unit n={mins} label="M" />
          <Sep />
          <Unit n={secs} label="S" tick />
        </div>
      </div>

      <style>{`
        @keyframes lib-vault-flicker {
          0%   { opacity: 0.88; transform: translate(-50%,-50%) scale(0.98); }
          100% { opacity: 1.0;  transform: translate(-50%,-50%) scale(1.04); }
        }
        @keyframes lib-vault-tick {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.55; }
        }
        .vault-tick { animation: lib-vault-tick 1s steps(2) infinite; }
      `}</style>
    </div>
  );
};

const Unit = ({ n, label, tick }: { n: number; label: string; tick?: boolean }) => (
  <div className={`flex flex-col items-center ${tick ? "vault-tick" : ""}`}>
    <div
      style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontStyle: "italic",
        fontWeight: 500,
        fontSize: "clamp(26px, 3.4vw, 38px)",
        color: "#D4B57A",
        lineHeight: 1,
        letterSpacing: "-0.02em",
        textShadow: "0 1px 0 rgba(0,0,0,0.6), 0 0 14px rgba(212,181,122,0.25)",
      }}
    >
      {String(n).padStart(2, "0")}
    </div>
    <div
      style={{
        fontFamily: "'JetBrains Mono', ui-monospace, monospace",
        fontSize: 8,
        letterSpacing: "0.3em",
        color: "rgba(201,169,110,0.6)",
        marginTop: 4,
      }}
    >
      {label}
    </div>
  </div>
);

const Sep = () => (
  <span
    aria-hidden
    style={{
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: 24,
      color: "rgba(201,169,110,0.4)",
      lineHeight: 1,
      transform: "translateY(-4px)",
    }}
  >
    :
  </span>
);

export default VaultDoorHero;