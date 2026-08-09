/**
 * Recruiter band — "Partnered with Top Recruiters" over a continuous
 * marquee of the companies our placement network hires into.
 */

interface RecruiterLogo {
  name: string;
  src?: string; // absent → styled text badge (logo not yet supplied)
  /** Stacked/square marks need more height to carry the same optical weight
   *  as a wide wordmark of equal area. */
  square?: boolean;
}

// Sources are the auto-trimmed copies in /logos/trim: the originals carry very
// different amounts of internal whitespace (NVIDIA's ink filled 32% of its
// file, Siemens' 29%), which is why the row used to look ragged. With the
// padding cropped away, one shared box is enough to size them all evenly.
const recruiters: RecruiterLogo[] = [
  { name: 'Intel', src: '/logos/trim/intel.png', square: true },
  { name: 'HCL' },
  { name: 'AMD', src: '/logos/trim/amd.png' },
  { name: 'Synopsys', src: '/logos/trim/synopsys.png' },
  { name: 'NVIDIA', src: '/logos/trim/nvidia.png', square: true },
  { name: 'Cyient', src: '/logos/trim/cyient.png' },
  { name: 'Cadence', src: '/logos/trim/cadence.png' },
  { name: 'Qualcomm', src: '/logos/trim/qualcomm.png' },
  { name: 'Siemens', src: '/logos/trim/siemens.png' },
  // Capgemini asset has a baked-in checkered background — text badge until a clean file arrives.
  { name: 'Capgemini' },
  { name: 'Chipex', src: '/logos/trim/chipex.png' },
  { name: 'Tessolve' },
  { name: 'NXP', src: '/logos/trim/nxp.png' },
  { name: 'Xilinx', src: '/logos/trim/xilinx.png' },
];

// One shared drawing box. Bounding BOTH dimensions is what makes a wide
// wordmark and a stacked glyph read as the same size.
const LOGO_BOX = 'max-h-6 max-w-[104px] object-contain';
const LOGO_BOX_SQUARE = 'max-h-9 max-w-[104px] object-contain';

export function SkillsMarquee() {
  // Duplicate the track so the -50% translate loops seamlessly.
  const track = [...recruiters, ...recruiters];

  return (
    <div className="relative overflow-hidden border-t border-line/40 bg-white py-12">
      <div className="mx-auto mb-10 max-w-4xl px-5 text-center sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-blue-600 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            AI-Powered Career Accelerator
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-sky px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-md">
            Partnered with Top Recruiters
          </span>
        </div>
        
        <h2 className="font-display text-[22px] font-bold leading-snug tracking-tight text-ink sm:text-[28px] md:text-[34px]">
          Master the required skills, become placement-ready through AI mock interviews,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky">and unlock our exclusive Placement Community.</span>
        </h2>
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
                  className={`${r.square ? LOGO_BOX_SQUARE : LOGO_BOX} opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0`}
                />
              ) : (
                <span className="whitespace-nowrap font-display text-[17px] font-extrabold tracking-tight text-ink/40">
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
