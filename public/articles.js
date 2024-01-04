// articles.js

const articlesModule = (function () {
    let searchTerms = ['air quality impact', 'carbon emissions impact']; // Default search terms
    const newsList = document.querySelector('.news-list');
    const articlesPerPage = 6;
    let currentPage = 1;

    // Function to set new search terms
    function setSearchTerms(newSearchTerms) {
        searchTerms = newSearchTerms;
    }

    // Function to fetch articles for a specific page
    async function fetchArticles(page) {
        const startIndex = (page - 1) * articlesPerPage;
        const endIndex = startIndex + articlesPerPage;
        const encodedSearchTerms = encodeURIComponent(searchTerms.join(' OR '));
        const apiKey = '22b1cd3d53d24602b7bed8a389daa31c';
        const articleUrl = 'https://newsapi.org/v2/everything';
        const url = `${articleUrl}?q=${encodedSearchTerms}&apiKey=${apiKey}`;

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

    // Export the fetchArticles and setSearchTerms functions
    return {
        fetchArticles,
        setSearchTerms,
    };
})();

export default articlesModule;
