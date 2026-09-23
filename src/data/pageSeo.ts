/**
 * Search titles and descriptions, kept in one file so copy can be revised
 * without touching page components.
 *
 * Titles are written WITHOUT the brand: <Seo> appends " — Semicon Labs", so a
 * title here should stay under ~45 characters or Google truncates the result.
 * Descriptions sit between 130 and 155 characters for the same reason.
 *
 * Every claim here is checked against what the site actually sells. Nothing
 * mentions a free tier, a money-back guarantee, or Analog Layout as available,
 * because none of those exist.
 */

export interface PageSeo {
  title: string;
  description: string;
}

/** Static marketing routes, keyed by path. */
export const pageSeo: Record<string, PageSeo> = {
  '/': {
    title: 'VLSI Cloud Labs for Physical Design & DV',
    description:
      'Solve real Physical Design and Design Verification projects on Cadence, Synopsys and Siemens tools in your browser. Start with 10 lab hours at ₹499.',
  },
  '/pricing': {
    title: 'VLSI Training and Lab Pricing from ₹499',
    description:
      '₹499 VLSI Launch Pad gets you 10 cloud lab hours on Cadence, Synopsys and Siemens tools. Individual hour packs, Teams from ₹12,000 per session.',
  },
  '/domains': {
    title: 'VLSI Domains: Physical Design & Verification',
    description:
      'Physical Design and Design Verification labs are open now. Analog Layout coming soon. Practice real VLSI scenarios on Cadence, Synopsys and Siemens tools.',
  },
  '/who-we-serve': {
    title: 'VLSI Plans for Freshers, Teams & Corporates',
    description:
      'New to VLSI? Start with the ₹499 Launch Pad and 10 cloud lab hours. Or pick an individual, team or corporate plan for Physical Design and Verification.',
  },
  '/competencies': {
    title: 'VLSI Modules: Physical Design & Verification',
    description:
      'Search every module across Physical Design and Design Verification - Setup Closure, DRC Debug, Coverage Closure - and practice each in cloud VLSI labs.',
  },
  '/about': {
    title: 'About - VLSI Labs Built by Chip Engineers',
    description:
      'Semicon Labs is built by engineers from NVIDIA, Apple, Synopsys, Intel and AMD. Learn VLSI by solving real chip development problems, not lectures.',
  },
  '/faq': {
    title: 'VLSI Labs FAQ - Tools, Plans, Certificates',
    description:
      'Answers on running Cadence, Synopsys and Siemens tools in the browser, how Skills and Modules lead to a certificate, and what each plan covers.',
  },
  '/contact': {
    title: 'Contact Us - VLSI Lab and Team Enquiries',
    description:
      "Enquire about cloud VLSI labs, Physical Design and Design Verification plans, or team licences. Tell us your requirement and we'll reply with pricing.",
  },
  '/careers': {
    title: 'Careers - Remote VLSI and Product Roles',
    description:
      "We're hiring remote, full-time engineers across curriculum and product - Physical Design and Design Verification content, React and Node. See open roles.",
  },
};

/** Audience pages, keyed by the slug in /who-we-serve/:audience. */
export const audienceSeo: Record<string, PageSeo> = {
  'launch-pad': {
    title: 'VLSI Launch Pad - 10 Lab Hours for ₹499',
    description:
      'For ECE and EEE graduates new to VLSI: ₹499 gets 10 hours of cloud lab time on Cadence, Synopsys and Siemens tools, plus lifetime PD and DV content.',
  },
  individuals: {
    title: 'VLSI Trained Fresher? Get Interview-Ready',
    description:
      'You learned VLSI but interviews test what you can do. Practise on broken designs with real Cadence, Synopsys and Siemens tools - from Rs 499.',
  },
  teams: {
    title: 'VLSI Training for Teams - Cloud EDA Labs',
    description:
      'Train your team on browser-based Cadence, Synopsys and Siemens labs. Team plans start at ₹12,000 per session, minimum 2 sessions, shared progress.',
  },
  corporates: {
    title: 'Corporate VLSI Training - Cloud EDA Labs',
    description:
      'Give your engineers browser-based VLSI labs on real Cadence, Synopsys and Siemens tools - no license servers. 10+ licenses, admin roles, usage reporting.',
  },
};

/** Domain pages, keyed by the slug in /domains/:slug. */
export const domainSeo: Record<string, PageSeo> = {
  'physical-design': {
    title: 'VLSI Physical Design Course in Cloud Labs',
    description:
      'Practice synthesis, floorplanning, place and route, CTS, STA and physical verification on real EDA tools in your browser. 14 skill tracks, 107+ scenarios.',
  },
  'design-verification': {
    title: 'VLSI Design Verification Course - UVM Labs',
    description:
      'Debug regressions, close coverage and write UVM testbenches on 770+ real scenarios in cloud labs with industry EDA tools. 12 skill tracks, 41 modules.',
  },
  'analog-layout': {
    title: 'Analog Layout VLSI Labs - Coming Soon',
    description:
      'Analog Layout is not open yet. It will cover custom layout, device matching, parasitics and DRC/LVS signoff. Physical Design and DV labs are live now.',
  },
};
