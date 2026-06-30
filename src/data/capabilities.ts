export const capabilities: { label: string; items: string[] }[] = [
  {
    label: 'Onchain agents',
    items: ['GOAT SDK', 'Coinbase AgentKit', 'MCP', 'A2A', 'Agent Commerce Protocol'],
  },
  {
    label: 'Agent orchestration',
    items: ['LangGraph', 'LangChain', 'CrewAI', 'Eliza', 'LLM integration (Claude · Gemini · OpenAI)'],
  },
  {
    label: 'Chains',
    items: ['Ethereum', 'Cosmos SDK', 'Linea', 'Base', 'Polygon', 'Sui', 'Aptos', 'Movement', 'Hyperledger Fabric'],
  },
  {
    label: 'Languages & contracts',
    items: ['Go', 'Solidity', 'TypeScript', 'Python', 'CosmWasm', 'Rust', 'Move'],
  },
  {
    label: 'Infra & platform',
    items: ['IBC', 'Tendermint', 'Docker', 'Kubernetes'],
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
  detail: 'RGUKT Basar · 2014 → 2018 · CGPA 8.1 / 10',
};
