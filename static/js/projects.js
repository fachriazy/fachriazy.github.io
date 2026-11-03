/* projects.js — category filter for the Projects page */
(function initProjectFilter() {
  const buttons = document.querySelectorAll('.pj-filter');
  const items = document.querySelectorAll('.pj-item');
  const sections = document.querySelectorAll('.pj-section');
  const empty = document.getElementById('pjEmpty');
  if (!buttons.length) return;

  // Show item counts on each button
  buttons.forEach(btn => {
    const f = btn.dataset.filter;
    const n = f === 'all' ? items.length
      : [...items].filter(el => el.dataset.tags.split(' ').includes(f)).length;
    const c = document.createElement('span');
    c.className = 'pj-count';
    c.textContent = n;
    btn.appendChild(c);
  });

  function apply(filter) {
    let shown = 0;
    items.forEach(el => {
      const match = filter === 'all' || el.dataset.tags.split(' ').includes(filter);
      el.classList.toggle('is-hidden', !match);
      if (match) {
        shown++;
        el.classList.add('aos-animate');
        el.querySelectorAll('[data-aos]').forEach(a => a.classList.add('aos-animate'));
      }
    });
    // Hide a section whose cards are all filtered out
    sections.forEach(sec => {
      if (sec.classList.contains('pj-item')) return;
      const inner = sec.querySelectorAll('.pj-item');
      if (!inner.length) return;
      const anyVisible = [...inner].some(el => !el.classList.contains('is-hidden'));
      sec.style.display = anyVisible ? '' : 'none';
    });
    if (empty) empty.classList.toggle('is-shown', shown === 0);
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      apply(btn.dataset.filter);
    });
  });
})();
