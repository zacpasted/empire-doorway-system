import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VelvetPanel } from "@/components/library/VelvetPanel";
import { KeyholeEscutcheon } from "@/components/library/KeyholeEscutcheon";

const Gate = () => {
  const navigate = useNavigate();
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    document.title = "Turn the key — The PASTED Library";
  }, []);

  const enter = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(() => navigate("/library", { replace: true }), 600);
  };

  // Auto-advance after 6s
  useEffect(() => {
    const t = setTimeout(enter, 6000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <VelvetPanel className={`min-h-screen flex items-center justify-center px-6 ${leaving ? "lib-door-fade-out" : ""}`}>
      <div className="text-center">
        <div className="lib-mono lib-emboss-gold mb-6" style={{ letterSpacing: "0.28em" }}>
          THE PASTED LIBRARY
        </div>
        <div className="lib-editorial text-2xl md:text-3xl mb-12" style={{ color: "#C9A96E", opacity: 0.9 }}>
          In which shelves are walked and cases are taken.
        </div>
        <button
          type="button"
          onClick={enter}
          aria-label="Turn the key"
          className="lib-keyhole inline-flex flex-col items-center cursor-pointer outline-none group"
        >
          <KeyholeEscutcheon size={104} />
          <div className="lib-mono lib-emboss-gold mt-8 transition-opacity group-hover:opacity-90" style={{ letterSpacing: "0.32em" }}>
            TURN THE KEY
          </div>
        </button>
      </div>
    </VelvetPanel>
  );
};

export default Gate;