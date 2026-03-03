// Cursor glow - only on devices with hover capability
    const glow = document.getElementById('cursorGlow');
    if (glow && window.matchMedia('(hover: hover)').matches) {
      document.addEventListener('mousemove', e => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
      });
    }

    function setLang(lang) {
      document.documentElement.setAttribute('data-lang', lang);
      document.documentElement.setAttribute('lang', lang === 'jp' ? 'ja' : 'en');
      localStorage.setItem('portfolio-lang', lang);
      document.querySelectorAll('.lang-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.lang === lang);
      });
    }
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });


    // THEME LOGIC
    const themeDots = document.querySelectorAll('.theme-dot');
    function setTheme(theme) {
      if (theme === 'stark') {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', theme);
      }
      localStorage.setItem('portfolio-theme', theme);
      themeDots.forEach(d => d.classList.toggle('active', d.dataset.theme === theme));
    }

    // Allow touch events on mobile to register as clicks correctly even during hover transition
    themeDots.forEach(dot => {
      dot.addEventListener('pointerdown', (e) => {
        // Jika diklik tapi posisinya sedang 0 width (karena glitch reflow CSS),
        // tangkap eventnya.
        setTheme(dot.dataset.theme);
        dot.blur();
      });
      // Kita juga pasang onclick biasa sebagai fallback desktop
      dot.addEventListener('click', (e) => {
        setTheme(dot.dataset.theme);
        dot.blur();
      });
    });

    // Restore saved preferences (Set Frieren target as initial default if undefined)
    const savedTheme = localStorage.getItem('portfolio-theme') || 'frieren';
    const savedLang = localStorage.getItem('portfolio-lang');
    if (savedTheme) setTheme(savedTheme);

    // Check active nav logic

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-item');

    function updateActiveNav() {
      const scrollBottom = window.innerHeight + window.scrollY;
      const docHeight = document.documentElement.scrollHeight;

      // If near bottom of page, activate last nav item
      if (docHeight - scrollBottom < 100) {
        const lastSection = sections[sections.length - 1];
        navLinks.forEach(n => {
          n.classList.toggle('active', n.getAttribute('href') === '#' + lastSection.id);
        });
        return;
      }

      // Find current section based on scroll position
      let current = '';

      // We check from bottom to top so the lowest visible section takes precedence
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const rect = section.getBoundingClientRect();

        // Element is active if its top is above the middle of the screen
        // or its top is within the viewport (like when scrolling up)
        if (rect.top <= window.innerHeight * 0.5) {
          current = section.id;
          break;
        }
      }
      if (!current && sections.length) current = sections[0].id;
      navLinks.forEach(n => {
        n.classList.toggle('active', n.getAttribute('href') === '#' + current);
      });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();