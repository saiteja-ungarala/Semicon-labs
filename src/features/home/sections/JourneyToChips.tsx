import { Section, SectionHead } from '@/components/ui/Section';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/cn';

const steps = [
  {
    num: '01',
    phase: 'Modules',
    title: 'Master individual skills',
    description:
      'Your journey begins with focused engineering challenges built around specific modules in Physical Design and Design Verification.',
  },
  {
    num: '02',
    phase: 'Judgment',
    title: 'Build engineering judgment',
    description:
      'Move from guided to independent to assessment challenges, reinforcing the judgment to investigate, decide, and validate on your own.',
  },
  {
    num: '03',
    phase: 'Projects',
    title: 'Connect skills in real projects',
    description:
      'As your modules grow, individual skills come together through complete, industry-inspired semiconductor projects.',
  },
  {
    num: '04',
    phase: 'Lifecycle',
    title: 'Deliver a production-ready chip',
    description:
      'Experience the full development lifecycle — from requirements and problem-solving to validation — within your chosen domain.',
  },
];

export function JourneyToChips() {
  return (
    <Section>
      <SectionHead
        eyebrow="from modules to complete chips"
        title="Individual skills, connected into real product development."
        lede="Every engineer starts by mastering individual skills. Here's how those skills come together into complete chip development."
      />

      <div className="relative mx-auto mt-16 max-w-4xl px-4 sm:px-6">
        {/* Vertical Line */}
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue/20 to-transparent sm:-translate-x-1/2" />

        <RevealGroup className="flex flex-col gap-12 sm:gap-20 relative z-10" stagger={0.15}>
          {steps.map((step, i) => {
            const isEven = i % 2 === 0;
            return (
              <RevealItem key={step.num}>
                <div className={cn("flex flex-col sm:flex-row items-center sm:gap-12", isEven ? "" : "sm:flex-row-reverse")}>
                  
                  {/* Content Card */}
                  <div className="w-full sm:w-1/2 pl-12 sm:pl-0 sm:pr-0">
                    <Card interactive className={cn("w-full relative", isEven ? "sm:mr-8" : "sm:ml-8")}>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-blue mb-3 block font-bold">
                        {step.phase}
                      </span>
                      <h3 className="text-xl font-bold text-ink mb-3">{step.title}</h3>
                      <p className="text-sm text-ink-dim leading-relaxed">{step.description}</p>
                    </Card>
                  </div>

                  {/* Center Node */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-[3px] border-blue flex items-center justify-center z-10 hidden sm:flex shadow-glow">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue" />
                  </div>
                  
                  {/* Mobile Node (left aligned) */}
                  <div className="absolute left-4 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-2 border-blue flex sm:hidden items-center justify-center z-10 mt-6 shadow-glow">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue" />
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden sm:block sm:w-1/2" />
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>

      <p className="mx-auto mt-20 max-w-2xl text-pretty text-center text-ink font-semibold">
        By the end, you won't just know individual concepts — you'll understand how they connect to
        deliver a production-ready chip.
      </p>
    </Section>
  );
}
