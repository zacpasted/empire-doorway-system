import { useEffect, useMemo, useState } from "react";
import { ReadingPanel, type ReadingContent } from "@/components/library/ReadingPanel";
import { BOOKS, getReadingFor, type Book } from "@/data/books";
import heroCover from "@/assets/library-cover-hero.jpg";
import readingRoom from "@/assets/library-reading-room.jpg";
import tile1 from "@/assets/workbook-plate-room.jpg";
import tile2 from "@/assets/workbook-plate-departure.jpg";
import tile3 from "@/assets/workbook-plate-card-a.jpg";
import tile4 from "@/assets/workbook-plate-card-b.jpg";

const NAV = [
  { label: "Partnership", href: "#" },
  { label: "Library", href: "/library", active: true },
  { label: "Studio", href: "#" },
  { label: "Experiences", href: "#" },
];

const MONO: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 11,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
};
const PLAYFAIR = "'Playfair Display', Georgia, serif";
const OXBLOOD = "#5C1A1F";
const OXBLOOD_DEEP = "#6E1E26";
const BONE = "#F4F1EC";
const CHARCOAL = "#0A0A0A";
const IVORY = "#F4F1EC";

const EASE_CONFIDENT = "cubic-bezier(0.16, 1, 0.3, 1)";

const FEATURED: { vol: string; title: string; subtitle: string; spine: number; bookId: string }[] = [
  { vol: "Vol. I",   title: "On Saying Less",         subtitle: "A note on restraint.",          spine: 0, bookId: "L01" },
  { vol: "Vol. II",  title: "The Soft Open",          subtitle: "An opening without an opening.", spine: 1, bookId: "L02" },
  { vol: "Vol. IV",  title: "Letters to a New Operator", subtitle: "First principles, in order.", spine: 3, bookId: "L04" },
  { vol: "Vol. VIII",title: "On Patience as a Strategy", subtitle: "The cost of being early.",   spine: 2, bookId: "L08" },
];

const TILES = [
  { num: "I",   tag: "NOTES",       title: "Notes",       img: tile1, body: "Working principles. The methods we keep returning to." },
  { num: "II",  tag: "CASES",       title: "Cases",       img: tile2, body: "Field reports from inside live engagements." },
  { num: "III", tag: "PRINCIPLES",  title: "Principles",  img: tile3, body: "What we have stopped explaining to people who don't need to ask." },
  { num: "IV",  tag: "TRANSCRIPTS", title: "Transcripts", img: tile4, body: "Conversations, kept on record." },
];

const TIMELINE = [
  { num: "I",   label: "METHODS", title: "How we work",          body: "The frameworks we deploy from week one." },
  { num: "II",  label: "CASES",   title: "What we have done",    body: "Engagements, on record, with names removed." },
  { num: "III", label: "ARCHIVE", title: "What we have kept",    body: "Letters, transcripts, drafts of doors." },
];

// Custom oxblood SVG marks (no emoji, no Heroicons)
const Mark = ({ kind }: { kind: "letter" | "book" | "compass" | "key" }) => {
  const s = { width: 32, height: 32, stroke: OXBLOOD, fill: "none", strokeWidth: 1.25 };
  if (kind === "letter") return (
    <svg viewBox="0 0 32 32" {...s}><rect x="4" y="8" width="24" height="16"/><path d="M4 8l12 9 12-9"/></svg>
  );
  if (kind === "book") return (
    <svg viewBox="0 0 32 32" {...s}><path d="M5 6h9a3 3 0 0 1 3 3v17"/><path d="M27 6h-9a3 3 0 0 0-3 3v17"/><path d="M5 6v17h22V6"/></svg>
  );
  if (kind === "compass") return (
    <svg viewBox="0 0 32 32" {...s}><circle cx="16" cy="16" r="11"/><path d="M16 5v3M16 24v3M5 16h3M24 16h3"/><path d="M20 12l-2.5 7-7 2.5 2.5-7 7-2.5z" fill={OXBLOOD} stroke="none"/></svg>
  );
  return (
    <svg viewBox="0 0 32 32" {...s}><circle cx="11" cy="16" r="5"/><path d="M16 16h12M22 16v4M26 16v3"/></svg>
  );
};

const Spine = ({ variant, title, vol, tilt = 0 }: { variant: number; title: string; vol: string; tilt?: number }) => {
  const palette = [
    { from: "#5C1A1F", to: "#2E0E11", text: "#E8DEC6" }, // oxblood
    { from: "#1B2A48", to: "#0A1226", text: "#E8DEC6" }, // midnight
    { from: "#1F3A2E", to: "#0F2017", text: "#E8DEC6" }, // forest
    { from: "#8B6F47", to: "#4F3E26", text: "#1A1208" }, // tan
  ][variant % 4];
  return (
    <div
      className="relative overflow-hidden"
      style={{
        height: 220,
        width: "100%",
        background: `linear-gradient(180deg, ${palette.from} 0%, ${palette.to} 100%)`,
        boxShadow: "inset 1px 0 0 rgba(255,255,255,0.06), inset -1px 0 0 rgba(0,0,0,0.5), 0 12px 30px -18px rgba(0,0,0,0.7)",
        transform: `perspective(800px) rotateY(${tilt}deg)`,
        transformOrigin: "bottom center",
        transition: `transform 600ms ${EASE_CONFIDENT}`,
      }}
    >
      {/* hairline rules top + foot */}
      <div className="absolute left-2 right-2" style={{ top: 14, height: 1, background: "rgba(201,169,110,0.5)" }} />
      <div className="absolute left-2 right-2" style={{ top: 22, height: 1, background: "rgba(201,169,110,0.3)" }} />
      <div className="absolute left-2 right-2" style={{ bottom: 14, height: 1, background: "rgba(201,169,110,0.5)" }} />
      <div className="absolute left-2 right-2" style={{ bottom: 22, height: 1, background: "rgba(201,169,110,0.3)" }} />
      {/* leather grain */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "repeating-linear-gradient(180deg, rgba(0,0,0,0.06) 0 1px, transparent 1px 3px)",
        opacity: 0.6,
      }} />
      {/* rotated title */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div style={{
          transform: "rotate(-90deg)",
          fontFamily: PLAYFAIR,
          fontWeight: 400,
          fontSize: 14,
          letterSpacing: "0.08em",
          color: palette.text,
          whiteSpace: "nowrap",
          textShadow: "0 1px 0 rgba(0,0,0,0.4)",
        }}>{title}</div>
      </div>
      {/* gold vol mark at foot */}
      <div className="absolute left-0 right-0 text-center" style={{
        bottom: 30, ...MONO, fontSize: 9, color: "rgba(201,169,110,0.85)",
      }}>{vol}</div>
    </div>
  );
};

const LibraryHome = () => {
  const [reading, setReading] = useState<ReadingContent | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [scrollHintVisible, setScrollHintVisible] = useState(false);

  useEffect(() => { document.title = "The Library — PASTED"; }, []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { const t = setTimeout(() => setScrollHintVisible(true), 3000); return () => clearTimeout(t); }, []);

  const open = (id: string) => { const c = getReadingFor(id); if (c) setReading(c); };

  const recent = useMemo(() => BOOKS.filter((b) => b.pages).slice(0, 6), []);

  return (
    <div className="min-h-screen" style={{ background: BONE, color: CHARCOAL }}>
      {/* 1. HEADER */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled ? BONE : "transparent",
          borderBottom: scrolled ? "1px solid rgba(10,10,10,0.08)" : "1px solid transparent",
          transition: "background-color 200ms ease, border-color 200ms ease",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-8 h-14 flex items-center justify-between">
          <a href="/library" style={{
            fontFamily: PLAYFAIR, fontWeight: 400, fontSize: 22, letterSpacing: "0.04em",
            color: scrolled ? CHARCOAL : IVORY, transition: "color 200ms ease",
          }}>PASTED</a>
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((n) => (
              <a key={n.label} href={n.href} className="relative pb-1" style={{
                ...MONO,
                color: scrolled
                  ? (n.active ? CHARCOAL : "rgba(10,10,10,0.55)")
                  : (n.active ? IVORY : "rgba(244,241,236,0.65)"),
                transition: "color 200ms ease",
              }}>
                {n.label}
                {n.active && <span className="absolute left-0 right-0 -bottom-0.5 h-px" style={{ background: OXBLOOD }} />}
              </a>
            ))}
            <a
              href="#request"
              className="ml-4 inline-flex items-center justify-center rounded-full px-4 py-1.5 transition-all"
              style={{
                ...MONO,
                border: `1px solid ${scrolled ? CHARCOAL : IVORY}`,
                color: scrolled ? CHARCOAL : IVORY,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = OXBLOOD; e.currentTarget.style.color = IVORY; e.currentTarget.style.borderColor = OXBLOOD; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = scrolled ? CHARCOAL : IVORY; e.currentTarget.style.borderColor = scrolled ? CHARCOAL : IVORY; }}
            >RETURN</a>
          </nav>
        </div>
      </header>

      {/* 2. HERO — full-bleed photo, massive headline, 3 caption columns at foot, page-number stack on the right */}
      <section className="relative w-full overflow-hidden" style={{ background: CHARCOAL, color: IVORY, minHeight: "100vh" }}>
        <div className="absolute inset-0 lib-kenburns">
          <img src={heroCover} alt="The Pasted Library — antique reading room" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.35) 35%, rgba(10,10,10,0.78) 100%)" }} />

        {/* Massive title — sits left, mid-hero */}
        <div className="relative max-w-[1400px] mx-auto px-8" style={{ paddingTop: 180 }}>
          <h1 style={{
            fontFamily: PLAYFAIR, fontWeight: 300, color: IVORY,
            fontSize: "clamp(64px, 11vw, 168px)", lineHeight: 0.92, letterSpacing: "-0.02em",
            margin: 0,
          }}>
            THE<br />LIBRARY
          </h1>
          <div style={{ width: 56, height: 1, background: OXBLOOD, marginTop: 28 }} />
        </div>

        {/* Right-side page-number stack */}
        <div className="hidden md:flex absolute flex-col items-end gap-3" style={{ right: 80, top: "38%" }}>
          {["01", "02", "03"].map((n, i) => (
            <div key={n} style={{
              fontFamily: PLAYFAIR,
              fontWeight: i === 1 ? 400 : 300,
              fontSize: i === 1 ? 56 : 14,
              color: i === 1 ? IVORY : "rgba(244,241,236,0.45)",
              lineHeight: 1,
              letterSpacing: "0.04em",
            }}>{n}</div>
          ))}
        </div>

        {/* Bottom caption row — 3 columns, oxblood underline accent on the active one */}
        <div className="relative max-w-[1400px] mx-auto px-8" style={{ paddingTop: 120, paddingBottom: 64 }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            {[
              { i: 0, body: "What the library holds. Working notes, refusals, principles we keep returning to." },
              { i: 1, body: "Volumes from inside live engagements. Field reports with the names removed." },
              { i: 2, body: "Conversations and letters, kept on record. Read by the people who already know." },
            ].map((c) => (
              <a key={c.i} href="#featured" className="group block">
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13, lineHeight: 1.6,
                  color: "rgba(244,241,236,0.78)",
                  maxWidth: 320,
                }}>{c.body}</p>
                <div className="mt-5 relative inline-block pb-2">
                  <span style={{ ...MONO, color: IVORY }}>READ MORE →</span>
                  <span className="absolute left-0 right-0 -bottom-0 h-px" style={{ background: c.i === 0 ? OXBLOOD : "rgba(244,241,236,0.25)" }} />
                  <span className="absolute left-0 -bottom-0 h-px transition-all duration-500" style={{
                    width: c.i === 0 ? "100%" : 0, background: OXBLOOD,
                  }} />
                </div>
              </a>
            ))}
          </div>

          <div className="mt-16" style={{ height: 1, background: "rgba(244,241,236,0.18)" }} />
        </div>
      </section>

      {/* 3. FEATURED VOLUMES — bone register, centered eyebrow + 4 image cards (mirrors "POPULAR TOURS") */}
      <section id="featured" style={{ background: BONE, paddingTop: 140, paddingBottom: 140 }}>
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="text-center">
            <div style={{
              fontFamily: "'DM Sans', sans-serif", fontStyle: "italic",
              fontSize: 14, color: "rgba(10,10,10,0.55)",
            }}>and what we keep returning to</div>
            <h2 className="mt-4" style={{
              ...MONO, fontSize: 13, color: CHARCOAL, letterSpacing: "0.36em",
            }}>FEATURED VOLUMES</h2>
            <div className="mx-auto mt-6" style={{ width: 28, height: 1, background: OXBLOOD }} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-16">
            {FEATURED.map((v, i) => {
              const imgs = [tile1, tile2, tile3, tile4];
              return (
                <button
                  key={v.bookId}
                  onClick={() => open(v.bookId)}
                  className="group block text-left"
                >
                  <div className="relative overflow-hidden" style={{ aspectRatio: "3 / 4" }}>
                    <img
                      src={imgs[i % imgs.length]}
                      alt=""
                      className="w-full h-full object-cover"
                      style={{ transition: `transform 700ms ${EASE_CONFIDENT}` }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
                    />
                    <div className="absolute inset-0" style={{
                      background: "linear-gradient(180deg, rgba(10,10,10,0) 50%, rgba(10,10,10,0.55) 100%)",
                    }} />
                    <div className="absolute left-4 right-4" style={{ bottom: 14 }}>
                      <div style={{
                        fontFamily: PLAYFAIR, fontWeight: 400, fontStyle: "italic",
                        fontSize: 18, color: IVORY,
                      }}>VOL № {["I","II","III","IV"][i]}</div>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <div style={{
                      fontFamily: PLAYFAIR, fontWeight: 400, fontSize: 17, color: CHARCOAL,
                    }}>{v.title}</div>
                    <div className="mt-1" style={{
                      fontFamily: "'DM Sans', sans-serif", fontStyle: "italic",
                      fontSize: 12, color: "rgba(10,10,10,0.55)",
                    }}>{v.subtitle}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mx-auto mt-20" style={{ width: 320, maxWidth: "60%", height: 1, background: "rgba(10,10,10,0.12)" }} />
        </div>
      </section>

      {/* 5. ABOUT THE LIBRARY */}
      <section style={{ paddingTop: 160, paddingBottom: 160 }}>
        <div className="max-w-[1400px] mx-auto px-8 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5">
            <div style={{ ...MONO, color: OXBLOOD }}>ABOUT THE LIBRARY</div>
            <h2 className="mt-6" style={{ fontFamily: PLAYFAIR, fontWeight: 300, fontSize: 36, lineHeight: 1.1, letterSpacing: "-0.01em" }}>Not a content hub.</h2>
            <h2 style={{ fontFamily: PLAYFAIR, fontWeight: 300, fontStyle: "italic", fontSize: 36, lineHeight: 1.1, letterSpacing: "-0.01em" }}>A record.</h2>
            <div className="mt-12 space-y-6" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.7, color: "rgba(10,10,10,0.78)", maxWidth: 480 }}>
              <p>The library is closed by default. Inside, you'll find what we have written down for our partners — methods we deploy, principles we defend, conversations we keep on record.</p>
              <p>It is not designed to be discovered. It is designed to be useful to the people who already know why they are here.</p>
              <p>Volumes are added by us, on our schedule, when something is worth writing down.</p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <div className="relative" style={{ borderLeft: `1px solid ${OXBLOOD}33`, paddingLeft: 40 }}>
              {TIMELINE.map((b, i) => (
                <div key={b.num} className="relative" style={{ paddingTop: i === 0 ? 0 : 56, paddingBottom: i === TIMELINE.length - 1 ? 0 : 0 }}>
                  <span className="absolute" style={{
                    left: -45, top: i === 0 ? 4 : 60, width: 9, height: 9, borderRadius: "50%",
                    border: `1px solid ${OXBLOOD}`, background: BONE,
                  }} />
                  <div style={{ ...MONO, color: OXBLOOD }}>{b.num} — {b.label}</div>
                  <div className="mt-3 flex items-start gap-6">
                    <div style={{
                      width: 60, height: 80,
                      background: `linear-gradient(180deg, ${["#5C1A1F","#1F3A2E","#1B2A48"][i]} 0%, #1a0a0c 100%)`,
                      border: `1px solid ${OXBLOOD}55`,
                      flex: "0 0 auto",
                    }} />
                    <div>
                      <div style={{ fontFamily: PLAYFAIR, fontWeight: 400, fontSize: 22, color: CHARCOAL }}>{b.title}</div>
                      <div className="mt-2" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,10,10,0.65)", maxWidth: 380 }}>{b.body}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHAT'S INSIDE */}
      <section style={{ paddingTop: 140, paddingBottom: 140 }}>
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="text-center">
            <div style={{ ...MONO, color: OXBLOOD }}>WHAT'S INSIDE</div>
            <h2 className="mt-5" style={{ fontFamily: PLAYFAIR, fontWeight: 300, fontSize: 36, color: CHARCOAL, letterSpacing: "-0.01em" }}>The structure.</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {[
              { mark: "letter" as const, tag: "NOTES",       title: "Notes",       body: "Working principles, methods, frameworks." },
              { mark: "book" as const,   tag: "CASES",       title: "Cases",       body: "Engagement reports and field studies." },
              { mark: "compass" as const,tag: "PRINCIPLES",  title: "Principles",  body: "Refusals and standards we hold." },
              { mark: "key" as const,    tag: "TRANSCRIPTS", title: "Transcripts", body: "Conversations kept on record." },
            ].map((c) => (
              <div
                key={c.tag}
                className="transition-all"
                style={{
                  background: "rgba(10,10,10,0.04)",
                  border: "1px solid rgba(10,10,10,0.10)",
                  padding: "32px 28px",
                  transition: `border-color 600ms ease, transform 600ms ${EASE_CONFIDENT}`,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = OXBLOOD; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(10,10,10,0.10)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <Mark kind={c.mark} />
                <div className="mt-6" style={{ ...MONO, color: OXBLOOD }}>{c.tag}</div>
                <div className="mt-2" style={{ fontFamily: PLAYFAIR, fontWeight: 400, fontSize: 20, color: CHARCOAL }}>{c.title}</div>
                <p className="mt-2" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, lineHeight: 1.55, color: "rgba(10,10,10,0.7)" }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. SECONDARY CINEMATIC — full-bleed photo, big left-aligned title, play button, two video thumbnails bottom-right
              (mirrors the "TRAVEL AND INSPIRE YOUR LIFE" panel of the reference) */}
      <section className="relative overflow-hidden" style={{ background: CHARCOAL, minHeight: "100vh" }}>
        <div className="absolute inset-0">
          <img src={readingRoom} alt="" className="w-full h-full object-cover" style={{ opacity: 0.45 }} />
        </div>
        <div className="absolute inset-0" style={{
          background: "linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.35) 50%, rgba(10,10,10,0.85) 100%)",
        }} />

        <div className="relative max-w-[1400px] mx-auto px-8 grid grid-cols-12 gap-8" style={{ paddingTop: 160, paddingBottom: 80 }}>
          <div className="col-span-12 md:col-span-7">
            <h2 style={{
              fontFamily: PLAYFAIR, fontWeight: 300, color: IVORY,
              fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 0.96, letterSpacing: "-0.02em",
              margin: 0,
            }}>
              WHAT WE<br />KNOW, <em style={{ fontStyle: "italic" }}>written</em><br /><em style={{ fontStyle: "italic" }}>down.</em>
            </h2>

            <div className="mt-12 flex items-center gap-5">
              <button
                className="flex items-center justify-center rounded-full transition-colors"
                style={{ width: 64, height: 64, border: `1px solid ${IVORY}`, background: "transparent" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = OXBLOOD; e.currentTarget.style.borderColor = OXBLOOD; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = IVORY; }}
                aria-label="Play film"
              >
                <svg width="14" height="16" viewBox="0 0 12 14" fill={IVORY}><path d="M0 0v14l12-7L0 0z"/></svg>
              </button>
              <span style={{ ...MONO, color: "rgba(244,241,236,0.7)" }}>WATCH THE FILM</span>
            </div>

            <p className="mt-12" style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.65,
              color: "rgba(244,241,236,0.7)", maxWidth: 380,
            }}>
              A short film from inside the room. Three minutes, no narration. The library, the desks, the shelves we walked past on the way to writing this down.
            </p>
          </div>

          <div className="col-span-12 md:col-span-5 self-end">
            <div className="grid grid-cols-2 gap-4 md:gap-5">
              {[tile2, tile3].map((src, i) => (
                <button
                  key={i}
                  className="group relative overflow-hidden block"
                  style={{ aspectRatio: "4 / 3" }}
                  aria-label={`Film clip ${i + 2}`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" style={{ transition: `transform 700ms ${EASE_CONFIDENT}` }} />
                  <div className="absolute inset-0" style={{ background: "rgba(10,10,10,0.30)" }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex items-center justify-center rounded-full" style={{ width: 36, height: 36, border: `1px solid ${IVORY}`, background: "rgba(10,10,10,0.35)" }}>
                      <svg width="9" height="11" viewBox="0 0 12 14" fill={IVORY}><path d="M0 0v14l12-7L0 0z"/></svg>
                    </span>
                  </div>
                  <div className="absolute left-3 bottom-3" style={{ ...MONO, fontSize: 9, color: IVORY }}>
                    FILM 0{i + 2}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7.5 RECENTLY ADDED — small index */}
      <section style={{ paddingTop: 140, paddingBottom: 60 }}>
        <div className="max-w-[1400px] mx-auto px-8">
          <div style={{ marginBottom: 40 }}>
            <div style={{ ...MONO, color: OXBLOOD }}>LATEST</div>
            <h2 className="mt-3" style={{ fontFamily: PLAYFAIR, fontWeight: 300, fontSize: 36, color: CHARCOAL, letterSpacing: "-0.01em" }}>Recently added.</h2>
          </div>
          <div>
            {recent.map((b: Book) => (
              <button
                key={b.id}
                onClick={() => open(b.id)}
                className="group grid items-center w-full text-left"
                style={{
                  gridTemplateColumns: "120px 1fr 160px",
                  padding: "22px 12px",
                  borderBottom: "1px solid rgba(10,10,10,0.08)",
                  transition: "background-color 300ms ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(10,10,10,0.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <div style={{ ...MONO, color: "rgba(10,10,10,0.55)" }}>{b.year}</div>
                <div className="relative">
                  <span style={{ fontFamily: PLAYFAIR, fontWeight: 400, fontSize: 22, color: CHARCOAL }}>{b.title}</span>
                </div>
                <div className="text-right" style={{ ...MONO, color: OXBLOOD }}>{b.category}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 8. APPLICATION FORM */}
      <section id="request" style={{ paddingTop: 160, paddingBottom: 160 }}>
        <div className="max-w-[1400px] mx-auto px-8 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-6">
            <div style={{ ...MONO, color: OXBLOOD }}>REQUEST ACCESS</div>
            <h2 className="mt-6" style={{ fontFamily: PLAYFAIR, fontWeight: 300, fontSize: 36, color: CHARCOAL, lineHeight: 1.1, letterSpacing: "-0.01em" }}>Want a key?</h2>
            <h2 style={{ fontFamily: PLAYFAIR, fontWeight: 300, fontStyle: "italic", fontSize: 36, color: CHARCOAL, lineHeight: 1.1, letterSpacing: "-0.01em" }}>Tell us who you are.</h2>
            <p className="mt-8" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.65, color: "rgba(10,10,10,0.7)", maxWidth: 460 }}>
              Access is by invitation. If we don't know you yet, leave a note. We read everything that comes in.
            </p>
          </div>
          <form
            className="col-span-12 md:col-span-5 md:col-start-8"
            onSubmit={(e) => { e.preventDefault(); (e.currentTarget as HTMLFormElement).reset(); }}
          >
            {[
              { name: "name",  label: "Your name",  type: "text" as const },
              { name: "email", label: "Your email", type: "email" as const },
            ].map((f) => (
              <div key={f.name} className="mb-10">
                <label htmlFor={f.name} style={{ ...MONO, color: OXBLOOD, display: "block", marginBottom: 10 }}>{f.label}</label>
                <input
                  id={f.name}
                  name={f.name}
                  type={f.type}
                  required
                  className="w-full bg-transparent outline-none"
                  style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: CHARCOAL,
                    padding: "8px 0",
                    borderBottom: "1px solid rgba(10,10,10,0.15)",
                  }}
                />
              </div>
            ))}
            <div className="mb-10">
              <label htmlFor="why" style={{ ...MONO, color: OXBLOOD, display: "block", marginBottom: 10 }}>Why are you here?</label>
              <textarea
                id="why" name="why" rows={3} required
                className="w-full bg-transparent outline-none resize-none"
                style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: CHARCOAL,
                  padding: "8px 0",
                  borderBottom: "1px solid rgba(10,10,10,0.15)",
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                ...MONO, color: IVORY, background: CHARCOAL,
                padding: "16px 28px", border: "none", cursor: "pointer",
                transition: "background-color 240ms ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = OXBLOOD)}
              onMouseLeave={(e) => (e.currentTarget.style.background = CHARCOAL)}
            >SEND →</button>
          </form>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer style={{ paddingTop: 120 }}>
        <div className="max-w-[1400px] mx-auto px-8" style={{ borderTop: `1px solid ${OXBLOOD}0D`, paddingTop: 32, paddingBottom: 24 }}>
          <div className="grid grid-cols-3 items-center">
            <div style={{ ...MONO, color: "rgba(10,10,10,0.55)" }}>PASTED LIBRARY / EST. 2024</div>
            <div className="flex justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={OXBLOOD} strokeWidth="1.25">
                <ellipse cx="12" cy="12" rx="10" ry="6.5" />
                <text x="12" y="15.5" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="9" fill={OXBLOOD} stroke="none">P</text>
              </svg>
            </div>
            <div className="flex justify-end gap-6">
              {NAV.map((n) => (
                <a key={n.label} href={n.href} style={{ ...MONO, color: "rgba(10,10,10,0.55)" }}>{n.label}</a>
              ))}
            </div>
          </div>
          <div className="mt-10 pt-6 border-t" style={{ borderColor: "rgba(10,10,10,0.06)" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(10,10,10,0.4)" }}>
              © Pasted 2026. By invitation.
            </div>
          </div>
        </div>
      </footer>

      <ReadingPanel content={reading} onClose={() => setReading(null)} />
    </div>
  );
};

export default LibraryHome;
