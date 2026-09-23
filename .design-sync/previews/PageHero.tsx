import { PageHero, Button } from '@semiconlabs/web';

export const AudiencePage = () => (
  <PageHero
    eyebrow="1 engineer"
    title={<>Individuals</>}
    lede="VLSI Trained Freshers preparing for a first semiconductor role, and working engineers going deeper."
    crumbs={[{ name: 'Home', to: '/' }, { name: 'Who We Serve', to: '/who-we-serve' }, { name: 'Individuals' }]}
  />
);

export const DomainPage = () => (
  <PageHero
    eyebrow="synthesis · pnr · cts · sta · pv"
    title={<>Physical <span className="text-gradient">Design</span></>}
    lede="Floorplan, place and route, and timing closure on the tools the industry actually runs."
    crumbs={[{ name: 'Home', to: '/' }, { name: 'Domains', to: '/domains' }, { name: 'Physical Design' }]}
  >
    <Button arrow className="mt-2">Explore the labs</Button>
  </PageHero>
);
