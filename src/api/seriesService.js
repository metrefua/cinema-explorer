import { apiFetch } from './apiClient.js';

const BASE = 'https://api.themoviedb.org/3';

export const getOnAirSeries = (page = 1) =>
  apiFetch(`${BASE}/tv/on_the_air?language=en-US&page=${page}`);

export const getTrendingSeries = () =>
  apiFetch(`${BASE}/trending/tv/week`);

export const getPopularSeries = (page = 1) =>
  apiFetch(`${BASE}/tv/popular?language=en-US&page=${page}`);

export const getSeriesByGenre = (genreId, page = 1) =>
  apiFetch(`${BASE}/discover/tv?with_genres=${genreId}&page=${page}&language=en-US`);

export const getSeriesDetails = (id) =>
  apiFetch(`${BASE}/tv/${id}?language=en-US&append_to_response=credits`);