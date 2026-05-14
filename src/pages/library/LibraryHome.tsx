import { useEffect, useMemo, useState } from "react";
import { DustMotes } from "@/components/library/DustMotes";
import { ReadingPanel, type ReadingContent } from "@/components/library/ReadingPanel";
import { Bookshelf } from "@/components/library/Bookshelf";
import { BOOKS, FILTERS, getReadingFor, type Book } from "@/data/books";

const NAV = [
  { label: "Partnership", href: "#" },
  { label: "Library", href: "/library", active: true },
  { label: "Studio", href: "#" },
  { label: "Experiences", href: "#" },
];

const LibraryHome = () => {
  const [reading, setReading] = useState<ReadingContent | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("ALL");
  const [hintVisible, setHintVisible] = useState(false);

  useEffect(() => { document.title = "The Library — PASTED"; }, []);
  useEffect(() => { const t = setTimeout(() => setHintVisible(true), 2000); return () => clearTimeout(t); }, []);

  const openBook = (b: Book) => {
    const content = getReadingFor(b.id);
    if (content) setReading(content);
  };

  const filteredCatalogue = useMemo(
    () => BOOKS.filter((b) => filter === "ALL" || b.category === filter),
    [filter],
  );

  return (
    <div className="min-h-screen bg-bone text-lib-charcoal">
      {/* 1. HEADER */}
      <header className="sticky top-0 z-50 bg-bone">
        <div className="max-w-[1400px] mx-auto px-8 h-14 flex items-center justify-between">
          <a href="/library" className="select-none" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 300, fontSize: 18, letterSpacing: "0.04em" }}>
            PASTED
          </a>
          <nav className="flex items-center gap-8">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="relative pb-1"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: n.active ? "#0A0A0A" : "rgba(10,10,10,0.55)",
                }}
              >
                {n.label}
                {n.active && <span className="absolute left-0 right-0 -bottom-0.5 h-px" style={{ background: "#C9A96E" }} />}
              </a>
            ))}
          </nav>
        </div>
        <div style={{ height: 1, background: "rgba(10,10,10,0.08)" }} />
      </header>

      {/* 2. HERO — THE READING ROOM */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#0A0A0A", color: "#F4F1EC", height: "100vh", minHeight: 760 }}
      >
        {/* The shelf is the centrepiece */}
        <Bookshelf onOpen={openBook} focusedId={focusedId} onFocusChange={setFocusedId} />

        {/* Drifting dust */}
        <DustMotes />

        {/* Title overlay — sits above the shelf, top-left, generous margin */}
        <div className="absolute top-0 left-0 right-0 z-40 pointer-events-none">
          <div className="max-w-[1400px] mx-auto px-8 md:px-12 pt-10 md:pt-14">
            <div
              className="lib-fade-in"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.22em", color: "#C9A96E" }}
            >
              VOLUME ARCHIVE / 2025
            </div>
            <h1
              className="mt-4 lib-fade-in"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 300,
                fontSize: "clamp(40px, 5.2vw, 56px)",
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                color: "#F4F1EC",
                textShadow: "0 2px 18px rgba(0,0,0,0.6)",
              }}
            >
              The library.
            </h1>
            <h2
              className="mt-1 lib-fade-in"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "clamp(36px, 5vw, 56px)",
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                color: "rgba(244,241,236,0.88)",
                textShadow: "0 2px 18px rgba(0,0,0,0.6)",
              }}
            >
              What we know, written down<span style={{ color: "#C9A96E" }}>.</span>
            </h2>
          </div>
        </div>

        {/* Hint */}
        <div
          className="absolute left-0 right-0 z-40 text-center pointer-events-none"
          style={{
            bottom: 24,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.22em",
            color: "rgba(244,241,236,0.5)",
            opacity: hintVisible ? 1 : 0,
            transition: "opacity 1200ms ease",
            textShadow: "0 1px 6px rgba(0,0,0,0.6)",
          }}
        >
          DRAG, OR USE ARROW KEYS.
        </div>
      </section>

      {/* 4. ETHOS */}
      <section className="bg-bone" style={{ paddingTop: 200, paddingBottom: 160 }}>
        <div className="max-w-[1400px] mx-auto px-8 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: "rgba(10,10,10,0.6)" }}>
            ON THE LIBRARY
          </div>
          <div className="col-span-12 md:col-span-7" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 300, fontSize: 28, lineHeight: 1.4, color: "#0A0A0A", letterSpacing: "-0.005em" }}>
            The library is not content. It is a record. We keep it so we do not have to explain ourselves twice.
          </div>
        </div>
      </section>

      {/* 5. CATALOGUE */}
      <section className="bg-bone pb-32">
        <div className="max-w-[1400px] mx-auto px-8">
          {/* Filter row */}
          <div className="flex items-center gap-8 border-b" style={{ borderColor: "rgba(10,10,10,0.12)", paddingBottom: 20, marginBottom: 28 }}>
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className="relative pb-2"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  color: filter === f.key ? "#0A0A0A" : "rgba(10,10,10,0.5)",
                }}
              >
                {f.label}
                {filter === f.key && (
                  <span className="absolute left-0 right-0 -bottom-0.5 h-px" style={{ background: "#C9A96E" }} />
                )}
              </button>
            ))}
          </div>

          {/* Column headers */}
          <div
            className="grid items-center pb-3 mb-2 border-b"
            style={{
              gridTemplateColumns: "80px 1fr 100px 160px",
              borderColor: "rgba(201,169,110,0.55)",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.2em",
              color: "#C9A96E",
            }}
          >
            <div>VOL.</div>
            <div>TITLE</div>
            <div>YEAR</div>
            <div>CATEGORY</div>
          </div>

          {/* Rows */}
          <div>
            {filteredCatalogue.map((b) => {
              const isOpen = reading?.volume.id === b.id;
              const hasContent = !!b.pages;
              return (
                <button
                  key={b.id}
                  onClick={() => { if (hasContent) setReading(getReadingFor(b.id)); }}
                  disabled={!hasContent}
                  className="group grid items-center w-full text-left relative disabled:cursor-default"
                  style={{
                    gridTemplateColumns: "80px 1fr 100px 160px",
                    padding: "20px 12px",
                    borderBottom: "1px solid rgba(10,10,10,0.06)",
                    transition: "background-color 300ms ease",
                    opacity: hasContent ? 1 : 0.55,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(10,10,10,0.04)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.18em", color: "#0A0A0A" }}>
                    {b.vol}
                  </div>
                  <div className="relative pr-8">
                    <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 300, fontSize: 22, color: "#0A0A0A", letterSpacing: "-0.005em" }}>
                      {b.title}
                    </span>
                    <span
                      className="absolute left-0 -bottom-1 h-px transition-all duration-500"
                      style={{
                        background: "#C9A96E",
                        width: isOpen ? "100%" : 0,
                      }}
                    />
                    <span
                      className="absolute left-0 -bottom-1 h-px transition-all duration-500 group-hover:w-full"
                      style={{ background: "#C9A96E", width: 0 }}
                    />
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.18em", color: "rgba(10,10,10,0.7)" }}>
                    {b.year}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.18em", color: "#C9A96E" }}>
                    {b.category}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. MEDIA WING */}
      <section className="relative overflow-hidden" style={{ background: "#0A0A0A" }}>
        <DustMotes />
        <div className="grid grid-cols-1 md:grid-cols-3">
          {[
            { label: "FILM 01 / OPENING THE ROOM", kind: "video" as const, src: "" },
            { label: "STILL 02 / THE LONG ROOM", kind: "image" as const, src: "" },
            { label: "MOTION 03 / SPINE STUDY", kind: "video" as const, src: "" },
          ].map((tile, i) => (
            <MediaTile key={i} {...tile} />
          ))}
        </div>
      </section>

      {/* Foot */}
      <footer className="bg-bone py-16">
        <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between">
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: "rgba(10,10,10,0.55)" }}>
            THE PASTED LIBRARY — MMXXV
          </div>
        </div>
      </footer>

      <ReadingPanel content={reading} onClose={() => setReading(null)} />
    </div>
  );
};

const MediaTile = ({ label, kind }: { label: string; kind: "video" | "image"; src: string }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="relative aspect-[4/3] overflow-hidden"
      style={{ background: "#15130F" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Placeholder visual: subtle warm gradient + grain */}
      <div
        className="absolute inset-0"
        style={{
          background: kind === "video"
            ? "radial-gradient(ellipse at 30% 40%, rgba(201,169,110,0.18) 0%, rgba(10,10,10,1) 65%)"
            : "radial-gradient(ellipse at 70% 60%, rgba(201,169,110,0.14) 0%, rgba(10,10,10,1) 65%)",
        }}
      />
      {/* Scrim */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(10,10,10,0.30)",
          opacity: hover ? 0.33 : 1,
          transition: "opacity 700ms ease",
        }}
      />
      {/* Caption */}
      <div
        className="absolute left-6 bottom-6"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          letterSpacing: "0.22em",
          color: "rgba(244,241,236,0.85)",
          opacity: hover ? 1 : 0.6,
          transition: "opacity 600ms ease",
        }}
      >
        {label}
      </div>
    </div>
  );
};

export default LibraryHome;