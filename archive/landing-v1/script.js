(function () {
  'use strict';

  var ROOT = document.documentElement;

  // ----- Mobile nav toggle -----
  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', open);
      navToggle.setAttribute('aria-label', open ? 'Chiudi menu' : 'Apri menu');
    });
    // Close on link click (mobile)
    nav.querySelectorAll('.nav-list a, .btn-cta-header').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Apri menu');
      });
    });
  }

  // ----- Fade-in on scroll -----
  var animated = document.querySelectorAll('[data-animate]');
  if (animated.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0.1 }
    );
    animated.forEach(function (el) {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  } else {
    animated.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ----- Smooth scroll for anchor links (reinforce if needed) -----
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    var id = a.getAttribute('href');
    if (id === '#') return;
    a.addEventListener('click', function (e) {
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
