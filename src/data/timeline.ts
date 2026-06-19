export interface Role {
  period: string;
  title: string;
  sub?: string;          // small parenthetical after the title
  body: string;
  current?: boolean;
}

export const roles: Role[] = [
  {
    period: '2026 — Present · Hyderabad',
    title: 'Independent Blockchain Architect',
    current: true,
    body: 'Architecture, advisory and fractional engineering leadership for Web3 and enterprise teams. Currently engaged with Blunova Systems (Apr 2026 —), standing up a Hyperledger Fabric network and its transaction flows. Alongside, autonomous AI-agent systems (LangGraph, CrewAI, Eliza) and A2A / MCP / Agent Commerce Protocol integrations that let agents transact on-chain — across EVM, Cosmos, Sui, Aptos and Movement.',
  },
  {
    period: '2024 — 2026',
    title: 'Blockchain Architect · Pexu.ai',
    sub: '(formerly Autonomy)',
    body: 'Owned end-to-end engineering strategy for an AI-native Web3 platform — technical roadmap, hiring and delivery across smart contracts, backend and AI-agent layers, including autonomous agent systems with on-chain execution.',
  },
  {
    period: '2020 — 2024',
    title: 'Blockchain Engineer · Autonomy',
    body: 'Built Autonomy Network — a decentralized network for creators and platforms to issue tokens and grow community ownership — shipping core Cosmos SDK modules and CosmWasm contracts. Developed Interchange, a compliance-aware decentralized exchange using Cosmos SDK and IBC.',
  },
  {
    period: '2019 — 2020 · Hyderabad',
    title: 'Senior Software Engineer · Cosmic Tech Labs',
    body: 'Led development of Cosmic Compass (CoCo), a blockchain navigator for the Cosmos ecosystem, and architected Commit Blockchain, an enterprise hub powered by Tendermint Core — including validator tooling and node-operations playbooks. Mentored engineers on Go, Tendermint internals and consensus-layer debugging.',
  },
  {
    period: '2018 — 2019 · Hyderabad',
    title: 'Software Engineer · Cosmic Tech Labs',
    body: 'Built Ethereum dApps and smart contracts in Solidity — delivering FreeFlix Media Suite (formerly OmniFlix), a decentralized content-distribution platform. Identified scalability limits in early Ethereum and led the transition to Cosmos SDK and Tendermint. Started here as an engineering intern in mid-2018.',
  },
];
