export function renderNavbar() {
  const nav = document.createElement('nav');
  nav.className = 'navbar';

  nav.innerHTML = `
    <div class="navbar__logo">
      <a href="#/">🎬 CineExplorer</a>
    </div>
    <button class="navbar__hamburger" id="hamburger" aria-label="Toggle menu">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <ul class="navbar__links" id="navbar-links">
      <li><a href="#/" class="nav-link" data-route="#/">Home</a></li>
      <li><a href="#/movies" class="nav-link" data-route="#/movies">Movies</a></li>
      <li><a href="#/series" class="nav-link" data-route="#/series">Series</a></li>
      <li><a href="#/celebrities" class="nav-link" data-route="#/celebrities">Celebrities</a></li>
    </ul>
  `;

  // active link
  function updateActiveLink() {
    const hash = window.location.hash || '#/';
    nav.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.route === hash);
    });
  }

  updateActiveLink();
  window.addEventListener('hashchange', updateActiveLink);

  // hamburger toggle
  const hamburger = nav.querySelector('#hamburger');
  const links = nav.querySelector('#navbar-links');

  hamburger.addEventListener('click', () => {
    links.classList.toggle('open');
    hamburger.classList.toggle('open');
  });

  // close menu on link click
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });

  return nav;
}