// customScript.js
import articlesModule from '../articles.js';

let currentPage = 1;  // set variable for initialize currentPage

// Function to initialize the page & setting up event listeners
function initializePage() {
    // fetch and display for the first page
    fetchAndDisplayArticles(currentPage);
}

// Function to clear the list and create new elements for articles
function clearListAndDisplayArticles(data) {
    const newsList = document.querySelector('.news-list');
    const articlesPerPage = 6;
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;

    // Clear the list for every new page
    newsList.innerHTML = '';

    // Callback function... creating new element for each new article
    data.articles.slice(startIndex, endIndex).forEach((article) => {
        let li = document.createElement('li');
        let articleContainer = document.createElement('div'); // container for the image, title, and description
        let img = document.createElement('img');
        let a = document.createElement('a');
        let articleName = document.createElement('p'); // paragraph for article title
        let description = document.createElement('p'); // paragraph for article description

        // image source
        img.setAttribute('src', article.urlToImage);
        img.setAttribute('alt', article.title); // setting alt text for accessibility

        // grabbing article URL href
        a.setAttribute('href', article.url);
        // Make sure the search form page is still open after navigating from the article link
        a.setAttribute('target', '_blank');
        // get articles to display
        a.textContent = article.title;

        // setting article name text
        articleName.textContent = article.title;

        // setting article description text
        description.textContent = article.description;

        // append image, anchor tag, article name, & description to the container
        articleContainer.appendChild(img);
        articleContainer.appendChild(a);
        articleContainer.appendChild(articleName);
        articleContainer.appendChild(description);

        // appending the container to the list element
        li.appendChild(articleContainer);

        newsList.appendChild(li);
    });
}

// to fetch and display articles for a specific page
async function fetchAndDisplayArticles(page) {
    const data = await articlesModule.fetchArticles(page);
    if (data) {
        clearListAndDisplayArticles(data);
    }
}

// adding next and previous buttons for pagination
const nextButton = document.getElementById('nextButton');
nextButton.addEventListener('click', () => {
    currentPage++;
    fetchAndDisplayArticles(currentPage);
});

const prevButton = document.getElementById('prevButton');
prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchAndDisplayArticles(currentPage);
    }
});

// 'call' the initializePage function to set up the page
initializePage();
