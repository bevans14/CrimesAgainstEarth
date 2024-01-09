const fetch = require('node-fetch')

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

const apiKey = '215708bc-2ead-4297-8eb3-b5260cc1c289';

function getAirQual(lat, long) {
    const url = `http://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${long}&key=${apiKey}`
    return fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => [{
        city: result.data.city,
        state: result.data.state,
        country: result.data.country,
        air_quality_us: result.data.current.pollution.aqius,
        main_pollutant: result.data.current.pollution.mainus,
    }])
    .catch(error => console.log('error', error))
}

module.exports = getAirQual;