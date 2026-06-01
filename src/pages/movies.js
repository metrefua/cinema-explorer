import { renderNavbar } from '../components/Navbar.js';
import { renderFooter } from '../components/Footer.js';
import { renderHero } from '../components/Hero.js';
import { renderSidebar } from '../components/Sidebar.js';
import { renderPagination } from '../components/Pagination.js';
import { createMovieCard } from '../components/Card.js';
import { getNowPlayingMovies, getTrendingMovies, getMoviesByGenre } from '../api/movieService.js';
import { getMovieGenres } from '../api/genreService.js';

let currentPage = 1;
let currentGenreId = null;

async function loadGenreMovies(app, genreId, page = 1) {
  currentGenreId = genreId;
  currentPage = page;

  const data = await getMoviesByGenre(genreId, page);

  const existing = app.querySelector('.genre-section');
  if (existing) existing.remove();

  const existingPagination = app.querySelector('.pagination');
  if (existingPagination) existingPagination.remove();

  const section = document.createElement('section');
  section.className = 'section genre-section';
  section.innerHTML = `<h2 class="section__title">Genre Movies</h2>`;

  const grid = document.createElement('div');
  grid.className = 'cards-grid';

  data.results.forEach(movie => grid.appendChild(createMovieCard(movie)));
  section.appendChild(grid);

  const layout = app.querySelector('.movies-layout');
  layout.appendChild(section);

  const pagination = renderPagination(page, data.total_pages, (newPage) => {
    loadGenreMovies(app, genreId, newPage);
  });

  app.querySelector('main').appendChild(pagination);
}

export async function renderMovies() {
  const app = document.getElementById('app');
  app.innerHTML = '<div class="loader">Loading...</div>';

  try {
    const [nowPlaying, trendingMovies, genres] = await Promise.all([
      getNowPlayingMovies(),
      getTrendingMovies(),
      getMovieGenres(),
    ]);

    app.innerHTML = '';
    app.appendChild(renderNavbar());
    app.appendChild(renderHero(nowPlaying.results, 'movie'));

    const main = document.createElement('main');
    main.className = 'main';

    // trending section
    const trendingSection = document.createElement('section');
    trendingSection.className = 'section';
    trendingSection.innerHTML = `<h2 class="section__title">Trending Movies</h2>`;
    const trendingGrid = document.createElement('div');
    trendingGrid.className = 'cards-grid';
    trendingMovies.results.slice(0, 10).forEach(m => trendingGrid.appendChild(createMovieCard(m)));
    trendingSection.appendChild(trendingGrid);
    main.appendChild(trendingSection);

    // layout with sidebar
    const layout = document.createElement('div');
    layout.className = 'movies-layout';

    const sidebar = renderSidebar(genres.genres, (genreId) => {
      loadGenreMovies(app, genreId, 1);
    });

    layout.appendChild(sidebar);
    main.appendChild(layout);
    app.appendChild(main);
    app.appendChild(renderFooter());

    // load first genre by default
    await loadGenreMovies(app, genres.genres[0].id, 1);

  } catch (err) {
    app.innerHTML = `<p class="error">Something went wrong. Please try again.</p>`;
    console.error(err);
  }
}