import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Seo } from '@/components/seo/Seo';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/marketing/PageHero';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { RouteFallback } from '@/components/feedback/RouteFallback';
import { FormBanner } from '@/features/auth/AuthShell';
import { useModule } from '@/features/marketplace/api';
import { useAuthStore } from '@/stores/auth';
import { formatMoney, netPriceMinor } from '@/lib/money';
import { apiErrorMessage } from '@/lib/api';
import { createOrder, verifyPayment, confirmDevPayment } from './api';
import { loadEasebuzz, openEasebuzz } from './easebuzz';

export default function CheckoutPage() {
  const [params] = useSearchParams();
  const slug = params.get('module') ?? undefined;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);

  const { data: module, isLoading } = useModule(slug);
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  if (!slug) {
    return (
      <Section>
        <div className="rounded-2xl border border-dashed border-line py-24 text-center">
          <p className="text-ink-dim">No module selected for checkout.</p>
          <Button to="/modules" className="mt-6" variant="ghost">
            Browse modules
          </Button>
        </div>
      </Section>
    );
  }
  if (isLoading) return <RouteFallback />;
  if (!module) {
    return (
      <Section>
        <div className="rounded-2xl border border-dashed border-line py-24 text-center">
          <p className="text-ink-dim">That module could not be found.</p>
        </div>
      </Section>
    );
  }

  if (module.owned) {
    return (
      <Section>
        <div className="mx-auto max-w-lg rounded-2xl border border-line bg-panel p-8 text-center shadow-card">
          <h1 className="text-2xl font-bold">You already own this module</h1>
          <p className="mt-2 text-ink-dim">It's available in your dashboard.</p>
          <Button to="/dashboard" className="mt-6" arrow>
            Go to dashboard
          </Button>
        </div>
      </Section>
    );
  }

  const net = netPriceMinor(module.priceMinor, module.discountMinor);

  const onPurchaseSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ['module', slug] });
    await queryClient.invalidateQueries({ queryKey: ['purchases'] });
    navigate('/payment/success', { replace: true });
  };

  const handlePay = async () => {
    setError('');
    const cleanedPhone = phone.replace(/\D/g, '');
    if (cleanedPhone.length < 10) {
      setPhoneError('Enter a valid 10-digit phone number');
      return;
    }
    setPhoneError('');
    setProcessing(true);
    try {
      const order = await createOrder({ moduleSlugs: [module.slug], phone: cleanedPhone });

      // Dev mode: no gateway configured — simulate a capture server-side.
      if (order.mode === 'dev') {
        await confirmDevPayment(order.orderId);
        await onPurchaseSuccess();
        return;
      }

      // Easebuzz mode.
      const ok = await loadEasebuzz();
      if (!ok) throw new Error('Could not load the payment gateway. Check your connection.');

      openEasebuzz(order.merchantKey!, order.easebuzzEnv, order.accessKey!, async (response) => {
        if (response.status !== 'success') {
          setProcessing(false);
          if (response.status === 'userCancelled') return; // user closed the popup
          navigate('/payment/failure', { replace: true });
          return;
        }
        try {
          await verifyPayment(response);
          await onPurchaseSuccess();
        } catch (err) {
          setError(apiErrorMessage(err, 'Payment verification failed'));
          navigate('/payment/failure', { replace: true });
        }
      });
    } catch (err) {
      setError(apiErrorMessage(err, 'Could not start checkout'));
      setProcessing(false);
    }
  };

  return (
    <>
      <Seo title="Checkout" path="/checkout" noindex />
      <PageHero
        eyebrow="secure checkout"
        title="Complete your purchase"
        crumbs={[{ name: 'Home', to: '/' }, { name: 'Modules', to: '/modules' }, { name: 'Checkout' }]}
      />
      <Section>
        <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Summary */}
          <div className="rounded-2xl border border-line bg-panel p-7 shadow-card">
            <h2 className="text-lg font-bold">Order summary</h2>
            <div className="mt-5 flex items-start justify-between gap-4 border-b border-line pb-5">
              <div>
                <p className="font-semibold text-ink">{module.title}</p>
                <p className="mt-1 text-sm text-ink-dim">
                  {module.domain.name} · {module.level}
                </p>
              </div>
              <span className="font-mono font-semibold text-ink">{formatMoney(net, module.currency)}</span>
            </div>
            <dl className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between text-ink-dim">
                <dt>Subtotal</dt>
                <dd>{formatMoney(module.priceMinor, module.currency)}</dd>
              </div>
              {module.discountMinor > 0 && (
                <div className="flex justify-between text-ink-dim">
                  <dt>Discount</dt>
                  <dd>−{formatMoney(module.discountMinor, module.currency)}</dd>
                </div>
              )}
              <div className="flex justify-between border-t border-line pt-3 text-base font-bold text-ink">
                <dt>Total</dt>
                <dd>{formatMoney(net, module.currency)}</dd>
              </div>
            </dl>
          </div>

          {/* Pay */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="gradient-border rounded-2xl border border-transparent bg-panel p-7 shadow-card">
              {error && <FormBanner tone="error">{error}</FormBanner>}
              <p className="text-sm text-ink-dim">
                Purchasing as <span className="font-semibold text-ink">{user?.email}</span>.
              </p>
              <div className="mt-4">
                <TextField
                  label="Phone number"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  error={phoneError}
                  hint="Required by the payment gateway for your receipt."
                />
              </div>
              <Button onClick={handlePay} className="mt-5 w-full" disabled={processing} arrow={!processing}>
                {processing ? 'Processing…' : `Pay ${formatMoney(net, module.currency)}`}
              </Button>
              <p className="mt-4 text-center text-xs text-ink-faint">
                Secured by Easebuzz · 7-day money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
