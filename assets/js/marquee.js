// marquee.js
// Botón para pausar / reanudar el texto en movimiento de Proyectos.
// Con "reducir movimiento" activado la animación ya está parada por CSS y el botón se oculta.
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const marquee = document.querySelector('.marquee');
    const btn = document.querySelector('.marquee-toggle');
    if (!marquee || !btn) return;
    btn.addEventListener('click', function () {
      const paused = marquee.classList.toggle('is-paused');
      btn.setAttribute('aria-pressed', String(paused));
      btn.textContent = paused ? 'Reanudar animación' : 'Pausar animación';
    });
  });
})();
