import { renderNavbar } from '../components/Navbar.js';
import { renderFooter } from '../components/Footer.js';
import { getMovieDetails } from '../api/movieService.js';
import { getSeriesDetails } from '../api/seriesService.js';
import { getPersonDetails } from '../api/peopleService.js';
import { getPosterURL, getBackdropURL, formatRating, formatDate } from '../utils/helpers.js';

async function fetchDetails(type, id) {
  if (type === 'movie') return { data: await getMovieDetails(id), type };
  if (type === 'series') return { data: await getSeriesDetails(id), type };
  if (type === 'person') return { data: await getPersonDetails(id), type };
}

function renderMovieDetail(data) {
  return `
    <div class="detail__hero" style="background-image: url('${getBackdropURL(data.backdrop_path)}')">
      <div class="detail__hero-overlay">
        <img class="detail__poster" src="${getPosterURL(data.poster_path)}" alt="${data.title}" referrerpolicy="no-referrer"/>
        <div class="detail__hero-info">
          <h1 class="detail__title">${data.title}</h1>
          <div class="detail__meta">
            <span class="detail__badge">⭐ ${formatRating(data.vote_average)}</span>
            <span class="detail__badge">${formatDate(data.release_date)}</span>
            <span class="detail__badge">${data.runtime ? data.runtime + ' min' : ''}</span>
            ${data.genres?.map(g => `<span class="detail__badge detail__badge--genre">${g.name}</span>`).join('') || ''}
          </div>
          <p class="detail__overview">${data.overview}</p>
        </div>
      </div>
    </div>
    ${data.credits?.cast?.length ? `
    <section class="section">
      <h2 class="section__title">Cast</h2>
      <div class="detail__cast">
        ${data.credits.cast.slice(0, 8).map(person => `
          <div class="detail__cast-card">
            <img src="${getPosterURL(person.profile_path)}" alt="${person.name}" referrerpolicy="no-referrer"/>
            <p class="detail__cast-name">${person.name}</p>
            <p class="detail__cast-role">${person.character}</p>
          </div>
        `).join('')}
      </div>
    </section>` : ''}
  `;
}

function renderSeriesDetail(data) {
  return `
    <div class="detail__hero" style="background-image: url('${getBackdropURL(data.backdrop_path)}')">
      <div class="detail__hero-overlay">
        <img class="detail__poster" src="${getPosterURL(data.poster_path)}" alt="${data.name}" referrerpolicy="no-referrer"/>
        <div class="detail__hero-info">
          <h1 class="detail__title">${data.name}</h1>
          <div class="detail__meta">
            <span class="detail__badge">⭐ ${formatRating(data.vote_average)}</span>
            <span class="detail__badge">${formatDate(data.first_air_date)}</span>
            <span class="detail__badge">${data.number_of_seasons} Season${data.number_of_seasons > 1 ? 's' : ''}</span>
            ${data.genres?.map(g => `<span class="detail__badge detail__badge--genre">${g.name}</span>`).join('') || ''}
          </div>
          <p class="detail__overview">${data.overview}</p>
        </div>
      </div>
    </div>
    ${data.credits?.cast?.length ? `
    <section class="section">
      <h2 class="section__title">Cast</h2>
      <div class="detail__cast">
        ${data.credits.cast.slice(0, 8).map(person => `
          <div class="detail__cast-card">
            <img src="${getPosterURL(person.profile_path)}" alt="${person.name}" referrerpolicy="no-referrer"/>
            <p class="detail__cast-name">${person.name}</p>
            <p class="detail__cast-role">${person.character}</p>
          </div>
        `).join('')}
      </div>
    </section>` : ''}
  `;
}

function renderPersonDetail(data) {
  const knownFor = data.combined_credits?.cast?.slice(0, 8) || [];
  return `
    <div class="detail__person">
      <img class="detail__person-img" src="${getPosterURL(data.profile_path)}" alt="${data.name}" referrerpolicy="no-referrer"/>
      <div class="detail__person-info">
        <h1 class="detail__title">${data.name}</h1>
        <div class="detail__meta">
          <span class="detail__badge">${data.known_for_department || ''}</span>
          ${data.birthday ? `<span class="detail__badge">🎂 ${data.birthday}</span>` : ''}
          ${data.place_of_birth ? `<span class="detail__badge">📍 ${data.place_of_birth}</span>` : ''}
        </div>
        <p class="detail__overview">${data.biography?.slice(0, 500) || 'No biography available.'}${data.biography?.length > 500 ? '...' : ''}</p>
      </div>
    </div>
    ${knownFor.length ? `
    <section class="section">
      <h2 class="section__title">Known For</h2>
      <div class="detail__cast">
        ${knownFor.map(item => `
          <div class="detail__cast-card">
            <img src="${getPosterURL(item.poster_path)}" alt="${item.title || item.name}" referrerpolicy="no-referrer"/>
            <p class="detail__cast-name">${item.title || item.name}</p>
            <p class="detail__cast-role">${formatDate(item.release_date || item.first_air_date)}</p>
          </div>
        `).join('')}
      </div>
    </section>` : ''}
  `;
}

export async function renderDetail() {
  const app = document.getElementById('app');
  app.innerHTML = '<div class="loader">Loading...</div>';

  const hash = window.location.hash;
  const parts = hash.replace('#/detail/', '').split('/');
  const type = parts[0];
  const id = parts[1];

  if (!type || !id) {
    app.innerHTML = '<p class="error">Invalid page.</p>';
    return;
  }

  try {
    const { data } = await fetchDetails(type, id);

    app.innerHTML = '';
    app.appendChild(renderNavbar());

    const main = document.createElement('main');
    main.className = 'main';

    if (type === 'movie') main.innerHTML = renderMovieDetail(data);
    else if (type === 'series') main.innerHTML = renderSeriesDetail(data);
    else if (type === 'person') main.innerHTML = renderPersonDetail(data);

    app.appendChild(main);
    app.appendChild(renderFooter());

  } catch (err) {
    app.innerHTML = '<p class="error">Something went wrong. Please try again.</p>';
    console.error(err);
  }
}