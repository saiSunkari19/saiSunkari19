#!/usr/bin/env node
// Local-only browser view of vault/. Zero new deps: uses micromark + gfm
// already present in node_modules.
//
//   node tools/vault-view.mjs          build + serve on http://localhost:4321
//   node tools/vault-view.mjs --build  build only
//
// Output goes to .vault-site/ which is gitignored. This repo is PUBLIC —
// never deploy this output anywhere.

import { readdirSync, statSync, readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join, relative, dirname, basename } from 'node:path';
import { createServer } from 'node:http';
import { micromark } from 'micromark';
import { gfm, gfmHtml } from 'micromark-extension-gfm';

const ROOT = new URL('..', import.meta.url).pathname;
const VAULT = join(ROOT, 'vault');
const OUT = join(ROOT, '.vault-site');
const PORT = 4321;

const slug = (name) => name.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase();

// ---------- collect notes ----------
function walk(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith('.')) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, acc);
    else if (entry.endsWith('.md')) acc.push(full);
  }
  return acc;
}

const files = walk(VAULT);
const notes = files.map((file) => {
  const raw = readFileSync(file, 'utf8');
  const name = basename(file, '.md');
  const fm = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  return {
    file,
    name,
    folder: relative(VAULT, dirname(file)) || '/',
    props: fm ? fm[1] : '',
    body: fm ? raw.slice(fm[0].length) : raw,
    href: slug(name) + '.html',
  };
});
const byName = new Map(notes.map((n) => [n.name, n]));

// ---------- markdown pipeline ----------
const CALLOUT = /^((?:>[^\n]*\n?)+)/gm;

function renderCallouts(md, holes) {
  return md.replace(CALLOUT, (block) => {
    const lines = block.trimEnd().split('\n').map((l) => l.replace(/^>\s?/, ''));
    const head = lines[0].match(/^\[!(\w+)\]([+-]?)\s*(.*)$/);
    if (!head) return block;
    const [, kind, , title] = head;
    const inner = toHtml(lines.slice(1).join('\n'), holes);
    const label = title || kind[0].toUpperCase() + kind.slice(1);
    const html =
      `<div class="callout callout-${kind.toLowerCase()}">` +
      `<div class="callout-title">${label}</div>${inner}</div>`;
    holes.push(html);
    return `\n%%HOLE${holes.length - 1}%%\n`;
  });
}

function toHtml(md, holes) {
  let src = renderCallouts(md, holes);
  // wikilinks: [[Note|Alias]] and [[Note]]
  src = src.replace(/\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|([^\]]+))?\]\]/g, (m, target, alias) => {
    const t = target.trim();
    const text = (alias || t).trim();
    const hit = byName.get(t);
    return hit
      ? `[${text}](${hit.href})`
      : `<span class="broken">${text}</span>`;
  });
  let html = micromark(src, {
    allowDangerousHtml: true,
    extensions: [gfm()],
    htmlExtensions: [gfmHtml()],
  });
  return html
    .replace(/<p>\s*%%HOLE(\d+)%%\s*<\/p>/g, (m, i) => holes[Number(i)])
    .replace(/%%HOLE(\d+)%%/g, (m, i) => holes[Number(i)]);
}

// ---------- backlinks ----------
const backlinks = new Map(notes.map((n) => [n.name, []]));
for (const n of notes) {
  for (const m of n.body.matchAll(/\[\[([^\]|#]+)/g)) {
    const t = m[1].trim();
    if (byName.has(t) && t !== n.name) {
      const list = backlinks.get(t);
      if (!list.includes(n.name)) list.push(n.name);
    }
  }
}

// ---------- page shell ----------
const folders = [...new Set(notes.map((n) => n.folder))].sort();
function sidebar(current) {
  return folders
    .map((f) => {
      const items = notes
        .filter((n) => n.folder === f)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(
          (n) =>
            `<li><a class="${n.name === current ? 'here' : ''}" href="${n.href}">${n.name}</a></li>`
        )
        .join('');
      return `<div class="grp"><div class="grp-h">${f === '/' ? 'Root' : f}</div><ul>${items}</ul></div>`;
    })
    .join('');
}

function propsTable(props) {
  if (!props.trim()) return '';
  const rows = props
    .split('\n')
    .filter((l) => l.includes(':'))
    .map((l) => {
      const i = l.indexOf(':');
      const k = l.slice(0, i).trim();
      const v = l.slice(i + 1).trim();
      const vals = v.startsWith('[')
        ? v.slice(1, -1).split(',').filter((s) => s.trim())
            .map((s) => `<span class="pill pill-${s.trim()}">${s.trim()}</span>`).join(' ')
        : `<span class="pv">${v}</span>`;
      return `<div class="prow"><span class="pk">${k}</span>${vals || '<span class="pv empty">empty</span>'}</div>`;
    })
    .join('');
  return `<div class="props">${rows}</div>`;
}

function page(note) {
  const holes = [];
  const body = toHtml(note.body, holes);
  const back = backlinks.get(note.name) || [];
  const backHtml = back.length
    ? `<div class="backlinks"><h3>Linked from</h3><ul>${back
        .sort()
        .map((b) => `<li><a href="${byName.get(b).href}">${b}</a></li>`)
        .join('')}</ul></div>`
    : '';
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${note.name}</title><link rel="stylesheet" href="vault.css"></head><body>
<aside><div class="brand">Vault<span>local only</span></div>
<input id="q" placeholder="Filter notes…" autocomplete="off">
<nav>${sidebar(note.name)}</nav></aside>
<main><article>${propsTable(note.props)}${body}${backHtml}</article></main>
<script>
const q=document.getElementById('q');
q.addEventListener('input',()=>{const v=q.value.toLowerCase();
document.querySelectorAll('nav li').forEach(li=>{li.style.display=li.textContent.toLowerCase().includes(v)?'':'none';});
document.querySelectorAll('.grp').forEach(g=>{const any=[...g.querySelectorAll('li')].some(li=>li.style.display!=='none');g.style.display=any?'':'none';});});
</script></body></html>`;
}

// ---------- build ----------
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
for (const n of notes) writeFileSync(join(OUT, n.href), page(n));
const home = byName.get('Home');
if (home) writeFileSync(join(OUT, 'index.html'), page(home));
writeFileSync(join(OUT, 'vault.css'), CSS());
console.log(`built ${notes.length} notes -> .vault-site/`);

if (process.argv.includes('--build')) process.exit(0);

createServer((req, res) => {
  const name = decodeURIComponent(req.url.split('?')[0]).replace(/^\//, '') || 'index.html';
  try {
    const buf = readFileSync(join(OUT, name));
    res.writeHead(200, {
      'Content-Type': name.endsWith('.css') ? 'text/css' : 'text/html; charset=utf-8',
    });
    res.end(buf);
  } catch {
    res.writeHead(404).end('not found');
  }
}).listen(PORT, '127.0.0.1', () =>
  console.log(`serving http://localhost:${PORT}  (ctrl-c to stop)`)
);

function CSS() {
  return `
:root{--ink:#1a1a17;--soft:#5c5a50;--paper:#fbfaf6;--raise:#f2f0e8;--rule:#ddd8c8;--accent:#1f3aff;--gold:#8a5a2b;--good:#2f6b3a;--bad:#a33b2f;
--serif:"Iowan Old Style",Palatino,Georgia,serif;--sans:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;--mono:ui-monospace,"SF Mono",Menlo,monospace;}
@media(prefers-color-scheme:dark){:root{--ink:#ece8dc;--soft:#a8a394;--paper:#17160f;--raise:#201e15;--rule:#3a3626;--accent:#8fa2ff;--gold:#d8a45f;--good:#6fbf7a;--bad:#e28073;}}
*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font-family:var(--serif);display:flex;min-height:100vh}
aside{width:270px;flex:none;border-right:1px solid var(--rule);padding:1.2rem 1rem;font-family:var(--sans);font-size:.82rem;overflow-y:auto;height:100vh;position:sticky;top:0;background:var(--raise)}
.brand{font-weight:700;font-size:1rem;margin-bottom:.9rem;display:flex;flex-direction:column}
.brand span{font-weight:400;font-size:.68rem;color:var(--bad);letter-spacing:.06em;text-transform:uppercase}
#q{width:100%;padding:.45em .6em;margin-bottom:1rem;border:1px solid var(--rule);border-radius:6px;background:var(--paper);color:var(--ink);font-family:var(--sans);font-size:.82rem}
.grp-h{text-transform:uppercase;letter-spacing:.07em;font-size:.66rem;color:var(--soft);margin:.9rem 0 .3rem}
nav ul{list-style:none;margin:0;padding:0}nav li a{display:block;padding:.22em .45em;border-radius:5px;color:var(--ink);text-decoration:none;line-height:1.35}
nav li a:hover{background:var(--paper)}nav li a.here{background:var(--accent);color:#fff}
main{flex:1;display:flex;justify-content:center;padding:3rem 2rem 6rem;overflow-x:hidden}
article{max-width:40em;width:100%;font-size:18px;line-height:1.6}
h1{font-size:1.9rem;margin:.2em 0 .6em;line-height:1.15}h2{font-size:1.25rem;margin-top:1.9em;border-top:1px solid var(--rule);padding-top:.9em}h3{font-size:1rem;margin-top:1.4em}
a{color:var(--accent)}.broken{color:var(--bad);border-bottom:1px dotted var(--bad)}
code{font-family:var(--mono);font-size:.84em;background:var(--raise);padding:.1em .35em;border-radius:3px}
pre{background:var(--raise);border:1px solid var(--rule);border-radius:8px;padding:1em;overflow-x:auto}pre code{background:none;padding:0}
table{border-collapse:collapse;width:100%;font-size:.86em;display:block;overflow-x:auto}th,td{border:1px solid var(--rule);padding:.45em .7em;text-align:left}th{background:var(--raise)}
blockquote{margin:1.1em 0;padding:.1em 1.1em;border-left:3px solid var(--gold);color:var(--soft);font-style:italic}
.props{display:flex;flex-wrap:wrap;gap:.4rem 1.1rem;font-family:var(--sans);font-size:.75rem;background:var(--raise);border:1px solid var(--rule);border-radius:8px;padding:.7em .9em;margin-bottom:2rem}
.prow{display:flex;align-items:center;gap:.4em}.pk{color:var(--soft);text-transform:uppercase;letter-spacing:.05em;font-size:.68rem}
.pv{font-family:var(--mono)}.pv.empty{color:var(--bad);font-style:italic}
.pill{font-family:var(--mono);font-size:.7rem;padding:.12em .5em;border-radius:99px;border:1px solid var(--rule)}
.pill-resume{background:#2f6b3a22;border-color:var(--good);color:var(--good)}
.pill-profile{background:#1f3aff22;border-color:var(--accent);color:var(--accent)}
.pill-evidence{background:#8a5a2b22;border-color:var(--gold);color:var(--gold)}
.callout{border:1px solid var(--rule);border-left:4px solid var(--gold);border-radius:8px;padding:.8em 1.1em;margin:1.3em 0;background:var(--raise);font-size:.94em}
.callout-title{font-family:var(--sans);font-weight:700;font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;margin-bottom:.35em;color:var(--gold)}
.callout p:first-of-type{margin-top:0}.callout p:last-child{margin-bottom:0}
.callout-bug,.callout-warning,.callout-danger{border-left-color:var(--bad)}
.callout-bug .callout-title,.callout-warning .callout-title,.callout-danger .callout-title{color:var(--bad)}
.callout-tip,.callout-success{border-left-color:var(--good)}.callout-tip .callout-title,.callout-success .callout-title{color:var(--good)}
.callout-info,.callout-note,.callout-todo{border-left-color:var(--accent)}.callout-info .callout-title,.callout-note .callout-title,.callout-todo .callout-title{color:var(--accent)}
.backlinks{margin-top:3rem;padding-top:1.2rem;border-top:1px solid var(--rule);font-family:var(--sans);font-size:.84rem}
.backlinks h3{margin:0 0 .5em;font-size:.7rem;text-transform:uppercase;letter-spacing:.07em;color:var(--soft)}
.backlinks ul{margin:0;padding-left:1.1em}
@media(max-width:820px){body{flex-direction:column}aside{width:100%;height:auto;position:static}main{padding:2rem 1.2rem 4rem}}
`;
}
