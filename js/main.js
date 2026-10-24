(function () {
  'use strict';
  var doc = document, root = doc.documentElement, body = doc.body;
  var btn = doc.querySelector('.hamburger');
  var drawer = doc.querySelector('.mob-drawer');
  var overlay = doc.querySelector('.mob-overlay');
  var closeBtn = doc.querySelector('.mob-close');

  function setMenu(open) {
    if (!drawer) return;
    body.classList.toggle('menu-open', open);
    root.classList.toggle('no-scroll', open);
    if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
    if (open && closeBtn) closeBtn.focus();
    if (!open && btn && doc.activeElement && drawer.contains(doc.activeElement)) btn.focus();
  }
  if (btn) btn.addEventListener('click', function () { setMenu(!body.classList.contains('menu-open')); });
  if (closeBtn) closeBtn.addEventListener('click', function () { setMenu(false); });
  if (overlay) overlay.addEventListener('click', function () { setMenu(false); });
  doc.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  if (window.matchMedia) {
    var mq = window.matchMedia('(min-width: 769px)');
    var onMq = function (e) { if (e.matches) setMenu(false); };
    if (mq.addEventListener) mq.addEventListener('change', onMq); else if (mq.addListener) mq.addListener(onMq);
  }

  // FAQ accordion: max-height toggle
  var items = doc.querySelectorAll('.faq-item');
  Array.prototype.forEach.call(items, function (it) {
    var q = it.querySelector('.faq-q');
    var a = it.querySelector('.faq-answer');
    if (!q || !a) return;
    q.addEventListener('click', function () {
      var open = it.classList.toggle('open');
      q.setAttribute('aria-expanded', open ? 'true' : 'false');
      a.style.maxHeight = open ? a.scrollHeight + 'px' : '0px';
    });
  });
  window.addEventListener('resize', function () {
    Array.prototype.forEach.call(doc.querySelectorAll('.faq-item.open .faq-answer'), function (a) { a.style.maxHeight = a.scrollHeight + 'px'; });
  });
})();
