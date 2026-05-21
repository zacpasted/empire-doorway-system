import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MagicLinkForm } from "@/components/library/MagicLinkForm";
import { useMember } from "@/hooks/useMember";
import heroOperatory from "@/assets/pasted/hero-operatory.jpg";

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
    <div className="min-h-screen pst-surface-charcoal relative overflow-hidden">
      <img
        src={heroOperatory}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.55 }}
        fetchPriority="high"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.78) 0%, rgba(10,10,10,0.55) 40%, rgba(10,10,10,0.95) 100%)",
        }}
      />

      <header className="relative z-10 px-6 md:px-12 h-20 flex items-center justify-between max-w-[1680px] mx-auto">
        <Link to="/" className="pst-display text-[22px] tracking-[0.18em]" style={{ color: "var(--pst-bone)" }}>
          PASTED
        </Link>
        <Link to="/" className="pst-link-mono" style={{ color: "var(--pst-text-dark-muted)" }}>
          ← Back
        </Link>
      </header>

      <section className="relative z-10 px-6 py-16 md:py-24 flex items-center justify-center">
        <div className="w-full max-w-[520px] text-center">
          <div className="pst-mono mb-8" style={{ color: "var(--pst-gold)" }}>
            THE LIBRARY — MEMBERS
          </div>
          <div className="pst-rule-gold w-16 mx-auto mb-10" />

          <h1
            className="pst-display text-[40px] md:text-[60px] leading-[0.95]"
            style={{ color: "var(--pst-bone)" }}
          >
            Welcome
            <span className="pst-script ml-3" style={{ color: "var(--pst-gold)" }}>
              back.
            </span>
          </h1>

          <p className="pst-body mt-6 mb-12" style={{ color: "var(--pst-text-dark-muted)" }}>
            A sign-in link, sent to your email. One line — no password.
          </p>

          <div
            className="px-6 md:px-10 py-10 md:py-12 text-left"
            style={{
              background: "rgba(244,241,236,0.04)",
              border: "1px solid var(--pst-border-dark)",
              backdropFilter: "blur(4px)",
            }}
          >
            <MagicLinkForm mode="login" />
          </div>

          <div className="pst-mono mt-10" style={{ color: "var(--pst-text-dark-muted)" }}>
            No card yet?{" "}
            <Link to="/library" style={{ color: "var(--pst-gold)" }} className="pst-link-mono">
              Claim a card →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;