/* MECO Web — shared behaviour */
(function () {
  'use strict';

  const root = document.documentElement;

  /* ---------- Theme ---------- */
  function setTheme(theme) {
    const value = theme === 'light' ? 'light' : 'dark';
    root.setAttribute('data-theme', value);
    localStorage.setItem('theme', value);
    document.querySelectorAll('.theme-toggle').forEach(button => {
      button.textContent = value === 'dark' ? '☀️' : '🌙';
      button.setAttribute('aria-label', value === 'dark' ? 'تفعيل المظهر الفاتح' : 'تفعيل المظهر الداكن');
    });
  }

  function initTheme() {
    const saved = localStorage.getItem('theme');
    const preferred = window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    setTheme(saved || preferred);
    document.querySelectorAll('.theme-toggle').forEach(button => {
      button.addEventListener('click', () => setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));
    });
  }

  /* ---------- Mobile Menu ---------- */
  function initMobileMenu() {
    document.querySelectorAll('.mobile-menu-btn').forEach(button => {
      const nav = button.parentElement?.querySelector('nav') || document.querySelector('nav');
      if (!nav) return;
      button.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        button.setAttribute('aria-expanded', String(open));
        button.textContent = open ? '×' : '☰';
      });
      nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
        nav.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');
        button.textContent = '☰';
      }));
    });
  }

  /* ---------- Active Link ---------- */
  function updateActiveLink() {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
      const href = (link.getAttribute('href') || '').split('/').pop();
      link.classList.toggle('active', href === current || (current === '' && href === 'index.html'));
    });
  }

  /* ---------- Scroll to top ---------- */
  function initScrollTop() {
    const button = document.createElement('button');
    button.className = 'scroll-to-top';
    button.type = 'button';
    button.textContent = '↑';
    button.setAttribute('aria-label', 'العودة إلى أعلى الصفحة');
    document.body.appendChild(button);
    window.addEventListener('scroll', () => button.classList.toggle('show', window.scrollY > 420), { passive: true });
    button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---------- External links ---------- */
  function initExternalLinks() {
    document.querySelectorAll('a[href^="http"]').forEach(link => {
      if (link.hostname && link.hostname !== window.location.hostname) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
    });
  }

  /* ---------- Lazy images ---------- */
  function initLazyImages() {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const image = entry.target;
      if (image.dataset.src) image.src = image.dataset.src;
      image.classList.add('loaded');
      observer.unobserve(image);
    }), { rootMargin: '120px' });
    document.querySelectorAll('img[data-src]').forEach(image => observer.observe(image));
  }

  /* ---------- Blog: Read more / Share ---------- */
  window.toggleReadMore = function (button) {
    const card = button.closest('.blog-card');
    if (!card) return;
    const fullContent = card.querySelector('.full-content');
    const preview = card.querySelector('.preview-content');
    if (!fullContent) return;

    const isOpen = fullContent.style.display === 'block';
    fullContent.style.display = isOpen ? 'none' : 'block';
    if (preview) preview.style.display = 'block';
    button.textContent = isOpen ? 'قراءة المزيد...' : 'عرض أقل';
  };

  window.sharePost = function (title) {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: title, text: title + ' — MECO Network', url: url }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(title + '\n' + url)
        .then(() => alert('تم نسخ الرابط إلى الحافظة'))
        .catch(() => prompt('انسخ الرابط للمشاركة:', title + '\n' + url));
    } else {
      prompt('انسخ الرابط للمشاركة:', title + '\n' + url);
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    updateActiveLink();
    initScrollTop();
    initExternalLinks();
    initLazyImages();
  });
}());
