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
      if (theme === 'dark') {
        localStorage.setItem(storageKey, 'dark');
      } else {
        localStorage.removeItem(storageKey);
      }
    } catch (e) {}
  }

  function preferDark() {
    return window.matchMedia &&
           window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function updateButtonIcon() {
    const btn = document.getElementById(togglerId);
    if (!btn) return;
    const isDark = root.getAttribute('data-theme') === 'dark';
    btn.textContent = isDark ? '☀️' : '🌙';
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