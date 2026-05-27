// ── Typewriter (home) ──
function initTypewriter() {
  const typedEl = document.getElementById('typed');
  if (!typedEl) return;

  const words = ['Etudiant Dev', 'Futur Developpeur', 'BTS SIO SLAM'];
  let wi = 0;
  let ci = 0;
  let deleting = false;

  function type() {
    const w = words[wi];
    typedEl.textContent = deleting ? w.slice(0, --ci) : w.slice(0, ++ci);

    if (!deleting && ci === w.length) {
      deleting = true;
      setTimeout(type, 1700);
      return;
    }

    if (deleting && ci === 0) {
      deleting = false;
      wi = (wi + 1) % words.length;
    }

    setTimeout(type, deleting ? 52 : 82);
  }

  type();
}

// ── Reveal au scroll avec effet stagger ──
function initScrollReveal() {
  const selectors = [
    '.label',
    '.page-title',
    '.page-sub',
    '.hero h1',
    '.hero p',
    '.hero-btns',
    '.card',
    '.slam-item',
    '.section-block',
    '.timeline-item',
    '.skill-item',
    '.projet-card',
    '.stage-card',
    '.veille-card',
    '.contact-link',
    'footer'
  ];

  const targets = document.querySelectorAll(selectors.join(','));
  targets.forEach((el, i) => {
    el.classList.add('js-reveal');
    el.style.transitionDelay = `${(i % 6) * 70}ms`;
  });

  if (!('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
  );

  targets.forEach(el => observer.observe(el));
}

// ── Effet magnetique sur boutons et liens nav ──
function initMagneticHover() {
  const magneticTargets = document.querySelectorAll('.nav-inner a');

  magneticTargets.forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      const tx = x * 9;
      const ty = y * 7;
      el.style.transform = `translate(${tx}px, ${ty}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
}

// ── Navbar scroll state + progress line ──
function initNavScrollEffects() {
  const body = document.body;

  const onScroll = () => {
    const scrollTop = window.scrollY;
    body.classList.toggle('scrolled', scrollTop > 24);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ── Timeline formation (profil) au scroll ──
function initFormationTimeline() {
  const section = document.querySelector('.formation-timeline');
  if (!section) return;

  if (!('IntersectionObserver' in window)) {
    section.classList.add('timeline-in');
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        section.classList.add('timeline-in');
        observer.unobserve(section);
      });
    },
    { threshold: 0.35 }
  );

  observer.observe(section);
}

// ── Bouton de formulaire (fallback visuel) ──
function initContactButtonFeedback() {
  const sendBtn = document.getElementById('sendBtn');
  if (!sendBtn) return;

  sendBtn.addEventListener('click', function () {
    this.textContent = 'Envoye !';
    this.style.background = 'var(--accent2)';
    setTimeout(() => {
      this.textContent = 'Envoyer';
      this.style.background = '';
    }, 2600);
  });
}

// ── Barres de progression compétences ──
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-bar-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        fill.style.width = fill.dataset.width + '%';
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(fill => observer.observe(fill));
}

initTypewriter();
initScrollReveal();
initMagneticHover();
initNavScrollEffects();
initFormationTimeline();
initContactButtonFeedback();
initSkillBars();
