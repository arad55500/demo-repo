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
      var duration = 1500;
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

  // Gallery filter
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
      var formData = new FormData(contactForm);
      var name = formData.get('name');
      alert('Thank you, ' + name + '! We\'ll get back to you within 24 hours. This is a demo form - in production, connect this to your backend or Formspree.');
      contactForm.reset();
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
    
    // Close nav when clicking outside
    document.addEventListener('click', function(e) {
      if (navMain.classList.contains('open') && 
          !navMain.contains(e.target) && 
          !navToggle.contains(e.target)) {
        navMain.classList.remove('open');
        navToggle.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Handle image loading errors - show placeholder
  var images = document.querySelectorAll('.project-mini img');
  images.forEach(function(img) {
    img.addEventListener('error', function() {
      this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23e8f4f8" width="400" height="300"/%3E%3Ctext fill="%2300a8cc" font-family="Arial" font-size="18" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage Placeholder%3C/text%3E%3C/svg%3E';
      this.alt = 'Image placeholder';
    });
  });
})();
