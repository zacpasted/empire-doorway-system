import { useCallback, useEffect, useMemo, useRef, useState, ReactNode, CSSProperties } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const STORAGE_KEY = "pasted-brand-asset-workbook";
const LEAD_STORAGE_KEY = "pasted-brand-asset-workbook-lead";

const leadSchema = z.object({
  first_name: z.string().trim().min(1, "First name is required").max(80),
  last_name: z.string().trim().max(80).optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email").max(255),
  practice_name: z.string().trim().max(160).optional().or(z.literal("")),
});

type Lead = {
  first_name: string;
  last_name: string;
  email: string;
  practice_name: string;
};

const emptyLead: Lead = { first_name: "", last_name: "", email: "", practice_name: "" };

const loadLead = (): Lead => {
  try {
    const raw = localStorage.getItem(LEAD_STORAGE_KEY);
    if (!raw) return emptyLead;
    return { ...emptyLead, ...(JSON.parse(raw) as Partial<Lead>) };
  } catch {
    return emptyLead;
  }
};

const saveLead = (l: Lead) => {
  try {
    localStorage.setItem(LEAD_STORAGE_KEY, JSON.stringify(l));
  } catch {
    // ignore
  }
};

// ============================================================
// PASTED Brand Asset Workbook
// Aesthetic: cream-on-ink editorial monograph
// One Hotels · Aston Martin · Soho House grammar
// All design tokens scoped to this page via inline CSS variables
// so the global dark theme of the rest of the site is untouched.
// ============================================================

// ---------- Storage ----------
type Values = Record<string, string>;

const loadValues = (): Values => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Values;
  } catch {
    return {};
  }
};

const saveValues = (v: Values) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(v));
  } catch {
    // ignore
  }
};

// ---------- Token CSS (scoped via .workbook-root) ----------
const WORKBOOK_CSS = `
.workbook-root {
  --canvas:        #F4F1EA;
  --canvas-deep:   #EBE6DB;
  --ink:           #1A1A1A;
  --ink-soft:      #2E2E2E;
  --ink-muted:     #6B6661;
  --ink-dim:       #9A9590;
  --rule:          #D4CEC2;
  --rule-soft:     #E2DCD0;
  --accent:        #7A6F4F;
  --accent-deep:   #5E5638;
  --accent-ghost:  rgba(122, 111, 79, 0.08);
  --accent-line:   rgba(122, 111, 79, 0.24);
  --ink-ghost:     rgba(26, 26, 26, 0.04);

  background-color: var(--canvas);
  color: var(--ink-soft);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 300;
  font-size: 16px;
  line-height: 1.8;
  letter-spacing: 0;
  scroll-behavior: smooth;
  min-height: 100vh;
  position: relative;
}

/* Paper grain — subtle SVG noise overlay at ~4% opacity, multiply blend */
.workbook-root::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  opacity: 0.04;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch' seed='7'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1.2 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
  background-size: 240px 240px;
}

/* Print: remove grain for ink efficiency */
@media print {
  .workbook-root::before { display: none !important; }
}

.workbook-root *::selection {
  background: var(--accent);
  color: var(--canvas);
}

.workbook-root .serif {
  font-family: 'Cormorant Garamond', 'Times New Roman', serif;
}

.workbook-root h1, .workbook-root h2, .workbook-root h3 {
  font-family: 'Cormorant Garamond', 'Times New Roman', serif;
  font-weight: 300;
  color: var(--ink);
  margin: 0;
}

.workbook-root h1 em, .workbook-root h2 em, .workbook-root h3 em {
  color: var(--accent);
  font-style: italic;
  font-weight: 300;
}

.workbook-root .meta-label {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 10px;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--ink-muted);
}

.workbook-root .meta-label-brass {
  color: var(--accent);
}

.workbook-root .mini-label {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 9px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--ink-dim);
  margin-bottom: 6px;
}

.workbook-root a:focus-visible,
.workbook-root button:focus-visible,
.workbook-root input:focus-visible,
.workbook-root textarea:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* Workbook input field */
.workbook-root .wb-input {
  background: var(--canvas);
  border: 1px solid var(--rule);
  border-radius: 2px;
  padding: 16px;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: 16px;
  line-height: 1.6;
  color: var(--ink);
  width: 100%;
  outline: none;
  transition: border-color 200ms ease, background-color 200ms ease;
}
.workbook-root .wb-input:focus {
  border-color: var(--accent);
}
.workbook-root .wb-input::placeholder {
  color: var(--ink-dim);
  font-style: italic;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .workbook-root, .workbook-root * {
    transition: none !important;
    animation: none !important;
    scroll-behavior: auto !important;
  }
  .workbook-progress {
    transition: none !important;
  }
}

/* Print */
@media print {
  .workbook-root { background: #fff !important; }
  .workbook-print-hide { display: none !important; }
  .workbook-root section { page-break-inside: avoid; }
  .workbook-root .wb-card { page-break-inside: avoid; }
  .workbook-root { font-size: 14px; }
}
`;

// ---------- Reusable atoms ----------
const Rule = () => (
  <div className="workbook-root-rule mx-auto" style={{ width: 48, height: 1, background: "var(--rule)", margin: "80px auto" }} />
);

const Section = ({ num, label, children }: { num: string; label: string; children: ReactNode }) => (
  <section className="mx-auto w-full" style={{ maxWidth: 960, padding: "120px 56px" }}>
    <div className="mb-6 flex flex-wrap items-center gap-x-3" style={{ rowGap: 4 }}>
      <span className="meta-label meta-label-brass">{num}</span>
      <span className="meta-label" style={{ color: "var(--ink-dim)" }}>·</span>
      <span className="meta-label">{label}</span>
    </div>
    {children}
  </section>
);

const SubLabel = ({ children, brass = false }: { children: ReactNode; brass?: boolean }) => (
  <div className="mt-12" style={{ marginBottom: 12 }}>
    <div className={`meta-label ${brass ? "meta-label-brass" : ""}`}>{children}</div>
    <div style={{ width: 16, height: 1, background: "var(--accent)", marginTop: 8 }} />
  </div>
);

const Lead = ({ children }: { children: ReactNode }) => (
  <p
    className="serif"
    style={{ maxWidth: 680, fontSize: 22, lineHeight: 1.55, color: "var(--ink)", fontWeight: 300, marginTop: 0 }}
  >
    {children}
  </p>
);

const Body = ({ children }: { children: ReactNode }) => (
  <p style={{ maxWidth: 680, fontSize: 16, lineHeight: 1.8, color: "var(--ink-soft)", fontWeight: 300, margin: 0 }}>
    {children}
  </p>
);

const MutedBody = ({ children, italic = false }: { children: ReactNode; italic?: boolean }) => (
  <p
    style={{
      maxWidth: 680,
      fontSize: 14,
      lineHeight: 1.7,
      color: "var(--ink-muted)",
      fontWeight: 300,
      fontStyle: italic ? "italic" : "normal",
      margin: 0,
    }}
  >
    {children}
  </p>
);

const H2 = ({ children }: { children: ReactNode }) => (
  <h2
    style={{
      maxWidth: 820,
      fontSize: "clamp(36px, 5vw, 56px)",
      lineHeight: 1.05,
      letterSpacing: "-0.015em",
      marginTop: 24,
      marginBottom: 64,
    }}
  >
    {children}
  </h2>
);

const H3 = ({ children }: { children: ReactNode }) => (
  <h3 style={{ fontSize: 26, lineHeight: 1.25, fontWeight: 400, marginTop: 56, marginBottom: 20, color: "var(--ink)" }}>
    {children}
  </h3>
);

const PullQuote = ({ children, cite }: { children: ReactNode; cite: string }) => (
  <blockquote
    style={{
      borderLeft: "1px solid var(--accent)",
      paddingLeft: 32,
      margin: "64px 0",
      maxWidth: 640,
    }}
  >
    <p
      className="serif"
      style={{ fontSize: 30, lineHeight: 1.3, fontStyle: "italic", color: "var(--ink)", fontWeight: 400, margin: 0 }}
    >
      {children}
    </p>
    <cite
      className="meta-label"
      style={{ display: "block", marginTop: 16, fontStyle: "normal" }}
    >
      — {cite}
    </cite>
  </blockquote>
);

const Callout = ({ label, children }: { label: string; children: ReactNode }) => (
  <div
    style={{
      background: "var(--accent-ghost)",
      border: "1px solid var(--accent-line)",
      borderRadius: 2,
      padding: "28px 32px",
      maxWidth: 680,
      margin: "32px 0",
    }}
  >
    <div className="meta-label meta-label-brass" style={{ marginBottom: 12 }}>
      {label}
    </div>
    <div style={{ fontSize: 15, lineHeight: 1.75, color: "var(--ink)", fontWeight: 300 }}>{children}</div>
  </div>
);

const FrameworkRow = ({
  label,
  title,
  children,
  last = false,
}: {
  label: string;
  title: string;
  children: ReactNode;
  last?: boolean;
}) => (
  <div
    className="grid"
    style={{
      gridTemplateColumns: "minmax(0, 1fr)",
      gap: 16,
      padding: "24px 0",
      borderBottom: last ? "none" : "1px solid var(--rule-soft)",
    }}
  >
    <div className="md:!grid md:!gap-10" style={frameworkGridDesktop()}>
      <div
        className="serif"
        style={{ fontSize: 18, fontStyle: "italic", color: "var(--accent)", fontWeight: 300, alignSelf: "baseline" }}
      >
        {label}
      </div>
      <div>
        <div className="serif" style={{ fontSize: 20, color: "var(--ink)", fontWeight: 400, marginBottom: 6 }}>
          {title}
        </div>
        <div style={{ fontSize: 16, lineHeight: 1.7, color: "var(--ink-muted)", fontWeight: 300 }}>{children}</div>
      </div>
    </div>
  </div>
);

// helper for FrameworkRow desktop layout (avoids inline media query limitations)
function frameworkGridDesktop(): CSSProperties {
  return {
    display: "grid",
    gridTemplateColumns: "140px 1fr",
    gap: 40,
  };
}

const PillarCard = ({ label, body }: { label: string; body: string }) => (
  <div style={{ background: "var(--canvas)", padding: 32 }}>
    <div className="mini-label meta-label-brass" style={{ color: "var(--accent)" }}>
      {label}
    </div>
    <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ink-muted)", fontWeight: 300, margin: 0 }}>{body}</p>
  </div>
);

const PillarGrid = ({ cols, children }: { cols: 2 | 3; children: ReactNode }) => (
  <div
    className={cols === 3 ? "wb-grid wb-grid-3" : "wb-grid wb-grid-2"}
    style={{
      maxWidth: 960,
      margin: "32px 0",
      border: "1px solid var(--rule)",
      borderRadius: 2,
      background: "var(--rule)",
      gap: 1,
      display: "grid",
    }}
  >
    {children}
  </div>
);

const Row = ({ time, action }: { time: string; action: ReactNode }) => (
  <div
    className="wb-row"
    style={{
      display: "grid",
      gridTemplateColumns: "minmax(0, 1fr)",
      gap: 8,
      padding: "20px 0",
      borderBottom: "1px solid var(--rule-soft)",
    }}
  >
    <div style={{ display: "grid", gap: 32 }} className="md:!grid-cols-[160px_1fr]">
      <div className="meta-label">{time}</div>
      <div style={{ fontSize: 15, lineHeight: 1.75, color: "var(--ink-soft)", fontWeight: 300 }}>{action}</div>
    </div>
  </div>
);

const DefinitionBlock = ({ children }: { children: ReactNode }) => (
  <div style={{ margin: "96px auto", maxWidth: 680, display: "flex", justifyContent: "center" }}>
    <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>{children}</div>
  </div>
);

const DefLine = ({ children }: { children: ReactNode }) => (
  <div className="serif" style={{ fontSize: 28, lineHeight: 1.2, color: "var(--ink)", fontWeight: 400 }}>
    {children}
  </div>
);

const OutcomeStrip = ({ items }: { items: { label: string; body: string }[] }) => (
  <div
    className="wb-outcome"
    style={{
      marginTop: 80,
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: 32,
      borderTop: "1px solid var(--rule)",
      borderBottom: "1px solid var(--rule)",
      padding: "32px 0",
    }}
  >
    {items.map((it, i) => (
      <div key={i} style={{ padding: "0 16px" }}>
        <div className="meta-label" style={{ marginBottom: 10 }}>
          {it.label}
        </div>
        <div className="serif" style={{ fontSize: 17, lineHeight: 1.35, color: "var(--ink)", fontWeight: 400 }}>
          {it.body}
        </div>
      </div>
    ))}
  </div>
);

// ---------- Workbook input ----------
type WorkbookBlockProps = {
  num: string;
  question: string;
  hint?: string;
  dataKey: string;
  value: string;
  onChange: (k: string, v: string) => void;
  placeholder?: string;
  minHeight?: number;
  inputType?: "textarea" | "input";
  accent?: boolean;
};

const WorkbookBlock = ({
  num,
  question,
  hint,
  dataKey,
  value,
  onChange,
  placeholder,
  minHeight = 110,
  inputType = "textarea",
  accent = false,
}: WorkbookBlockProps) => {
  const inputId = `wb-${dataKey}`;
  return (
    <div
      className="wb-card"
      style={{
        background: "var(--canvas-deep)",
        borderRadius: 2,
        padding: 32,
        margin: "24px 0",
        maxWidth: 680,
        borderTop: accent ? "2px solid var(--accent)" : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 16 }}>
        <span
          className="serif"
          style={{
            fontSize: 22,
            fontStyle: "italic",
            color: "var(--accent)",
            fontWeight: 300,
            minWidth: 36,
          }}
        >
          {num}
        </span>
        <label
          htmlFor={inputId}
          className="serif"
          style={{ fontSize: 20, lineHeight: 1.35, color: "var(--ink)", fontWeight: 400, flex: 1 }}
        >
          {question}
        </label>
      </div>
      {hint && (
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.55,
            color: "var(--ink-muted)",
            fontWeight: 300,
            fontStyle: "italic",
            marginTop: 10,
            marginBottom: 16,
            marginLeft: 48,
          }}
        >
          {hint}
        </p>
      )}
      <div style={{ marginLeft: 0 }}>
        {inputType === "textarea" ? (
          <textarea
            id={inputId}
            value={value}
            onChange={(e) => onChange(dataKey, e.target.value)}
            placeholder={placeholder}
            style={{ minHeight, resize: "vertical" }}
            className="wb-input"
          />
        ) : (
          <input
            id={inputId}
            type="text"
            value={value}
            onChange={(e) => onChange(dataKey, e.target.value)}
            placeholder={placeholder}
            className="wb-input"
          />
        )}
      </div>
    </div>
  );
};

const NumberedStack = ({
  label,
  count,
  keyPrefix,
  values,
  onChange,
  placeholders,
}: {
  label: string;
  count: number;
  keyPrefix: string;
  values: Values;
  onChange: (k: string, v: string) => void;
  placeholders?: string[];
}) => (
  <div style={{ maxWidth: 680, margin: "16px 0 24px" }}>
    <div style={{ marginBottom: 16 }}>
      <div className="meta-label">{label}</div>
      <div style={{ width: 16, height: 1, background: "var(--accent)", marginTop: 8 }} />
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {Array.from({ length: count }).map((_, i) => {
        const k = `${keyPrefix}_${i + 1}`;
        const ph = placeholders?.[i] ?? `Item ${i + 1}`;
        return (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              className="serif"
              style={{
                width: 32,
                fontSize: 18,
                fontStyle: "italic",
                color: "var(--accent)",
                fontWeight: 300,
                textAlign: "center",
              }}
            >
              {i + 1}.
            </span>
            <input
              type="text"
              value={values[k] || ""}
              onChange={(e) => onChange(k, e.target.value)}
              placeholder={ph}
              className="wb-input"
              style={{ padding: 12 }}
            />
          </div>
        );
      })}
    </div>
  </div>
);

// ---------- Field manifest (export ordering) ----------
type FieldDef = { key: string; label: string };
const FIELD_MANIFEST: FieldDef[] = [
  { key: "love_1", label: "Ikigai · What part of dentistry makes you lose track of time?" },
  { key: "love_2", label: "Ikigai · If you could only perform three procedures, which would you choose?" },
  { key: "love_3", label: "Ikigai · What do you refuse to do — even though it would make money?" },
  { key: "skill_1", label: "Ikigai · What does your best work make possible?" },
  { key: "skill_2", label: "Ikigai · What's your unique mechanism?" },
  { key: "skill_3", label: "Ikigai · Best compliment a patient has given you?" },
  { key: "need_1", label: "Ikigai · The patient you wish you had more of" },
  { key: "need_2", label: "Ikigai · What that patient doesn't know about their problem" },
  { key: "need_3", label: "Ikigai · What the market misunderstands about cases like yours" },
  { key: "premium_1", label: "Ikigai · Full-price version of your signature offer" },
  { key: "premium_2", label: "Ikigai · The case result you want to be famous for" },
  { key: "premium_3", label: "Ikigai · Where is your authority leaking?" },
  { key: "niche_synthesis", label: "Foundation · One-sentence positioning" },
  { key: "vision", label: "Compass · Ten-year vision" },
  { key: "mission", label: "Compass · Mission beyond dentistry" },
  { key: "value_1", label: "Practice Value 1" },
  { key: "value_2", label: "Practice Value 2" },
  { key: "value_3", label: "Practice Value 3" },
  { key: "value_4", label: "Practice Value 4" },
  { key: "value_5", label: "Practice Value 5" },
  { key: "callouts", label: "Positioning · Three descriptive call-outs for your 3%" },
  { key: "ms_patient", label: "Marketing System · Ideal Patient" },
  { key: "ms_differentiators", label: "Marketing System · Three Differentiators" },
  { key: "ms_experience", label: "Marketing System · Signature Experience" },
  { key: "ms_promise", label: "Marketing System · The Promise" },
  { key: "pov_statement", label: "POV · We believe ___" },
  { key: "story", label: "POV · Signature story (Origin / Continuity / Mechanism / Promise)" },
  { key: "experience_gap", label: "Experience · Where the brand currently collapses" },
  { key: "quadrants", label: "Signal · One idea per quadrant" },
  { key: "journey_map", label: "System · Patient journey map + weakest link" },
  { key: "weakest_part", label: "System · Which of the five parts is weakest?" },
  { key: "test_1", label: "Three-Question Test · Who are we for?" },
  { key: "test_2", label: "Three-Question Test · What do we believe?" },
  { key: "test_3", label: "Three-Question Test · Experience to be known for?" },
  { key: "reflect_well", label: "Board Meeting · What went well?" },
  { key: "reflect_didnt", label: "Board Meeting · What didn't go well?" },
  { key: "reflect_next", label: "Board Meeting · One move for next week" },
  { key: "board_meeting", label: "Board Meeting · When will you run this weekly?" },
  { key: "goal_10y_1", label: "Ten-Year Goal 1" },
  { key: "goal_10y_2", label: "Ten-Year Goal 2" },
  { key: "goal_10y_3", label: "Ten-Year Goal 3" },
  { key: "goal_3y_1", label: "Three-Year Goal 1" },
  { key: "goal_3y_2", label: "Three-Year Goal 2" },
  { key: "goal_3y_3", label: "Three-Year Goal 3" },
  { key: "goal_1y_1", label: "One-Year Goal 1" },
  { key: "goal_1y_2", label: "One-Year Goal 2" },
  { key: "goal_1y_3", label: "One-Year Goal 3" },
  { key: "goal_90d_1", label: "Ninety-Day Goal 1" },
  { key: "goal_90d_2", label: "Ninety-Day Goal 2" },
  { key: "goal_90d_3", label: "Ninety-Day Goal 3" },
];

// Responsive helper styles injected once
const RESPONSIVE_CSS = `
@media (min-width: 768px) {
  .workbook-root .wb-grid-2 { grid-template-columns: 1fr 1fr !important; }
  .workbook-root .wb-grid-3 { grid-template-columns: 1fr 1fr 1fr !important; }
  .workbook-root .wb-outcome { grid-template-columns: repeat(4, 1fr) !important; gap: 0 !important; }
  .workbook-root .wb-outcome > div + div { border-left: 1px solid var(--rule); }
  .workbook-root .wb-row > div { grid-template-columns: 160px 1fr !important; }
  .workbook-root section { padding: 120px 56px !important; }
  .workbook-root .wb-cover { padding: 160px 56px 80px !important; }
}
@media (max-width: 767px) {
  .workbook-root section { padding: 80px 24px !important; }
  .workbook-root .wb-cover { padding: 120px 24px 80px !important; }
  .workbook-root .wb-grid-2, .workbook-root .wb-grid-3 { grid-template-columns: 1fr !important; }
  .workbook-root h2 { font-size: 36px !important; }
  .workbook-root h1 { font-size: 56px !important; }
  .workbook-root .wb-card { padding: 24px !important; }
  .workbook-root .topbar-subtitle { display: none !important; }
  .workbook-root .topbar-divider { display: none !important; }
  .workbook-root .topbar-save-text { display: none !important; }
}
`;

// ---------- Page ----------
const BrandAssetWorkbook = () => {
  const [values, setValues] = useState<Values>({});
  const [saveState, setSaveState] = useState<"saved" | "saving" | "reset">("saved");
  const [scrollPct, setScrollPct] = useState(0);
  const debounceRef = useRef<number | null>(null);

  // Load Google Fonts (idempotent)
  useEffect(() => {
    const id = "workbook-fonts";
    if (!document.getElementById(id)) {
      const l = document.createElement("link");
      l.id = id;
      l.rel = "stylesheet";
      l.href =
        "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap";
      document.head.appendChild(l);
    }
  }, []);

  // Restore + meta
  useEffect(() => {
    setValues(loadValues());
    document.title = "The PASTED Brand Asset Workbook";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "A five-part field guide for aesthetic dental practice owners — build a brand that pulls.");
  }, []);

  // Scroll progress
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleChange = useCallback((key: string, val: string) => {
    setValues((prev) => {
      const next = { ...prev, [key]: val };
      setSaveState("saving");
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      debounceRef.current = window.setTimeout(() => {
        saveValues(next);
        setSaveState("saved");
      }, 400);
      return next;
    });
  }, []);

  const handleReset = () => {
    if (!window.confirm("Clear all answers? This cannot be undone.")) return;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setValues({});
    setSaveState("reset");
    window.setTimeout(() => setSaveState("saved"), 800);
  };

  const handleExport = () => {
    const lines: string[] = [];
    lines.push("THE PASTED BRAND ASSET WORKBOOK");
    lines.push(`Exported: ${new Date().toLocaleString()}`);
    lines.push("");
    lines.push("");
    FIELD_MANIFEST.forEach(({ key, label }) => {
      const v = values[key];
      lines.push("----------------------------------------");
      lines.push(label);
      lines.push("----------------------------------------");
      lines.push(v && v.trim() ? v : "[blank]");
      lines.push("");
      lines.push("");
    });
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pasted-brand-asset-workbook.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const v = useMemo(() => values, [values]);
  const wb = (props: Omit<WorkbookBlockProps, "value" | "onChange">) => (
    <WorkbookBlock {...props} value={v[props.dataKey] || ""} onChange={handleChange} />
  );

  const dotColor =
    saveState === "saving" ? "var(--accent)" : saveState === "reset" ? "var(--ink-dim)" : "var(--accent)";

  return (
    <div className="workbook-root">
      <style>{WORKBOOK_CSS}</style>
      <style>{RESPONSIVE_CSS}</style>

      {/* Top bar */}
      <header
        className="workbook-print-hide"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: "rgba(244, 241, 234, 0.94)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div
          className="mx-auto"
          style={{
            maxWidth: 960,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, minWidth: 0 }}>
            <div
              className="serif"
              style={{ fontSize: 20, fontWeight: 500, letterSpacing: "0.08em", color: "var(--ink)", lineHeight: 1, whiteSpace: "nowrap" }}
            >
              PASTED
            </div>
            <div className="topbar-divider" style={{ width: 1, height: 18, background: "var(--rule)" }} />
            <div className="meta-label topbar-subtitle" style={{ letterSpacing: "0.28em", whiteSpace: "nowrap" }}>
              Brand Asset Workbook
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div className="meta-label" style={{ display: "flex", alignItems: "center", gap: 8, letterSpacing: "0.2em" }}>
              <span
                style={{
                  display: "inline-block",
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: dotColor,
                  transition: "background 150ms ease",
                }}
              />
              <span className="topbar-save-text" style={{ whiteSpace: "nowrap" }}>{saveState === "saving" ? "Saving…" : saveState === "reset" ? "Reset" : "Saved"}</span>
            </div>
            <button
              onClick={handleReset}
              style={{
                background: "transparent",
                border: "1px solid var(--ink-muted)",
                borderRadius: 2,
                padding: "8px 14px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: 10,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--ink-muted)",
                cursor: "pointer",
                transition: "border-color 200ms ease, color 200ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--ink-muted)";
                e.currentTarget.style.color = "var(--ink-muted)";
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </header>

      {/* Scroll progress */}
      <div
        className="workbook-print-hide"
        style={{ position: "fixed", left: 0, right: 0, top: 0, height: 1, zIndex: 50, background: "transparent" }}
      >
        <div
          className="workbook-progress"
          style={{
            height: "100%",
            background: "var(--accent)",
            width: `${scrollPct}%`,
            transition: "width 100ms ease",
          }}
        />
      </div>

      {/* COVER */}
      <div
        className="wb-cover mx-auto"
        style={{
          maxWidth: 960,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <div style={{ width: 24, height: 1, background: "var(--accent)" }} />
            <div className="meta-label meta-label-brass">A PASTED FIELD GUIDE</div>
          </div>
          <h1
            className="serif"
            style={{
              fontSize: "clamp(56px, 9vw, 96px)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              fontWeight: 300,
              color: "var(--ink)",
              maxWidth: 880,
              marginTop: 0,
            }}
          >
            The <em>Brand Asset</em> Workbook.
          </h1>
          <p
            className="serif"
            style={{
              marginTop: 80,
              maxWidth: 520,
              fontSize: 22,
              fontStyle: "italic",
              fontWeight: 300,
              lineHeight: 1.4,
              color: "var(--ink-muted)",
            }}
          >
            The five-part framework behind hundreds of millions in aesthetic demand — built to help you figure out what brand actually is, what yours is, what is missing, and how to create real pull.
          </p>
          <OutcomeStrip
            items={[
              { label: "WHAT", body: "What a brand actually is — and what it isn't" },
              { label: "WHERE", body: "What yours is, stated in one sentence" },
              { label: "GAP", body: "What's missing between what you promise and what patients feel" },
              { label: "PULL", body: "How to build the kind of demand that compounds without more spend" },
            ]}
          />
        </div>
        <div className="meta-label" style={{ marginTop: 80, textAlign: "center" }}>
          FORMAT · WORKBOOK + FIELD GUIDE &nbsp;·&nbsp; TIME · 90 MINUTES &nbsp;·&nbsp; PASTED · 2026
        </div>
      </div>

      <Rule />

      {/* PRELUDE */}
      <Section num="PRELUDE" label="Read This First">
        <H2>
          This is not a marketing guide. This is the <em>PASTED Bible.</em>
        </H2>
        <Lead>
          What follows is the same architecture we use behind every practice that has built a real asset with us. Not theory. Not trends. The operating system for turning a clinical business into something the market recognizes, remembers, and chooses without negotiation.
        </Lead>
        <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 24 }}>
          <Body>
            Most dentists live inside a sentence that sounds like this. <em>If we get more reviews. If the economy turns. If the new ads work. If patients see the renovation. If the referrals come back.</em>
          </Body>
          <Body>
            The practices we admire live inside a different sentence. <em>When the next campaign ships. When the content lands. When the consult converts. When the brand compounds.</em>
          </Body>
          <Body>The difference between those two sentences is not luck. It is not talent. It is not even spend.</Body>
          <Body>It is architecture.</Body>
        </div>

        <PullQuote cite="PASTED House Doctrine">
          “The iconic practice turns every <em>if</em> into a <em>when.</em>”
        </PullQuote>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <Body>There is a reason this matters more than it ever has.</Body>
          <Body>
            Dentistry is commoditizing in real time. Chains are scaling. Corporates are buying roll-ups. Private equity is indexing quality and flattening price. Patients are comparing your work to a stranger's in the same scroll, at the same traffic light, in the same two seconds.
          </Body>
          <Body>In that market, a good dentist with a nice website is not a brand. It is a line item in somebody else's spreadsheet.</Body>
          <Body>
            The only dentists who will get to decide their own terms — their own prices, their own patients, their own pace — are the ones who build something that cannot be indexed, cannot be copied, and cannot be replaced by the next practice that opens twelve minutes away.
          </Body>
        </div>

        <H3>This is how you decommoditize yourself.</H3>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <Body>
            Not through a prettier logo. Not through a nicer chair. Not through a shinier renovation that a competitor can match with a bigger check next quarter.
          </Body>
          <Body>
            You decommoditize yourself by building a brand asset — a living, compounding, unmistakable expression of who you are, who you are for, and what you refuse to be.
          </Body>
          <Body>An asset that earns pull instead of chasing attention.</Body>
          <Body>An asset that raises your price while lowering your cost-per-acquisition.</Body>
          <Body>
            An asset that shows up for you in rooms you will never sit in, in conversations you will never hear, in decisions made long before a patient ever fills out your form.
          </Body>
        </div>

        <PullQuote cite="The PASTED Long View">
          “A brand asset is the only thing in your practice that works for you when you are asleep, on holiday, or operating on somebody else.”
        </PullQuote>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <Body>This workbook is the map.</Body>
          <Body>
            Five parts. One foundation. Ninety minutes of honest answers. The same architecture behind eight-figure practices, behind cases that close at six figures without flinching, behind the dentists whose names get whispered in the rooms that matter.
          </Body>
          <Body>
            We are not going to flatter you. We are not going to sell you anything on these pages. We are going to walk you through the exact sequence we use with clients who pay us to help them see it — and then we are going to hand you the same tools, because the work you do here is work no agency can do for you.
          </Body>
        </div>

        <H3>A note on how to read this.</H3>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <Body>
            Read it once, fast, without writing anything. Let the argument land. Let the resistance surface. Notice where you nod. Notice where you bristle. The parts that bristle are the parts doing the most work.
          </Body>
          <Body>
            Then come back to the start and answer everything. Out of order is fine. Imperfect is fine. Changing your mind is expected. The workbook saves as you go. There is no version of this that is finished on a first pass.
          </Body>
          <Body>
            Some of what you write will be uncomfortable. Some of it will feel obvious the second you see it on the page. Both are signs you are doing it correctly.
          </Body>
        </div>

        <div style={{ marginTop: 40 }}>
          <MutedBody italic>
            Turn the page. The if-practice stops here. The when-practice begins on the other side.
          </MutedBody>
        </div>
      </Section>

      <Rule />

      {/* 00 PREMISE */}
      <Section num="00" label="The Premise">
        <H2>
          Your new office is not your <em>brand.</em>
        </H2>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <Body>And dentistry is full of people selling “brand” who cannot define it without pointing to furniture, TVs, equipment, a logo, or a renovation package.</Body>
          <Body>That should concern you.</Body>
          <Body>
            Because some of the highest-performing practices we know — including offices doing eight figures under one roof — are not the fanciest or the prettiest.
          </Body>
          <Body>They just have a real brand.</Body>
        </div>
        <DefinitionBlock>
          <DefLine>A clear <em>why.</em></DefLine>
          <DefLine>A clear <em>story.</em></DefLine>
          <DefLine>A clear <em>position.</em></DefLine>
          <DefLine>A consistent way of showing their work, their people, and what they stand for.</DefLine>
        </DefinitionBlock>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <Body>That is what creates pull. That is what patients remember. That is what people say about you when you are not in the room.</Body>
          <Body>Meanwhile, some of the practices in the most pain come to us right after a rebuild.</Body>
          <Body>New office. New logo. New everything. Still no demand.</Body>
          <Body>Because a nicer office does not create a stronger signal. A new logo does not create trust. And better finishes do not make people care.</Body>
        </div>
        <PullQuote cite="PASTED House Doctrine">
          “That is the difference between buying things and building an asset.”
        </PullQuote>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <Body>If your branding strategy starts with aesthetics and ends with a logo, you do not have a brand strategy. You have a spending strategy.</Body>
          <Body>This workbook walks you through the five parts of a real brand asset. Before the parts, there is a foundation — because without it, every part above it wobbles.</Body>
        </div>
        <div style={{ marginTop: 32 }}>
          <MutedBody italic>The foundation is your ikigai — adapted for the dentist who wants to build something that pulls.</MutedBody>
        </div>
      </Section>

      <Rule />

      {/* FOUNDATION · IKIGAI */}
      <Section num="FOUNDATION" label="Before The Five Parts">
        <H2>
          The Dentist's <em>Ikigai.</em>
        </H2>
        <Lead>
          Ikigai is the Japanese concept for the intersection of four forces: <em>what you love, what the world needs, what you can be paid for, and what you're uniquely excellent at.</em> Where all four overlap is a reason to get up in the morning that doesn't burn out.
        </Lead>
        <div style={{ marginTop: 24 }}>
          <Body>
            Adapted for a practice owner, the four circles become a positioning instrument. You likely already specialize — cosmetic, implants, full arch, ortho. The ikigai isn't about choosing a specialty. It's about understanding <em>why</em> you're the one people should come to for it.
          </Body>
        </div>

        {/* Ikigai SVG */}
        <div style={{ display: "flex", justifyContent: "center", margin: "56px 0" }}>
          <svg viewBox="0 0 480 480" style={{ width: "100%", maxWidth: 480 }} aria-label="Ikigai diagram">
            <g fill="none" stroke="#1A1A1A" strokeWidth="1">
              <circle cx="180" cy="180" r="130" />
              <circle cx="300" cy="180" r="130" />
              <circle cx="180" cy="300" r="130" />
              <circle cx="300" cy="300" r="130" />
            </g>
            <g fontFamily="Inter, sans-serif" fontSize="9" fontWeight="500" fill="#7A6F4F" textAnchor="middle" letterSpacing="2">
              <text x="110" y="60">WHAT YOU LOVE</text>
              <text x="370" y="60">WORLD-CLASS AT</text>
              <text x="110" y="450">PATIENTS NEED</text>
              <text x="370" y="450">COMMANDS PREMIUM</text>
            </g>
            <g fontFamily="Cormorant Garamond, serif" fontSize="20" fontStyle="italic" fill="#1A1A1A" textAnchor="middle">
              <text x="240" y="232">Your</text>
              <text x="240" y="258">Reason</text>
              <text x="240" y="284">to Pull</text>
            </g>
          </svg>
        </div>

        <H3>Answer fast. Edit later.</H3>
        <MutedBody>Your responses save automatically. The strongest insights usually come in the second or third pass — don't over-polish the first draft.</MutedBody>

        <SubLabel>Circle 01 · What You Love</SubLabel>
        {wb({ num: "01", dataKey: "love_1", question: "What part of dentistry makes you lose track of time?", hint: "The case type, the conversation, the craft — whatever still energizes you on a Friday afternoon.", placeholder: "When I'm doing ___, I forget to eat lunch." })}
        {wb({ num: "02", dataKey: "love_2", question: "If you could only perform three procedures for the rest of your career, which would you choose?", hint: "Not the most profitable. The three that feel most like you.", placeholder: "1.  2.  3." })}
        {wb({ num: "03", dataKey: "love_3", question: "What do you refuse to do in your practice — even though it would make money?", hint: "The “no” list defines your brand almost as much as the “yes” list.", placeholder: "I don't do ___ because ___" })}

        <SubLabel>Circle 02 · What You're World-Class At</SubLabel>
        {wb({ num: "04", dataKey: "skill_1", question: "What does your best work make possible that average dentistry cannot?", hint: "Not “beautiful smiles.” Specific. The outcome a patient describes to a friend six months later.", placeholder: "My patients walk away with ___" })}
        {wb({ num: "05", dataKey: "skill_2", question: "What's your unique mechanism? The way you do it that others don't.", hint: "Technique, technology, process, philosophy — the part of the work you can explain in a way nobody else does.", placeholder: "Most dentists ___. I ___ instead, because ___" })}
        {wb({ num: "06", dataKey: "skill_3", question: "What's the best compliment a patient has ever given you?", hint: "Their exact words. Not paraphrased. This is almost always a positioning line hiding in plain sight.", placeholder: "She said, ‘___'" })}

        <SubLabel>Circle 03 · What Your Patients Need</SubLabel>
        {wb({ num: "07", dataKey: "need_1", question: "Describe the one patient you wish you had more of — like a person, not a demographic.", hint: "What do they do for work. What keeps them up at night. What would your work actually change for them. Names and faces, not age brackets.", placeholder: "She's 52, runs her own firm, hasn't smiled in photos in a decade…" })}
        {wb({ num: "08", dataKey: "need_2", question: "What does that patient not know about their own problem that you wish they did?", hint: "The education gap that — once closed — makes them seek you out. This is the core of your content.", placeholder: "They think it's a cosmetic issue. It's actually a ___" })}
        {wb({ num: "09", dataKey: "need_3", question: "What does the market currently misunderstand about cases like yours?", hint: "The dominant narrative in dentistry is often wrong for your ICP. What do you disagree with?", placeholder: "Everyone says ___. The truth is ___" })}

        <SubLabel>Circle 04 · What Commands Premium</SubLabel>
        {wb({ num: "10", dataKey: "premium_1", question: "What is the full-price, no-discount version of your signature offer?", hint: "State the actual price. Premium brands state price upfront. It attracts buyers and repels guppies.", placeholder: "Full arch, smile design, or signature case — name it and price it." })}
        {wb({ num: "11", dataKey: "premium_2", question: "What is the case result you want to be famous for — the work your name should be synonymous with?", hint: "When someone in my city needs ___, I want mine to be the first name they hear.", placeholder: "I want to own the category of ___" })}
        {wb({ num: "12", dataKey: "premium_3", question: "Where is your authority currently leaking? Where are you undercharging or under-claiming?", hint: "Premium is often blocked by internal permission, not market permission.", placeholder: "I keep discounting ___. I downplay ___. I should stop ___." })}

        <H3>Synthesis · Your Reason to Pull</H3>
        <MutedBody>Read your twelve answers back. What pattern shows up? Where do all four circles overlap?</MutedBody>
        {wb({ num: "✦", dataKey: "niche_synthesis", question: "Write your one-sentence positioning.", hint: "Template: I help [specific patient] achieve [specific outcome] through [unique mechanism] — for patients who [what makes them different]. Don't worry if it's ugly. Draft it.", placeholder: "I help ___", minHeight: 140, accent: true })}
      </Section>

      <Rule />

      {/* COMPASS */}
      <Section num="COMPASS" label="Direction Before Architecture">
        <H2>
          Your <em>Vision.</em> Your <em>Mission.</em>
        </H2>
        <Lead>Before we build the five parts of the brand, lock the two forces that sit above them: where the practice is going, and why it exists in the first place.</Lead>
        <div style={{ marginTop: 24 }}>
          <Body>These are not marketing statements. These are the lines you read back to yourself on a bad Tuesday to remember what you are actually building.</Body>
        </div>
        {wb({ num: "✦", dataKey: "vision", question: "What is your ten-year vision for the practice?", hint: "What does the practice look like, feel like, and mean to the market at that point. One paragraph. No hedging.", placeholder: "In ten years, my practice is ___", minHeight: 100 })}
        {wb({ num: "✦", dataKey: "mission", question: "What is the practice's mission — beyond dentistry itself?", hint: "The bigger reason the doors are open. The thing your best patients get from you that isn't technically a dental outcome.", placeholder: "We exist to ___", minHeight: 100 })}
      </Section>

      <Rule />

      {/* VALUES */}
      <Section num="VALUES" label="What You Defend, What You Reject">
        <H2>
          Five <em>Practice Values.</em>
        </H2>
        <Lead>A brand's values are not poster words. They are the filters that decide which patients you take, which cases you refuse, how your team speaks, and what you say no to when the money is on the table.</Lead>
        <div style={{ marginTop: 24 }}>
          <Body>Write five. Not ten. Five is a discipline — it forces you to pick. Each value should be one or two words that your team can actually recite and that a patient could feel in five minutes with your practice.</Body>
        </div>
        <div style={{ marginTop: 32 }}>
          <NumberedStack
            label="Practice Values"
            count={5}
            keyPrefix="value"
            values={v}
            onChange={handleChange}
            placeholders={["e.g., Subtlety", "e.g., Craftsmanship", "e.g., No cookie-cutter cases", "e.g., Honest over optimistic", "e.g., Function before aesthetics"]}
          />
        </div>
      </Section>

      <Rule />

      {/* TRANSITION */}
      <div className="mx-auto" style={{ maxWidth: 680, padding: "0 24px", textAlign: "center", margin: "80px auto" }}>
        <h2
          className="serif"
          style={{ fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.15, color: "var(--ink)", fontWeight: 300 }}
        >
          A real brand is not a logo. <em>It's five things working together.</em>
        </h2>
        <p
          style={{
            margin: "32px auto 0",
            maxWidth: 600,
            fontSize: 14,
            lineHeight: 1.7,
            color: "var(--ink-muted)",
            fontWeight: 300,
          }}
        >
          Everything above this line is raw material. Everything below turns it into an asset — something that pulls, compounds, and tells patients who you are before you say a word.
        </p>
      </div>

      <Rule />

      {/* 01 POSITIONING */}
      <Section num="01" label="Part One · What You're Known For">
        <H2><em>Positioning.</em></H2>
        <Lead>You already specialize. The question isn't <em>what</em> you do — it's whether the market knows <em>how you own it.</em></Lead>
        <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 24 }}>
          <Body>Most aesthetic dentists have a specialty on the website and generalist messaging everywhere else. The niche is chosen. The positioning is fuzzy. That gap is where pull leaks.</Body>
          <Body>Positioning is how you describe your specialty in a way that only you could describe it. “Cosmetic” is a category. “The dentist high-profile patients are sent to when nobody can know they had work done” is a position.</Body>
          <Body>This is where the ikigai synthesis lives. Your one-sentence positioning from the foundation <em>is</em> your positioning — if it survives the real-world test. The test is whether a patient can repeat it to a friend at dinner without losing any of it.</Body>
        </div>

        <H3>The PASTED Descriptive Call-Out</H3>
        <Body>Don't call out job titles. Call out conditions, states, and self-perceptions. “Executives over 50” is weak. “The woman who hasn't smiled in a photo since her divorce” is strong.</Body>
        <Callout label="WORKING FRAME">
          <div style={{ marginBottom: 8 }}>Weak: <em>For professionals who want better smiles.</em></div>
          <div>Strong: <em>For the founder, surgeon, or executive whose smile hasn't kept up with the life they've built.</em></div>
        </Callout>

        <H3>The 3% In-Market Rule</H3>
        <Body>
          At any given moment, only about <strong>3% of your total addressable market is ready to buy.</strong> The other 97% is unaware, passive, or not yet in the window. A good brand speaks only to the 3% — with precision — while conditioning the 97% for their future moment. That is the mechanism of pull.
        </Body>

        {wb({ num: "✦", dataKey: "callouts", question: "Write three descriptive call-outs for your 3%.", hint: "Each should describe a state or self-perception, not a demographic. They should feel like private thoughts, not segments.", placeholder: "1. For the woman who…\n2. For the man who…\n3. For the patient who…", minHeight: 130 })}

        <SubLabel brass>CAPSTONE · The Practice Marketing System</SubLabel>
        <Body>Four lines that, together, define the commercial engine of your brand. This is the most-used page of the workbook — it's what you'll read back before every shoot, every ad, every team meeting.</Body>
        {wb({ num: "01", dataKey: "ms_patient", question: "Ideal Patient", hint: "Describe the patient you want more of in one vivid sentence. Not a demographic — a person.", placeholder: "The ___ who ___", minHeight: 80, inputType: "input" })}
        {wb({ num: "02", dataKey: "ms_differentiators", question: "Three Differentiators", hint: "What separates you from every other dentist in your specialty, stated in the patient's language — not credentials or equipment.", placeholder: "1. ___\n2. ___\n3. ___", minHeight: 140 })}
        {wb({ num: "03", dataKey: "ms_experience", question: "Signature Experience", hint: "The 3–5 step process that defines how you deliver the work. Named, repeatable, ownable. “The [Your Name] Protocol,” “The Three-Visit Method,” etc.", placeholder: "Step 1 ___. Step 2 ___. Step 3 ___.", minHeight: 100 })}
        {wb({ num: "04", dataKey: "ms_promise", question: "The Promise", hint: "What the patient walks away with. What you guarantee. The outcome your brand stakes its name on.", placeholder: "Every patient walks away with ___", minHeight: 80, inputType: "input" })}
      </Section>

      <Rule />

      {/* 02 POV */}
      <Section num="02" label="Part Two · Your Why">
        <H2><em>Point of View.</em></H2>
        <Lead>Strong brands have opinions. Weak brands list services.</Lead>
        <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 24 }}>
          <Body>This is the part most dental brands are missing — and it's the part that separates a practice from a point of reference.</Body>
          <Body>Point of view is the non-negotiable belief you carry into every case, every consult, every piece of content. It's what makes a patient say “I want <em>him</em> specifically” instead of “I want a dentist.”</Body>
        </div>

        <ul
          className="serif"
          style={{
            margin: "40px 0",
            maxWidth: 680,
            listStyle: "none",
            padding: "0 0 0 24px",
            borderLeft: "1px solid var(--accent-line)",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            fontStyle: "italic",
            fontSize: 19,
            color: "var(--ink)",
            fontWeight: 400,
          }}
        >
          <li>We don't do cookie-cutter veneers.</li>
          <li>Subtlety over Hollywood.</li>
          <li>Function before aesthetics.</li>
          <li>If it doesn't look like it belongs in your face, we don't do it.</li>
          <li>Age-appropriate or nothing.</li>
        </ul>

        <Body>Every time we rebuild this — not the logo — case value goes up, price sensitivity drops, and suddenly you're not competing anymore. That is pull. And pull is what an office renovation will never buy you.</Body>

        <H3>The Signature Story</H3>
        <Body>A point of view becomes unforgettable when it's attached to a story. Every iconic practice has one that is specific, true, and repeatable. Specific enough that it couldn't belong to any other dentist. True enough that you never have to remember it. Repeatable enough that a patient can tell their spouse over dinner.</Body>

        <div style={{ margin: "40px 0", maxWidth: 680 }}>
          <FrameworkRow label="Origin" title="Why this practice exists.">
            The reason you opened the doors. The patient, the mentor, the failure, or the frustration that started it.
          </FrameworkRow>
          <FrameworkRow label="Continuity" title="What's been true the whole time.">
            Three-generation practices, 30-year hygienists, signature techniques. Use specifics, not decades.
          </FrameworkRow>
          <FrameworkRow label="Mechanism" title="The way you do it that others don't.">
            Your unique approach — named, explained, owned. The shorthand patients use when they describe you to friends.
          </FrameworkRow>
          <FrameworkRow label="Promise" title="What the patient walks away with." last>
            Not the procedure. The outcome. The identity shift.
          </FrameworkRow>
        </div>

        {wb({ num: "✦", dataKey: "pov_statement", question: "Write one sentence: “We believe ______.”", hint: "This single sentence drives content, messaging, pricing, and differentiation for the next decade. Don't hedge it.", placeholder: "We believe ___", minHeight: 80, inputType: "input" })}
        {wb({ num: "✦", dataKey: "story", question: "Draft your signature story in four lines.", hint: "One line per layer. Short. Specific. Not yet polished.", placeholder: "Origin:\nContinuity:\nMechanism:\nPromise:", minHeight: 160 })}
      </Section>

      <Rule />

      {/* 03 EXPERIENCE */}
      <Section num="03" label="Part Three · What It Feels Like">
        <H2><em>Experience.</em></H2>
        <Lead>Your brand isn't what your Instagram says. It's what happens next.</Lead>
        <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 24 }}>
          <Body>A brand is: your consult flow. Your office vibe. How your team speaks. Your follow-up. Your before-and-after photography. The smell of the space. The music in the waiting room. The way a treatment plan is delivered.</Body>
          <Body>If your Instagram says “luxury” but your consult feels rushed — your brand collapses. If your ads promise bespoke and your follow-up is a templated SMS at 9am — your brand collapses.</Body>
          <Body>Consistency builds credibility. Inconsistency is the fastest way to lose a $60k case.</Body>
        </div>

        <H3>The Experience Audit</H3>
        <Body>Walk your own practice like a patient. Listen to your own front desk call. Re-read your own follow-up sequence. Does the feeling hold from first scroll to final reveal? Or does it fracture somewhere in the middle?</Body>

        <PillarGrid cols={3}>
          <PillarCard label="Website tone" body="Does it sound like you, or like your competitor?" />
          <PillarCard label="Front desk tone" body="Is it the same person the website promised?" />
          <PillarCard label="Consult structure" body="Does it feel bespoke or processed?" />
          <PillarCard label="Follow-up messaging" body="Does it carry the brand, or break it?" />
          <PillarCard label="Photography" body="Does it belong in a gallery, or a brochure?" />
          <PillarCard label="Space" body="Does the environment match the tier of work?" />
        </PillarGrid>

        <Callout label="TONAL DISCIPLINE">
          <div>Pick one palette, one typography system, one lighting convention, one tone of voice — and defend them from every well-meaning intrusion. A brand's experience is the sum of what you <em>don't</em> let through.</div>
        </Callout>

        {wb({ num: "✦", dataKey: "experience_gap", question: "Where does your brand currently collapse?", hint: "The gap between what you promise publicly and what a patient experiences privately. Be brutal.", placeholder: "The ad says ___. The consult feels ___.", minHeight: 120 })}
      </Section>

      <Rule />

      {/* 04 SIGNAL */}
      <Section num="04" label="Part Four · What You Show Publicly">
        <H2><em>Signal.</em></H2>
        <Lead>Signal is content. But content guided by positioning — not content for its own sake.</Lead>
        <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 24 }}>
          <Body>Most dentists treat content like a chore. They post happy Mondays. Random before-and-afters. Generic dental tips. This is noise. It doesn't reinforce positioning, doesn't carry point of view, doesn't deepen experience. It's just activity.</Body>
          <Body>Strong signal does the opposite. It says the same thing the positioning says, in a different format, every time. That consistency is what creates pull.</Body>
        </div>

        <PillarGrid cols={2}>
          <PillarCard label="WEAK SIGNAL" body="Random before/after. “Happy Monday.” Dental tips anyone could post." />
          <PillarCard label="STRONG SIGNAL" body="Philosophy pieces. Patient stories. Lifestyle transformation. Authority commentary on your category." />
        </PillarGrid>

        <H3>The Four Quadrants</H3>
        <Body>At PASTED, signal is organized around four categories. Every piece of content maps to one. Together they cover the full psychology of an in-market buyer.</Body>

        <PillarGrid cols={2}>
          <PillarCard label="01 · Questions" body="What patients ask you directly. The surface-level concerns that get them through the door. High-volume, broad appeal, educational." />
          <PillarCard label="02 · Questions from Questions" body="The follow-up questions patients only ask after the first answer. Deeper. More specific. Shows you've had this conversation thousands of times." />
          <PillarCard label="03 · Objections" body="The reasons patients almost don't book. Price, fear, time, past experience. Address the objection before it becomes a silent no." />
          <PillarCard label="04 · Expectations" body="What the experience will actually be like. Reduces anxiety, raises perceived value, pre-sells the close." />
        </PillarGrid>

        <H3>The Hammer Cycle</H3>
        <Body>Once a patient has booked, content keeps working. The Hammer Cycle is the pre-call sequence — 5 to 9 pieces of high-signal content delivered between booking and consultation. It's what takes show rates from 40% to 70%+ and turns consults into closes.</Body>

        <Callout label="THE FLOW BLOCK">
          <div>Four protected hours. Every day. No exceptions during a brand build. For a practice owner, this is shoot days, thinking time, long-form writing, and patient-story capture. Not chair time. Not email. The brand gets built in the block — or it does not get built at all.</div>
        </Callout>

        <H3>The Posting Filter</H3>
        <Body>Before you post anything, ask: <em>Does this reinforce what we're known for?</em> If not, don't post.</Body>

        {wb({ num: "✦", dataKey: "quadrants", question: "Write one content idea in each of the four quadrants.", hint: "Specific enough to film tomorrow. Every idea must pass the posting filter.", placeholder: "Questions:\nQuestions from Questions:\nObjections:\nExpectations:", minHeight: 180 })}
      </Section>

      <Rule />

      {/* 05 SYSTEM */}
      <Section num="05" label="Part Five · How It All Connects">
        <H2><em>System.</em></H2>
        <Lead>Pull happens when all five parts carry the same signal. This is the piece most dentists miss.</Lead>
        <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 24 }}>
          <Body>A brand must carry through: ads, website, consult, pricing, photography, messaging, follow-up, reviews, referral scripts, even the invoice. If one breaks, trust drops. If trust drops, price drops. If price drops, you're back to competing.</Body>
          <Body>The system is what makes the whole architecture compound instead of leak. It is the difference between a pile of marketing activity and a real asset.</Body>
        </div>

        <H3>The Patient Journey Map</H3>
        <Body>Walk the journey. End to end. Every message, every screen, every human interaction:</Body>

        <div
          style={{
            margin: "32px 0",
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            alignItems: "center",
          }}
        >
          {["Ad", "Website", "Consult", "Treatment Plan", "Follow-up", "Reveal", "Review", "Referral"].map((step, i, arr) => (
            <div key={step} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                className="meta-label"
                style={{
                  border: "1px solid var(--rule)",
                  padding: "10px 14px",
                  letterSpacing: "0.18em",
                  color: "var(--ink-soft)",
                }}
              >
                {step}
              </div>
              {i < arr.length - 1 && <span style={{ color: "var(--ink-dim)" }}>→</span>}
            </div>
          ))}
        </div>

        <Body>At each step, ask:</Body>
        <ul
          style={{
            margin: "20px 0",
            maxWidth: 680,
            paddingLeft: 24,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            fontSize: 16,
            color: "var(--ink-soft)",
            fontWeight: 300,
          }}
        >
          <li>Does the message match the one before it?</li>
          <li>Does the tone match the positioning?</li>
          <li>Does the point of view come through?</li>
          <li>Does the experience hold up?</li>
        </ul>

        <H3>The Compounding Effect</H3>
        <Body>When the system holds, three things happen together:</Body>

        <div style={{ margin: "40px 0", maxWidth: 680 }}>
          <FrameworkRow label="Recognition" title="The market knows who you are before you speak.">
            Your visuals, voice, and call-outs are distinct enough that a patient recognizes your ad in the scroll without reading a word. Recognition reduces cost-per-acquisition year over year.
          </FrameworkRow>
          <FrameworkRow label="Conditioning" title="The 97% is being trained for their moment.">
            Every piece of content a non-buyer consumes pre-frames their eventual purchase. When they enter the 3%, you're already the default answer.
          </FrameworkRow>
          <FrameworkRow label="Concentration" title="The affluent patients you attract tell other affluent patients." last>
            Referral quality improves. Pricing power improves. The funnel gets more efficient as the brand matures.
          </FrameworkRow>
        </div>

        <PullQuote cite="The PASTED Long View">
          “A practice can take 20 years to build. A brand asset, built correctly, can be built in 24 months and then compound indefinitely.”
        </PullQuote>

        {wb({ num: "✦", dataKey: "journey_map", question: "Map your patient journey in one line.", hint: "“Ad → Website → Consult → Follow-up.” Then circle the weakest link. That's where the brand is leaking.", placeholder: "Ad → ___ → ___ → ___. Weakest link: ___", minHeight: 100 })}
        {wb({ num: "✦", dataKey: "weakest_part", question: "Which of the five parts is weakest in your practice today?", hint: "Honest answer. Not the one you want to fix — the one you've been avoiding.", placeholder: "Part ___. Because ___", minHeight: 100 })}
      </Section>

      <Rule />

      {/* THREE-QUESTION TEST */}
      <Section num="DIAGNOSTIC" label="Before You Spend Another Dollar">
        <H2>The <em>Three-Question Test.</em></H2>
        <Body>Before you spend another dollar on a logo, a website redesign, a new photographer, or a new office — answer these three:</Body>
        {wb({ num: "01", dataKey: "test_1", question: "Who are we for?", placeholder: "We are for ___", inputType: "input", minHeight: 60 })}
        {wb({ num: "02", dataKey: "test_2", question: "What do we believe?", placeholder: "We believe ___", inputType: "input", minHeight: 60 })}
        {wb({ num: "03", dataKey: "test_3", question: "What experience do we want to be known for?", placeholder: "We want to be known for ___", inputType: "input", minHeight: 60 })}
        <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 16 }}>
          <MutedBody>If you can't answer those in one sentence each — your logo doesn't matter, and neither does your renovation. You don't need a rebrand. You need clarity.</MutedBody>
          <MutedBody>The logo is just the signature. The brand is the story. The story is what pulls.</MutedBody>
        </div>
      </Section>

      <Rule />

      {/* CADENCE */}
      <Section num="CADENCE" label="The Personal Board Meeting">
        <H2>A weekly rhythm for the <em>iconic operator.</em></H2>
        <Lead>
          Iconic operators do not drift. They review. Once a week, for thirty minutes, the best practice owners we work with sit with themselves as if they were their own most important client — and ask the hard questions before the market asks them on their behalf.
        </Lead>
        <div style={{ marginTop: 24 }}>
          <Body>Run this every week. Same time. Same 30 minutes. Treat yourself like the most important client on your roster.</Body>
        </div>

        <div style={{ margin: "40px 0", maxWidth: 680, padding: 24, background: "var(--canvas-deep)" }}>
          <Row time="Minute 1–5" action={<><strong style={{ color: "var(--ink)" }}>Wins.</strong> Three things that worked. Case, content, referral, review, team moment — anything that reinforced the brand you're building.</>} />
          <Row time="Minute 6–15" action={<><strong style={{ color: "var(--ink)" }}>Friction.</strong> Where is the brand leaking? Misaligned content, patient confusion, price discounting, team drift. Name the friction before it becomes structural.</>} />
          <Row time="Minute 16–22" action={<><strong style={{ color: "var(--ink)" }}>The One Move.</strong> One decision, one removal, one creation that would change the trajectory most in the next 90 days. Not ten things. One.</>} />
          <Row time="Minute 23–30" action={<><strong style={{ color: "var(--ink)" }}>The Flow Block.</strong> Schedule the 4-hour block for the week. Protect it like a surgery. This is where the brand actually gets built.</>} />
        </div>

        <H3>This Week's Reflection</H3>
        <MutedBody>Use these three prompts to run your first Personal Board Meeting right now.</MutedBody>
        {wb({ num: "✦", dataKey: "reflect_well", question: "What went well this week?", hint: "Three things. Small or large. If you can't name three, you're not looking hard enough.", placeholder: "1.\n2.\n3.", minHeight: 120 })}
        {wb({ num: "✦", dataKey: "reflect_didnt", question: "What didn't go well?", hint: "Where did the brand leak? Where did you discount, hedge, or let something slip through that didn't reinforce the position?", placeholder: "1.\n2.\n3.", minHeight: 120 })}
        {wb({ num: "✦", dataKey: "reflect_next", question: "What is the one move for next week?", hint: "Not a list. One. The single decision, removal, or creation that compounds.", placeholder: "Next week I will ___", minHeight: 100 })}
        {wb({ num: "✦", dataKey: "board_meeting", question: "When will you run this every week going forward?", hint: "Day of the week, time, and how you'll protect it. Specificity is the whole point.", placeholder: "Friday, 8:00am, before clinic. Phone off.", inputType: "input", minHeight: 60 })}
      </Section>

      <Rule />

      {/* HORIZON */}
      <Section num="HORIZON" label="The 10 · 3 · 1 · 90 Vision">
        <H2>Build the ten-year brand by starting with the next <em>ninety days.</em></H2>
        <Lead>Where are you in ten years, in three years, in one year — and what must be true by the end of the next ninety days to make it possible?</Lead>
        <div style={{ marginTop: 24 }}>
          <Body>For each horizon, write 3 specific goals. Not themes. Not aspirations. Concrete, measurable, or verifiable outcomes a patient, employee, or bank manager could confirm.</Body>
        </div>

        <SubLabel>TEN-YEAR HORIZON</SubLabel>
        <MutedBody>The brand, the practice, the life. Specific.</MutedBody>
        <NumberedStack
          label="Ten-Year Goals"
          count={3}
          keyPrefix="goal_10y"
          values={v}
          onChange={handleChange}
          placeholders={["Goal 1 — e.g., Seven-figure case volume per quarter", "Goal 2 — e.g., Recognized nationally as the ___ dentist", "Goal 3 — e.g., Practice sold, licensed, or family-inherited"]}
        />

        <SubLabel>THREE-YEAR HORIZON</SubLabel>
        <MutedBody>What's true by the end of year three that proves the ten-year trajectory.</MutedBody>
        <NumberedStack label="Three-Year Goals" count={3} keyPrefix="goal_3y" values={v} onChange={handleChange} placeholders={["Goal 1", "Goal 2", "Goal 3"]} />

        <SubLabel>ONE-YEAR HORIZON</SubLabel>
        <MutedBody>Twelve months out. Positioning locked, signal running, system holding.</MutedBody>
        <NumberedStack label="One-Year Goals" count={3} keyPrefix="goal_1y" values={v} onChange={handleChange} placeholders={["Goal 1", "Goal 2", "Goal 3"]} />

        <SubLabel>NINETY-DAY HORIZON</SubLabel>
        <MutedBody>The near-term move. What parts of this workbook are you locking by day 90.</MutedBody>
        <NumberedStack label="Ninety-Day Goals" count={3} keyPrefix="goal_90d" values={v} onChange={handleChange} placeholders={["Goal 1", "Goal 2", "Goal 3"]} />
      </Section>

      <Rule />

      {/* CTA */}
      <Section num="NEXT" label="When You're Ready">
        <H2>You don't need a nicer office. You need a real <em>asset.</em></H2>
        <Lead>PASTED works with a small number of aesthetic dental practices each year. We build the signal, produce the creative, run the campaigns, and architect the system — so the brand you've designed in this workbook becomes the brand your market sees. It is the same five-part framework behind hundreds of millions in aesthetic demand.</Lead>
        <div style={{ marginTop: 24 }}>
          <Body>If the workbook surfaced something, and you'd like to see what the full architecture looks like applied to your practice — book a Brand Architecture Call.</Body>
        </div>
        <div
          className="workbook-print-hide"
          style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 12 }}
        >
          <a
            href="https://calendly.com/pasted/brand-architecture-call"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--accent)",
              color: "var(--canvas)",
              borderRadius: 999,
              padding: "18px 36px",
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: 14,
              letterSpacing: "0.04em",
              textDecoration: "none",
              transition: "background 200ms ease, transform 200ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--accent-deep)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--accent)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Book a Brand Architecture Call →
          </a>
          <button
            onClick={handleExport}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              color: "var(--ink)",
              border: "1px solid var(--ink)",
              borderRadius: 2,
              padding: "18px 36px",
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: 14,
              letterSpacing: "0.04em",
              cursor: "pointer",
              transition: "background 200ms ease, border-color 200ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--canvas-deep)";
              e.currentTarget.style.borderColor = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "var(--ink)";
            }}
          >
            Export My Workbook
          </button>
        </div>
      </Section>

      {/* FOOTER */}
      <footer
        className="mx-auto"
        style={{
          maxWidth: 960,
          marginTop: 120,
          padding: "48px 24px",
          borderTop: "1px solid var(--rule)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="md:!flex-row"
        >
          <div className="meta-label" style={{ letterSpacing: "0.24em" }}>
            PASTED · Brand Asset Workbook
          </div>
          <div className="meta-label" style={{ letterSpacing: "0.24em" }}>
            v1 · MMXXVI
          </div>
        </div>
        <div
          className="serif"
          style={{
            marginTop: 24,
            textAlign: "center",
            fontStyle: "italic",
            fontSize: 16,
            color: "var(--ink-muted)",
            fontWeight: 300,
          }}
        >
          Where Dentistry Becomes Iconic.
        </div>
      </footer>
    </div>
  );
};

export default BrandAssetWorkbook;
