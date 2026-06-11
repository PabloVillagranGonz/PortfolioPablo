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
        
        // Si es una lista de tecnologías, animamos los hijos con stagger
        if (entry.target.classList.contains('tech-list')) {
          const pills = entry.target.querySelectorAll('.tech-pill');
          pills.forEach((pill, index) => {
            pill.style.animationDelay = `${index * 0.05}s`;
          });
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  document.addEventListener('DOMContentLoaded', function () {
    // 1. Barra de progreso de lectura
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
      window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
      }, { passive: true });
    }

    // 2. Animación de elementos (Scroll Reveal)
    const nodes = document.querySelectorAll('section, .project-card, .experience-item, .card, .project-media, .tech-list');
    nodes.forEach(n => {
      n.classList.add('reveal');
      observer.observe(n);
    });
  });
})();