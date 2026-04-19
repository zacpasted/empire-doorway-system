import { useEffect } from "react";
import { Link } from "react-router-dom";
import founderClarke from "@/assets/founder-card-clarke.jpg";
import founderOrender from "@/assets/founder-card-orender.jpg";

/**
 * /founders — editorial cream/brass plate housing the two graded founder cards
 * in their original color. Mobile-first, square containers, on-brand typography.
 */
const Founders = () => {
  useEffect(() => {
    document.title = "Founders · PASTED";
    const meta = document.querySelector('meta[name="description"]');
    const desc = "The founders behind PASTED — graded cards, plate XII & XIII.";
    if (meta) meta.setAttribute("content", desc);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = desc;
      document.head.appendChild(m);
    }
  }, []);

  return (
    <main className="founders-root">
      <style>{`
        .founders-root {
          --bone: #EDE7DB;
          --cream: #F5EDD8;
          --ink: #0F0D0A;
          --ink-quiet: #6B5F4A;
          --brass: #B8924F;
          --brass-deep: #8A6E3A;
          --rule: rgba(15,13,10,0.14);
          background: var(--cream);
          color: var(--ink);
          min-height: 100vh;
          font-family: 'Inter', system-ui, sans-serif;
          padding: 64px 24px 96px;
          overflow-x: clip;
        }
        .founders-inner { max-width: 1080px; margin: 0 auto; }
        .founders-back {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; letter-spacing: 0.32em; text-transform: uppercase;
          color: var(--ink-quiet); text-decoration: none;
          margin-bottom: 56px;
        }
        .founders-back:hover { color: var(--ink); }
        .founders-masthead {
          font-size: 11px; letter-spacing: 0.42em; text-transform: uppercase;
          color: var(--ink-quiet); text-align: center; margin-bottom: 14px;
        }
        .founders-title {
          font-family: 'Cormorant Garamond', 'EB Garamond', Georgia, serif;
          font-style: italic; font-weight: 400;
          font-size: clamp(36px, 6vw, 64px);
          line-height: 1.05; text-align: center; margin: 0 0 20px;
          color: var(--ink);
        }
        .founders-deck {
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-size: clamp(15px, 1.8vw, 18px); line-height: 1.65;
          color: var(--ink-quiet); text-align: center;
          max-width: 580px; margin: 0 auto 72px;
        }
        .founders-rule {
          width: 64px; height: 1px; background: var(--brass);
          margin: 0 auto 56px;
        }
        .founders-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 56px 48px;
        }
        .founder-figure { margin: 0; display: flex; flex-direction: column; }
        .founder-frame {
          position: relative;
          background: transparent;
          padding: 0;
          box-shadow: none;
        }
        .founder-frame::before {
          content: none;
        }
        .founder-frame img {
          width: 100%;
          aspect-ratio: 3/4;
          object-fit: contain;
          display: block;
          position: relative;
          /* Feathered fade-to-bone edges */
          -webkit-mask-image: 
            radial-gradient(ellipse 80% 70% at 50% 50%, black 60%, transparent 100%),
            linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%),
            linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          mask-image: 
            radial-gradient(ellipse 80% 70% at 50% 50%, black 60%, transparent 100%),
            linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%),
            linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask-composite: intersect;
          mask-composite: intersect;
        }
        .founder-caption {
          margin-top: 28px; padding: 0 4px;
          display: flex; flex-direction: column; gap: 6px;
          text-align: center;
        }
        .founder-plate {
          font-size: 10px; letter-spacing: 0.36em; text-transform: uppercase;
          color: var(--brass-deep); font-weight: 500;
        }
        .founder-name {
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-weight: 400; font-size: 24px; line-height: 1.2;
          color: var(--ink); margin: 0;
        }
        .founder-role {
          font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--ink-quiet); font-weight: 500;
        }
        .founder-line {
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-size: 15px; line-height: 1.55; color: var(--ink);
          margin-top: 8px;
        }
        .founders-coda {
          margin-top: 96px; padding-top: 48px;
          border-top: 1px solid var(--rule);
          text-align: center;
        }
        .founders-coda-text {
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-size: clamp(17px, 2vw, 20px); line-height: 1.6;
          color: var(--ink); max-width: 540px; margin: 0 auto 28px;
        }
        .founders-cta {
          display: inline-flex; align-items: center; justify-content: center;
          background: var(--ink); color: var(--cream);
          font-size: 12px; letter-spacing: 0.22em; text-transform: uppercase;
          font-weight: 500; padding: 16px 32px; border-radius: 10px;
          text-decoration: none; transition: background 200ms ease;
        }
        .founders-cta:hover { background: var(--brass-deep); }
        @media (max-width: 720px) {
          .founders-root { padding: 40px 20px 72px; }
          .founders-back { margin-bottom: 32px; }
          .founders-deck { margin-bottom: 48px; }
          .founders-rule { margin-bottom: 40px; }
          .founders-grid { grid-template-columns: 1fr; gap: 48px; }
          .founder-frame { padding: 12px; }
          .founder-frame::before { inset: 6px; }
          .founders-coda { margin-top: 64px; padding-top: 36px; }
        }
      `}</style>

      <div className="founders-inner">
        <Link to="/" className="founders-back">← PASTED</Link>

        <div className="founders-masthead">PLATES XII–XIII · FOUNDERS</div>
        <h1 className="founders-title">The Founders</h1>
        <p className="founders-deck">
          Two graded cards. Two practitioners whose work helped shape the doctrine
          this studio runs on. Kept here in their original color — because the cards
          are already finished.
        </p>
        <div className="founders-rule" />

        <div className="founders-grid">
          <figure className="founder-figure">
            <div className="founder-frame">
              <img
                src={founderClarke}
                alt="Graded founder card — Dr. Alan Clarke"
                loading="eager"
                decoding="async"
              />
            </div>
            <figcaption className="founder-caption">
              <span className="founder-plate">Plate XII</span>
              <h2 className="founder-name">Dr. Alan Clarke</h2>
              <span className="founder-role">Clinician · Aesthetic Dentistry</span>
              <p className="founder-line">A standard set in the chair, then carried into the brand.</p>
            </figcaption>
          </figure>

          <figure className="founder-figure">
            <div className="founder-frame">
              <img
                src={founderOrender}
                alt="Graded founder card — Zac Orender"
                loading="eager"
                decoding="async"
              />
            </div>
            <figcaption className="founder-caption">
              <span className="founder-plate">Plate XIII</span>
              <h2 className="founder-name">Zac Orender</h2>
              <span className="founder-role">Founder · PASTED</span>
              <p className="founder-line">The brand is the practice. The practice is the brand.</p>
            </figcaption>
          </figure>
        </div>

        <div className="founders-coda">
          <p className="founders-coda-text">
            If you’d like to see how the doctrine compounds in the field, the next
            volume is the <em>Brand Asset Workbook</em>.
          </p>
          <Link to="/yourbrand" className="founders-cta">Open the workbook</Link>
        </div>
      </div>
    </main>
  );
};

export default Founders;
