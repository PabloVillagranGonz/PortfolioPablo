// theme-toggle.js
(function () {
  const togglerId = 'theme-toggle';
  const storageKey = 'pv_theme';
  const root = document.documentElement;

  function setTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    updateButtonIcon();
  }

  function getStoredTheme() {
    try {
      return localStorage.getItem(storageKey);
    } catch (e) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem(storageKey, theme === 'dark' ? 'dark' : 'light');
    } catch (e) {}
  }

  function preferDark() {
    return window.matchMedia &&
           window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  // Iconos SVG (mismo estilo de línea que el resto de iconos del sitio)
  const ICON_SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
  const ICON_MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  function updateButtonIcon() {
    const btn = document.getElementById(togglerId);
    if (!btn) return;
    const isDark = root.getAttribute('data-theme') === 'dark';
    btn.innerHTML = isDark ? ICON_SUN : ICON_MOON;
    btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
  }

  /* ========= APLICAR TEMA INMEDIATAMENTE ========= */

  const stored = getStoredTheme();

  if (stored === 'dark') {
    root.setAttribute('data-theme', 'dark');
  } else if (!stored && preferDark()) {
    root.setAttribute('data-theme', 'dark');
  }

  /* ========= DOM READY SOLO PARA EL BOTÓN ========= */

  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById(togglerId);
    if (!btn) return;

    updateButtonIcon();

    btn.addEventListener('click', function () {
      const isDark = root.getAttribute('data-theme') === 'dark';
      const next = isDark ? 'light' : 'dark';
      setTheme(next);
      storeTheme(next);
    });
  });

})();