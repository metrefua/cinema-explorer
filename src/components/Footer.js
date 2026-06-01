export function renderFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';

  footer.innerHTML = `
    <div class="footer__content">
      <p>🎬 CineExplorer — Powered by <a href="https://www.themoviedb.org/" target="_blank">TMDB</a></p>
      <p class="footer__disclaimer">This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
    </div>
  `;

  return footer;
}