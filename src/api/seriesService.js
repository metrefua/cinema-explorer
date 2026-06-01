import { API_BASE_URL } from '../utils/constants.js';

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
};

export async function getOnAirSeries(page = 1) {
  const res = await fetch(`${API_BASE_URL}/tv/on_the_air?language=en-US&page=${page}`, options);
  const data = await res.json();
  return data;
}

export async function getTrendingSeries() {
  const res = await fetch(`${API_BASE_URL}/trending/tv/week`, options);
  const data = await res.json();
  return data;
}

export async function getPopularSeries(page = 1) {
  const res = await fetch(`${API_BASE_URL}/tv/popular?language=en-US&page=${page}`, options);
  const data = await res.json();
  return data;
}

export async function getSeriesByGenre(genreId, page = 1) {
  const res = await fetch(`${API_BASE_URL}/discover/tv?with_genres=${genreId}&page=${page}&language=en-US`, options);
  const data = await res.json();
  return data;
}