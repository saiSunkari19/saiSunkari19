import type { ImageMetadata } from 'astro';

import medal from '../assets/activities/cult-distance-medal.jpeg';
import scorecard from '../assets/activities/cult-distance-scorecard.jpeg';

export interface Activity {
  title: string;
  /** Outlined pill, top-left of the card. */
  badge: string;
  /** Gold mono label, top-right. */
  meta: string;
  desc: string;
  /** Imported asset (optimized by Astro), or null for a placeholder. */
  image: ImageMetadata | null;
  alt?: string;
}

export const activitiesIntro =
  'The same endurance and consistency, away from the screen — most recently the Cult Distance Challenge 2026.';

export const activities: Activity[] = [
  {
    title: 'Finisher Medal',
    badge: 'MEDAL',
    meta: '4K FINISHER',
    desc: 'Earned the finisher medal & certificate of achievement for completing the Cult Distance Challenge 2026 — Cult Pearl, Hyderabad.',
    image: medal,
    alt: 'Receiving the finisher medal and certificate at the Cult Distance Challenge 2026',
  },
  {
    title: 'Five mornings, ~10 km',
    badge: 'SCORECARD',
    meta: 'CULT DISTANCE · 2026',
    desc: 'Five 7–8 AM sessions at Cult Pearl — 96, 94, 95, 95 & 85 laps of the 22 m pool, ~10.1 km logged across the challenge.',
    image: scorecard,
    alt: 'Cult Distance Challenge 2026 scorecard listing the five swim sessions',
  },
];
