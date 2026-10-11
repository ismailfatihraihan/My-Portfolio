const root = document.documentElement;
const store = {
  get(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  },
  set(key, value) {
    try { localStorage.setItem(key, value); } catch { /* storage unavailable */ }
  }
};

// Cursor glow - only on devices with hover capability
const glow = document.getElementById('cursorGlow');
if (glow && window.matchMedia('(hover: hover)').matches) {
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

// LANGUAGE
const META = {
  en: {
    title: 'Ismail Fatih Raihan — Developer',
    description: 'Ismail Fatih Raihan - Web Developer & Informatics Student, seeking opportunities in Japan'
  },
  jp: {
    title: 'イスマイル・ファティ・ライハン — 開発者',
    description: 'イスマイル・ファティ・ライハン - ウェブ開発者・情報工学専攻の学生。日本での就業機会を探しています。'
  }
};
const langBtns = document.querySelectorAll('.lang-btn');
const metaDesc = document.querySelector('meta[name="description"]');

const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Adds a class for `ms`, restarting the timer if it is already on. */
const timers = {};
function flash(cls, ms) {
  clearTimeout(timers[cls]);
  root.classList.add(cls);
  timers[cls] = setTimeout(() => root.classList.remove(cls), ms);
}

function setLang(lang, animate = false) {
  if (!META[lang]) lang = 'en';
  if (animate && !REDUCE) flash('lang-anim', 450);
  root.setAttribute('data-lang', lang);
  root.setAttribute('lang', lang === 'jp' ? 'ja' : 'en');
  document.title = META[lang].title;
  if (metaDesc) metaDesc.setAttribute('content', META[lang].description);
  store.set('portfolio-lang', lang);
  langBtns.forEach(b => {
    const active = b.dataset.lang === lang;
    b.classList.toggle('active', active);
    b.setAttribute('aria-pressed', String(active));
  });
}
langBtns.forEach(btn => btn.addEventListener('click', () => setLang(btn.dataset.lang, true)));

// THEME
const themeDots = document.querySelectorAll('.theme-dot');

function setTheme(theme, animate = false) {
  if (animate && !REDUCE) flash('theme-anim', 450);
  if (theme === 'stark') {
    root.removeAttribute('data-theme');
  } else {
    root.setAttribute('data-theme', theme);
  }
  store.set('portfolio-theme', theme);
  themeDots.forEach(d => {
    const active = d.dataset.theme === theme;
    d.classList.toggle('active', active);
    d.setAttribute('aria-pressed', String(active));
  });
}

// pointerdown keeps taps reliable on mobile while the dots expand on hover/focus
themeDots.forEach(dot => {
  dot.addEventListener('pointerdown', () => {
    setTheme(dot.dataset.theme, true);
    dot.blur();
  });
  // keyboard activation (Enter/Space) fires click without a pointerdown
  dot.addEventListener('click', e => {
    if (e.detail === 0) setTheme(dot.dataset.theme, true);
  });
});

// Restore saved preferences (Frieren is the default theme)
setTheme(store.get('portfolio-theme') || 'frieren');
setLang(store.get('portfolio-lang') || 'en');

// ACTIVE NAV
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-item');

function updateActiveNav() {
  const nearBottom = document.documentElement.scrollHeight - (window.innerHeight + window.scrollY) < 100;
  let current = sections[0] ? sections[0].id : '';

  if (nearBottom) {
    current = sections[sections.length - 1].id;
  } else {
    // lowest section whose top has passed the middle of the viewport wins
    for (let i = sections.length - 1; i >= 0; i--) {
      if (sections[i].getBoundingClientRect().top <= window.innerHeight * 0.5) {
        current = sections[i].id;
        break;
      }
    }
  }

  navLinks.forEach(n => {
    const active = n.getAttribute('href') === '#' + current;
    n.classList.toggle('active', active);
    if (active) n.setAttribute('aria-current', 'true');
    else n.removeAttribute('aria-current');
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

// SCROLL REVEAL + COUNT-UP
// Only runs when the head script switched `reveal-ready` on (motion allowed, IO supported).
if (root.classList.contains('reveal-ready')) {
  const targets = document.querySelectorAll('.about-text, .stat, .about-skills, .exp-item, .project-card');

  const countUp = el => {
    const end = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const start = performance.now();
    const tick = now => {
      const t = Math.min((now - start) / 900, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(end * eased).toLocaleString('en-US') + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver(entries => {
    entries.filter(e => e.isIntersecting).forEach((entry, i) => {
      const el = entry.target;
      el.style.setProperty('--rd', Math.min(i, 5) * 0.07 + 's');
      el.classList.add('is-visible');
      const num = el.querySelector('[data-count]');
      if (num) countUp(num);
      io.unobserve(el);
    });
  }, { threshold: 0.12 });

  targets.forEach(el => io.observe(el));
  window.__revealOk = true;
}
