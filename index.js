// scripts/index.js — Vanilla JS for nav, theme, scroll animations, testimonial carousel
// Save as scripts/index.js and ensure it's loaded with defer

(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));

  /* Mobile nav toggle */
  const mobileToggle = $('#mobile-toggle');
  const navLinks = $('#primary-navigation');

  mobileToggle?.addEventListener('click', () => {
    const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('open');
  });

  /* Header scroll effect */
  const header = $('#site-header');
  const hero = $('#home');
  const headerObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) header.classList.add('elevated');
      else header.classList.remove('elevated');
    });
  }, { root: null, threshold: 0, rootMargin: '-90px' });
  if (hero) headerObserver.observe(hero);

  /* Theme toggle: light <-> dark (keeps preference in localStorage) */
  const themeToggle = $('#theme-toggle');
  const root = document.documentElement;
  const THEME_KEY = 'mc_theme_v1';

  function applyTheme(t) {
    if (t === 'dark') {
      document.body.classList.add('dark');
      root.style.setProperty('--surface', '#0b1220');
      root.style.setProperty('--text', '#e6eef8');
      root.style.setProperty('--muted', '#9aa8bd');
    } else {
      document.body.classList.remove('dark');
      root.style.setProperty('--surface', '#ffffff');
      root.style.setProperty('--text', '#0f1724');
      root.style.setProperty('--muted', '#6b7280');
    }
  }
  const saved = localStorage.getItem(THEME_KEY) || 'light';
  applyTheme(saved);
  themeToggle?.addEventListener('click', () => {
    const cur = document.body.classList.contains('dark') ? 'dark' : 'light';
    const next = cur === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  });

  /* Simple fade-in on scroll using IntersectionObserver */
  const faders = $$('.fade-in') || [];
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  faders.forEach(el => obs.observe(el));

  /* Testimonials carousel (simple) */
  const slides = $$('.t-slide');
  let tIndex = 0;
  const showSlide = (i) => {
    slides.forEach(s => s.hidden = true);
    const s = slides[i];
    if (s) s.hidden = false;
  };
  showSlide(0);

  const prevBtn = $('.t-btn.prev');
  const nextBtn = $('.t-btn.next');
  prevBtn?.addEventListener('click', () => {
    tIndex = (tIndex - 1 + slides.length) % slides.length;
    showSlide(tIndex);
  });
  nextBtn?.addEventListener('click', () => {
    tIndex = (tIndex + 1) % slides.length;
    showSlide(tIndex);
  });

  /* Contact form: friendly fake submit */
  const form = $('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = "Sending...";
      setTimeout(() => {
        btn.textContent = "Sent ✓";
        btn.disabled = false;
        form.reset();
      }, 900);
    });
  }

  /* Small accessibility nicety: close mobile menu on link click */
  $$('#primary-navigation a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      mobileToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  /* Year in footer */
  const y = new Date().getFullYear();
  document.getElementById('year')?.replaceWith(document.createTextNode(String(y)));
})();
