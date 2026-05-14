import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Monogram } from "@/components/library/Monogram";
import briefcaseClosed from "@/assets/briefcase-closed.jpg";

const Welcome = () => {
  useEffect(() => { document.title = "Check your email — The PASTED Library"; }, []);
  return (
    <div className="min-h-screen bg-bone text-lib-charcoal flex flex-col">
      <header className="max-w-[1240px] w-full mx-auto px-6 py-6">
        <Link to="/"><Monogram size={36} variant="charcoal-on-bone" /></Link>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="lib-editorial text-5xl md:text-7xl">Check your email.</h1>
        <p className="lib-body mt-6 max-w-md text-lib-charcoal/75">
          A sign-in link is on the way. Open it from any device — the Library will recognise you.
        </p>
        <div className="mt-14 max-w-[360px] w-full relative lib-grain">
          <img src={briefcaseClosed} alt="" loading="lazy" className="w-full h-auto" />
        </div>
      </main>
      <footer className="py-8" />
    </div>
  );
};

export default Welcome;