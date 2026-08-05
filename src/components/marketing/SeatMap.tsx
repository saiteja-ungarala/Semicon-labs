import { cn } from '@/lib/cn';

/**
 * Seat maps drawn as silicon: one square is one engineer. A single bonded die
 * for an individual, a five-die cluster for a team, a full wafer for an
 * organisation — so headcount reads from the picture before any text.
 */

type Kind = 'die' | 'cluster' | 'wafer';

const LIT = '#5B4EF2';
const LIT_EDGE = 'rgba(201,195,255,0.85)';
const DIM = 'rgba(255,255,255,0.07)';
const DIM_EDGE = 'rgba(255,255,255,0.18)';
const FIELD = 'rgba(255,255,255,0.16)';
const CROP = 'rgba(255,255,255,0.5)';

/** Shared chrome: dashed reticle field + four crop marks. */
function Field() {
  return (
    <>
      <rect x="3" y="3" width="114" height="114" rx="3" fill="none" stroke={FIELD} strokeWidth="1" strokeDasharray="2 5" />
      {['M8 22 V8 H22', 'M98 8 H112 V22', 'M112 98 V112 H98', 'M22 112 H8 V98'].map((d) => (
        <path key={d} d={d} fill="none" stroke={CROP} strokeWidth="1.3" strokeLinecap="square" />
      ))}
    </>
  );
}

function Die() {
  const bonds = [
    'M48 38V26', 'M60 38V22', 'M72 38V26',
    'M48 82V94', 'M60 82V98', 'M72 82V94',
    'M38 48H26', 'M38 60H22', 'M38 72H26',
    'M82 48H94', 'M82 60H98', 'M82 72H94',
  ];
  return (
    <>
      <line x1="8" y1="60" x2="112" y2="60" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="1 6" />
      <line x1="60" y1="8" x2="60" y2="112" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="1 6" />
      {bonds.map((d) => (
        <path key={d} d={d} stroke="#8E85FF" strokeWidth="1" opacity="0.55" strokeLinecap="round" />
      ))}
      <rect x="38" y="38" width="44" height="44" rx="3" fill={LIT} stroke={LIT_EDGE} strokeWidth="1.4" />
      <rect x="50" y="50" width="20" height="20" rx="1.5" fill="#EFEDFF" opacity="0.92" />
      <path d="M50 57H70M57 50V70" stroke="#2E1EE0" strokeWidth="1.2" opacity="0.55" />
    </>
  );
}

function Cluster() {
  const origins = [8, 45, 82];
  const lit = new Set(['45,8', '8,45', '45,45', '82,45', '45,82']);
  const routes = ['M58 34V45', 'M58 71V82', 'M34 58H45', 'M71 58H82'];
  const vias = [
    [58, 39.5],
    [58, 76.5],
    [39.5, 58],
    [76.5, 58],
  ];
  return (
    <>
      {routes.map((d) => (
        <path key={d} d={d} stroke={LIT_EDGE} strokeWidth="1.6" strokeLinecap="round" />
      ))}
      {vias.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x - 1.5} y={y - 1.5} width="3" height="3" rx="0.5" fill={LIT_EDGE} />
      ))}
      {origins.flatMap((y) =>
        origins.map((x) => {
          const on = lit.has(`${x},${y}`);
          return (
            <g key={`${x}-${y}`}>
              <rect
                x={x}
                y={y}
                width="26"
                height="26"
                rx="2"
                fill={on ? LIT : DIM}
                stroke={on ? LIT_EDGE : DIM_EDGE}
                strokeWidth={on ? 1.3 : 1}
              />
              {on &&
                [
                  [6, 6],
                  [16, 6],
                  [6, 16],
                  [16, 16],
                ].map(([dx, dy]) => (
                  <rect key={`${dx}-${dy}`} x={x + dx} y={y + dy} width="4" height="4" fill="#EFEDFF" opacity="0.85" />
                ))}
            </g>
          );
        }),
      )}
    </>
  );
}

function Wafer({ id }: { id: string }) {
  // r=48 at (60,60) with a flat at y=102 → chord runs x 36.76 → 83.24
  const outline = 'M36.76 102A48 48 0 1 1 83.24 102Z';
  const coords = [3, 16, 29, 42, 55, 68, 81, 94, 107];
  return (
    <>
      <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1" strokeDasharray="2 6" />
      {['M60 0V6', 'M120 60H114', 'M60 120V114', 'M0 60H6'].map((d) => (
        <path key={d} d={d} stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
      ))}
      <clipPath id={id}>
        <path d={outline} />
      </clipPath>
      <path d={outline} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.30)" strokeWidth="1.4" />
      <g clipPath={`url(#${id})`}>
        {coords.flatMap((y, j) =>
          coords.map((x, i) => {
            const dim = (i * 5 + j * 3) % 8 === 0;
            return (
              <rect
                key={`${x}-${y}`}
                x={x}
                y={y}
                width="11"
                height="11"
                rx="1"
                fill={dim ? DIM : LIT}
                stroke={dim ? DIM_EDGE : LIT_EDGE}
                strokeWidth="0.8"
              />
            );
          }),
        )}
      </g>
    </>
  );
}

export function SeatMap({ kind, slug, className }: { kind: Kind; slug: string; className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden className={cn('pointer-events-none', className)}>
      <Field />
      {kind === 'die' && <Die />}
      {kind === 'cluster' && <Cluster />}
      {kind === 'wafer' && <Wafer id={`wafer-${slug}`} />}
    </svg>
  );
}
