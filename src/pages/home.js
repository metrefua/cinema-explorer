import { renderNavbar } from '../components/Navbar.js';
import { renderFooter } from '../components/Footer.js';
import { renderHero } from '../components/Hero.js';
import { createMovieCard, createSeriesCard, createPeopleCard } from '../components/Card.js';
import { getNowPlayingMovies, getTrendingMovies } from '../api/movieService.js';
import { getTrendingSeries } from '../api/seriesService.js';
import { getTrendingPeople } from '../api/peopleService.js';
import { renderPageSkeleton } from '../components/Skeleton.js';

function createSection(title, items, cardFn) {
  const section = document.createElement('section');
  section.className = 'section';
  section.innerHTML = `<h2 class="section__title">${title}</h2>`;
  const grid = document.createElement('div');
  grid.className = 'cards-grid';
  items.forEach(item => grid.appendChild(cardFn(item)));
  section.appendChild(grid);
  return section;
}

export async function renderHome() {
  const app = document.getElementById('app');
  app.innerHTML = '';
  app.appendChild(renderNavbar());
  app.appendChild(renderPageSkeleton());

  try {
    const [nowPlaying, trendingMovies, trendingSeries, trendingPeople] = await Promise.all([
      getNowPlayingMovies(),
      getTrendingMovies(),
      getTrendingSeries(),
      getTrendingPeople(),
    ]);

    app.innerHTML = '';
    app.appendChild(renderNavbar());
    app.appendChild(renderHero(nowPlaying.results, 'movie'));

    const main = document.createElement('main');
    main.className = 'main';

    main.appendChild(createSection('Trending Movies', trendingMovies.results.slice(0, 10), createMovieCard));
    main.appendChild(createSection('Trending Series', trendingSeries.results.slice(0, 10), createSeriesCard));
    main.appendChild(createSection('Trending People', trendingPeople.results.slice(0, 10), createPeopleCard));

    app.appendChild(main);
    app.appendChild(renderFooter());

  } catch (err) {
    app.innerHTML = '<p class="error">Something went wrong. Please try again.</p>';
    console.error(err);
  }
}