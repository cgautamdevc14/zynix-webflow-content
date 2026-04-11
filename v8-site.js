/* =====================================================================
   Zynix AI v8 — Companion site JS
   - Reorders nav items to match Website Map V6:
       Company · ZIP · Solutions · Whom we serve · Use Cases · Resources · Contact Us
   - Adds .scrolled class to nav after user scrolls
   - Intersection observer for scroll reveal animations
   - Hides the "TRUSTED BY ..." text above customer logos (backup for CSS)
   - Arms .zv2-js-ready on body (enables the scroll-reveal CSS)

   Load after v8-styles.css in Webflow Project Settings → Head Code:
     <script src="https://cdn.jsdelivr.net/gh/cgautamdevc14/zynix-webflow-content@main/v8-site.js" defer></script>
   ===================================================================== */

(function () {
  'use strict';

  /* V6 nav order (left → right). We match on either the href path or the
     visible label, whichever comes first. */
  var NAV_ORDER = [
    { key: 'company',        labels: ['company'],                     hrefMatches: ['/about', '/company', '/careers', '/newsroom', '/press'] },
    { key: 'zip',            labels: ['zip', 'platform'],             hrefMatches: ['/platform'] },
    { key: 'solutions',      labels: ['solutions'],                   hrefMatches: ['/agents', '/solutions', '/care-plans', '/zynscribe'] },
    { key: 'whom-we-serve',  labels: ['whom we serve', 'who we serve'], hrefMatches: ['/who-we-serve'] },
    { key: 'use-cases',      labels: ['use cases'],                   hrefMatches: ['/use-cases'] },
    { key: 'resources',      labels: ['resources'],                   hrefMatches: ['/resources', '/case-studies', '/blog', '/webinars', '/faq', '/glossary'] },
    { key: 'contact',        labels: ['contact us', 'contact'],       hrefMatches: ['/contact'] }
  ];

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  function classifyNavItem(el) {
    if (!el) return null;
    var text = (el.textContent || '').trim().toLowerCase();
    var anchors = el.querySelectorAll('a');
    var href = '';
    if (anchors.length) href = (anchors[0].getAttribute('href') || '').toLowerCase();
    else if (el.tagName === 'A') href = (el.getAttribute('href') || '').toLowerCase();

    for (var i = 0; i < NAV_ORDER.length; i++) {
      var spec = NAV_ORDER[i];
      // Match by label
      for (var j = 0; j < spec.labels.length; j++) {
        if (text.indexOf(spec.labels[j]) === 0 || text === spec.labels[j]) return { key: spec.key, order: i + 1 };
      }
      // Match by href
      for (var k = 0; k < spec.hrefMatches.length; k++) {
        if (href && href.indexOf(spec.hrefMatches[k]) === 0) return { key: spec.key, order: i + 1 };
      }
    }
    return null;
  }

  function reorderNav() {
    // Find the nav menu container (Webflow uses .w-nav-menu or custom class)
    var menus = document.querySelectorAll('.zynix-mega-nav .w-nav-menu, .zynix-mega-nav nav > ul, nav.w-nav-menu, .w-nav-menu');
    if (!menus || !menus.length) return;

    menus.forEach(function (menu) {
      // Use immediate children as items
      var items = Array.prototype.slice.call(menu.children).filter(function (el) {
        // Skip hidden elements and non-interactive containers
        return el.offsetParent !== null || el.matches('a, li, div, button');
      });

      if (!items.length) return;

      // Tag each item with its key + order (via data attributes so CSS can also target)
      var tagged = [];
      items.forEach(function (el) {
        var match = classifyNavItem(el);
        if (match) {
          el.setAttribute('data-nav', match.key);
          el.style.order = String(match.order);
          tagged.push(match.key);
        }
      });

      // If we recognized nothing, bail quietly
      if (!tagged.length) return;

      // Ensure menu is flex
      menu.style.display = 'flex';
    });
  }

  function scrollShadow() {
    var navs = document.querySelectorAll('.zynix-mega-nav, .w-nav, header.w-nav');
    if (!navs.length) return;

    var onScroll = function () {
      var y = window.scrollY || document.documentElement.scrollTop;
      navs.forEach(function (n) {
        if (y > 10) n.classList.add('scrolled');
        else n.classList.remove('scrolled');
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function scrollReveal() {
    if (!('IntersectionObserver' in window)) return;

    // Auto-tag common content blocks for reveal
    var selectors = [
      '.z-hero > *',
      '.zynix-inner-hero > *',
      '.zynix-problem-grid > *',
      '.zynix-feature-grid > *',
      '.zynix-arch-grid > *',
      '.zynix-agents-grid > *',
      '.zynix-data-layers > *',
      '.zynix-customer-list > *',
      '.zynix-cta-section > *',
      'section > .zynix-container > *'
    ];

    var targets = [];
    selectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        if (!el.classList.contains('zv2-reveal')) {
          el.classList.add('zv2-reveal');
          targets.push(el);
        }
      });
    });

    if (!targets.length) return;

    document.body.classList.add('zv2-js-ready');

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('zv2-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });

    targets.forEach(function (t) { io.observe(t); });
  }

  function hideCustomerTrustLine() {
    // Remove any stray "TRUSTED BY ..." text paragraphs in the customer section
    // that the CSS couldn't catch (some sites inject it as a raw text node).
    var section = document.querySelector('.zynix-customers-section');
    if (!section) return;

    var children = Array.prototype.slice.call(section.children);
    children.forEach(function (el) {
      if (el.matches && el.matches('.zynix-customer-list')) return;
      var txt = (el.textContent || '').trim().toUpperCase();
      if (txt.length && (txt.indexOf('TRUSTED BY') === 0 || txt.indexOf('HEALTH SYSTEMS · FQHCS') > -1)) {
        el.style.display = 'none';
      }
    });
  }

  ready(function () {
    try { reorderNav(); } catch (e) { /* quiet */ }
    try { scrollShadow(); } catch (e) { /* quiet */ }
    try { scrollReveal(); } catch (e) { /* quiet */ }
    try { hideCustomerTrustLine(); } catch (e) { /* quiet */ }
  });

  // Re-run nav reorder if Webflow rebuilds the DOM after initial load
  if (window.Webflow && typeof window.Webflow.push === 'function') {
    window.Webflow.push(function () {
      try { reorderNav(); } catch (e) { /* quiet */ }
    });
  }
})();
