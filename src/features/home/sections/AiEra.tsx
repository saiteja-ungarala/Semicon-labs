import { Section } from '@/components/ui/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { industryDemands } from '@/data/marketing';
import { Card } from '@/components/ui/Card';

/**
 * "Designed for the AI Era" — the central thesis from the tone/theme doc:
 * AI can generate solutions; engineers must decide whether they're right.
 */
export function AiEra() {
  return (
    <Section alt>
      <div className="grid gap-12 lg:grid-cols-[1fr_400px] lg:items-center lg:gap-16">
        <Reveal>
          <p className="eyebrow text-blue">build the skills ai can't replace</p>
          <h2 className="mt-4 text-display-md">
            AI can generate solutions.
            <br />
            <span className="text-gradient">Engineers must decide whether they're right.</span>
          </h2>
          <p className="mt-6 text-pretty text-ink-dim leading-relaxed">
            AI can generate scripts, suggest fixes, and automate execution. But it cannot replace
            engineering judgment. Someone still has to ask the right questions, understand failures,
            verify results, evaluate trade-offs, and decide whether a design is truly ready to move
            forward.
          </p>
          <p className="mt-4 text-pretty text-ink-dim leading-relaxed">
            The future belongs not to engineers who simply use tools, but to engineers who can
            confidently work with AI to build better silicon. Those are the capabilities Semicon
            Labs is built to develop.
          </p>
        </Reveal>

        <Reveal direction="left">
          <Card gradient className="overflow-hidden p-0">
            {/* AI-over-silicon artwork crowns the demand list */}
            <div className="relative h-44 overflow-hidden sm:h-48">
              <img
                src="/images/chips/chip-ai.jpg"
                alt=""
                aria-hidden
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/15 to-transparent" />
              <span className="absolute bottom-2.5 left-6 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/85">
                AI × Silicon
              </span>
            </div>
            <div className="px-6 pb-6 pt-4">
            <p className="font-mono text-[11px] uppercase tracking-wider text-blue font-bold">
              What industry projects actually demand
            </p>
            <RevealGroup className="mt-3" stagger={0.05}>
              {industryDemands.map((demand, i) => (
                <RevealItem key={demand}>
                  <div className="-mx-2 flex items-center gap-3 rounded-lg border-b border-line/60 px-2 py-2 transition-colors last:border-0 hover:bg-void/40">
                    <span className="font-mono text-[11px] font-bold text-blue">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[14px] font-medium text-ink">{demand}</span>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
            </div>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
