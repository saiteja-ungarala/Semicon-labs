import { Section, SectionHead } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { proficiencyLevels } from '@/data/curriculum';

const tone = { beginner: 'neutral', specialist: 'blue', expert: 'sky' } as const;

export function ProficiencyLevels() {
  return (
    <Section>
      <SectionHead
        eyebrow="proficiency levels"
        title="Guided, then independent, then assessed."
        lede="Every competency moves you through the same progression a new hire goes through on a real team."
      />
      <RevealGroup className="grid gap-6 md:grid-cols-3" stagger={0.1}>
        {proficiencyLevels.map((level, i) => (
          <RevealItem key={level.key}>
            <div className="relative h-full overflow-hidden rounded-2xl border border-line bg-panel/60 p-8">
              <span className="pointer-events-none absolute -right-6 -top-8 font-display text-[120px] font-bold leading-none text-line/40">
                {i + 1}
              </span>
              <div className="relative">
                <Badge tone={tone[level.key]}>{level.badge}</Badge>
                <h3 className="mt-5 text-lg font-semibold">{level.title}</h3>
                <p className="mt-3 text-sm text-ink-dim">{level.description}</p>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
