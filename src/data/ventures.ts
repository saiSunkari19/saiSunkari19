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
    blurb: 'Leasing platform — listings, agreements and management in one place.',
    link: { href: 'https://tarulease.in/', label: 'Visit ↗' },
  },
  {
    year: '2025',
    name: 'Golden Triangle MF',
    role: 'FOUNDER',
    blurb: 'Mutual-fund analytics — screening and portfolio insights for investors.',
    link: { href: 'https://mf.prithvidev.in/', label: 'Visit ↗' },
  },
  {
    year: '2020',
    name: 'PrithviDevs',
    role: 'CO-FOUNDER',
    blurb: 'AI-powered decentralized apps, validator services & developer tooling.',
    link: { href: 'https://github.com/PrithviDevs', label: 'GitHub ↗' },
  },
];
