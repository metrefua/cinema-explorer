import { getBackdropURL, formatRating } from '../utils/helpers.js';

export function renderHero(items, type = 'movie') {
  const section = document.createElement('section');
  section.className = 'hero';

  const slides = items.slice(0, 5);
  let currentIndex = 0;

  function getTitle(item) {
    return type === 'movie' ? item.title : type === 'series' ? item.name : item.name;
  }

  function buildSlide(item) {
    return `
      <div class="hero__slide">
        <img 
          class="hero__bg" 
          src="${getBackdropURL(item.backdrop_path)}" 
          alt="${getTitle(item)}"
          referrerpolicy="no-referrer"
        />
        <div class="hero__overlay">
          <div class="hero__content">
            <h1 class="hero__title">${getTitle(item)}</h1>
            <p class="hero__overview">${item.overview?.slice(0, 150) || ''}...</p>
            ${item.vote_average ? `<span class="hero__rating">⭐ ${formatRating(item.vote_average)}</span>` : ''}
          </div>
        </div>
      </div>
    `;
  }

  section.innerHTML = `
    <div class="hero__carousel">
      ${slides.map(buildSlide).join('')}
    </div>
    <div class="hero__dots">
      ${slides.map((_, i) => `<span class="hero__dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`).join('')}
    </div>
    <button class="hero__btn hero__btn--prev">&#8249;</button>
    <button class="hero__btn hero__btn--next">&#8250;</button>
  `;

  // carousel logic
  const carousel = section.querySelector('.hero__carousel');
  const dots = section.querySelectorAll('.hero__dot');

  function goTo(index) {
    currentIndex = (index + slides.length) % slides.length;
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach(d => d.classList.remove('active'));
    dots[currentIndex].classList.add('active');
  }

  section.querySelector('.hero__btn--next').addEventListener('click', () => goTo(currentIndex + 1));
  section.querySelector('.hero__btn--prev').addEventListener('click', () => goTo(currentIndex - 1));
  dots.forEach(dot => dot.addEventListener('click', () => goTo(+dot.dataset.index)));

  // auto play
  setInterval(() => goTo(currentIndex + 1), 5000);

  return section;
}