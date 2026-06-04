export function renderNavbar() {
  const nav = document.createElement('nav');
  nav.className = 'navbar';

  nav.innerHTML = `
    <div class="navbar__logo">
      <a href="#/">🍿 CineExplorer</a>
    </div>
    <ul class="navbar__links" id="navbar-links">
      <li><a href="#/" class="nav-link" data-route="#/">Home</a></li>
      <li><a href="#/movies" class="nav-link" data-route="#/movies">Movies</a></li>
      <li><a href="#/series" class="nav-link" data-route="#/series">Series</a></li>
      <li><a href="#/celebrities" class="nav-link" data-route="#/celebrities">Celebrities</a></li>
    </ul>
    <div class="navbar__search">
      <input type="text" class="navbar__search-input" id="search-input" placeholder="Search for movies or shows..."/>
      <button class="navbar__search-btn" id="search-btn" aria-label="Search">🔍</button>
    </div>
    <button class="navbar__hamburger" id="hamburger" aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </button>
  `;

  function updateActiveLink() {
    const hash = window.location.hash || '#/';
    nav.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.route === hash);
    });
  }

  updateActiveLink();
  window.addEventListener('hashchange', updateActiveLink);

  const hamburger = nav.querySelector('#hamburger');
  const links = nav.querySelector('#navbar-links');

  hamburger.addEventListener('click', () => {
    links.classList.toggle('open');
    hamburger.classList.toggle('open');
  });

  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });

  // search
  const searchBtn = nav.querySelector('#search-btn');
  const searchInput = nav.querySelector('#search-input');

  function doSearch() {
    const query = searchInput.value.trim();
    if (!query) return;
    window.location.hash = `#/search/${encodeURIComponent(query)}`;
  }

  searchBtn.addEventListener('click', doSearch);
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') doSearch();
  });

  return nav;
}