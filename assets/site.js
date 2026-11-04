(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('[data-theme-toggle]');
  const themeIcon = document.querySelector('[data-theme-icon]');
  const themeStatus = document.querySelector('[data-theme-status]');
  const themes = ['system', 'light', 'dark'];
  const labels = {
    system: 'Color theme: Follow system. Activate to switch to Light.',
    light: 'Color theme: Light. Activate to switch to Dark.',
    dark: 'Color theme: Dark. Activate to switch to Follow system.'
  };

  function setTheme(theme, persist) {
    if (theme === 'system') root.removeAttribute('data-theme');
    else root.dataset.theme = theme;
    if (themeButton) {
      themeButton.setAttribute('aria-label', labels[theme]);
      themeButton.title = labels[theme].split('. Activate')[0];
      if (themeStatus) themeStatus.textContent = labels[theme];
      if (themeIcon) themeIcon.textContent = theme === 'light' ? '☀' : theme === 'dark' ? '☾' : '◐';
    }
    if (persist) {
      try {
        if (theme === 'system') localStorage.removeItem('dhs-theme');
        else localStorage.setItem('dhs-theme', theme);
      } catch {}
    }
  }

  let selectedTheme = 'system';
  try {
    const stored = localStorage.getItem('dhs-theme');
    if (stored === 'light' || stored === 'dark') selectedTheme = stored;
  } catch {}
  setTheme(selectedTheme, false);

  if (themeButton) themeButton.addEventListener('click', () => {
    const next = themes[(themes.indexOf(selectedTheme) + 1) % themes.length];
    selectedTheme = next;
    setTheme(next, true);
  });

  const menuButton = document.querySelector('[data-menu-toggle]');
  const mobileNav = document.getElementById('mobile-nav');
  function closeMenu(returnFocus) {
    if (!menuButton || !mobileNav) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    mobileNav.classList.remove('is-open');
    if (returnFocus) menuButton.focus();
  }
  if (menuButton && mobileNav) {
    menuButton.addEventListener('click', () => {
      const opening = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(opening));
      menuButton.setAttribute('aria-label', opening ? 'Close navigation' : 'Open navigation');
      mobileNav.classList.toggle('is-open', opening);
      if (opening) mobileNav.querySelector('a')?.focus();
    });
    mobileNav.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMenu(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1200) closeMenu(false);
    });
  }
  const productFilters = document.querySelectorAll('[data-product-filter]');
  const productCards = document.querySelectorAll('[data-product-category]');
  const emptyProducts = document.getElementById('product-filter-empty');
  if (productFilters.length && productCards.length) {
    productFilters.forEach((button) => button.addEventListener('click', () => {
      const filter = button.dataset.productFilter;
      let visible = 0;
      productFilters.forEach((item) => {
        const selected = item === button;
        item.classList.toggle('is-selected', selected);
        item.setAttribute('aria-pressed', String(selected));
      });
      productCards.forEach((card) => {
        const show = filter === 'all' || card.dataset.productCategory === filter;
        card.hidden = !show;
        if (show) visible += 1;
      });
      if (emptyProducts) emptyProducts.hidden = visible > 0;
    }));
  }

  document.querySelectorAll('[data-year]').forEach((year) => {
    year.textContent = String(new Date().getFullYear());
  });
})();
