import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MagicLinkForm } from "@/components/library/MagicLinkForm";
import { OpenBookFrame } from "@/components/library/OpenBookFrame";
import { useMember } from "@/hooks/useMember";
import heroImg from "@/assets/library-hero.jpg";

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

  return (
    <div className="min-h-screen bg-bone text-lib-charcoal">
      {/* Hero — antique bookshelf scene with open-book die-cut frame */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: "min(820px, 92vh)" }}>
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
        />
        {/* warm vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: "inset 0 0 360px 80px rgba(0,0,0,0.75)" }}
        />
        <div className="absolute inset-0 lib-grain pointer-events-none" />

        <div className="relative max-w-[1240px] mx-auto px-6 py-14 md:py-20 min-h-[inherit] flex items-center justify-center" style={{ minHeight: "min(820px, 92vh)" }}>
          <OpenBookFrame className="w-[260px] md:w-[380px]">
            <div className="lib-display text-lib-charcoal text-xl md:text-2xl leading-tight">
              The PASTED Library
            </div>
            <div className="my-3 w-10 mx-auto" style={{ height: 1, background: "rgba(201,169,110,0.55)" }} />
            <div className="lib-editorial text-lib-charcoal text-lg md:text-2xl">
              A vault of work,<br />given freely.
            </div>
          </OpenBookFrame>
        </div>
      </section>

      {/* Body */}
      <section className="max-w-[720px] mx-auto px-6 py-20 md:py-28 text-center">
        <p className="lib-body text-lib-charcoal/85" style={{ maxWidth: 640, margin: "0 auto" }}>
          Frameworks. Scripts. Decks. Playbooks. The same instruments we use
          inside PASTED, placed on a shelf and made open. Claim a Card. Walk the
          shelves. Take what is useful.
        </p>

        <div className="mt-14">
          <MagicLinkForm mode="claim" />
        </div>

        <div className="mt-20">
          <div
            className={`lib-mono text-lib-charcoal/55 transition-opacity duration-400 ${
              rotVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {ROTATING_MEMBERS[rotIdx]}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Vault;