import type { ImageMetadata } from 'astro';

import shotMyselfkart from '../assets/shot-myselfkart.png';
import shotTarulease from '../assets/shot-tarulease.png';
import shotGoldentriangle from '../assets/shot-goldentriangle.png';
import meanReversion from '../assets/mean-reversion.png';

export type Category = 'web3' | 'web2';

export interface Project {
  name: string;
  cat: Category;
  meta: string;           // mono label, top-right of card
  blurb: string;
  award?: boolean;
  /** Centered brand logo (in /public/logos). */
  logo?: string;
  /** Full-bleed cover screenshot (imported asset). */
  cover?: ImageMetadata;
  /** Object-position for the cover. */
  coverPos?: string;
  /** Link out. */
  link?: { href: string; label: string };
  /** Static, non-linking caption (used by Mean Reversion). */
  caption?: string;
}

export const projectStats = { total: 13, web3: 8, web2: 5 };

export const projects: Project[] = [
  {
    name: 'DegentsAI',
    cat: 'web3',
    meta: 'AI AGENTS · 2024',
    blurb: 'Building the internet of agents: the multi-rail distribution engine and economic layer behind the agent economy on Linea.',
    logo: '/logos/logo-degents.jpg',
    link: { href: 'https://x.com/degents_ai', label: 'X ↗' },
  },
  {
    name: 'Pexu AI',
    cat: 'web3',
    meta: 'DECENTRALIZED AI · 2024',
    blurb: 'The decentralized AI hub for AI models, creators and IP owners.',
    logo: '/logos/logo-pexu.jpg',
    link: { href: 'https://x.com/pexuai', label: 'X ↗' },
  },
  {
    name: 'Autonomy Network',
    cat: 'web3',
    meta: 'COSMOS SDK · 2020',
    blurb: 'Decentralized creator-economy network with token-issuance modules and community governance.',
    logo: '/logos/logo-autonomy.jpg',
    link: { href: 'https://github.com/AutonomyNetwork', label: 'GitHub ↗' },
  },
  {
    name: 'Interchange DEX',
    cat: 'web3',
    meta: 'COSMOS SDK · IBC · 2021',
    blurb: 'Decentralized exchange for digital assets with regulatory-compliance hooks.',
    link: { href: 'https://github.com/AutonomyNetwork', label: 'GitHub ↗' },
  },
  {
    name: 'FreeFlix · OmniFlix',
    cat: 'web3',
    meta: 'SOLIDITY → COSMOS · 2018',
    blurb: 'Decentralized content-distribution & storytelling platform. Best Custom Zone, Game of Zones 2021.',
    award: true,
    link: { href: 'https://github.com/OmniFlix', label: 'GitHub ↗' },
  },
  {
    name: 'Cosmic Compass',
    cat: 'web3',
    meta: 'EXPLORER · 2019',
    blurb: 'A Cosmos ecosystem navigator that helps developers and investors track chain activity, validators and token flows at a glance.',
    logo: '/logos/logo-cosmic.jpg',
    link: { href: 'https://github.com/CosmicCompass', label: 'GitHub ↗' },
  },
  {
    name: 'Commit Blockchain',
    cat: 'web3',
    meta: 'TENDERMINT CORE · 2019',
    blurb: 'Enterprise-grade app-chain with validator tooling and node-operations playbooks.',
    link: { href: 'https://github.com/saiSunkari19', label: 'GitHub ↗' },
  },
  {
    name: 'Injective Relayer API',
    cat: 'web3',
    meta: 'INJECTIVE PROTOCOL · 2021',
    blurb: 'Standard relayer implementation enabling order-routing and off-chain order books.',
    link: { href: 'https://github.com/saiSunkari19', label: 'GitHub ↗' },
  },
  {
    name: 'MyselfKart',
    cat: 'web2',
    meta: 'E-COMMERCE · 2026',
    blurb: 'Multi-tenant e-commerce SaaS built with Medusa + Postgres.',
    cover: shotMyselfkart,
    link: { href: 'https://myselfkart.com/', label: 'Live ↗' },
  },
  {
    name: 'TaruLease',
    cat: 'web2',
    meta: 'FULL-STACK WEB · 2026',
    blurb: 'A leasing platform that brings listings, agreements and management together in one place.',
    cover: shotTarulease,
    link: { href: 'https://tarulease.in/', label: 'Live ↗' },
  },
  {
    name: 'Golden Triangle MF',
    cat: 'web2',
    meta: 'FINTECH · 2025',
    blurb: 'Mutual-fund analytics that give everyday investors real screening and portfolio insight.',
    cover: shotGoldentriangle,
    link: { href: 'https://mf.prithvidev.in/', label: 'Live ↗' },
  },
  {
    name: 'Mean Reversion',
    cat: 'web2',
    meta: 'QUANT TOOL · 2023',
    blurb: 'A trading tool built on a mean-reversion strategy, with signals, screening and backtests in one place.',
    cover: meanReversion,
    coverPos: 'top',
    caption: 'Equity Terminal · NSE',
  },
  {
    name: 'Sepa Screener',
    cat: 'web2',
    meta: 'SCREENER · 2024',
    blurb: 'Equity screener built on the SEPA (Specific Entry Point Analysis) methodology.',
    link: { href: 'https://sepa.prithvidev.in/screener', label: 'Live ↗' },
  },
];
