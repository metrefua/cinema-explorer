import { apiFetch } from './apiClient.js';

const BASE = 'https://api.themoviedb.org/3';

export const getNowPlayingMovies = (page = 1) =>
  apiFetch(`${BASE}/movie/now_playing?language=en-US&page=${page}`);

export const getTrendingMovies = () =>
  apiFetch(`${BASE}/trending/movie/week`);

export const getPopularMovies = (page = 1) =>
  apiFetch(`${BASE}/movie/popular?language=en-US&page=${page}`);

export const getMoviesByGenre = (genreId, page = 1) =>
  apiFetch(`${BASE}/discover/movie?with_genres=${genreId}&page=${page}&language=en-US`);

export const getMovieDetails = (id) =>
  apiFetch(`${BASE}/movie/${id}?language=en-US&append_to_response=credits`);