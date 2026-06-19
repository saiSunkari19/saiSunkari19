// Client-side interactions for the portfolio. Ported from the
// handoff prototype's Component logic, hardened for SSR + reduced motion.

const prefersReduced =
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

function init() {
  setupMobileNav();
  setupBackToTop();
  setupReveal();
  setupFilter();
  setupScrollDriven();
}

// ── Back-to-top (mobile) ────────────────────────────────────────
let toTopBtn: HTMLButtonElement | null = null;

function setupBackToTop() {
  toTopBtn = document.querySelector<HTMLButtonElement>('[data-to-top]');
  toTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  });
}

// ── Mobile nav drawer ───────────────────────────────────────────
function setupMobileNav() {
  const nav = document.querySelector<HTMLElement>('.nav');
  const toggle = document.querySelector<HTMLButtonElement>('.nav-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!nav || !toggle || !menu) return;

  const setOpen = (open: boolean) => {
    nav.toggleAttribute('data-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
  };

  toggle.addEventListener('click', () => setOpen(!nav.hasAttribute('data-open')));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
}

// ── Scroll reveal + count-up ────────────────────────────────────
let reveals: HTMLElement[] = [];
let counts: HTMLElement[] = [];

function setupReveal() {
  reveals = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  counts = Array.from(document.querySelectorAll<HTMLElement>('[data-count]'));

  if (prefersReduced) {
    reveals.forEach((el) => el.classList.add('is-in'));
    counts.forEach((el) => {
      el.textContent = el.getAttribute('data-count') + (el.getAttribute('data-suffix') || '');
    });
    return;
  }
  reveals.forEach((el) => {
    const d = parseFloat(el.getAttribute('data-delay') || '0');
    el.style.transitionDelay = d + 'ms';
  });
}

function revealPass() {
  if (prefersReduced) return;
  const vh = window.innerHeight;
  reveals.forEach((el) => {
    if (el.classList.contains('is-in')) return;
    if (el.getBoundingClientRect().top < vh * 0.9) el.classList.add('is-in');
  });
  counts.forEach((el) => {
    if (el.dataset.counted) return;
    if (el.getBoundingClientRect().top < vh * 0.85) {
      el.dataset.counted = '1';
      animateCount(el);
    }
  });
}

function animateCount(el: HTMLElement) {
  const target = parseFloat(el.getAttribute('data-count') || '0');
  const suf = el.getAttribute('data-suffix') || '';
  const dur = 1100;
  const t0 = performance.now();
  const step = (t: number) => {
    const p = Math.min(1, (t - t0) / dur);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * e) + suf;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// ── Work filter (All / Web3 / Web2) ─────────────────────────────
function setupFilter() {
  const pills = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-filter]'));
  const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-cat]'));
  if (!pills.length) return;

  const apply = (cat: string) => {
    pills.forEach((p) => p.setAttribute('aria-pressed', String(p.getAttribute('data-filter') === cat)));
    cards.forEach((c) => {
      const show = cat === 'all' || c.getAttribute('data-cat') === cat;
      c.style.display = show ? 'flex' : 'none';
    });
    onScroll();
  };

  pills.forEach((p) => p.addEventListener('click', () => apply(p.getAttribute('data-filter') || 'all')));
  apply('all');
}

// ── Scroll-driven: timeline fill + active nav ───────────────────
function setupScrollDriven() {
  onScroll = () => {
    revealPass();

    // back-to-top: reveal once the user is a screen or so down
    toTopBtn?.classList.toggle('is-visible', window.scrollY > 600);

    // timeline progress fill
    const fill = document.getElementById('tl-fill');
    const track = document.getElementById('tl-track');
    if (fill && track) {
      const r = track.getBoundingClientRect();
      const anchor = window.innerHeight * 0.45;
      const passed = Math.min(r.height, Math.max(0, anchor - r.top));
      fill.style.height = passed + 'px';
    }

    // active nav
    const ids = ['approach', 'trajectory', 'work', 'about'];
    let cur: string | null = null;
    ids.forEach((id) => {
      const s = document.getElementById(id);
      if (s && s.getBoundingClientRect().top <= 130) cur = id;
    });
    document.querySelectorAll<HTMLElement>('[data-nav]').forEach((a) => {
      a.style.color = a.getAttribute('data-nav') === cur ? 'var(--gold)' : '';
    });
  };

  window.addEventListener('scroll', () => onScroll(), { passive: true });
  window.addEventListener('resize', () => onScroll(), { passive: true });
  onScroll();
  requestAnimationFrame(() => onScroll());
  setTimeout(() => onScroll(), 400);
}

let onScroll: () => void = () => {};

if (document.readyState !== 'loading') init();
else document.addEventListener('DOMContentLoaded', init);
