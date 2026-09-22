/* MECO Web — shared behaviour */
(function () {
    'use strict';

    const root = document.documentElement;

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

    function updateActiveLink() {
        const current = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('nav a').forEach(link => {
            const href = (link.getAttribute('href') || '').split('/').pop();
            link.classList.toggle('active', href === current || (current === '' && href === 'index.html'));
        });
    }

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

    function initExternalLinks() {
        document.querySelectorAll('a[href^="http"]').forEach(link => {
            if (link.hostname && link.hostname !== window.location.hostname) {
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
            }
        });
    }

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

    document.addEventListener('DOMContentLoaded', () => {
        initTheme();
        initMobileMenu();
        updateActiveLink();
        initScrollTop();
        initExternalLinks();
        initLazyImages();
    });
}());
