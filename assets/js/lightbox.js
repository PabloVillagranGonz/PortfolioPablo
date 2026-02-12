document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.gallery img');
  if (!images.length) return; // evita errores si no hay galería

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const btnClose = document.querySelector('.lightbox-close');
  const btnPrev = document.querySelector('.lightbox-prev');
  const btnNext = document.querySelector('.lightbox-next');

  let currentIndex = 0;
  const srcList = Array.from(images).map(img => img.src);

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = srcList[currentIndex];
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % srcList.length;
    lightboxImg.src = srcList[currentIndex];
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + srcList.length) % srcList.length;
    lightboxImg.src = srcList[currentIndex];
  }

  images.forEach((img, i) => {
    img.addEventListener('click', () => openLightbox(i));
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