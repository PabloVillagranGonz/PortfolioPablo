/**
 * Pestañas accesibles (role="tablist" / "tab" / "tabpanel").
 * Cada botón .pd-tab apunta a su panel con aria-controls; flechas izquierda/derecha cambian de pestaña.
 */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[role="tablist"]').forEach(list => {
    const tabs = Array.from(list.querySelectorAll('[role="tab"]'));

    function select(tab) {
      tabs.forEach(t => {
        const selected = t === tab;
        t.setAttribute('aria-selected', String(selected));
        t.tabIndex = selected ? 0 : -1;
        const panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = !selected;
      });
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(tab));
      tab.addEventListener('keydown', e => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
        select(next);
        next.focus();
      });
    });
  });
});
