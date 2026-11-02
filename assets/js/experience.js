// experience.js
// Trayectoria: en escritorio los detalles de cada entrada se ven siempre (columna derecha);
// en móvil siguen plegables para no alargar la página.
(function () {
  const mq = window.matchMedia('(min-width: 861px)');
  function sync() {
    document.querySelectorAll('.xp-details').forEach(d => { d.open = mq.matches; });
  }
  document.addEventListener('DOMContentLoaded', sync);
  mq.addEventListener('change', sync);
})();
