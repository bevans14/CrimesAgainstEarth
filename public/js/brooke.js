
const getAirQual = require('./utils/getAirQuality')
const geocode = require('./utils/geolocate')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = (search.value)

    message1.textContent = 'Loading ...'
    message2.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
            } else {
                const dataContainer = document.getElementById('dataDisplay');
                const cityData = document.createElement('p');
                 cityData.textContent = `country: ${airQuality.country}, state: ${airQuality.state}, city: ${airQuality.city}`;
                 dataContainer.appendChild(cityData);

            }
        })
    })
})


// function displayData(location) {

//     getGeolocation(location).then(geoData => {
//         if (geoData) {
//             const { lat, long } = geoData[0];
//             getAirQual(location).then(airQuality => {
//                 const dataContainer = document.getElementById('dataDisplay');
//                 const cityData = document.createElement('p');
//                 cityData.textContent = `country: ${airQuality.country}, state: ${airQuality.state}, city: ${airQuality.city}`;
//                 dataContainer.appendChild(cityData);
//             });
//         }
//     });
// }



// function buttonClick(e){
//     e.preventDefault();
//     const location = document.getElementById('submit').value;
//     displayData(location);
// }

// const button = document.getElementById('submit')
// button.addEventListener('click', buttonClick)

//header mimetype is default text html, need to make it know its javascript
// set up in app.js to deliver from public folder as javascript
// public/js is html json
// cant find file at all
// pathing issues