import { renderNavbar } from '../components/Navbar.js';
import { renderFooter } from '../components/Footer.js';
import { renderHero } from '../components/Hero.js';
import { renderSidebar } from '../components/Sidebar.js';
import { renderPagination } from '../components/Pagination.js';
import { createSeriesCard } from '../components/Card.js';
import { getOnAirSeries, getTrendingSeries, getSeriesByGenre } from '../api/seriesService.js';
import { getTVGenres } from '../api/genreService.js';
import { renderPageSkeleton } from '../components/Skeleton.js';

async function loadGenreSeries(genreSection, paginationContainer, genreId, page = 1) {
  genreSection.innerHTML = '<p style="color:var(--text-muted);padding:1rem;">Loading...</p>';
  paginationContainer.innerHTML = '';

  const data = await getSeriesByGenre(genreId, page);

  genreSection.innerHTML = '<h2 class="section__title">Genre Series</h2>';
  const grid = document.createElement('div');
  grid.className = 'cards-grid';

  if (!data.results.length) {
    genreSection.innerHTML += '<p style="color:var(--text-muted);padding:1rem;">No results found.</p>';
    return;
  }

  data.results.forEach(series => grid.appendChild(createSeriesCard(series)));
  genreSection.appendChild(grid);

  paginationContainer.appendChild(
    renderPagination(page, data.total_pages, (newPage) => {
      loadGenreSeries(genreSection, paginationContainer, genreId, newPage);
    })
  );
}

export async function renderSeries() {
  const app = document.getElementById('app');
  app.innerHTML = '';
  app.appendChild(renderNavbar());
  app.appendChild(renderPageSkeleton());
  try {
    const [onAir, trendingSeries, genres] = await Promise.all([
      getOnAirSeries(),
      getTrendingSeries(),
      getTVGenres(),
    ]);

    app.innerHTML = '';
    app.appendChild(renderNavbar());
    app.appendChild(renderHero(onAir.results, 'series'));

    const main = document.createElement('main');
    main.className = 'main';

    const trendingSection = document.createElement('section');
    trendingSection.className = 'section';
    trendingSection.innerHTML = '<h2 class="section__title">Trending Series</h2>';
    const trendingGrid = document.createElement('div');
    trendingGrid.className = 'cards-grid';
    trendingSeries.results.slice(0, 10).forEach(s => trendingGrid.appendChild(createSeriesCard(s)));
    trendingSection.appendChild(trendingGrid);
    main.appendChild(trendingSection);

    const layout = document.createElement('div');
    layout.className = 'movies-layout';

    const rightCol = document.createElement('div');
    rightCol.className = 'movies-content';

    const genreSection = document.createElement('section');
    genreSection.className = 'section';

    const paginationContainer = document.createElement('div');

    const sidebar = renderSidebar(genres.genres, (genreId) => {
      loadGenreSeries(genreSection, paginationContainer, genreId, 1);
    }, genres.genres[0].id);

    rightCol.appendChild(genreSection);
    rightCol.appendChild(paginationContainer);
    layout.appendChild(sidebar);
    layout.appendChild(rightCol);
    main.appendChild(layout);
    app.appendChild(main);
    app.appendChild(renderFooter());

    await loadGenreSeries(genreSection, paginationContainer, genres.genres[0].id, 1);

  } catch (err) {
    app.innerHTML = '<p class="error">Something went wrong. Please try again.</p>';
    console.error(err);
  }
}