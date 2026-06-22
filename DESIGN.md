---
name: Sai Krishna Sunkari — Portfolio
description: Two-pillar brief — content prioritised for conversion beside a pinned action rail. Calm, precise, technical.
colors:
  paper: "#f6f5f1"
  paper-2: "#efeee9"
  ink: "#111110"
  ink-2: "#2a2a26"
  muted: "#565651"
  faint: "#6f6f69"
  hair: "#d6d5cf"
  hair-2: "#c4c3bc"
  leader: "#c9c8c1"
  accent: "#1f3aff"
  accent-ink: "#1730d8"
typography:
  statement:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(22px, 4vw, 32px)"
    fontWeight: 700
    lineHeight: 1.26
    letterSpacing: "-0.012em"
  group-title:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.14em"
  body:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "14.5px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  row:
    fontFamily: "Spline Sans Mono, ui-monospace, monospace"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Spline Sans Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.04em"
rounded:
  none: "0"
  sm: "2px"
spacing:
  maxw: "760px"
  indent: "44px"
components:
  topline:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.muted}"
  row:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  avail-cta:
    textColor: "{colors.ink}"
---

# Design System: Sai Krishna Sunkari — Portfolio

## 1. Overview

**Creative North Star: "The Two-Pillar Brief"**

The home page is a two-column working document on cool low-chroma paper: a readable **content column** beside a **pinned right rail** that holds the one action (Book a call), a live-availability dot, the latest writing, and contact. The content is sequenced strictly by conversion priority (see STRATEGY.md): a 3-second **orient** (identity + statement + a focused credibility strip), a compact **"What I do"** offer band, then the two heavy **proof pillars — Trajectory and Selected Work** — that carry the page, with lighter supporting sections (ventures, capabilities, recognition) below. Proof leads because a technical buyer trusts artifacts, not adjectives.

The personality is **calm, precise, technical**. Authority comes from hierarchy, alignment, hairline rules, tabular figures, and restraint — not decoration. It deliberately rejects the saturated "dark editorial-typographic" portfolio lane (no serif display, no near-black canvas, no mono-eyebrow-on-every-section) and the SaaS hero-metric template. One electric-blue accent does all the signalling, and only on actionable/live things.

**Key Characteristics:**
- Two-column shell (~1180px): a readable content column + a sticky right rail that keeps the booking action and writing always in view. Collapses to a single column with a sticky bottom CTA bar on mobile.
- Strict priority hierarchy: orient → offer → **two proof pillars (Trajectory, Selected Work)** → lighter sections. The pillars get larger heads, a 2px ink rule, and more space; everything else is visibly subordinate.
- A focused credibility strip — the four metrics (7 yrs · 10+ chains · 13+ systems · 2 awards) bold in ink, ecosystems quiet beneath.
- Two voices only: Hanken Grotesk (grotesque, headings/body) + Spline Sans Mono (labels, tags, years, meta). Tabular figures.
- One signal accent (electric blue) at ≤10% of any screen; filled-accent CTA button with `--on-accent` text.
- Flat — no shadows, hairline rules + whitespace only. Mostly static; content is always visible (no scroll-reveal gating).

## 2. Colors

A near-white paper palette with near-black ink and a single electric-blue accent. Cool and low-chroma, deliberately NOT warm cream.

### Primary
- **Electric Blue** (#1f3aff): the only accent. The availability dot, links, active nav, value/CTA hovers, prose links. **Accent-Ink** (#1730d8) is the hover/active deepening. Held to ≤8% of any screen.

### Neutral — Surface
- **Paper** (#f6f5f1): the body canvas — cool, chroma near 0 (not cream/sand).
- **Paper-2** (#efeee9): faint recessed fill (code blocks, pre).

### Neutral — Ink (text ramp)
- **Ink** (#111110): primary text, labels, values, headings.
- **Ink-2** (#2a2a26): long-form prose body.
- **Muted** (#565651): secondary text, descriptions (AA: 6.8:1).
- **Faint** (#6f6f69): meta, section markers, least-important text (AA: 4.6:1 — the floor; do not go lighter for text).

### Neutral — Lines
- **Hair** (#d6d5cf) / **Hair-2** (#c4c3bc): hairline rules between rows and groups.
- **Leader** (#c9c8c1): the dotted dot-leader colour (decorative line, not text).

### Named Rules
**The One Signal Rule.** Electric blue is the only saturated colour and only ever marks something actionable or live (availability, links, hovers). If it's blue, you can click it or it's a status. Nothing decorative is blue.

**The Paper-Not-Cream Rule.** The surface is cool low-chroma paper (#f6f5f1), never a warm sand/cream tint. Warmth is not the brand; precision is.

## 3. Typography

**Heading / Body Font:** Hanken Grotesk (with system-ui fallback)
**Mono Font:** Spline Sans Mono (with ui-monospace fallback)

**Character:** A confident neutral grotesque paired with a precise monospace. The mono carries the *index* — every row, label, value, and dot-leader — so figures align and the page reads as a structured document. The grotesque carries the few real headings (the title statement, group titles). Deliberately off the saturated editorial-serif lane.

### Hierarchy
- **Statement** (Hanken Grotesk 700, clamp(22px, 4vw, 32px), lh 1.26, -0.012em): the single title statement under the header. One per page.
- **Group title** (Hanken Grotesk 700, 13px, uppercase, 0.14em tracking): §-group headings.
- **Body / standfirst** (Hanken Grotesk 400, 15–17px, lh 1.6): the standfirst and annotated-entry prose. Cap prose at ~60–68ch.
- **Row** (Spline Sans Mono 400/500, 14px, tabular-nums): index rows — label, desc, value.
- **Label / marker** (Spline Sans Mono, 11px, 0.04em): §NN markers, group notes, meta.

### Named Rules
**The Tabular Rule.** All figures use tabular numerals and right-align in the value column, so years and counts stack into a clean vertical edge. Misaligned figures break the whole conceit.

**The Two-Voice Rule.** Grotesque for headings and prose, mono for the index. Never a third family; never a serif.

## 4. Elevation

Flat. No shadows, ever. There are no cards and no raised surfaces — the entire system is ink on paper. Separation comes only from **hairline rules** (1px) between rows and groups, and from whitespace. Depth is hierarchy and alignment, not z-axis.

### Named Rules
**The Ink-On-Paper Rule.** If something needs a shadow or a box to feel separate, it's wrong — use a hairline rule, a §-marker, or space instead.

## 5. Components

### Shell (home)
Two columns inside a ~1180px wrap: a content column with a right hairline, beside a **sticky right rail** (~290px). The rail pins to `top:0` and stays in view while reading. On ≤860px it stacks above the content as a 2-up grid, and a fixed bottom **mobile CTA bar** appears.

### Right rail
The one action and the supporting links: a filled-accent **Book a call** button, a live "Available" status (pulsing blue dot, reduced-motion safe), a **Latest writing** list (recent post titles + year) with an "All writing →" link, and contact. Pinned; never scrolls away.

### Orient + credibility strip
A mono identity topline, the statement `h1` (Hanken 700), a value-prop paragraph, then the **credibility strip**: the four metrics bold in ink (`--ink`), ecosystems in mono faint beneath, separated by a hairline above.

### Offer band ("What I do")
A distinct 3-up grid (no icons): each column a 26×2px ink rule, a bold title, one sentence. Hairline under the band. Visibly lighter than the proof pillars — it's orientation, not proof.

### Proof pillar (Trajectory, Selected Work)
The two dominant blocks. Larger section head (clamp ~1.5–1.95rem, 700) over a **2px ink rule**, generous vertical space. Trajectory = annotated entries (role + company + years + paragraph). Selected Work = 3 featured entries (name + mono tag + blurb, ★ award line) then a compact "more systems" list. Featured rows slide on hover via `transform` (never animate layout).

### Lighter sections
Ventures, Capabilities, Recognition & Education: small section heads (`.light`), compact rows / mono runs, clearly subordinate to the pillars.

### Topline header (Writing pages)
On `/writing` only: identity line left; Writing link + "AVAILABLE — BOOK A CALL" (blue dot) right; one hairline under. Persistent across the reading pages.

### Links / CTA
Body links are ink that shift to **electric blue** on hover. The Book-a-call CTA is the one filled-accent button (white `--on-accent` text); everything else is a text link. Focus-visible: 2px blue outline.

### Colophon
Footer: copyright + location in mono faint, hairline above.

## 6. Do's and Don'ts

### Do:
- **Do** sequence the home content by conversion priority: orient → offer → the two proof pillars (Trajectory, Selected Work) → lighter sections. Keep the right rail pinned.
- **Do** give the two pillars dominant weight (larger heads, 2px ink rule, space) and keep supporting sections visibly lighter.
- **Do** use tabular numerals for years/figures; keep the credibility-strip metrics bold in ink.
- **Do** restrict colour to one electric blue, only on actionable/live things (≤10%).
- **Do** build separation from 1px hairlines and whitespace — never shadows or cards.
- **Do** keep text at or above #6f6f69 on paper for AA; descriptions in #565651.
- **Do** use only Hanken Grotesk + Spline Sans Mono.

### Don't:
- **Don't** reintroduce the dark editorial-typographic lane: no Fraunces/serif display, no near-black canvas, no mono eyebrow above every section.
- **Don't** add cards, hero images, or a four-big-number stat-card band — the metrics live in the inline credibility strip.
- **Don't** use a warm cream/sand background; the paper is cool and low-chroma.
- **Don't** use gradient text, glassmorphism, or a colored border-left >1px as an accent stripe.
- **Don't** introduce a third font family or any serif.
- **Don't** gate content behind scroll-reveal animation; the page is static and always visible.
- **Don't** animate layout properties (padding/width) for hover — use `transform`. Keep the rail pinned and the CTA always reachable.
