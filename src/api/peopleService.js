import { API_BASE_URL } from '../utils/constants.js';

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
};

export async function getTrendingPeople() {
  const res = await fetch(`${API_BASE_URL}/trending/person/week`, options);
  const data = await res.json();
  return data;
}

export async function getPopularPeople(page = 1) {
  const res = await fetch(`${API_BASE_URL}/person/popular?language=en-US&page=${page}`, options);
  const data = await res.json();
  return data;
}