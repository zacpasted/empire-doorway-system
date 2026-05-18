import { useEffect, useState } from "react";
import envelopeReceived from "@/assets/library-envelope-received.jpg";

const Welcome = () => {
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    document.title = "You are received — The PASTED Library";
    try {
      const n = sessionStorage.getItem("pasted_first_name") || "";
      setFirstName(n);
    } catch { /* noop */ }
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-bone flex items-center justify-center px-6">
      <img
        src={envelopeReceived}
        alt=""
        className="absolute inset-0 w-full h-full object-cover lib-fade-in"
        style={{ opacity: 0.55 }}
      />
      <div className="absolute inset-0" style={{ background: "rgba(10,10,10,0.55)" }} />
      <div className="absolute inset-0 lib-grain pointer-events-none" />

      <div className="relative z-10 text-center max-w-[560px] lib-fade-in">
        <h1
          className="lib-editorial text-bone"
          style={{ fontSize: "clamp(36px, 6vw, 64px)", lineHeight: 1.1 }}
        >
          {firstName ? `${firstName}, you are received.` : "You are received."}
        </h1>
        <div className="mt-10 lib-mono lib-emboss-gold" style={{ letterSpacing: "0.28em", fontSize: "11px" }}>
          YOUR CARD IS ON ITS WAY. CHECK YOUR EMAIL.
        </div>
        <div
          className="mt-3 lib-mono"
          style={{ letterSpacing: "0.22em", fontSize: "10px", color: "rgba(244,241,236,0.5)" }}
        >
          OPEN IT FROM ANY DEVICE — THE LIBRARY WILL RECOGNISE YOU.
        </div>
      </div>
    </div>
  );
};

export default Welcome;
