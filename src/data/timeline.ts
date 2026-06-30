export interface Role {
  period: string;
  title: string;
  sub?: string;          // small parenthetical after the title
  body: string;
  current?: boolean;
}

export const roles: Role[] = [
  {
    period: '2026 → now · Hyderabad',
    title: 'Independent AI × Blockchain Architect',
    current: true,
    body: "These days I partner with Web3 and enterprise teams as their architect, advisor and fractional engineering lead. Right now I'm with Blunova Systems (since April 2026), standing up a Hyperledger Fabric network and the transaction flows that run on it. Alongside that, I'm building autonomous AI-agent systems (LangGraph, CrewAI, Eliza) and the A2A, MCP and Agent Commerce Protocol integrations that let those agents transact on-chain across EVM, Cosmos, Sui, Aptos and Movement.",
  },
  {
    period: '2024 → 2026',
    title: 'AI × Blockchain Architect · Pexu.ai',
    sub: '(formerly Autonomy)',
    body: 'I owned the engineering strategy end to end for an AI-native Web3 platform: the technical roadmap, the hiring, and delivery across smart contracts, backend and AI-agent layers, including autonomous agents that execute on-chain.',
  },
  {
    period: '2020 → 2024',
    title: 'Blockchain Engineer · Autonomy',
    body: 'I built Autonomy Network, a decentralized network that let creators and platforms issue their own tokens and hand real ownership back to their communities, shipping the core Cosmos SDK modules and CosmWasm contracts myself. I also developed Interchange, a compliance-aware decentralized exchange on Cosmos SDK and IBC.',
  },
  {
    period: '2019 → 2020 · Hyderabad',
    title: 'Senior Software Engineer · Cosmic Tech Labs',
    body: 'I led development of Cosmic Compass (CoCo), a blockchain navigator for the Cosmos ecosystem, and architected Commit Blockchain, an enterprise hub on Tendermint Core, with the validator tooling and node-operations playbooks teams needed to run it. Some of my favourite work here was mentoring engineers through Go, Tendermint internals and the hard art of consensus-layer debugging.',
  },
  {
    period: '2018 → 2019 · Hyderabad',
    title: 'Software Engineer · Cosmic Tech Labs',
    body: 'This is where it all started. I wrote Ethereum dApps and Solidity smart contracts and shipped FreeFlix Media Suite (now OmniFlix), a decentralized content-distribution platform. When I ran into the scalability walls of early Ethereum, I made the case for Cosmos SDK and Tendermint and led the move. I joined here as an engineering intern in mid-2018.',
  },
];
