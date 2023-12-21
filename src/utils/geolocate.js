const fetch = require('node-fetch')

function getGeolocation(location) {
    const url = `https://geocode.maps.co/search?q=${location}`
    return fetch(url)
        .then(response => response.json())
        .then(result => [{
            location: result[0].display_name,
            lat: result[0].lat,
            long: result[0].lon
        }])
        .catch(error => console.log('error', error))
}

module.exports = getGeolocation;