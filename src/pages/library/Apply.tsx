import { useEffect } from "react";
import { ClaimGate } from "@/components/library/ClaimGate";

const Apply = () => {
  useEffect(() => {
    document.title = "Apply for your Library Card — The PASTED Library";
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{
        background:
          "radial-gradient(ellipse at center, #8A2424 0%, #7A1F1F 55%, #5A1515 100%)",
      }}
    >
      <div className="absolute inset-0 lib-grain pointer-events-none" />
      <ClaimGate />
    </div>
  );
};

export default Apply;