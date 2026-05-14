import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Monogram } from "@/components/library/Monogram";
import { MagicLinkForm } from "@/components/library/MagicLinkForm";
import { useMember } from "@/hooks/useMember";

const Login = () => {
  const { session, loading } = useMember();
  const navigate = useNavigate();
  useEffect(() => { document.title = "Sign in — The PASTED Library"; }, []);
  useEffect(() => {
    if (!loading && session) navigate("/library", { replace: true });
  }, [loading, session, navigate]);

  return (
    <div className="min-h-screen bg-bone text-lib-charcoal flex flex-col">
      <header className="max-w-[1240px] w-full mx-auto px-6 py-6">
        <Link to="/"><Monogram size={36} variant="charcoal-on-bone" /></Link>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20">
        <h1 className="lib-editorial text-4xl md:text-6xl mb-4">Welcome back.</h1>
        <p className="lib-body text-lib-charcoal/70 mb-10">A sign-in link, sent to your email.</p>
        <MagicLinkForm mode="login" />
      </main>
    </div>
  );
};

export default Login;