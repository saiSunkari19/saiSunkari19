export type Source = 'medium' | 'x';

export interface Post {
  title: string;
  excerpt: string;
  url: string;
  source: Source;
  /** ISO date string (YYYY-MM-DD) or full ISO. */
  date: string;
  /** Optional minutes; shown in the meta line when present. */
  readMins?: number;
}

// ─────────────────────────────────────────────────────────────
// Medium handle (without the leading @). Posts are auto-fetched
// from the RSS feed at BUILD time and mixed into the Writing list.
// Set to '' to disable the Medium fetch entirely.
//
// X / Twitter articles are NOT fetched — you self-host them as blog
// posts via the CMS at /admin (with an "Originally posted on X" link
// back to the tweet). See src/content/blog/.
// ─────────────────────────────────────────────────────────────
export const MEDIUM_HANDLE = 'saisunkari19'; // TODO: confirm your real Medium handle
