// articles.js

const articlesModule = (function () {
    const newsList = document.querySelector('.news-list');
    const articlesPerPage = 6;
    let currentPage = 1;

    // setting predefined search terms
    const searchTerms = ['air quality impact', 'carbon emissions impact'];

    // will convert the array to a JSON-formatted string and encode it
    const encodedSearchTerms = encodeURIComponent(searchTerms.join(' OR '));

    // construct the URL with the encoded search terms
    const apiKey = '22b1cd3d53d24602b7bed8a389daa31c';
    const articleUrl = 'https://newsapi.org/v2/everything';
    const url = `${articleUrl}?q=${encodedSearchTerms}&apiKey=${apiKey}`;

    // function to fetch articles for a specific page
    async function fetchArticles(page) {
        const startIndex = (page - 1) * articlesPerPage;
        const endIndex = startIndex + articlesPerPage;

        try {
            // Fetch API... return JSON object
            const res = await fetch(url);
            const data = await res.json();
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    // Export the fetchArticles function
    return {
        fetchArticles,
    };
})();

export default articlesModule;
