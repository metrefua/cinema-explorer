import { navigate } from '../utils/router.js';

export function renderNavbar() {
  const nav = document.createElement('nav');
  nav.className = 'navbar';

  nav.innerHTML = `
    <div class="navbar__logo">
      <a href="#/">🎬 CineExplorer</a>
    </div>
    <ul class="navbar__links">
      <li><a href="#/" class="nav-link">Home</a></li>
      <li><a href="#/movies" class="nav-link">Movies</a></li>
      <li><a href="#/series" class="nav-link">Series</a></li>
      <li><a href="#/celebrities" class="nav-link">Celebrities</a></li>
    </ul>
  `;

  // highlight active link
  nav.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === (window.location.hash || '#/')) {
      link.classList.add('active');
    }
  });

  return nav;
}