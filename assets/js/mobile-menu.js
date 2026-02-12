/**
 * Mobile Menu Handler
 * Gestiona el menú hamburguesa y comportamientos móviles
 */

document.addEventListener('DOMContentLoaded', () => {
  // ========== ANIMACIONES "REVEAL" AL HACER SCROLL ==========
  const rev = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('show');
        rev.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  
  document.querySelectorAll('.reveal').forEach(el => rev.observe(el));

  // ========== MENÚ LATERAL MÓVIL ==========
  const toggle = document.querySelector(".nav-toggle");
  const closeBtn = document.querySelector(".close-menu");
  const sideMenu = document.querySelector(".side-menu");
  const overlay = document.querySelector(".overlay");

  function toggleMenu(open) {
    if (!sideMenu || !overlay) return;
    
    // Actualizar clases
    sideMenu.classList.toggle("active", open);
    overlay.classList.toggle("active", open);
    document.body.classList.toggle("no-scroll", open);
    
    // Actualizar button state
    if (toggle) {
      toggle.classList.toggle("active", open);
      toggle.setAttribute("aria-expanded", String(open));
    }
  }

  if (toggle) {
    toggle.addEventListener("click", () => toggleMenu(true));
    
    if (closeBtn) {
      closeBtn.addEventListener("click", () => toggleMenu(false));
    }
    
    if (overlay) {
      overlay.addEventListener("click", () => toggleMenu(false));
    }

    if (sideMenu) {
      sideMenu.querySelectorAll("a").forEach(link =>
        link.addEventListener("click", () => toggleMenu(false))
      );
    }
  }

  // Cerrar menú con tecla ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sideMenu?.classList.contains("active")) {
      toggleMenu(false);
    }
  });

  // ========== ESCONDER TOPBAR EN MÓVIL AL HACER SCROLL ==========
  const headerEl = document.querySelector('.header');
  let lastScroll = 0;
  
  if (headerEl) {
    window.addEventListener('scroll', () => {
      if (window.innerWidth > 768) return; // Solo en móvil
      
      const current = window.pageYOffset;
      
      if (current > lastScroll && current > 80) {
        headerEl.classList.add("hide");
      } else {
        headerEl.classList.remove("hide");
      }
      
      lastScroll = current;
    });
  }

  // Actualizar aria-expanded cuando se abre/cierra el menú
  const updateMenuState = () => {
    if (toggle && sideMenu) {
      const isOpen = sideMenu.classList.contains("active");
      toggle.setAttribute("aria-expanded", String(isOpen));
    }
  };

  // Watch para cambios en el menú
  const observer = new MutationObserver(updateMenuState);
  if (sideMenu) {
    observer.observe(sideMenu, { attributes: true, attributeFilter: ["class"] });
  }
});
