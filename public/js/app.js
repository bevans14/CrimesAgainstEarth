const locationForm = document.querySelector('form')
const locationInput = document.querySelector('input')
const message1 = document.getElementById('message1')
const message2 = document.getElementById('message2')

locationForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const input = locationInput.value;
    message1.innerText = 'Loading...'
    message2.innerText = ''

    fetch(`http://localhost:3000/search?location=${input}`)
        .then(response => response.json())
        .then(result => {
            if(result.error) {
                return message1.innerText = result.error;
            }
            message1.innerText = result[0].city + ', ' + result[0].state + ', ' + result[0].country
            message2.innerText = `Air Quality Rating (US): ${result[0].air_quality_us} \n Main pollutant: ${result[0].main_pollutant}`
        })
        .catch(error => console.log('error', error))
})