import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { Monogram } from "@/components/library/Monogram";
import { MagicLinkForm } from "@/components/library/MagicLinkForm";
import { useMember } from "@/hooks/useMember";

const ROTATING_MEMBERS = [
  "MEMBER 0001 — DR DREW BALLARD",
  "MEMBER 0002 — DR JON MARASHI",
  "MEMBER 0003 — DR RHONA ESKANDER",
];

const Vault = () => {
  const { session, loading } = useMember();
  const navigate = useNavigate();
  const [rotIdx, setRotIdx] = useState(0);
  const [rotVisible, setRotVisible] = useState(true);

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
      <Helmet>
        <title>The PASTED Library — A vault of work, given freely</title>
        <meta
          name="description"
          content="Frameworks, scripts, decks, playbooks. The same instruments we use inside PASTED, placed on a shelf and made open. Always free."
        />
      </Helmet>

      {/* Hero */}
      <section className="relative w-full h-[68vh] min-h-[460px] overflow-hidden bg-smoke">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 60%, rgba(201,169,110,0.18) 0%, transparent 55%), linear-gradient(180deg, #1F1A17 0%, #0A0A0A 100%)",
          }}
        />
        {/* keyhole illusion */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,110,0.35) 0%, rgba(122,31,31,0.1) 35%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 lib-grain" />
        <div className="absolute inset-0 max-w-[1240px] mx-auto px-6 md:px-12 flex flex-col justify-between py-8 md:py-12">
          <Link to="/" className="inline-flex">
            <Monogram size={44} variant="gold-on-charcoal" />
          </Link>
          <div className="max-w-xl">
            <h1 className="lib-display text-bone text-5xl md:text-7xl">
              The PASTED Library.
            </h1>
            <p className="lib-editorial text-bone/85 text-2xl md:text-3xl mt-3">
              A vault of work, given freely.
            </p>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="max-w-[720px] mx-auto px-6 py-20 md:py-28 text-center">
        <p className="lib-body text-lib-charcoal/85">
          Frameworks. Scripts. Decks. Playbooks. The same instruments we use
          inside PASTED, placed on a shelf and made open. Claim a Card. Check
          out what is useful. The Library is always free.
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