// back-to-top.js
// Botón flotante con flecha que aparece al bajar y lleva al principio de la página.
// También gestiona los enlaces "Volver arriba" del footer.
(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function toTop(e) {
    if (e) e.preventDefault();
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
    // Devolvemos el foco al inicio para quien navega con teclado
    const target = document.querySelector('.brand') || document.body;
    target.focus({ preventScroll: true });
  }

  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Volver arriba');
    btn.title = 'Volver arriba';
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>';
    btn.addEventListener('click', toTop);
    document.body.appendChild(btn);

    document.querySelectorAll('.footer-top').forEach(a => a.addEventListener('click', toTop));

    let ticking = false;
    function update() {
      btn.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.8);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  });
})();
