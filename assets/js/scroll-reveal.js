// scroll-reveal.js
(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    // Si usuario prefiere reducir movimiento, mostramos todo sin animación
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  document.addEventListener('DOMContentLoaded', function () {
    // Seleccionamos elementos a animar: secciones, tarjetas y panels
    const nodes = document.querySelectorAll('section, .project-card, .experience-item, .card, .project-media');
    nodes.forEach(n => {
      n.classList.add('reveal');
      observer.observe(n);
    });
  });
})();