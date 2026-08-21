#!/usr/bin/env node
// Regenerate vault/Tech index.md from the tech:/chains: frontmatter.
// Never hand-edit that note; run this instead:  node tools/tech-index.mjs
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const VAULT = join(ROOT, 'vault');

const notes = [];
for (const dir of ['03 Projects', '02 Ventures', '07 Agent skills']) {
  for (const f of readdirSync(join(VAULT, dir))) {
    if (!f.endsWith('.md') || f.slice(0, -3) === dir) continue;
    const raw = readFileSync(join(VAULT, dir, f), 'utf8');
    const fm = raw.match(/^---\n([\s\S]*?)\n---/);
    if (!fm) continue;
    const get = (k) => {
      const m = fm[1].match(new RegExp(`^${k}:\\s*\\[(.*)\\]\\s*$`, 'm'));
      return m ? m[1].split(',').map((s) => s.trim()).filter(Boolean) : [];
    };
    notes.push({ name: f.slice(0, -3), tech: get('tech'), chains: get('chains'), protocols: get('protocols') });
  }
}

const index = (key) => {
  const map = new Map();
  for (const n of notes) for (const t of n[key]) {
    if (!map.has(t)) map.set(t, []);
    map.get(t).push(n.name);
  }
  return [...map.entries()].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));
};

const section = (title, rows, note) =>
  `## ${title}\n\n${note ? note + '\n\n' : ''}` +
  rows.map(([t, ns]) => `- **${t}** (${ns.length}): ${ns.map((n) => `[[${n}]]`).join(', ')}`).join('\n') + '\n';

const tech = index('tech');
const out = `---
type: generated
generated: ${new Date().toISOString().slice(0, 10)}
---
# Tech index

Reverse lookup: a technology to the projects that prove it. **Generated, do not
hand-edit.** Run \`node tools/tech-index.mjs\` after changing any \`tech:\`,
\`chains:\` or \`protocols:\` property.

Covering ${notes.length} notes, ${tech.length} distinct technologies.
[[Interchange]] and [[Commit Blockchain]] carry no tech list by choice.

> [!tip] What this is for
> When a posting lists a must-have, find it here, open the project, take its
> proof link. That is the evidence step that decides must-have coverage, which
> is the largest single component of the score. See [[Resume]] and
> [[Career positioning]].

${section('By technology', tech)}
${section('By chain', index('chains'))}
${section('By protocol', index('protocols'))}`;

writeFileSync(join(VAULT, 'Tech index.md'), out);
console.log(`wrote vault/Tech index.md — ${notes.length} notes, ${tech.length} technologies`);
