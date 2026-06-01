import { renderNavbar } from '../components/Navbar.js';
import { renderFooter } from '../components/Footer.js';
import { renderHero } from '../components/Hero.js';
import { renderPagination } from '../components/Pagination.js';
import { createPeopleCard } from '../components/Card.js';
import { getTrendingPeople, getPopularPeople } from '../api/peopleService.js';

async function loadPeoplePage(app, page = 1) {
  const data = await getPopularPeople(page);

  const existing = app.querySelector('.all-people-section');
  if (existing) existing.remove();

  const existingPagination = app.querySelector('.pagination');
  if (existingPagination) existingPagination.remove();

  const section = document.createElement('section');
  section.className = 'section all-people-section';
  section.innerHTML = `<h2 class="section__title">All Celebrities</h2>`;

  const grid = document.createElement('div');
  grid.className = 'cards-grid';

  data.results.forEach(person => grid.appendChild(createPeopleCard(person)));
  section.appendChild(grid);

  app.querySelector('main').appendChild(section);

  const pagination = renderPagination(page, data.total_pages, (newPage) => {
    loadPeoplePage(app, newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  app.querySelector('main').appendChild(pagination);
}

export async function renderCelebrities() {
  const app = document.getElementById('app');
  app.innerHTML = '<div class="loader">Loading...</div>';

  try {
    const trendingPeople = await getTrendingPeople();

    app.innerHTML = '';
    app.appendChild(renderNavbar());
    app.appendChild(renderHero(trendingPeople.results, 'person'));

    const main = document.createElement('main');
    main.className = 'main';

    const trendingSection = document.createElement('section');
    trendingSection.className = 'section';
    trendingSection.innerHTML = `<h2 class="section__title">Trending Celebrities</h2>`;
    const trendingGrid = document.createElement('div');
    trendingGrid.className = 'cards-grid';
    trendingPeople.results.slice(0, 10).forEach(p => trendingGrid.appendChild(createPeopleCard(p)));
    trendingSection.appendChild(trendingGrid);
    main.appendChild(trendingSection);

    app.appendChild(main);
    app.appendChild(renderFooter());

    await loadPeoplePage(app, 1);

  } catch (err) {
    app.innerHTML = `<p class="error">Something went wrong. Please try again.</p>`;
    console.error(err);
  }
}