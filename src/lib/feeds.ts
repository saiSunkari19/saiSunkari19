import type { Post, Source } from '../data/posts';

export interface FeedOptions {
  /** Drop retweets ("RT by @…" / "RT @…"). Default: true for X. */
  excludeRetweets?: boolean;
  /** Drop replies (text starts with "@handle"). Default: true for X. */
  excludeReplies?: boolean;
  /** Drop items shorter than this many chars (after stripping URLs). */
  minLength?: number;
  /** Only keep posts authored by this handle (matches <dc:creator>). */
  onlyAuthor?: string;
}

/**
 * Fetch + parse an RSS 2.0 feed at BUILD time and map it to Post[].
 * Works for Medium (`medium.com/feed/@handle`) and rss.app X/Twitter
 * feeds alike. Any failure resolves to [] so the page still renders.
 */
export async function fetchFeed(url: string, source: Source, opts: FeedOptions = {}): Promise<Post[]> {
  if (!url) return [];
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'astro-build' } });
    if (!res.ok) {
      console.warn(`[feeds] ${url} returned ${res.status} — skipping.`);
      return [];
    }
    return parseFeed(await res.text(), source, opts);
  } catch (err) {
    console.warn(`[feeds] could not fetch ${url}:`, (err as Error).message);
    return [];
  }
}

/** Medium convenience wrapper. */
export function fetchMediumPosts(handle: string): Promise<Post[]> {
  if (!handle) return Promise.resolve([]);
  return fetchFeed(`https://medium.com/feed/@${handle.replace(/^@/, '')}`, 'medium');
}

function parseFeed(xml: string, source: Source, opts: FeedOptions): Post[] {
  const items = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];
  const out: Post[] = [];

  for (const item of items) {
    const link = tag(item, 'link');
    const rawTitle = tag(item, 'title');
    if (!link || !rawTitle) continue;

    const creator = tag(item, 'dc:creator');
    if (opts.onlyAuthor && creator && creator.replace(/^@/, '').toLowerCase() !== opts.onlyAuthor.replace(/^@/, '').toLowerCase()) {
      continue;
    }

    // Tweet titles can carry one or more "RT by @x:" prefixes.
    const isRetweet = /^\s*RT\s+(by\s+)?@/i.test(rawTitle);
    if (opts.excludeRetweets && isRetweet) continue;

    const pub = tag(item, 'pubDate');
    const bodyHtml = tag(item, 'content:encoded') || tag(item, 'description') || '';

    if (source === 'medium') {
      const text = stripHtml(bodyHtml);
      out.push({
        title: decodeEntities(rawTitle),
        url: link.split('?')[0],
        source,
        date: toISO(pub),
        excerpt: truncate(text, 180),
        readMins: readMins(text),
      });
      continue;
    }

    // X / Twitter: the <title> IS the tweet text. Clean it up.
    const text = stripHtml(decodeEntities(rawTitle).replace(/^\s*(RT\s+by\s+@\w+:\s*)+/i, ''));
    const noUrls = text.replace(/https?:\/\/\S+/g, '').replace(/\s+/g, ' ').trim();
    if (opts.excludeReplies && /^@\w+/.test(noUrls)) continue;
    if (opts.minLength && noUrls.length < opts.minLength) continue;

    out.push({
      title: truncate(text, 90),
      url: link.split('?')[0],
      source,
      date: toISO(pub),
      excerpt: text.length > 90 ? truncate(text, 220) : '',
    });
  }

  return out;
}

function tag(block: string, name: string): string {
  const re = new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'i');
  const m = block.match(re);
  if (!m) return '';
  return m[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim();
}

function stripHtml(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function truncate(s: string, n: number): string {
  if (s.length <= n) return s;
  return s.slice(0, n).replace(/\s+\S*$/, '') + '…';
}

function toISO(pub: string): string {
  const t = pub ? Date.parse(pub) : NaN;
  return Number.isNaN(t) ? new Date(0).toISOString() : new Date(t).toISOString();
}

function readMins(text: string): number {
  return Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 200));
}
