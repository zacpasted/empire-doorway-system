import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Eagerly warm Calendly for faster first paint on booking embeds
import { primeCalendly } from "./lib/calendly";
primeCalendly();

createRoot(document.getElementById("root")!).render(<App />);
