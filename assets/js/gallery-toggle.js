/**
 * Toggle genérico para bloques colapsables (.collapse-wrapper + .btn-show-more).
 * El texto "colapsado" se captura del propio botón; el texto "expandido" se
 * puede personalizar con data-label-expanded en el botón (por defecto "Ver menos").
 */
function toggleGallery(wrapperId, btn) {
  const wrapper = document.getElementById(wrapperId);
  if (!wrapper) return;

  const isExpanded = wrapper.classList.toggle('expanded');
  const span = btn.querySelector('span');

  if (span) {
    if (!btn.dataset.labelCollapsed) {
      btn.dataset.labelCollapsed = span.textContent;
    }
    span.textContent = isExpanded
      ? (btn.dataset.labelExpanded || 'Ver menos')
      : btn.dataset.labelCollapsed;
  }

  if (!isExpanded) {
    wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
