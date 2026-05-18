import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClaimGate } from "@/components/library/ClaimGate";
import { useMember } from "@/hooks/useMember";
const lockTransitionAsset = { url: "/__l5e/assets-v1/c986dd84-3893-4ebf-8b3f-a090697f8855/library-lock-transition.mp4" };

const ROTATING_MEMBERS = [
  "MEMBER 0001 — DR DREW BALLARD",
  "MEMBER 0002 — DR JON MARASHI",
  "MEMBER 0003 — DR RHONA ESKANDER",
  "MEMBER 0004 — DR SAM SALEH",
];

const ENTERED_KEY = "pasted_library_entered";

// Beat timings in ms (single source of truth)
const T = {
  beat1: 0,      // darkness holds
  beat2: 800,    // key revealed by light
  beat3: 2600,   // key turns
  beat4: 4000,   // aperture opens
  beat5: 5200,   // wordmark sets
  beat6: 6000,   // card arrives
  end:   6500,
};

type Beat = 1 | 2 | 3 | 4 | 5 | 6;

const Vault = () => {
  const { session, loading } = useMember();
  const navigate = useNavigate();
  const [rotIdx, setRotIdx] = useState(0);
  const [rotVisible, setRotVisible] = useState(true);
  const [introPlaying, setIntroPlaying] = useState(true);

  // Determine reduced motion + returning member up-front (sync) to avoid flicker
  const { initialBeat, reducedMotion, returning } = useMemo(() => {
    if (typeof window === "undefined") return { initialBeat: 1 as Beat, reducedMotion: false, returning: false };
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ret = localStorage.getItem(ENTERED_KEY) === "1";
    if (ret) return { initialBeat: 6 as Beat, reducedMotion: rm, returning: true };
    return { initialBeat: 1 as Beat, reducedMotion: rm, returning: false };
  }, []);

  const [beat, setBeat] = useState<Beat>(initialBeat);
  const [skipVisible, setSkipVisible] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    document.title = "The PASTED Library — A vault of work, given freely";
  }, []);

  useEffect(() => {
    if (!loading && session) navigate("/library", { replace: true });
  }, [loading, session, navigate]);

  // Rotating member ticker
  useEffect(() => {
    const t = setInterval(() => {
      setRotVisible(false);
      setTimeout(() => {
        setRotIdx((i) => (i + 1) % ROTATING_MEMBERS.length);
        setRotVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  // The timeline — one source of truth
  useEffect(() => {
    if (returning) {
      // mark entered already, nothing to do
      return;
    }
    if (introPlaying) {
      // wait for intro video to finish (or be skipped) before running beats
      return;
    }

    const schedule = (delay: number, fn: () => void) => {
      const id = window.setTimeout(fn, delay);
      timers.current.push(id);
    };

    if (reducedMotion) {
      // Dignified short: hold 400ms, then jump to beat 6
      schedule(400, () => setBeat(6));
      schedule(450, () => setSkipVisible(false));
      schedule(500, () => localStorage.setItem(ENTERED_KEY, "1"));
      return () => { timers.current.forEach(clearTimeout); timers.current = []; };
    }

    schedule(500, () => setSkipVisible(true));
    schedule(0,    () => setBeat(2));
    schedule(800,  () => setBeat(3));
    schedule(2600, () => setBeat(4));
    schedule(3800, () => setBeat(5));
    schedule(4600, () => setBeat(6));
    schedule(5100, () => localStorage.setItem(ENTERED_KEY, "1"));

    return () => { timers.current.forEach(clearTimeout); timers.current = []; };
  }, [returning, reducedMotion, introPlaying]);

  const skipToCard = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setIntroPlaying(false);
    setBeat(6);
    localStorage.setItem(ENTERED_KEY, "1");
  };

  const gateOpen = beat >= 6;
  const apertureOpen = beat >= 4;
  const wordmarkLit = beat >= 5;

  return (
    <div className="min-h-screen text-lib-charcoal" style={{ background: "#0A0A0A" }}>
      <style>{`
        @keyframes lib-breath {
          0%,100% { opacity: 0; }
          50%     { opacity: 0.06; }
        }
        @keyframes lib-bloom {
          0%   { opacity: 0; transform: translate(-50%,-50%) scale(0.6); }
          45%  { opacity: 0.14; }
          100% { opacity: 0; transform: translate(-50%,-50%) scale(1.4); }
        }
        @keyframes lib-aperture-dilate {
          0%   { transform: scale(0.05); filter: blur(2px); }
          100% { transform: scale(14);   filter: blur(0); }
        }
        @keyframes lib-foil-sheen {
          0%   { background-position: -150% 0; }
          100% { background-position: 250% 0; }
        }
        @keyframes lib-card-rise {
          0%   { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes lib-fadeout {
          to { opacity: 0; }
        }

        .v-breath {
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(circle at 50% 50%, rgba(201,169,110,0.5) 0%, transparent 35%);
          animation: lib-breath 800ms ease-out forwards;
        }
        .v-bloom {
          position: absolute; top: 50%; left: 50%;
          width: 60vmin; height: 60vmin; border-radius: 50%;
          background: radial-gradient(circle, rgba(201,169,110,0.9) 0%, transparent 60%);
          pointer-events: none;
          animation: lib-bloom 500ms ease-out forwards;
          animation-delay: 1100ms; /* fires at ~3.7s into the sequence (beat3 starts at 2.6s) */
          opacity: 0;
        }
        .v-keyclip {
          position: absolute; inset: 0;
          background-position: center; background-size: cover;
          object-fit: cover; width: 100%; height: 100%;
        }
        .v-keyclip-fade { animation: lib-fadeout 600ms ease-out forwards; animation-delay: 200ms; }

        .v-aperture-stage {
          position: absolute; inset: 0; overflow: hidden;
        }
        .v-aperture-mask {
          position: absolute; top: 50%; left: 50%;
          width: 80px; height: 110px;
          transform-origin: center;
          transform: translate(-50%, -50%) scale(0.05);
          animation: lib-aperture-dilate 1200ms cubic-bezier(0.6, 0, 0.2, 1) forwards;
        }

        .v-wordmark {
          background: linear-gradient(
            90deg,
            #0A0A0A 0%,
            #0A0A0A 40%,
            #E8C87A 48%,
            #FFF1C7 50%,
            #E8C87A 52%,
            #C9A96E 60%,
            #C9A96E 100%
          );
          background-size: 250% 100%;
          background-position: -150% 0;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .v-wordmark.lit {
          animation: lib-foil-sheen 800ms linear forwards;
        }
        .v-wordmark.lit-mono { animation-delay: -150ms; }
        .v-wordmark.settled {
          background: none;
          -webkit-text-fill-color: #C9A96E;
          color: #C9A96E;
        }

        .v-card { animation: lib-card-rise 500ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
      `}</style>

      <section className="fixed inset-0 w-full h-full overflow-hidden" style={{ background: "#0A0A0A" }}>
        {/* Beat 0 — entry intro video (keyhole onto Zac). Plays as load-in. */}
        {!returning && introPlaying && !reducedMotion && (
          <video
            src="/library-gate-intro.mp4"
            autoPlay
            muted
            playsInline
            onEnded={() => { setIntroPlaying(false); setSkipVisible(true); }}
            className="absolute inset-0 w-full h-full"
            style={{ objectFit: "cover", zIndex: 5 }}
          />
        )}

        {/* Background freeze-frame revealed by the aperture (beat 4+) */}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: apertureOpen ? 1 : 0,
            background:
              "radial-gradient(ellipse at center, #1a1410 0%, #0F0D0A 45%, #050403 100%)",
          }}
        >
          <div className="absolute inset-0 lib-grain pointer-events-none" />
        </div>

        {/* Beat 1 — darkness breath */}
        {beat === 1 && !reducedMotion && <div className="v-breath" />}

        {/* Beats 2–3 — key revealed and turning */}
        {(beat === 2 || beat === 3) && !reducedMotion && (
          <>
            <video
              src={lockTransitionAsset.url}
              autoPlay
              muted
              playsInline
              className={`v-keyclip ${beat === 3 ? "v-keyclip-fade" : ""}`}
              style={{ zIndex: 6 }}
            />
            {beat === 3 && <div className="v-bloom" />}
          </>
        )}

        {/* Beat 4 — aperture dilation: a keyhole-shaped reveal of the background */}
        {beat === 4 && !reducedMotion && (
          <div className="v-aperture-stage" style={{ background: "#0A0A0A" }}>
            <svg
              className="v-aperture-mask"
              viewBox="0 0 80 110"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <mask id="khmask">
                  <rect width="100%" height="100%" fill="white" />
                  <path
                    d="M40 12 C 56 12, 64 24, 64 36 C 64 46, 58 52, 50 56 L 56 102 L 24 102 L 30 56 C 22 52, 16 46, 16 36 C 16 24, 24 12, 40 12 Z"
                    fill="black"
                  />
                </mask>
              </defs>
              <rect width="100%" height="100%" fill="#0A0A0A" mask="url(#khmask)" />
            </svg>
          </div>
        )}

        {/* Beats 5–6 — wordmark and card */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-6"
          style={{
            opacity: beat >= 5 ? 1 : 0,
            transition: "opacity 400ms ease-out",
            pointerEvents: gateOpen ? "auto" : "none",
          }}
        >
          {/* Monogram + wordmark */}
          <div className="flex flex-col items-center" style={{ marginBottom: gateOpen ? 36 : 0 }}>
            <div
              className={`v-wordmark lit-mono ${wordmarkLit ? "lit" : ""}`}
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: "22px",
                letterSpacing: "0.04em",
                marginBottom: 14,
              }}
            >
              ⬭ P ⬭
            </div>
            <div
              className={`v-wordmark ${wordmarkLit ? "lit" : ""}`}
              style={{
                fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                fontSize: "13px",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
              }}
            >
              THE PASTED LIBRARY
            </div>
          </div>

          {/* The card */}
          {gateOpen && (
            <div className="v-card flex flex-col items-center mt-8">
              <ClaimGate />
              <div className="mt-6">
                <div
                  className={`lib-mono transition-opacity duration-500 ${rotVisible ? "opacity-100" : "opacity-0"}`}
                  style={{ fontSize: "10px", letterSpacing: "0.22em", color: "rgba(244,241,236,0.5)" }}
                >
                  {ROTATING_MEMBERS[rotIdx]}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Skip control — available during intro and beats, hides once card lands */}
        {(introPlaying || skipVisible) && !gateOpen && (
          <button
            type="button"
            onClick={skipToCard}
            className="absolute bottom-6 right-6"
            style={{
              zIndex: 30,
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: "12px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#C9A96E",
              padding: "8px 12px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            SKIP
          </button>
        )}
      </section>
    </div>
  );
};

export default Vault;
