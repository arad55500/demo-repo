(function () {
  'use strict';

  var panels = document.querySelectorAll('.panel');
  var navLinksOnly = document.querySelectorAll('.nav-link');
  var panelLinks = document.querySelectorAll('[data-panel]');

  function switchPanel(name) {
    if (!name) return;
    // Update nav active state (only for .nav-link)
    navLinksOnly.forEach(function (el) {
      var linkPanel = el.getAttribute('data-panel');
      el.classList.toggle('active', linkPanel === name);
    });
    // Show/hide panels
    panels.forEach(function (panel) {
      if (panel.getAttribute('data-panel') === name) {
        panel.classList.add('active');
        if (name === 'home') animateCounters();
      } else {
        panel.classList.remove('active');
      }
    });
  }

  function animateCounters() {
    var nums = document.querySelectorAll('.stat-num[data-count]');
    nums.forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var duration = 1200;
      var start = null;
      var startVal = 0;
      function step(timestamp) {
        if (!start) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        var easeOut = 1 - Math.pow(1 - progress, 3);
        var current = Math.round(startVal + (target - startVal) * easeOut);
        el.textContent = current;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  // Nav and panel link clicks
  panelLinks.forEach(function (el) {
    el.addEventListener('click', function (e) {
      var panelName = el.getAttribute('data-panel');
      if (panelName) {
        e.preventDefault();
        switchPanel(panelName);
        var navMain = document.querySelector('.nav-main');
        if (navMain && navMain.classList.contains('open')) {
          navMain.classList.remove('open');
          document.querySelector('.nav-toggle').classList.remove('open');
          document.body.style.overflow = '';
        }
      }
    });
  });

  // Initial panel: show home and run hero animations
  document.body.classList.add('loaded');
  switchPanel('home');

  // Projects filter
  var filterBar = document.querySelector('.filter-bar');
  var projectMinis = document.querySelectorAll('.project-mini[data-category]');
  if (filterBar && projectMinis.length) {
    filterBar.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;
      var filter = btn.getAttribute('data-filter');
      filterBar.querySelectorAll('.filter-btn').forEach(function (b) {
        b.classList.toggle('active', b === btn);
      });
      projectMinis.forEach(function (card) {
        var cat = card.getAttribute('data-category');
        var show = filter === 'all' || cat === filter;
        card.style.display = show ? '' : 'none';
      });
    });
  }

  // Contact form
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('This is a static demo. In production, connect this form to your backend or Formspree.');
    });
  }

  // Mobile nav toggle
  var navToggle = document.querySelector('.nav-toggle');
  var navMain = document.querySelector('.nav-main');
  if (navToggle && navMain) {
    navToggle.addEventListener('click', function () {
      navMain.classList.toggle('open');
      navToggle.classList.toggle('open');
      document.body.style.overflow = navMain.classList.contains('open') ? 'hidden' : '';
    });
  }
})();
