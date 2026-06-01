import { API_BASE_URL } from '../utils/constants.js';

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
};

export async function getNowPlayingMovies(page = 1) {
  const res = await fetch(`${API_BASE_URL}/movie/now_playing?language=en-US&page=${page}`, options);
  const data = await res.json();
  return data;
}

export async function getTrendingMovies() {
  const res = await fetch(`${API_BASE_URL}/trending/movie/week`, options);
  const data = await res.json();
  return data;
}

export async function getPopularMovies(page = 1) {
  const res = await fetch(`${API_BASE_URL}/movie/popular?language=en-US&page=${page}`, options);
  const data = await res.json();
  return data;
}

export async function getMoviesByGenre(genreId, page = 1) {
  const res = await fetch(`${API_BASE_URL}/discover/movie?with_genres=${genreId}&page=${page}&language=en-US`, options);
  const data = await res.json();
  return data;
}