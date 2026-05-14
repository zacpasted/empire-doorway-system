import { useEffect, useRef } from "react";

/** A soft warm light that follows the cursor at ~30% delay.
 * Renders inside a charcoal section. Position absolute, parent must be relative + overflow hidden. */
export const CursorCandle = () => {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const visible = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;

    const onMove = (e: MouseEvent) => {
      const r = parent.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (x < 0 || y < 0 || x > r.width || y > r.height) {
        visible.current = false;
      } else {
        visible.current = true;
        target.current = { x, y };
      }
    };

    let raf = 0;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;
      el.style.transform = `translate3d(${pos.current.x - 300}px, ${pos.current.y - 300}px, 0)`;
      el.style.opacity = visible.current ? "1" : "0";
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute top-0 left-0"
      style={{
        width: 600,
        height: 600,
        background: "radial-gradient(circle, rgba(201,169,110,0.10) 0%, rgba(201,169,110,0.04) 35%, transparent 70%)",
        filter: "blur(40px)",
        opacity: 0,
        transition: "opacity 600ms ease",
        mixBlendMode: "screen",
        zIndex: 1,
      }}
    />
  );
};

export default CursorCandle;