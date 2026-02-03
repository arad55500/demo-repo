(function () {
  'use strict';

  // Page-load animation: add .loaded to body so .animate-in elements transition in
  function initPageLoadAnimations() {
    document.body.classList.add('loaded');
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      requestAnimationFrame(function () {
        requestAnimationFrame(initPageLoadAnimations);
      });
    });
  } else {
    requestAnimationFrame(function () {
      requestAnimationFrame(initPageLoadAnimations);
    });
  }

  // Scroll reveal: add .revealed when elements enter viewport
  var revealSelectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger';
  var revealEls = document.querySelectorAll(revealSelectors);
  if (revealEls.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { rootMargin: '0px 0px -80px 0px', threshold: 0.05 }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else if (revealEls.length) {
    revealEls.forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  // Header scroll effect
  var header = document.getElementById('header');
  if (header) {
    function onScroll() {
      if (window.scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
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

    // Close nav when clicking a link (for single-page feel on multi-page site)
    navMain.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMain.classList.remove('open');
        navToggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Projects filter (Projects page)
  var filterBar = document.querySelector('.filter-bar');
  var projectCards = document.querySelectorAll('.project-card[data-category]');
  if (filterBar && projectCards.length) {
    filterBar.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-filter]');
      if (!btn) return;
      var filter = btn.getAttribute('data-filter');
      filterBar.querySelectorAll('button').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      projectCards.forEach(function (card) {
        var cat = card.getAttribute('data-category');
        var show = filter === 'all' || cat === filter;
        card.style.display = show ? '' : 'none';
      });
    });
  }

  // Contact form: prevent default and show message (static demo)
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('This is a static demo. In production, connect this form to your backend or a service like Formspree.');
    });
  }
})();
