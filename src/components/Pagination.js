export function renderPagination(currentPage, totalPages, onPageChange) {
  const nav = document.createElement('div');
  nav.className = 'pagination';

  const maxPages = Math.min(totalPages, 500); // TMDB caps at 500
  const prev = currentPage - 1;
  const next = currentPage + 1;

  nav.innerHTML = `
    <button class="pagination__btn" data-page="${prev}" ${currentPage === 1 ? 'disabled' : ''}>&#8249; Prev</button>
    <span class="pagination__info">Page ${currentPage} of ${maxPages}</span>
    <button class="pagination__btn" data-page="${next}" ${currentPage >= maxPages ? 'disabled' : ''}>Next &#8250;</button>
  `;

  nav.querySelectorAll('.pagination__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const page = +btn.dataset.page;
      if (page >= 1 && page <= maxPages) {
        onPageChange(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  return nav;
}