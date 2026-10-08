const navbar = document.getElementById('navbar');
if (navbar) {
  const updateNavbar = () => navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateNavbar();
  window.addEventListener('scroll', updateNavbar, { passive: true });
}

document.addEventListener('click', (event) => {
  const link = event.target instanceof Element ? event.target.closest('a') : null;
  if (!link) return;
  link.closest('details.mobile-nav')?.removeAttribute('open');

  const url = new URL(link.href);
  if (url.hostname === 'apps.apple.com' && url.pathname.includes('id6760595154') && typeof window.gtag === 'function') {
    window.gtag('event', 'app_store_click', {
      language: document.documentElement.lang,
      page_path: window.location.pathname,
      link_url: url.href
    });
  }
});
