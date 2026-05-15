import { useEffect, useMemo, useState } from "react";
import { DustMotes } from "@/components/library/DustMotes";
import { ReadingPanel, type ReadingContent } from "@/components/library/ReadingPanel";
import { Bookshelf } from "@/components/library/Bookshelf";
import { BOOKS, FILTERS, getReadingFor, type Book } from "@/data/books";
import readingRoom from "@/assets/library-reading-room.jpg";

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

const LibraryHome = () => {
  const [reading, setReading] = useState<ReadingContent | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("ALL");
  const [scrolled, setScrolled] = useState(false);
  const [scrollHintVisible, setScrollHintVisible] = useState(false);

  useEffect(() => { document.title = "The Library — PASTED"; }, []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { const t = setTimeout(() => setScrollHintVisible(true), 3000); return () => clearTimeout(t); }, []);

  const openBook = (b: Book) => {
    const content = getReadingFor(b.id);
    if (content) setReading(content);
  };

  const filteredCatalogue = useMemo(
    () => BOOKS.filter((b) => filter === "ALL" || b.category === filter),
    [filter],
  );

  // Derive "recent additions" from live volumes (most recent five with content)
  const recent = useMemo(
    () => BOOKS.filter((b) => b.pages).slice(0, 5),
    [],
  );

  return (
    <div className="min-h-screen bg-bone text-lib-charcoal">
      {/* 1. HEADER — transparent over hero, bone on scroll */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled ? "#F4F1EC" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(10,10,10,0.08)" : "1px solid transparent",
          transition: "background-color 240ms ease, border-color 240ms ease",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-8 h-14 flex items-center justify-between">
          <a
            href="/library"
            className="select-none"
            style={{
              fontFamily: PLAYFAIR,
              fontWeight: 300,
              fontSize: 18,
              letterSpacing: "0.04em",
              color: scrolled ? "#0A0A0A" : "#F4F1EC",
              transition: "color 240ms ease",
            }}
          >
            PASTED
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="relative pb-1"
                style={{
                  ...MONO,
                  color: scrolled
                    ? (n.active ? "#0A0A0A" : "rgba(10,10,10,0.55)")
                    : (n.active ? "#F4F1EC" : "rgba(244,241,236,0.65)"),
                  transition: "color 240ms ease",
                }}
              >
                {n.label}
                {n.active && <span className="absolute left-0 right-0 -bottom-0.5 h-px" style={{ background: "#C9A96E" }} />}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* 2. HERO IMAGE — full viewport */}
      <section className="relative w-full overflow-hidden" style={{ height: "100vh", minHeight: 640, background: "#0A0A0A" }}>
        <div className="absolute inset-0 lib-kenburns">
          <img
            src={readingRoom}
            alt="An antique reading room — leather-bound volumes, wooden ladder, warm directional light"
            className="w-full h-full object-cover"
            style={{ display: "block" }}
          />
        </div>
        {/* Charcoal scrim */}
        <div className="absolute inset-0" style={{ background: "rgba(10,10,10,0.25)" }} />
        {/* Corner vignette */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top left, rgba(10,10,10,0.20) 0%, transparent 30%), radial-gradient(ellipse at top right, rgba(10,10,10,0.20) 0%, transparent 30%), radial-gradient(ellipse at bottom left, rgba(10,10,10,0.20) 0%, transparent 30%), radial-gradient(ellipse at bottom right, rgba(10,10,10,0.20) 0%, transparent 30%)",
          }}
        />
        {/* Bottom-left chrome */}
        <div className="absolute" style={{ left: 80, bottom: 80 }}>
          <div style={{ ...MONO, color: "#C9A96E" }}>VOLUME ARCHIVE / 2025</div>
          <div style={{ width: 40, height: 1, background: "#C9A96E", marginTop: 12 }} />
        </div>
        {/* Bottom-right scroll hint */}
        <div
          className="absolute"
          style={{
            right: 80,
            bottom: 80,
            opacity: scrollHintVisible ? 1 : 0,
            transition: "opacity 1200ms ease",
            textAlign: "right",
          }}
        >
          <div style={{ ...MONO, color: "rgba(244,241,236,0.5)" }}>SCROLL</div>
          <div className="lib-scroll-pulse" style={{ width: 1, height: 24, background: "rgba(244,241,236,0.4)", marginTop: 10, marginLeft: "auto" }} />
        </div>
      </section>

      {/* 3. TITLE BLOCK */}
      <section className="bg-bone" style={{ paddingTop: 160, paddingBottom: 120 }}>
        <div className="mx-auto px-8 text-center" style={{ maxWidth: 880 }}>
          <div style={{ ...MONO, color: "rgba(10,10,10,0.6)" }}>THE LIBRARY</div>
          <h1
            className="mt-6"
            style={{
              fontFamily: PLAYFAIR,
              fontWeight: 300,
              fontSize: "clamp(48px, 7vw, 88px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#0A0A0A",
            }}
          >
            What we know,
          </h1>
          <h1
            style={{
              fontFamily: PLAYFAIR,
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: "clamp(48px, 7vw, 88px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#0A0A0A",
            }}
          >
            written down<span style={{ color: "#C9A96E" }}>.</span>
          </h1>
          <div className="mx-auto" style={{ width: 60, height: 1, background: "#C9A96E", marginTop: 48 }} />
          <p
            className="mx-auto"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 17,
              lineHeight: 1.7,
              color: "rgba(10,10,10,0.7)",
              marginTop: 48,
              maxWidth: 520,
            }}
          >
            A working archive of what we have learned, written for the people we work with. Read what is open. The rest stays inside the room.
          </p>
        </div>
      </section>

      {/* 4. THE SHELF */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#0A0A0A", color: "#F4F1EC", height: "90vh", minHeight: 640 }}
      >
        <Bookshelf onOpen={openBook} focusedId={focusedId} onFocusChange={setFocusedId} />
        <DustMotes />
      </section>

      {/* 6. ETHOS */}
      <section className="bg-bone" style={{ paddingTop: 180, paddingBottom: 140 }}>
        <div className="max-w-[1400px] mx-auto px-8 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4" style={{ ...MONO, color: "rgba(10,10,10,0.6)" }}>
            ON THE LIBRARY
          </div>
          <div
            className="col-span-12 md:col-span-7"
            style={{
              fontFamily: PLAYFAIR,
              fontWeight: 300,
              fontSize: 28,
              lineHeight: 1.4,
              color: "#0A0A0A",
              letterSpacing: "-0.005em",
            }}
          >
            The library is not content. It is a record. We keep it so we do not have to explain ourselves twice.
          </div>
        </div>
      </section>

      {/* 7. CATALOGUE */}
      <section className="bg-bone" style={{ paddingTop: 160, paddingBottom: 120 }}>
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="text-center" style={{ marginBottom: 56 }}>
            <div style={{ ...MONO, color: "#C9A96E" }}>INDEX</div>
            <h2 className="mt-4" style={{ fontFamily: PLAYFAIR, fontWeight: 300, fontSize: 36, color: "#0A0A0A", letterSpacing: "-0.01em" }}>
              Every volume.
            </h2>
          </div>

          {/* Filter row */}
          <div className="flex flex-wrap items-center gap-8 border-b" style={{ borderColor: "rgba(10,10,10,0.12)", paddingBottom: 20, marginBottom: 28 }}>
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className="relative pb-2"
                style={{
                  ...MONO,
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
              ...MONO,
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
                  <div style={{ ...MONO, color: "#0A0A0A" }}>{b.vol}</div>
                  <div className="relative pr-8">
                    <span style={{ fontFamily: PLAYFAIR, fontWeight: 300, fontSize: 22, color: "#0A0A0A", letterSpacing: "-0.005em" }}>
                      {b.title}
                    </span>
                    <span
                      className="absolute left-0 -bottom-1 h-px transition-all duration-500"
                      style={{ background: "#C9A96E", width: isOpen ? "100%" : 0 }}
                    />
                    <span
                      className="absolute left-0 -bottom-1 h-px transition-all duration-500 group-hover:w-full"
                      style={{ background: "#C9A96E", width: 0 }}
                    />
                  </div>
                  <div style={{ ...MONO, color: "rgba(10,10,10,0.7)" }}>{b.year}</div>
                  <div style={{ ...MONO, color: "#C9A96E" }}>{b.category}</div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. MEDIA WING */}
      <section className="bg-bone" style={{ paddingTop: 160 }}>
        <div className="max-w-[1400px] mx-auto px-8" style={{ paddingBottom: 80 }}>
          <div style={{ ...MONO, color: "#C9A96E" }}>GALLERY</div>
          <h2 className="mt-3" style={{ fontFamily: PLAYFAIR, fontWeight: 300, fontSize: 36, color: "#0A0A0A", letterSpacing: "-0.01em" }}>
            Film and frames.
          </h2>
        </div>
        <div className="relative overflow-hidden" style={{ background: "#0A0A0A" }}>
          <DustMotes />
          <div className="grid grid-cols-1 md:grid-cols-3">
            {[
              { label: "FILM 01 / 2025 — OPENING THE ROOM", kind: "video" as const },
              { label: "STILL 02 / 2025 — THE LONG ROOM", kind: "image" as const },
              { label: "MOTION 03 / 2025 — SPINE STUDY", kind: "video" as const },
            ].map((tile, i) => (
              <MediaTile key={i} {...tile} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. RECENT ADDITIONS */}
      <section className="bg-bone" style={{ paddingTop: 140, paddingBottom: 120 }}>
        <div className="max-w-[1400px] mx-auto px-8">
          <div style={{ marginBottom: 48 }}>
            <div style={{ ...MONO, color: "#C9A96E" }}>LATEST</div>
            <h2 className="mt-3" style={{ fontFamily: PLAYFAIR, fontWeight: 300, fontSize: 36, color: "#0A0A0A", letterSpacing: "-0.01em" }}>
              Recently added.
            </h2>
          </div>
          <div>
            {recent.map((b) => (
              <button
                key={b.id}
                onClick={() => setReading(getReadingFor(b.id))}
                className="group grid items-center w-full text-left relative"
                style={{
                  gridTemplateColumns: "140px 1fr 160px",
                  padding: "24px 12px",
                  borderBottom: "1px solid rgba(10,10,10,0.06)",
                  transition: "background-color 300ms ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(10,10,10,0.04)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <div style={{ ...MONO, color: "rgba(10,10,10,0.6)" }}>{b.year}</div>
                <div className="relative text-center px-4">
                  <span style={{ fontFamily: PLAYFAIR, fontWeight: 300, fontSize: 24, color: "#0A0A0A", letterSpacing: "-0.005em" }}>
                    {b.title}
                  </span>
                  <span
                    className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-px transition-all duration-500 group-hover:w-1/2"
                    style={{ background: "#C9A96E", width: 0 }}
                  />
                </div>
                <div className="text-right" style={{ ...MONO, color: "#C9A96E" }}>{b.category}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer style={{ paddingTop: 120 }}>
        <div className="max-w-[1400px] mx-auto px-8" style={{ borderTop: "1px solid rgba(10,10,10,0.12)", paddingTop: 32, paddingBottom: 32 }}>
          <div className="grid grid-cols-3 items-center">
            <div style={{ ...MONO, color: "rgba(10,10,10,0.55)" }}>PASTED LIBRARY / EST. 2024</div>
            <div />
            <div className="flex justify-end gap-6">
              {NAV.map((n) => (
                <a key={n.label} href={n.href} style={{ ...MONO, color: "rgba(10,10,10,0.55)" }}>
                  {n.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <ReadingPanel content={reading} onClose={() => setReading(null)} />
    </div>
  );
};

const MediaTile = ({ label, kind }: { label: string; kind: "video" | "image" }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="relative aspect-[4/3] overflow-hidden"
      style={{ background: "#15130F" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="absolute inset-0"
        style={{
          background: kind === "video"
            ? "radial-gradient(ellipse at 30% 40%, rgba(201,169,110,0.18) 0%, rgba(10,10,10,1) 65%)"
            : "radial-gradient(ellipse at 70% 60%, rgba(201,169,110,0.14) 0%, rgba(10,10,10,1) 65%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(10,10,10,0.30)",
          opacity: hover ? 0.33 : 1,
          transition: "opacity 700ms ease",
        }}
      />
      <div
        className="absolute left-6 bottom-6"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
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
