import { useEffect, useRef, useState, useCallback, useMemo, MouseEvent as ReactMouseEvent } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * THE PASTED LIBRARY — Homepage
 * Editorial publication landing for the PASTED canon. Single long scroll.
 * Sections: Hero · Shelf (pinned) · Manifesto · About · Insider · Colophon
 *
 * Tone: warm bone + brass + night ink. Every motion serves atmosphere.
 * Sole CTA: The Pasted Insider broadcast signup.
 *
 * IMAGE GUIDANCE — THE PASTED LIBRARY:
 * - Vol. I cover: typography-only on solid brass spine (no photo by design choice).
 * - Wall background (optional): soft out-of-focus interior or abstract warm
 *   texture; applied with heavy blur so detail is secondary.
 * - Library Card texture (optional): warm paper, slight grain, low contrast.
 */

const FONT_LINK_ID = "library-fonts";
const ensureFonts = () => {
  if (document.getElementById(FONT_LINK_ID)) return;
  const pre1 = document.createElement("link");
  pre1.rel = "preconnect";
  pre1.href = "https://fonts.googleapis.com";
  document.head.appendChild(pre1);
  const pre2 = document.createElement("link");
  pre2.rel = "preconnect";
  pre2.href = "https://fonts.gstatic.com";
  pre2.crossOrigin = "";
  document.head.appendChild(pre2);
  const link = document.createElement("link");
  link.id = FONT_LINK_ID;
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap";
  document.head.appendChild(link);
};

/* ==================== TYPES ==================== */

type VolumeState = "live" | "coming" | "ghost";

interface Volume {
  id: string;
  numeral: string;
  arabic: number;
  title: string;
  subtitle?: string;
  state: VolumeState;
  year?: string;
  synopsis?: string;
  href?: string;
}

const VOLUMES: Volume[] = [
  {
    id: "vol-1",
    numeral: "I",
    arabic: 1,
    title: "The Art of Becoming",
    subtitle: "On what iconic dentistry is actually built from",
    state: "live",
    year: "MMXXVI",
    synopsis:
      "The opening volume of The Pasted Library. A field guide to brand as decision architecture — what it actually is, what yours is not, and the five-part architecture that compounds quietly until the room belongs to you.",
    href: "/library/doctrine",
  },
  {
    id: "vol-2",
    numeral: "II",
    arabic: 2,
    title: "The Art of Building",
    subtitle: "Forthcoming",
    state: "coming",
    year: "MMXXVII",
  },
  { id: "vol-3", numeral: "III", arabic: 3, title: "", state: "ghost" },
  { id: "vol-4", numeral: "IV", arabic: 4, title: "", state: "ghost" },
  { id: "vol-5", numeral: "V", arabic: 5, title: "", state: "ghost" },
];

/* ==================== CUSTOM CURSOR ==================== */

const CustomCursor = ({ enabled }: { enabled: boolean }) => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ x: 0, y: 0, dx: 0, dy: 0, rx: 0, ry: 0, hover: false, click: false });

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: globalThis.MouseEvent) => {
      stateRef.current.x = e.clientX;
      stateRef.current.y = e.clientY;
    };
    const onDown = () => {
      stateRef.current.click = true;
      const dot = dotRef.current;
      if (dot) {
        dot.style.transform += ` scale(1.4)`;
        setTimeout(() => {
          stateRef.current.click = false;
        }, 180);
      }
    };
    const onOver = (e: globalThis.MouseEvent) => {
      const t = e.target as HTMLElement;
      stateRef.current.hover = !!t.closest("a, button, [data-cursor='hover'], input, textarea");
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseover", onOver);

    let raf = 0;
    const tick = () => {
      const s = stateRef.current;
      // dot follows quickly (120ms feel)
      s.dx += (s.x - s.dx) * 0.32;
      s.dy += (s.y - s.dy) * 0.32;
      // ring trails further (280ms feel)
      s.rx += (s.x - s.rx) * 0.14;
      s.ry += (s.y - s.ry) * 0.14;
      const dotScale = s.hover ? 1.66 : 1; // 6→10
      const ringScale = s.hover ? 1.66 : 1; // 24→40
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${s.dx - 3}px, ${s.dy - 3}px, 0) scale(${dotScale})`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${s.rx - 12}px, ${s.ry - 12}px, 0) scale(${ringScale})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={dotRef} className="lib-cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="lib-cursor-ring" aria-hidden="true" />
    </>
  );
};

/* ==================== DUST PARTICLES ==================== */

const DustField = ({ count = 14 }: { count?: number }) => {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 2 + Math.random() * 1.4,
        opacity: 0.2 + Math.random() * 0.2,
        duration: 40 + Math.random() * 40,
        delay: -Math.random() * 60,
      })),
    [count],
  );
  return (
    <div className="lib-dust" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

/* ==================== BOOK COMPONENT (CSS 3D) ==================== */

interface BookProps {
  vol: Volume;
  onOpen?: (v: Volume) => void;
  index: number;
}

const Book = ({ vol, onOpen, index }: BookProps) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, lift: false });
  const reduceMotion = useReducedMotion();

  const handleMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (reduceMotion || vol.state === "ghost") return;
    const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ ry: px * 30, rx: -py * 16, lift: true });
  };
  const handleLeave = () => setTilt({ rx: 0, ry: 0, lift: false });
  const handleClick = () => {
    if (vol.state === "live" && onOpen) onOpen(vol);
  };

  const isLive = vol.state === "live";
  const isComing = vol.state === "coming";
  const isGhost = vol.state === "ghost";

  return (
    <div
      className={`lib-book lib-book--${vol.state}`}
      data-cursor={isLive ? "hover" : undefined}
      role={isLive ? "button" : undefined}
      tabIndex={isLive ? 0 : -1}
      aria-label={
        isLive
          ? `Open ${vol.title}, Volume ${vol.numeral}`
          : isComing
            ? `${vol.title}, Volume ${vol.numeral}, forthcoming ${vol.year}`
            : `Volume ${vol.numeral}, to be written`
      }
      onClick={handleClick}
      onKeyDown={(e) => {
        if (isLive && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          handleClick();
        }
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <div
        ref={wrapRef}
        className="lib-book-3d"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry - 14}deg) translateZ(${tilt.lift ? 40 : 0}px)`,
        }}
      >
        {/* Front cover */}
        <div className="lib-face lib-face--front">
          <div className="lib-cover-grad" />
          <div className="lib-cover-inner">
            <div className="lib-cover-top">
              <div className="lib-cover-numeral">{vol.numeral}</div>
              {!isGhost && <div className="lib-cover-volume">VOLUME {vol.numeral}</div>}
            </div>
            <div className="lib-cover-bottom">
              {isLive && <div className="lib-cover-title">{vol.title}</div>}
              {isComing && <div className="lib-cover-title lib-cover-title--coming">FORTHCOMING<br/>{vol.year}</div>}
              {isGhost && <div className="lib-cover-title lib-cover-title--ghost"><em>to be written</em></div>}
              {!isGhost && <div className="lib-cover-pl">PL</div>}
            </div>
          </div>
          <div className="lib-cover-frame" />
          {isLive && <div className="lib-cover-rim" />}
        </div>

        {/* Spine */}
        <div className="lib-face lib-face--spine">
          <div className="lib-spine-text">
            {isLive && <span className="lib-spine-title">{vol.title}</span>}
            {isComing && <span className="lib-spine-title">{vol.title}</span>}
            <span className="lib-spine-meta">{vol.numeral} · THE PASTED LIBRARY</span>
          </div>
        </div>

        {/* Back cover */}
        <div className="lib-face lib-face--back" />
        {/* Top edge */}
        <div className="lib-face lib-face--top" />
        {/* Bottom edge */}
        <div className="lib-face lib-face--bottom" />
        {/* Fore edge (pages) */}
        <div className="lib-face lib-face--fore" />
      </div>
      <div className="lib-book-shadow" />
    </div>
  );
};

/* ==================== VOLUME MODAL ==================== */

const VolumeModal = ({ vol, onClose }: { vol: Volume; onClose: () => void }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="lib-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.32 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${vol.title}, Volume ${vol.numeral}`}
    >
      <motion.div
        className="lib-modal-card"
        initial={{ rotateY: -90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        exit={{ rotateY: -60, opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.7, 0, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="lib-modal-close" onClick={onClose} aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
        <div className="lib-modal-eyebrow">VOLUME {vol.numeral} · IN CIRCULATION</div>
        <h2 className="lib-modal-title">{vol.title}</h2>
        {vol.subtitle && <p className="lib-modal-sub"><em>{vol.subtitle}</em></p>}
        <div className="lib-modal-rule" />
        <p className="lib-modal-body">{vol.synopsis}</p>
        {vol.href && (
          <Link to={vol.href} className="lib-modal-cta">
            <span>Read Volume {vol.numeral}</span>
            <span className="lib-modal-cta-arrow" aria-hidden="true">→</span>
          </Link>
        )}
      </motion.div>
    </motion.div>
  );
};

/* ==================== LIBRARY CARD GRAPHIC ==================== */

const LibraryCardGraphic = ({ cardNo }: { cardNo: string }) => (
  <div className="lib-card-graphic" aria-hidden="true">
    <div className="lib-card-row">
      <span>THE PASTED LIBRARY</span>
      <span>CARD NO. {cardNo}</span>
    </div>
    <div className="lib-card-mid">
      <em>"The bearer of this card is an Insider."</em>
    </div>
    <div className="lib-card-bot">
      <span>VALID MMXXVI — MMXXVII</span>
      <span className="lib-card-seal">
        <span>PL</span>
      </span>
    </div>
  </div>
);

/* ==================== WORD-REVEAL HEADING ==================== */

const WordReveal = ({
  children,
  className,
  delay = 0,
  stagger = 0.06,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}) => {
  const reduce = useReducedMotion();
  const text = typeof children === "string" ? children : "";
  if (reduce || !text) {
    return <span className={className}>{children}</span>;
  }
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="lib-word">
          <motion.span
            className="lib-word-inner"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.9, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

/* ==================== MAIN PAGE ==================== */

const Library = () => {
  const reduceMotion = useReducedMotion();
  const [openVol, setOpenVol] = useState<Volume | null>(null);
  const [insiderEmail, setInsiderEmail] = useState("");
  const [insiderError, setInsiderError] = useState("");
  const [insiderJoined, setInsiderJoined] = useState(false);
  const [cardNo, setCardNo] = useState("0001");
  const [welcomedAt, setWelcomedAt] = useState("");
  const [scrollPct, setScrollPct] = useState(0);
  const [cursorEnabled, setCursorEnabled] = useState(false);
  const [navCompact, setNavCompact] = useState(false);

  const heroH1Ref = useRef<HTMLHeadingElement>(null);
  const shelfSectionRef = useRef<HTMLElement>(null);
  const shelfStageRef = useRef<HTMLDivElement>(null);
  const volIRef = useRef<HTMLDivElement>(null);

  // Fonts + meta
  useEffect(() => {
    ensureFonts();
    document.title = "The PASTED Library · A canon on becoming undeniable";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "The PASTED Library — a collected body of work on what iconic dentistry is actually built from. Editorial volumes, dispatches, and doctrinal texts from the studio at PASTED.",
    );
  }, []);

  // Cursor enablement (desktop, fine pointer, no reduced motion)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (fine && !reduceMotion) {
      setCursorEnabled(true);
      document.documentElement.classList.add("lib-cursor-on");
    }
    return () => {
      document.documentElement.classList.remove("lib-cursor-on");
    };
  }, [reduceMotion]);

  // Lenis smooth scroll
  useEffect(() => {
    if (reduceMotion) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    // Hash links — smooth-scroll
    const onHashClick = (e: globalThis.MouseEvent) => {
      const t = e.target as HTMLElement;
      const a = t.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: -40 });
      }
    };
    document.addEventListener("click", onHashClick);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      document.removeEventListener("click", onHashClick);
    };
  }, [reduceMotion]);

  // Scroll progress + nav compact
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)) * 100;
      setScrollPct(Math.min(100, Math.max(0, pct)));
      setNavCompact(h.scrollTop > window.innerHeight * 0.5);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hero cursor parallax on H1
  useEffect(() => {
    if (reduceMotion) return;
    const h1 = heroH1Ref.current;
    if (!h1) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const onMove = (e: globalThis.MouseEvent) => {
      const w = window.innerWidth, hh = window.innerHeight;
      tx = -((e.clientX / w) - 0.5) * 16;
      ty = -((e.clientY / hh) - 0.5) * 8;
    };
    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      h1.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      if (h1) h1.style.transform = "";
    };
  }, [reduceMotion]);

  // GSAP ScrollTrigger pinned camera pan on the shelf
  useEffect(() => {
    if (reduceMotion) return;
    const section = shelfSectionRef.current;
    const stage = shelfStageRef.current;
    if (!section || !stage) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });
      // Phase 1: shelf rises into place (0 → 0.4)
      tl.fromTo(
        stage,
        { yPercent: 18, scale: 0.96, opacity: 0.6 },
        { yPercent: 0, scale: 1, opacity: 1, ease: "power2.out", duration: 0.4 },
      )
        // Phase 2: zoom Vol. I (0.4 → 0.65)
        .to(stage, { scale: 1.15, x: -120, ease: "power2.inOut", duration: 0.25 })
        // Phase 3: pull back, ghosts breathe (0.65 → 1)
        .to(stage, { scale: 1, x: 0, ease: "power2.inOut", duration: 0.35 });
    }, section);

    return () => ctx.revert();
  }, [reduceMotion]);

  /* Insider submit */
  const submitInsider = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(insiderEmail);
      if (!ok) {
        setInsiderError("Please enter a valid email address.");
        return;
      }
      setInsiderError("");
      // Auto-generate sequential card number
      let n = 1;
      try {
        const last = parseInt(localStorage.getItem("pasted_library_card_seq") || "0", 10);
        n = (isNaN(last) ? 0 : last) + 1;
        localStorage.setItem("pasted_library_card_seq", String(n));
      } catch {
        /* ignore */
      }
      const card = String(n).padStart(4, "0");
      setCardNo(card);
      const ts = new Date();
      setWelcomedAt(
        ts.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }) +
          " · " +
          ts.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
      );
      try {
        localStorage.setItem(
          "pasted_insider_email",
          JSON.stringify({
            email: insiderEmail,
            ts: ts.toISOString(),
            cardNo: card,
            source: "library-home",
          }),
        );
      } catch {
        /* ignore */
      }
      // TODO: wire to broadcast email service
      setInsiderJoined(true);
    },
    [insiderEmail],
  );

  return (
    <main className="lib-root">
      <style>{LIBRARY_STYLES}</style>

      {/* Grain overlay */}
      <div className="lib-grain" aria-hidden="true" />

      {/* Custom cursor */}
      <CustomCursor enabled={cursorEnabled} />

      {/* Progress spine (left margin, vertical) */}
      <div className="lib-progress" aria-hidden="true">
        <div className="lib-progress-fill" style={{ height: `${scrollPct}%` }} />
      </div>

      {/* TOP NAV */}
      <nav className={`lib-nav ${navCompact ? "lib-nav--compact" : ""}`} aria-label="Library">
        <div className="lib-nav-inner">
          <Link to="/library" className="lib-nav-brand" data-cursor="hover">
            PASTED <span>·</span> THE LIBRARY
          </Link>
          <div className="lib-nav-spine" aria-hidden="true" />
          <div className="lib-nav-items">
            <a href="#volumes">Volumes</a>
            <a href="#about">On the Library</a>
            <a href="#insider" className="lib-nav-insider">The Insider</a>
          </div>
        </div>
      </nav>

      {/* ========== SECTION 01 · HERO ========== */}
      <section className="lib-hero" id="hero">
        {/* Masthead */}
        <motion.div
          className="lib-hero-masthead"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="lib-monogram">PL</div>
          <motion.div
            className="lib-hero-spine"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            className="lib-hero-mast-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <div>EST · MMXXVI</div>
            <div>DISPATCHES FROM PASTED</div>
          </motion.div>
        </motion.div>

        {/* Title block */}
        <div className="lib-hero-title-block">
          <motion.div
            className="lib-hero-eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.95 }}
          >
            <span className="lib-eyerule" />
            <span>THE PASTED LIBRARY</span>
            <span className="lib-eyerule" />
          </motion.div>

          <h1 ref={heroH1Ref} className="lib-hero-h1">
            <span className="lib-hero-line">
              <WordReveal delay={1.05}>A private canon on</WordReveal>
            </span>
            <span className="lib-hero-line">
              <WordReveal delay={1.4}>
                {""}
              </WordReveal>
              <em className="lib-hero-em">
                <WordReveal delay={1.4}>becoming</WordReveal>
              </em>{" "}
              <WordReveal delay={1.55}>undeniable.</WordReveal>
            </span>
          </h1>

          <motion.p
            className="lib-hero-sub"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.85 }}
          >
            <em>
              A collected body of work on what iconic dentistry is actually built from — published
              as a series of field guides, dispatches, and doctrinal texts from the studio at
              PASTED.
            </em>
          </motion.p>

          <motion.div
            className="lib-hero-fleuron"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.0 }}
          >
            ✦
          </motion.div>

          <motion.div
            className="lib-hero-meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.1 }}
          >
            CURRENTLY · VOLUME I IN CIRCULATION
          </motion.div>
        </div>

        {/* Peek of the shelf */}
        <motion.div
          className="lib-hero-peek"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          <div className="lib-hero-glow" />
          <div className="lib-hero-spines">
            {VOLUMES.map((v) => (
              <div
                key={v.id}
                className={`lib-hero-spine-peek lib-hero-spine-peek--${v.state} ${
                  v.numeral === "I" ? "lib-hero-spine-peek--rim" : ""
                }`}
              />
            ))}
          </div>
        </motion.div>

        {!reduceMotion && <DustField count={14} />}
      </section>

      {/* ========== SECTION 02 · THE SHELF ========== */}
      <section className="lib-shelf" id="volumes" ref={shelfSectionRef}>
        <div className="lib-shelf-head">
          <div className="lib-eyebrow-tracked">SECTION II · THE VOLUMES</div>
          <h2 className="lib-h2">
            <em>The</em> canon, in circulation.
          </h2>
          <p className="lib-shelf-lead">
            One volume is live. Four are forthcoming. Each arrives when it is ready — not on a
            schedule. Readers of The Pasted Insider receive advance chapters before public release.
          </p>
        </div>

        <div
          className="lib-shelf-stage"
          ref={shelfStageRef}
          role="region"
          aria-label="The PASTED Library · Volumes in circulation"
        >
          <div className="lib-shelf-wall" />
          <div className="lib-shelf-row">
            {VOLUMES.map((v, i) => (
              <Book key={v.id} vol={v} index={i} onOpen={setOpenVol} />
            ))}
          </div>
          <div className="lib-shelf-plate">
            <span>ESTABLISHED · MMXXVI</span>
          </div>
        </div>

        {/* Mobile stack (CSS-toggled) */}
        <div className="lib-shelf-mobile" aria-hidden="false">
          {VOLUMES.map((v) => (
            <button
              key={v.id}
              className={`lib-mob-card lib-mob-card--${v.state}`}
              disabled={v.state !== "live"}
              onClick={() => v.state === "live" && setOpenVol(v)}
              aria-label={
                v.state === "live"
                  ? `Open ${v.title}`
                  : v.state === "coming"
                    ? `${v.title}, forthcoming`
                    : `Volume ${v.numeral}, to be written`
              }
            >
              <div className="lib-mob-num">{v.numeral}</div>
              {v.state === "live" && (
                <>
                  <div className="lib-mob-eyebrow">VOLUME {v.numeral} · IN CIRCULATION</div>
                  <div className="lib-mob-title">{v.title}</div>
                </>
              )}
              {v.state === "coming" && (
                <>
                  <div className="lib-mob-eyebrow">VOLUME {v.numeral}</div>
                  <div className="lib-mob-title">{v.title}</div>
                  <div className="lib-mob-meta">FORTHCOMING · {v.year}</div>
                </>
              )}
              {v.state === "ghost" && (
                <>
                  <div className="lib-mob-eyebrow">VOLUME {v.numeral}</div>
                  <div className="lib-mob-title lib-mob-title--ghost"><em>to be written</em></div>
                </>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* ========== SECTION 03 · MANIFESTO ========== */}
      <section className="lib-manifesto">
        <div className="lib-manifesto-bg" />
        <motion.blockquote
          className="lib-manifesto-quote"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2 }}
        >
          <p>
            <em>
              "A brand is the only load-bearing wall in a practice. Build it wrong and everything
              else eventually sags."
            </em>
          </p>
          <cite>— THE PASTED HOUSE DOCTRINE · MMXXVI</cite>
        </motion.blockquote>
        {!reduceMotion && <DustField count={10} />}
      </section>

      {/* ========== SECTION 04 · ABOUT ========== */}
      <section className="lib-about" id="about">
        <div className="lib-about-inner">
          <motion.div
            className="lib-about-left"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
          >
            <div className="lib-eyebrow-tracked">§ ABOUT · ON THE LIBRARY</div>
            <h2 className="lib-h2">
              <em>The</em> library, <em>on purpose.</em>
            </h2>
            <p className="lib-about-lead">
              Everything published here is written by the studio at PASTED. Volumes are not
              sponsored. They are not syndicated. They are the working doctrine we use with the
              practices we take on — released publicly because the architecture is larger than any
              one client.
            </p>
          </motion.div>
          <motion.div
            className="lib-about-right"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="lib-about-p">
              <strong>On the why.</strong> We publish because the dental industry is commoditizing
              in real time — and because the practices we admire most are being quietly outspent by
              operators who know how brands actually compound. The Library exists to close that gap.
            </p>
            <div className="lib-about-orn">· · ·</div>
            <p className="lib-about-p">
              <strong>On the pace.</strong> Volumes arrive when they are finished, not when a
              marketing calendar requires them. A volume you have not seen yet may be in its third
              year of development. That is not a delay. That is the point.
            </p>
            <div className="lib-about-orn">· · ·</div>
            <p className="lib-about-p">
              <strong>On who it is for.</strong> Aesthetic dental practice owners who suspect their
              brand is worth more than their marketing has made of it. If that describes you, you
              are in the right room.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========== SECTION 05 · INSIDER ========== */}
      <section className="lib-insider" id="insider">
        <div className="lib-insider-inner">
          <div className="lib-eyebrow-tracked lib-insider-eyebrow">§ V · THE INSIDER</div>
          <h2 className="lib-h2 lib-insider-h2">
            Take your seat at <em>the library.</em>
          </h2>
          <p className="lib-insider-lead">
            <em>
              Join The Pasted Insider and receive our weekly broadcast — dispatches, teardowns, and
              early chapters of future volumes — delivered direct, without algorithms in the way.
            </em>
          </p>
          <p className="lib-insider-body">
            No pitch-mail. No mass lists. A small broadcast for dentists serious about becoming
            undeniable — the earliest to know when a volume drops, the first to see the angles we
            do not post publicly, the nearest to the workshop.
          </p>

          <motion.div
            className="lib-insider-card"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnimatePresence mode="wait">
              {!insiderJoined ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="lib-insider-card-eyebrow">
                    THE PASTED INSIDER · PRIVATE BROADCAST
                  </div>
                  <div className="lib-insider-card-rule" />
                  <div className="lib-insider-card-line">
                    <em>Where undeniable practices quietly stay ahead.</em>
                  </div>
                  <form className="lib-insider-form" onSubmit={submitInsider} noValidate>
                    <label htmlFor="insider-email" className="lib-vh">
                      Email address
                    </label>
                    <input
                      id="insider-email"
                      type="email"
                      required
                      maxLength={255}
                      placeholder="your@practice.com"
                      value={insiderEmail}
                      onChange={(e) => setInsiderEmail(e.target.value)}
                      className="lib-insider-input"
                      data-cursor="hover"
                    />
                    <button type="submit" className="lib-insider-btn" data-cursor="hover">
                      Take your seat <em>→</em>
                    </button>
                  </form>
                  {insiderError && <div className="lib-insider-error">{insiderError}</div>}
                  <div className="lib-insider-foot">
                    NO ALGORITHM · NO PITCH-MAIL · UNSUBSCRIBE ANY TIME
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.32 }}
                >
                  <div className="lib-insider-card-eyebrow">
                    THE PASTED INSIDER · WELCOME
                  </div>
                  <div className="lib-insider-card-dots">· · ·</div>
                  <h3 className="lib-insider-success-h">
                    <em>Your seat is saved.</em>
                  </h3>
                  <p className="lib-insider-success-body">
                    Your Library Card is being issued. First dispatch lands within 48 hours from{" "}
                    <em>insider@pasted.agency</em>.
                  </p>
                  <LibraryCardGraphic cardNo={cardNo} />
                  <div className="lib-insider-success-meta">Welcomed at {welcomedAt}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <p className="lib-insider-close">
            <em>Your Library Card arrives with the first dispatch, within 48 hours.</em>
          </p>
        </div>
      </section>

      {/* ========== SECTION 06 · COLOPHON ========== */}
      <footer className="lib-colophon">
        <div className="lib-colo-rule" />
        <div className="lib-colo-name">THE PASTED LIBRARY</div>
        <div className="lib-colo-pub">
          <em>A publication of PASTED · Est. MMXXVI</em>
        </div>
        <div className="lib-colo-links">
          <a href="https://pasted.studio" target="_blank" rel="noopener noreferrer">
            PASTED.AGENCY
          </a>
          <span aria-hidden="true">·</span>
          <a href="mailto:hello@pasted.agency">CONTACT</a>
          <span aria-hidden="true">·</span>
          <a href="#insider">THE INSIDER</a>
          <span aria-hidden="true">·</span>
          <a href="#colophon">COLOPHON</a>
        </div>
        <div className="lib-colo-tag">
          <em>Where Dentistry Becomes Iconic.</em>
        </div>
        <div className="lib-colo-fleuron">✦</div>
        <div className="lib-colo-rights">© PASTED · ALL RIGHTS RESERVED · MMXXVI</div>
        {!reduceMotion && <DustField count={6} />}
      </footer>

      <AnimatePresence>
        {openVol && <VolumeModal vol={openVol} onClose={() => setOpenVol(null)} />}
      </AnimatePresence>
    </main>
  );
};

/* ==================== STYLES ==================== */

const LIBRARY_STYLES = `
.lib-root {
  --bone: #EDE7DB;
  --bone-deep: #E5DDCC;
  --bone-shadow: #DBD2BF;
  --night: #1C1B18;
  --night-soft: #2D2B26;
  --ink: #1C1B18;
  --ink-body: #2D2B26;
  --ink-quiet: #726B5E;
  --ink-whisper: #A59E8E;
  --cream: #F5EFE1;
  --cream-quiet: rgba(245, 239, 225, 0.72);
  --cream-whisper: rgba(245, 239, 225, 0.48);
  --rule: #C7BEA8;
  --rule-ghost: #D9D1BD;
  --rule-night: rgba(245, 239, 225, 0.14);
  --brass: #8B7A4E;
  --brass-glow: #B89968;
  --brass-deep: #6A5C36;
  --brass-line: rgba(139, 122, 78, 0.22);
  --oxblood: #5C2A2A;
  --ease-expo: cubic-bezier(0.16, 1, 0.3, 1);

  background: var(--bone);
  color: var(--ink);
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 300;
  font-feature-settings: "liga","dlig","kern","tnum";
  -webkit-font-smoothing: antialiased;
  overflow-x: clip;
  position: relative;
  min-height: 100vh;
}
html.lib-cursor-on, html.lib-cursor-on body { cursor: none; }
html.lib-cursor-on a, html.lib-cursor-on button, html.lib-cursor-on input, html.lib-cursor-on textarea { cursor: none; }

/* Grain */
.lib-grain {
  position: fixed; inset: 0; z-index: 2; pointer-events: none;
  opacity: 0.22; mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'><filter id='p'><feTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' seed='4'/><feColorMatrix values='0 0 0 0 0.1 0 0 0 0 0.08 0 0 0 0 0.06 0 0 0 0.5 0'/></filter><rect width='100%25' height='100%25' filter='url(%23p)'/></svg>");
}

/* Cursor */
.lib-cursor-dot, .lib-cursor-ring {
  position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999;
  will-change: transform;
}
.lib-cursor-dot {
  width: 6px; height: 6px; border-radius: 50%; background: var(--brass);
  transition: width 200ms var(--ease-expo), height 200ms var(--ease-expo);
}
.lib-cursor-ring {
  width: 24px; height: 24px; border-radius: 50%;
  border: 1px solid var(--cream-quiet);
}
@media (hover: none) and (pointer: coarse) {
  .lib-cursor-dot, .lib-cursor-ring { display: none; }
}

/* Progress spine */
.lib-progress {
  position: fixed; left: 16px; top: 0; bottom: 0; width: 1px; z-index: 50;
  background: rgba(139, 122, 78, 0.12); pointer-events: none;
}
.lib-progress-fill {
  position: absolute; top: 0; left: 0; right: 0;
  background: var(--brass);
  transition: height 80ms linear;
}
@media (max-width: 720px) { .lib-progress { display: none; } }

/* Dust */
.lib-dust { position: absolute; inset: 0; pointer-events: none; z-index: 1; overflow: hidden; }
.lib-dust span {
  position: absolute; bottom: -10px; border-radius: 50%; background: var(--cream);
  animation-name: lib-drift; animation-iteration-count: infinite; animation-timing-function: linear;
}
@keyframes lib-drift {
  0% { transform: translate(0, 0); }
  100% { transform: translate(-20px, -110vh); }
}

/* Nav */
.lib-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 40;
  background: rgba(237, 231, 219, 0.72);
  backdrop-filter: blur(20px) saturate(1.2);
  -webkit-backdrop-filter: blur(20px) saturate(1.2);
  border-bottom: 1px solid var(--rule);
  transition: background 240ms ease;
}
.lib-nav-inner {
  max-width: 1280px; margin: 0 auto; padding: 0 48px;
  height: 68px; display: flex; align-items: center; gap: 28px;
  transition: height 240ms ease;
}
.lib-nav--compact .lib-nav-inner { height: 56px; }
.lib-nav-brand {
  font-family: 'Cormorant Garamond', serif; font-weight: 500; font-size: 20px;
  letter-spacing: 0.08em; color: var(--ink); text-decoration: none;
  position: relative;
}
.lib-nav-brand span { color: var(--brass); margin: 0 6px; }
.lib-nav-brand::after {
  content: ""; position: absolute; left: 0; bottom: -4px; height: 1px;
  width: 100%; background: var(--brass);
  transform: scaleX(0); transform-origin: left;
  transition: transform 200ms ease;
}
.lib-nav-brand:hover::after { transform: scaleX(1); }
.lib-nav-spine { flex: 1; height: 1px; background: var(--brass); opacity: 0.3; }
.lib-nav-items { display: flex; gap: 28px; align-items: center; }
.lib-nav-items a {
  font-family: 'Inter', sans-serif; font-weight: 500; font-size: 10px;
  letter-spacing: 0.32em; text-transform: uppercase; color: var(--ink-quiet);
  text-decoration: none; transition: color 160ms ease;
}
.lib-nav-items a:hover { color: var(--ink); }
.lib-nav-insider { color: var(--brass) !important; }
.lib-nav-insider:hover { color: var(--brass-deep) !important; }
@media (max-width: 720px) {
  .lib-nav-inner { padding: 0 20px; gap: 16px; }
  .lib-nav-brand { font-size: 16px; }
  .lib-nav-spine { display: none; }
  .lib-nav-items { gap: 18px; }
  .lib-nav-items a { font-size: 9px; letter-spacing: 0.24em; }
  .lib-nav-items a:not(.lib-nav-insider) { display: none; }
}

/* HERO */
.lib-hero {
  position: relative; min-height: 100vh;
  background: var(--night); color: var(--cream);
  padding: 64px 48px 0; overflow: hidden;
  display: flex; flex-direction: column;
}
.lib-hero-masthead {
  display: flex; align-items: center; gap: 28px;
  max-width: 1280px; margin: 0 auto; width: 100%;
}
.lib-monogram {
  width: 48px; height: 48px; border: 1px solid var(--brass-glow);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Cormorant Garamond', serif; font-weight: 500; font-size: 18px;
  letter-spacing: 0.08em; color: var(--brass-glow);
}
.lib-hero-spine { flex: 1; height: 1px; background: var(--brass-glow); opacity: 0.5; transform-origin: left; }
.lib-hero-mast-right {
  text-align: right; line-height: 1.5;
}
.lib-hero-mast-right > div:first-child {
  font-family: 'Inter', sans-serif; font-weight: 500; font-size: 10px;
  letter-spacing: 0.32em; text-transform: uppercase; color: var(--brass-glow);
}
.lib-hero-mast-right > div:last-child {
  font-family: 'Inter', sans-serif; font-weight: 500; font-size: 9px;
  letter-spacing: 0.28em; text-transform: uppercase; color: var(--cream-quiet);
  margin-top: 4px;
}
.lib-hero-title-block {
  margin: auto auto 0; text-align: center; max-width: 900px; padding-top: 8vh;
}
.lib-hero-eyebrow {
  display: inline-flex; align-items: center; gap: 16px;
  font-family: 'Inter', sans-serif; font-weight: 500; font-size: 11px;
  letter-spacing: 0.42em; text-transform: uppercase; color: var(--brass-glow);
  margin-bottom: 56px;
}
.lib-eyerule { width: 24px; height: 1px; background: var(--brass-glow); }
.lib-hero-h1 {
  font-family: 'Cormorant Garamond', serif; font-weight: 300;
  font-size: clamp(56px, 9vw, 112px); line-height: 0.96;
  letter-spacing: -0.025em; color: var(--cream); margin: 0;
  font-feature-settings: "liga","dlig","swsh","salt","kern";
  will-change: transform;
}
.lib-hero-line { display: block; }
.lib-hero-em {
  font-style: italic; color: var(--brass-glow);
  font-feature-settings: "liga","dlig","swsh","salt";
}
.lib-word { display: inline-block; overflow: hidden; vertical-align: bottom; }
.lib-word-inner { display: inline-block; }
.lib-hero-sub {
  margin: 48px auto 0; max-width: 540px;
  font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 300;
  font-size: clamp(17px, 1.7vw, 22px); line-height: 1.5;
  color: var(--cream-quiet);
}
.lib-hero-fleuron {
  margin-top: 56px; text-align: center; color: var(--brass-glow); font-size: 20px;
}
.lib-hero-meta {
  margin-top: 28px; font-family: 'Inter', sans-serif; font-weight: 500;
  font-size: 10px; letter-spacing: 0.32em; text-transform: uppercase;
  color: var(--cream-whisper);
}
.lib-hero-peek {
  position: relative; margin-top: auto; height: 32vh; min-height: 200px;
  display: flex; align-items: flex-end; justify-content: center;
  overflow: hidden;
}
.lib-hero-glow {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at 50% 120%, rgba(184, 153, 104, 0.20) 0%, transparent 60%);
  pointer-events: none;
}
.lib-hero-spines {
  display: flex; gap: 14px; height: 70%; align-items: flex-end;
}
.lib-hero-spine-peek {
  width: 60px; height: 100%;
  background: linear-gradient(180deg, var(--brass) 0%, var(--brass-deep) 100%);
  border-top: 1px solid rgba(245, 239, 225, 0.18);
  border-radius: 1px 1px 0 0;
  box-shadow: 0 -8px 20px rgba(0,0,0,0.45);
}
.lib-hero-spine-peek--coming {
  background: linear-gradient(180deg, var(--bone-shadow) 0%, var(--ink-quiet) 100%);
  opacity: 0.7;
}
.lib-hero-spine-peek--ghost {
  background: var(--bone-shadow); opacity: 0.32;
}
.lib-hero-spine-peek--rim {
  box-shadow: 0 -8px 20px rgba(0,0,0,0.45), 0 0 40px rgba(184, 153, 104, 0.32);
  animation: lib-rim-pulse 4s ease-in-out infinite;
}
@keyframes lib-rim-pulse {
  0%, 100% { box-shadow: 0 -8px 20px rgba(0,0,0,0.45), 0 0 40px rgba(184, 153, 104, 0.18); }
  50% { box-shadow: 0 -8px 20px rgba(0,0,0,0.45), 0 0 60px rgba(184, 153, 104, 0.34); }
}

/* SHELF */
.lib-shelf {
  position: relative; min-height: 100vh;
  background: var(--bone); color: var(--ink);
  padding: 96px 48px;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  overflow: hidden;
}
.lib-shelf-head {
  text-align: center; max-width: 720px; margin-bottom: 64px;
}
.lib-eyebrow-tracked {
  font-family: 'Inter', sans-serif; font-weight: 500; font-size: 10px;
  letter-spacing: 0.36em; text-transform: uppercase; color: var(--brass);
  margin-bottom: 28px;
}
.lib-h2 {
  font-family: 'Cormorant Garamond', serif; font-weight: 300;
  font-size: clamp(36px, 5.5vw, 64px); line-height: 1.05;
  letter-spacing: -0.015em; color: var(--ink); margin: 0 0 32px;
}
.lib-h2 em { font-style: italic; color: var(--brass); }
.lib-shelf-lead {
  font-family: 'Cormorant Garamond', serif; font-weight: 300;
  font-size: 19px; line-height: 1.55; color: var(--ink-body);
  max-width: 560px; margin: 0 auto;
}
.lib-shelf-stage {
  position: relative; perspective: 1800px;
  padding: 60px 0 80px;
  width: 100%; max-width: 1200px;
}
.lib-shelf-wall {
  position: absolute; inset: -40px -10% 0;
  background: radial-gradient(ellipse at 50% 30%, rgba(184, 153, 104, 0.08) 0%, transparent 60%);
  pointer-events: none;
}
.lib-shelf-row {
  display: flex; gap: 24px; justify-content: center; align-items: flex-end;
  transform: rotateX(18deg) rotateY(-14deg);
  transform-style: preserve-3d;
  position: relative; padding-bottom: 12px;
}
.lib-shelf-row::after {
  content: ""; position: absolute; left: -40px; right: -40px; bottom: -2px; height: 12px;
  background: var(--bone-deep);
  border-top: 1px solid var(--brass-line);
  border-bottom: 1px solid var(--brass-line);
  box-shadow: 0 30px 40px -28px rgba(28,27,24,0.5);
  transform: translateZ(-18px);
}
.lib-shelf-plate {
  text-align: center; margin-top: 36px;
  font-family: 'Inter', sans-serif; font-weight: 500; font-size: 9px;
  letter-spacing: 0.36em; text-transform: uppercase; color: var(--ink-whisper);
}

/* BOOK 3D */
.lib-book {
  position: relative; width: 180px; height: 260px;
  transform-style: preserve-3d;
  animation: lib-book-rise 900ms var(--ease-expo) both;
  flex-shrink: 0;
}
@keyframes lib-book-rise {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
.lib-book--ghost { opacity: 0.42; }
.lib-book--coming { filter: saturate(0.6); }
.lib-book-3d {
  position: relative; width: 100%; height: 100%;
  transform-style: preserve-3d;
  transition: transform 480ms var(--ease-expo);
  transform: rotateY(-14deg);
}
.lib-face {
  position: absolute; inset: 0; backface-visibility: hidden;
  transform-style: preserve-3d;
}
.lib-face--front {
  background: var(--brass);
  transform: translateZ(18px);
  overflow: hidden;
}
.lib-book--coming .lib-face--front { background: var(--bone-shadow); }
.lib-book--ghost .lib-face--front {
  background: var(--bone-shadow);
  border: 1px solid var(--rule);
}
.lib-cover-grad {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(28,27,24,0.20) 0%, rgba(28,27,24,0.05) 40%, rgba(28,27,24,0.40) 100%);
}
.lib-book--ghost .lib-cover-grad { display: none; }
.lib-cover-frame {
  position: absolute; inset: 8px; border: 1px solid rgba(245, 239, 225, 0.14);
  pointer-events: none;
}
.lib-book--ghost .lib-cover-frame { display: none; }
.lib-cover-rim {
  position: absolute; inset: -2px;
  box-shadow: 0 0 28px rgba(184, 153, 104, 0.28) inset, 0 0 40px rgba(184, 153, 104, 0.32);
  pointer-events: none;
  animation: lib-cover-rim-pulse 4s ease-in-out infinite;
}
@keyframes lib-cover-rim-pulse {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}
.lib-cover-inner {
  position: relative; height: 100%; padding: 18px;
  display: flex; flex-direction: column; justify-content: space-between;
  z-index: 2;
}
.lib-cover-top { display: flex; flex-direction: column; gap: 4px; }
.lib-cover-numeral {
  font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 300;
  font-size: 16px; color: var(--brass-glow);
}
.lib-book--coming .lib-cover-numeral, .lib-book--ghost .lib-cover-numeral { color: var(--brass); }
.lib-cover-volume {
  font-family: 'Inter', sans-serif; font-weight: 500; font-size: 8px;
  letter-spacing: 0.32em; color: var(--cream);
}
.lib-book--coming .lib-cover-volume { color: var(--ink-quiet); }
.lib-cover-bottom { display: flex; align-items: flex-end; justify-content: space-between; gap: 8px; }
.lib-cover-title {
  font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: 13px;
  line-height: 1.18; color: var(--cream); max-width: 80%;
}
.lib-cover-title--coming {
  font-family: 'Inter', sans-serif; font-weight: 500; font-size: 9px;
  letter-spacing: 0.28em; color: var(--ink-body);
}
.lib-cover-title--ghost {
  font-family: 'Cormorant Garamond', serif; font-style: italic;
  font-size: 10px; color: var(--ink-whisper); margin: auto;
}
.lib-cover-pl {
  font-family: 'Cormorant Garamond', serif; font-weight: 500; font-size: 10px;
  color: var(--brass-glow);
}
.lib-book--coming .lib-cover-pl { color: var(--brass); }

/* Spine */
.lib-face--spine {
  width: 36px; height: 100%;
  background: var(--brass);
  transform: rotateY(-90deg) translateZ(0); transform-origin: left center;
  left: 0;
  border-top: 1px solid rgba(245, 239, 225, 0.2);
  border-bottom: 1px solid rgba(245, 239, 225, 0.2);
  display: flex; align-items: center; justify-content: center;
}
.lib-book--coming .lib-face--spine {
  background: linear-gradient(180deg, var(--bone-shadow) 0%, var(--ink-quiet) 100%);
  border-color: var(--brass-line);
}
.lib-book--ghost .lib-face--spine {
  background: var(--bone-shadow); border-color: var(--rule);
}
.lib-spine-text {
  writing-mode: vertical-rl; transform: rotate(180deg);
  display: flex; flex-direction: column; gap: 8px; padding: 12px 0;
  align-items: center;
}
.lib-spine-title {
  font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: 13px;
  color: var(--cream); white-space: nowrap;
}
.lib-book--coming .lib-spine-title { color: var(--ink); }
.lib-spine-meta {
  font-family: 'Inter', sans-serif; font-weight: 500; font-size: 7px;
  letter-spacing: 0.32em; color: var(--cream-quiet);
}
.lib-book--coming .lib-spine-meta { color: var(--ink-quiet); }
.lib-book--ghost .lib-spine-meta { color: var(--ink-whisper); }

.lib-face--back {
  background: var(--brass-deep);
  transform: translateZ(-18px) rotateY(180deg);
}
.lib-book--coming .lib-face--back { background: var(--bone-shadow); }
.lib-book--ghost .lib-face--back { background: var(--bone-shadow); }

.lib-face--top, .lib-face--bottom {
  height: 36px; width: 100%;
  background: repeating-linear-gradient(90deg, rgba(28,27,24,0.06) 0 1px, transparent 1px 2px), var(--cream);
}
.lib-face--top { transform: rotateX(90deg) translateZ(18px) translateY(-18px); top: 0; }
.lib-face--bottom { transform: rotateX(-90deg) translateZ(18px) translateY(18px); bottom: 0; }

.lib-face--fore {
  width: 36px; height: 100%;
  background: repeating-linear-gradient(0deg, rgba(28,27,24,0.05) 0 1px, transparent 1px 2px), var(--cream);
  transform: rotateY(90deg) translateZ(0); transform-origin: right center;
  right: 0;
}

.lib-book-shadow {
  position: absolute; bottom: -8px; left: 50%;
  transform: translateX(-50%) scaleX(1.1);
  width: 120%; height: 20px;
  background: radial-gradient(ellipse, rgba(28, 27, 24, 0.28) 0%, transparent 70%);
  filter: blur(4px); pointer-events: none;
}

/* Mobile shelf */
.lib-shelf-mobile { display: none; width: 100%; max-width: 420px; flex-direction: column; gap: 24px; }
.lib-mob-card {
  position: relative; aspect-ratio: 3/4; padding: 28px;
  background: var(--brass); color: var(--cream);
  border: none; text-align: left;
  display: flex; flex-direction: column; justify-content: space-between;
  font-family: 'Inter', sans-serif;
}
.lib-mob-card--coming { background: var(--bone-shadow); color: var(--ink); }
.lib-mob-card--ghost { background: var(--bone-shadow); color: var(--ink-whisper); opacity: 0.6; }
.lib-mob-card[disabled] { cursor: default; }
.lib-mob-num {
  font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 300;
  font-size: 32px; color: var(--brass-glow);
}
.lib-mob-card--coming .lib-mob-num, .lib-mob-card--ghost .lib-mob-num { color: var(--brass); }
.lib-mob-eyebrow {
  font-weight: 500; font-size: 9px; letter-spacing: 0.32em; text-transform: uppercase;
  margin-bottom: 8px;
}
.lib-mob-title {
  font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: 24px;
  line-height: 1.15;
}
.lib-mob-title--ghost { font-style: italic; font-size: 18px; }
.lib-mob-meta {
  margin-top: 8px; font-weight: 500; font-size: 9px; letter-spacing: 0.28em;
  text-transform: uppercase;
}

@media (max-width: 720px) {
  .lib-shelf-stage { display: none; }
  .lib-shelf-mobile { display: flex; }
  .lib-shelf { padding: 64px 24px; min-height: auto; }
}

/* MANIFESTO */
.lib-manifesto {
  position: relative; min-height: 100vh;
  background: var(--night); color: var(--cream);
  display: flex; align-items: center; justify-content: center;
  padding: 96px 48px; overflow: hidden;
}
.lib-manifesto-bg {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at 50% 50%, rgba(184, 153, 104, 0.06) 0%, transparent 70%);
  animation: lib-bg-breathe 14s ease-in-out infinite;
}
@keyframes lib-bg-breathe {
  0%, 100% { background-position: 50% 50%; }
  33% { background-position: 40% 60%; }
  66% { background-position: 60% 40%; }
}
.lib-manifesto-quote { max-width: 900px; text-align: center; margin: 0; position: relative; z-index: 2; }
.lib-manifesto-quote p {
  font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 400;
  font-size: clamp(28px, 5vw, 60px); line-height: 1.22; color: var(--cream); margin: 0;
}
.lib-manifesto-quote cite {
  display: block; margin-top: 32px;
  font-family: 'Inter', sans-serif; font-weight: 500; font-size: 10px;
  letter-spacing: 0.32em; text-transform: uppercase; color: #C77A5A;
  font-style: normal;
}
@media (max-width: 720px) {
  .lib-manifesto { padding: 64px 24px; min-height: auto; }
}

/* ABOUT */
.lib-about {
  background: var(--bone); padding: 120px 48px; min-height: 90vh;
  display: flex; align-items: center;
}
.lib-about-inner {
  max-width: 1280px; margin: 0 auto; width: 100%;
  display: grid; grid-template-columns: 5fr 7fr; gap: 80px; align-items: start;
}
.lib-about-left h2 { margin-top: 0; }
.lib-about-lead {
  font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: 22px;
  line-height: 1.55; color: var(--ink); max-width: 460px;
}
.lib-about-right { max-width: 480px; }
.lib-about-p {
  font-family: 'Inter', sans-serif; font-weight: 300; font-size: 17px;
  line-height: 1.8; color: var(--ink-body); margin: 0;
}
.lib-about-p strong {
  font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 400;
  font-size: 19px; color: var(--ink); margin-right: 4px;
}
.lib-about-orn {
  text-align: center; margin: 48px 0; color: var(--brass); letter-spacing: 0.4em;
}
@media (max-width: 900px) {
  .lib-about-inner { grid-template-columns: 1fr; gap: 48px; }
  .lib-about { padding: 80px 24px; }
}

/* INSIDER */
.lib-insider {
  background: var(--bone-deep); padding: 120px 48px; min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
}
.lib-insider-inner { max-width: 720px; text-align: center; }
.lib-insider-eyebrow { color: var(--brass); }
.lib-insider-h2 { max-width: 620px; margin-left: auto; margin-right: auto; }
.lib-insider-lead {
  font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: 23px;
  line-height: 1.5; color: var(--ink); max-width: 600px; margin: 0 auto 36px;
}
.lib-insider-body {
  font-family: 'Inter', sans-serif; font-weight: 300; font-size: 16px;
  line-height: 1.8; color: var(--ink-body); max-width: 580px; margin: 0 auto 56px;
}
.lib-insider-card {
  background: var(--bone); border: 1px solid var(--brass-line); border-radius: 2px;
  padding: 56px; max-width: 560px; margin: 0 auto;
  box-shadow: inset 0 0 0 2px rgba(255,255,255,0.4);
}
.lib-insider-card-eyebrow {
  font-family: 'Inter', sans-serif; font-weight: 500; font-size: 10px;
  letter-spacing: 0.32em; text-transform: uppercase; color: var(--brass);
}
.lib-insider-card-rule { width: 40px; height: 1px; background: var(--brass); margin: 16px auto 40px; }
.lib-insider-card-dots {
  margin: 16px auto 32px; color: var(--brass); letter-spacing: 0.6em; font-size: 14px;
}
.lib-insider-card-line {
  font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: 28px;
  color: var(--ink); margin-bottom: 48px; line-height: 1.3;
}
.lib-insider-form {
  display: flex; gap: 12px; flex-direction: row;
}
.lib-insider-input {
  flex: 1; padding: 18px 20px; border: 1px solid var(--rule); border-radius: 2px;
  background: var(--bone-shadow); font-family: 'Inter', sans-serif; font-weight: 300;
  font-size: 16px; color: var(--ink); transition: all 200ms ease;
}
.lib-insider-input::placeholder { color: var(--ink-whisper); font-style: italic; }
.lib-insider-input:focus {
  outline: none; border-color: var(--brass); background: var(--bone);
  box-shadow: 0 0 0 2px rgba(139, 122, 78, 0.15);
}
.lib-insider-btn {
  padding: 18px 36px; border-radius: 999px; border: none;
  background: var(--brass); color: var(--bone);
  font-family: 'Inter', sans-serif; font-weight: 500; font-size: 14px;
  letter-spacing: 0.06em; cursor: pointer; transition: all 200ms ease;
  white-space: nowrap;
}
.lib-insider-btn em {
  font-family: 'Cormorant Garamond', serif; font-style: italic; margin-left: 6px;
}
.lib-insider-btn:hover { background: var(--brass-deep); transform: translateY(-1px); }
.lib-insider-error {
  margin-top: 12px; font-size: 13px; color: var(--oxblood);
  font-family: 'Cormorant Garamond', serif; font-style: italic;
}
.lib-insider-foot {
  margin-top: 24px;
  font-family: 'Inter', sans-serif; font-weight: 500; font-size: 9px;
  letter-spacing: 0.28em; text-transform: uppercase; color: var(--ink-whisper);
}
.lib-insider-success-h {
  font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: 36px;
  color: var(--ink); margin: 0 0 20px;
}
.lib-insider-success-body {
  font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: 18px;
  line-height: 1.55; color: var(--ink-body); margin: 0 0 32px;
}
.lib-insider-success-meta {
  margin-top: 24px; font-family: 'Inter', sans-serif; font-weight: 500;
  font-size: 9px; letter-spacing: 0.28em; text-transform: uppercase;
  color: var(--ink-whisper);
}
.lib-insider-close {
  margin-top: 36px;
  font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 14px;
  color: var(--ink-quiet);
}

@media (max-width: 720px) {
  .lib-insider { padding: 64px 20px; }
  .lib-insider-card { padding: 36px 24px; }
  .lib-insider-form { flex-direction: column; }
  .lib-insider-card-line { font-size: 22px; margin-bottom: 32px; }
}

/* Library Card graphic */
.lib-card-graphic {
  width: 240px; max-width: 100%; height: 140px; margin: 0 auto;
  border: 1px solid var(--brass); padding: 14px 16px;
  background: var(--bone-shadow);
  display: flex; flex-direction: column; justify-content: space-between;
  position: relative;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='p'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='8'/><feColorMatrix values='0 0 0 0 0.1 0 0 0 0 0.08 0 0 0 0 0.06 0 0 0 0.4 0'/></filter><rect width='100%25' height='100%25' filter='url(%23p)'/></svg>");
  background-blend-mode: multiply;
}
.lib-card-row {
  display: flex; justify-content: space-between;
  font-family: 'Inter', sans-serif; font-weight: 500; font-size: 8px;
  letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink);
}
.lib-card-mid {
  text-align: center; font-family: 'Cormorant Garamond', serif; font-style: italic;
  font-size: 14px; color: var(--ink); padding: 0 8px;
}
.lib-card-bot {
  display: flex; justify-content: space-between; align-items: flex-end;
  font-family: 'Inter', sans-serif; font-weight: 500; font-size: 8px;
  letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-quiet);
}
.lib-card-seal {
  width: 22px; height: 22px; border: 1px solid var(--brass); border-radius: 50%;
  display: inline-flex; align-items: center; justify-content: center;
}
.lib-card-seal span {
  font-family: 'Cormorant Garamond', serif; font-weight: 500; font-size: 9px;
  color: var(--brass); letter-spacing: 0;
}

/* Modal */
.lib-modal {
  position: fixed; inset: 0; z-index: 100;
  background: rgba(28, 27, 24, 0.92);
  display: flex; align-items: center; justify-content: center;
  padding: 24px; perspective: 1800px;
}
.lib-modal-card {
  background: var(--bone); color: var(--ink);
  max-width: 560px; width: 100%; padding: 56px;
  position: relative; transform-origin: left center;
  border: 1px solid var(--brass-line);
}
.lib-modal-close {
  position: absolute; top: 16px; right: 16px;
  width: 36px; height: 36px; border: 1px solid var(--rule); border-radius: 50%;
  background: transparent; color: var(--ink); cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; line-height: 1; transition: all 200ms ease;
}
.lib-modal-close:hover { border-color: var(--brass); color: var(--brass); }
.lib-modal-eyebrow {
  font-family: 'Inter', sans-serif; font-weight: 500; font-size: 10px;
  letter-spacing: 0.32em; text-transform: uppercase; color: var(--brass);
  margin-bottom: 24px;
}
.lib-modal-title {
  font-family: 'Cormorant Garamond', serif; font-weight: 300;
  font-size: 44px; line-height: 1.05; letter-spacing: -0.015em;
  color: var(--ink); margin: 0 0 12px;
}
.lib-modal-sub {
  font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 300;
  font-size: 18px; color: var(--ink-quiet); margin: 0 0 24px;
}
.lib-modal-rule { width: 40px; height: 1px; background: var(--brass); margin: 0 0 24px; }
.lib-modal-body {
  font-family: 'Inter', sans-serif; font-weight: 300; font-size: 16px;
  line-height: 1.75; color: var(--ink-body); margin: 0 0 36px;
}
.lib-modal-cta {
  display: inline-flex; align-items: center; gap: 14px;
  padding: 16px 32px; border: 1px solid var(--brass);
  background: transparent; color: var(--ink);
  font-family: 'Inter', sans-serif; font-weight: 500; font-size: 11px;
  letter-spacing: 0.28em; text-transform: uppercase; text-decoration: none;
  transition: all 240ms ease;
}
.lib-modal-cta:hover { background: var(--brass); color: var(--bone); }
.lib-modal-cta-arrow {
  font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 16px;
  letter-spacing: 0;
}
@media (max-width: 720px) {
  .lib-modal-card { padding: 36px 24px; }
  .lib-modal-title { font-size: 32px; }
}

/* COLOPHON */
.lib-colophon {
  position: relative; background: var(--night); color: var(--cream);
  padding: 80px 48px; text-align: center; overflow: hidden;
}
.lib-colo-rule { width: 120px; height: 1px; background: var(--brass-glow); margin: 0 auto 48px; }
.lib-colo-name {
  font-family: 'Inter', sans-serif; font-weight: 500; font-size: 11px;
  letter-spacing: 0.36em; text-transform: uppercase; color: var(--cream-quiet);
}
.lib-colo-pub {
  margin-top: 16px; font-family: 'Cormorant Garamond', serif; font-style: italic;
  font-weight: 400; font-size: 14px; color: var(--cream-whisper);
}
.lib-colo-links {
  margin-top: 48px; display: flex; justify-content: center; gap: 18px; flex-wrap: wrap;
}
.lib-colo-links a {
  font-family: 'Inter', sans-serif; font-weight: 500; font-size: 10px;
  letter-spacing: 0.28em; text-transform: uppercase; color: var(--cream-quiet);
  text-decoration: none; transition: color 200ms ease;
}
.lib-colo-links a:hover { color: var(--brass-glow); }
.lib-colo-links span { color: var(--brass-glow); opacity: 0.5; }
.lib-colo-tag {
  margin-top: 48px; font-family: 'Cormorant Garamond', serif; font-style: italic;
  font-weight: 300; font-size: 18px; color: var(--cream-quiet);
}
.lib-colo-fleuron { margin-top: 32px; color: var(--brass-glow); font-size: 20px; }
.lib-colo-rights {
  margin-top: 24px; font-family: 'Inter', sans-serif; font-weight: 400;
  font-size: 9px; letter-spacing: 0.4em; text-transform: uppercase; color: var(--cream-whisper);
}

/* Visually hidden */
.lib-vh {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}

/* Focus rings */
.lib-root a:focus-visible,
.lib-root button:focus-visible,
.lib-root input:focus-visible,
.lib-root [role='button']:focus-visible {
  outline: 2px solid var(--brass); outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .lib-cursor-dot, .lib-cursor-ring,
  .lib-dust, .lib-hero-spine-peek--rim, .lib-cover-rim, .lib-manifesto-bg {
    animation: none !important; display: none;
  }
  .lib-hero-h1 { transform: none !important; }
  html.lib-cursor-on, html.lib-cursor-on body { cursor: auto; }
}
`;

export default Library;
