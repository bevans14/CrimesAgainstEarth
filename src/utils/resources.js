const fetch = require('node-fetch');

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

const apiKey = '5ab44386-5c65-4b55-bb3b-aa71d563eca8';

async function cityRanking(city, state, country) {
    const url = `http://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=${apiKey}`;
    return await fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => result.data)
        .catch(err => console.log('error', err));
}

// const locations = [
//     { city: "Tokyo", state: "Tokyo", country: "Japan" },
//     { city: "Hong Kong", state: "Hong Kong", country: "Hong Kong" },
//     { city: "Seoul", state: "Seoul", country: "South Korea" },
//     { city: "Mexico City", state: "Mexico City", country: "Mexico" },
//     { city: "New York City", state: "New York", country: "USA" }
// ];

// async function getAllCityRankings() {
//     const promises = locations.map(location =>
//          cityRanking(location.city, location.state, location.country)
//             .then(data => data = {
//                 city: data.city,
//                 state: data.state,
//                 country: data.country,
//                 airQual: data.current.pollution.aqius
//             })
//     );

//     return Promise.all(promises);
// }

// // Example usage
// getAllCityRankings()
//     .then(results => {
//         console.log(results);
//     });

module.exports = cityRanking;