/* ── Navigation ────────────────────────────────── */
(function () {
  const nav       = document.getElementById('nav');
  const hamburger = document.getElementById('navToggle');
  const mobileNav = document.getElementById('navMobile');
  const navLinks  = document.querySelectorAll('.nav__link:not(.nav__link--mobile)');
  const sections  = document.querySelectorAll('section[id]');

  // Scroll: glass intensity + active link
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav.classList.toggle('nav--scrolled', y > 60);

    sections.forEach(sec => {
      const top    = sec.offsetTop - 100;
      const bottom = top + sec.offsetHeight;
      if (y >= top && y < bottom) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav__link[href="#${sec.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { passive: true });

  // Hamburger toggle
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }
})();

/* ── Scroll Reveal ─────────────────────────────── */
(function () {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();

/* ── Terminal Typewriter ────────────────────────── */
(function () {
  const output = document.getElementById('terminalOutput');
  if (!output) return;

  const lines = [
    { text: '$ cgessence --status', cls: 'terminal__line--cmd' },
    { text: '> 그룹웨어 ............. [ONLINE]', cls: 'terminal__line--ok', delay: 380 },
    { text: '> E-Messenger ......... [ONLINE]', cls: 'terminal__line--ok', delay: 780 },
    { text: '> IT-Manager .......... [ONLINE]', cls: 'terminal__line--ok', delay: 1180 },
    { text: '> Essence AI .......... [ONLINE]', cls: 'terminal__line--ok', delay: 1580 },
    { text: '> EssenceOn AI ........ [SECURE]', cls: 'terminal__line--ok', delay: 1980 },
    { text: '> 시스템 상태: 모두 정상', cls: 'terminal__line--info', delay: 2380 },
    { text: '$ █', cls: 'terminal__line--cmd', delay: 2780, isCursor: true },
  ];

  let started = false;

  function typeChar(el, text, i, done) {
    if (i >= text.length) { if (done) done(); return; }
    el.textContent += text[i];
    setTimeout(() => typeChar(el, text, i + 1, done), 28);
  }

  function runTerminal() {
    if (started) return;
    started = true;
    output.innerHTML = '';

    lines.forEach(({ text, cls, delay, isCursor }) => {
      setTimeout(() => {
        const span = document.createElement('span');
        span.className = 'terminal__line ' + cls;
        output.appendChild(span);

        if (isCursor) {
          span.innerHTML = '$ <span class="terminal__cursor"></span>';
        } else {
          typeChar(span, text, 0);
        }
      }, delay || 0);
    });
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { runTerminal(); io.unobserve(e.target); }
    });
  }, { threshold: 0.3 });

  io.observe(output);
})();

/* ── Random Card Glitch ─────────────────────────── */
(function () {
  const names = document.querySelectorAll('.product-card__name');
  if (!names.length) return;

  function trigger() {
    const el = names[Math.floor(Math.random() * names.length)];
    el.classList.add('glitch-flash');
    el.addEventListener('animationend', () => el.classList.remove('glitch-flash'), { once: true });
    setTimeout(trigger, 2200 + Math.random() * 4000);
  }

  setTimeout(trigger, 3000);
})();

/* ── Smooth anchor scroll offset ───────────────── */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      const offset = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });
})();

/* ── Product Showcase Tab Switcher ─────────────── */
(function () {
  const meta = {
    groupware: {
      src:     'assets/screenshots/groupware.png',
      host:    'groupware.cgessence.local',
      caption: '중소기업 맞춤형 그룹웨어 — 전자결재, 게시판, 일정 통합 관리',
    },
    messenger: {
      src:     'assets/screenshots/messenger.png',
      host:    'messenger.cgessence.local',
      caption: 'E-Messenger — 로그인부터 1:1 채팅·파일 공유까지, 회사 전용 메신저',
    },
    itmanager: {
      src:     'assets/screenshots/itmanager.png',
      host:    'itmanager.cgessence.local',
      caption: 'IT-Manager — 장애 접수부터 처리까지, 티켓 기반 서비스 데스크 통합',
    },
    essence: {
      src:     'assets/screenshots/essence.png',
      host:    'ai.cgessence.local',
      caption: 'Essence AI — 온프레미스 대화형 AI 어시스턴트 (인터넷 불필요)',
    },
    essenceon: {
      src:     'assets/screenshots/essenceon.png',
      host:    'essenceon.cgessence.local',
      caption: 'EssenceOn — 보안 격리 AI 채팅, 민감 데이터 완전 로컬 처리',
    },
    esecurity: {
      src:     'assets/screenshots/esecurity.png',
      host:    'esecurity.cgessence.local',
      caption: 'E-Security — Windows 엔드포인트 보안, 악성코드 스캔부터 USB 제어까지 중앙 관리',
    },
  };

  const tabs    = document.querySelectorAll('.showcase__tab');
  const panel   = document.getElementById('showcasePanel');
  const img     = document.getElementById('showcaseImg');
  const urlHost = document.getElementById('showcaseUrlHost');
  const shimmer = document.getElementById('showcaseShimmer');
  const caption = document.getElementById('showcaseCaption');

  if (!panel || !img) return;

  let current  = 'groupware';
  let timer    = null;
  const DELAY  = 4500;
  const order  = ['groupware', 'messenger', 'itmanager', 'essence', 'essenceon', 'esecurity'];

  function switchTab(product) {
    if (product === current) return;
    current = product;

    // update tabs
    tabs.forEach(t => {
      const active = t.dataset.product === product;
      t.classList.toggle('showcase__tab--active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    // shimmer flash
    shimmer.classList.remove('browser-frame__shimmer--flash');
    void shimmer.offsetWidth; // reflow
    shimmer.classList.add('browser-frame__shimmer--flash');

    // crossfade image
    img.classList.remove('browser-frame__shot--active');
    setTimeout(() => {
      const m = meta[product];
      img.src = m.src;
      img.alt = m.caption;
      img.onload = () => img.classList.add('browser-frame__shot--active');
      img.onerror = () => img.classList.add('browser-frame__shot--active');
      if (urlHost) urlHost.textContent = m.host;
      if (caption) caption.textContent = m.caption;
      panel.dataset.active = product;
    }, 180);
  }

  function nextProduct() {
    const idx = order.indexOf(current);
    switchTab(order[(idx + 1) % order.length]);
  }

  function startAutoPlay() {
    clearInterval(timer);
    timer = setInterval(nextProduct, DELAY);
  }

  // click handlers
  tabs.forEach(t => {
    t.addEventListener('click', () => {
      switchTab(t.dataset.product);
      startAutoPlay();
    });
  });

  // pause on hover
  panel.addEventListener('mouseenter', () => clearInterval(timer));
  panel.addEventListener('mouseleave', startAutoPlay);

  // start auto-cycling only when in view
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { startAutoPlay(); }
      else { clearInterval(timer); }
    });
  }, { threshold: 0.2 });

  io.observe(panel);
})();
