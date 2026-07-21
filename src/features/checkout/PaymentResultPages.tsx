import { Seo } from '@/components/seo/Seo';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export function PaymentSuccessPage() {
  return (
    <>
      <Seo title="Payment successful" path="/payment/success" noindex />
      <section className="relative flex min-h-[70vh] items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-radial-dual" />
        <Container className="relative text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue text-white shadow-glow">
            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden>
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="mt-7 text-display-md">Payment successful</h1>
          <p className="mx-auto mt-4 max-w-md text-ink-dim">
            Your purchase is complete and your module has been added to your account. A confirmation
            email is on its way.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button to="/dashboard" arrow>
              Go to your dashboard
            </Button>
            <Button to="/modules" variant="ghost">
              Browse more modules
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}

export function PaymentFailurePage() {
  return (
    <>
      <Seo title="Payment failed" path="/payment/failure" noindex />
      <section className="relative flex min-h-[70vh] items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-radial-dual" />
        <Container className="relative text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-line bg-panel text-ink-dim">
            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden>
              <path d="M7 7l10 10M17 7L7 17" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
          <h1 className="mt-7 text-display-md">Payment didn't go through</h1>
          <p className="mx-auto mt-4 max-w-md text-ink-dim">
            No charge was completed. You can try again — if the problem persists, reach out and we'll
            help sort it out.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button to="/modules" arrow>
              Back to modules
            </Button>
            <Button to="/contact" variant="ghost">
              Contact support
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
