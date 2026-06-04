import { apiFetch } from './apiClient.js';

const BASE = 'https://api.themoviedb.org/3';

export const searchMulti = (query, page = 1) =>
  apiFetch(`${BASE}/search/multi?query=${encodeURIComponent(query)}&page=${page}&language=en-US`);