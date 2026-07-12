import { featuredData } from './data.js';

function renderFeaturedData() {
  const container = document.querySelector('#app');

  if (!container) {
    return;
  }

  container.innerHTML = '';

  const heading = document.createElement('h1');
  heading.textContent = 'Data App';
  container.appendChild(heading);

  const intro = document.createElement('p');
  intro.textContent = 'This page renders sample data from the shared JavaScript module.';
  container.appendChild(intro);

  const section = document.createElement('section');
  section.className = 'data-section';

  featuredData.forEach((group) => {
    const card = document.createElement('article');
    card.className = 'card';

    const title = document.createElement('h2');
    title.textContent = group.title;

    const description = document.createElement('p');
    description.textContent = group.description;

    const list = document.createElement('ul');
    list.className = 'data-list';

    group.items.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.textContent = item;
      list.appendChild(listItem);
    });

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(list);
    section.appendChild(card);
  });

  container.appendChild(section);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderFeaturedData);
} else {
  renderFeaturedData();
}