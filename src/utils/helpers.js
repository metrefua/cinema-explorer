import { IMAGE_BASE_URL, IMAGE_SIZES } from './constants.js';

export function getPosterURL(path, size = IMAGE_SIZES.poster) {
  if (!path) return '/assets/hero.png';
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

export function getBackdropURL(path) {
  if (!path) return '/assets/hero.png';
  return `${IMAGE_BASE_URL}/${IMAGE_SIZES.backdrop}${path}`;
}

export function formatRating(rating) {
  return rating ? rating.toFixed(1) : 'N/A';
}

export function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).getFullYear();
}