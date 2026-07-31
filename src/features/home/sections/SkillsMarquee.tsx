/**
 * Recruiter band — "Partnered with 200+ Recruiters" over a continuous
 * marquee of the companies our placement network hires into.
 */

interface RecruiterLogo {
  name: string;
  src?: string; // absent → styled text badge (logo not yet supplied)
}

const recruiters: RecruiterLogo[] = [
  { name: 'Intel', src: '/logos/intel.png' },
  { name: 'HCL' },
  { name: 'AMD', src: '/logos/amd.png' },
  { name: 'Synopsys', src: '/logos/synopsys.png' },
  { name: 'NVIDIA', src: '/logos/nvidia.jpg' },
  { name: 'Cyient', src: '/logos/cyient.png' },
  { name: 'Cadence', src: '/logos/cadence.png' },
  { name: 'Qualcomm', src: '/logos/qualcomm.png' },
  { name: 'Siemens', src: '/logos/siemens.jpg' },
  { name: 'Capgemini', src: '/logos/capgemini.webp' },
  { name: 'Chipex', src: '/logos/chipex.jpg' },
  { name: 'Tessolve' },
  { name: 'NXP', src: '/logos/nxp.avif' },
  { name: 'Xilinx', src: '/logos/xilinx.png' },
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
        {/* Symmetric px on each item (not gap) so the -50% loop is seamless. */}
        <div className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]">
          {track.map((r, i) => (
            <span key={`${r.name}-${i}`} className="flex items-center px-7" title={r.name}>
              {r.src ? (
                <img
                  src={r.src}
                  alt={r.name}
                  loading="lazy"
                  className="h-9 w-auto max-w-[130px] object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0 sm:h-10"
                />
              ) : (
                <span className="whitespace-nowrap font-display text-2xl font-extrabold tracking-tight text-ink/45">
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
