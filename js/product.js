// 제품 소개 페이지 공용: 모바일 메뉴 열고 닫기 + 「실제 화면」 탭 (2026-11-04)
(function () {
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  if (nav && toggle) {
    toggle.addEventListener('click', function () { nav.classList.toggle('nav--open'); });
    nav.querySelectorAll('.nav__mobile a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('nav--open'); });
    });
  }

  var tabs = Array.prototype.slice.call(document.querySelectorAll('.pd-tab'));
  function select(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) tab.focus();
    tab.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { select(t, false); });
    t.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') select(tabs[(i + 1) % tabs.length], true);
      if (e.key === 'ArrowLeft') select(tabs[(i - 1 + tabs.length) % tabs.length], true);
    });
  });
})();
