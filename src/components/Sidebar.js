export function renderSidebar(genres, onGenreSelect, activeGenreId = null) {
  const aside = document.createElement('aside');
  aside.className = 'sidebar';

  aside.innerHTML = `
    <h3 class="sidebar__title">Genres</h3>
    <ul class="sidebar__list">
      ${genres.map(genre => `
        <li class="sidebar__item ${genre.id === activeGenreId ? 'active' : ''}" data-id="${genre.id}">
          ${genre.name}
        </li>
      `).join('')}
    </ul>
  `;

  aside.querySelectorAll('.sidebar__item').forEach(item => {
    item.addEventListener('click', () => {
      aside.querySelectorAll('.sidebar__item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      onGenreSelect(+item.dataset.id);
    });
  });

  return aside;
}