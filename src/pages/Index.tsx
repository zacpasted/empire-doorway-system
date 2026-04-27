import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { z } from "zod";
import heroOperatory from "@/assets/pasted/hero-operatory.jpg";
import worldPartnership from "@/assets/pasted/world-partnership.jpg";
import worldLibrary from "@/assets/pasted/world-library.jpg";
import worldStudio from "@/assets/pasted/world-studio.jpg";
import worldExperiences from "@/assets/pasted/world-experiences.jpg";
import iconicVft from "@/assets/pasted/iconic-vft.jpg";
import studioCase01 from "@/assets/pasted/studio-case-01.jpg";
import studioCase02 from "@/assets/pasted/studio-case-02.jpg";
import studioCase03 from "@/assets/pasted/studio-case-03.jpg";
import expDinner from "@/assets/pasted/exp-dinner.jpg";
import expMasterclass from "@/assets/pasted/exp-masterclass.jpg";
import expClub from "@/assets/pasted/exp-club.jpg";

/* ──────────────────────────────────────────────────────────
   PASTED — Homepage v2
   A house of four worlds. Editorial. Restraint as signal.
   ────────────────────────────────────────────────────────── */

// Reliable smooth-scroll to the application section. Accounts for
// fixed nav height on desktop and mobile. Updates the URL hash so
// the link is shareable and back/forward works.
const APPLY_ID = "apply";
const getNavOffset = () => (typeof window !== "undefined" && window.innerWidth >= 1024 ? 80 : 64);

const scrollToApply = (e?: React.MouseEvent) => {
  if (e) e.preventDefault();
  if (typeof window === "undefined") return;
  const el = document.getElementById(APPLY_ID);
  if (!el) {
    // Fallback: route arrived from another page — set hash and let the
    // hash-listener on mount handle the scroll once mounted.
    window.location.hash = APPLY_ID;
    return;
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const top = el.getBoundingClientRect().top + window.scrollY - getNavOffset();
  window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  if (window.history.replaceState) {
    window.history.replaceState(null, "", `#${APPLY_ID}`);
  }
};

type ApplyCTAProps = {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  ariaLabel?: string;
};

const ApplyLink = ({ className, style, children, ariaLabel }: ApplyCTAProps) => (
  <a
    href={`#${APPLY_ID}`}
    onClick={scrollToApply}
    className={className}
    style={style}
    aria-label={ariaLabel}
    data-cta="apply"
  >
    {children}
  </a>
);


const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { label: "Partnership", href: "#partnership" },
    { label: "Library", href: "/library" },
    { label: "Studio", href: "#studio" },
    { label: "Experiences", href: "#experiences" },
  ];
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-500"
      style={{
        background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--pst-border-dark)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
      }}
    >
      <div className="max-w-[1680px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <Link to="/" className="pst-display text-[22px] tracking-[0.18em]" style={{ color: "var(--pst-bone)" }}>
          PASTED
        </Link>
        <nav className="hidden lg:flex items-center gap-10">
          {links.map((l) =>
            l.href.startsWith("/") ? (
              <Link key={l.href} to={l.href} className="pst-mono" style={{ color: "var(--pst-text-dark-muted)" }}>
                {l.label}
              </Link>
            ) : (
              <a key={l.href} href={l.href} className="pst-mono" style={{ color: "var(--pst-text-dark-muted)" }}>
                {l.label}
              </a>
            )
          )}
        </nav>
        <ApplyLink className="pst-link-mono" style={{ color: "var(--pst-gold)" }} ariaLabel="Apply for partnership">
          Apply
        </ApplyLink>
      </div>
    </header>
  );
};

const Hero = () => (
  <section className="relative min-h-screen w-full pst-surface-charcoal overflow-hidden">
    <motion.img
      src={heroOperatory}
      alt="Aesthetic dental operatory, charcoal-graded interior"
      className="absolute inset-0 w-full h-full object-cover"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.7 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      width={1920}
      height={1080}
    />
    <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.2) 40%, rgba(10,10,10,0.85) 100%)" }} />

    <div className="relative z-10 min-h-screen flex flex-col px-6 md:px-12 pt-28 pb-16">
      <div className="pst-mono" style={{ color: "var(--pst-gold)" }}>
        PASTED — VOL. 01
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <h1 className="pst-display text-[44px] md:text-[88px] lg:text-[112px]" style={{ color: "var(--pst-bone)" }}>
          A house of four worlds.
        </h1>
        <p className="pst-body mt-6" style={{ color: "var(--pst-text-dark-muted)" }}>
          Partnership. Library. Studio. Experiences.
        </p>
      </div>

      <div className="flex items-end justify-between gap-6 flex-wrap">
        <a href="#apply" className="flex items-center gap-4 group">
          <div className="w-16 h-16 md:w-20 md:h-20 overflow-hidden border" style={{ borderColor: "var(--pst-border-dark)" }}>
            <img src={worldPartnership} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="pst-mono group-hover:text-[var(--pst-gold)] transition-colors" style={{ color: "var(--pst-bone)" }}>
            Enter the partnership
            <br />
            <span style={{ color: "var(--pst-gold)" }}>By application →</span>
          </div>
        </a>

        <div className="hidden md:flex flex-col items-center gap-2 mx-auto">
          <span className="pst-mono" style={{ color: "var(--pst-text-dark-muted)" }}>Scroll</span>
          <div className="pst-pulse w-px h-10" style={{ background: "var(--pst-gold)" }} />
        </div>
      </div>
    </div>
  </section>
);

const Manifesto = () => (
  <section className="pst-surface-charcoal py-24 md:py-40 px-6">
    <div className="max-w-3xl mx-auto text-center">
      <div className="pst-rule-gold w-16 mx-auto mb-12" />
      <h2 className="pst-display text-[32px] md:text-[52px]" style={{ color: "var(--pst-bone)" }}>
        We are not an agency.
        <br />
        We are an operating partnership.
        <br />
        By application, in twelve seats.
      </h2>
      <div className="pst-rule-gold w-16 mx-auto mt-12" />
      <div className="pst-mono mt-10" style={{ color: "var(--pst-text-dark-muted)" }}>
        Read on for the four worlds.
      </div>
    </div>
  </section>
);

type WorldTile = {
  num: string;
  name: string;
  title: string;
  sub: string;
  img: string;
  hoverImg: string;
  href: string;
};

const worlds: WorldTile[] = [
  {
    num: "01",
    name: "PARTNERSHIP",
    title: "Operate at authority.",
    sub: "A done operation for a finite roster. Brand, performance, content, operations — run end-to-end.",
    img: worldPartnership,
    hoverImg: heroOperatory,
    href: "#partnership",
  },
  {
    num: "02",
    name: "LIBRARY",
    title: "Read freely.",
    sub: "Field Notes, framework documentation, and archive. Open. No gate.",
    img: worldLibrary,
    hoverImg: iconicVft,
    href: "/library",
  },
  {
    num: "03",
    name: "STUDIO",
    title: "Made visible.",
    sub: "The creative production arm. Identity, content systems, video, design.",
    img: worldStudio,
    hoverImg: iconicVft,
    href: "#studio",
  },
  {
    num: "04",
    name: "EXPERIENCES",
    title: "In person. Few times a year.",
    sub: "Masterclasses, dinners, and gatherings. By invitation. Limited capacity.",
    img: worldExperiences,
    hoverImg: heroOperatory,
    href: "#experiences",
  },
];

const FourWorlds = () => (
  <section className="pst-surface-charcoal py-24 md:py-40 px-6 md:px-12">
    <div className="max-w-[1680px] mx-auto">
      <div className="text-center mb-16 md:mb-24">
        <div className="pst-mono mb-6" style={{ color: "var(--pst-gold)" }}>THE HOUSE</div>
        <h2 className="pst-display text-[40px] md:text-[72px]" style={{ color: "var(--pst-bone)" }}>
          Four worlds. One umbrella.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "var(--pst-border-dark)" }}>
        {worlds.map((w) => {
          const Inner = (
            <div className="pst-tile-swap relative aspect-[16/10] overflow-hidden cursor-pointer group" style={{ background: "var(--pst-charcoal)" }}>
              <img src={w.img} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
              <img src={w.hoverImg} alt="" className="pst-tile-img-b absolute inset-0 w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,10,10,0.25) 0%, rgba(10,10,10,0) 40%, rgba(10,10,10,0.85) 100%)" }} />
              <div className="absolute top-6 left-6 pst-mono" style={{ color: "var(--pst-bone)" }}>
                {w.num} — {w.name}
              </div>
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-6">
                <div className="max-w-md">
                  <div className="pst-display text-[28px] md:text-[40px]" style={{ color: "var(--pst-bone)" }}>{w.title}</div>
                  <p className="pst-body mt-3 text-[15px]" style={{ color: "var(--pst-text-dark-muted)" }}>{w.sub}</p>
                </div>
                <div className="pst-mono whitespace-nowrap group-hover:text-[var(--pst-gold)] transition-colors" style={{ color: "var(--pst-bone)" }}>
                  Enter →
                </div>
              </div>
            </div>
          );
          return w.href.startsWith("/") ? (
            <Link key={w.num} to={w.href}>{Inner}</Link>
          ) : (
            <a key={w.num} href={w.href}>{Inner}</a>
          );
        })}
      </div>
    </div>
  </section>
);

const PartnershipChapter = () => {
  const pillars = [
    { title: "Done Operation", body: "We do not advise. We run the function end-to-end inside your practice." },
    { title: "Twelve Seats", body: "A finite roster. We do not scale headcount to chase revenue." },
    { title: "Built by Operators", body: "Every system on offer was first run live inside a clinic on the roster." },
  ];
  const roster = [
    { name: "Dr. Beckstead", city: "Palo Alto, CA" },
    { name: "Dr. Workman", city: "Taylor, UT" },
    { name: "Dr. Revive", city: "Waukesha, WI" },
    { name: "Dr. Linwood", city: "Charleston, SC" },
    { name: "Dr. Ashford", city: "Austin, TX" },
  ];
  return (
    <section id="partnership" className="pst-surface-charcoal py-24 md:py-40 px-6 md:px-12">
      <div className="max-w-[1480px] mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <div className="pst-mono mb-6" style={{ color: "var(--pst-gold)" }}>01 — THE PARTNERSHIP</div>
          <h2 className="pst-display text-[40px] md:text-[72px]" style={{ color: "var(--pst-bone)" }}>The done operation.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-24">
          {pillars.map((p) => (
            <div key={p.title} className="border-t pt-6" style={{ borderColor: "var(--pst-gold)" }}>
              <div className="pst-display text-[24px] md:text-[28px] mb-3" style={{ color: "var(--pst-bone)" }}>{p.title}</div>
              <p className="pst-body text-[15px]" style={{ color: "var(--pst-text-dark-muted)" }}>{p.body}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-px mb-12" style={{ background: "var(--pst-border-dark)" }}>
          {roster.map((r, i) => (
            <div key={r.name} className="pst-tile-swap relative aspect-[3/4] overflow-hidden" style={{ background: "var(--pst-charcoal)" }}>
              <img src={worldPartnership} alt="" className="absolute inset-0 w-full h-full object-cover grayscale" loading="lazy" />
              <img src={heroOperatory} alt="" className="pst-tile-img-b absolute inset-0 w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,10,10,0) 50%, rgba(10,10,10,0.9) 100%)" }} />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="pst-display text-[16px] md:text-[18px]" style={{ color: "var(--pst-bone)" }}>{r.name}</div>
                <div className="pst-mono pst-mono-sm mt-1" style={{ color: "var(--pst-text-dark-muted)" }}>{r.city}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="pst-mono mb-6" style={{ color: "var(--pst-text-dark-muted)" }}>By application — twelve seats, twelve cities</div>
          <a href="#apply" className="pst-link-mono" style={{ color: "var(--pst-gold)" }}>See the full operation →</a>
        </div>
      </div>
    </section>
  );
};

const LibraryChapter = () => {
  const notes = [
    { title: "The Practice That Ran Itself", img: worldLibrary },
    { title: "What We Stopped Reporting On", img: iconicVft },
    { title: "Twelve Seats, Twelve Decisions", img: worldLibrary },
  ];
  const frameworks = [
    { code: "VFT-01", name: "Venus Fly Trap", body: "The funnel architecture that defined the roster's last twelve months." },
    { code: "HCY-01", name: "Hammer Cycle", body: "Sequencing creative against compounding paid pressure." },
    { code: "RFT-01", name: "Reverse Fly Trap", body: "Outbound for practices that refuse to advertise." },
    { code: "FRS-01", name: "Forester Strategy", body: "Long-game brand allocation across a ten-year horizon." },
    { code: "FQ-01", name: "Four Quadrants", body: "How we read a practice in the first ninety minutes." },
    { code: "MSS-01", name: "Meta Scaling Sequence", body: "The unlock between $20k and $200k a month in spend." },
  ];
  return (
    <section id="library" className="pst-surface-bone py-24 md:py-40 px-6 md:px-12">
      <div className="max-w-[1480px] mx-auto">
        <div className="mb-16 md:mb-20">
          <div className="pst-mono mb-6" style={{ color: "var(--pst-charcoal)" }}>02 — THE LIBRARY</div>
          <h2 className="pst-display text-[40px] md:text-[72px]" style={{ color: "var(--pst-charcoal)" }}>Read freely.</h2>
          <p className="pst-body mt-6 max-w-xl" style={{ color: "var(--pst-text-light-muted)" }}>
            Field Notes, framework documentation, and archive. Open. No gate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <div className="pst-mono mb-8" style={{ color: "var(--pst-text-light-muted)" }}>FIELD NOTES</div>
            <div className="space-y-10">
              {notes.map((n) => (
                <Link to="/library" key={n.title} className="block group">
                  <div className="aspect-[4/3] overflow-hidden mb-4">
                    <img src={n.img} alt="" className="w-full h-full object-cover group-hover:opacity-80 transition-opacity" loading="lazy" />
                  </div>
                  <div className="pst-display text-[22px] md:text-[26px] mb-2" style={{ color: "var(--pst-charcoal)" }}>{n.title}</div>
                  <span className="pst-link-mono" style={{ color: "var(--pst-charcoal)" }}>Read →</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="pst-mono mb-8" style={{ color: "var(--pst-text-light-muted)" }}>FRAMEWORKS</div>
            <ul className="divide-y" style={{ borderColor: "var(--pst-border-light)" }}>
              {frameworks.map((f) => (
                <li key={f.code} className="py-6 group cursor-pointer" style={{ borderColor: "var(--pst-border-light)" }}>
                  <div className="flex items-baseline justify-between gap-6 mb-2">
                    <div className="pst-display text-[22px] md:text-[26px] group-hover:text-[var(--pst-gold)] transition-colors" style={{ color: "var(--pst-charcoal)" }}>
                      {f.name}
                    </div>
                    <div className="pst-mono pst-mono-sm" style={{ color: "var(--pst-text-light-muted)" }}>{f.code}</div>
                  </div>
                  <p className="pst-body text-[15px]" style={{ color: "var(--pst-text-light-muted)" }}>{f.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center mt-20">
          <Link to="/library" className="pst-link-mono" style={{ color: "var(--pst-charcoal)" }}>Enter the Library →</Link>
        </div>
      </div>
    </section>
  );
};

const Iconic = () => (
  <section className="pst-surface-charcoal relative">
    <div className="text-center pt-24 md:pt-32 pb-12 px-6">
      <div className="pst-mono mb-6" style={{ color: "var(--pst-gold)" }}>THE ICONIC</div>
      <h2 className="pst-display text-[44px] md:text-[88px]" style={{ color: "var(--pst-bone)" }}>The Venus Fly Trap.</h2>
      <p className="pst-body mt-6 max-w-xl mx-auto" style={{ color: "var(--pst-text-dark-muted)" }}>
        The funnel architecture that defined our roster's last twelve months.
      </p>
    </div>
    <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
      <img src={iconicVft} alt="Venus Fly Trap framework schematic" className="w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.1) 50%, rgba(10,10,10,0.85) 100%)" }} />
      <div className="absolute bottom-8 left-6 md:left-12 flex items-center gap-4">
        <div className="w-16 h-16 md:w-20 md:h-20 overflow-hidden border" style={{ borderColor: "var(--pst-border-dark)" }}>
          <img src={iconicVft} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="pst-mono" style={{ color: "var(--pst-bone)" }}>
          Read the full architecture
          <br />
          <span style={{ color: "var(--pst-gold)" }}>Click to read →</span>
        </div>
      </div>
    </div>
  </section>
);

const StudioChapter = () => {
  const cases = [
    { idx: "S—01", clinic: "REVIVE DENTISTRY — WAUKESHA WI", title: "Instagram content system", meta: "Identity, content, video", img: studioCase01 },
    { idx: "S—02", clinic: "BECKSTEAD DENTAL — PALO ALTO CA", title: "Venus Fly Trap, twenty-four scripts", meta: "Performance creative", img: worldStudio },
    { idx: "S—03", clinic: "SMILEART — TAYLOR WORKMAN UT", title: "Forester campaign, Q1", meta: "Long-form brand film", img: studioCase03 },
    { idx: "S—04", clinic: "LINWOOD — CHARLESTON SC", title: "Identity refresh, Vol. 02", meta: "Mark, system, application", img: studioCase02 },
    { idx: "S—05", clinic: "ASHFORD — AUSTIN TX", title: "Principal portrait series", meta: "Editorial photography", img: heroOperatory },
    { idx: "S—06", clinic: "ARCHIVE — PASTED STUDIO", title: "Process plates, behind the work", meta: "Studio archive", img: iconicVft },
  ];
  return (
    <section id="studio" className="pst-surface-charcoal py-24 md:py-40">
      <div className="max-w-[1680px] mx-auto px-6 md:px-12 mb-12 md:mb-20">
        <div className="flex items-end justify-between gap-8 flex-wrap">
          <div>
            <div className="pst-mono mb-6" style={{ color: "var(--pst-gold)" }}>03 — THE STUDIO</div>
            <h2 className="pst-display text-[40px] md:text-[72px]" style={{ color: "var(--pst-bone)" }}>Made visible.</h2>
            <p className="pst-body mt-6 max-w-xl" style={{ color: "var(--pst-text-dark-muted)" }}>
              The creative production arm. Identity, content systems, video, design — built to leave the room.
            </p>
          </div>
          <div className="pst-mono pst-mono-sm" style={{ color: "var(--pst-text-dark-muted)" }}>
            VOL. 01 — SIX OF TWENTY-FOUR
          </div>
        </div>
      </div>

      <div className="overflow-x-auto snap-x snap-mandatory pb-8">
        <div className="flex gap-8 px-6 md:px-12">
          {cases.map((c) => (
            <article key={c.idx} className="snap-start flex-shrink-0 w-[80vw] md:w-[480px]">
              <div className="aspect-[4/5] overflow-hidden mb-5 group" style={{ background: "var(--pst-paper)" }}>
                <img
                  src={c.img}
                  alt={`${c.clinic} — ${c.title}`}
                  className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.02]"
                  loading="lazy"
                  width={1280}
                  height={1600}
                />
              </div>
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <div className="pst-mono pst-mono-sm" style={{ color: "var(--pst-gold)" }}>{c.clinic}</div>
                <div className="pst-mono pst-mono-sm" style={{ color: "var(--pst-text-dark-muted)" }}>{c.idx}</div>
              </div>
              <div className="pst-display text-[20px] md:text-[24px] mb-2" style={{ color: "var(--pst-bone)" }}>{c.title}</div>
              <div className="pst-mono pst-mono-sm" style={{ color: "var(--pst-text-dark-muted)" }}>{c.meta}</div>
            </article>
          ))}
        </div>
      </div>

      <div className="text-center mt-12">
        <a href="#studio" className="pst-link-mono" style={{ color: "var(--pst-gold)" }}>See the full studio →</a>
      </div>
    </section>
  );
};

const ExperiencesChapter = () => {
  const tiles = [
    {
      idx: "E—01",
      meta: "SEPTEMBER 2026 — CHARLESTON, SC",
      title: "The Invisible to Inevitable Dinner.",
      body: "Twelve seats. One table. A long evening on the work it takes to become the practice the city names first.",
      cta: "Request a seat",
      img: expDinner,
      span: "md:col-span-3",
      ratio: "aspect-[16/10]",
    },
    {
      idx: "E—02",
      meta: "STANDING PROGRAM",
      title: "Associate to Empire.",
      body: "A program for the next ten years of aesthetic dentistry. Run live, four times a year, in person.",
      cta: "Read the program",
      img: expMasterclass,
      span: "md:col-span-2",
      ratio: "aspect-[4/5]",
    },
    {
      idx: "E—03",
      meta: "BY INVITATION — QUARTERLY",
      title: "The Reading Room.",
      body: "A closed gathering for the roster — and the practices we are watching. Off-record, off-camera.",
      cta: "Enquire",
      img: expClub,
      span: "md:col-span-2",
      ratio: "aspect-[4/5]",
    },
    {
      idx: "E—04",
      meta: "SPRING 2027 — LISBON, PT",
      title: "The Forester Retreat.",
      body: "Three days. The long-game brand allocation framework, run against your next ten-year plan.",
      cta: "Request a seat",
      img: worldExperiences,
      span: "md:col-span-3",
      ratio: "aspect-[16/10]",
    },
  ];
  return (
    <section id="experiences" className="pst-surface-bone py-24 md:py-40 px-6 md:px-12">
      <div className="max-w-[1480px] mx-auto">
        <div className="flex items-end justify-between gap-8 flex-wrap mb-16 md:mb-20">
          <div className="max-w-2xl">
            <div className="pst-mono mb-6" style={{ color: "var(--pst-charcoal)" }}>04 — THE EXPERIENCES</div>
            <h2 className="pst-display text-[40px] md:text-[72px]" style={{ color: "var(--pst-charcoal)" }}>In person.<br />Few times a year.</h2>
            <p className="pst-body mt-6" style={{ color: "var(--pst-text-light-muted)" }}>
              Masterclasses, dinners, and gatherings for the practices we partner with — and the practices we are watching.
            </p>
          </div>
          <div className="pst-mono pst-mono-sm" style={{ color: "var(--pst-text-light-muted)" }}>
            FOUR GATHERINGS — 2026 / 2027
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-x-8 gap-y-16">
          {tiles.map((t) => (
            <article key={t.idx} className={`${t.span}`}>
              <div className={`${t.ratio} overflow-hidden mb-6 group`}>
                <img
                  src={t.img}
                  alt={t.title}
                  className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.02]"
                  loading="lazy"
                  width={1280}
                  height={1600}
                />
              </div>
              <div className="flex items-baseline justify-between gap-4 mb-3">
                <div className="pst-mono" style={{ color: "var(--pst-text-light-muted)" }}>{t.meta}</div>
                <div className="pst-mono pst-mono-sm" style={{ color: "var(--pst-text-light-muted)" }}>{t.idx}</div>
              </div>
              <div className="pst-display text-[26px] md:text-[36px] mb-4" style={{ color: "var(--pst-charcoal)" }}>{t.title}</div>
              <p className="pst-body text-[15px] mb-5 max-w-md" style={{ color: "var(--pst-text-light-muted)" }}>{t.body}</p>
              <a href="#apply" className="pst-link-mono" style={{ color: "var(--pst-charcoal)" }}>{t.cta} →</a>
            </article>
          ))}
        </div>

        <div className="text-center mt-20 pt-12 border-t" style={{ borderColor: "var(--pst-border-light)" }}>
          <div className="pst-mono mb-6" style={{ color: "var(--pst-text-light-muted)" }}>By invitation. Limited capacity.</div>
          <a href="#apply" className="pst-link-mono" style={{ color: "var(--pst-charcoal)" }}>Enter Experiences →</a>
        </div>
      </div>
    </section>
  );
};

const ApplicationStrip = () => (
  <section id="apply" className="pst-surface-charcoal py-32 md:py-48 px-6 text-center">
    <h2 className="pst-display text-[36px] md:text-[64px] max-w-3xl mx-auto" style={{ color: "var(--pst-bone)" }}>
      Twelve seats. Application reviewed monthly.
    </h2>
    <a
      href="https://calendly.com/getpasted/pasted-partner-discovery"
      target="_blank"
      rel="noopener"
      className="pst-link-mono inline-block mt-12"
      style={{ color: "var(--pst-gold)" }}
    >
      Apply →
    </a>
  </section>
);

const dispatchSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Please enter your email." })
    .email({ message: "That email doesn't look right." })
    .max(255, { message: "Email is too long." }),
});

const Dispatch = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const result = dispatchSchema.safeParse({ email });
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Invalid email.");
      return;
    }
    setStatus("submitting");
    // Simulated dispatch — wire to provider when ready.
    await new Promise((r) => setTimeout(r, 600));
    setStatus("success");
  };

  return (
    <section
      className="pst-surface-charcoal py-24 md:py-32 px-6 border-t"
      style={{ borderColor: "var(--pst-border-dark)" }}
      aria-labelledby="dispatch-heading"
    >
      <div className="max-w-2xl mx-auto text-center">
        <div className="pst-mono mb-6" style={{ color: "var(--pst-gold)" }}>DISPATCH</div>
        <h3
          id="dispatch-heading"
          className="pst-display text-[28px] md:text-[40px] mb-10"
          style={{ color: "var(--pst-bone)" }}
        >
          One letter a month. Operating notes only.
        </h3>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-b py-10 max-w-md mx-auto"
              style={{ borderColor: "var(--pst-gold)" }}
              role="status"
              aria-live="polite"
            >
              <div className="pst-mono mb-4" style={{ color: "var(--pst-gold)" }}>
                ✓ ON THE LIST
              </div>
              <div className="pst-display text-[22px] md:text-[26px] mb-3" style={{ color: "var(--pst-bone)" }}>
                Thank you. The next letter ships on the first Monday of the month.
              </div>
              <div className="pst-mono pst-mono-sm" style={{ color: "var(--pst-text-dark-muted)" }}>
                {email}
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-md mx-auto"
              noValidate
            >
              <div className="flex items-center justify-center gap-6">
                <label htmlFor="dispatch-email" className="sr-only">Email address</label>
                <input
                  id="dispatch-email"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  maxLength={255}
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  disabled={status === "submitting"}
                  aria-invalid={!!error}
                  aria-describedby={error ? "dispatch-error" : undefined}
                  className="flex-1 bg-transparent border-b py-3 px-1 pst-body text-[15px] focus:outline-none focus:border-[var(--pst-gold)] disabled:opacity-60"
                  style={{
                    borderColor: error ? "var(--pst-gold)" : "var(--pst-border-dark)",
                    color: "var(--pst-bone)",
                  }}
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="pst-link-mono disabled:opacity-60"
                  style={{ color: "var(--pst-gold)" }}
                >
                  {status === "submitting" ? "Sending…" : "Subscribe"}
                </button>
              </div>
              <div className="h-6 mt-3 text-left">
                {error && (
                  <motion.div
                    id="dispatch-error"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="pst-mono pst-mono-sm"
                    style={{ color: "var(--pst-gold)" }}
                    role="alert"
                  >
                    {error}
                  </motion.div>
                )}
              </div>
              <div className="pst-mono pst-mono-sm mt-4" style={{ color: "var(--pst-text-dark-muted)" }}>
                No noise. Unsubscribe in one click.
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const Footer = () => {
  const cols = [
    { label: "THE HOUSE", links: ["Partnership", "Library", "Studio", "Experiences"] },
    { label: "PARTNERSHIP", links: ["Roster", "Frameworks", "Disciplines", "Apply"] },
    { label: "LIBRARY", links: ["Field Notes", "Frameworks", "Archive"] },
    { label: "STUDIO", links: ["Case Work", "Capabilities", "Brief us"] },
    { label: "EXPERIENCES", links: ["Upcoming", "Programs", "Past gatherings"] },
  ];
  return (
    <footer className="pst-surface-charcoal pt-24 pb-10 px-6 md:px-12 border-t" style={{ borderColor: "var(--pst-border-dark)" }}>
      <div className="max-w-[1680px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-6 mb-16">
          {cols.map((c) => (
            <div key={c.label}>
              <div className="pst-mono mb-5" style={{ color: "var(--pst-gold)" }}>{c.label}</div>
              <ul className="space-y-2">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="pst-body text-[14px] hover:opacity-100 transition-opacity" style={{ color: "var(--pst-text-dark-muted)" }}>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: "var(--pst-border-dark)" }}>
          <div className="pst-mono pst-mono-sm" style={{ color: "var(--pst-text-dark-muted)" }}>© 2026 PASTED.</div>
          <div className="pst-mono pst-mono-sm" style={{ color: "var(--pst-text-dark-muted)" }}>A house of four worlds.</div>
          <div className="pst-mono pst-mono-sm" style={{ color: "var(--pst-text-dark-muted)" }}>EN — US</div>
        </div>
      </div>
    </footer>
  );
};

const Index = () => (
  <div className="min-h-screen overflow-x-hidden antialiased pst-surface-charcoal">
    <title>PASTED — A house of four worlds</title>
    <meta name="description" content="PASTED. Partnership. Library. Studio. Experiences. A done operation for a finite roster of aesthetic dental clinics. By application." />

    <Nav />
    <main>
      <Hero />
      <Manifesto />
      <FourWorlds />
      <PartnershipChapter />
      <LibraryChapter />
      <Iconic />
      <StudioChapter />
      <ExperiencesChapter />
      <ApplicationStrip />
      <Dispatch />
    </main>
    <Footer />
  </div>
);

export default Index;
