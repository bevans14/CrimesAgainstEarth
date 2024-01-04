const form = document.getElementById("cityForm")
const input = document.getElementById("cityInput")
let message = document.getElementById("message")
// oh no! your aqi is >50. click here to find out how to help


form.addEventListener('submit', (e)=> {
    e.preventDefault();
    const location = input.value;
    fetch(`http://localhost:3000/search?location=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                message.textContent = data.error;
            } else if (AQI > 100){
                const AQI = data[0].air_quality_us
                message.textContent = `The air quality index of your city is ${AQI}`;
            }
        })
    })
})