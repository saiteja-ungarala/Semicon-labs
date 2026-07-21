import { Section, SectionHead } from '@/components/ui/Section';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { testimonials } from '@/data/marketing';

export function Testimonials() {
  return (
    <Section alt>
      <SectionHead
        eyebrow="from learners"
        title="What changed once they started solving, not studying."
      />
      <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
        {testimonials.slice(0, 3).map((t) => (
          <RevealItem key={t.name}>
            <figure className="flex h-full flex-col rounded-2xl border border-line bg-panel/60 p-7">
              <div className="text-sm tracking-[0.2em] text-navy" aria-label={`${t.rating} out of 5 stars`}>
                {'★'.repeat(t.rating)}
              </div>
              <blockquote className="mt-4 flex-1 text-pretty text-[15px] leading-relaxed text-ink">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6">
                <div className="text-sm font-semibold text-ink">{t.name}</div>
                <div className="font-mono text-xs text-ink-faint">{t.role}</div>
              </figcaption>
            </figure>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
