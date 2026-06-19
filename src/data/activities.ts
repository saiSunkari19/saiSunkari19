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
  'The same endurance and consistency I bring to code, just away from the screen. Most recently, the Cult Distance Challenge 2026.';

export const activities: Activity[] = [
  {
    title: 'Finisher Medal',
    badge: 'MEDAL',
    meta: '4K FINISHER',
    desc: 'I earned the finisher medal and certificate for completing the Cult Distance Challenge 2026 at Cult Pearl, Hyderabad. Few things feel better than that last lap.',
    image: medal,
    alt: 'Receiving the finisher medal and certificate at the Cult Distance Challenge 2026',
  },
  {
    title: 'Five mornings, ~10 km',
    badge: 'SCORECARD',
    meta: 'CULT DISTANCE · 2026',
    desc: 'Five early sessions, 7 to 8 AM at Cult Pearl: 96, 94, 95, 95 and 85 laps of the 22 m pool, about 10.1 km logged across the challenge.',
    image: scorecard,
    alt: 'Cult Distance Challenge 2026 scorecard listing the five swim sessions',
  },
];
