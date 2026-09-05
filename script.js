const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.lastChild.textContent = isOpen ? '−' : '+';
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (menuToggle) menuToggle.lastChild.textContent = '+';
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 55, 330)}ms`;
  revealObserver.observe(element);
});

document.querySelector('#year').textContent = new Date().getFullYear();

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const progressBar = document.querySelector('.scroll-progress span');

const updateScrollProgress = () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
  progressBar?.style.setProperty('transform', `scaleX(${progress})`);
};

window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

if (!prefersReducedMotion) {
  window.addEventListener('pointermove', (event) => {
    document.body.style.setProperty('--pointer-x', `${event.clientX}px`);
    document.body.style.setProperty('--pointer-y', `${event.clientY}px`);
  }, { passive: true });
}
