import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Eagerly start loading Calendly script so embeds render instantly
import { ensureCalendlyScript } from "./lib/calendly";
ensureCalendlyScript().catch(() => {});

createRoot(document.getElementById("root")!).render(<App />);
