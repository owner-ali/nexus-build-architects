/* ============================================================
   NEXUS BUILD ARCHITECTS — SCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     LOADING SCREEN
  --------------------------------------------------------- */
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 2000);

  /* ---------------------------------------------------------
     HERO REVEAL ON LOAD
  --------------------------------------------------------- */
  const heroReveals = document.querySelectorAll('.hero-content .reveal');
  setTimeout(() => {
    heroReveals.forEach(el => el.classList.add('in-view'));
  }, 100);

  setTimeout(() => {
    const heroImg = document.querySelector('.hero-bg img');
    if (heroImg) heroImg.style.transform = 'scale(1)';
  }, 200);

  /* ---------------------------------------------------------
     SCROLL PROGRESS BAR
  --------------------------------------------------------- */
  const scrollProgress = document.getElementById('scrollProgress');

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';
  }

  /* ---------------------------------------------------------
     NAVBAR SCROLL STATE
  --------------------------------------------------------- */
  const navbar = document.getElementById('navbar');

  function updateNavbar() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  /* ---------------------------------------------------------
     BACK TO TOP BUTTON
  --------------------------------------------------------- */
  const backToTop = document.getElementById('backToTop');

  function updateBackToTop() {
    if (window.scrollY > 600) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------------------------------------------------
     COMBINED SCROLL HANDLER
  --------------------------------------------------------- */
  window.addEventListener('scroll', () => {
    updateScrollProgress();
    updateNavbar();
    updateBackToTop();
  });

  updateScrollProgress();
  updateNavbar();
  updateBackToTop();

  /* ---------------------------------------------------------
     MOBILE MENU TOGGLE
  --------------------------------------------------------- */
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const icon = menuToggle.querySelector('i');
    if (mobileMenu.classList.contains('open')) {
      icon.className = 'fa-solid fa-xmark';
    } else {
      icon.className = 'fa-solid fa-bars';
    }
  });

  document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuToggle.querySelector('i').className = 'fa-solid fa-bars';
    });
  });

  /* ---------------------------------------------------------
     THEME TOGGLE (Dark / Light Mode)
  --------------------------------------------------------- */
  const themeToggle = document.getElementById('themeToggle');
  const themeToggleMobile = document.getElementById('themeToggleMobile');
  const body = document.body;

  function setTheme(theme) {
    if (theme === 'light') {
      body.classList.remove('dark');
      body.classList.add('light');
      document.querySelectorAll('#themeToggle i, #themeToggleMobile i').forEach(i => {
        i.className = 'fa-solid fa-moon';
      });
      const span = themeToggleMobile.querySelector('span');
      if (span) span.textContent = 'Dark Mode';
    } else {
      body.classList.remove('light');
      body.classList.add('dark');
      document.querySelectorAll('#themeToggle i, #themeToggleMobile i').forEach(i => {
        i.className = 'fa-solid fa-sun';
      });
      const span = themeToggleMobile.querySelector('span');
      if (span) span.textContent = 'Light Mode';
    }
  }

  function toggleTheme() {
    const isLight = body.classList.contains('light');
    setTheme(isLight ? 'dark' : 'light');
  }

  themeToggle.addEventListener('click', toggleTheme);
  themeToggleMobile.addEventListener('click', toggleTheme);

  /* ---------------------------------------------------------
     SCROLL REVEAL ANIMATIONS (IntersectionObserver)
  --------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-scale');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  revealEls.forEach(el => {
    if (!el.closest('.hero-content')) {
      revealObserver.observe(el);
    }
  });

  /* ---------------------------------------------------------
     STAGGERED REVEAL FOR GRID ITEMS
  --------------------------------------------------------- */
  function applyStagger(selector, parentSelector) {
    document.querySelectorAll(parentSelector).forEach(parent => {
      const items = parent.querySelectorAll(selector);
      items.forEach((item, i) => {
        item.style.transitionDelay = `${(i % 4) * 0.1}s`;
      });
    });
  }

  applyStagger('.expertise-card', '.expertise-grid');
  applyStagger('.project-card', '.projects-grid');
  applyStagger('.why-card', '.why-grid');
  applyStagger('.team-card', '.team-grid');
  applyStagger('.testimonial-card', '.testimonials-grid');
  applyStagger('.gallery-item', '.gallery-grid');
  applyStagger('.process-step', '.process-list');

  /* ---------------------------------------------------------
     ANIMATED COUNTERS (STATS)
  --------------------------------------------------------- */
  const stats = document.querySelectorAll('.stat');

  function animateCount(el) {
    const target = parseInt(el.dataset.target, 10);
    const countEl = el.querySelector('.count');
    const duration = 1800;
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      countEl.textContent = current;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        countEl.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  stats.forEach(stat => statsObserver.observe(stat));

  /* ---------------------------------------------------------
     CONTACT FORM SUBMISSION
  --------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    contactForm.style.display = 'none';
    formSuccess.classList.add('visible');
  });

  /* ---------------------------------------------------------
     SMOOTH SCROLL FOR NAV LINKS (close mobile menu on click)
  --------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ---------------------------------------------------------
     FOOTER YEAR
  --------------------------------------------------------- */
  document.getElementById('year').textContent = new Date().getFullYear();

});
