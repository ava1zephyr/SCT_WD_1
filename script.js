// script.js - minimal, dependency-free JS for the simplified site
(function () {
  const body = document.body;
  const menuOpenButton = document.getElementById('menu-open-button');
  const menuCloseButton = document.getElementById('menu-close-button');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  // Accessibility & simple fallbacks (if icon fonts were removed)
  if (menuOpenButton) {
    menuOpenButton.setAttribute('aria-label', 'Open menu');
    if (!menuOpenButton.innerHTML.trim()) menuOpenButton.innerText = '☰'; // fallback icon
  }
  if (menuCloseButton) {
    menuCloseButton.setAttribute('aria-label', 'Close menu');
    if (!menuCloseButton.innerHTML.trim()) menuCloseButton.innerText = '✕'; // fallback icon
  }

  function openMenu() { body.classList.add('show-mobile-menu'); }
  function closeMenu() { body.classList.remove('show-mobile-menu'); }
  function toggleMenu() { body.classList.toggle('show-mobile-menu'); }

  // Attach handlers (guards prevent errors if elements are missing)
  if (menuOpenButton) menuOpenButton.addEventListener('click', toggleMenu);
  if (menuCloseButton) menuCloseButton.addEventListener('click', closeMenu);

  // Close the mobile menu when any nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close menu when clicking outside it (only when menu is open)
  document.addEventListener('click', (e) => {
    if (!body.classList.contains('show-mobile-menu')) return;
    // If click inside the nav menu or on the open button, do nothing
    if (navMenu && navMenu.contains(e.target)) return;
    if (menuOpenButton && menuOpenButton.contains(e.target)) return;
    closeMenu();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Smooth scroll for in-page anchors and close menu on scroll target
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        closeMenu();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
