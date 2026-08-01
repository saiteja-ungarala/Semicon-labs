/**
 * Recruiter band — "Partnered with 200+ Recruiters" over a continuous
 * marquee of the companies our placement network hires into.
 */

interface RecruiterLogo {
  name: string;
  src?: string; // absent → styled text badge (logo not yet supplied)
  cls?: string; // per-logo max-height class for optical size consistency
}

// `cls` tunes each mark's height so every logo reads the SAME optical size
// (source files have wildly different padding/aspect ratios).
const recruiters: RecruiterLogo[] = [
  { name: 'Intel', src: '/logos/intel.png', cls: 'max-h-11' },
  { name: 'HCL' },
  { name: 'AMD', src: '/logos/amd.png', cls: 'max-h-6' },
  { name: 'Synopsys', src: '/logos/synopsys.png', cls: 'max-h-6' },
  { name: 'NVIDIA', src: '/logos/nvidia.jpg', cls: 'max-h-12' },
  { name: 'Cyient', src: '/logos/cyient.png', cls: 'max-h-6' },
  { name: 'Cadence', src: '/logos/cadence.png', cls: 'max-h-7' },
  { name: 'Qualcomm', src: '/logos/qualcomm.png', cls: 'max-h-7' },
  { name: 'Siemens', src: '/logos/siemens.jpg', cls: 'max-h-7' },
  // Capgemini asset has a baked-in checkered background — text badge until a clean file arrives.
  { name: 'Capgemini' },
  { name: 'Chipex', src: '/logos/chipex.jpg', cls: 'max-h-9' },
  { name: 'Tessolve' },
  { name: 'NXP', src: '/logos/nxp.avif', cls: 'max-h-6' },
  { name: 'Xilinx', src: '/logos/xilinx.png', cls: 'max-h-7' },
];

export function SkillsMarquee() {
  // Duplicate the track so the -50% translate loops seamlessly.
  const track = [...recruiters, ...recruiters];

  return (
    <div className="relative overflow-hidden border-t border-line/40 bg-white py-12">
      <div className="mx-auto mb-8 max-w-content px-5 sm:px-6 lg:px-8">
        <p className="text-center font-display text-[13px] font-bold uppercase tracking-[0.12em] text-ink-faint">
          Partnered with <span className="text-blue">200+ Recruiters</span>
        </p>
      </div>
      <div
        className="group relative overflow-hidden"
        style={{
          maskImage: 'linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent)',
        }}
      >
        {/* Symmetric px on each item (not gap) so the -50% loop is seamless.
            Every logo lives in the SAME fixed box so sizes read consistent. */}
        <div className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]">
          {track.map((r, i) => (
            <span
              key={`${r.name}-${i}`}
              className="flex h-12 w-44 shrink-0 items-center justify-center px-6"
              title={r.name}
            >
              {r.src ? (
                <img
                  src={r.src}
                  alt={r.name}
                  loading="lazy"
                  className={`${r.cls ?? 'max-h-8'} max-w-full object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0`}
                />
              ) : (
                <span className="whitespace-nowrap font-display text-xl font-extrabold tracking-tight text-ink/40">
                  {r.name}
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
