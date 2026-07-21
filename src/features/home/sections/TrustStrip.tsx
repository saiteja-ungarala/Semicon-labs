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
        <p className="eyebrow justify-center">the platform in numbers</p>
        <h2 className="mx-auto mt-3 max-w-xl text-center text-display-md">
          Structured, measured, and growing.
        </h2>
      </Reveal>

      <Reveal>
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3 lg:grid-cols-5">
          {platformStats.map((stat) => (
            <div key={stat.label} className="bg-panel p-7 text-center sm:p-8">
              <div className="font-mono text-3xl font-bold text-gradient sm:text-4xl">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="mt-2 text-[12px] uppercase tracking-wider text-ink-faint">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </Container>
  );
}
