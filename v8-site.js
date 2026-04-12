/* =====================================================================
   Zynix AI v8 — Site companion JS (v2)
   - Injects mega-menu dropdowns matching Website Map V6
   - Adds .scrolled class on nav
   - Intersection observer for scroll reveal
   ===================================================================== */

(function () {
  'use strict';

  /* ── DROPDOWN MEGA-MENUS ────────────────────────────────────────────
     Converts flat nav links into hover-dropdown menus.
     Only applies to links that match known dropdown parents. */

  var DROPDOWNS = {
    'Platform': {
      columns: [
        {
          title: 'Platform',
          links: [
            { label: 'Zynix Intelligent Platform (ZIP)', href: '/platform', desc: 'The operating layer for value-based care' },
            { label: 'ZynixLLM', href: '/zynixllm', desc: 'Healthcare-adapted intelligence' },
            { label: 'Deployable Care Plans', href: '/care-plans', desc: 'Orchestrated agent programs' }
          ]
        },
        {
          title: 'Trust',
          links: [
            { label: 'Security & Compliance', href: '/security', desc: 'HIPAA, SOC 2, HITRUST' },
            { label: 'Integrations', href: '/integrations', desc: 'EHRs, payer feeds, ADT' }
          ]
        }
      ]
    },
    'Whom We Serve': {
      columns: [
        {
          title: 'By Segment',
          links: [
            { label: 'Health Systems', href: '/health-systems' },
            { label: 'ACOs & MSOs', href: '/acos-msos' },
            { label: 'Health Plans', href: '/health-plans' }
          ]
        },
        {
          title: '',
          links: [
            { label: 'Independent Group Practices', href: '/independent-group-practices' },
            { label: 'ASCs', href: '/ascs' },
            { label: 'FQHCs', href: '/fqhcs' }
          ]
        }
      ]
    },
    'Company': {
      columns: [
        {
          title: 'Company',
          links: [
            { label: 'About Us', href: '/about' },
            { label: 'Careers', href: '/careers' },
            { label: 'Newsroom', href: '/press-news' },
            { label: 'Security', href: '/security' }
          ]
        }
      ]
    },
    'Resources': {
      columns: [
        {
          title: 'Resources',
          links: [
            { label: 'Case Studies', href: '/case-studies' },
            { label: 'Blog', href: '/resources-blog' },
            { label: 'Webinars & Events', href: '/webinars-events' },
            { label: 'FAQ', href: '/faq' }
          ]
        }
      ]
    }
  };

  function buildDropdownHTML(config) {
    var html = '<div class="v8-mega-menu">';
    html += '<div class="v8-mega-inner">';
    config.columns.forEach(function (col) {
      html += '<div class="v8-mega-col">';
      if (col.title) html += '<div class="v8-mega-col-title">' + col.title + '</div>';
      col.links.forEach(function (link) {
        html += '<a class="v8-mega-link" href="' + link.href + '">';
        html += '<span class="v8-mega-link-label">' + link.label + '</span>';
        if (link.desc) html += '<span class="v8-mega-link-desc">' + link.desc + '</span>';
        html += '</a>';
      });
      html += '</div>';
    });
    html += '</div></div>';
    return html;
  }

  function injectDropdowns() {
    var navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function (link) {
      var text = link.textContent.trim();
      if (DROPDOWNS[text]) {
        // Wrap the link in a dropdown container
        var wrapper = document.createElement('div');
        wrapper.className = 'v8-nav-dropdown';
        link.parentNode.insertBefore(wrapper, link);
        wrapper.appendChild(link);

        // Add chevron
        link.innerHTML = text + ' <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-left:4px;vertical-align:middle;"><polyline points="6 9 12 15 18 9"/></svg>';
        link.setAttribute('href', '#');
        link.addEventListener('click', function (e) { e.preventDefault(); });

        // Add dropdown panel
        wrapper.insertAdjacentHTML('beforeend', buildDropdownHTML(DROPDOWNS[text]));
      }
    });
  }

  /* ── NAV SCROLL SHADOW ─────────────────────────────────────────────── */
  function scrollShadow() {
    var nav = document.querySelector('.navbar');
    if (!nav) return;
    var onScroll = function () {
      if (window.scrollY > 10) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── SCROLL REVEAL ──────────────────────────────────────────────────── */
  function scrollReveal() {
    if (!('IntersectionObserver' in window)) return;
    var targets = document.querySelectorAll('.section, .cta-section, .card, .hero-section > .container > *');
    if (!targets.length) return;
    document.body.classList.add('v-ready');
    targets.forEach(function (el) { el.classList.add('v-reveal'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (t) { io.observe(t); });
  }

  /* ── INIT ────────────────────────────────────────────────────────────── */
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    try { injectDropdowns(); } catch (e) { console.error('v8: dropdown inject failed', e); }
    try { scrollShadow(); } catch (e) { /* quiet */ }
    try { scrollReveal(); } catch (e) { /* quiet */ }
  });
})();
