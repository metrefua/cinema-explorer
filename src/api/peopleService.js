import { apiFetch } from './apiClient.js';

const BASE = 'https://api.themoviedb.org/3';

export const getTrendingPeople = () =>
  apiFetch(`${BASE}/trending/person/week`);

export const getPopularPeople = (page = 1) =>
  apiFetch(`${BASE}/person/popular?language=en-US&page=${page}`);

export const getPersonDetails = (id) =>
  apiFetch(`${BASE}/person/${id}?language=en-US&append_to_response=combined_credits`);