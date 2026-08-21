export interface Venture {
  year: string;
  name: string;
  role: 'FOUNDER' | 'CO-FOUNDER';
  blurb: string;
  link: { href: string; label: string };
}

export const ventures: Venture[] = [
  {
    year: '2026',
    name: 'MyselfKart',
    role: 'CO-FOUNDER',
    blurb: 'Multi-tenant e-commerce SaaS built with Medusa + Postgres.',
    link: { href: 'https://myselfkart.com/', label: 'Visit ↗' },
  },
  {
    year: '2026',
    name: 'TaruLease',
    role: 'FOUNDER',
    blurb: 'Corporate gifting built on fresh fruit hampers, sourced straight from the farmer orchards we lease trees from.',
    link: { href: 'https://tarulease.in/', label: 'Visit ↗' },
  },
  {
    year: '2025',
    name: 'Golden Triangle MF',
    role: 'FOUNDER',
    blurb: 'Mutual-fund analytics that give everyday investors real screening and portfolio insight.',
    link: { href: 'https://mf.prithvidev.in/', label: 'Visit ↗' },
  },
  {
    year: '2020',
    name: 'PrithviDevs',
    role: 'CO-FOUNDER',
    blurb: 'AI-powered decentralized apps, validator services and developer tooling, built with people I love working with.',
    link: { href: 'https://github.com/PrithviDevs', label: 'GitHub ↗' },
  },
];
