export type LegalKind = 'privacy' | 'terms' | 'refund';

export interface LegalSection {
  heading: string;
  body: string[];
}

export interface LegalDoc {
  kind: LegalKind;
  title: string;
  description: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

const effectiveDate = 'July 1, 2026';

export const legalDocs: Record<LegalKind, LegalDoc> = {
  privacy: {
    kind: 'privacy',
    title: 'Privacy Policy',
    description: 'How Semicon Labs collects, uses, and protects your personal information.',
    updated: effectiveDate,
    intro:
      'This Privacy Policy explains what information Semicon Labs collects, why we collect it, and the choices you have. We collect the minimum necessary to run the platform and never sell your personal data.',
    sections: [
      {
        heading: '1. Information we collect',
        body: [
          'Account information you provide when you register — your name, email address, and authentication credentials (passwords are stored only as salted hashes).',
          'Learning activity such as challenges started, submissions, validation results, and progress, so we can track your competency development and improve the platform.',
          'Payment metadata processed by our payment provider (Razorpay). We do not store full card numbers on our servers.',
          'Technical data such as device, browser, and anonymized usage analytics used to keep the service secure and performant.',
        ],
      },
      {
        heading: '2. How we use information',
        body: [
          'To operate your account, deliver challenges, validate solutions, and track progress.',
          'To process payments, issue invoices, and provide receipts.',
          'To communicate service updates, security notices, and — only with your consent — product news.',
          'To detect, prevent, and respond to fraud, abuse, and security incidents.',
        ],
      },
      {
        heading: '3. Legal bases and sharing',
        body: [
          'We process data to perform our contract with you, to meet legal obligations, and for legitimate interests such as securing the platform.',
          'We share data only with processors who help us operate — including our payment provider, email delivery, and infrastructure hosting — under contractual confidentiality obligations.',
          'We do not sell your personal information.',
        ],
      },
      {
        heading: '4. Data retention and your rights',
        body: [
          'We retain account and learning data for as long as your account is active, and payment records for as long as required by law.',
          'You may request access, correction, export, or deletion of your personal data at any time by contacting us.',
          'You can close your account from your profile settings; residual backups are purged on a rolling schedule.',
        ],
      },
      {
        heading: '5. Security',
        body: [
          'We use encryption in transit, hashed credentials, rate limiting, and audit logging to protect your data. No system is perfectly secure, but we work continuously to protect your information.',
        ],
      },
      {
        heading: '6. Contact',
        body: ['Questions about this policy can be sent to hello@semiconlabs.com.'],
      },
    ],
  },
  terms: {
    kind: 'terms',
    title: 'Terms of Service',
    description: 'The terms that govern your use of the Semicon Labs platform.',
    updated: effectiveDate,
    intro:
      'These Terms of Service govern your access to and use of Semicon Labs. By creating an account or using the platform, you agree to these terms.',
    sections: [
      {
        heading: '1. Your account',
        body: [
          'You must provide accurate information and keep your credentials secure. You are responsible for activity under your account.',
          'Accounts are for individual use. You may not share access to paid content that is licensed to you personally.',
        ],
      },
      {
        heading: '2. Use of the platform',
        body: [
          'Challenges, content, validation logic, and materials are provided for your personal learning. You may not scrape, resell, or redistribute platform content.',
          'You agree not to interfere with the platform’s operation, attempt to bypass validation or access controls, or use the service unlawfully.',
        ],
      },
      {
        heading: '3. Subscriptions and payment',
        body: [
          'Paid plans are billed in advance on a recurring basis until cancelled. Founding pricing is honored for as long as your subscription remains active and uninterrupted.',
          'Payments are processed by Easebuzz. Prices are exclusive of 18% GST unless stated otherwise.',
          'You can cancel anytime from your account; access continues until the end of the current billing period.',
        ],
      },
      {
        heading: '4. Intellectual property',
        body: [
          'Semicon Labs and its licensors retain all rights to the platform, content, and brand. Your submissions remain yours, but you grant us a limited license to process them for validation and to improve the service.',
        ],
      },
      {
        heading: '5. Disclaimers and liability',
        body: [
          'The platform is provided “as is.” While our challenges are inspired by real engineering scenarios, they are educational and do not constitute professional engineering advice.',
          'To the maximum extent permitted by law, Semicon Labs is not liable for indirect or consequential damages arising from use of the service.',
        ],
      },
      {
        heading: '6. Changes and termination',
        body: [
          'We may update these terms; material changes will be communicated. We may suspend or terminate accounts that violate these terms.',
          'Questions can be sent to hello@semiconlabs.com.',
        ],
      },
    ],
  },
  refund: {
    kind: 'refund',
    title: 'Refund Policy',
    description: 'Our 7-day money-back guarantee and how refunds work at Semicon Labs.',
    updated: effectiveDate,
    intro:
      'We want you to buy with confidence. Every paid Semicon Labs plan is covered by a 7-day money-back guarantee.',
    sections: [
      {
        heading: '1. 7-day money-back guarantee',
        body: [
          'If you are not satisfied with a paid plan, you can request a full refund within 7 days of your initial purchase — no questions asked.',
          'The guarantee applies to your first payment on a plan. Renewals are covered by the cancellation terms below.',
        ],
      },
      {
        heading: '2. How to request a refund',
        body: [
          'Email hello@semiconlabs.com from the address on your account, or use the billing section of your profile. Include your order reference if you have it.',
          'Approved refunds are issued to your original payment method via Razorpay, typically within 5–10 business days depending on your bank.',
        ],
      },
      {
        heading: '3. Cancellations and renewals',
        body: [
          'You can cancel anytime from your account. Cancellation stops future renewals; you keep access until the end of the current billing period.',
          'Renewal charges are generally non-refundable once the new period begins, except where required by law. Cancel before your renewal date to avoid the next charge.',
        ],
      },
      {
        heading: '4. Exceptions',
        body: [
          'The free Starter plan involves no payment and therefore no refund.',
          'We may decline refund requests that show signs of abuse, such as repeated purchase-and-refund cycles.',
        ],
      },
    ],
  },
};
