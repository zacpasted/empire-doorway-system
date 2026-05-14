/** Two or three barely visible dust motes drifting through the charcoal register. */
export const DustMotes = () => (
  <svg
    aria-hidden
    className="pointer-events-none absolute inset-0 h-full w-full"
    style={{ zIndex: 1 }}
  >
    <defs>
      <radialGradient id="mote">
        <stop offset="0%" stopColor="#C9A96E" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#C9A96E" stopOpacity="0" />
      </radialGradient>
    </defs>
    {[
      { cx: 18, cy: 30, dur: 32, dx: 12, dy: -8, delay: 0 },
      { cx: 62, cy: 70, dur: 38, dx: -10, dy: -14, delay: -8 },
      { cx: 84, cy: 22, dur: 30, dx: -8, dy: 10, delay: -16 },
    ].map((m, i) => (
      <g key={i} opacity={0.06}>
        <circle r="2" fill="url(#mote)">
          <animate
            attributeName="cx"
            values={`${m.cx}%;${m.cx + m.dx}%;${m.cx}%`}
            dur={`${m.dur}s`}
            begin={`${m.delay}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="cy"
            values={`${m.cy}%;${m.cy + m.dy}%;${m.cy}%`}
            dur={`${m.dur}s`}
            begin={`${m.delay}s`}
            repeatCount="indefinite"
          />
        </circle>
      </g>
    ))}
  </svg>
);

export default DustMotes;