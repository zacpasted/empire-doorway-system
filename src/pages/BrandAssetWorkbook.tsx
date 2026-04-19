import { useCallback, useEffect, useMemo, useRef, useState, ReactNode, CSSProperties } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { trackCTAClick } from "@/hooks/useCTAAnalytics";
import { PASTED_CALENDLY_URL } from "@/lib/calendly";

/* ============================================================
 * THE ART OF BECOMING — The PASTED Library · Volume I
 * Single-file editorial field guide.
 * Bone paper · ink type · aged brass accents.
 * All design tokens scoped to .workbook-root so the rest of the
 * site's dark theme is untouched.
 * ============================================================ */

const STORAGE_KEY = "pasted-library-the-art-of-becoming";
const LEAD_STORAGE_KEY = "pasted-library-the-art-of-becoming-lead";

/* ---------- Lead gate ---------- */
const leadSchema = z.object({
  first_name: z.string().trim().min(1, "First name is required").max(80),
  last_name: z.string().trim().max(80).optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email").max(255),
  practice_name: z.string().trim().max(160).optional().or(z.literal("")),
});

type Lead = { first_name: string; last_name: string; email: string; practice_name: string };
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
  try { localStorage.setItem(LEAD_STORAGE_KEY, JSON.stringify(l)); } catch { /* ignore */ }
};
const isLeadValid = (l: Lead) => leadSchema.safeParse(l).success;

/* ---------- Workbook value storage ---------- */
type Values = Record<string, string>;
const loadValues = (): Values => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Values;
  } catch { return {}; }
};
const saveValues = (v: Values) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(v)); } catch { /* ignore */ }
};

/* ---------- Field manifest (export order) ---------- */
type FieldDef = { key: string; label: string };
const FIELD_MANIFEST: FieldDef[] = [
  { key: "love_1", label: "01 · What part of dentistry makes you lose track of time?" },
  { key: "love_2", label: "02 · If you could only perform three procedures for the rest of your career, which would you choose?" },
  { key: "love_3", label: "03 · What do you refuse to do in your practice — even though it would make money?" },
  { key: "skill_1", label: "04 · What does your best work make possible that average dentistry cannot?" },
  { key: "skill_2", label: "05 · What is your unique mechanism — the way you do it that others don't?" },
  { key: "skill_3", label: "06 · What is the best compliment a patient has ever given you?" },
  { key: "need_1", label: "07 · Describe the one patient you wish you had more of — like a person, not a demographic." },
  { key: "need_2", label: "08 · What does that patient not know about their own problem that you wish they did?" },
  { key: "need_3", label: "09 · What does the market currently misunderstand about cases like yours?" },
  { key: "premium_1", label: "10 · What is the full-price, no-discount version of your signature offer?" },
  { key: "premium_2", label: "11 · What is the case result you want to be famous for?" },
  { key: "premium_3", label: "12 · Where is your authority currently leaking?" },
  { key: "niche_synthesis", label: "Synthesis · Your Reason to Pull (one-sentence positioning)" },
  { key: "vision", label: "Compass · Ten-year vision for the practice" },
  { key: "mission", label: "Compass · Mission beyond dentistry itself" },
  { key: "value_1", label: "Value 01" },
  { key: "value_2", label: "Value 02" },
  { key: "value_3", label: "Value 03" },
  { key: "value_4", label: "Value 04" },
  { key: "value_5", label: "Value 05" },
  { key: "callouts", label: "I · Three descriptive call-outs for your 3%" },
  { key: "ms_patient", label: "I · Marketing System 01 · Ideal Patient" },
  { key: "ms_differentiators", label: "I · Marketing System 02 · Three Differentiators" },
  { key: "ms_experience", label: "I · Marketing System 03 · Signature Experience" },
  { key: "ms_promise", label: "I · Marketing System 04 · The Promise" },
  { key: "pov_statement", label: "II · We believe ___" },
  { key: "story", label: "II · Signature story (Origin · Continuity · Mechanism · Promise)" },
  { key: "experience_gap", label: "III · Where the brand currently collapses" },
  { key: "quadrants", label: "IV · One content idea in each of the four quadrants" },
  { key: "journey_map", label: "V · Patient journey in one line + weakest link" },
  { key: "weakest_part", label: "V · Which of the five parts is weakest today" },
  { key: "test_1", label: "Diagnostic · Who are we for?" },
  { key: "test_2", label: "Diagnostic · What do we believe?" },
  { key: "test_3", label: "Diagnostic · What experience do we want to be known for?" },
  { key: "goal_10y_1", label: "Horizon · 10-year goal 01" },
  { key: "goal_10y_2", label: "Horizon · 10-year goal 02" },
  { key: "goal_10y_3", label: "Horizon · 10-year goal 03" },
  { key: "goal_3y_1", label: "Horizon · 3-year goal 01" },
  { key: "goal_3y_2", label: "Horizon · 3-year goal 02" },
  { key: "goal_3y_3", label: "Horizon · 3-year goal 03" },
  { key: "goal_1y_1", label: "Horizon · 1-year goal 01" },
  { key: "goal_1y_2", label: "Horizon · 1-year goal 02" },
  { key: "goal_1y_3", label: "Horizon · 1-year goal 03" },
  { key: "goal_90d_1", label: "Horizon · 90-day goal 01" },
  { key: "goal_90d_2", label: "Horizon · 90-day goal 02" },
  { key: "goal_90d_3", label: "Horizon · 90-day goal 03" },
];

/* ---------- Scoped CSS ---------- */
const WORKBOOK_CSS = `
.workbook-root {
  --bone:         #EDE7DB;
  --bone-deep:    #E5DDCC;
  --bone-shadow:  #DBD2BF;
  --ink:          #1C1B18;
  --ink-body:     #2D2B26;
  --ink-quiet:    #726B5E;
  --ink-whisper:  #A59E8E;
  --rule:         #C7BEA8;
  --rule-ghost:   #D9D1BD;
  --brass:        #8B7A4E;
  --brass-deep:   #6A5C36;
  --brass-ghost:  rgba(139,122,78,0.06);
  --brass-line:   rgba(139,122,78,0.22);
  --oxblood:      #5C2A2A;

  background-color: var(--bone);
  color: var(--ink-body);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 300;
  font-size: 17px;
  line-height: 1.8;
  letter-spacing: 0;
  min-height: 100vh;
  position: relative;
  font-feature-settings: "liga","dlig","kern","tnum";
}
html.workbook-html { scroll-behavior: smooth; }

/* Paper grain */
.workbook-root .grain {
  position: fixed; inset: 0; z-index: 1; pointer-events: none;
  opacity: 0.28; mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'><filter id='p'><feTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' seed='4'/><feColorMatrix values='0 0 0 0 0.1 0 0 0 0 0.08 0 0 0 0 0.06 0 0 0 0.5 0'/></filter><rect width='100%25' height='100%25' filter='url(%23p)'/></svg>");
}

.workbook-root *::selection { background: var(--brass); color: var(--bone); }

.workbook-root .serif { font-family: 'Cormorant Garamond', 'Times New Roman', serif; }

.workbook-root h1, .workbook-root h2, .workbook-root h3 {
  font-family: 'Cormorant Garamond', 'Times New Roman', serif;
  font-weight: 300; color: var(--ink); margin: 0;
  font-feature-settings: "liga","dlig","kern","swsh","salt";
}
.workbook-root h1 em, .workbook-root h2 em, .workbook-root h3 em {
  color: var(--brass); font-style: italic; font-weight: 300;
  font-feature-settings: "liga","dlig","swsh","salt";
}
.workbook-root h1 { font-size: clamp(64px, 10vw, 112px); line-height: 0.94; letter-spacing: -0.025em; }
.workbook-root h2 { font-size: clamp(40px, 6vw, 64px); line-height: 1.02; letter-spacing: -0.018em; }
.workbook-root h3 { font-size: 28px; line-height: 1.2; font-weight: 400; }

.workbook-root p { max-width: 620px; margin: 0 0 24px 0; color: var(--ink-body); }

/* Section numeral / label */
.workbook-root .numeral {
  font-family: 'Inter', sans-serif; font-weight: 500; font-size: 10px;
  letter-spacing: 0.32em; text-transform: uppercase; color: var(--brass);
}
.workbook-root .label {
  font-family: 'Inter', sans-serif; font-weight: 500; font-size: 10px;
  letter-spacing: 0.32em; text-transform: uppercase; color: var(--ink-quiet);
}
.workbook-root .sublabel {
  font-family: 'Inter', sans-serif; font-weight: 500; font-size: 10px;
  letter-spacing: 0.28em; text-transform: uppercase; color: var(--brass);
  padding-bottom: 16px; border-bottom: 1px solid var(--brass-line);
  display: block; margin-bottom: 32px;
}
.workbook-root .lead {
  font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: 24px;
  line-height: 1.5; color: var(--ink); max-width: 620px; margin: 0 0 32px 0;
}

/* Pull quote */
.workbook-root .pullquote {
  font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 400;
  font-size: clamp(28px, 3.2vw, 38px); line-height: 1.28; color: var(--ink);
  border-left: 1px solid var(--brass); padding-left: 40px;
  margin: 96px 0; max-width: 720px;
}
.workbook-root .pullquote cite {
  display: block; margin-top: 16px; font-style: italic;
  font-family: 'Inter', sans-serif; font-weight: 400; font-size: 11px;
  letter-spacing: 0.32em; text-transform: uppercase; color: var(--oxblood);
}

/* Top bar + progress */
.workbook-root .topbar {
  position: sticky; top: 0; z-index: 50;
  background: rgba(237,231,219,0.92); backdrop-filter: blur(16px) saturate(1.1);
  -webkit-backdrop-filter: blur(16px) saturate(1.1);
  border-bottom: 1px solid var(--rule);
  height: 64px;
}
.workbook-root .topbar-inner {
  max-width: 1200px; margin: 0 auto; height: 100%;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 56px;
}
@media (max-width: 720px) { .workbook-root .topbar-inner { padding: 0 24px; } }
.workbook-root .progress {
  position: fixed; top: 0; left: 0; height: 1px; background: var(--brass);
  z-index: 60; transition: width 80ms linear;
}

/* Workbook field */
.workbook-root .wb-card {
  position: relative;
  background: var(--bone-deep);
  border: 1px solid var(--rule);
  border-radius: 2px;
  padding: 28px 32px;
  margin-bottom: 28px;
  transition: background 200ms ease, border-color 200ms ease;
}
.workbook-root .wb-card.filled { background: var(--bone-shadow); border-top: 2px solid var(--brass); padding-top: 27px; }
.workbook-root .wb-card.accent { border-top: 2px solid var(--brass); }
.workbook-root .wb-card.focused::after {
  content: "✦"; position: absolute; top: 12px; right: 16px;
  color: var(--brass); font-family: 'Cormorant Garamond', serif; font-size: 14px;
}
.workbook-root .wb-card.filled::before {
  content: "◆"; position: absolute; bottom: 10px; right: 14px;
  color: var(--brass); font-size: 8px; line-height: 1;
}
.workbook-root .wb-num {
  font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 400;
  font-size: 18px; color: var(--brass); margin-right: 12px;
}
.workbook-root .wb-question {
  font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: 22px;
  line-height: 1.3; color: var(--ink); margin: 0 0 6px 0;
}
.workbook-root .wb-hint {
  font-family: 'Inter', sans-serif; font-weight: 300; font-size: 13px;
  line-height: 1.6; color: var(--ink-quiet); margin: 0 0 16px 0; max-width: 580px;
}
.workbook-root .wb-input,
.workbook-root .wb-textarea {
  width: 100%; background: transparent; border: 1px solid var(--rule);
  border-radius: 2px; padding: 12px 14px;
  font-family: 'Inter', sans-serif; font-weight: 300; font-size: 15px;
  line-height: 1.7; color: var(--ink); resize: vertical;
}
.workbook-root .wb-input::placeholder,
.workbook-root .wb-textarea::placeholder { color: var(--ink-whisper); font-style: italic; }
.workbook-root .wb-input:focus,
.workbook-root .wb-textarea:focus { outline: 2px solid var(--brass); outline-offset: 2px; border-color: var(--brass); }

/* Numbered ruled stack */
.workbook-root .ruled-row {
  display: flex; align-items: center; gap: 18px;
  border-bottom: 1px solid var(--rule); padding: 14px 0;
}
.workbook-root .ruled-row:last-child { border-bottom: 1px solid var(--rule); }
.workbook-root .ruled-num {
  font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 400;
  font-size: 16px; color: var(--brass); min-width: 28px;
}
.workbook-root .ruled-input {
  flex: 1; background: transparent; border: none;
  font-family: 'Inter', sans-serif; font-weight: 400; font-size: 16px;
  color: var(--ink); padding: 4px 0;
}
.workbook-root .ruled-input::placeholder { color: var(--ink-whisper); font-style: italic; font-weight: 300; }
.workbook-root .ruled-input:focus { outline: none; }

/* Definition block */
.workbook-root .definition {
  text-align: center; max-width: 720px; margin: 0 auto;
  padding: 80px 0; position: relative;
}
.workbook-root .definition::before,
.workbook-root .definition::after {
  content: ""; display: block; width: 40px; height: 1px;
  background: var(--brass); margin: 0 auto;
}
.workbook-root .definition-line {
  font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: 28px;
  color: var(--ink); margin: 24px 0; line-height: 1.4;
}
.workbook-root .definition-line em { color: var(--brass); font-style: italic; }
.workbook-root .definition-stack { padding: 48px 0; }
.workbook-root .definition-stack > * + * { margin-top: 48px; }

/* Ornament dots between sections */
.workbook-root .ornament-dots {
  text-align: center; margin: 120px 0;
  color: var(--brass); font-size: 14px; letter-spacing: 0.5em;
}
.workbook-root .ornament-fleuron {
  text-align: center; margin: 120px 0;
  color: var(--brass); font-size: 22px;
  font-family: 'Cormorant Garamond', serif;
}

/* Chapter ornament */
.workbook-root .chapter-ornament {
  display: flex; justify-content: center; margin-bottom: 32px;
}

/* Running masthead */
.workbook-root .masthead {
  display: flex; justify-content: space-between; align-items: center;
  font-family: 'Inter', sans-serif; font-weight: 500; font-size: 9px;
  letter-spacing: 0.32em; text-transform: uppercase; color: var(--ink-whisper);
  padding-bottom: 12px; border-bottom: 1px solid var(--rule-ghost);
  margin-bottom: 24px;
}

/* Section frame */
.workbook-root section.workbook-section {
  max-width: 960px; margin: 0 auto;
  padding: 96px clamp(28px, 8vw, 120px);
}
@media (min-width: 720px) {
  .workbook-root section.workbook-section { padding-top: 160px; padding-bottom: 160px; }
}
.workbook-root .reading { max-width: 620px; }

/* Figure plate */
.workbook-root .figure {
  border: 1px solid var(--rule); border-radius: 2px;
  padding: 28px; margin: 64px 0; background: rgba(237,231,219,0.4);
}
.workbook-root .figure-caption {
  font-family: 'Inter', sans-serif; font-weight: 500; font-size: 9px;
  letter-spacing: 0.36em; text-transform: uppercase; color: var(--ink-quiet);
  text-align: center; margin-top: 24px;
}

/* Callout */
.workbook-root .callout {
  border-left: 1px solid var(--brass); padding: 8px 0 8px 28px;
  margin: 48px 0; max-width: 620px;
}
.workbook-root .callout-label {
  font-family: 'Inter', sans-serif; font-weight: 500; font-size: 10px;
  letter-spacing: 0.32em; text-transform: uppercase; color: var(--brass);
  margin-bottom: 12px;
}
.workbook-root .callout p { margin: 0 0 8px 0; }
.workbook-root .callout p em { color: var(--ink); font-style: italic; }

/* Pillar grid */
.workbook-root .pillar-grid {
  display: grid; gap: 1px; background: var(--rule); border: 1px solid var(--rule);
  margin: 48px 0;
}
.workbook-root .pillar-grid.cols-2 { grid-template-columns: 1fr 1fr; }
.workbook-root .pillar-grid.cols-3 { grid-template-columns: repeat(3, 1fr); }
@media (max-width: 720px) {
  .workbook-root .pillar-grid.cols-2,
  .workbook-root .pillar-grid.cols-3 { grid-template-columns: 1fr; }
}
.workbook-root .pillar-cell { background: var(--bone); padding: 28px; }
.workbook-root .pillar-title {
  font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: 20px;
  color: var(--ink); margin: 0 0 8px 0;
}
.workbook-root .pillar-body {
  font-family: 'Inter', sans-serif; font-weight: 300; font-size: 14px;
  line-height: 1.65; color: var(--ink-quiet); margin: 0;
}

/* Framework rows */
.workbook-root .framework-row {
  display: grid; grid-template-columns: 140px 1fr; gap: 32px;
  padding: 32px 0; border-bottom: 1px solid var(--rule-ghost);
}
.workbook-root .framework-row.last { border-bottom: 1px solid var(--rule-ghost); }
.workbook-root .framework-key {
  font-family: 'Inter', sans-serif; font-weight: 500; font-size: 10px;
  letter-spacing: 0.32em; text-transform: uppercase; color: var(--brass);
  padding-top: 4px;
}
.workbook-root .framework-text {
  font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: 22px;
  line-height: 1.4; color: var(--ink); margin: 0 0 8px 0;
}
.workbook-root .framework-text strong { font-weight: 500; color: var(--ink); }
.workbook-root .framework-sub {
  font-family: 'Inter', sans-serif; font-weight: 300; font-size: 14px;
  line-height: 1.65; color: var(--ink-quiet); margin: 0;
}
@media (max-width: 720px) {
  .workbook-root .framework-row { grid-template-columns: 1fr; gap: 12px; }
}

/* Chapter title card */
.workbook-root .chapter-card {
  min-height: 80vh; display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center; padding: 200px 24px;
}
.workbook-root .chapter-fleuron {
  color: var(--brass); font-family: 'Cormorant Garamond', serif; font-size: 20px; margin-bottom: 48px;
}
.workbook-root .chapter-roman {
  font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: 56px;
  color: var(--brass); line-height: 1; margin-bottom: 24px;
}
.workbook-root .chapter-name {
  font-family: 'Inter', sans-serif; font-weight: 500; font-size: 12px;
  letter-spacing: 0.4em; text-transform: uppercase; color: var(--ink); margin-bottom: 32px;
}
.workbook-root .chapter-rule {
  width: 60px; height: 1px; background: var(--brass); margin-bottom: 32px;
}
.workbook-root .chapter-tagline {
  font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 300;
  font-size: 20px; color: var(--ink-quiet); max-width: 420px; line-height: 1.5;
}

/* CTA pill */
.workbook-root .cta-pill {
  display: inline-flex; align-items: center; justify-content: center;
  background: var(--brass); color: var(--bone);
  font-family: 'Inter', sans-serif; font-weight: 500; font-size: 13px;
  letter-spacing: 0.16em; text-transform: uppercase;
  padding: 18px 36px; border-radius: 999px; border: none; cursor: pointer;
  transition: background 200ms ease;
}
.workbook-root .cta-pill:hover { background: var(--brass-deep); }
.workbook-root .cta-secondary {
  display: inline-flex; align-items: center; justify-content: center;
  background: transparent; color: var(--ink); border: 1px solid var(--ink);
  font-family: 'Inter', sans-serif; font-weight: 500; font-size: 12px;
  letter-spacing: 0.16em; text-transform: uppercase;
  padding: 17px 32px; border-radius: 2px; cursor: pointer;
  transition: background 200ms ease;
}
.workbook-root .cta-secondary:hover { background: rgba(28,27,24,0.04); }
.workbook-root .cta-secondary[disabled] { opacity: 0.5; cursor: wait; }

/* Reset focus */
.workbook-root a:focus-visible,
.workbook-root button:focus-visible,
.workbook-root input:focus-visible,
.workbook-root textarea:focus-visible {
  outline: 2px solid var(--brass); outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  html.workbook-html { scroll-behavior: auto; }
  .workbook-root *, .workbook-root *::before, .workbook-root *::after {
    transition: none !important; animation: none !important;
  }
}

/* Print */
@media print {
  .workbook-root { background: white !important; color: black !important; font-size: 11pt; }
  .workbook-root .grain, .workbook-root .topbar, .workbook-root .progress,
  .workbook-root .cta-pill, .workbook-root .cta-secondary,
  .workbook-root .lead-gate { display: none !important; }
  .workbook-root .wb-textarea, .workbook-root .wb-input { border: 1px solid #999; }
  .workbook-root .chapter-card { page-break-after: always; min-height: auto; padding: 80pt 0; }
  @page { margin: 18mm 16mm; }
}

/* Lead gate overlay */
.workbook-root .lead-gate {
  position: fixed; inset: 0; z-index: 100;
  background: rgba(237,231,219,0.96); backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
}
.workbook-root .lead-gate-card {
  background: var(--bone); border: 1px solid var(--rule); border-radius: 2px;
  max-width: 520px; width: 100%; padding: 56px 48px;
}
@media (max-width: 540px) {
  .workbook-root .lead-gate-card { padding: 40px 28px; }
}

/* ---------- Table of Contents ---------- */
.workbook-root .toc {
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
  padding: 48px 0;
  margin: 96px 0;
}
.workbook-root .toc-grid {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 0;
}
@media (max-width: 720px) { .workbook-root .toc-grid { grid-template-columns: 1fr; } }
.workbook-root .toc-row {
  display: grid; grid-template-columns: 28px 1fr auto;
  gap: 16px; align-items: baseline; padding: 14px 24px;
  border-bottom: 1px solid var(--rule-ghost);
  text-decoration: none; color: inherit;
  transition: background 200ms ease;
}
.workbook-root .toc-row:hover { background: var(--brass-ghost); }
.workbook-root .toc-roman {
  font-family: 'Cormorant Garamond', serif; font-style: italic;
  color: var(--brass); font-size: 14px;
}
.workbook-root .toc-name {
  font-family: 'Cormorant Garamond', serif; font-weight: 400;
  font-size: 18px; color: var(--ink);
}
.workbook-root .toc-mini {
  display: block; font-family: 'Inter', sans-serif; font-weight: 300;
  font-size: 11px; color: var(--ink-quiet); letter-spacing: 0.04em;
  margin-top: 2px;
}
.workbook-root .toc-min {
  font-family: 'Inter', sans-serif; font-weight: 500; font-size: 9px;
  letter-spacing: 0.32em; text-transform: uppercase; color: var(--ink-whisper);
}

/* ---------- Section status badge (top of each Part) ---------- */
.workbook-root .status-bar {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 0; margin-bottom: 32px;
  border-top: 1px solid var(--rule-ghost);
  border-bottom: 1px solid var(--rule-ghost);
  font-family: 'Inter', sans-serif; font-size: 9px;
  letter-spacing: 0.32em; text-transform: uppercase; color: var(--ink-whisper);
}
.workbook-root .status-pip {
  display: inline-block; width: 6px; height: 6px;
  background: var(--rule); border-radius: 999px;
}
.workbook-root .status-pip.active { background: var(--brass); }
.workbook-root .status-name { color: var(--ink-quiet); margin-left: auto; font-style: italic; font-family: 'Cormorant Garamond', serif; font-size: 13px; letter-spacing: 0; text-transform: none; }

/* ---------- Outcome card (end-of-section reinforcement) ---------- */
.workbook-root .outcome {
  display: grid; grid-template-columns: 24px 1fr;
  gap: 20px; align-items: start;
  background: var(--bone-deep);
  border: 1px solid var(--rule); border-left: 2px solid var(--brass);
  padding: 24px 28px; margin: 56px 0;
  max-width: 720px;
}
.workbook-root .outcome-mark {
  font-family: 'Cormorant Garamond', serif; font-style: italic;
  color: var(--brass); font-size: 22px; line-height: 1;
}
.workbook-root .outcome-label {
  font-family: 'Inter', sans-serif; font-weight: 500; font-size: 9px;
  letter-spacing: 0.32em; text-transform: uppercase; color: var(--brass);
  margin-bottom: 6px;
}
.workbook-root .outcome-text {
  font-family: 'Cormorant Garamond', serif; font-weight: 300;
  font-size: 19px; line-height: 1.4; color: var(--ink); margin: 0;
}

/* ---------- Before / After split ---------- */
.workbook-root .ba-split {
  display: grid; grid-template-columns: 1fr 1px 1fr;
  margin: 48px 0; border: 1px solid var(--rule);
}
@media (max-width: 720px) {
  .workbook-root .ba-split { grid-template-columns: 1fr; }
  .workbook-root .ba-split .ba-divider { width: 100%; height: 1px; }
}
.workbook-root .ba-side { padding: 28px; }
.workbook-root .ba-divider { background: var(--rule); }
.workbook-root .ba-side h4 {
  font-family: 'Inter', sans-serif; font-weight: 500; font-size: 9px;
  letter-spacing: 0.36em; text-transform: uppercase;
  color: var(--ink-whisper); margin: 0 0 16px 0;
}
.workbook-root .ba-side.after h4 { color: var(--brass); }
.workbook-root .ba-side ul { list-style: none; padding: 0; margin: 0; }
.workbook-root .ba-side li {
  font-family: 'Cormorant Garamond', serif; font-weight: 300;
  font-size: 18px; line-height: 1.4; color: var(--ink); padding: 8px 0;
  border-bottom: 1px solid var(--rule-ghost);
}
.workbook-root .ba-side li:last-child { border-bottom: none; }
.workbook-root .ba-side.before li { color: var(--ink-quiet); text-decoration: line-through; text-decoration-color: var(--rule); }

/* ---------- Stat strip (cover & end metrics) ---------- */
.workbook-root .stat-strip {
  display: grid; grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule);
  margin: 48px 0;
}
@media (max-width: 720px) { .workbook-root .stat-strip { grid-template-columns: 1fr; } }
.workbook-root .stat-cell {
  padding: 32px 24px; text-align: center;
  border-right: 1px solid var(--rule);
}
.workbook-root .stat-cell:last-child { border-right: none; }
@media (max-width: 720px) {
  .workbook-root .stat-cell { border-right: none; border-bottom: 1px solid var(--rule); }
  .workbook-root .stat-cell:last-child { border-bottom: none; }
}
.workbook-root .stat-num {
  font-family: 'Cormorant Garamond', serif; font-weight: 300;
  font-size: 56px; color: var(--brass); line-height: 1; margin-bottom: 12px;
}
.workbook-root .stat-num em { font-style: italic; }
.workbook-root .stat-cap {
  font-family: 'Inter', sans-serif; font-weight: 400; font-size: 12px;
  color: var(--ink-quiet); line-height: 1.5; max-width: 200px; margin: 0 auto;
}

/* ---------- Inline mini diagrams ---------- */
.workbook-root .mini-fig {
  display: flex; flex-direction: column; align-items: center;
  margin: 32px auto; max-width: 480px;
}
.workbook-root .mini-fig-cap {
  font-family: 'Inter', sans-serif; font-weight: 500; font-size: 9px;
  letter-spacing: 0.32em; text-transform: uppercase; color: var(--ink-whisper);
  margin-top: 16px;
}

/* ---------- 3% / 97% bar ---------- */
.workbook-root .market-bar {
  margin: 40px 0;
  border: 1px solid var(--rule); padding: 24px;
}
.workbook-root .market-bar-track {
  display: flex; height: 24px; border: 1px solid var(--brass-line);
  background: var(--bone-shadow); margin-bottom: 16px;
}
.workbook-root .market-bar-3 { width: 3%; background: var(--brass); }
.workbook-root .market-bar-97 { flex: 1; background: transparent; }
.workbook-root .market-legend {
  display: flex; justify-content: space-between;
  font-family: 'Inter', sans-serif; font-size: 11px;
  letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-quiet);
}
.workbook-root .market-legend strong { color: var(--brass); font-weight: 500; }

/* ---------- Compounding sparkline (mini, used inline) ---------- */
.workbook-root .spark {
  display: block; margin: 8px 0; max-width: 100%;
}

/* Tighter reading column spacing in dense sections */
.workbook-root .reading.tight p { margin-bottom: 14px; }
`;

/* ============================================================
 * Ornaments — 48px brass SVGs (36px on mobile via CSS scale)
 * ============================================================ */
const Ornament = ({ children, size = 48 }: { children: ReactNode; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="#8B7A4E"
    strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

const OrnOpenBook = () => (
  <Ornament>
    <path d="M6 14 C 16 12, 22 14, 24 18 C 26 14, 32 12, 42 14 L 42 38 C 32 36, 26 38, 24 42 C 22 38, 16 36, 6 38 Z" />
    <line x1="24" y1="18" x2="24" y2="42" />
  </Ornament>
);
const OrnRuleDiamond = () => (
  <Ornament>
    <line x1="6" y1="24" x2="20" y2="24" />
    <line x1="28" y1="24" x2="42" y2="24" />
    <path d="M24 20 L 28 24 L 24 28 L 20 24 Z" />
  </Ornament>
);
const OrnFourCircles = () => (
  <Ornament>
    <circle cx="18" cy="20" r="9" />
    <circle cx="30" cy="20" r="9" />
    <circle cx="18" cy="30" r="9" />
    <circle cx="30" cy="30" r="9" />
  </Ornament>
);
const OrnCompass = () => (
  <Ornament>
    <circle cx="24" cy="24" r="18" />
    <path d="M24 6 L 26 24 L 24 42 L 22 24 Z" />
    <path d="M6 24 L 24 22 L 42 24 L 24 26 Z" />
  </Ornament>
);
const OrnStar = () => (
  <Ornament>
    <path d="M24 6 L 28 18 L 41 18 L 30 26 L 34 39 L 24 31 L 14 39 L 18 26 L 7 18 L 20 18 Z" />
  </Ornament>
);
const OrnCrosshair = () => (
  <Ornament>
    <circle cx="24" cy="24" r="16" />
    <circle cx="24" cy="24" r="8" />
    <line x1="24" y1="4" x2="24" y2="16" />
    <line x1="24" y1="32" x2="24" y2="44" />
    <line x1="4" y1="24" x2="16" y2="24" />
    <line x1="32" y1="24" x2="44" y2="24" />
    <circle cx="24" cy="24" r="1.5" fill="#8B7A4E" />
  </Ornament>
);
const OrnCompassVariant = () => (
  <Ornament>
    <circle cx="24" cy="24" r="16" />
    <path d="M24 8 L 27 24 L 24 40 L 21 24 Z" />
    <path d="M8 24 L 24 21 L 40 24 L 24 27 Z" />
    <circle cx="24" cy="24" r="1.5" fill="#8B7A4E" />
  </Ornament>
);
const OrnThreeRings = () => (
  <Ornament>
    <circle cx="18" cy="24" r="10" />
    <circle cx="24" cy="24" r="10" />
    <circle cx="30" cy="24" r="10" />
  </Ornament>
);
const OrnBeacon = () => (
  <Ornament>
    <path d="M24 26 L 18 42 L 30 42 Z" />
    <path d="M14 18 A 12 12 0 0 1 34 18" opacity="0.7" />
    <path d="M10 12 A 18 18 0 0 1 38 12" opacity="0.4" />
    <circle cx="24" cy="22" r="1.5" fill="#8B7A4E" />
  </Ornament>
);
const OrnChain = () => (
  <Ornament>
    <rect x="2" y="20" width="8" height="8" />
    <rect x="12" y="20" width="8" height="8" />
    <rect x="22" y="20" width="8" height="8" />
    <rect x="32" y="20" width="8" height="8" />
    <rect x="38" y="20" width="8" height="8" />
    <line x1="10" y1="24" x2="12" y2="24" />
    <line x1="20" y1="24" x2="22" y2="24" />
    <line x1="30" y1="24" x2="32" y2="24" />
  </Ornament>
);
const OrnMagnifier = () => (
  <Ornament>
    <circle cx="20" cy="20" r="11" />
    <line x1="28" y1="28" x2="40" y2="40" />
  </Ornament>
);
const OrnHorizon = () => (
  <Ornament>
    <line x1="8" y1="14" x2="40" y2="14" opacity="0.4" />
    <line x1="10" y1="24" x2="38" y2="24" opacity="0.7" />
    <line x1="6" y1="34" x2="42" y2="34" opacity="1" />
  </Ornament>
);
const OrnArrow = () => (
  <Ornament>
    <line x1="6" y1="24" x2="38" y2="24" />
    <path d="M32 18 L 42 24 L 32 30" />
    <line x1="6" y1="20" x2="6" y2="28" />
  </Ornament>
);

/* ============================================================
 * Volume mark + Cover sigil
 * ============================================================ */
const VolumeMark = () => (
  <div style={{ position: "absolute", top: 64, left: 64, zIndex: 5 }}>
    <div style={{
      width: 48, height: 48, border: "1px solid #8B7A4E",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "Cormorant Garamond, serif", fontWeight: 500,
      fontSize: 16, color: "#8B7A4E", letterSpacing: "0.06em",
    }}>PFG</div>
    <div style={{ marginTop: 12, fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 10, letterSpacing: "0.36em", textTransform: "uppercase", color: "#8B7A4E" }}>VOL · I</div>
    <div style={{ marginTop: 4, fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 9, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--ink-quiet)" }}>The Pasted Library</div>
    <div style={{ marginTop: 4, fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 9, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--ink-whisper)" }}>MMXXVI</div>
  </div>
);

const CoverSigil = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#8B7A4E" strokeWidth="1" aria-hidden="true">
    <rect x="4" y="4" width="56" height="56" rx="1" />
    <text x="32" y="28" textAnchor="middle" fontFamily="Cormorant Garamond" fontSize="18" fontWeight="500" fill="#8B7A4E">PF</text>
    <line x1="12" y1="34" x2="52" y2="34" strokeWidth="0.5" />
    <text x="32" y="48" textAnchor="middle" fontFamily="Inter" fontSize="8" letterSpacing="2" fill="#8B7A4E">VOL · I</text>
  </svg>
);

/* ============================================================
 * Figure plates
 * ============================================================ */
const Figure01Ikigai = () => (
  <div className="figure">
    <svg viewBox="0 0 480 480" width="100%" style={{ display: "block", maxWidth: 520, margin: "0 auto" }} aria-hidden="true">
      <g fill="none" stroke="#8B7A4E" strokeWidth="1" opacity="0.55">
        <circle cx="180" cy="180" r="130" />
        <circle cx="300" cy="180" r="130" />
        <circle cx="180" cy="300" r="130" />
        <circle cx="300" cy="300" r="130" />
      </g>
      <g fontFamily="Inter, sans-serif" fontSize="10" letterSpacing="2" fill="#726B5E" textAnchor="middle">
        <text x="80" y="60">WHAT YOU LOVE</text>
        <text x="400" y="60">WORLD-CLASS AT</text>
        <text x="80" y="430">PATIENTS NEED</text>
        <text x="400" y="430">COMMANDS PREMIUM</text>
      </g>
      <g fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontSize="22" fill="#8B7A4E" textAnchor="middle">
        <text x="240" y="232">Your</text>
        <text x="240" y="260">Reason</text>
        <text x="240" y="288">to Pull.</text>
      </g>
    </svg>
    <div className="figure-caption">FIGURE 01 · THE DENTIST'S IKIGAI</div>
  </div>
);

const Figure02Architecture = () => {
  const parts = [
    { name: "Positioning", roman: "I" },
    { name: "Point of View", roman: "II" },
    { name: "Experience", roman: "III" },
    { name: "Signal", roman: "IV" },
    { name: "System", roman: "V" },
  ];
  return (
    <div className="figure">
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <span className="numeral" style={{ color: "#8B7A4E" }}>THE ARCHITECTURE</span>
      </div>
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <div style={{ position: "absolute", top: 0, bottom: 0, width: 1, background: "#8B7A4E", left: "50%" }} />
        {parts.map((p) => (
          <div key={p.roman} style={{
            position: "relative", zIndex: 1, background: "var(--bone)",
            border: "1px solid #8B7A4E", borderRadius: 2,
            width: 280, height: 56, display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 20px",
          }}>
            <span style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 400, fontSize: 18, color: "var(--ink)" }}>
              {p.name}
            </span>
            <span style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", color: "#8B7A4E", fontSize: 14 }}>
              {p.roman}
            </span>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 24 }}>
        <span className="numeral" style={{ color: "#8B7A4E" }}>THE ASSET</span>
      </div>
      <div className="figure-caption" style={{ marginTop: 24 }}>FIGURE 02 · THE FIVE-PART ARCHITECTURE</div>
    </div>
  );
};

const Figure03Journey = () => {
  const steps = ["AD", "WEBSITE", "CONSULT", "PLAN", "FOLLOW-UP", "REVEAL", "REVIEW", "REFERRAL"];
  return (
    <div className="figure">
      <div style={{ overflowX: "auto", paddingBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 700 }}>
          {steps.map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.2em", color: "var(--ink)", fontWeight: 500 }}>
                  {s}
                </div>
                <div style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", color: "#8B7A4E", fontSize: 12, marginTop: 4 }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              {i < steps.length - 1 && (
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 32, height: 1, background: "#8B7A4E" }} />
                  <span style={{ color: "#8B7A4E", fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: 14 }}>⟶</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="figure-caption" style={{ marginTop: 24 }}>FIGURE 03 · THE PATIENT JOURNEY</div>
    </div>
  );
};

const Figure04Compounding = () => (
  <div className="figure">
    <svg viewBox="0 0 480 320" width="100%" style={{ display: "block", maxWidth: 520, margin: "0 auto" }} aria-hidden="true">
      <g fill="none" stroke="#8B7A4E" strokeWidth="1">
        <circle cx="120" cy="220" r="140" opacity="0.4" />
        <circle cx="120" cy="220" r="100" opacity="0.6" />
        <circle cx="120" cy="220" r="60" opacity="0.85" />
      </g>
      <circle cx="120" cy="220" r="3" fill="#8B7A4E" />
      <g fontFamily="Inter, sans-serif" fontSize="9" letterSpacing="1.5" fill="#726B5E">
        <text x="124" y="210">YEAR 1</text>
        <text x="184" y="210">YEAR 2</text>
        <text x="224" y="210">YEAR 3</text>
        <text x="264" y="210">YEAR 5</text>
      </g>
      <line x1="80" y1="280" x2="420" y2="40" stroke="#8B7A4E" strokeWidth="1" strokeDasharray="3 4" />
      <text x="430" y="44" fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontSize="12" fill="#8B7A4E">PULL →</text>
    </svg>
    <div className="figure-caption">FIGURE 04 · THE COMPOUNDING EFFECT</div>
  </div>
);

/* ============================================================
 * Visual primitives — for retention & visual density
 * ============================================================ */

const TOC_ITEMS: Array<{ id: string; roman: string; name: string; mini: string; min: string }> = [
  { id: "prelude", roman: "—", name: "Prelude", mini: "Why becoming, not rebuilding.", min: "8 min" },
  { id: "premise", roman: "00", name: "The Premise", mini: "Your office is not your brand.", min: "5 min" },
  { id: "foundation", roman: "—", name: "Foundation · Ikigai", mini: "Twelve questions. One sentence.", min: "20 min" },
  { id: "compass", roman: "—", name: "Compass", mini: "Vision & mission.", min: "6 min" },
  { id: "values", roman: "—", name: "Values", mini: "Five filters you defend.", min: "5 min" },
  { id: "positioning", roman: "I", name: "Positioning", mini: "Becoming known.", min: "10 min" },
  { id: "pov", roman: "II", name: "Point of View", mini: "Becoming believed.", min: "8 min" },
  { id: "experience", roman: "III", name: "Experience", mini: "Becoming felt.", min: "6 min" },
  { id: "signal", roman: "IV", name: "Signal", mini: "Becoming seen.", min: "8 min" },
  { id: "system", roman: "V", name: "System", mini: "Becoming undeniable.", min: "10 min" },
  { id: "diagnostic", roman: "—", name: "Three-Question Test", mini: "Before you spend another dollar.", min: "3 min" },
  { id: "horizon", roman: "—", name: "Horizon · 10·3·1·90", mini: "Twelve goals. Four horizons.", min: "8 min" },
];

const TableOfContents = () => (
  <div className="toc">
    <div style={{ textAlign: "center", marginBottom: 32 }}>
      <span className="numeral">The Volume · Twelve Sections · ~90 Minutes</span>
    </div>
    <div className="toc-grid">
      {TOC_ITEMS.map((item) => (
        <a key={item.id} href={`#${item.id}`} className="toc-row">
          <span className="toc-roman">{item.roman}</span>
          <span>
            <span className="toc-name">{item.name}</span>
            <span className="toc-mini">{item.mini}</span>
          </span>
          <span className="toc-min">{item.min}</span>
        </a>
      ))}
    </div>
  </div>
);

const StatusBar = ({ active }: { active: 1 | 2 | 3 | 4 | 5 }) => {
  const names = ["Positioning", "Point of View", "Experience", "Signal", "System"];
  const romans = ["I", "II", "III", "IV", "V"];
  return (
    <div className="status-bar">
      <span>Architecture</span>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={`status-pip${n === active ? " active" : ""}`} />
      ))}
      <span className="status-name">{`Part ${romans[active - 1]} · ${names[active - 1]}`}</span>
    </div>
  );
};

const Outcome = ({ label = "What this earns you", children }: { label?: string; children: ReactNode }) => (
  <div className="outcome">
    <div className="outcome-mark">✦</div>
    <div>
      <div className="outcome-label">{label}</div>
      <p className="outcome-text">{children}</p>
    </div>
  </div>
);

type BeforeAfterProps = { before: string[]; after: string[]; beforeLabel?: string; afterLabel?: string };
const BeforeAfter = ({ before, after, beforeLabel = "Without", afterLabel = "With" }: BeforeAfterProps) => (
  <div className="ba-split">
    <div className="ba-side before">
      <h4>{beforeLabel}</h4>
      <ul>{before.map((t) => <li key={t}>{t}</li>)}</ul>
    </div>
    <div className="ba-divider" />
    <div className="ba-side after">
      <h4>{afterLabel}</h4>
      <ul>{after.map((t) => <li key={t}>{t}</li>)}</ul>
    </div>
  </div>
);

type Stat = { num: string; cap: string };
const StatStrip = ({ stats }: { stats: Stat[] }) => (
  <div className="stat-strip">
    {stats.map((s, i) => (
      <div key={i} className="stat-cell">
        <div className="stat-num" dangerouslySetInnerHTML={{ __html: s.num }} />
        <div className="stat-cap">{s.cap}</div>
      </div>
    ))}
  </div>
);

const MarketBar = () => (
  <div className="market-bar" aria-label="3 percent in-market, 97 percent conditioning">
    <div className="market-bar-track">
      <div className="market-bar-3" />
      <div className="market-bar-97" />
    </div>
    <div className="market-legend">
      <span><strong>3% in-market.</strong> Sell.</span>
      <span>97% future market. <strong>Condition.</strong></span>
    </div>
  </div>
);

const Sparkline = () => (
  <svg viewBox="0 0 400 80" className="spark" aria-hidden="true">
    <line x1="0" y1="60" x2="400" y2="60" stroke="#C7BEA8" strokeWidth="0.5" />
    <path d="M 0 65 Q 100 64 160 56 T 280 32 T 400 6" fill="none" stroke="#8B7A4E" strokeWidth="1.25" />
    <circle cx="0" cy="65" r="2" fill="#8B7A4E" />
    <circle cx="400" cy="6" r="2.5" fill="#8B7A4E" />
    <text x="6" y="78" fontFamily="Inter, sans-serif" fontSize="8" letterSpacing="2" fill="#A59E8E">YEAR 1</text>
    <text x="370" y="78" fontFamily="Inter, sans-serif" fontSize="8" letterSpacing="2" fill="#8B7A4E">YEAR 5</text>
  </svg>
);

/* ============================================================
 * Workbook field components
 * ============================================================ */
type WBProps = {
  num: string;
  fieldKey: string;
  question: string;
  hint?: string;
  placeholder?: string;
  inputType?: "input" | "textarea";
  minHeight?: number;
  accent?: boolean;
  values: Values;
  onChange: (k: string, v: string) => void;
};

const WorkbookBlock = ({ num, fieldKey, question, hint, placeholder, inputType = "textarea", minHeight = 100, accent, values, onChange }: WBProps) => {
  const [focused, setFocused] = useState(false);
  const value = values[fieldKey] || "";
  const filled = value.trim().length > 0;
  const cls = `wb-card${filled ? " filled" : ""}${accent ? " accent" : ""}${focused ? " focused" : ""}`;
  const id = `wb-${fieldKey}`;
  return (
    <div className={cls}>
      <label htmlFor={id} className="wb-question">
        <span className="wb-num">{num}</span>
        {question}
      </label>
      {hint && <p className="wb-hint">{hint}</p>}
      {inputType === "input" ? (
        <input
          id={id} type="text" className="wb-input"
          value={value} placeholder={placeholder}
          onChange={(e) => onChange(fieldKey, e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        />
      ) : (
        <textarea
          id={id} className="wb-textarea"
          style={{ minHeight }}
          value={value} placeholder={placeholder}
          onChange={(e) => onChange(fieldKey, e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        />
      )}
    </div>
  );
};

const NumberedStack = ({ count, keyPrefix, placeholders = [], values, onChange }: {
  count: number; keyPrefix: string; placeholders?: string[];
  values: Values; onChange: (k: string, v: string) => void;
}) => (
  <div style={{ marginBottom: 32, borderTop: "1px solid var(--rule)" }}>
    {Array.from({ length: count }).map((_, i) => {
      const k = `${keyPrefix}_${i + 1}`;
      return (
        <div key={k} className="ruled-row">
          <span className="ruled-num">{String(i + 1).padStart(2, "0")}</span>
          <input
            className="ruled-input" type="text"
            value={values[k] || ""}
            placeholder={placeholders[i] || ""}
            onChange={(e) => onChange(k, e.target.value)}
          />
        </div>
      );
    })}
  </div>
);

/* ============================================================
 * Section wrapper
 * ============================================================ */
const Section = ({ id, masthead, ornament, children }: {
  id: string; masthead: string; ornament: ReactNode; children: ReactNode;
}) => (
  <section id={id} className="workbook-section">
    <div className="masthead">
      <span>THE PASTED LIBRARY · VOL. I</span>
      <span>{masthead}</span>
    </div>
    <div className="chapter-ornament">{ornament}</div>
    {children}
  </section>
);

const ChapterCard = ({ roman, name, tagline }: { roman: string; name: string; tagline: string }) => (
  <div className="chapter-card">
    <div className="chapter-fleuron">✦</div>
    <div className="chapter-roman">{roman}</div>
    <div className="chapter-name">{name}</div>
    <div className="chapter-rule" />
    <div className="chapter-tagline">{tagline}</div>
  </div>
);

const Dots = () => <div className="ornament-dots">· · ·</div>;
const Fleuron = () => <div className="ornament-fleuron">✦</div>;

/* ============================================================
 * Lead Gate
 * ============================================================ */
const LeadGate = ({ lead, onChange, onSubmit, errors }: {
  lead: Lead;
  onChange: (k: keyof Lead, v: string) => void;
  onSubmit: () => void;
  errors: Partial<Record<keyof Lead, string>>;
}) => {
  const inputStyle: CSSProperties = {
    width: "100%", background: "transparent", border: "1px solid var(--rule)",
    borderRadius: 2, padding: "12px 14px",
    fontFamily: "Inter, sans-serif", fontWeight: 300, fontSize: 15,
    color: "var(--ink)", marginTop: 6,
  };
  const labelStyle: CSSProperties = {
    fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 10,
    letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--ink-quiet)",
    display: "block",
  };
  return (
    <div className="lead-gate">
      <div className="lead-gate-card">
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div className="numeral" style={{ marginBottom: 12 }}>VOL · I · ENTRY</div>
          <h3 className="serif" style={{ fontSize: 32, fontWeight: 300, color: "var(--ink)", lineHeight: 1.15 }}>
            Sign the <em style={{ color: "var(--brass)", fontStyle: "italic" }}>register.</em>
          </h3>
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", color: "var(--ink-quiet)", fontSize: 17, marginTop: 12, lineHeight: 1.5 }}>
            The Library is a private series. Add your details to begin reading.
          </p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle} htmlFor="lg-fn">First name *</label>
              <input id="lg-fn" type="text" autoComplete="given-name" style={inputStyle}
                value={lead.first_name} onChange={(e) => onChange("first_name", e.target.value)} />
              {errors.first_name && <div style={{ color: "var(--oxblood)", fontSize: 11, fontStyle: "italic", marginTop: 4 }}>{errors.first_name}</div>}
            </div>
            <div>
              <label style={labelStyle} htmlFor="lg-ln">Last name</label>
              <input id="lg-ln" type="text" autoComplete="family-name" style={inputStyle}
                value={lead.last_name} onChange={(e) => onChange("last_name", e.target.value)} />
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle} htmlFor="lg-em">Email *</label>
            <input id="lg-em" type="email" autoComplete="email" style={inputStyle}
              value={lead.email} onChange={(e) => onChange("email", e.target.value)} />
            {errors.email && <div style={{ color: "var(--oxblood)", fontSize: 11, fontStyle: "italic", marginTop: 4 }}>{errors.email}</div>}
          </div>
          <div style={{ marginBottom: 28 }}>
            <label style={labelStyle} htmlFor="lg-pn">Practice name</label>
            <input id="lg-pn" type="text" style={inputStyle}
              value={lead.practice_name} onChange={(e) => onChange("practice_name", e.target.value)} />
          </div>
          <button type="submit" className="cta-pill" style={{ width: "100%" }}>
            Open the Volume →
          </button>
          <p style={{ textAlign: "center", marginTop: 16, fontSize: 11, color: "var(--ink-whisper)", fontFamily: "Inter, sans-serif" }}>
            Your answers persist in this browser. We never share details.
          </p>
        </form>
      </div>
    </div>
  );
};

/* ============================================================
 * Page
 * ============================================================ */
const BrandAssetWorkbook = () => {
  const [values, setValues] = useState<Values>({});
  const [lead, setLead] = useState<Lead>(emptyLead);
  const [gateUnlocked, setGateUnlocked] = useState(false);
  const [saveState, setSaveState] = useState<"saved" | "saving" | "reset">("saved");
  const [scrollPct, setScrollPct] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [leadErrors, setLeadErrors] = useState<Partial<Record<keyof Lead, string>>>({});
  const debounceRef = useRef<number | null>(null);

  /* Fonts */
  useEffect(() => {
    const id = "workbook-fonts";
    if (!document.getElementById(id)) {
      const l = document.createElement("link");
      l.id = id; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap";
      document.head.appendChild(l);
    }
    document.documentElement.classList.add("workbook-html");
    return () => { document.documentElement.classList.remove("workbook-html"); };
  }, []);

  /* Restore + meta */
  useEffect(() => {
    setValues(loadValues());
    const stored = loadLead();
    setLead(stored);
    if (isLeadValid(stored)) setGateUnlocked(true);
    document.title = "The Art of Becoming · The PASTED Library · Vol. I";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Volume I of The PASTED Library — building your undeniable brand, en route to your dream life, by being you.");
  }, []);

  /* Scroll progress */
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Workbook change (debounced save) */
  const handleChange = useCallback((key: string, val: string) => {
    setValues((prev) => {
      const next = { ...prev, [key]: val };
      setSaveState("saving");
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      debounceRef.current = window.setTimeout(() => {
        saveValues(next); setSaveState("saved");
      }, 400);
      return next;
    });
  }, []);

  /* Lead change */
  const handleLeadChange = useCallback((field: keyof Lead, val: string) => {
    setLead((prev) => {
      const next = { ...prev, [field]: val };
      saveLead(next);
      return next;
    });
    setLeadErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  /* Lead submit (gate) */
  const handleLeadSubmit = useCallback(() => {
    const parsed = leadSchema.safeParse(lead);
    if (!parsed.success) {
      const errs: Partial<Record<keyof Lead, string>> = {};
      parsed.error.issues.forEach((i) => {
        const k = i.path[0] as keyof Lead;
        if (!errs[k]) errs[k] = i.message;
      });
      setLeadErrors(errs);
      return;
    }
    setGateUnlocked(true);
  }, [lead]);

  /* Reset */
  const handleReset = () => {
    if (!window.confirm("Clear all answers? This cannot be undone.")) return;
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    setValues({});
    setSaveState("reset");
    window.setTimeout(() => setSaveState("saved"), 800);
  };

  /* CTA tracking helpers */
  const handleCTA = (placement: "top" | "bottom") => {
    void trackCTAClick({
      ctaId: `library_vol_i_cta_${placement}`,
      ctaText: "Book a Brand Architecture Call",
      section: placement === "top" ? "library_topbar" : "library_footer",
    });
    window.open(PASTED_CALENDLY_URL, "_blank", "noopener,noreferrer");
  };

  /* Export */
  const handleExport = async () => {
    const parsed = leadSchema.safeParse(lead);
    if (!parsed.success) {
      // Should not happen — gate already passed — but guard anyway.
      setGateUnlocked(false);
      return;
    }
    setSubmitting(true);

    try {
      const { error } = await supabase.from("brand_workbook_submissions").insert({
        first_name: parsed.data.first_name,
        last_name: parsed.data.last_name || null,
        email: parsed.data.email,
        practice_name: parsed.data.practice_name || null,
        answers: values,
        source: "library_vol_i_the_art_of_becoming",
        page_url: typeof window !== "undefined" ? window.location.href : null,
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
      });
      if (error) {
        console.error("Workbook submission failed", error);
        toast({
          title: "We couldn't save your submission",
          description: "Your download will continue. Please try again later.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Volume saved",
          description: "Your copy is downloading now.",
        });
      }
    } catch (e) {
      console.error("Workbook submission error", e);
    }

    /* Plain text export */
    const lines: string[] = [];
    lines.push("THE PASTED LIBRARY · VOL. I · THE ART OF BECOMING");
    lines.push("Building your undeniable brand, en route to your dream life, by being you.");
    lines.push("");
    lines.push(`Exported: ${new Date().toLocaleString()}`);
    lines.push(`Prepared for: ${parsed.data.first_name}${parsed.data.last_name ? " " + parsed.data.last_name : ""} · ${parsed.data.email}`);
    if (parsed.data.practice_name) lines.push(`Practice: ${parsed.data.practice_name}`);
    lines.push(""); lines.push("");

    FIELD_MANIFEST.forEach(({ key, label }) => {
      const val = values[key];
      lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      lines.push(label);
      lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      lines.push(val && val.trim() ? val : "— to complete —");
      lines.push(""); lines.push("");
    });

    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "the-art-of-becoming.txt";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setSubmitting(false);
  };

  const saveLabel = saveState === "saving" ? "Saving…" : saveState === "reset" ? "Reset" : "Saved";

  return (
    <>
      <style>{WORKBOOK_CSS}</style>
      <div className="workbook-root">
        <div className="grain" />
        <div className="progress" style={{ width: `${scrollPct}%` }} />

        {/* TOP BAR */}
        <header className="topbar">
          <div className="topbar-inner">
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 500, fontSize: 22, letterSpacing: "0.14em", color: "var(--ink)" }}>
                PASTED
              </span>
              <span style={{ width: 1, height: 24, background: "var(--rule)" }} />
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--ink-quiet)" }}>
                Library · Vol. I
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <button
                onClick={() => handleCTA("top")}
                className="cta-pill"
                style={{ padding: "10px 22px", fontSize: 11, letterSpacing: "0.18em" }}
              >
                Book a Call →
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 5, height: 5, borderRadius: 999, background: saveState === "saving" ? "var(--ink-whisper)" : "var(--brass)", display: "inline-block" }} />
                <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--ink-quiet)" }}>
                  {saveLabel}
                </span>
              </div>
              <button
                onClick={handleReset}
                style={{ background: "transparent", border: "none", color: "var(--ink-whisper)", cursor: "pointer",
                  fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", padding: 0 }}
                onMouseOver={(e) => (e.currentTarget.style.color = "var(--brass)")}
                onMouseOut={(e) => (e.currentTarget.style.color = "var(--ink-whisper)")}
              >
                Reset
              </button>
            </div>
          </div>
        </header>

        {/* COVER */}
        <section style={{ position: "relative", minHeight: "100vh", padding: "0 clamp(28px, 8vw, 120px)", maxWidth: 1200, margin: "0 auto" }}>
          <VolumeMark />

          <div style={{ paddingTop: 180 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 80 }}>
              <span style={{ width: 24, height: 1, background: "var(--brass)" }} />
              <span className="numeral">A PASTED FIELD GUIDE</span>
            </div>

            <h1 className="serif" style={{ marginBottom: 80 }}>
              THE ART OF <em>BECOMING.</em>
            </h1>

            <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontWeight: 300, fontSize: 22, color: "var(--ink-quiet)", maxWidth: 520, lineHeight: 1.5, marginBottom: 120 }}>
              Building your undeniable brand, en route to your dream life, by being you.
            </p>

            {/* Outcome strip */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0,
              borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)",
              maxWidth: 920,
            }} className="cover-strip">
              {[
                { k: "WHAT", v: "What a brand actually is — and what it isn't" },
                { k: "WHERE", v: "What yours is, stated in one sentence" },
                { k: "GAP", v: "What's missing between what you promise and what patients feel" },
                { k: "PULL", v: "How to become undeniable without becoming someone else" },
              ].map((c, i, arr) => (
                <div key={c.k} style={{
                  padding: "32px 24px",
                  borderRight: i < arr.length - 1 ? "1px solid var(--rule)" : "none",
                }}>
                  <div className="numeral" style={{ marginBottom: 12 }}>{c.k}</div>
                  <div style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300, fontSize: 16, lineHeight: 1.4, color: "var(--ink)" }}>
                    {c.v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginTop: 120 }}>
            <CoverSigil />
          </div>

          <div style={{ marginTop: 80, paddingBottom: 40, textAlign: "center" }}>
            <span className="numeral">VOLUME I · FIELD GUIDE · 90 MINUTES · MMXXVI</span>
          </div>
        </section>

        {/* TABLE OF CONTENTS — visual map of the whole volume */}
        <section className="workbook-section" style={{ paddingTop: 64, paddingBottom: 64 }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <span className="numeral" style={{ color: "var(--ink-quiet)" }}>The Map</span>
          </div>
          <h2 className="serif" style={{ textAlign: "center", fontSize: "clamp(32px, 4vw, 44px)", marginBottom: 16 }}>
            What you'll <em>build</em> in this volume.
          </h2>
          <p style={{ textAlign: "center", maxWidth: 560, margin: "0 auto", color: "var(--ink-quiet)", fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: 19 }}>
            Twelve sections. Forty answers. One brand asset.
          </p>
          <TableOfContents />
          <StatStrip stats={[
            { num: "<em>5</em>", cap: "Parts of a real brand asset" },
            { num: "<em>40</em>", cap: "Answers that become your operating doctrine" },
            { num: "<em>3%</em>", cap: "Of your market is in-market right now" },
          ]} />
        </section>

        <Dots />

        {/* PRELUDE */}
        <Section id="prelude" masthead="§ PRELUDE · READ THIS FIRST" ornament={<OrnOpenBook />}>
          <h2 className="serif">This is not a marketing guide. This is the <em>art of becoming.</em></h2>
          <p className="lead" style={{ marginTop: 48 }}>
            Every undeniable practice is the product of a becoming. Not a rebuild. Not a rebrand. A becoming. The deliberate art of arriving at the practice you were always meant to run — fully, unmistakably, as yourself.
          </p>
          <div className="reading">
            <p>Most dentists live inside a sentence that sounds like this. <em>If we get more reviews. If the economy turns. If the new ads work. If patients see the renovation. If the referrals come back.</em></p>
            <p>The practices we admire live inside a different sentence. <em>When the next campaign ships. When the content lands. When the consult converts. When the brand compounds.</em></p>
            <p>The difference between those two sentences is not luck. It is not talent. It is not even spend.</p>
            <p>It is architecture. And before architecture — a becoming.</p>
          </div>

          <blockquote className="pullquote">
            “The undeniable practice turns every <em>if</em> into a <em>when.</em> That is what becoming buys you.”
            <cite>— PASTED HOUSE DOCTRINE</cite>
          </blockquote>

          <div className="reading">
            <p>Dentistry is commoditizing in real time. Chains are scaling. Corporates are buying roll-ups. Private equity is indexing quality and flattening price. Patients are comparing your work to a stranger's in the same scroll, at the same traffic light, in the same two seconds.</p>
            <p>In that market, a good dentist with a nice website is not a brand. It is a line item in somebody else's spreadsheet.</p>
            <p>The only dentists who will get to decide their own terms — their own prices, their own patients, their own pace — are the ones who have become unmistakably themselves, structurally and visibly, in a way the market cannot replace.</p>
          </div>

          <h3 style={{ marginTop: 72, marginBottom: 24 }}>This is how you become undeniable.</h3>
          <div className="reading">
            <p>Not by copying the dentist who is winning this month. Not by hiring the agency that ran the campaign everyone is posting about. Not by renovating your way to a premium position.</p>
            <p>You become undeniable by building a brand asset out of who you already are.</p>
            <p>An asset that earns pull instead of chasing attention. An asset that raises your price while lowering your cost-per-acquisition. An asset that shows up for you in rooms you will never sit in, in conversations you will never hear, in decisions made long before a patient ever fills out your form.</p>
          </div>

          <blockquote className="pullquote">
            “A brand asset is the only thing in your practice that works for you when you are asleep, on holiday, or operating on somebody else.”
            <cite>— THE PASTED LONG VIEW</cite>
          </blockquote>

          <h3 style={{ marginBottom: 24 }}>A note on how to read this.</h3>
          <div className="reading">
            <p>Read it once, fast, without writing anything. Let the argument land. Let the resistance surface. The parts that bristle are the parts doing the most work.</p>
            <p>Then come back to the start and answer everything. Out of order is fine. Imperfect is fine. Changing your mind is expected. The guide saves as you go.</p>
          </div>

          <p style={{ marginTop: 48, fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", color: "var(--oxblood)", fontSize: 19, maxWidth: 620 }}>
            Turn the page. The if-practice stops here. The becoming begins on the other side.
          </p>
        </Section>

        <Dots />

        {/* SECTION 00 */}
        <Section id="premise" masthead="§ 00 · THE PREMISE" ornament={<OrnRuleDiamond />}>
          <div className="numeral" style={{ marginBottom: 12 }}>00 · THE PREMISE</div>
          <h2 className="serif">Your new office is not your <em>brand.</em></h2>
          <p className="lead" style={{ marginTop: 48 }}>
            The highest-performing practices we know are rarely the prettiest. They have something else: a real brand.
          </p>

          <BeforeAfter
            beforeLabel="A spending strategy"
            afterLabel="A brand asset"
            before={[
              "New furniture, TVs, finishes",
              "A new logo every two years",
              "Renovation as differentiation",
              "Aesthetic-first, story-last",
            ]}
            after={[
              "A clear why",
              "A clear story",
              "A clear position",
              "A consistent way of showing work, people, and stance",
            ]}
          />

          <Outcome label="What a brand earns you">
            Pull. The thing patients remember. The thing people say about you when you are not in the room.
          </Outcome>

          <blockquote className="pullquote">
            “That is the difference between buying things and building an asset.”
            <cite>— PASTED HOUSE DOCTRINE</cite>
          </blockquote>

          <p style={{ marginTop: 32, fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", color: "var(--ink-quiet)", fontSize: 19, maxWidth: 620 }}>
            The foundation is your ikigai — the bedrock every undeniable practice is built on.
          </p>
        </Section>

        <Dots />

        {/* CHAPTER CARD · FOUNDATION */}
        <ChapterCard roman="—" name="Foundation" tagline="Before architecture, excavation." />

        {/* FOUNDATION · IKIGAI */}
        <Section id="foundation" masthead="§ FOUNDATION · BEFORE THE FIVE PARTS" ornament={<OrnFourCircles />}>
          <div className="numeral" style={{ marginBottom: 12 }}>FOUNDATION</div>
          <h2 className="serif">The Dentist's <em>Ikigai.</em></h2>
          <p className="lead" style={{ marginTop: 48 }}>
            Ikigai is the Japanese concept for the intersection of four forces: <em>what you love, what the world needs, what you can be paid for, and what you're uniquely excellent at.</em> Where all four overlap is the bedrock an undeniable practice is built on.
          </p>
          <div className="reading">
            <p>You likely already specialize — cosmetic, implants, full arch, ortho. The ikigai is not about choosing a specialty. It is about becoming certain about <em>why</em> you are the one the right patients should come to for it.</p>
          </div>

          <Figure01Ikigai />

          <h3 style={{ marginTop: 48, marginBottom: 12 }}>Answer fast. Edit later.</h3>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "var(--ink-quiet)", maxWidth: 620, marginBottom: 56 }}>
            Your responses save automatically. The strongest insights come in the second or third pass — do not over-polish the first draft.
          </p>

          <span className="sublabel">Circle 01 · What You Love</span>
          <WorkbookBlock num="01" fieldKey="love_1" question="What part of dentistry makes you lose track of time?" hint="The case type, the conversation, the craft — whatever still energizes you on a Friday afternoon." placeholder="When I'm doing ___, I forget to eat lunch." values={values} onChange={handleChange} />
          <WorkbookBlock num="02" fieldKey="love_2" question="If you could only perform three procedures for the rest of your career, which would you choose?" hint="Not the most profitable. The three that feel most like you." placeholder="1.  2.  3." values={values} onChange={handleChange} />
          <WorkbookBlock num="03" fieldKey="love_3" question="What do you refuse to do in your practice — even though it would make money?" hint="The 'no' list defines your brand almost as much as the 'yes' list." placeholder="I don't do ___ because ___" values={values} onChange={handleChange} />

          <span className="sublabel" style={{ marginTop: 64 }}>Circle 02 · What You're World-Class At</span>
          <WorkbookBlock num="04" fieldKey="skill_1" question="What does your best work make possible that average dentistry cannot?" hint="Not 'beautiful smiles.' Specific. The outcome a patient describes to a friend six months later." placeholder="My patients walk away with ___" values={values} onChange={handleChange} />
          <WorkbookBlock num="05" fieldKey="skill_2" question="What is your unique mechanism — the way you do it that others don't?" hint="Technique, technology, process, philosophy — the part of the work you can explain in a way nobody else does." placeholder="Most dentists ___. I ___ instead, because ___" values={values} onChange={handleChange} />
          <WorkbookBlock num="06" fieldKey="skill_3" question="What is the best compliment a patient has ever given you?" hint="Their exact words. Not paraphrased. Almost always a positioning line hiding in plain sight." placeholder="She said, '___'" values={values} onChange={handleChange} />

          <span className="sublabel" style={{ marginTop: 64 }}>Circle 03 · What Your Patients Need</span>
          <WorkbookBlock num="07" fieldKey="need_1" question="Describe the one patient you wish you had more of — like a person, not a demographic." hint="What they do for work. What keeps them up at night. What your work actually changes for them." placeholder="She's 52, runs her own firm, hasn't smiled in photos in a decade…" values={values} onChange={handleChange} />
          <WorkbookBlock num="08" fieldKey="need_2" question="What does that patient not know about their own problem that you wish they did?" hint="The education gap that — once closed — makes them seek you out. This is the core of your content." placeholder="They think it's a cosmetic issue. It's actually a ___" values={values} onChange={handleChange} />
          <WorkbookBlock num="09" fieldKey="need_3" question="What does the market currently misunderstand about cases like yours?" hint="The dominant narrative in dentistry is often wrong for your ICP. What do you disagree with?" placeholder="Everyone says ___. The truth is ___" values={values} onChange={handleChange} />

          <span className="sublabel" style={{ marginTop: 64 }}>Circle 04 · What Commands Premium</span>
          <WorkbookBlock num="10" fieldKey="premium_1" question="What is the full-price, no-discount version of your signature offer?" hint="State the actual price. Premium brands state price upfront. It attracts buyers and repels guppies." placeholder="Full arch, smile design, or signature case — name it and price it." values={values} onChange={handleChange} />
          <WorkbookBlock num="11" fieldKey="premium_2" question="What is the case result you want to be famous for — the work your name should be synonymous with?" hint="When someone in my city needs ___, I want mine to be the first name they hear." placeholder="I want to own the category of ___" values={values} onChange={handleChange} />
          <WorkbookBlock num="12" fieldKey="premium_3" question="Where is your authority currently leaking?" hint="Premium is often blocked by internal permission, not market permission." placeholder="I keep discounting ___. I downplay ___." values={values} onChange={handleChange} />

          <div style={{ marginTop: 72 }}>
            <h3 style={{ marginBottom: 12 }}>Synthesis · Your Reason to Pull</h3>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "var(--ink-quiet)", maxWidth: 620, marginBottom: 24 }}>
              Read your twelve answers. What pattern shows up? Where do all four circles overlap?
            </p>
            <WorkbookBlock
              num="✦" fieldKey="niche_synthesis" accent
              question="Write your one-sentence positioning."
              hint="Template: I help [specific patient] achieve [specific outcome] through [unique mechanism] — for patients who [what makes them different]. Don't worry if it's ugly. Draft it."
              placeholder="I help ___ achieve ___ through ___ — for patients who ___"
              minHeight={140}
              values={values} onChange={handleChange}
            />
          </div>
        </Section>

        <Dots />

        {/* COMPASS */}
        <Section id="compass" masthead="§ COMPASS · DIRECTION BEFORE ARCHITECTURE" ornament={<OrnCompass />}>
          <div className="numeral" style={{ marginBottom: 12 }}>COMPASS</div>
          <h2 className="serif">Your <em>Vision.</em> Your <em>Mission.</em></h2>
          <p className="lead" style={{ marginTop: 48 }}>
            Before the five parts of the brand, lock the two forces that sit above them: where the practice is going, and why it exists.
          </p>
          <div className="reading">
            <p>These are not marketing statements. These are the lines you read back to yourself on a bad Tuesday to remember what you are actually building.</p>
          </div>

          <WorkbookBlock num="✦" fieldKey="vision" question="What is your ten-year vision for the practice?" hint="What does the practice look like, feel like, and mean to the market. One paragraph. No hedging." placeholder="In ten years, my practice is ___" values={values} onChange={handleChange} />
          <WorkbookBlock num="✦" fieldKey="mission" question="What is the practice's mission — beyond dentistry itself?" hint="The bigger reason the doors are open. The thing your best patients get from you that is not technically a dental outcome." placeholder="We exist to ___" values={values} onChange={handleChange} />
        </Section>

        <Dots />

        {/* VALUES */}
        <Section id="values" masthead="§ VALUES · WHAT YOU DEFEND" ornament={<OrnStar />}>
          <div className="numeral" style={{ marginBottom: 12 }}>VALUES</div>
          <h2 className="serif">Five <em>Practice Values.</em></h2>
          <p className="lead" style={{ marginTop: 48 }}>
            A brand's values are not poster words. They are the filters that decide which patients you take, which cases you refuse, how your team speaks, and what you say no to when the money is on the table.
          </p>
          <div className="reading">
            <p>Write five. Not ten. Five is a discipline — it forces you to pick. Each value should be one or two words a team can recite and a patient could feel in five minutes.</p>
          </div>
          <span className="sublabel" style={{ marginTop: 32 }}>Practice Values</span>
          <NumberedStack
            count={5} keyPrefix="value"
            placeholders={[
              "e.g., Subtlety",
              "e.g., Craftsmanship",
              "e.g., No cookie-cutter cases",
              "e.g., Honest over optimistic",
              "e.g., Function before aesthetics",
            ]}
            values={values} onChange={handleChange}
          />
        </Section>

        <Dots />

        {/* TRANSITION */}
        <section className="workbook-section" style={{ textAlign: "center" }}>
          <h2 className="serif" style={{ margin: "0 auto 32px", maxWidth: 800 }}>
            A real brand is not a logo. <em>It is five things working together.</em>
          </h2>
          <p style={{ margin: "0 auto", maxWidth: 600, color: "var(--ink-quiet)" }}>
            Everything above this line is raw material. Everything below turns it into an asset — something that pulls, compounds, and tells patients who you are before you say a word.
          </p>
          <Figure02Architecture />
        </section>

        <Fleuron />

        {/* CHAPTER CARD · I */}
        <ChapterCard roman="I" name="Positioning" tagline="Becoming known." />

        {/* PART I */}
        <Section id="positioning" masthead="§ I · POSITIONING" ornament={<OrnCrosshair />}>
          <StatusBar active={1} />
          <div className="numeral" style={{ marginBottom: 12 }}>PART I</div>
          <h2 className="serif"><em>Positioning.</em></h2>
          <p className="lead" style={{ marginTop: 48 }}>
            You already specialize. The question is whether the market knows <em>how you own it.</em>
          </p>
          <div className="reading tight">
            <p>“Cosmetic” is a category. <em>“The dentist high-profile patients are sent to when nobody can know they had work done”</em> is a position.</p>
          </div>

          <h3 style={{ marginTop: 56, marginBottom: 16 }}>Call out a state, not a job title.</h3>
          <BeforeAfter
            beforeLabel="Weak call-out"
            afterLabel="Strong call-out"
            before={[
              "Executives over 50",
              "Professionals who want better smiles",
              "Anyone interested in cosmetic dentistry",
            ]}
            after={[
              "The founder whose smile hasn't kept up with the life they've built",
              "The woman who hasn't smiled in a photo since her divorce",
              "The patient who has been quoted three times and trusted no one",
            ]}
          />

          <h3 style={{ marginTop: 56, marginBottom: 16 }}>The 3% In-Market Rule</h3>
          <p style={{ maxWidth: 620 }}>Only 3% of your market is ready to buy today. Speak to them with precision. Condition the other 97% for their moment.</p>
          <MarketBar />

          <Outcome label="Why this matters">
            Pull comes from being unmistakable to the 3% — and unforgettable to the 97% before they ever enter the window.
          </Outcome>

          <WorkbookBlock num="✦" fieldKey="callouts" question="Write three descriptive call-outs for your 3%." hint="Each should describe a state or self-perception, not a demographic." placeholder={"1. For the woman who…\n2. For the man who…\n3. For the patient who…"} minHeight={130} values={values} onChange={handleChange} />

          <span className="sublabel" style={{ marginTop: 72 }}>Capstone · The Practice Marketing System</span>
          <p style={{ maxWidth: 620, marginBottom: 24 }}>Four lines that define the commercial engine of your brand. The most-used page of this guide.</p>
          <WorkbookBlock num="01" fieldKey="ms_patient" inputType="input" question="Ideal Patient" hint="One vivid sentence. A person, not a demographic." placeholder="The ___ who ___" values={values} onChange={handleChange} />
          <WorkbookBlock num="02" fieldKey="ms_differentiators" question="Three Differentiators" hint="In the patient's language. Not credentials or equipment." placeholder={"1. ___\n2. ___\n3. ___"} minHeight={140} values={values} onChange={handleChange} />
          <WorkbookBlock num="03" fieldKey="ms_experience" question="Signature Experience" hint="The 3–5 step process. Named, repeatable, ownable." placeholder="Step 1 ___. Step 2 ___. Step 3 ___." minHeight={100} values={values} onChange={handleChange} />
          <WorkbookBlock num="04" fieldKey="ms_promise" inputType="input" question="The Promise" hint="The outcome your brand stakes its name on." placeholder="Every patient walks away with ___" values={values} onChange={handleChange} />
        </Section>

        <Dots />

        {/* CHAPTER CARD · II */}
        <ChapterCard roman="II" name="Point of View" tagline="Becoming believed." />

        {/* PART II */}
        <Section id="pov" masthead="§ II · POINT OF VIEW" ornament={<OrnCompassVariant />}>
          <StatusBar active={2} />
          <div className="numeral" style={{ marginBottom: 12 }}>PART II</div>
          <h2 className="serif"><em>Point of View.</em></h2>
          <p className="lead" style={{ marginTop: 48 }}>Strong brands have opinions. Weak brands list services.</p>

          <div className="callout" style={{ marginTop: 32 }}>
            <div className="callout-label">Five real points of view</div>
            <p><em>We don't do cookie-cutter veneers.</em></p>
            <p><em>Subtlety over Hollywood.</em></p>
            <p><em>Function before aesthetics.</em></p>
            <p><em>If it doesn't look like it belongs in your face, we don't do it.</em></p>
            <p><em>Age-appropriate or nothing.</em></p>
          </div>

          <Outcome label="What a real POV earns you">
            Case value rises. Price sensitivity drops. You stop competing.
          </Outcome>

          <h3 style={{ marginTop: 56, marginBottom: 24 }}>The Signature Story · four layers</h3>
          <div style={{ marginBottom: 56 }}>
            {[
              { k: "Origin", t: "Why this practice exists.", s: "The reason you opened the doors." },
              { k: "Continuity", t: "What's been true the whole time.", s: "Specifics, not decades." },
              { k: "Mechanism", t: "The way you do it that others don't.", s: "Named. Owned. Repeatable." },
              { k: "Promise", t: "What the patient walks away with.", s: "The identity shift, not the procedure.", last: true },
            ].map((r) => (
              <div key={r.k} className={`framework-row${r.last ? " last" : ""}`}>
                <div className="framework-key">{r.k}</div>
                <div>
                  <p className="framework-text"><strong>{r.t}</strong></p>
                  <p className="framework-sub">{r.s}</p>
                </div>
              </div>
            ))}
          </div>

          <WorkbookBlock num="✦" fieldKey="pov_statement" inputType="input" question='Write one sentence: "We believe ______."' hint="This sentence drives content, messaging, pricing, and differentiation for the next decade." placeholder="We believe ___" values={values} onChange={handleChange} />
          <WorkbookBlock num="✦" fieldKey="story" question="Draft your signature story in four lines." hint="One line per layer. Short. Specific." placeholder={"Origin:\nContinuity:\nMechanism:\nPromise:"} minHeight={160} values={values} onChange={handleChange} />
        </Section>

        <Dots />

        {/* CHAPTER CARD · III */}
        <ChapterCard roman="III" name="Experience" tagline="Becoming felt." />

        {/* PART III */}
        <Section id="experience" masthead="§ III · EXPERIENCE" ornament={<OrnThreeRings />}>
          <StatusBar active={3} />
          <div className="numeral" style={{ marginBottom: 12 }}>PART III</div>
          <h2 className="serif"><em>Experience.</em></h2>
          <p className="lead" style={{ marginTop: 48 }}>
            Your brand is not what your Instagram says. It is what happens next.
          </p>

          <BeforeAfter
            beforeLabel="Brand collapses when…"
            afterLabel="Brand holds when…"
            before={[
              "The ad promises bespoke. The follow-up is a 9am template.",
              "The website says luxury. The consult feels rushed.",
              "The photography is gallery. The waiting room is brochure.",
            ]}
            after={[
              "Every touchpoint sounds like the same person.",
              "Tone, palette, and pace are defended on every channel.",
              "What you let through matches what you promised.",
            ]}
          />

          <h3 style={{ marginTop: 56, marginBottom: 16 }}>The Six-Touchpoint Audit</h3>
          <p style={{ maxWidth: 620 }}>Walk your own practice like a patient. Score each.</p>

          <div className="pillar-grid cols-3">
            {[
              { t: "Website tone", b: "Sounds like you, or your competitor?" },
              { t: "Front desk", b: "Same person the website promised?" },
              { t: "Consult", b: "Bespoke or processed?" },
              { t: "Follow-up", b: "Carries the brand or breaks it?" },
              { t: "Photography", b: "Gallery, or brochure?" },
              { t: "Space", b: "Matches the tier of work?" },
            ].map((p) => (
              <div key={p.t} className="pillar-cell">
                <div className="pillar-title">{p.t}</div>
                <p className="pillar-body">{p.b}</p>
              </div>
            ))}
          </div>

          <Outcome label="The cost of inconsistency">
            One break in the chain is the fastest way to lose a $60k case.
          </Outcome>

          <WorkbookBlock num="✦" fieldKey="experience_gap" question="Where does your brand currently collapse?" hint="The gap between what you promise publicly and what a patient experiences privately. Be brutal." placeholder="The ad says ___. The consult feels ___." minHeight={120} values={values} onChange={handleChange} />
        </Section>

        <Dots />

        {/* CHAPTER CARD · IV */}
        <ChapterCard roman="IV" name="Signal" tagline="Becoming seen." />

        {/* PART IV */}
        <Section id="signal" masthead="§ IV · SIGNAL" ornament={<OrnBeacon />}>
          <StatusBar active={4} />
          <div className="numeral" style={{ marginBottom: 12 }}>PART IV</div>
          <h2 className="serif"><em>Signal.</em></h2>
          <p className="lead" style={{ marginTop: 48 }}>Content guided by positioning. Not content for its own sake.</p>

          <BeforeAfter
            beforeLabel="Weak signal"
            afterLabel="Strong signal"
            before={[
              "Random before/after",
              "“Happy Monday”",
              "Generic dental tips",
              "Trend-chasing posts",
            ]}
            after={[
              "Philosophy pieces",
              "Patient stories",
              "Lifestyle transformation",
              "Authority commentary on your category",
            ]}
          />

          <h3 style={{ marginTop: 56, marginBottom: 16 }}>The Four Quadrants of Signal</h3>
          <p style={{ maxWidth: 620 }}>Every piece maps to one. Together they cover the full psychology of an in-market buyer.</p>

          <div className="pillar-grid cols-2">
            {[
              { t: "01 · Questions", b: "What patients ask you directly. High-volume, broad, educational." },
              { t: "02 · Questions from Questions", b: "Follow-ups patients only ask after the first answer." },
              { t: "03 · Objections", b: "Address the silent no before it forms. Price, fear, time, past experience." },
              { t: "04 · Expectations", b: "What the experience will feel like. Pre-sells the close." },
            ].map((p) => (
              <div key={p.t} className="pillar-cell">
                <div className="pillar-title">{p.t}</div>
                <p className="pillar-body">{p.b}</p>
              </div>
            ))}
          </div>

          <Outcome label="The Posting Filter">
            Before posting anything, ask: <em>Does this reinforce what we're known for?</em> If not, don't post.
          </Outcome>

          <WorkbookBlock num="✦" fieldKey="quadrants" question="Write one content idea in each of the four quadrants." hint="Specific enough to film tomorrow." placeholder={"Questions:\nQuestions from Questions:\nObjections:\nExpectations:"} minHeight={180} values={values} onChange={handleChange} />
        </Section>

        <Dots />

        {/* CHAPTER CARD · V */}
        <ChapterCard roman="V" name="System" tagline="Becoming undeniable." />

        {/* PART V */}
        <Section id="system" masthead="§ V · SYSTEM" ornament={<OrnChain />}>
          <div className="numeral" style={{ marginBottom: 12 }}>PART V</div>
          <h2 className="serif"><em>System.</em></h2>
          <p className="lead" style={{ marginTop: 48 }}>
            Pull happens when all five parts carry the same signal. This is the piece most dentists miss.
          </p>
          <div className="reading">
            <p>A brand must carry through: ads, website, consult, pricing, photography, messaging, follow-up, reviews, referral scripts, even the invoice. If one breaks, trust drops. If trust drops, price drops. If price drops, you are back to competing.</p>
            <p>The system is what makes the whole architecture compound instead of leak.</p>
          </div>

          <h3 style={{ marginTop: 56, marginBottom: 16 }}>The Patient Journey Map</h3>
          <div className="reading">
            <p>Walk the journey. End to end. Every message, every screen, every human interaction.</p>
          </div>

          <Figure03Journey />

          <div className="reading">
            <p>At each step, ask: Does the message match the one before it? Does the tone match the positioning? Does the point of view come through? Does the experience hold up?</p>
          </div>

          <h3 style={{ marginTop: 56, marginBottom: 16 }}>The Compounding Effect</h3>
          <div className="reading">
            <p>When the system holds, three things happen together:</p>
          </div>

          <div style={{ marginTop: 24, marginBottom: 56 }}>
            {[
              { k: "Recognition", t: "The market knows who you are before you speak.", s: "Your visuals, voice, and call-outs are distinct enough that a patient recognizes your ad in the scroll without reading a word." },
              { k: "Conditioning", t: "The 97% is being trained for their moment.", s: "Every piece of content a non-buyer consumes pre-frames their eventual purchase. When they enter the 3%, you are already the default answer." },
              { k: "Concentration", t: "Affluent patients tell affluent patients.", s: "Referral quality improves. Pricing power improves. The funnel gets more efficient as the brand matures.", last: true },
            ].map((r) => (
              <div key={r.k} className={`framework-row${r.last ? " last" : ""}`}>
                <div className="framework-key">{r.k}</div>
                <div>
                  <p className="framework-text"><strong>{r.t}</strong></p>
                  <p className="framework-sub">{r.s}</p>
                </div>
              </div>
            ))}
          </div>

          <Figure04Compounding />

          <blockquote className="pullquote">
            “A practice can take 20 years to build. A brand, built correctly, can be built in 24 months and then compound indefinitely.”
            <cite>— THE PASTED LONG VIEW</cite>
          </blockquote>

          <WorkbookBlock num="✦" fieldKey="journey_map" question="Map your patient journey in one line." hint="Ad → Website → Consult → Follow-up. Then circle the weakest link. That is where the brand is leaking." placeholder="Ad → ___ → ___ → ___. Weakest link: ___" minHeight={100} values={values} onChange={handleChange} />
          <WorkbookBlock num="✦" fieldKey="weakest_part" question="Which of the five parts is weakest in your practice today?" hint="Honest answer. Not the one you want to fix — the one you have been avoiding." placeholder="Part ___. Because ___" minHeight={100} values={values} onChange={handleChange} />
        </Section>

        <Dots />

        {/* THREE-QUESTION TEST */}
        <Section id="diagnostic" masthead="§ DIAGNOSTIC · BEFORE YOU SPEND ANOTHER DOLLAR" ornament={<OrnMagnifier />}>
          <div className="numeral" style={{ marginBottom: 12 }}>DIAGNOSTIC</div>
          <h2 className="serif">The <em>Three-Question Test.</em></h2>
          <div className="reading" style={{ marginTop: 48 }}>
            <p>Before you spend another dollar on a logo, a website redesign, a new photographer, or a new office — answer these three:</p>
          </div>

          <WorkbookBlock num="01" fieldKey="test_1" inputType="input" question="Who are we for?" placeholder="We are for ___" values={values} onChange={handleChange} />
          <WorkbookBlock num="02" fieldKey="test_2" inputType="input" question="What do we believe?" placeholder="We believe ___" values={values} onChange={handleChange} />
          <WorkbookBlock num="03" fieldKey="test_3" inputType="input" question="What experience do we want to be known for?" placeholder="We want to be known for ___" values={values} onChange={handleChange} />

          <div className="reading" style={{ marginTop: 48 }}>
            <p style={{ fontStyle: "italic", color: "var(--ink-quiet)" }}>If you cannot answer those in one sentence each — your logo does not matter, and neither does your renovation. You do not need a rebrand. You need clarity.</p>
            <p style={{ fontStyle: "italic", color: "var(--ink-quiet)" }}>The logo is just the signature. The brand is the story. The story is what pulls.</p>
          </div>
        </Section>

        <Dots />

        {/* HORIZON */}
        <Section id="horizon" masthead="§ HORIZON · THE 10 · 3 · 1 · 90 VISION" ornament={<OrnHorizon />}>
          <div className="numeral" style={{ marginBottom: 12 }}>HORIZON</div>
          <h2 className="serif">Build the ten-year brand by starting with the next <em>ninety days.</em></h2>
          <p className="lead" style={{ marginTop: 48 }}>
            Where are you in ten years, in three years, in one year — and what must be true by the end of the next ninety days to make it possible?
          </p>
          <div className="reading">
            <p>For each horizon, write 3 specific goals. Not themes. Not aspirations. Concrete, measurable, or verifiable outcomes a patient, employee, or bank manager could confirm.</p>
          </div>

          <span className="sublabel" style={{ marginTop: 48 }}>Ten-Year Horizon</span>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "var(--ink-quiet)", marginTop: -16, marginBottom: 16 }}>The brand, the practice, the life. Specific.</p>
          <NumberedStack count={3} keyPrefix="goal_10y"
            placeholders={["Goal 1 — e.g., Recognized nationally as the ___ dentist", "Goal 2", "Goal 3"]}
            values={values} onChange={handleChange} />

          <span className="sublabel" style={{ marginTop: 48 }}>Three-Year Horizon</span>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "var(--ink-quiet)", marginTop: -16, marginBottom: 16 }}>What's true by the end of year three that proves the ten-year trajectory.</p>
          <NumberedStack count={3} keyPrefix="goal_3y" values={values} onChange={handleChange} />

          <span className="sublabel" style={{ marginTop: 48 }}>One-Year Horizon</span>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "var(--ink-quiet)", marginTop: -16, marginBottom: 16 }}>Twelve months out. Positioning locked, signal running, system holding.</p>
          <NumberedStack count={3} keyPrefix="goal_1y" values={values} onChange={handleChange} />

          <span className="sublabel" style={{ marginTop: 48 }}>Ninety-Day Horizon</span>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "var(--ink-quiet)", marginTop: -16, marginBottom: 16 }}>The near-term move. What parts of this guide are you locking by day 90.</p>
          <NumberedStack count={3} keyPrefix="goal_90d" values={values} onChange={handleChange} />
        </Section>

        <Dots />

        {/* CTA */}
        <Section id="next" masthead="§ NEXT · WHEN YOU'RE READY" ornament={<OrnArrow />}>
          <div className="numeral" style={{ marginBottom: 12 }}>NEXT</div>
          <h2 className="serif">This is how the <em>becoming</em> begins. We build the rest together.</h2>
          <p className="lead" style={{ marginTop: 48 }}>
            PASTED works with a small number of aesthetic dental practices each year. We build the signal, produce the creative, run the campaigns, and architect the system — so the brand you have designed in this guide becomes the brand your market sees. It is the same five-part framework behind hundreds of millions in aesthetic demand.
          </p>
          <div className="reading">
            <p>If the guide surfaced something, and you would like to see what the full architecture looks like applied to your practice — book a Brand Architecture Call.</p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 48 }}>
            <button
              className="cta-pill"
              onClick={() => handleCTA("bottom")}
            >
              Book a Brand Architecture Call →
            </button>
            <button
              className="cta-secondary"
              onClick={handleExport}
              disabled={submitting}
            >
              {submitting ? "Preparing…" : "Export My Guide"}
            </button>
          </div>

          <p style={{ marginTop: 32, fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", color: "var(--ink-quiet)", fontSize: 17 }}>
            Vol. II · The Art of Building · MMXXVII
          </p>
        </Section>

        {/* FOOTER */}
        <footer style={{ padding: "200px 24px 80px", textAlign: "center" }}>
          <div style={{ width: 120, height: 1, background: "var(--rule)", margin: "0 auto 64px" }} />
          <div style={{
            display: "flex", justifyContent: "space-between", maxWidth: 620, margin: "0 auto",
            fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 11,
            letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--ink-quiet)",
          }}>
            <span>PASTED · LIBRARY · VOL. I</span>
            <span>v1 · MMXXVI</span>
          </div>
          <p style={{ marginTop: 48, fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: 20, color: "var(--ink-quiet)" }}>
            Where Dentistry Becomes Iconic.
          </p>
          <div style={{ marginTop: 64, color: "var(--brass)", fontSize: 20, fontFamily: "Cormorant Garamond, serif" }}>✦</div>
          <div style={{
            marginTop: 40,
            fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 9,
            letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--ink-whisper)",
          }}>
            PASTED · 2026
          </div>
        </footer>

        {/* LEAD GATE — overlays everything until valid */}
        {!gateUnlocked && (
          <LeadGate
            lead={lead}
            errors={leadErrors}
            onChange={handleLeadChange}
            onSubmit={handleLeadSubmit}
          />
        )}
      </div>
    </>
  );
};

export default BrandAssetWorkbook;
