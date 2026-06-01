import { getPosterURL, formatRating, formatDate } from '../utils/helpers.js';

export function createMovieCard(movie) {
  const card = document.createElement('div');
  card.className = 'card';

  card.innerHTML = `
    <div class="card__poster">
      <img src="${getPosterURL(movie.poster_path)}" alt="${movie.title}" loading="lazy"/>
      <span class="card__rating">⭐ ${formatRating(movie.vote_average)}</span>
    </div>
    <div class="card__info">
      <h3 class="card__title">${movie.title}</h3>
      <p class="card__year">${formatDate(movie.release_date)}</p>
    </div>
  `;

  return card;
}

export function createSeriesCard(series) {
  const card = document.createElement('div');
  card.className = 'card';

  card.innerHTML = `
    <div class="card__poster">
      <img src="${getPosterURL(series.poster_path)}" alt="${series.name}" loading="lazy"/>
      <span class="card__rating">⭐ ${formatRating(series.vote_average)}</span>
    </div>
    <div class="card__info">
      <h3 class="card__title">${series.name}</h3>
      <p class="card__year">${formatDate(series.first_air_date)}</p>
    </div>
  `;

  return card;
}

export function createPeopleCard(person) {
  const card = document.createElement('div');
  card.className = 'card card--person';

  card.innerHTML = `
    <div class="card__poster">
      <img src="${getPosterURL(person.profile_path)}" alt="${person.name}" loading="lazy"/>
    </div>
    <div class="card__info">
      <h3 class="card__title">${person.name}</h3>
      <p class="card__year">${person.known_for_department || ''}</p>
    </div>
  `;

  return card;
}