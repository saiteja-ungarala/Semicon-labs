export type LegalKind = 'privacy' | 'terms' | 'refund';

export interface LegalSection {
  heading: string;
  body: string[];
  /** Rendered as a tick/bullet list rather than paragraphs. */
  list?: string[];
}

export interface LegalDoc {
  kind: LegalKind;
  title: string;
  description: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

const effectiveDate = 'August 6, 2026';

/**
 * Verbatim from the client's approved legal pack (Terms & Conditions, Privacy
 * Policy and Refund Policy). Wording is theirs — edit only from an updated
 * document, not in passing.
 */
export const legalDocs: Record<LegalKind, LegalDoc> = {
  terms: {
    kind: 'terms',
    title: 'Terms & Conditions',
    description:
      'The agreement governing your use of Semiconlabs.com and every service offered by Semicon Labs.',
    updated: effectiveDate,
    intro:
      'By accessing or using Semiconlabs.com (“Website”), you (“User”, “You”, “Your”) agree to be bound by these Terms & Conditions (“Agreement”). If you do not agree, you must discontinue use of the Website and all services offered by Semicon Labs (“Company”, “We”, “Us”, “Our”).',
    sections: [
      {
        heading: '1. Acceptance of the agreement',
        body: [
          'By accessing or using Semiconlabs.com, you agree to be bound by this Agreement. If you do not agree, you must discontinue use of the Website and all services offered by Semicon Labs.',
        ],
      },
      {
        heading: '2. User account, login credentials & security',
        body: ['You may be required to create an account to access certain services.'],
        list: [
          'Your login credentials are strictly for personal use.',
          'Sharing, transferring, or allowing others to use your account is prohibited and may result in immediate suspension.',
          'You are responsible for maintaining confidentiality of your account and all activities performed under it.',
          'Notify us immediately if you suspect unauthorized access.',
        ],
      },
      {
        heading: '3. Services offered',
        body: ['Semicon Labs provides:'],
        list: [
          'Semiconductor skill development & training (VLSI Layout, Physical Design, Design & Verification, etc.)',
          'Corporate training, assessments, and technical learning support',
          'Company information, documentation, and communication channels',
        ],
      },
      {
        heading: '',
        body: [
          'We reserve the right to modify, update, or discontinue any service at any time. All services are provided on an “as-is” and “as-available” basis.',
        ],
      },
      {
        heading: '4. License to use',
        body: [
          'We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Website for personal use and professional engagement with Semicon Labs.',
          'You may not:',
        ],
        list: [
          'Copy, distribute, or reproduce content',
          'Modify or create derivative works',
          'Use content for commercial resale',
          'Use automated tools (bots, scrapers) without permission',
        ],
      },
      {
        heading: '',
        body: ['All rights not expressly granted are reserved.'],
      },
      {
        heading: '5. Intellectual property rights',
        body: [
          'All content on Semiconlabs.com — including text, graphics, logos, documents, training material, HR templates, software, and media — is the exclusive property of Semicon Labs.',
          'You agree not to:',
        ],
        list: [
          'Reproduce or republish any content without written permission',
          'Use our trademarks, branding, or proprietary materials',
          'Upload or distribute content that infringes third-party rights',
        ],
      },
      {
        heading: '6. User responsibilities & acceptable use',
        body: ['You agree NOT to:'],
        list: [
          'Upload harmful, illegal, defamatory, or abusive content',
          'Attempt to hack, reverse engineer, or disrupt the Website',
          'Upload files containing viruses or malicious code',
          'Use the Website for spam, phishing, or fraudulent activities',
          'Misrepresent your identity or submit false information',
        ],
      },
      {
        heading: '',
        body: [
          'Violation may result in account termination and legal action. We reserve the right to report unlawful activities to authorities as permitted under the IT Act, 2000.',
        ],
      },
      {
        heading: '7. Personal information & privacy',
        body: [
          'Semicon Labs is committed to protecting your personal data in accordance with the Digital Personal Data Protection Act, 2023 (DPDP Act). How we collect, process, store and delete personal data — and the rights you hold over it — is set out in full in our Privacy Policy, linked at the foot of this page.',
        ],
      },
      {
        heading: '8. Third-party links',
        body: ['The Website may contain links to external websites. Semicon Labs:'],
        list: [
          'Does not control third-party content',
          'Is not responsible for their accuracy, policies, or practices',
          'Does not endorse external websites unless explicitly stated',
        ],
      },
      {
        heading: '',
        body: [
          'Use third-party links at your own discretion; Semicon Labs is not liable for third-party data practices.',
        ],
      },
      {
        heading: '9. Payments, subscriptions & transactions',
        body: ['For paid services (training, assessments, digital tools):'],
        list: [
          'You agree to pay applicable fees',
          'Prices may change without prior notice',
          'Taxes may apply as per Indian law',
        ],
      },
      {
        heading: '',
        body: [
          'Orders may be refused or cancelled at our discretion. Pre-purchase disclosures regarding refund eligibility will be shown before payment, as required under the Consumer Protection Act, 2019. Refund eligibility is set out in full in our Refund Policy, linked at the foot of this page.',
        ],
      },
      {
        heading: '10. Limitation of liability',
        body: ['To the extent permitted by applicable law, Semicon Labs is not liable for:'],
        list: [
          'Service interruptions, technical issues, or downtime',
          'Loss of data, profits, or business opportunities',
          'Errors, omissions, or inaccuracies in content',
          'Unauthorized access caused by your negligence',
        ],
      },
      {
        heading: '',
        body: ['Your use of the Website is at your own risk.'],
      },
      {
        heading: '11. Indemnification',
        body: [
          'You agree to indemnify and hold Semicon Labs, its employees, directors, and partners harmless from any claims, damages, losses, or legal expenses arising from:',
        ],
        list: [
          'Your misuse of the Website',
          'Violation of this Agreement',
          'Infringement of third-party rights',
        ],
      },
      {
        heading: '12. Termination of access',
        body: ['We may suspend or terminate your access immediately if:'],
        list: [
          'You violate any terms',
          'You misuse services or content',
          'You engage in fraudulent or harmful activities',
        ],
      },
      {
        heading: '',
        body: [
          'Upon termination, your license to use the Website ends immediately. You may request deletion of your personal data as per the DPDP Act.',
        ],
      },
      {
        heading: '13. Governing law & jurisdiction',
        body: [
          'This Agreement is governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana.',
        ],
      },
      {
        heading: '14. Amendments',
        body: [
          'We may update or modify these Terms & Conditions at any time. Material changes will be posted on the Website, and continued use constitutes acceptance of the updated terms.',
        ],
      },
    ],
  },

  privacy: {
    kind: 'privacy',
    title: 'Privacy Policy',
    description:
      'How Semicon Labs collects, processes and protects your personal data under the DPDP Act, 2023.',
    updated: effectiveDate,
    intro:
      'Semicon Labs is committed to protecting your personal data in accordance with the Digital Personal Data Protection Act, 2023 (DPDP Act). This policy explains what we collect, the lawful basis on which we process it, and the rights you hold over it.',
    sections: [
      {
        heading: '1. Lawful processing',
        body: [
          'Your personal data will be collected and processed only for lawful purposes such as communication, verification, training delivery, and service improvement.',
          'We do not process personal data beyond what is necessary for providing our services.',
        ],
      },
      {
        heading: '2. Consent',
        body: [
          'By using our Website and services, you provide consent for the collection and processing of your personal data.',
          'You may withdraw consent at any time by contacting us; however, withdrawal may limit your ability to use certain services.',
        ],
      },
      {
        heading: '3. Data minimization',
        body: [
          'Only essential personal data required for training, communication, verification, or support will be collected.',
        ],
      },
      {
        heading: '4. Your rights under the DPDP Act',
        body: ['You have the right to:'],
        list: [
          'Access your personal data',
          'Request correction of inaccurate data',
          'Request deletion of personal data (subject to legal and operational requirements)',
          'Withdraw consent',
          'Be informed about how your data is used',
        ],
      },
      {
        heading: '',
        body: [
          'Requests can be submitted to our designated Data Protection Officer (DPO).',
          'DPO contact details — Name: Vamsi · Email: dpo@semiconlabs.com · Address: Semicon Labs, Hyderabad, Telangana, India.',
        ],
      },
      {
        heading: '5. Data security',
        body: [
          'We implement reasonable security safeguards to protect your personal data from unauthorized access, disclosure, or misuse.',
          'In case of a data breach, we will follow DPDP Act-mandated reporting procedures.',
        ],
      },
      {
        heading: '6. No unauthorized sharing',
        body: [
          'We do not sell or share your personal data with third-party marketers.',
          'Data may be shared only with authorized service providers or if required by law.',
        ],
      },
      {
        heading: '7. Children’s data',
        body: [
          'Semicon Labs does not knowingly collect personal data from children below the age defined under the DPDP Act without parental consent.',
        ],
      },
      {
        heading: '8. Data retention',
        body: [
          'Personal data will be retained only for the duration necessary to fulfill the purpose for which it was collected or as required by law.',
        ],
      },
      {
        heading: '9. Data storage location',
        body: [
          'Your data may be stored on secure servers located in India.',
          'If data is transferred outside India, it will be done in compliance with DPDP Act requirements.',
        ],
      },
      {
        heading: '10. Third-party links',
        body: [
          'The Website may contain links to external websites. Semicon Labs does not control third-party content and is not liable for third-party data practices. Use third-party links at your own discretion.',
        ],
      },
    ],
  },

  refund: {
    kind: 'refund',
    title: 'Refund Policy',
    description: 'Refund and cancellation terms for Semicon Labs subscriptions and training programs.',
    updated: effectiveDate,
    intro:
      'Refund eligibility is disclosed before payment, as required under the Consumer Protection Act, 2019. This policy sets out when a refund is and is not issued.',
    sections: [
      {
        heading: '1. Subscription fees',
        body: [
          'Subscription fees once paid are generally non-refundable, except where legally required or explicitly stated. Refund eligibility will be clearly disclosed before payment.',
        ],
      },
      {
        heading: '2. Cancellation by user',
        body: [
          'If you cancel your subscription, access will continue until the end of the active subscription period. No refunds will be issued for early cancellation.',
        ],
      },
      {
        heading: '3. Cancellation by Semicon Labs',
        body: [
          'If Semicon Labs cancels a subscription or training program due to unforeseen circumstances, a 100% refund will be issued. Tax amounts may not be refundable as per statutory rules.',
        ],
      },
      {
        heading: '4. Training material & tool access',
        body: [
          'Training material and tool access will be provided only after full payment of the subscription fee.',
        ],
      },
      {
        heading: '5. Discounted subscriptions',
        body: ['No refunds will be provided for discounted subscriptions or promotional offers.'],
      },
      {
        heading: '6. Payment records',
        body: ['Users must retain receipts and payment records for future reference.'],
      },
    ],
  },
};

/** Short blurbs used for the cross-links at the foot of every policy page. */
export const legalBlurb: Record<LegalKind, string> = {
  terms: 'The agreement covering accounts, acceptable use, IP and liability.',
  privacy: 'What personal data we collect and your rights under the DPDP Act.',
  refund: 'When a subscription or training fee is refundable, and when it is not.',
};
