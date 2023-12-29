const fetch = require('node-fetch');

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

const apiKey = '01fe571c-87a1-4eb2-b1d9-677c298b650a';

function cityRanking(lat, long) {
    const url = `http://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${long}&key=${apiKey}`;
    return fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.status === 'success' && result.data) {
                return {
                    city: result.data.city,
                    state: result.data.state,
                    country: result.data.country,
                    air_quality_us: result.data.current.pollution.aqius,
                    main_pollutant: result.data.current.pollution.mainus,
                };
            } else {
                throw new Error('No data available or API request failed');
            }
        })
        .catch(error => console.log('error', error));
}

// Array of locations with their latitudes and longitudes
const locations = [
    { name: "Tokyo", lat: 35.6895, lon: 139.6917 },
    { name: "Hong Kong", lat: 22.3193, lon: 114.1694 },
    { name: "Seoul", lat: 37.5665, lon: 126.9780 },
    { name: "Mexico City", lat: 19.4326, lon: -99.1332 },
    { name: "New York", lat: 40.7128, lon: -74.0060 },
    { name: "London", lat: 51.5074, lon: -0.1278 },
    { name: "Dubai", lat: 25.276987, lon: 55.296249 },
    { name: "Cairo", lat: 30.033333, lon: 31.233334 }
];

function getAllCityRankings() {
    const promises = locations.map(location =>
        cityRanking(location.lat, location.lon)
            .then(data => ({ ...data, name: location.name }))
    );

    return Promise.all(promises);
}

// Example usage
getAllCityRankings()
    .then(results => {
        console.log(results);
    });
