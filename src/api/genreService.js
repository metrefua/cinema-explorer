import { API_BASE_URL } from '../utils/constants.js';

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
};

export async function getMovieGenres() {
  const res = await fetch(`${API_BASE_URL}/genre/movie/list?language=en`, options);
  const data = await res.json();
  return data;
}

export async function getTVGenres() {
  const res = await fetch(`${API_BASE_URL}/genre/tv/list?language=en`, options);
  const data = await res.json();
  return data;
}