import { motion } from "framer-motion";
import GrainOverlay from "@/components/GrainOverlay";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import CustomCursor from "@/components/CustomCursor";
import PastedNavigation from "@/components/sections/pasted/PastedNavigation";
import PastedHero from "@/components/sections/pasted/PastedHero";
import PastedPhilosophy from "@/components/sections/pasted/PastedPhilosophy";
import PastedLineup from "@/components/sections/pasted/PastedLineup";
import PastedCraft from "@/components/sections/pasted/PastedCraft";
import PastedVibe from "@/components/sections/pasted/PastedVibe";
import PastedProof from "@/components/sections/pasted/PastedProof";
import PastedDossier from "@/components/sections/pasted/PastedDossier";
import PastedEnquire from "@/components/sections/pasted/PastedEnquire";
import PastedFooter from "@/components/sections/pasted/PastedFooter";

const Index = () => {
  return (
    <motion.div
      className="min-h-screen overflow-x-hidden antialiased"
      style={{ background: "var(--color-bg)", color: "var(--color-text)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <title>PASTED — The Operating Partner Behind the World's Finest Clinics</title>

      <GrainOverlay />
      <ScrollProgressBar />
      <CustomCursor />

      <PastedNavigation />

      <main>
        <PastedHero />
        <PastedPhilosophy />
        <PastedLineup />
        <PastedCraft />
        <PastedVibe />
        <PastedProof />
        <PastedDossier />
        <PastedEnquire />
      </main>

      <PastedFooter />
    </motion.div>
  );
};

export default Index;
