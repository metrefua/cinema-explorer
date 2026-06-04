const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const fetchOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
};

export async function apiFetch(url) {
  const res = await fetch(url, fetchOptions);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  return data;
}