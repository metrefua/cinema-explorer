export function getPosterURL(path) {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
  return `https://image.tmdb.org/t/p/w500${path}`;
}

export function getBackdropURL(path) {
  if (!path) return 'https://via.placeholder.com/1280x720?text=No+Image';
  return `https://image.tmdb.org/t/p/original${path}`;
}

export function formatRating(rating) {
  return rating ? rating.toFixed(1) : 'N/A';
}

export function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).getFullYear();
}