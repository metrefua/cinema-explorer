import { getBackdropURL, formatRating } from '../utils/helpers.js';

export function renderHero(items, type = 'movie') {
  const section = document.createElement('section');
  section.className = 'hero';

  const slides = items.slice(0, 5);
  let currentIndex = 0;
  let intervalId = null;

  function getTitle(item) {
    if (type === 'movie') return item.title;
    if (type === 'series') return item.name;
    return item.name;
  }

  function buildSlide(item) {
    return `
      <div class="hero__slide" style="background-image: url('${getBackdropURL(item.backdrop_path)}')">
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
    <button class="hero__btn hero__btn--prev" aria-label="Previous slide">&#8249;</button>
    <button class="hero__btn hero__btn--next" aria-label="Next slide">&#8250;</button>
  `;

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

  intervalId = setInterval(() => goTo(currentIndex + 1), 5000);

  // clear interval when section is removed from DOM
  const observer = new MutationObserver(() => {
    if (!document.contains(section)) {
      clearInterval(intervalId);
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  return section;
}