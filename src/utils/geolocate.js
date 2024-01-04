const fetch = require('node-fetch')
const apiKey = "65972e9e83d02408599246pxa9981e6"
function getGeolocation(location) {
    const url = `https://geocode.maps.co/search?q=${location}&api_key=${apiKey}`
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





