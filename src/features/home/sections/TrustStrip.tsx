import { Container } from '@/components/ui/Container';
import { AnimatedCounter } from '@/components/visuals/AnimatedCounter';
import { Reveal } from '@/components/motion/Reveal';
import { platformStats } from '@/data/curriculum';

/**
 * Impact band — the company site's animated stat-grid pattern, adapted to the
 * platform's structural numbers. Big counters that tick up on scroll.
 */
export function TrustStrip() {
  return (
    <Container className="py-16 sm:py-20">
      <Reveal>
        <h2 className="mx-auto max-w-3xl text-center text-display-md">
          Industry Challenges That <span className="text-gradient">Prepare You for Placements</span>
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-center text-pretty text-ink-dim leading-relaxed">
          Experience real-world engineering scenarios with domain-specific skills, modules, and
          scenario based problems inspired by industry workflows. Develop the debugging, validation,
          and problem-solving skills required to confidently tackle VLSI interviews and placement
          opportunities.
        </p>
      </Reveal>

      <Reveal>
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3 lg:grid-cols-5">
          {platformStats.map((stat) => (
            <div
              key={stat.label}
              className="group relative bg-panel p-7 text-center transition-all duration-300 hover:z-10 hover:-translate-y-1 hover:shadow-card-hover sm:p-8"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: 'radial-gradient(circle at 50% 0%, rgba(46,30,224,0.06), transparent 65%)' }}
              />
              <div className="relative font-mono text-3xl font-bold text-gradient transition-transform duration-300 group-hover:scale-110 sm:text-4xl">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="relative mt-2 text-[12px] uppercase tracking-wider text-ink-faint transition-colors duration-300 group-hover:text-ink-dim">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </Container>
  );
}
