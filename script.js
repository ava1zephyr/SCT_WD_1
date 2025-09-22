(function () {
  const body = document.body;
  const menuOpenButton = document.getElementById('menu-open-button');
  const menuCloseButton = document.getElementById('menu-close-button');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  if (menuOpenButton) {
    menuOpenButton.setAttribute('aria-label', 'Open menu');
    if (!menuOpenButton.innerHTML.trim()) menuOpenButton.innerText = '☰';
  }
  if (menuCloseButton) {
    menuCloseButton.setAttribute('aria-label', 'Close menu');
    if (!menuCloseButton.innerHTML.trim()) menuCloseButton.innerText = '✕'; 
  }

  function openMenu() { body.classList.add('show-mobile-menu'); }
  function closeMenu() { body.classList.remove('show-mobile-menu'); }
  function toggleMenu() { body.classList.toggle('show-mobile-menu'); }

  if (menuOpenButton) menuOpenButton.addEventListener('click', toggleMenu);
  if (menuCloseButton) menuCloseButton.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  document.addEventListener('click', (e) => {
    if (!body.classList.contains('show-mobile-menu')) return;
    if (navMenu && navMenu.contains(e.target)) return;
    if (menuOpenButton && menuOpenButton.contains(e.target)) return;
    closeMenu();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
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

