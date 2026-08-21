export const capabilities: { label: string; items: string[] }[] = [
  {
    label: 'Onchain agents',
    items: ['GOAT SDK', 'Coinbase AgentKit', 'MCP', 'A2A', 'Agent Commerce Protocol', 'agent wallets'],
  },
  {
    label: 'Agent orchestration & AI',
    items: ['LangGraph', 'LangChain', 'CrewAI', 'Eliza', 'RAG', 'agent-skill authoring', 'evaluation & guardrails', 'LLM integration (Claude · Gemini · OpenAI)'],
  },
  {
    label: 'Chains & Layer 2s',
    items: ['Ethereum', 'EVM', 'Base', 'Polygon', 'Linea', 'Arbitrum', 'Bitlayer', 'Cosmos SDK', 'Aptos', 'Movement', 'Hyperledger Fabric'],
  },
  {
    label: 'Smart contracts & DeFi',
    items: ['Solidity', 'Rust', 'Move', 'CosmWasm', 'tokenomics', 'gauges / veTokens', 'concentrated liquidity', 'cross-chain bridges', 'IBC', 'security & audits'],
  },
  {
    label: 'Languages',
    items: ['Go', 'Solidity', 'TypeScript', 'Python', 'CosmWasm', 'Rust', 'Move'],
  },
  {
    label: 'Backend & infrastructure',
    items: ['Node.js', 'REST', 'gRPC', 'GraphQL', 'microservices', 'Tendermint', 'Docker', 'Kubernetes', 'CI/CD', 'GCP', 'Azure'],
  },
  {
    label: 'Data & security',
    items: ['PostgreSQL (RLS)', 'Redis', 'MongoDB', 'cryptography (ECDSA, ZK basics)', 'threat modeling', 'multi-tenant isolation'],
  },
  {
    label: 'Leadership',
    items: ['roadmap & delivery', 'hiring & mentoring', '0→1 architecture', 'code review', 'cross-functional delivery'],
  },
];


export const recognition: { icon: string; title: string; sub: string }[] = [
  {
    icon: '🏆',
    title: 'Best Custom Zone',
    sub: 'FreeFlix Media · Game of Zones, Cosmos Network · 2021',
  },
  {
    icon: '🚀',
    title: 'Cosmonaut Award',
    sub: 'Open Innovation · HackAtom India, Cosmos India · 2020',
  },
];

export const education = {
  degree: 'B.Tech, Computer Science & Engineering',
  detail: 'RGUKT, IIIT Basar · 2014 → 2018 · CGPA 8.1 / 10',
};
