import { useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';

interface WaferGraphicProps {
  className?: string;
}

/**
 * Animated wafer: a die grid clipped to a wafer circle with a blue
 * lithography sweep beam and randomly "lit" dies. Purely decorative.
 * Deterministic layout; the flicker delays vary per die via index math.
 */
export function WaferGraphic({ className }: WaferGraphicProps) {
  const reduce = useReducedMotion();

  const dies = useMemo(() => {
    const size = 26;
    const rows = 15;
    const cols = 15;
    const offsetX = 200 - (cols * size) / 2;
    const offsetY = 200 - (rows * size) / 2;
    const out: { x: number; y: number; lit: boolean; delay: number; dur: number }[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = offsetX + c * size;
        const y = offsetY + r * size;
        const cx = x + size / 2;
        const cy = y + size / 2;
        const dist = Math.hypot(cx - 200, cy - 200);
        if (dist < 168) {
          // deterministic pseudo-random from grid position
          const seed = (r * 31 + c * 17) % 100;
          out.push({
            x,
            y,
            lit: seed < 14,
            delay: (seed % 50) / 10,
            dur: 4 + (seed % 30) / 10,
          });
        }
      }
    }
    return out;
  }, []);

  return (
    <div className={className} aria-hidden>
      <div className="relative mx-auto aspect-square w-full max-w-[440px]">
        <div className="absolute -inset-[12%] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(46,30,224,0.18),transparent_65%)] blur-2xl" />
        <svg viewBox="0 0 400 400" className="relative h-full w-full">
          <defs>
            <clipPath id="waferClip">
              <circle cx="200" cy="200" r="168" />
            </clipPath>
            <linearGradient id="beamGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2E1EE0" stopOpacity="0" />
              <stop offset="50%" stopColor="#2E1EE0" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#2E1EE0" stopOpacity="0" />
            </linearGradient>
          </defs>

          <circle cx="200" cy="200" r="168" fill="none" stroke="#CBD7E8" strokeWidth="1.4" />
          <circle
            cx="200"
            cy="200"
            r="168"
            fill="none"
            stroke="#2E1EE0"
            strokeWidth="0.6"
            strokeDasharray="2 5"
            opacity="0.45"
          />

          <g clipPath="url(#waferClip)">
            {dies.map((d, i) => (
              <rect
                key={i}
                x={d.x}
                y={d.y}
                width={24}
                height={24}
                fill="none"
                stroke="rgba(46,30,224,0.16)"
                strokeWidth="0.6"
              />
            ))}
            {!reduce &&
              dies
                .filter((d) => d.lit)
                .map((d, i) => (
                  <rect
                    key={`lit-${i}`}
                    x={d.x}
                    y={d.y}
                    width={24}
                    height={24}
                    fill="none"
                    stroke="#4361FF"
                    strokeWidth="0.9"
                    style={{ animation: `flicker ${d.dur}s ease-in-out ${d.delay}s infinite` }}
                    opacity={0}
                  />
                ))}

            {/* Lithography sweep beam */}
            {!reduce && (
              <rect x="0" y="0" width="400" height="64" fill="url(#beamGrad)" className="animate-sweep" />
            )}
          </g>

          {/* Wafer flat */}
          <path d="M40 260 A168 168 0 0 0 120 336" stroke="#CBD7E8" strokeWidth="1.4" fill="none" />
          <circle cx="200" cy="200" r="3" fill="#2E1EE0" />
        </svg>
      </div>
    </div>
  );
}
