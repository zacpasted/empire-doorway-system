import { useEffect, useState, useMemo } from "react";
import { LibraryCoverFrontispiece } from "./LibraryCover";

/**
 * THE PRIVATE DOCTRINE ON BRAND
 * A PASTED Library Public Dispatch · Single-page editorial document
 * Five magazine-spread "pages" with bone paper, ink, and brass accents.
 */

const FONT_LINK_ID = "doctrine-fonts";

const ensureFonts = () => {
  if (document.getElementById(FONT_LINK_ID)) return;
  const preconnect1 = document.createElement("link");
  preconnect1.rel = "preconnect";
  preconnect1.href = "https://fonts.googleapis.com";
  document.head.appendChild(preconnect1);

  const preconnect2 = document.createElement("link");
  preconnect2.rel = "preconnect";
  preconnect2.href = "https://fonts.gstatic.com";
  preconnect2.crossOrigin = "";
  document.head.appendChild(preconnect2);

  const link = document.createElement("link");
  link.id = FONT_LINK_ID;
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap";
  document.head.appendChild(link);
};

/* ---------- Reusable bits ---------- */

const PageMasthead = ({ num }: { num: string }) => (
  <div className="page-masthead">
    <span>THE PASTED LIBRARY · PUBLIC DISPATCH</span>
    <span className="page-masthead-right">PAGE · {num}</span>
  </div>
);

const PageBreak = ({ next }: { next?: string }) => (
  <div className="page-break" aria-hidden="true">
    <div className="page-break-dots">· · ·</div>
    {next && <div className="page-break-next">PAGE · {next}</div>}
  </div>
);

const PullQuote = ({ children, cite }: { children: React.ReactNode; cite: string }) => (
  <blockquote className="pull-quote">
    <p>{children}</p>
    <cite>— <em>{cite}</em></cite>
  </blockquote>
);

const Caption = ({ children }: { children: React.ReactNode }) => (
  <div className="figure-caption">{children}</div>
);

/* ---------- Illustrations ---------- */

const FigureSpendingTrap = () => (
  <figure className="figure">
    <svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The Spending Trap diagram">
      <g stroke="#8B7A4E" strokeWidth="1" fill="none">
        <circle cx="240" cy="180" r="120" opacity="0.5" />
        {/* Nodes */}
        <circle cx="240" cy="60" r="36" fill="#EDE7DB" />
        <circle cx="360" cy="180" r="36" fill="#EDE7DB" />
        <circle cx="240" cy="300" r="36" fill="#EDE7DB" />
        <circle cx="120" cy="180" r="36" fill="#EDE7DB" />
        {/* Arrows */}
        <path d="M 270 75 Q 330 110 345 150" markerEnd="url(#arrow)" />
        <path d="M 345 210 Q 330 250 270 285" markerEnd="url(#arrow)" />
        <path d="M 210 285 Q 150 250 135 210" markerEnd="url(#arrow)" />
        <path d="M 135 150 Q 150 110 210 75" markerEnd="url(#arrow)" />
      </g>
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#8B7A4E" />
        </marker>
      </defs>
      {/* Node labels */}
      <text x="240" y="58" textAnchor="middle" fontFamily="Inter" fontSize="9" fill="#1C1B18" letterSpacing="2">REBRAND</text>
      <text x="240" y="70" textAnchor="middle" fontFamily="Inter" fontSize="9" fill="#1C1B18" letterSpacing="2"></text>
      <text x="360" y="178" textAnchor="middle" fontFamily="Inter" fontSize="9" fill="#1C1B18" letterSpacing="2">NEW</text>
      <text x="360" y="190" textAnchor="middle" fontFamily="Inter" fontSize="9" fill="#1C1B18" letterSpacing="2">ADS</text>
      <text x="240" y="298" textAnchor="middle" fontFamily="Inter" fontSize="9" fill="#1C1B18" letterSpacing="1.5">RENOVATION</text>
      <text x="120" y="178" textAnchor="middle" fontFamily="Inter" fontSize="9" fill="#1C1B18" letterSpacing="2">NEW</text>
      <text x="120" y="190" textAnchor="middle" fontFamily="Inter" fontSize="9" fill="#1C1B18" letterSpacing="2">PHOTOS</text>
      {/* Center text */}
      <text x="240" y="175" textAnchor="middle" fontFamily="Cormorant Garamond" fontStyle="italic" fontSize="14" fill="#8B7A4E">the loop that</text>
      <text x="240" y="195" textAnchor="middle" fontFamily="Cormorant Garamond" fontStyle="italic" fontSize="14" fill="#8B7A4E">does not pull.</text>
    </svg>
    <Caption>FIGURE 01 · THE SPENDING TRAP</Caption>
  </figure>
);

const FigureSurfaceVsSubstance = () => (
  <figure className="figure">
    <svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Surface vs Substance diagram">
      {/* Surface band */}
      <g stroke="#8B7A4E" strokeWidth="1" fill="none">
        <rect x="40" y="30" width="520" height="50" />
        <text x="60" y="20" fontFamily="Inter" fontSize="9" fill="#8B7A4E" letterSpacing="3">LOGO · THE SIGNATURE</text>
        <circle cx="200" cy="55" r="6" />
        <rect x="290" y="49" width="12" height="12" />
        <polygon points="395,62 405,46 415,62" />
      </g>
      <text x="300" y="105" textAnchor="middle" fontFamily="Cormorant Garamond" fontStyle="italic" fontSize="13" fill="#726B5E">— and below, the real work —</text>
      {/* Substance band */}
      <g stroke="#8B7A4E" strokeWidth="1" fill="none">
        <rect x="40" y="125" width="520" height="240" />
        <text x="60" y="118" fontFamily="Inter" fontSize="9" fill="#8B7A4E" letterSpacing="3">BRAND · THE ARCHITECTURE</text>
        <line x1="40" y1="185" x2="560" y2="185" />
        <line x1="40" y1="245" x2="560" y2="245" />
        <line x1="40" y1="305" x2="560" y2="305" />
      </g>
      {[
        { y: 165, label: "WHY", note: "the reason you opened the doors" },
        { y: 225, label: "STORY", note: "what only you can tell" },
        { y: 285, label: "POSITION", note: "what you are known for" },
        { y: 345, label: "CONSISTENCY", note: "everywhere, every time" },
      ].map((row) => (
        <g key={row.label}>
          <text x="60" y={row.y} fontFamily="Inter" fontSize="11" fill="#1C1B18" letterSpacing="3" fontWeight="500">{row.label}</text>
          <text x="540" y={row.y} textAnchor="end" fontFamily="Cormorant Garamond" fontStyle="italic" fontSize="13" fill="#726B5E">{row.note}</text>
        </g>
      ))}
    </svg>
    <Caption>FIGURE 02 · SURFACE VS. SUBSTANCE</Caption>
  </figure>
);

const FigureCompoundingCurve = () => (
  <figure className="figure">
    <svg viewBox="0 0 600 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Compounding Curve chart">
      {/* Axes */}
      <g stroke="#C7BEA8" strokeWidth="1" fill="none">
        <line x1="60" y1="320" x2="560" y2="320" />
        <line x1="60" y1="40" x2="60" y2="320" />
        {/* tick marks */}
        {[60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210].map((y) => (
          <line key={y} x1="56" y1={y * 1.5 - 30} x2="60" y2={y * 1.5 - 30} />
        ))}
      </g>
      {/* X labels */}
      {["YEAR 1", "YEAR 2", "YEAR 3", "YEAR 4", "YEAR 5"].map((lbl, i) => (
        <text key={lbl} x={110 + i * 110} y="345" textAnchor="middle" fontFamily="Inter" fontSize="9" fill="#726B5E" letterSpacing="2">{lbl}</text>
      ))}
      <text x="40" y="180" textAnchor="middle" fontFamily="Inter" fontSize="9" fill="#726B5E" letterSpacing="3" transform="rotate(-90 40 180)">EFFECT</text>
      {/* Spend line - flat dashed */}
      <path d="M 110 270 L 220 265 L 330 275 L 440 268 L 550 272" stroke="#A59E8E" strokeWidth="1" strokeDasharray="4 4" fill="none" />
      <text x="555" y="265" fontFamily="Inter" fontSize="9" fill="#726B5E" letterSpacing="2" textAnchor="end">SPEND · CHASE</text>
      {/* Brand curve - ascending */}
      <path d="M 110 290 Q 220 280 330 240 T 550 70" stroke="#8B7A4E" strokeWidth="1.5" fill="none" />
      <text x="540" y="60" fontFamily="Inter" fontSize="9" fill="#8B7A4E" letterSpacing="2" textAnchor="end" fontWeight="500">BRAND · PULL</text>
      {/* Crossover marker */}
      <circle cx="290" cy="258" r="3" fill="#8B7A4E" />
      <text x="295" y="248" fontFamily="Cormorant Garamond" fontStyle="italic" fontSize="12" fill="#8B7A4E">the crossover point</text>
    </svg>
    <Caption>FIGURE 03 · THE COMPOUNDING CURVE</Caption>
  </figure>
);

const FigureFivePartArchitecture = () => {
  const parts = [
    { num: "I", name: "POSITIONING", note: "what you are known for" },
    { num: "II", name: "POINT OF VIEW", note: "what you believe" },
    { num: "III", name: "EXPERIENCE", note: "what it feels like" },
    { num: "IV", name: "SIGNAL", note: "what you show publicly" },
    { num: "V", name: "SYSTEM", note: "how it all connects" },
  ];
  return (
    <figure className="figure">
      <svg viewBox="0 0 540 540" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Five-Part Architecture">
        <text x="270" y="22" textAnchor="middle" fontFamily="Inter" fontSize="10" fill="#8B7A4E" letterSpacing="3" fontWeight="500">THE ARCHITECTURE</text>
        {/* Spine */}
        <line x1="270" y1="50" x2="270" y2="490" stroke="#8B7A4E" strokeWidth="1" />
        {parts.map((p, i) => {
          const y = 50 + i * 88;
          return (
            <g key={p.num}>
              <rect x="80" y={y} width="380" height="64" stroke="#8B7A4E" strokeWidth="1" fill="#EDE7DB" />
              <text x="100" y={y + 40} fontFamily="Cormorant Garamond" fontStyle="italic" fontSize="22" fill="#8B7A4E">{p.num}</text>
              <text x="160" y={y + 38} fontFamily="Cormorant Garamond" fontSize="18" fill="#1C1B18">{p.name}</text>
              <text x="440" y={y + 40} textAnchor="end" fontFamily="Cormorant Garamond" fontStyle="italic" fontSize="13" fill="#726B5E">{p.note}</text>
            </g>
          );
        })}
        <text x="270" y="525" textAnchor="middle" fontFamily="Inter" fontSize="10" fill="#8B7A4E" letterSpacing="3" fontWeight="500">THE ASSET</text>
      </svg>
      <Caption>FIGURE 04 · THE FIVE-PART ARCHITECTURE</Caption>
    </figure>
  );
};

/* ---------- Cover Sigil ---------- */

const CoverSigil = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#8B7A4E" strokeWidth="1" aria-hidden="true">
    <rect x="4" y="4" width="56" height="56" rx="1" />
    <text x="32" y="28" textAnchor="middle" fontFamily="Cormorant Garamond" fontSize="18" fontWeight="500" fill="#8B7A4E">PL</text>
    <line x1="12" y1="34" x2="52" y2="34" strokeWidth="0.5" />
    <text x="32" y="48" textAnchor="middle" fontFamily="Inter" fontSize="8" letterSpacing="2" fill="#8B7A4E">DISPATCH</text>
  </svg>
);

/* ---------- Main Page ---------- */

const DoctrineOnBrand = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    ensureFonts();
    document.title = "The Private Doctrine on Brand · A PASTED Library Dispatch";
    // Meta description
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "A public dispatch from The PASTED Library on what a brand actually is, what yours is not, and how the practices that compound quietly pulled ahead.",
    );
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setScrollPct(Number.isFinite(pct) ? pct : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) return;
    try {
      // TODO: wire to broadcast email service
      localStorage.setItem(
        "pasted_insider_email",
        JSON.stringify({ email, ts: new Date().toISOString(), source: "doctrine-on-brand" }),
      );
    } catch {
      /* ignore */
    }
    setSubmitted(true);
  };

  const tocItems = useMemo(
    () => [
      { num: "01", title: "The Problem" },
      { num: "02", title: "The Definition" },
      { num: "03", title: "The Mechanism" },
      { num: "04", title: "The Architecture" },
      { num: "05", title: "The Invitation" },
    ],
    [],
  );

  return (
    <div className="doctrine-root">
      <style>{styles}</style>
      <div className="grain" aria-hidden="true" />
      <div className="progress-bar" style={{ width: `${scrollPct}%` }} aria-hidden="true" />

      {/* ========== COVER · LIBRARY FRONTISPIECE ========== */}
      <LibraryCoverFrontispiece mode="embedded" showContinueCue />

      {/* ========== TABLE OF CONTENTS ========== */}
      <section className="cover cover-toc">
        <div className="cover-inner">
          <div className="eyebrow">
            <span className="eyebrow-rule" />
            <span className="eyebrow-text">CONTENTS</span>
            <span className="eyebrow-rule" />
          </div>

          <nav className="toc" aria-label="Table of contents">
            {tocItems.map((t, i) => (
              <a key={t.num} href={`#page-${t.num}`} className="toc-item">
                <div className="toc-num">PAGE · {t.num}</div>
                <div className="toc-title">{t.title}</div>
                {i < tocItems.length - 1 && <span className="toc-divider" aria-hidden="true" />}
              </a>
            ))}
          </nav>
        </div>

        <div className="cover-base">
          <CoverSigil />
          <div className="cover-meta">FIVE PAGES · SEVEN MINUTES · PASTED · MMXXVI</div>
        </div>
      </section>

      <PageBreak next="01" />

      {/* ========== PAGE 01 ========== */}
      <section className="page" id="page-01">
        <PageMasthead num="01" />
        <div className="page-label">§ I · THE PROBLEM</div>
        <h2 className="page-h2">
          Your new office is not your <em>brand.</em>
        </h2>
        <p className="lead">
          Dentistry is full of people selling “brand” who cannot define it without pointing to
          furniture, TVs, equipment, a logo, or a renovation package. That should concern you.
        </p>
        <div className="body-with-margin">
          <div className="body-col">
            <p>
              Because the highest-performing practices we know — including offices doing eight
              figures under one roof — are not the fanciest or the prettiest. They are not the
              ones with the nicest chairs, the freshest paint, or the most recent rebrand. They
              just have a real brand. A clear why, a clear story, a clear position, and a
              consistent way of showing their work, their people, and what they stand for.
            </p>
            <p>
              That is what creates pull. That is what patients remember. That is what people say
              about you when you are not in the room. Meanwhile, the practices in the most pain
              come to us right after a rebuild. New office, new logo, new everything — still no
              demand. Because a nicer office does not create a stronger signal. A new logo does
              not create trust. And better finishes do not make people care.
            </p>
          </div>
          <aside className="margin-note">
            <em>
              We have audited enough rebuilds to know the pattern. The practices who renovate
              before they know what they stand for usually renovate again within three years.
            </em>
          </aside>
        </div>

        <FigureSpendingTrap />

        <PullQuote cite="PASTED HOUSE DOCTRINE">
          “That is the difference between buying things and building an asset.”
        </PullQuote>
      </section>

      <PageBreak next="02" />

      {/* ========== PAGE 02 ========== */}
      <section className="page page-alt" id="page-02">
        <PageMasthead num="02" />
        <div className="page-label">§ II · THE DEFINITION</div>
        <h2 className="page-h2">
          What a brand <em>actually is.</em>
        </h2>
        <p className="lead">
          A brand is not decoration. A brand is decision architecture. When a patient chooses a
          dentist for high-end work, they are not evaluating kerning, colors, or typography.
          They are evaluating trust, identity, perceived expertise, and emotional alignment.
        </p>
        <div className="body-col">
          <p>
            Your logo sits at the surface. Your brand sits underneath every interaction — the
            consult, the website, the follow-up, the price, the photography, the way the front
            desk answers the phone. When those layers carry the same signal, you have a brand.
            When they do not, you have a practice spending money on marketing.
          </p>
        </div>

        <div className="definition-block">
          <div className="def-rule" />
          <div className="def-line">A clear <em>why.</em></div>
          <div className="def-line">A clear <em>story.</em></div>
          <div className="def-line">A clear <em>position.</em></div>
          <div className="def-line">
            A consistent way of showing their work, their people, and what they stand for.
          </div>
          <div className="def-rule" />
        </div>

        <div className="body-col">
          <p>
            Those four ingredients, applied consistently, are what separate a brand from a
            business. The surface — the logo, the palette, the typography — is the signature.
            It signals that the brand exists. It does not create the brand.
          </p>
        </div>

        <FigureSurfaceVsSubstance />

        <p className="closer-muted">
          <em>
            If your branding strategy starts with aesthetics and ends with a logo, you do not
            have a brand strategy. You have a spending strategy.
          </em>
        </p>
      </section>

      <PageBreak next="03" />

      {/* ========== PAGE 03 ========== */}
      <section className="page" id="page-03">
        <PageMasthead num="03" />
        <div className="page-label">§ III · THE MECHANISM</div>
        <h2 className="page-h2">
          Why brand compounds and everything else <em>leaks.</em>
        </h2>
        <p className="lead">
          At any given moment, only about <strong>3% of your addressable market is ready to
          buy.</strong> The other 97% is unaware, passive, or not yet in the window. A weak
          brand competes for the 3% alongside every other dentist. A strong brand speaks only
          to the 3% — with precision — while quietly conditioning the 97% for their future
          moment. That is the mechanism of pull.
        </p>
        <div className="body-with-margin">
          <div className="body-col">
            <p>
              The in-market buyer for a $60k full-arch case does not shop by proximity. They
              shop by trust, by taste, and by recognition. By the time they book a consult,
              they have already decided. The brand did the work — months or years earlier, in
              passing scrolls, in overheard conversations, in patient referrals spoken at
              dinner parties.
            </p>
            <p>
              This is why brand compounds. Every piece of content a non-buyer consumes today
              pre-frames their eventual purchase tomorrow. When they enter the 3%, you are
              already the default answer. Recognition lowers your cost-per-acquisition year
              after year. Conditioning does the selling before the consult begins.
              Concentration — affluent patients telling other affluent patients — makes the
              funnel more efficient the longer it runs.
            </p>
          </div>
          <aside className="margin-note">
            <em>
              This is why a practice can take 20 years to build but a brand, built correctly,
              can compound in 24 months and then run for decades.
            </em>
          </aside>
        </div>

        <FigureCompoundingCurve />

        <PullQuote cite="THE PASTED LONG VIEW">
          “A brand is the only load-bearing wall in a practice. Build it wrong and everything
          else eventually sags.”
        </PullQuote>
      </section>

      <PageBreak next="04" />

      {/* ========== PAGE 04 ========== */}
      <section className="page page-alt" id="page-04">
        <PageMasthead num="04" />
        <div className="page-label">§ IV · THE ARCHITECTURE</div>
        <h2 className="page-h2">
          A real brand is <em>five things</em> working together.
        </h2>
        <p className="lead">
          The surface — the logo, the colors, the tagline — is one thing. What sits underneath
          is five.
        </p>
        <div className="body-col">
          <p>
            Every iconic practice we have ever worked on is built on the same five-part
            architecture. Miss one and the brand leaks; build all five in alignment and the
            brand compounds. Positioning is what you are known for. Point of view is what you
            believe. Experience is what it feels like. Signal is what you show publicly.
            System is how it all connects.
          </p>
        </div>

        <FigureFivePartArchitecture />

        <div className="body-with-margin">
          <div className="body-col">
            <p>
              When all five carry the same signal — the same positioning, the same belief, the
              same feel, the same content, the same system — the brand compounds. When one
              breaks, trust drops. When trust drops, price drops. When price drops, you are
              competing again.
            </p>
          </div>
          <aside className="margin-note">
            <em>
              Most dental brands collapse at Signal — content drift — and at System —
              misalignment between the ad and the consult. Those two are where the money leaks
              fastest.
            </em>
          </aside>
        </div>

        <p className="closer-muted">
          <em>A brand is the consistent feeling someone gets — from the first scroll to the final reveal.</em>
        </p>
      </section>

      <PageBreak next="05" />

      {/* ========== PAGE 05 ========== */}
      <section className="page" id="page-05">
        <PageMasthead num="05" />
        <div className="page-label">§ V · THE INVITATION</div>
        <h2 className="page-h2">
          How you begin to <em>become undeniable.</em>
        </h2>
        <p className="lead">
          Reading a doctrine is not the same as living one. If what you read resonated — if
          you recognized your own practice somewhere in these pages — there are two ways to
          continue.
        </p>
        <div className="body-col">
          <p>
            The first is to do the work yourself. We publish a complete field guide called{" "}
            <em>The Art of Becoming</em> — Volume I of The PASTED Library — that walks you
            through every part of the architecture above, with ninety minutes of workbook
            prompts that turn the doctrine into your own one-page Brand Brief. It is free. It
            lives online. You fill it in at your own pace.
          </p>
          <p>
            The second is to stay close. We publish a private broadcast called{" "}
            <strong>The Pasted Insider</strong> — dispatches sent directly to a small list,
            roughly once a week, always short, always usable the same day. Campaign angles we
            do not post publicly. Teardowns of what is working right now in aesthetic
            dentistry. Early access to every future volume in the Library. It is how the
            practices we quietly admire stay quietly ahead.
          </p>
        </div>

        <div className="two-path">
          <div className="path-col">
            <div className="sub-label">01 · THE WORKBOOK</div>
            <div className="path-title">
              <em>The Art of Becoming</em>
            </div>
            <p className="path-body">
              Interactive field guide. Volume I of The PASTED Library. 90-minute workbook.
              Free.
            </p>
            <a href="/library/vol-i" className="path-link">
              Read at pasted.studio/library/vol-i →
            </a>
          </div>
          <div className="path-col">
            <div className="sub-label">02 · THE BROADCAST</div>
            <div className="path-title">
              <em>The Pasted Insider</em>
            </div>
            <p className="path-body">
              Private dispatches. Weekly. No algorithm. No pitch-mail. Unsubscribe any time.
            </p>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="insider-form">
                <label htmlFor="insider-email" className="visually-hidden">
                  Email address
                </label>
                <input
                  id="insider-email"
                  type="email"
                  required
                  placeholder="your@practice.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="insider-input"
                />
                <button type="submit" className="insider-button">
                  Join the Broadcast →
                </button>
              </form>
            ) : (
              <p className="insider-success">
                <em>You are in. First dispatch within 48 hours.</em>
              </p>
            )}
          </div>
        </div>

        <PullQuote cite="THE PASTED LONG VIEW">
          “A brand asset is the only thing in your practice that works for you when you are
          asleep.”
        </PullQuote>

        <p className="closer-muted">
          <em>
            Wherever you go next, go deliberately. The if-practice stops the moment you stop
            funding it.
          </em>
        </p>
      </section>

      {/* ========== COLOPHON ========== */}
      <footer className="colophon">
        <div className="colophon-rule" />
        <div className="colophon-1">PASTED · THE PASTED LIBRARY · DISPATCH I</div>
        <div className="colophon-2">
          <em>The Private Doctrine on Brand · MMXXVI</em>
        </div>
        <div className="colophon-3">
          <em>Where Dentistry Becomes Iconic.</em>
        </div>
        <div className="colophon-fleuron">✦</div>
      </footer>
    </div>
  );
};

/* ---------- Styles ---------- */

const styles = `
  .doctrine-root {
    --bone: #EDE7DB;
    --bone-deep: #E5DDCC;
    --bone-shadow: #DBD2BF;
    --ink: #1C1B18;
    --ink-body: #2D2B26;
    --ink-quiet: #726B5E;
    --ink-whisper: #A59E8E;
    --rule: #C7BEA8;
    --rule-ghost: #D9D1BD;
    --brass: #8B7A4E;
    --brass-deep: #6A5C36;
    --brass-line: rgba(139,122,78,0.22);
    --oxblood: #5C2A2A;

    background: var(--bone);
    color: var(--ink-body);
    font-family: 'Inter', system-ui, sans-serif;
    font-weight: 300;
    font-size: 17px;
    line-height: 1.8;
    font-feature-settings: "liga","dlig","kern","tnum";
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
    position: relative;
  }
  .doctrine-root :where(h1,h2,h3) { color: var(--ink); font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 300; }
  .doctrine-root em { font-style: italic; color: var(--brass); }
  .doctrine-root strong { font-weight: 500; color: var(--ink); }

  html { scroll-behavior: smooth; }

  .grain {
    position: fixed; inset: 0; z-index: 1; pointer-events: none;
    opacity: 0.28; mix-blend-mode: multiply;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'><filter id='p'><feTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' seed='4'/><feColorMatrix values='0 0 0 0 0.1 0 0 0 0 0.08 0 0 0 0 0.06 0 0 0 0.5 0'/></filter><rect width='100%25' height='100%25' filter='url(%23p)'/></svg>");
  }
  .progress-bar {
    position: fixed; top: 0; left: 0; height: 1px;
    background: var(--brass); z-index: 50;
    transition: width 0.1s linear;
  }

  /* Cover */
  .cover {
    min-height: 100vh;
    position: relative;
    padding: 64px clamp(28px, 8vw, 140px);
    display: flex; flex-direction: column; align-items: center;
  }
  .volume-mark {
    position: absolute; top: 64px; left: clamp(28px, 8vw, 140px);
    text-align: left;
  }
  .vm-box {
    width: 48px; height: 48px;
    border: 1px solid var(--brass);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif; font-weight: 500;
    font-size: 16px; color: var(--brass); letter-spacing: 0.06em;
  }
  .vm-line { font-family: 'Inter', sans-serif; font-weight: 500; letter-spacing: 0.36em; text-transform: uppercase; margin-top: 4px; }
  .vm-brass { font-size: 10px; color: var(--brass); margin-top: 12px; }
  .vm-quiet { font-size: 9px; color: var(--ink-quiet); }
  .vm-whisper { font-size: 9px; color: var(--ink-whisper); }

  .cover-inner { margin-top: 180px; max-width: 880px; text-align: center; }
  .eyebrow { display: inline-flex; align-items: center; gap: 16px; }
  .eyebrow-rule { display: inline-block; width: 24px; height: 1px; background: var(--brass); }
  .eyebrow-text { font-family: 'Inter', sans-serif; font-weight: 500; font-size: 10px; letter-spacing: 0.36em; text-transform: uppercase; color: var(--brass); }

  .cover-h1 {
    margin-top: 80px; font-size: clamp(52px, 10vw, 104px);
    line-height: 0.94; letter-spacing: -0.025em; font-weight: 300;
    font-feature-settings: "liga","dlig","swsh","salt";
  }
  .cover-h1 span { display: block; }
  .cover-h1 em { color: var(--brass); font-style: italic; }

  .cover-subhead {
    margin: 72px auto 0; max-width: 560px;
    font-family: 'Cormorant Garamond', serif; font-weight: 300;
    font-size: 22px; line-height: 1.55; color: var(--ink-quiet);
  }
  .cover-subhead em { color: var(--ink-quiet); font-style: italic; }

  .toc {
    margin-top: 120px;
    display: flex; align-items: stretch; justify-content: center;
    flex-wrap: wrap; gap: 0;
  }
  .toc-item {
    position: relative; padding: 0 28px; text-decoration: none; color: inherit;
    display: flex; flex-direction: column; align-items: center; gap: 8px;
  }
  .toc-num { font-family: 'Inter', sans-serif; font-weight: 500; font-size: 10px; letter-spacing: 0.36em; text-transform: uppercase; color: var(--brass); }
  .toc-title { font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: 16px; color: var(--ink); }
  .toc-divider {
    position: absolute; right: 0; top: 4px; bottom: 4px; width: 1px; background: var(--rule-ghost);
  }
  .toc-item:last-child .toc-divider { display: none; }
  .toc-item:hover .toc-title { color: var(--brass); }

  .cover-base {
    margin-top: auto; padding-top: 80px; display: flex; flex-direction: column; align-items: center;
  }
  .cover-meta {
    margin-top: 32px; font-family: 'Inter', sans-serif; font-weight: 500;
    font-size: 10px; letter-spacing: 0.32em; text-transform: uppercase; color: var(--ink-quiet);
  }

  /* Page */
  .page {
    max-width: 1120px; margin: 0 auto;
    padding: 96px clamp(28px, 8vw, 140px);
    position: relative;
  }
  .page-alt { background: var(--bone-deep); }

  .page-masthead {
    display: flex; justify-content: space-between; align-items: baseline;
    border-bottom: 1px solid var(--rule-ghost); padding-bottom: 12px; margin-bottom: 28px;
    font-family: 'Inter', sans-serif; font-weight: 500; font-size: 9px;
    letter-spacing: 0.32em; text-transform: uppercase; color: var(--ink-whisper);
  }
  .page-masthead-right { color: var(--brass); }

  .page-label {
    font-family: 'Inter', sans-serif; font-weight: 500; font-size: 10px;
    letter-spacing: 0.32em; text-transform: uppercase; color: var(--ink-quiet);
    margin-bottom: 24px;
  }

  .page-h2 {
    font-size: clamp(32px, 5vw, 56px); line-height: 1.05; letter-spacing: -0.015em;
    margin: 0 0 32px; max-width: 820px;
  }
  .lead {
    font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: 22px;
    line-height: 1.55; color: var(--ink); max-width: 680px; margin: 0 0 40px;
  }

  .body-col { max-width: 620px; }
  .body-col p { margin: 0 0 1.4em; }

  .body-with-margin { position: relative; }
  .margin-note {
    font-family: 'Inter', sans-serif; font-style: italic; font-weight: 300;
    font-size: 14px; line-height: 1.6; color: var(--ink-quiet); max-width: 200px;
  }
  @media (min-width: 1024px) {
    .body-with-margin { display: grid; grid-template-columns: 1fr 220px; gap: 48px; align-items: start; }
    .margin-note { padding-top: 8px; border-top: 1px solid var(--rule-ghost); }
  }
  @media (max-width: 1023px) {
    .margin-note { margin: 24px 0 0; padding-left: 16px; border-left: 1px solid var(--rule-ghost); }
  }

  /* Definition block */
  .definition-block {
    margin: 80px auto; max-width: 720px; text-align: center;
  }
  .def-rule { width: 40px; height: 1px; background: var(--brass); margin: 0 auto 56px; }
  .definition-block .def-rule:last-child { margin: 56px auto 0; }
  .def-line {
    font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: 30px;
    color: var(--ink); margin-bottom: 56px; line-height: 1.3;
  }
  .def-line:last-of-type { margin-bottom: 0; font-size: 24px; max-width: 560px; margin-left: auto; margin-right: auto; }
  .def-line em { color: var(--brass); font-style: italic; }

  /* Figure */
  .figure {
    margin: 64px auto; max-width: 720px; text-align: center;
    border: 1px solid var(--rule); padding: 28px; border-radius: 2px;
    background: var(--bone);
  }
  .page-alt .figure { background: var(--bone); }
  .figure svg { width: 100%; height: auto; max-width: 600px; display: block; margin: 0 auto; }
  .figure-caption {
    margin-top: 20px;
    font-family: 'Inter', sans-serif; font-weight: 500; font-size: 9px;
    letter-spacing: 0.36em; text-transform: uppercase; color: var(--ink-whisper);
  }

  /* Pull quote */
  .pull-quote {
    margin: 64px 0; max-width: 720px;
    border-left: 1px solid var(--brass); padding-left: 40px;
  }
  .pull-quote p {
    font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 400;
    font-size: clamp(24px, 3.2vw, 38px); line-height: 1.28; color: var(--ink); margin: 0 0 16px;
  }
  .pull-quote cite { font-style: normal; font-family: 'Inter', sans-serif; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--oxblood); }
  .pull-quote cite em { color: var(--oxblood); }

  .closer-muted {
    margin: 48px 0 0; max-width: 620px;
    font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 18px;
    color: var(--ink-quiet); line-height: 1.5;
  }

  /* Page break ornament */
  .page-break {
    text-align: center; padding: 96px 0 24px;
  }
  .page-break-dots { color: var(--brass); letter-spacing: 0.6em; font-size: 14px; }
  .page-break-next {
    margin-top: 24px; font-family: 'Inter', sans-serif; font-weight: 500;
    font-size: 9px; letter-spacing: 0.36em; text-transform: uppercase; color: var(--ink-whisper);
  }

  /* Two-path */
  .two-path {
    margin: 64px 0; border: 1px solid var(--rule); border-radius: 2px;
    display: grid; grid-template-columns: 1fr 1fr;
  }
  .path-col { padding: 40px; }
  .path-col + .path-col { border-left: 1px solid var(--rule); }
  @media (max-width: 768px) {
    .two-path { grid-template-columns: 1fr; }
    .path-col + .path-col { border-left: none; border-top: 1px solid var(--rule); }
  }
  .sub-label {
    font-family: 'Inter', sans-serif; font-weight: 500; font-size: 10px;
    letter-spacing: 0.28em; text-transform: uppercase; color: var(--brass);
    border-bottom: 1px solid var(--brass); padding-bottom: 16px; margin-bottom: 24px;
    display: inline-block;
  }
  .path-title { font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: 24px; color: var(--ink); margin-bottom: 16px; }
  .path-title em { color: var(--ink); font-style: italic; }
  .path-body { font-size: 15px; margin: 0 0 24px; color: var(--ink-body); line-height: 1.7; }
  .path-link {
    font-family: 'Inter', sans-serif; font-size: 14px; color: var(--ink);
    border-bottom: 1px solid var(--rule); text-decoration: none; padding-bottom: 2px;
  }
  .path-link:hover { color: var(--brass); border-bottom-color: var(--brass); }

  .insider-form { display: flex; flex-direction: column; gap: 12px; }
  .insider-input {
    width: 100%; padding: 14px; border: 1px solid var(--rule); border-radius: 2px;
    background: var(--bone); font-family: 'Inter', sans-serif; font-weight: 300;
    font-size: 14px; color: var(--ink);
  }
  .insider-input::placeholder { color: var(--ink-whisper); font-style: italic; }
  .insider-button {
    width: 100%; padding: 16px 28px; border-radius: 999px; border: 1px solid var(--brass);
    background: var(--brass); color: var(--bone);
    font-family: 'Inter', sans-serif; font-weight: 500; font-size: 14px;
    letter-spacing: 0.06em; cursor: pointer; transition: background 0.2s ease;
  }
  .insider-button:hover { background: var(--brass-deep); border-color: var(--brass-deep); }
  .insider-success { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 18px; color: var(--ink-quiet); }

  .visually-hidden {
    position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
  }

  /* Focus */
  .doctrine-root a:focus-visible,
  .doctrine-root button:focus-visible,
  .doctrine-root input:focus-visible {
    outline: 2px solid var(--brass); outline-offset: 2px;
  }

  /* Colophon */
  .colophon {
    margin: 200px auto 96px; max-width: 720px; text-align: center;
    padding: 0 28px;
  }
  .colophon-rule { width: 120px; height: 1px; background: var(--brass); margin: 0 auto 64px; }
  .colophon-1 { font-family: 'Inter', sans-serif; font-weight: 500; font-size: 11px; letter-spacing: 0.32em; text-transform: uppercase; color: var(--ink-quiet); }
  .colophon-2 { margin-top: 24px; font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 400; font-size: 16px; color: var(--ink-quiet); }
  .colophon-3 { margin-top: 48px; font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 300; font-size: 14px; color: var(--ink-whisper); }
  .colophon-fleuron { margin-top: 32px; color: var(--brass); font-size: 20px; }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    .progress-bar { transition: none; }
  }

  /* Print */
  @media print {
    .grain, .progress-bar { display: none !important; }
    .doctrine-root { background: white !important; color: black !important; font-size: 11pt; }
    .page, .cover { page-break-after: always; padding: 24mm; }
    .page-break { display: none; }
    .colophon { page-break-before: always; }
  }
`;

export default DoctrineOnBrand;
