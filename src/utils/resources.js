const fetch = require('node-fetch');

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

const apiKey = '215708bc-2ead-4297-8eb3-b5260cc1c289';

async function cityRanking(city, state, country) {
    const url = `http://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=${apiKey}`;
    return await fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => result.data)
        .catch(err => console.log('error', err));
}

module.exports = cityRanking;