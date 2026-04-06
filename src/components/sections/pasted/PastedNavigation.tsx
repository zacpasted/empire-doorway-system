import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "Partnerships", href: "#lineup" },
  { label: "Craft", href: "#craft" },
  { label: "Results", href: "#proof" },
  { label: "Dossier", href: "#dossier" },
];

const PastedNavigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
        style={scrolled ? { background: "rgba(10,9,6,0.85)" } : undefined}
      >
        <div className="max-w-[1680px] mx-auto px-8 lg:px-12 h-20 flex items-center justify-between">
          <a href="#" className="font-serif text-2xl tracking-[0.2em] text-white">
            PASTED
          </a>

          <nav className="hidden lg:flex items-center gap-10">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[11px] uppercase tracking-[0.24em] text-white/70 hover:text-[var(--color-gold)] transition-colors duration-500"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <a
              href="#enquire"
              className="hidden lg:inline-block text-[11px] uppercase tracking-[0.24em] pb-1 border-b transition-all"
              style={{ color: "var(--color-gold)", borderColor: "var(--color-border-gold)" }}
            >
              Enquire
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden w-10 h-10 flex flex-col justify-center items-end gap-1.5"
              aria-label="Open menu"
            >
              <span className="block w-6 h-px bg-white" />
              <span className="block w-4 h-px bg-white" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col"
            style={{ background: "var(--color-bg)" }}
          >
            <div className="h-20 px-8 flex items-center justify-between border-b border-white/5">
              <span className="font-serif text-2xl tracking-[0.2em]">PASTED</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-[11px] uppercase tracking-[0.24em] text-white/70"
              >
                Close
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center px-8 gap-8">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="font-serif text-4xl text-white"
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PastedNavigation;
