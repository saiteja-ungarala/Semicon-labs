import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/components/layout/RootLayout';
import { HomePage } from '@/features/home/HomePage';
import { ProtectedRoute } from '@/components/routing/ProtectedRoute';

// Marketing / public pages
const AboutPage = lazy(() => import('@/features/pages/AboutPage'));
const WhoWeServePage = lazy(() => import('@/features/pages/WhoWeServePage'));
const AudiencePage = lazy(() => import('@/features/pages/AudiencePage'));
const CompetenciesPage = lazy(() => import('@/features/pages/CompetenciesPage'));
const DomainsPage = lazy(() => import('@/features/pages/DomainsPage'));
const DomainDetailPage = lazy(() => import('@/features/pages/DomainDetailPage'));
const SkillDetailPage = lazy(() => import('@/features/pages/SkillDetailPage'));
const PricingPage = lazy(() => import('@/features/pages/PricingPage'));
const FaqPage = lazy(() => import('@/features/pages/FaqPage'));
const ContactPage = lazy(() => import('@/features/pages/ContactPage'));
const CareersPage = lazy(() => import('@/features/pages/CareersPage'));
const LegalPage = lazy(() => import('@/features/pages/LegalPage'));
const NotFoundPage = lazy(() => import('@/features/pages/NotFoundPage'));

// Marketplace
const ModulesPage = lazy(() => import('@/features/marketplace/ModulesPage'));
const ModuleDetailPage = lazy(() => import('@/features/marketplace/ModuleDetailPage'));

// Auth
const LoginPage = lazy(() => import('@/features/auth/LoginPage'));
const RegisterPage = lazy(() => import('@/features/auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('@/features/auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('@/features/auth/ResetPasswordPage'));
const VerifyEmailPage = lazy(() => import('@/features/auth/VerifyEmailPage'));

// Checkout & payments
const CheckoutPage = lazy(() => import('@/features/checkout/CheckoutPage'));
const PaymentResultPages = () => import('@/features/checkout/PaymentResultPages');
const PaymentSuccessPage = lazy(() =>
  PaymentResultPages().then((m) => ({ default: m.PaymentSuccessPage })),
);
const PaymentFailurePage = lazy(() =>
  PaymentResultPages().then((m) => ({ default: m.PaymentFailurePage })),
);

// Dashboard (protected)
const DashboardLayout = lazy(() =>
  import('@/features/dashboard/DashboardLayout').then((m) => ({ default: m.DashboardLayout })),
);
const DashboardHome = lazy(() => import('@/features/dashboard/DashboardHome'));
const MyPurchasesPage = lazy(() => import('@/features/dashboard/MyPurchasesPage'));
const OrdersPage = lazy(() => import('@/features/dashboard/OrdersPage'));
const ProfilePage = lazy(() => import('@/features/dashboard/ProfilePage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },

      // Public marketing
      { path: 'about', element: <AboutPage /> },
      { path: 'who-we-serve', element: <WhoWeServePage /> },
      { path: 'who-we-serve/:audience', element: <AudiencePage /> },
      { path: 'competencies', element: <CompetenciesPage /> },
      { path: 'domains', element: <DomainsPage /> },
      { path: 'domains/:slug', element: <DomainDetailPage /> },
      { path: 'domains/:slug/skills/:skillSlug', element: <SkillDetailPage /> },
      { path: 'pricing', element: <PricingPage /> },
      { path: 'faq', element: <FaqPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'careers', element: <CareersPage /> },
      { path: 'privacy', element: <LegalPage kind="privacy" /> },
      { path: 'terms', element: <LegalPage kind="terms" /> },
      { path: 'refund', element: <LegalPage kind="refund" /> },

      // Marketplace
      { path: 'modules', element: <ModulesPage /> },
      { path: 'modules/:slug', element: <ModuleDetailPage /> },

      // Auth
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'reset-password', element: <ResetPasswordPage /> },
      { path: 'verify-email', element: <VerifyEmailPage /> },

      // Protected: checkout, payments, dashboard
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'checkout', element: <CheckoutPage /> },
          { path: 'payment/success', element: <PaymentSuccessPage /> },
          { path: 'payment/failure', element: <PaymentFailurePage /> },
          {
            path: 'dashboard',
            element: <DashboardLayout />,
            children: [
              { index: true, element: <DashboardHome /> },
              { path: 'purchases', element: <MyPurchasesPage /> },
              { path: 'orders', element: <OrdersPage /> },
              { path: 'profile', element: <ProfilePage /> },
            ],
          },
        ],
      },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
