export function renderCardSkeletons(count = 10) {
  const grid = document.createElement('div');
  grid.className = 'cards-grid';

  for (let i = 0; i < count; i++) {
    const skeleton = document.createElement('div');
    skeleton.className = 'skeleton-card';
    skeleton.innerHTML = `
      <div class="skeleton skeleton--poster"></div>
      <div class="skeleton-info">
        <div class="skeleton skeleton--title"></div>
        <div class="skeleton skeleton--year"></div>
      </div>
    `;
    grid.appendChild(skeleton);
  }

  return grid;
}

export function renderPageSkeleton() {
  const wrapper = document.createElement('div');
  wrapper.className = 'main';
  wrapper.style.padding = '2rem';

  wrapper.innerHTML = `
    <div class="skeleton skeleton--hero"></div>
    <div style="margin-top: 2rem;">
      <div class="skeleton skeleton--section-title"></div>
    </div>
  `;

  const grid = renderCardSkeletons(10);
  wrapper.appendChild(grid);

  return wrapper;
}