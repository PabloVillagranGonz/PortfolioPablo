document.addEventListener('DOMContentLoaded', () => {
  const galleries = document.querySelectorAll('.gallery');
  if (!galleries.length) return; // evita errores si no hay galería

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const caption = document.querySelector('.lightbox-caption');
  const btnClose = document.querySelector('.lightbox-close');
  const btnPrev = document.querySelector('.lightbox-prev');
  const btnNext = document.querySelector('.lightbox-next');

  // Se navega solo dentro de la galería en la que se ha hecho clic
  let current = [];
  let currentIndex = 0;

  function show() {
    const img = current[currentIndex];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    if (caption) caption.textContent = img.alt;
  }

  function openLightbox(images, index) {
    current = images;
    currentIndex = index;
    show();
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    btnClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % current.length;
    show();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + current.length) % current.length;
    show();
  }

  galleries.forEach(gallery => {
    const images = Array.from(gallery.querySelectorAll('img'));
    images.forEach((img, i) => {
      img.addEventListener('click', () => openLightbox(images, i));
    });
  });

  btnClose.addEventListener('click', closeLightbox);
  btnNext.addEventListener('click', showNext);
  btnPrev.addEventListener('click', showPrev);

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
});
