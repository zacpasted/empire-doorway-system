import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClaimGate } from "@/components/library/ClaimGate";
import { useMember } from "@/hooks/useMember";

const ROTATING_MEMBERS = [
  "MEMBER 0001 — DR DREW BALLARD",
  "MEMBER 0002 — DR JON MARASHI",
  "MEMBER 0003 — DR RHONA ESKANDER",
  "MEMBER 0004 — DR SAM SALEH",
];

const ENTERED_KEY = "pasted_library_entered";

/**
 * TIMING — single source of truth for the Vault intro choreography.
 * All values in milliseconds. Tweak here; everything downstream stays in sync.
 *
 * Sequence (clock starts when the intro video ends / is skipped):
 *   0ms     video begins fading out (videoCrossfadeMs)
 *   beat4   aperture unmasks the background
 *   beat5   wordmark sets at the crossfade midpoint
 *   beat6   card begins its fade/slide-in (lines up with wordmark sheen end)
 *   markEntered  persist the "entered" flag in localStorage
 */
const TIMING = {
  // Crossfades
  videoCrossfadeMs: 800,   // <video> opacity transition + skeleton fade
  videoUnmountMs: 900,     // delay before unmounting the <video> after crossfade
  wordmarkSheenMs: 800,    // CSS: .v-wordmark.lit foil-sheen duration (keep in sync)

  // Post-video beat schedule (ms after the video ends/skip)
  beat4: 80,               // aperture opens
  beat5: 420,              // wordmark sets (≈ crossfade midpoint)
  beat6: 1220,             // card lands (= beat5 + wordmarkSheenMs)
  markEntered: 1800,
  skipRevealMs: 500,

  // Reduced-motion shortcut
  reducedJumpMs: 400,
  reducedMarkMs: 500,
} as const;

type Beat = 1 | 2 | 3 | 4 | 5 | 6;

const Vault = () => {
  const { session, loading } = useMember();
  const navigate = useNavigate();
  const [rotIdx, setRotIdx] = useState(0);
  const [rotVisible, setRotVisible] = useState(true);
  const [introPlaying, setIntroPlaying] = useState(true);
  const [videoFading, setVideoFading] = useState(false);

  // Determine reduced motion + returning member up-front (sync) to avoid flicker
  const { initialBeat, reducedMotion, returning } = useMemo(() => {
    if (typeof window === "undefined") return { initialBeat: 1 as Beat, reducedMotion: false, returning: false };
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return { initialBeat: 1 as Beat, reducedMotion: rm, returning: false };
  }, []);

  const [beat, setBeat] = useState<Beat>(initialBeat);
  const [skipVisible, setSkipVisible] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    document.title = "The PASTED Library — A vault of work, given freely";
  }, []);

  // Lightweight preload of the intro video — skip when reduced-motion or already cached.
  useEffect(() => {
    if (reducedMotion) return;
    const href = "/library-gate-intro.mp4";
    if (document.head.querySelector(`link[rel="preload"][href="${href}"]`)) return;
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "video";
    link.href = href;
    link.type = "video/mp4";
    // fetchpriority is honored by Chromium; harmless elsewhere
    (link as HTMLLinkElement & { fetchPriority?: string }).fetchPriority = "high";
    document.head.appendChild(link);
    return () => { try { document.head.removeChild(link); } catch {} };
  }, [reducedMotion]);

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
      // Dignified short: hold briefly, then jump to beat 6
      schedule(TIMING.reducedJumpMs, () => setBeat(6));
      schedule(TIMING.reducedJumpMs + 50, () => setSkipVisible(false));
      schedule(TIMING.reducedMarkMs, () => localStorage.setItem(ENTERED_KEY, "1"));
      return () => { timers.current.forEach(clearTimeout); timers.current = []; };
    }

    schedule(TIMING.skipRevealMs, () => setSkipVisible(true));
    schedule(TIMING.beat4, () => setBeat(4));
    schedule(TIMING.beat5, () => setBeat(5));
    schedule(TIMING.beat6, () => setBeat(6));
    schedule(TIMING.markEntered, () => localStorage.setItem(ENTERED_KEY, "1"));

    return () => { timers.current.forEach(clearTimeout); timers.current = []; };
  }, [returning, reducedMotion, introPlaying]);

  const skipToCard = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setVideoFading(true);
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

        /* Threshold chrome — appears with the card */
        @keyframes lib-rule-draw {
          from { transform: scaleX(0); opacity: 0; }
          to   { transform: scaleX(1); opacity: 1; }
        }
        @keyframes lib-chrome-in {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lib-glow-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .v-rule {
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(201,169,110,0.55) 50%, transparent 100%);
          transform-origin: center;
          animation: lib-rule-draw 900ms cubic-bezier(0.22, 1, 0.36, 1) 200ms both;
        }
        .v-chrome  { animation: lib-chrome-in 700ms cubic-bezier(0.22, 1, 0.36, 1) 250ms both; }
        .v-ambient { animation: lib-glow-in 1200ms ease-out 100ms both; }

        /* Skeleton — anchors the card + VSL footprint so nothing reflows on mount */
        @keyframes lib-skeleton-shimmer {
          0%   { background-position: -120% 0; }
          100% { background-position: 220% 0; }
        }
        .v-skel {
          position: absolute;
          inset: 0;
          border-radius: 2px;
          background:
            linear-gradient(
              100deg,
              rgba(245,239,224,0.04) 0%,
              rgba(245,239,224,0.09) 45%,
              rgba(245,239,224,0.14) 50%,
              rgba(245,239,224,0.09) 55%,
              rgba(245,239,224,0.04) 100%
            ),
            rgba(10,10,10,0.35);
          background-size: 220% 100%, 100% 100%;
          background-position: -120% 0, 0 0;
          animation: lib-skeleton-shimmer 2200ms cubic-bezier(0.4,0,0.2,1) infinite;
          box-shadow: inset 0 0 0 1px rgba(201,169,110,0.06);
          pointer-events: none;
        }
        .v-skel-vsl {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse at center, rgba(245,239,224,0.04) 0%, rgba(0,0,0,0) 55%),
            #0A0A0A;
          pointer-events: none;
        }

        /* Reduced motion: keep the same reserved-space layout, drop all motion.
           Elements still occupy their final positions so nothing shifts. */
        @media (prefers-reduced-motion: reduce) {
          .v-breath,
          .v-bloom,
          .v-keyclip-fade,
          .v-aperture-mask,
          .v-wordmark.lit,
          .v-wordmark.lit-mono,
          .v-card,
          .v-rule,
          .v-chrome,
          .v-ambient,
          .v-skel {
            animation: none !important;
          }
          .v-aperture-mask {
            transform: translate(-50%, -50%) scale(14) !important;
            filter: none !important;
          }
          .v-rule { transform: scaleX(1) !important; opacity: 1 !important; }
          .v-chrome,
          .v-ambient { opacity: 1 !important; transform: none !important; }
          .v-card { opacity: 1 !important; transform: none !important; }
          .v-wordmark.lit,
          .v-wordmark.lit-mono {
            background: none !important;
            -webkit-text-fill-color: #C9A96E !important;
            color: #C9A96E !important;
          }
        }
      `}</style>

      <section className="fixed inset-0 w-full h-full overflow-hidden" style={{ background: "#0A0A0A" }}>
        {/* VSL skeleton — sits behind the intro video so first paint is never empty */}
        {!returning && !reducedMotion && (introPlaying || videoFading) && (
          <div
            className="v-skel-vsl"
            aria-hidden="true"
            style={{
              zIndex: 4,
              opacity: introPlaying ? 1 : 0,
              transition: "opacity 600ms ease-out",
            }}
          />
        )}
        {/* Beat 0 — entry intro video (keyhole onto Zac). Plays as load-in. */}
        {!returning && !reducedMotion && (introPlaying || videoFading) && (
          <video
            src="/library-gate-intro.mp4"
            autoPlay
            muted
            playsInline
            onEnded={() => {
              setVideoFading(true);
              setIntroPlaying(false);
              setSkipVisible(true);
              // unmount after the crossfade completes
              window.setTimeout(() => setVideoFading(false), TIMING.videoUnmountMs);
            }}
            className="absolute inset-0 w-full h-full"
            style={{
              objectFit: "cover",
              zIndex: 5,
              opacity: introPlaying ? 1 : 0,
              transition: `opacity ${TIMING.videoCrossfadeMs}ms cubic-bezier(0.22, 1, 0.36, 1)`,
              pointerEvents: "none",
            }}
          />
        )}

        {/* Background freeze-frame revealed by the aperture (beat 4+) */}
        <div
          className="absolute inset-0"
          style={{
            opacity: apertureOpen ? 1 : 0,
            transition: "opacity 1100ms cubic-bezier(0.22, 1, 0.36, 1)",
            background:
              "radial-gradient(ellipse at center, #8A2424 0%, #7A1F1F 55%, #5A1515 100%)",
          }}
        >
          <div className="absolute inset-0 lib-grain pointer-events-none" />
        </div>

        {/* Ambient candle-glow behind the card — only once the gate opens */}
        {gateOpen && (
          <div
            className="v-ambient absolute pointer-events-none"
            style={{
              top: "50%",
              left: "50%",
              width: "min(900px, 110vw)",
              height: "min(900px, 110vw)",
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle, rgba(201,169,110,0.18) 0%, rgba(201,169,110,0.06) 30%, transparent 65%)",
              filter: "blur(20px)",
              zIndex: 1,
            }}
          />
        )}

        {/* Heavy edge vignette to frame the threshold */}
        {gateOpen && (
          <div
            className="v-ambient absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 100%)",
              zIndex: 1,
            }}
          />
        )}

        {/* Beat 1 — darkness breath */}
        {beat === 1 && !reducedMotion && <div className="v-breath" />}

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
          className="absolute inset-0 flex flex-col items-center justify-center px-6 py-10"
          style={{
            opacity: beat >= 5 ? 1 : 0,
            transition: "opacity 400ms ease-out",
            pointerEvents: gateOpen ? "auto" : "none",
            zIndex: 2,
          }}
        >
          {/* Monogram + wordmark */}
          <div className="flex flex-col items-center" style={{ marginBottom: 28 }}>
            {/* Always reserve the EST. line slot to prevent vertical shift when it appears */}
            <div
              className="v-chrome lib-mono mb-3"
              style={{
                fontSize: "9px",
                letterSpacing: "0.42em",
                color: "rgba(201,169,110,0.55)",
                opacity: gateOpen ? 1 : 0,
                transition: "opacity 500ms ease-out",
                minHeight: "1em",
              }}
            >
              EST. MMXXIV · VOLUME I
            </div>
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
            {/* Stable wordmark row — flanking rules fade in once the gate opens; layout never reflows */}
            <div className="flex items-center gap-4" style={{ width: "min(520px, 86vw)" }}>
              <div
                className="v-rule flex-1"
                style={{
                  opacity: gateOpen ? 1 : 0,
                  transition: "opacity 600ms ease-out",
                }}
              />
              <div
                className={`v-wordmark ${wordmarkLit ? "lit" : ""} whitespace-nowrap`}
                style={{
                  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                  fontSize: "13px",
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                }}
              >
                THE PASTED LIBRARY
              </div>
              <div
                className="v-rule flex-1"
                style={{
                  opacity: gateOpen ? 1 : 0,
                  transition: "opacity 600ms ease-out",
                }}
              />
            </div>
          </div>

          {/* The card — slot is always present so the flex column doesn't recentre when ClaimGate mounts */}
          <div
            className="v-card flex flex-col items-center mt-6 relative"
            style={{
              width: "min(440px, 92vw)",
            }}
            aria-hidden={!gateOpen}
          >
            {/* Skeleton anchor — same footprint as ClaimGate, fades out as the card lands */}
            <div
              className="relative w-full"
              style={{ minHeight: 620 }}
            >
              <div
                aria-hidden="true"
                className="v-skel"
                style={{
                  opacity: gateOpen ? 0 : 0.9,
                  transition: "opacity 700ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
              {gateOpen && (
                <div className="relative flex justify-center">
                  <ClaimGate />
                </div>
              )}
            </div>
            <div className="mt-6" style={{ minHeight: "1em" }}>
              <div
                className={`lib-mono transition-opacity duration-500 ${rotVisible && gateOpen ? "opacity-100" : "opacity-0"}`}
                style={{ fontSize: "10px", letterSpacing: "0.22em", color: "rgba(244,241,236,0.5)" }}
              >
                {ROTATING_MEMBERS[rotIdx]}
              </div>
            </div>
          </div>

          {/* Footer threshold mark */}
          {gateOpen && (
            <div
              className="v-chrome flex items-center gap-4 mt-8"
              style={{ width: "min(520px, 86vw)" }}
            >
              <div className="v-rule flex-1" />
              <div
                className="lib-mono whitespace-nowrap"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.32em",
                  color: "rgba(201,169,110,0.5)",
                }}
              >
                BY INVITATION · NO. 0001 — 0500
              </div>
              <div className="v-rule flex-1" />
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
