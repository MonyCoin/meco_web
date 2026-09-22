// ========== MECO WEB CORE ========== 

function getStoredTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function updateThemeButton(theme) {
    const button = document.querySelector('.theme-toggle');
    if (!button) return;
    button.textContent = theme === 'dark' ? '☀️' : '🌙';
    button.setAttribute('aria-label', theme === 'dark' ? 'تفعيل المظهر الفاتح' : 'تفعيل المظهر الداكن');
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeButton(theme);
}

function toggleTheme() {
    setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
}

function initTheme() {
    setTheme(getStoredTheme());
    document.querySelector('.theme-toggle')?.addEventListener('click', toggleTheme);
}

function initMobileMenu() {
    const button = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    if (!button || !nav) return;
    button.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        button.setAttribute('aria-expanded', String(isOpen));
        button.textContent = isOpen ? '×' : '☰';
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
        nav.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');
        button.textContent = '☰';
    }));
}

function updateActiveLink() {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        const href = link.getAttribute('href')?.split('/').pop();
        link.classList.toggle('active', href === current || (current === '' && href === 'index.html'));
    });
}

function initScrollToTop() {
    const button = document.createElement('button');
    button.className = 'scroll-to-top';
    button.type = 'button';
    button.textContent = '↑';
    button.setAttribute('aria-label', 'العودة إلى أعلى الصفحة');
    document.body.appendChild(button);
    window.addEventListener('scroll', () => button.classList.toggle('show', window.scrollY > 500), { passive: true });
    button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => anchor.addEventListener('click', event => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }));
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
    }), { rootMargin: '100px' });
    document.querySelectorAll('img[data-src]').forEach(image => observer.observe(image));
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    updateActiveLink();
    initScrollToTop();
    initSmoothScroll();
    initExternalLinks();
    initLazyImages();
    document.documentElement.classList.add('js-ready');
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
}
