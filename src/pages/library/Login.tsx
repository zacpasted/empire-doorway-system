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
          <div className="w-[300px] md:w-[440px] relative">
            <div
              className="absolute inset-0"
              style={{
                background: "#F4F1EC",
                clipPath:
                  "path('M 30,60 C 70,42 130,40 176,56 L 176,440 C 130,422 70,420 30,438 Z M 184,56 C 230,40 290,42 330,60 L 330,438 C 290,420 230,422 184,440 Z')",
              }}
            />
            <div className="relative bg-bone px-8 md:px-14 py-12 md:py-16 text-center" style={{ borderRadius: 2 }}>
              <div className="lib-display text-lib-charcoal text-xl md:text-2xl">Welcome back.</div>
              <div className="my-3 w-10 mx-auto" style={{ height: 1, background: "rgba(201,169,110,0.55)" }} />
              <p className="lib-editorial text-lib-charcoal text-base md:text-lg mb-8">
                A sign-in link, sent to your email.
              </p>
              <MagicLinkForm mode="login" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;