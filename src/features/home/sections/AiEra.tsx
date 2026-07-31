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
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal>
          <p className="eyebrow text-blue">the skills every semiconductor engineer needs</p>
          <h2 className="mt-4 text-display-md">
            Learn the Skills That Matter
            <br />
            <span className="text-gradient">in Real Projects.</span>
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
          <Card gradient className="p-8">
            <p className="font-mono text-xs uppercase tracking-wider text-blue font-bold">
              What industry projects actually demand
            </p>
            <RevealGroup className="mt-6 space-y-px" stagger={0.05}>
              {industryDemands.map((demand, i) => (
                <RevealItem key={demand}>
                  <div className="flex items-center gap-4 border-b border-line/60 py-3.5 last:border-0 hover:bg-void/40 transition-colors px-2 rounded-lg -mx-2">
                    <span className="font-mono text-xs text-blue font-bold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[15px] text-ink font-medium">{demand}</span>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
