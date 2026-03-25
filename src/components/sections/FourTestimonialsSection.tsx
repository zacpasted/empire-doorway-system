import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { trackCTAClick } from "@/hooks/useCTAAnalytics";

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const testimonials = [
  {
    name: "Dr. Marshall Hanson",
    role: "Founder, Marshall Hanson Method · Minnesota",
    quote: "I take profound pride in my clinical work. What PASTED did was take that — the standard I hold myself to, the story behind why I do this, the life I wanted to build around it — and made the world see it the way I see it. They run the growth side of my practice. The brand, the content, the systems, the strategy. I wouldn't trust anyone else with it. Not because of the results — though those are real — but because of how they understand what this work means to me. They've made my practice better, my life easier, and given me back the time to do what I actually trained for. That's what a real partner does.",
  },
  {
    name: "Dr. Jon Marashi",
    role: "Celebrity Dentist, Los Angeles, CA",
    quote: "At this level, brand is not optional. It is fundamental. Zac and Alan understand this better than anyone I've worked with. Their taste, restraint, and execution are elite. If you are serious about building a real brand — one that lasts — I would not work with anyone else.",
  },
  {
    name: "Dr. Drew Ballard",
    role: "Celebrity Dentist, Gilbert, AZ · Founder, Halo Veneers & Halo Education",
    quote: "Halo did not scale by accident. The growth, the positioning, the clarity — it all came from a rock-solid foundation. Zac saw the vision early and believed in me when I may not have believed in myself. From a struggling general practice in central Phoenix to my dream clinic — only doing the dentistry I want to do, surpassing all of our revenue goals, working less than 9 months per year, 3 days per week, making more, more time with family, and an international brand and course that sells out. Zac has been my partner for 5 years making it happen, and I could not have gotten here without him and Pasted Partnership.",
  },
  {
    name: "Dr. Brian Harris",
    role: "Celebrity Dentist, Gilbert, AZ · Founder, Smile Virtual & Smile Sculpt",
    quote: "This is an easy recommendation. If a doctor asks who they should trust with their brand, this is the answer. They understand dentists, but more importantly, they understand people. That combination is incredibly rare.",
  },
];

const FourTestimonialsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const handleCTA = () => {
    trackCTAClick({ ctaId: 'post-testimonials-cta', ctaText: 'Book Discovery Call', section: 'testimonials' });
    document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section ref={ref} style={{ padding: 'clamp(64px, 10vw, 120px) 0' }}>
      <div className="container max-w-4xl mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: APPLE_EASE }}
        >
          <p className="section-label text-center justify-center mb-4">What They Say</p>
          <h2 className="font-serif leading-tight" style={{ fontSize: '34px', color: 'var(--color-text)' }}>
            From the dentists who've been through it.
          </h2>
        </motion.div>

        <div className="space-y-10">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              className="relative pl-6 md:pl-8"
              style={{
                borderLeft: '3px solid rgba(185,146,79,0.5)',
                background: 'linear-gradient(to right, rgba(185,146,79,0.04) 0%, transparent 40%)',
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: APPLE_EASE }}
            >
              {/* Decorative quote mark */}
              <span
                className="absolute -left-3 font-serif italic pointer-events-none select-none"
                style={{ top: '24px', fontSize: '80px', lineHeight: '0.8', color: 'rgba(185,146,79,0.12)' }}
                aria-hidden="true"
              >
                "
              </span>
              <p className="font-serif italic py-4" style={{ fontSize: '18px', color: 'var(--color-text)', lineHeight: '1.75', opacity: 0.9 }}>
                "{t.quote}"
              </p>
              <footer className="pb-4">
                <p className="font-sans font-medium" style={{ fontSize: '13px', color: 'var(--color-text)' }}>{t.name}</p>
                <p className="font-sans" style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{t.role}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>

        {/* Post-testimonials CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8, ease: APPLE_EASE }}
        >
          <button
            onClick={handleCTA}
            className="inline-block font-sans uppercase transition-all duration-300"
            style={{
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.2em',
              background: '#B8924F',
              color: '#0A0906',
              padding: '18px 40px',
              border: 'none',
              borderRadius: '10px',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = '#D4AA6A';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 40px rgba(185,146,79,0.25)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = '#B8924F';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            Book Discovery Call →
          </button>
          <p className="mt-4" style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
            30 clinics per year · Reviewed within 48 hours · Not all accepted
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FourTestimonialsSection;
