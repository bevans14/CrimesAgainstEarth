const list = document.querySelector('ul');

fetch(`/popularCity`).then((response) => {
    response.json().then((data) => {
        data.forEach(location => {
            
            cityElement = document.createElement('li')
            cityElement.innerHTML = `
            <div>
                <h1>${location.city}, ${location.state}, ${location.country}</h1>
                <p>Current Air Quality Index: ${location.airQual.pollution.aqius}</p>
            <div>
            `
            list.appendChild(cityElement)
        })
    })
})

setInterval(fetchData, 3600000);
