import { Section, SectionHead } from '@/components/ui/Section';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { Card } from '@/components/ui/Card';
import { learningLoop } from '@/data/curriculum';
import { ChevronRight } from 'lucide-react';

export function HowItWorks() {
  return (
    <Section id="how" className="bg-void-2 relative overflow-hidden">
      <SectionHead
        eyebrow="the learning workflow"
        title="Every challenge follows the same real-project loop."
        lede="Problem → Investigation → Solution → Validation. The same sequence you'd run on a live project."
      />

      <RevealGroup className="mt-16 grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8" stagger={0.15}>
        {learningLoop.map((stage, i) => (
          <RevealItem key={stage.step}>
            <div className="relative group h-full">
              {/* Clean Chevron Connector arrow between steps on desktop */}
              {i < learningLoop.length - 1 && (
                <div
                  aria-hidden
                  className="absolute -right-6 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-white border border-line shadow-sm text-blue/40 z-30 group-hover:text-blue transition-colors duration-300"
                >
                  <ChevronRight className="w-6 h-6" />
                </div>
              )}
              
              <Card interactive className="h-full pt-10 px-8 pb-8 relative z-20 overflow-visible mt-4 border border-line-strong hover:border-blue/30 transition-all duration-300 hover:shadow-md">
                <div className="absolute -top-6 left-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-line shadow-sm text-ink font-display text-xl font-bold group-hover:bg-blue group-hover:text-white group-hover:border-blue group-hover:shadow-glow transition-all duration-300">
                  {i + 1}
                </div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink-dim mb-4 block transition-colors duration-300">
                  {stage.step}
                </span>
                <h3 className="text-xl font-bold text-ink mb-3 transition-colors duration-300">{stage.title}</h3>
                <p className="text-[15px] text-ink-faint leading-relaxed">{stage.description}</p>
              </Card>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
