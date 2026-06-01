import { renderHome } from '../pages/home.js';
import { renderMovies } from '../pages/movies.js';
import { renderSeries } from '../pages/series.js';
import { renderCelebrities } from '../pages/celebrities.js';

const routes = {
  '#/': renderHome,
  '#/movies': renderMovies,
  '#/series': renderSeries,
  '#/celebrities': renderCelebrities,
};

export function navigate(hash) {
  window.location.hash = hash;
}

export function initRouter() {
  function handleRoute() {
    const hash = window.location.hash || '#/';
    const renderFn = routes[hash];

    if (renderFn) {
      renderFn();
    } else {
      renderHome();
    }
  }

  window.addEventListener('hashchange', handleRoute);
  handleRoute(); // run on first load
}