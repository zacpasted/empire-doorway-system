import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClaimGate } from "@/components/library/ClaimGate";
import { useMember } from "@/hooks/useMember";
import lockTransitionAsset from "../../../public/library-lock-transition.mp4.asset.json";

const ROTATING_MEMBERS = [
  "MEMBER 0001 — DR DREW BALLARD",
  "MEMBER 0002 — DR JON MARASHI",
  "MEMBER 0003 — DR RHONA ESKANDER",
  "MEMBER 0004 — DR SAM SALEH",
];

const Vault = () => {
  const { session, loading } = useMember();
  const navigate = useNavigate();
  const [rotIdx, setRotIdx] = useState(0);
  const [rotVisible, setRotVisible] = useState(true);
  const [gateOpen, setGateOpen] = useState(false);
  const [phase, setPhase] = useState<"entry" | "transition" | "gate">("entry");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    document.title = "The PASTED Library — A vault of work, given freely";
  }, []);

  useEffect(() => {
    if (!loading && session) navigate("/library", { replace: true });
  }, [loading, session, navigate]);

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

  const handleEntryEnded = () => setPhase("transition");
  const handleTransitionTime = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget;
    if (v.duration && v.currentTime / v.duration > 0.8 && !gateOpen) {
      setGateOpen(true);
    }
  };
  const handleTransitionEnded = () => {
    setPhase("gate");
    setGateOpen(true);
  };
  const handleSkip = () => {
    setPhase("gate");
    setGateOpen(true);
  };

  return (
    <div className="min-h-screen bg-bone text-lib-charcoal">
      {/* Cinematic intro — full-screen video, transitions to gate on end */}
      <section className="fixed inset-0 w-full h-full overflow-hidden bg-black">
        {phase === "entry" && (
          <video
            ref={videoRef}
            src="/library-gate-intro.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleEntryEnded}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {phase !== "entry" && (
          <video
            src={lockTransitionAsset.url}
            autoPlay
            muted
            playsInline
            onTimeUpdate={handleTransitionTime}
            onEnded={handleTransitionEnded}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${gateOpen ? "opacity-40" : "opacity-100"}`}
          />
        )}
        <div className="absolute inset-0 pointer-events-none" style={{ background: gateOpen ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.15)", transition: "background 1s ease" }} />
        <div className="absolute inset-0 lib-grain pointer-events-none" />

        {!gateOpen && (
          <button
            type="button"
            onClick={handleSkip}
            className="absolute top-6 right-6 lib-mono text-bone/60 hover:text-bone transition-colors z-10"
            style={{ letterSpacing: "0.22em", fontSize: "10px" }}
          >
            SKIP →
          </button>
        )}

        {/* Gate panel — reveals after video ends */}
        <div
          className={`absolute inset-0 flex items-center justify-center px-6 transition-all duration-1000 ${
            gateOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <div className="flex flex-col items-center">
            <ClaimGate />
            <div className="mt-6">
              <div
                className={`lib-mono text-lib-charcoal/45 transition-opacity duration-500 ${rotVisible ? "opacity-100" : "opacity-0"}`}
                style={{ fontSize: "10px", letterSpacing: "0.22em", color: "rgba(244,241,236,0.5)" }}
              >
                {ROTATING_MEMBERS[rotIdx]}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Vault;