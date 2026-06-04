import { renderHome } from '../pages/home.js';
import { renderMovies } from '../pages/movies.js';
import { renderSeries } from '../pages/series.js';
import { renderCelebrities } from '../pages/celebrities.js';
import { renderDetail } from '../pages/detail.js';
import { renderSearch } from '../pages/search.js';

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

    if (hash.startsWith('#/detail/')) {
      renderDetail();
      return;
    }

    if (hash.startsWith('#/search/')) {
      renderSearch();
      return;
    }

    const renderFn = routes[hash] || renderHome;
    renderFn();
  }

  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}