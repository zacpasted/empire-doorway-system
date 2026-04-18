import { useCallback, useEffect, useMemo, useRef, useState, ReactNode } from "react";

const STORAGE_KEY = "pasted-brand-asset-workbook";

// ---------- Storage hook ----------
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

// ---------- Reusable atoms ----------
const Rule = () => <hr className="my-20 border-0 border-t border-neutral-200" />;

const Section = ({ num, label, children }: { num: string; label: string; children: ReactNode }) => (
  <section className="mx-auto w-full max-w-[1120px] px-6 lg:px-10">
    <div className="mb-10 flex flex-wrap items-center gap-x-4 gap-y-1">
      <span className="text-[11px] uppercase tracking-[0.28em] text-neutral-500">{num}</span>
      <span className="text-[11px] uppercase tracking-[0.28em] text-neutral-500">·</span>
      <span className="text-[11px] uppercase tracking-[0.28em] text-neutral-500">{label}</span>
    </div>
    {children}
  </section>
);

const SubLabel = ({ children }: { children: ReactNode }) => (
  <div className="mb-4 mt-12 text-[11px] uppercase tracking-[0.28em] text-neutral-500">{children}</div>
);

const Lead = ({ children }: { children: ReactNode }) => (
  <p className="max-w-[780px] text-lg leading-relaxed text-neutral-800 md:text-xl">{children}</p>
);

const Body = ({ children }: { children: ReactNode }) => (
  <p className="max-w-[780px] text-base leading-[1.75] text-neutral-700">{children}</p>
);

const MutedBody = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <p className={`max-w-[780px] text-sm leading-[1.7] text-neutral-500 ${className}`}>{children}</p>
);

const H2 = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <h2 className={`mb-6 max-w-[900px] font-serif text-3xl leading-[1.15] text-neutral-900 md:text-4xl lg:text-5xl ${className}`}>
    {children}
  </h2>
);

const H3 = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <h3 className={`mb-4 mt-12 font-serif text-xl text-neutral-900 md:text-2xl ${className}`}>{children}</h3>
);

const PullQuote = ({ children, cite }: { children: ReactNode; cite: string }) => (
  <blockquote className="my-10 max-w-[780px] border-l-2 border-neutral-900 pl-6">
    <p className="font-serif text-xl italic leading-snug text-neutral-900 md:text-2xl">{children}</p>
    <cite className="mt-3 block text-[11px] uppercase not-italic tracking-[0.24em] text-neutral-500">— {cite}</cite>
  </blockquote>
);

const Callout = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="my-8 max-w-[780px] rounded-sm border border-neutral-300 bg-neutral-50 p-7">
    <div className="mb-3 text-[10px] uppercase tracking-[0.28em] text-neutral-500">{label}</div>
    <div className="space-y-2 text-base leading-[1.7] text-neutral-800">{children}</div>
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
  <div className={`grid grid-cols-1 gap-4 py-6 md:grid-cols-[180px_1fr] md:gap-10 ${last ? "" : "border-b border-neutral-200"}`}>
    <div className="text-[11px] uppercase tracking-[0.24em] text-neutral-500">{label}</div>
    <div>
      <div className="mb-2 font-serif text-lg text-neutral-900">{title}</div>
      <div className="text-[15px] leading-[1.7] text-neutral-700">{children}</div>
    </div>
  </div>
);

const PillarCard = ({ label, body }: { label: string; body: string }) => (
  <div className="rounded-sm border border-neutral-200 bg-white p-7">
    <div className="mb-3 font-serif text-base text-neutral-900">{label}</div>
    <p className="text-[14px] leading-[1.7] text-neutral-600">{body}</p>
  </div>
);

const PillarGrid = ({ cols, children }: { cols: 2 | 3; children: ReactNode }) => (
  <div className={`my-8 grid grid-cols-1 gap-4 ${cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>{children}</div>
);

const Row = ({ time, action }: { time: string; action: ReactNode }) => (
  <div className="grid grid-cols-1 gap-2 border-b border-neutral-200 py-5 last:border-0 md:grid-cols-[160px_1fr] md:gap-8">
    <div className="text-[11px] uppercase tracking-[0.24em] text-neutral-500">{time}</div>
    <div className="text-[15px] leading-[1.7] text-neutral-700">{action}</div>
  </div>
);

const DefinitionBlock = ({ children }: { children: ReactNode }) => (
  <div className="my-10 max-w-[780px] border-y border-neutral-300 py-8">
    <div className="space-y-3 text-center font-serif text-xl leading-snug text-neutral-900 md:text-2xl">{children}</div>
  </div>
);

const OutcomeStrip = ({ items }: { items: { label: string; body: string }[] }) => (
  <div className="mt-12 grid grid-cols-1 gap-6 border-y border-neutral-300 py-8 md:grid-cols-4 md:gap-4">
    {items.map((it, i) => (
      <div key={i} className="md:px-3">
        <div className="mb-2 text-[10px] uppercase tracking-[0.3em] text-neutral-500">{it.label}</div>
        <div className="text-[15px] font-medium leading-snug text-neutral-900">{it.body}</div>
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
      className={`group my-6 max-w-[780px] rounded-sm border p-6 transition-colors focus-within:border-neutral-900 ${
        accent ? "border-neutral-900 bg-neutral-50" : "border-neutral-200 bg-white"
      }`}
    >
      <div className="mb-4 flex items-baseline gap-4">
        <span className="font-serif text-lg text-neutral-500">{num}</span>
        <label htmlFor={inputId} className="block flex-1 font-serif text-lg leading-snug text-neutral-900 md:text-xl">
          {question}
        </label>
      </div>
      {hint && <p className="mb-4 pl-9 text-[13px] leading-[1.6] text-neutral-500">{hint}</p>}
      <div className="pl-9">
        {inputType === "textarea" ? (
          <textarea
            id={inputId}
            value={value}
            onChange={(e) => onChange(dataKey, e.target.value)}
            placeholder={placeholder}
            style={{ minHeight }}
            className="w-full resize-y rounded-sm border border-neutral-200 bg-white p-3 font-serif text-[15px] leading-[1.6] text-neutral-900 outline-none transition-colors focus:border-neutral-900"
          />
        ) : (
          <input
            id={inputId}
            type="text"
            value={value}
            onChange={(e) => onChange(dataKey, e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-sm border border-neutral-200 bg-white p-3 font-serif text-[15px] leading-[1.6] text-neutral-900 outline-none transition-colors focus:border-neutral-900"
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
  <div className="my-6 max-w-[780px] rounded-sm border border-neutral-200 bg-white p-6">
    <div className="mb-4 text-[11px] uppercase tracking-[0.24em] text-neutral-500">{label}</div>
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => {
        const k = `${keyPrefix}_${i + 1}`;
        const ph = placeholders?.[i] ?? `Item ${i + 1}`;
        return (
          <div key={k} className="flex items-center gap-3">
            <span className="w-6 font-serif text-sm text-neutral-500">{i + 1}.</span>
            <input
              type="text"
              value={values[k] || ""}
              onChange={(e) => onChange(k, e.target.value)}
              placeholder={ph}
              className="w-full rounded-sm border border-neutral-200 bg-white px-3 py-2 font-serif text-[15px] text-neutral-900 outline-none transition-colors focus:border-neutral-900"
            />
          </div>
        );
      })}
    </div>
  </div>
);

// ---------- Field manifest (for export ordering) ----------
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

// ---------- Page ----------
const BrandAssetWorkbook = () => {
  const [values, setValues] = useState<Values>({});
  const [saveState, setSaveState] = useState<"saved" | "saving" | "reset">("saved");
  const [scrollPct, setScrollPct] = useState(0);
  const debounceRef = useRef<number | null>(null);

  // Restore on mount
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

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900" style={{ scrollBehavior: "smooth" }}>
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur print:hidden">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between px-6 py-4 lg:px-10">
          <div>
            <div className="font-serif text-lg leading-none tracking-wide text-neutral-900">PASTED</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.28em] text-neutral-500">Brand Asset Workbook</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-neutral-500">
              <span
                className={`inline-block h-2 w-2 rounded-full ${
                  saveState === "saving" ? "bg-amber-500" : saveState === "reset" ? "bg-neutral-400" : "bg-emerald-500"
                }`}
              />
              <span>{saveState === "saving" ? "Saving…" : saveState === "reset" ? "Reset" : "Saved"}</span>
            </div>
            <button
              onClick={handleReset}
              className="rounded-sm border border-neutral-300 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-neutral-600 transition-colors hover:border-neutral-900 hover:text-neutral-900"
            >
              Reset
            </button>
          </div>
        </div>
      </header>

      {/* Scroll progress */}
      <div className="fixed left-0 right-0 top-0 z-50 h-[2px] bg-transparent print:hidden">
        <div className="h-full bg-neutral-900 transition-[width] duration-150" style={{ width: `${scrollPct}%` }} />
      </div>

      {/* COVER */}
      <div className="mx-auto flex min-h-[90vh] w-full max-w-[1120px] flex-col justify-center px-6 py-24 lg:px-10">
        <div className="mb-8 text-[10px] uppercase tracking-[0.32em] text-neutral-500">A PASTED FIELD GUIDE</div>
        <h1 className="max-w-[900px] font-serif text-4xl leading-[1.05] text-neutral-900 md:text-6xl lg:text-7xl">
          The <em>Brand Asset</em> Workbook.
        </h1>
        <p className="mt-8 max-w-[760px] font-serif text-lg italic leading-snug text-neutral-700 md:text-2xl">
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
        <div className="mt-8 text-[10px] uppercase tracking-[0.28em] text-neutral-500">
          FORMAT · WORKBOOK + FIELD GUIDE · TIME · 90 MINUTES · PASTED · 2026
        </div>
      </div>

      <Rule />

      {/* 00 PREMISE */}
      <Section num="00" label="The Premise">
        <H2>
          Your new office is not your <em>brand.</em>
        </H2>
        <div className="space-y-5">
          <Body>And dentistry is full of people selling “brand” who cannot define it without pointing to furniture, TVs, equipment, a logo, or a renovation package.</Body>
          <Body>That should concern you.</Body>
          <Body>
            Because some of the highest-performing practices we know — including offices doing eight figures under one roof — are not the fanciest or the prettiest.
          </Body>
          <Body>They just have a real brand.</Body>
        </div>
        <DefinitionBlock>
          <div>
            A clear <em>why.</em>
          </div>
          <div>
            A clear <em>story.</em>
          </div>
          <div>
            A clear <em>position.</em>
          </div>
          <div>A consistent way of showing their work, their people, and what they stand for.</div>
        </DefinitionBlock>
        <div className="space-y-5">
          <Body>That is what creates pull. That is what patients remember. That is what people say about you when you are not in the room.</Body>
          <Body>Meanwhile, some of the practices in the most pain come to us right after a rebuild.</Body>
          <Body>New office. New logo. New everything. Still no demand.</Body>
          <Body>Because a nicer office does not create a stronger signal. A new logo does not create trust. And better finishes do not make people care.</Body>
        </div>
        <PullQuote cite="PASTED House Doctrine">
          “That is the difference between buying things and building an asset.”
        </PullQuote>
        <div className="space-y-5">
          <Body>If your branding strategy starts with aesthetics and ends with a logo, you do not have a brand strategy. You have a spending strategy.</Body>
          <Body>This workbook walks you through the five parts of a real brand asset. Before the parts, there is a foundation — because without it, every part above it wobbles.</Body>
        </div>
        <MutedBody className="mt-8 italic">
          The foundation is your ikigai — adapted for the dentist who wants to build something that pulls.
        </MutedBody>
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
        <div className="mt-6">
          <Body>
            Adapted for a practice owner, the four circles become a positioning instrument. You likely already specialize — cosmetic, implants, full arch, ortho. The ikigai isn't about choosing a specialty. It's about understanding <em>why</em> you're the one people should come to for it.
          </Body>
        </div>

        {/* Ikigai SVG */}
        <div className="my-12 flex justify-center">
          <svg viewBox="0 0 480 480" className="w-full max-w-[480px]" aria-label="Ikigai diagram">
            <g fill="none" stroke="#262626" strokeWidth="1">
              <circle cx="180" cy="180" r="130" />
              <circle cx="300" cy="180" r="130" />
              <circle cx="180" cy="300" r="130" />
              <circle cx="300" cy="300" r="130" />
            </g>
            <g fontFamily="serif" fontSize="11" fill="#737373" textAnchor="middle" letterSpacing="2">
              <text x="110" y="60">WHAT YOU LOVE</text>
              <text x="370" y="60">WORLD-CLASS AT</text>
              <text x="110" y="450">PATIENTS NEED</text>
              <text x="370" y="450">COMMANDS PREMIUM</text>
            </g>
            <g fontFamily="serif" fontSize="18" fill="#171717" textAnchor="middle">
              <text x="240" y="232">Your</text>
              <text x="240" y="252">Reason</text>
              <text x="240" y="272">to Pull</text>
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
        <div className="mt-6">
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
        <div className="mt-6">
          <Body>Write five. Not ten. Five is a discipline — it forces you to pick. Each value should be one or two words that your team can actually recite and that a patient could feel in five minutes with your practice.</Body>
        </div>
        <NumberedStack
          label="Practice Values"
          count={5}
          keyPrefix="value"
          values={v}
          onChange={handleChange}
          placeholders={["e.g., Subtlety", "e.g., Craftsmanship", "e.g., No cookie-cutter cases", "e.g., Honest over optimistic", "e.g., Function before aesthetics"]}
        />
      </Section>

      <Rule />

      {/* TRANSITION */}
      <div className="mx-auto my-20 max-w-[780px] px-6 text-center lg:px-10">
        <h2 className="font-serif text-3xl leading-[1.15] text-neutral-900 md:text-4xl">
          A real brand is not a logo. <em>It's five things working together.</em>
        </h2>
        <p className="mx-auto mt-6 max-w-[600px] text-sm leading-[1.7] text-neutral-500">
          Everything above this line is raw material. Everything below turns it into an asset — something that pulls, compounds, and tells patients who you are before you say a word.
        </p>
      </div>

      <Rule />

      {/* 01 POSITIONING */}
      <Section num="01" label="Part One · What You're Known For">
        <H2><em>Positioning.</em></H2>
        <Lead>You already specialize. The question isn't <em>what</em> you do — it's whether the market knows <em>how you own it.</em></Lead>
        <div className="mt-6 space-y-5">
          <Body>Most aesthetic dentists have a specialty on the website and generalist messaging everywhere else. The niche is chosen. The positioning is fuzzy. That gap is where pull leaks.</Body>
          <Body>Positioning is how you describe your specialty in a way that only you could describe it. “Cosmetic” is a category. “The dentist high-profile patients are sent to when nobody can know they had work done” is a position.</Body>
          <Body>This is where the ikigai synthesis lives. Your one-sentence positioning from the foundation <em>is</em> your positioning — if it survives the real-world test. The test is whether a patient can repeat it to a friend at dinner without losing any of it.</Body>
        </div>

        <H3>The PASTED Descriptive Call-Out</H3>
        <Body>Don't call out job titles. Call out conditions, states, and self-perceptions. “Executives over 50” is weak. “The woman who hasn't smiled in a photo since her divorce” is strong.</Body>
        <Callout label="WORKING FRAME">
          <div>Weak: <em>For professionals who want better smiles.</em></div>
          <div>Strong: <em>For the founder, surgeon, or executive whose smile hasn't kept up with the life they've built.</em></div>
        </Callout>

        <H3>The 3% In-Market Rule</H3>
        <Body>
          At any given moment, only about <strong>3% of your total addressable market is ready to buy.</strong> The other 97% is unaware, passive, or not yet in the window. A good brand speaks only to the 3% — with precision — while conditioning the 97% for their future moment. That is the mechanism of pull.
        </Body>

        {wb({ num: "✦", dataKey: "callouts", question: "Write three descriptive call-outs for your 3%.", hint: "Each should describe a state or self-perception, not a demographic. They should feel like private thoughts, not segments.", placeholder: "1. For the woman who…\n2. For the man who…\n3. For the patient who…", minHeight: 130 })}

        <SubLabel>CAPSTONE · The Practice Marketing System</SubLabel>
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
        <div className="mt-6 space-y-5">
          <Body>This is the part most dental brands are missing — and it's the part that separates a practice from a point of reference.</Body>
          <Body>Point of view is the non-negotiable belief you carry into every case, every consult, every piece of content. It's what makes a patient say “I want <em>him</em> specifically” instead of “I want a dentist.”</Body>
        </div>

        <ul className="my-8 max-w-[780px] space-y-3 border-l border-neutral-300 pl-6 font-serif italic text-neutral-800">
          <li>We don't do cookie-cutter veneers.</li>
          <li>Subtlety over Hollywood.</li>
          <li>Function before aesthetics.</li>
          <li>If it doesn't look like it belongs in your face, we don't do it.</li>
          <li>Age-appropriate or nothing.</li>
        </ul>

        <Body>Every time we rebuild this — not the logo — case value goes up, price sensitivity drops, and suddenly you're not competing anymore. That is pull. And pull is what an office renovation will never buy you.</Body>

        <H3>The Signature Story</H3>
        <Body>A point of view becomes unforgettable when it's attached to a story. Every iconic practice has one that is specific, true, and repeatable. Specific enough that it couldn't belong to any other dentist. True enough that you never have to remember it. Repeatable enough that a patient can tell their spouse over dinner.</Body>

        <div className="my-10 max-w-[780px]">
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
        <div className="mt-6 space-y-5">
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
        <div className="mt-6 space-y-5">
          <Body>Most dentists treat content like a chore. They post happy Mondays. Random before-and-afters. Generic dental tips. This is noise. It doesn't reinforce positioning, doesn't carry point of view, doesn't deepen experience. It's just activity.</Body>
          <Body>Strong signal does the opposite. It says the same thing the positioning says, in a different format, every time. That consistency is what creates pull.</Body>
        </div>

        <div className="my-10 grid max-w-[780px] grid-cols-1 gap-0 overflow-hidden rounded-sm border border-neutral-200 md:grid-cols-2">
          <div className="border-b border-neutral-200 bg-neutral-50 p-6 md:border-b-0 md:border-r">
            <div className="mb-3 text-[10px] uppercase tracking-[0.28em] text-neutral-500">Weak Signal</div>
            <ul className="space-y-2 text-[15px] text-neutral-700">
              <li>Random before/after</li>
              <li>“Happy Monday”</li>
              <li>Dental tips anyone could post</li>
              <li>&nbsp;</li>
            </ul>
          </div>
          <div className="bg-white p-6">
            <div className="mb-3 text-[10px] uppercase tracking-[0.28em] text-neutral-500">Strong Signal</div>
            <ul className="space-y-2 text-[15px] text-neutral-900">
              <li>Philosophy pieces</li>
              <li>Patient stories</li>
              <li>Lifestyle transformation</li>
              <li>Authority commentary on your category</li>
            </ul>
          </div>
        </div>

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

        <Callout label="THE 4-HOUR FLOW BLOCK">
          <div>Matt Gray's Founder OS principle translates directly: schedule 4 hours per day of protected time for high-leverage creative work. For a practice owner, this is shoot days, thinking time, long-form writing, and patient-story capture. Not chair time. Not email. The brand gets built in the block.</div>
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
        <div className="mt-6 space-y-5">
          <Body>A brand must carry through: ads, website, consult, pricing, photography, messaging, follow-up, reviews, referral scripts, even the invoice. If one breaks, trust drops. If trust drops, price drops. If price drops, you're back to competing.</Body>
          <Body>The system is what makes the whole architecture compound instead of leak. It is the difference between a pile of marketing activity and a real asset.</Body>
        </div>

        <H3>The Patient Journey Map</H3>
        <Body>Walk the journey. End to end. Every message, every screen, every human interaction:</Body>

        <div className="my-8 flex max-w-[1120px] flex-col flex-wrap items-stretch gap-2 md:flex-row md:items-center">
          {["Ad", "Website", "Consult", "Treatment Plan", "Follow-up", "Reveal", "Review", "Referral"].map((step, i, arr) => (
            <div key={step} className="flex items-center gap-2">
              <div className="rounded-sm border border-neutral-300 px-3 py-2 text-[12px] uppercase tracking-[0.18em] text-neutral-700">{step}</div>
              {i < arr.length - 1 && <span className="text-neutral-400">→</span>}
            </div>
          ))}
        </div>

        <Body>At each step, ask:</Body>
        <ul className="my-6 max-w-[780px] list-disc space-y-2 pl-6 text-[15px] text-neutral-700">
          <li>Does the message match the one before it?</li>
          <li>Does the tone match the positioning?</li>
          <li>Does the point of view come through?</li>
          <li>Does the experience hold up?</li>
        </ul>

        <H3>The Compounding Effect</H3>
        <Body>When the system holds, three things happen together:</Body>

        <div className="my-10 max-w-[780px]">
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
        <div className="mt-8 space-y-4">
          <MutedBody>If you can't answer those in one sentence each — your logo doesn't matter, and neither does your renovation. You don't need a rebrand. You need clarity.</MutedBody>
          <MutedBody>The logo is just the signature. The brand is the story. The story is what pulls.</MutedBody>
        </div>
      </Section>

      <Rule />

      {/* CADENCE */}
      <Section num="CADENCE" label="The Personal Board Meeting">
        <H2>A weekly rhythm for the <em>iconic operator.</em></H2>
        <Lead>Matt Gray's Founder OS includes a weekly practice called the Personal Board Meeting — a 30-minute executive check-in with yourself. Translated for a practice owner, it becomes the discipline that keeps the five parts alive long after the initial build.</Lead>
        <div className="mt-6">
          <Body>Run this every week. Same time. Same 30 minutes. Treat yourself like the most important client on your roster.</Body>
        </div>

        <div className="my-10 rounded-sm border border-neutral-200 bg-white p-2 md:p-6">
          <Row time="Minute 1–5" action={<><strong>Wins.</strong> Three things that worked. Case, content, referral, review, team moment — anything that reinforced the brand you're building.</>} />
          <Row time="Minute 6–15" action={<><strong>Friction.</strong> Where is the brand leaking? Misaligned content, patient confusion, price discounting, team drift. Name the friction before it becomes structural.</>} />
          <Row time="Minute 16–22" action={<><strong>The One Move.</strong> One decision, one removal, one creation that would change the trajectory most in the next 90 days. Not ten things. One.</>} />
          <Row time="Minute 23–30" action={<><strong>The Flow Block.</strong> Schedule the 4-hour block for the week. Protect it like a surgery. This is where the brand actually gets built.</>} />
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
        <div className="mt-6">
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
        <div className="mt-6">
          <Body>If the workbook surfaced something, and you'd like to see what the full architecture looks like applied to your practice — book a Brand Architecture Call.</Body>
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row print:hidden">
          <a
            href="https://calendly.com/pasted/brand-architecture-call"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-sm bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
          >
            Book a Brand Architecture Call →
          </a>
          <button
            onClick={handleExport}
            className="inline-flex items-center justify-center rounded-sm border border-neutral-900 bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-100"
          >
            Export My Workbook
          </button>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="mx-auto mt-32 w-full max-w-[1120px] border-t border-neutral-200 px-6 py-10 lg:px-10">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-[11px] uppercase tracking-[0.24em] text-neutral-500">PASTED · Brand Asset Workbook</div>
          <div className="text-[11px] uppercase tracking-[0.24em] text-neutral-500">v1 · PASTED · 2026</div>
        </div>
        <div className="mt-6 text-center font-serif italic text-neutral-600">Where Dentistry Becomes Iconic.</div>
      </footer>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto !important; }
          * { transition: none !important; animation: none !important; }
        }
        @media print {
          .print\\:hidden { display: none !important; }
          textarea, input { border: 1px solid #aaa !important; }
        }
      `}</style>
    </div>
  );
};

export default BrandAssetWorkbook;
