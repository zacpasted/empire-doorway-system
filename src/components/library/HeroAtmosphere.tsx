import { useEffect, useRef } from "react";

/**
 * Two ambient layers stacked over the hero:
 *  1. Candle-glow flicker — soft radial warm light, barely-perceptible flicker.
 *  2. Dust motes — canvas of 30–40 warm motes drifting downward/sideways.
 * Both are pointer-events:none and pause when the tab is hidden.
 */

interface Mote {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  o: number;
}

export const HeroAtmosphere = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const motesRef = useRef<Mote[]>([]);
  const rafRef = useRef<number | null>(null);
  const visibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const seed = () => {
      const count = w < 700 ? 24 : 38;
      motesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.6 + Math.random() * 1.8,
        vx: (Math.random() - 0.5) * 0.12,
        vy: 0.05 + Math.random() * 0.18,
        o: 0.04 + Math.random() * 0.06,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onVis = () => {
      visibleRef.current = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVis);

    const tick = () => {
      if (!visibleRef.current) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      ctx.clearRect(0, 0, w, h);
      for (const m of motesRef.current) {
        m.x += m.vx;
        m.y += m.vy;
        if (m.y - m.r > h) {
          m.y = -m.r;
          m.x = Math.random() * w;
        }
        if (m.x < -10) m.x = w + 10;
        if (m.x > w + 10) m.x = -10;
        const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r * 3.2);
        g.addColorStop(0, `rgba(245, 230, 195, ${m.o})`);
        g.addColorStop(1, "rgba(245, 230, 195, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r * 3.2, 0, Math.PI * 2);
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.removeEventListener("visibilitychange", onVis);
      ro.disconnect();
    };
  }, []);

  return (
    <>
      {/* candle glow #1 — lower-left interior */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          left: "18%",
          top: "44%",
          width: 280,
          height: 280,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(212,181,122,0.22) 0%, rgba(201,169,110,0.12) 35%, transparent 65%)",
          mixBlendMode: "screen",
          animation: "lib-candle-flicker-a 240ms infinite alternate ease-in-out",
          willChange: "opacity, transform",
        }}
      />
      {/* candle glow #2 — distant, desynced */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          left: "62%",
          top: "38%",
          width: 200,
          height: 200,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(212,181,122,0.18) 0%, rgba(201,169,110,0.08) 40%, transparent 70%)",
          mixBlendMode: "screen",
          animation: "lib-candle-flicker-b 310ms infinite alternate ease-in-out",
          willChange: "opacity, transform",
        }}
      />
      {/* drifting dust motes */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ mixBlendMode: "screen", opacity: 0.85 }}
      />
    </>
  );
};

export default HeroAtmosphere;