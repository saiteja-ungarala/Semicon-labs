import { motion, useReducedMotion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/motion/Reveal';

/**
 * "Powering IIT Certifications & M.Tech Programs" — the institutional proof
 * band that sits directly above the domains. The supporting art is an
 * inline-SVG certification seal whose ring draws itself on scroll, so the
 * section carries a visual without depending on any institute's logo.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

function CertificationSeal() {
  const reduce = useReducedMotion() ?? false;
  const draw = (delay: number) => ({
    initial: reduce ? undefined : { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: reduce ? 0 : 1.1, ease: EASE, delay },
  });

  return (
    <svg viewBox="0 0 240 240" fill="none" aria-hidden className="h-full w-full">
      {/* concentric rings, drawn like a seal being struck */}
      <motion.circle cx="120" cy="120" r="104" stroke="var(--seal-soft)" strokeWidth="1.5" strokeDasharray="3 7" {...draw(0)} />
      <motion.circle cx="120" cy="120" r="86" stroke="var(--seal)" strokeWidth="2.5" {...draw(0.15)} />
      <motion.circle cx="120" cy="120" r="70" stroke="var(--seal-soft)" strokeWidth="1.2" {...draw(0.3)} />

      {/* academic cap */}
      <motion.path
        d="M120 78 60 100l60 22 60-22-60-22Z"
        stroke="var(--seal)"
        strokeWidth="3"
        strokeLinejoin="round"
        {...draw(0.45)}
      />
      <motion.path
        d="M78 108v26c0 8 19 15 42 15s42-7 42-15v-26"
        stroke="var(--seal)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...draw(0.6)}
      />
      <motion.path d="M180 100v30" stroke="var(--seal)" strokeWidth="3" strokeLinecap="round" {...draw(0.75)} />

      {/* ribbon tails */}
      <motion.path
        d="M100 168l-12 34 22-10 20 10-12-34"
        stroke="var(--seal)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        {...draw(0.85)}
      />

      {/* tick marks around the ring */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const x1 = 120 + Math.cos(a) * 93;
        const y1 = 120 + Math.sin(a) * 93;
        const x2 = 120 + Math.cos(a) * 99;
        const y2 = 120 + Math.sin(a) * 99;
        return (
          <motion.line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="var(--seal-soft)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={reduce ? undefined : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: reduce ? 0 : 0.3, delay: reduce ? 0 : 0.9 + i * 0.035 }}
          />
        );
      })}
    </svg>
  );
}

export function IitPrograms() {
  return (
    <Section alt className="overflow-hidden">
      <div
        className="grid items-center gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14"
        style={{ ['--seal' as string]: '#2E1EE0', ['--seal-soft' as string]: 'rgba(46,30,224,0.35)' }}
      >
        <Reveal>
          <p className="eyebrow text-blue">institutional programs</p>
          <h2 className="mt-4 max-w-[20ch] text-balance text-display-md lg:max-w-none">
            Our Industry-Grade Labs Powering{' '}
            <span className="text-gradient">IIT Programs</span> is Now Open to You
          </h2>
          <p className="mt-6 max-w-[62ch] text-pretty leading-relaxed text-ink-dim">
            Our industry-grade VLSI labs are used in IIT certification and M.Tech programs, providing
            hands-on access to leading EDA tools, real-world VLSI scenarios, and practical engineering
            workflows.
          </p>
          <p className="mt-4 max-w-[62ch] text-pretty leading-relaxed text-ink-dim">
            Experience the same industry-focused learning environment through Semicon Labs — built to
            develop practical skills beyond theory.
          </p>
        </Reveal>

        <Reveal direction="left">
          <div className="relative mx-auto grid h-[260px] w-[260px] place-items-center sm:h-[300px] sm:w-[300px]">
            <div
              aria-hidden
              className="absolute inset-0 rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(46,30,224,0.16), transparent 65%)' }}
            />
            <CertificationSeal />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
