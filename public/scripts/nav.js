(function () {
  const button = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.site-nav');
  if (!button || !menu) return;
  button.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
  });
})();
