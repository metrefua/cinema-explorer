import { apiFetch } from './apiClient.js';

const BASE = 'https://api.themoviedb.org/3';

export const getMovieGenres = () =>
  apiFetch(`${BASE}/genre/movie/list?language=en`);

export const getTVGenres = () =>
  apiFetch(`${BASE}/genre/tv/list?language=en`);