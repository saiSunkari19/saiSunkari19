// Shared reads over the generated proof graph.
//
// src/data/proof-matrix.json is written by `node tools/proof-matrix.mjs` from
// the private vault. Everything the site knows about the projects/technology
// relation comes through here, so /proof and the project pages cannot drift
// apart or disagree about what links to what.
import proofMatrix from '../data/proof-matrix.json';

export interface GraphNode {
  id: string;
  kind: 'project' | 'tech' | 'chain';
  label: string;
  cat?: string;
  count?: number;
  since?: number | null;
  signature?: boolean;
  year?: number | null;
  proof?: string | null;
}
export interface GraphEdge { s: string; t: string }

export const graph = proofMatrix.graph as unknown as {
  nodes: GraphNode[];
  edges: GraphEdge[];
};

export const slug = (s: string) =>
  s.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase();

const byId = new Map(graph.nodes.map((n) => [n.id, n]));
export const nodeById = (id: string) => byId.get(id);

/** Project label -> its node. Labels are already site-canonical; the generator
 *  aliases the vault's filing names via SITE_NAME. */
const byProjectLabel = new Map(
  graph.nodes.filter((n) => n.kind === 'project').map((n) => [n.label, n]),
);
export const projectNode = (label: string) => byProjectLabel.get(label);

const out = new Map<string, GraphNode[]>();   // project -> tech|chain
const inn = new Map<string, GraphNode[]>();   // tech|chain -> projects
for (const e of graph.edges) {
  const p = byId.get(e.s), t = byId.get(e.t);
  if (!p || !t) continue;
  (out.get(p.id) ?? out.set(p.id, []).get(p.id)!).push(t);
  (inn.get(t.id) ?? inn.set(t.id, []).get(t.id)!).push(p);
}

const order = (a: GraphNode, b: GraphNode) =>
  a.kind.localeCompare(b.kind) || a.label.localeCompare(b.label);

/** What a project was built with, technologies then chains. */
export const stackOf = (id: string) => (out.get(id) ?? []).slice().sort(order);

/** The projects that prove a technology or chain, newest first. */
export const projectsOf = (id: string) =>
  (inn.get(id) ?? []).slice().sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || a.label.localeCompare(b.label));

/**
 * Sibling projects, ranked by how much of the stack they share. This is the
 * "related work" a visitor actually wants: not the same category, the same
 * tools.
 */
export function relatedTo(id: string, limit = 6) {
  const mine = new Set(stackOf(id).map((n) => n.id));
  const score = new Map<string, { node: GraphNode; shared: GraphNode[] }>();
  for (const t of stackOf(id)) {
    for (const p of projectsOf(t.id)) {
      if (p.id === id) continue;
      const hit = score.get(p.id) ?? { node: p, shared: [] };
      hit.shared.push(t);
      score.set(p.id, hit);
    }
  }
  return [...score.values()]
    .filter((r) => r.shared.length)
    .sort((a, b) => b.shared.length - a.shared.length || (b.node.year ?? 0) - (a.node.year ?? 0))
    .slice(0, limit)
    .map((r) => ({ ...r, shared: r.shared.filter((s) => mine.has(s.id)).sort(order) }));
}

/**
 * The local graph around one project: the project itself, everything it was
 * built with, and every sibling reachable through one of those. Two hops, which
 * is what Obsidian's local graph shows at its default depth.
 */
export function localGraph(id: string) {
  const keep = new Set<string>([id]);
  for (const t of stackOf(id)) {
    keep.add(t.id);
    for (const p of projectsOf(t.id)) keep.add(p.id);
  }
  return {
    focus: id,
    nodes: graph.nodes.filter((n) => keep.has(n.id)),
    edges: graph.edges.filter((e) => keep.has(e.s) && keep.has(e.t)),
  };
}
