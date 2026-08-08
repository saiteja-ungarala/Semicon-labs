import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';

/**
 * Closing CTA — the site's one intentionally dark, cinematic moment: the
 * electric-blue chip render under a deep navy wash, white type on top.
 */
export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-28">
      {/* Chip artwork + navy wash. The image is decorative; text carries the meaning. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/chips/blue-rays.jpg')" }}
      />
      <div aria-hidden className="absolute inset-0 bg-[#070b2a]/80" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'radial-gradient(80% 90% at 50% 110%, rgba(46,30,224,0.45), transparent 65%)' }}
      />

      <Container className="relative text-center">
        <Reveal>
          <p className="eyebrow justify-center text-sky">the future belongs to problem-solvers</p>
          <h2 className="mx-auto mt-5 max-w-2xl text-display-md text-white">
            Your next project won't wait for you to "finish a course."
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-white/70">
            Start right now and experience what real investigation feels like
            before you decide on anything else.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button to="/pricing" size="lg" arrow>
              Start Your First Challenge
            </Button>
            <Button
              to="/domains"
              size="lg"
              variant="ghost"
              className="border-white/25 text-white hover:border-white/50 hover:bg-white/10"
            >
              Browse All Challenges
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
