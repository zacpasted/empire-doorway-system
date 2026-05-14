import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MagicLinkForm } from "@/components/library/MagicLinkForm";
import { useMember } from "@/hooks/useMember";
import heroImg from "@/assets/library-hero.jpg";

const Login = () => {
  const { session, loading } = useMember();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Sign in — The PASTED Library";
  }, []);
  useEffect(() => {
    if (!loading && session) navigate("/library", { replace: true });
  }, [loading, session, navigate]);

  return (
    <div className="min-h-screen bg-bone text-lib-charcoal">
      <section className="relative w-full overflow-hidden" style={{ minHeight: "min(820px, 92vh)" }}>
        <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover" fetchPriority="high" />
        <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 360px 80px rgba(0,0,0,0.75)" }} />
        <div className="absolute inset-0 lib-grain pointer-events-none" />

        <div className="relative max-w-[1240px] mx-auto px-6 py-14 md:py-20 min-h-[inherit] flex items-center justify-center" style={{ minHeight: "min(820px, 92vh)" }}>
          <div className="w-[320px] md:w-[460px] bg-bone px-8 md:px-12 py-12 md:py-16 text-center" style={{ borderRadius: 2, boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
            <div className="lib-display text-lib-charcoal text-xl md:text-2xl">Welcome back.</div>
            <div className="my-3 w-10 mx-auto" style={{ height: 1, background: "rgba(201,169,110,0.55)" }} />
            <p className="lib-editorial text-lib-charcoal text-base md:text-lg mb-8">
              A sign-in link, sent to your email.
            </p>
            <MagicLinkForm mode="login" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;