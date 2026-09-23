/**
 * Bundle entry for design-sync.
 *
 * This repo is a Vite site, not a published component library, so there is no
 * dist/ entry to point the converter at. This barrel is that entry: it names
 * exactly the components being synced, and the RouterShell the previews wrap
 * them in.
 *
 * SocialIcons is absent - it exports an icon map, not a component. Logo is
 * absent too: it renders <img src="/images/main-logo.png">, an app-served
 * path that does not exist in a design project, so its card would be a
 * broken image. CurriculumBits exports five small badge components rather
 * than one, so they are named individually.
 */
export { Badge } from '@/components/ui/Badge';
export { Button } from '@/components/ui/Button';
export { Card } from '@/components/ui/Card';
export { Container } from '@/components/ui/Container';
export { Modal } from '@/components/ui/Modal';
export { Section, SectionHead } from '@/components/ui/Section';
export { TextField } from '@/components/ui/TextField';

export { PageHero } from '@/components/marketing/PageHero';
export { IndividualOffer, StarterPackCard } from '@/components/marketing/IndividualOffer';
export { CorporateEnquiryForm } from '@/components/marketing/CorporateEnquiryForm';
export { DomainCard } from '@/components/marketing/DomainCard';

export {
  ToolBadge,
  LabTypeBadge,
  DifficultyDots,
  LabMixBar,
  StatChip,
} from '@/components/curriculum/CurriculumBits';

export { Reveal } from '@/components/motion/Reveal';

export { RouterShell } from './router';
