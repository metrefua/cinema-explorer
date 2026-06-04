import { renderNavbar } from '../components/Navbar.js';
import { renderFooter } from '../components/Footer.js';
import { renderPagination } from '../components/Pagination.js';
import { createMovieCard, createSeriesCard, createPeopleCard } from '../components/Card.js';
import { renderCardSkeletons } from '../components/Skeleton.js';
import { searchMulti } from '../api/searchService.js';

function getCardFn(item) {
  if (item.media_type === 'movie') return createMovieCard(item);
  if (item.media_type === 'tv') return createSeriesCard(item);
  if (item.media_type === 'person') return createPeopleCard(item);
  return null;
}

async function loadResults(main, query, page = 1) {
  const resultsSection = main.querySelector('.search-results');
  const paginationContainer = main.querySelector('.search-pagination');

  resultsSection.innerHTML = '';
  paginationContainer.innerHTML = '';
  resultsSection.appendChild(renderCardSkeletons(10));

  const data = await searchMulti(query, page);

  resultsSection.innerHTML = '';

  if (!data.results.length) {
    resultsSection.innerHTML = `
      <div class="empty-state">
        <p>😕 No results found for "<strong>${query}</strong>"</p>
        <p>Try a different search term.</p>
      </div>
    `;
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'cards-grid';

  data.results.forEach(item => {
    const card = getCardFn(item);
    if (card) grid.appendChild(card);
  });

  resultsSection.appendChild(grid);

  if (data.total_pages > 1) {
    paginationContainer.appendChild(
      renderPagination(page, data.total_pages, (newPage) => {
        loadResults(main, query, newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
    );
  }
}

export async function renderSearch() {
  const app = document.getElementById('app');
  app.innerHTML = '';

  const hash = window.location.hash;
  const query = decodeURIComponent(hash.replace('#/search/', ''));

  app.appendChild(renderNavbar());

  const main = document.createElement('main');
  main.className = 'main';

  main.innerHTML = `
    <div class="search-header">
      <h2 class="section__title">Search results for: <span class="search-query">"${query}"</span></h2>
    </div>
    <div class="search-results"></div>
    <div class="search-pagination"></div>
  `;

  app.appendChild(main);
  app.appendChild(renderFooter());

  await loadResults(main, query, 1);
}