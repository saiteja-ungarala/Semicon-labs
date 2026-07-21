import { Seo } from '@/components/seo/Seo';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found" path="/404" noindex />
      <section className="relative flex min-h-[70vh] items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-radial-dual" />
        <div className="pointer-events-none absolute inset-0 bg-circuit opacity-[0.12]" />
        <Container className="relative text-center">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-navy">error 404</p>
          <h1 className="mt-6 font-display text-[clamp(4rem,14vw,9rem)] font-bold leading-none text-gradient">
            404
          </h1>
          <p className="mx-auto mt-4 max-w-md text-lg text-ink-dim">
            This path didn't route. The signal terminated before it reached a valid destination.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button to="/" arrow>
              Back to home
            </Button>
            <Button to="/domains" variant="ghost">
              Explore domains
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
