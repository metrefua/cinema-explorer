export function renderFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';

  footer.innerHTML = `
    <div class="footer__inner">
      <div class="footer__brand">
        <div class="footer__logo">🍿 CineExplorer</div>
        <p class="footer__tagline">Your ultimate destination for movies, series and celebrities.</p>
        <p class="footer__copy">© 2025 CineExplorer</p>
      </div>

      <div class="footer__col">
        <h4 class="footer__heading">Quick Links</h4>
        <ul class="footer__list">
          <li><a href="#/">Home</a></li>
          <li><a href="#/movies">Movies</a></li>
          <li><a href="#/series">Series</a></li>
          <li><a href="#/celebrities">Celebrities</a></li>
        </ul>
      </div>

      <div class="footer__col">
        <h4 class="footer__heading">By</h4>
        <ul class="footer__list">
          <li>Metrefua</li>
          <li><a href="https://www.themoviedb.org/" target="_blank">Powered by TMDB</a></li>
        </ul>
      </div>

      <div class="footer__col">
        <h4 class="footer__heading">Show Your Support</h4>
        <div class="footer__socials">
          <a href="https://github.com/metrefua" aria-label="GitHub" class="footer__social-btn">🐙</a>
          <a href="https://t.me/Metrefua" aria-label="Telegram" class="footer__social-btn">💼</a>
        </div>
        <p class="footer__disclaimer">This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
      </div>
    </div>
  `;

  return footer;
}