import { renderNavbar } from '../components/Navbar.js';
import { renderFooter } from '../components/Footer.js';
import { renderHero } from '../components/Hero.js';
import { renderSidebar } from '../components/Sidebar.js';
import { renderPagination } from '../components/Pagination.js';
import { createSeriesCard } from '../components/Card.js';
import { getOnAirSeries, getTrendingSeries, getSeriesByGenre } from '../api/seriesService.js';
import { getTVGenres } from '../api/genreService.js';

async function loadGenreSeries(app, genreId, page = 1) {
  const data = await getSeriesByGenre(genreId, page);

  const existing = app.querySelector('.genre-section');
  if (existing) existing.remove();

  const existingPagination = app.querySelector('.pagination');
  if (existingPagination) existingPagination.remove();

  const section = document.createElement('section');
  section.className = 'section genre-section';
  section.innerHTML = `<h2 class="section__title">Genre Series</h2>`;

  const grid = document.createElement('div');
  grid.className = 'cards-grid';

  data.results.forEach(series => grid.appendChild(createSeriesCard(series)));
  section.appendChild(grid);

  const layout = app.querySelector('.movies-layout');
  layout.appendChild(section);

  const pagination = renderPagination(page, data.total_pages, (newPage) => {
    loadGenreSeries(app, genreId, newPage);
  });

  app.querySelector('main').appendChild(pagination);
}

export async function renderSeries() {
  const app = document.getElementById('app');
  app.innerHTML = '<div class="loader">Loading...</div>';

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
    trendingSection.innerHTML = `<h2 class="section__title">Trending Series</h2>`;
    const trendingGrid = document.createElement('div');
    trendingGrid.className = 'cards-grid';
    trendingSeries.results.slice(0, 10).forEach(s => trendingGrid.appendChild(createSeriesCard(s)));
    trendingSection.appendChild(trendingGrid);
    main.appendChild(trendingSection);

    const layout = document.createElement('div');
    layout.className = 'movies-layout';

    const sidebar = renderSidebar(genres.genres, (genreId) => {
      loadGenreSeries(app, genreId, 1);
    });

    layout.appendChild(sidebar);
    main.appendChild(layout);
    app.appendChild(main);
    app.appendChild(renderFooter());

    await loadGenreSeries(app, genres.genres[0].id, 1);

  } catch (err) {
    app.innerHTML = `<p class="error">Something went wrong. Please try again.</p>`;
    console.error(err);
  }
}