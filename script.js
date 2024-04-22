import { fetchData } from './data.js';

const itemsPerPage = 10;
let currentPage = 1;
let fetchedData; 

async function fetchDataAndProcess(startIndex) {
  try {
    fetchedData = await fetchData(); // Store fetched data

    // Check if fetchedData is an array
    if (!Array.isArray(fetchedData)) {
      throw new Error('Data fetched is not in the expected format');
    }

    // Process data in index.html
    // Example processing:
    const endIndex = Math.min(startIndex + itemsPerPage, fetchedData.length);
    const slicedData = fetchedData.slice(startIndex, endIndex);

    const newsContainer = document.querySelector('.news-item'); // Make sure this element exists in your HTML
    newsContainer.innerHTML = ''; // Clear previous content

    slicedData.forEach(news => {
      const div = document.createElement('div');
      div.style.display = 'flex';
      div.style.flexDirection = 'column';
      div.style.margin = '1rem auto';
      div.style.padding = '0.8rem';
      div.style.width = '40%';
      div.style.gap = '1rem';
      div.style.border = '1px solid grey';
      div.style.borderRadius = '1rem';

      const h2 = document.createElement('h2');
      h2.textContent = news.title;

      const p = document.createElement('p');
      p.textContent = news.author || 'No author'; // Handle cases where author might be missing

      const button = document.createElement('button');
      button.innerHTML = `<a href="#${news.id}">View Details</a>`;
      button.style.width = '50%';
      button.style.alignSelf = 'center';
      button.style.padding = '0.5rem';

      div.appendChild(h2);
      div.appendChild(p);
      div.appendChild(button);

      newsContainer.appendChild(div);
    });
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

const previousButton = document.querySelector('#prev-page');
const nextButton = document.querySelector('#next-page');

previousButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    fetchDataAndProcess((currentPage - 1) * itemsPerPage);
    updateButtonStates();
  }
});

nextButton.addEventListener('click', () => {
  if (currentPage < Math.ceil(fetchedData.length / itemsPerPage)) { // Use fetchedData here
    currentPage++;
    fetchDataAndProcess((currentPage - 1) * itemsPerPage);
    updateButtonStates();
  }
});

function updateButtonStates() {
  previousButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === Math.ceil(fetchedData.length / itemsPerPage); // Use fetchedData here
}

fetchDataAndProcess(0);  // Initial display
updateButtonStates();