import type { ImageMetadata } from 'astro';

import shotTarulease from '../assets/shot-tarulease.png';
import shotGoldentriangle from '../assets/shot-goldentriangle.png';

export type Category = 'web3' | 'web2';

/** Mirrors the resume's three project sections. Keep them in sync. */
export type Group = 'oss' | 'work' | 'independent';

export const GROUP_LABEL: Record<Group, string> = {
  oss: 'Open source & agent tooling',
  work: 'Selected work',
  independent: 'Independent products',
};

export interface Project {
  name: string;
  cat: Category;
  group: Group;
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

export const projectStats = { total: 19, web3: 15, web2: 4 };

export const projects: Project[] = [
  {
    name: 'Bento Skills',
    group: 'oss',
    cat: 'web3',
    meta: 'OPEN SOURCE · AGENT SKILL · 2026',
    blurb: 'Agent skills that scaffold a Bento prediction-market front end from real, tested files instead of freshly generated code: wallet sign-in, funding, market creation, live odds and betting. Testnet is the default, and mainnet needs an explicit opt-in because creating a market submits an on-chain transaction from the user\'s wallet.',
    link: { href: 'https://github.com/saiSunkari19/bento-skills', label: 'GitHub ↗' },
  },
  {
    name: 'DeFi Yield Scout',
    group: 'oss',
    cat: 'web3',
    meta: 'OPEN SOURCE · AGENT SKILL · 2026',
    blurb: 'An agent skill that checks whether a DeFi yield is real before recommending it. It works across Pendle, Morpho, Euler, Curve LlamaLend and DefiLlama-indexed protocols, disqualifies opportunities on measured evidence before ranking whatever survives, and reports returns per day net of slippage, fees and gas.',
    link: { href: 'https://github.com/saiSunkari19/skills/tree/main/skills/defi/defi-yield-scout', label: 'GitHub ↗' },
  },
  {
    name: 'GitMate',
    group: 'work',
    cat: 'web3',
    meta: 'AI AGENT · DEV TOOLING · 2025',
    blurb: 'A crypto-native AI agent for blockchain developers, built as founding engineer. It answers questions across Solidity, Vyper, Move, Cairo and Rust, generates contracts and catches bugs in real time across EVM, Cosmos SDK and Solana, and ships a REST/GraphQL API so it can be dropped into an IDE or a protocol\'s own docs.',
    link: { href: 'https://docs.gitmate.ai/', label: 'Docs ↗' },
  },
  {
    name: 'Epoch',
    group: 'work',
    cat: 'web3',
    meta: 'AI AGENT · ETHEREX · 2025',
    blurb: 'An autonomous DeFi agent for Etherex (Linea): a multi-agent system that rebalances a portfolio by opening, adjusting and closing concentrated-liquidity positions at a chosen risk level. Built end to end (FastAPI backend, Next.js front end), then kept in testing rather than shipped after the returns failed to clear costs.',
  },
  {
    name: 'Blay',
    group: 'work',
    cat: 'web3',
    meta: 'AI TRADING AGENT · BITLAYER · 2025',
    blurb: 'An AI trading agent on Bitlayer (Bitcoin L2): live price tracking, auto-swaps at chain speed and AI insights from chat, backed by a delegated smart wallet, a $BLAY rewards economy and a strategy marketplace.',
    link: { href: 'https://x.com/BlayAgent', label: 'X ↗' },
  },
  {
    name: 'DegentsAI',
    group: 'work',
    cat: 'web3',
    meta: 'AI AGENTS · 2024',
    blurb: 'Building the internet of agents: the multi-rail distribution engine and economic layer behind the agent economy on Linea.',
    logo: '/logos/logo-degents.jpg',
    link: { href: 'https://x.com/degents_ai', label: 'X ↗' },
  },
  {
    name: 'Pexu AI',
    group: 'work',
    cat: 'web3',
    meta: 'DECENTRALIZED AI · 2024',
    blurb: 'The decentralized AI hub for AI models, creators and IP owners.',
    logo: '/logos/logo-pexu.jpg',
    link: { href: 'https://x.com/pexuai', label: 'X ↗' },
  },
  {
    name: 'PrithviDevs',
    group: 'work',
    cat: 'web3',
    meta: 'VALIDATOR & TOOLING · 2020',
    blurb: 'Validator services and Cosmos developer tooling across Sentinel, Comdex, Ki, Passage3d, OmniFlix, Persistence and SGE: node operations, genesis and network repositories, BDJuno and Big Dipper explorer deployments, and an OmniFlix chain parser.',
    link: { href: 'https://github.com/PrithviDevs', label: 'GitHub ↗' },
  },
  {
    name: 'Autonomy Network',
    group: 'work',
    cat: 'web3',
    meta: 'COSMOS SDK · 2020',
    blurb: 'Decentralized creator-economy network with token-issuance modules and community governance.',
    logo: '/logos/logo-autonomy.jpg',
    link: { href: 'https://github.com/AutonomyNetwork', label: 'GitHub ↗' },
  },
  {
    name: 'Autonomy SDK',
    group: 'oss',
    cat: 'web3',
    meta: 'OPEN SOURCE · COSMOS · NPM',
    blurb: 'The TypeScript SDK for Autonomy Network (@autonomysdk/ts-client): typed queries and transactions for the issuance, liquidity and NFT modules, built on CosmJS and published on npm.',
    link: { href: 'https://www.npmjs.com/package/@autonomysdk/ts-client', label: 'npm ↗' },
  },
  {
    name: 'Interchange DEX',
    group: 'work',
    cat: 'web3',
    meta: 'COSMOS SDK · IBC · 2021',
    blurb: 'Decentralized exchange for digital assets with regulatory-compliance hooks.',
    link: { href: 'https://github.com/AutonomyNetwork', label: 'GitHub ↗' },
  },
  {
    name: 'FreeFlix · OmniFlix',
    group: 'work',
    cat: 'web3',
    meta: 'SOLIDITY → COSMOS · 2018',
    blurb: 'Decentralized content-distribution & storytelling platform. Best Custom Zone, Game of Zones 2021.',
    award: true,
    link: { href: 'https://github.com/OmniFlix', label: 'GitHub ↗' },
  },
  {
    name: 'Cosmic Compass',
    group: 'work',
    cat: 'web3',
    meta: 'EXPLORER · 2019',
    blurb: 'A Cosmos ecosystem navigator that helps developers and investors track chain activity, validators and token flows at a glance.',
    logo: '/logos/logo-cosmic.jpg',
    link: { href: 'https://github.com/CosmicCompass', label: 'GitHub ↗' },
  },
  {
    name: 'Commit Blockchain',
    group: 'work',
    cat: 'web3',
    meta: 'TENDERMINT CORE · 2019',
    blurb: 'Enterprise-grade app-chain with validator tooling and node-operations playbooks.',
    link: { href: 'https://github.com/saiSunkari19', label: 'GitHub ↗' },
  },
  {
    name: 'Injective Relayer API',
    group: 'work',
    cat: 'web3',
    meta: 'INJECTIVE PROTOCOL · 2021',
    blurb: 'Standard relayer implementation enabling order-routing and off-chain order books.',
    link: { href: 'https://github.com/saiSunkari19', label: 'GitHub ↗' },
  },
  {
    name: 'AEO Blog Writer',
    group: 'oss',
    cat: 'web2',
    meta: 'OPEN SOURCE · AGENT SKILL · 2026',
    blurb: 'An agent skill for writing that AI assistants will quote. It enforces an answer-first structure, demands citations and honest trade-offs, and holds a defined house voice so the output does not read like generated copy. Everything on the writing page runs through it.',
    link: { href: 'https://github.com/saiSunkari19/skills/tree/main/skills/content/aeo-blog-writer', label: 'GitHub ↗' },
  },
  {
    name: 'TaruLease',
    group: 'independent',
    cat: 'web2',
    meta: 'CORPORATE GIFTING · 2026',
    blurb: 'Corporate gift hampers of fresh fruit, sourced direct from orchards with a 48-hour replacement guarantee.',
    cover: shotTarulease,
    link: { href: 'https://tarulease.in/', label: 'Live ↗' },
  },
  {
    name: 'Golden Triangle MF',
    group: 'independent',
    cat: 'web2',
    meta: 'FINTECH · 2025',
    blurb: 'Mutual-fund analytics that give everyday investors real screening and portfolio insight.',
    cover: shotGoldentriangle,
    link: { href: 'https://mf.prithvidev.in/', label: 'Live ↗' },
  },
  {
    name: 'Sepa Screener',
    group: 'independent',
    cat: 'web2',
    meta: 'SCREENER · 2024',
    blurb: 'Equity screener built on the SEPA (Specific Entry Point Analysis) methodology.',
    link: { href: 'https://sepa.prithvidev.in/screener', label: 'Live ↗' },
  },
];
