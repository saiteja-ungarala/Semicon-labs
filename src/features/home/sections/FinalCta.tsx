import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-void-2 py-24">
      <div className="pointer-events-none absolute inset-0 bg-radial-dual" />
      <div className="pointer-events-none absolute inset-0 bg-circuit opacity-[0.15]" />
      <Container className="relative text-center">
        <Reveal>
          <p className="eyebrow justify-center">the future belongs to problem-solvers</p>
          <h2 className="mx-auto mt-5 max-w-2xl text-display-md">
            Your next project won't wait for you to "finish a course."
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-ink-dim">
            Start with a free challenge right now — experience what real investigation feels like
            before you decide on anything else.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button to="/register" size="lg" arrow>
              Start Your First Challenge
            </Button>
            <Button to="/domains" size="lg" variant="ghost">
              Browse All Challenges
            </Button>
          </div>
          <p className="mt-7 font-mono text-xs text-ink-faint">
            7-day money-back guarantee · No credit card for the free tier
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
