import { renderNavbar } from '../components/Navbar.js';
import { renderFooter } from '../components/Footer.js';
import { renderHero } from '../components/Hero.js';
import { renderSidebar } from '../components/Sidebar.js';
import { renderPagination } from '../components/Pagination.js';
import { createMovieCard } from '../components/Card.js';
import { getNowPlayingMovies, getTrendingMovies, getMoviesByGenre } from '../api/movieService.js';
import { getMovieGenres } from '../api/genreService.js';
import { renderPageSkeleton } from '../components/Skeleton.js';

let currentGenreId = null;

async function loadGenreMovies(genreSection, paginationContainer, genreId, page = 1) {
  currentGenreId = genreId;
  genreSection.innerHTML = '<p style="color:var(--text-muted);padding:1rem;">Loading...</p>';
  paginationContainer.innerHTML = '';

  const data = await getMoviesByGenre(genreId, page);

  genreSection.innerHTML = '<h2 class="section__title">Genre Movies</h2>';
  const grid = document.createElement('div');
  grid.className = 'cards-grid';

  if (!data.results.length) {
    genreSection.innerHTML += '<p style="color:var(--text-muted);padding:1rem;">No results found.</p>';
    return;
  }

  data.results.forEach(movie => grid.appendChild(createMovieCard(movie)));
  genreSection.appendChild(grid);

  paginationContainer.appendChild(
    renderPagination(page, data.total_pages, (newPage) => {
      loadGenreMovies(genreSection, paginationContainer, genreId, newPage);
    })
  );
}

export async function renderMovies() {
  const app = document.getElementById('app');
  app.innerHTML = '';
  app.appendChild(renderNavbar());
  app.appendChild(renderPageSkeleton());

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
    trendingSection.innerHTML = '<h2 class="section__title">Trending Movies</h2>';
    const trendingGrid = document.createElement('div');
    trendingGrid.className = 'cards-grid';
    trendingMovies.results.slice(0, 10).forEach(m => trendingGrid.appendChild(createMovieCard(m)));
    trendingSection.appendChild(trendingGrid);
    main.appendChild(trendingSection);

    // sidebar + genre content side by side
    const layout = document.createElement('div');
    layout.className = 'movies-layout';

    const sidebar = renderSidebar(genres.genres, (genreId) => {
      loadGenreMovies(genreSection, paginationContainer, genreId, 1);
    }, genres.genres[0].id);

    const rightCol = document.createElement('div');
    rightCol.className = 'movies-content';

    const genreSection = document.createElement('section');
    genreSection.className = 'section';

    const paginationContainer = document.createElement('div');

    rightCol.appendChild(genreSection);
    rightCol.appendChild(paginationContainer);
    layout.appendChild(sidebar);
    layout.appendChild(rightCol);
    main.appendChild(layout);
    app.appendChild(main);
    app.appendChild(renderFooter());

    await loadGenreMovies(genreSection, paginationContainer, genres.genres[0].id, 1);

  } catch (err) {
    app.innerHTML = '<p class="error">Something went wrong. Please try again.</p>';
    console.error(err);
  }
}