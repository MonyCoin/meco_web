// ========== THEME TOGGLE ==========
function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggleButton(newTheme);
}

function initTheme() {
    const saved = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const theme = saved || (prefersLight ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeToggleButton(theme);
}

function updateThemeToggleButton(theme) {
    const btn = document.querySelector('.theme-toggle');
    if (btn) {
        btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// ========== MOBILE MENU ==========
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('open');
        });
        
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
            });
        });
    }
}

// ========== ACTIVE LINK ==========
function updateActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ========== SCROLL TO TOP BUTTON ==========
function initScrollToTop() {
    const scrollBtn = document.querySelector('.scroll-to-top');
    
    if (!scrollBtn) {
        const btn = document.createElement('button');
        btn.className = 'scroll-to-top';
        btn.innerHTML = '↑';
        btn.setAttribute('aria-label', 'الذهاب للأعلى');
        document.body.appendChild(btn);
    }
    
    window.addEventListener('scroll', () => {
        const btn = document.querySelector('.scroll-to-top');
        if (window.scrollY > 300) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    });
    
    document.addEventListener('click', (e) => {
        if (e.target.closest('.scroll-to-top')) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

// ========== SMOOTH SCROLL LINKS ==========
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ========== LAZY LOAD IMAGES ==========
function initLazyLoad() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ========== PERFORMANCE MONITORING ==========
function logPerformance() {
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', () => {
            const perf = window.performance.timing;
            const pageLoadTime = perf.loadEventEnd - perf.navigationStart;
            console.log('⏱️ Page Load Time:', pageLoadTime + 'ms');
        });
    }
}

// ========== EXTERNAL LINKS ==========
function initExternalLinks() {
    document.querySelectorAll('a[href^="http"], a[href^="https"]').forEach(link => {
        if (link.hostname !== window.location.hostname) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            link.setAttribute('aria-label', link.textContent + ' (فتح في نافذة جديدة)');
        }
    });
}

// ========== ANALYTICS ==========
function trackEvent(eventName, eventData = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
}

document.addEventListener('click', (e) => {
    if (e.target.closest('.btn-primary')) {
        trackEvent('button_click', { button_text: e.target.textContent });
    }
});

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    updateActiveLink();
    initScrollToTop();
    initSmoothScroll();
    initLazyLoad();
    logPerformance();
    initExternalLinks();
    
    console.log('🚀 MECO Web initialized successfully');
});

// ========== SERVICE WORKER ==========
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            console.log('Service Worker registration failed');
        });
    });
}
