#!/usr/bin/env node
// Build src/data/proof-matrix.json from the private vault.
//
//   node tools/proof-matrix.mjs
//
// PRIVACY: vault/ is gitignored and stays local. This generator is the only
// bridge from it to the public site, so it is deliberately narrow:
//
//   1. It reads ONLY the three project directories below. Every private note
//      lives outside them, so it cannot be read even by accident. (This file
//      is published; it deliberately does not enumerate what those notes are.)
//   2. It reads ONLY the whitelisted frontmatter fields. Note bodies are never
//      opened, so an aside inside a note can never reach the web.
//
// Widening either list is a privacy decision. Do not do it casually.

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const VAULT = join(ROOT, 'vault');
const OUT = join(ROOT, 'src', 'data', 'proof-matrix.json');

const DIRS = ['03 Projects', '02 Ventures', '07 Agent skills'];

// Projects the site does not show a card for. Listing them as proof would put
// names on the page that lead nowhere. They stay in the vault and on nothing
// public. Keep this in step with src/data/projects.ts.
const NOT_PUBLISHED = new Set(['MyselfKart', 'Mean Reversion']);

// Vault note name -> the name the website uses. The vault is the system of
// record and its titles are for filing; the site has its own copy. Aliasing
// here keeps one source of truth, so pages can join on the label instead of
// each carrying its own private translation table.
// Keep in step with src/data/projects.ts.
const SITE_NAME = {
  'Pexu AI product': 'Pexu AI',
  'FreeFlix OmniFlix': 'FreeFlix \u00B7 OmniFlix',
};
const publicName = (n) => SITE_NAME[n] ?? n;
const FIELDS = ['tech', 'chains', 'proof', 'period', 'role'];

// Excluded from the PUBLIC proof matrix. The vault still records all of these
// per project; this list only controls what the website argues.
//
// Three reasons something is here:
//   generic    - carries no signal on its own
//   sub-dep    - an implementation detail of something already listed
//                (pydantic and uvicorn come with FastAPI; viem with the SDKs)
//   off-pitch  - real skills, but they argue "full-stack generalist" and the
//                positioning is AI x Blockchain architecture. Frontend and
//                database rows crowded out LangGraph, MCP and agentic RAG.
//
// Removing a name from this list puts it back on the site immediately.
const NOISE = new Set([
  'monorepo', 'app-specific chain', 'npm', 'stack', 'web2', 'web3',   // generic
  'pydantic', 'uvicorn', 'viem',                                      // sub-dep
  'next.js', 'react', 'tailwind css', 'postgresql', 'supabase',       // off-pitch
].map((s) => s.toLowerCase()));
// Minimum projects before a technology earns a row.
const MIN = 2;

// Signature technologies bypass MIN. Every agent technology here appears in
// exactly one project, so the threshold alone deleted the entire AI half of
// the argument and left a pure blockchain list. Depth in a defining technology
// is worth more than breadth in a common one, and this is the positioning:
// AI x Blockchain, not full-stack.
const SIGNATURE = new Set([
  'langgraph', 'langchain', 'agentic rag', 'goat sdk',
  'mcp tool integration', 'azure openai', 'privy', 'envio', 'move', 'cosmwasm',
].map((s) => s.toLowerCase()));

const projects = [];
for (const dir of DIRS) {
  for (const file of readdirSync(join(VAULT, dir))) {
    if (!file.endsWith('.md')) continue;
    const name = file.slice(0, -3);
    if (name === dir) continue; // folder index note
    if (NOT_PUBLISHED.has(name)) continue;
    const fm = readFileSync(join(VAULT, dir, file), 'utf8').match(/^---\n([\s\S]*?)\n---/);
    if (!fm) continue;
    const rec = { name: publicName(name) };
    for (const f of FIELDS) {
      const list = fm[1].match(new RegExp(`^${f}:\\s*\\[(.*)\\]\\s*$`, 'm'));
      const scalar = fm[1].match(new RegExp(`^${f}:\\s*(.+)$`, 'm'));
      if (list) rec[f] = list[1].split(',').map((s) => s.trim()).filter(Boolean);
      else if (scalar && !scalar[1].startsWith('[')) rec[f] = scalar[1].trim();
    }
    projects.push(rec);
  }
}

const yearOf = (p) => {
  const m = String(p.period ?? '').match(/(\d{4})/);
  return m ? Number(m[1]) : null;
};


// Four categories, so the section reads as an argument rather than a list.
// Each technology belongs to exactly one, so nothing is double counted.
//   ai         - agent frameworks, retrieval, model integration
//   blockchain - protocol-level tooling, standards, contract infrastructure
//   language   - what the code is actually written in, contract languages included
//   (chains come from the separate chains: property)
const CATEGORY = {
  ai: ['langgraph', 'langchain', 'agentic rag', 'goat sdk', 'mcp tool integration',
       'azure openai', 'llm integration', 'crewai', 'eliza', 'rag'],
  blockchain: ['hardhat', 'openzeppelin', 'openzeppelin upgradeable', 'beacon proxies',
       'erc721', 'erc20', 'cosmos sdk', 'tendermint', 'envio', 'privy', 'ibc',
       'vetokens', 'dao governance', 'bonding curves', 'staking', 'vesting',
       'aptos framework', 'aptos token objects', 'app-specific chain', 'validator operations',
       'bdjuno', 'big dipper', 'node ops', 'cosmjs', 'foundry cast', 'defillama api',
       'on-chain rpc sampling', '@bento.fun/sdk', 'web3.py', 'akash network'],
  language: ['typescript', 'python', 'go', 'solidity', 'rust', 'move', 'cosmwasm',
       'fastapi', 'node.js'],
};
const categoryOf = (tech) => {
  const t = tech.toLowerCase();
  for (const [k, list] of Object.entries(CATEGORY)) if (list.includes(t)) return k;
  return null;   // anything unmapped is dropped from the public section
};

const build = (key) => {
  const map = new Map();
  for (const p of projects) {
    for (const t of p[key] ?? []) {
      if (NOISE.has(t.toLowerCase())) continue;
      if (!map.has(t)) map.set(t, []);
      map.get(t).push({ name: p.name, year: yearOf(p), proof: p.proof ?? null });
    }
  }
  return [...map.entries()]
    .filter(([tech, ps]) => ps.length >= MIN || SIGNATURE.has(tech.toLowerCase()))
    .map(([tech, ps]) => {
      const years = ps.map((p) => p.year).filter(Boolean);
      return {
        tech,
        count: ps.length,
        since: years.length ? Math.min(...years) : null,
        projects: ps.sort((a, b) => (b.year ?? 0) - (a.year ?? 0)),
      };
    })
    .sort((a, b) => {
      const sa = SIGNATURE.has(a.tech.toLowerCase()) ? 0 : 1;
      const sb = SIGNATURE.has(b.tech.toLowerCase()) ? 0 : 1;
      return sa - sb || b.count - a.count || a.tech.localeCompare(b.tech);
    });
};

const tech = build('tech');
const chains = build('chains');

const LABEL = { ai: 'AI & agents', blockchain: 'Blockchain', language: 'Languages' };
const categories = ['ai', 'blockchain', 'language'].map((key) => {
  const rows = tech.filter((r) => categoryOf(r.tech) === key);
  const names = new Set();
  for (const r of rows) for (const p of r.projects) names.add(p.name);
  const years = rows.flatMap((r) => r.projects.map((p) => p.year)).filter(Boolean);
  return {
    key,
    label: LABEL[key],
    tech: rows.map((r) => r.tech),
    projects: [...names].sort(),
    since: years.length ? Math.min(...years) : null,
  };
});

// ---------- proof graph ----------
// Nodes and edges for the public proof graph. This opens NO new source: every
// node and edge is derived from the same `projects` records and the same
// whitelisted fields already published above. Project names, years and proof
// links are public already, via categories[] and chains[]. `role` is parsed by
// FIELDS but is deliberately never emitted -- not here, not anywhere.
//
// Only technologies that clear the MIN/SIGNATURE filter AND carry a category
// are drawn, so the graph shows exactly the argument the Proof section makes.
// A project left with no surviving edge is dropped rather than floated as an
// orphan node.
const graphTech = tech.filter((r) => categoryOf(r.tech));

const nodes = new Map();
const edges = [];
const seen = new Set();

const link = (project, id) => {
  const pid = `p:${project.name}`;
  if (!nodes.has(pid)) {
    nodes.set(pid, {
      id: pid,
      kind: 'project',
      label: project.name,
      year: project.year,
      proof: project.proof,
    });
  }
  const key = `${pid}>${id}`;
  if (seen.has(key)) return;
  seen.add(key);
  edges.push({ s: pid, t: id });
};

for (const r of graphTech) {
  const id = `t:${r.tech}`;
  nodes.set(id, {
    id,
    kind: 'tech',
    label: r.tech,
    cat: categoryOf(r.tech),
    count: r.count,
    since: r.since,
    signature: SIGNATURE.has(r.tech.toLowerCase()),
  });
  for (const p of r.projects) link(p, id);
}

for (const r of chains) {
  const id = `c:${r.tech}`;
  nodes.set(id, {
    id,
    kind: 'chain',
    label: r.tech,
    count: r.count,
    since: r.since,
  });
  for (const p of r.projects) link(p, id);
}

const graph = { nodes: [...nodes.values()], edges };

const out = {
  generated: new Date().toISOString().slice(0, 10),
  projectCount: projects.length,
  categories,
  chains,
  graph,
  unmapped: tech.filter((r) => !categoryOf(r.tech)).map((r) => r.tech),
};
writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n');
console.log(`wrote src/data/proof-matrix.json — ${projects.length} projects`);
for (const c of categories) console.log(`  ${c.label}: ${c.tech.length} tech, ${c.projects.length} projects`);
console.log(`  Chains: ${chains.length}`);
const drawn = graph.nodes.filter((n) => n.kind === 'project').length;
console.log(`  Graph: ${graph.nodes.length} nodes, ${graph.edges.length} edges (${drawn}/${projects.length} projects drawn)`);
if (out.unmapped.length) console.log(`  UNMAPPED (dropped): ${out.unmapped.join(', ')}`);
