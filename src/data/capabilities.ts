export const capabilities: { label: string; items: string[] }[] = [
  {
    label: 'Chains',
    items: ['Ethereum', 'Base', 'Polygon', 'Cosmos SDK', 'Sui', 'Aptos', 'Movement', 'Hyperledger Fabric'],
  },
  {
    label: 'Languages & contracts',
    items: ['Go', 'Solidity', 'Rust', 'Move', 'CosmWasm', 'TypeScript'],
  },
  {
    label: 'AI agents & infra',
    items: ['LangGraph', 'CrewAI', 'Eliza', 'ACP / MCP / A2A', 'IBC', 'Tendermint', 'Kubernetes'],
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
