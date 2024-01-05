const express = require('express')
const hbs = require('hbs')
const path = require('path')
const getAirQual = require('./utils/getAirQuality')
const geolocate = require('./utils/geolocate')
const cityRanking = require('./utils/resources')
const connection = require('../dbconfig');

const app = express();

const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home'
    })
})

app.get('/calculator', (req, res) => {
    res.render('calculator', {
        title: 'Calculator'
    })
})

app.post('/board', (req, res) => {
    const cityName = req.body.cityName;
    console.log(cityName)
})

app.get('/news', (req, res) => {
    res.render('news' , {
        title: 'News'
    })
})

app.get('/resources', (req, res) => {
    res.render('resources' , {
        title: 'Resources'
    })
})

app.get('/unsub', (req, res) => {
    res.render('unsub', {
        title: 'Unsubscribe'
    })
})

app.post('/unsub', (req, res) => {
    const email = req.body.email;

    const matchingQuery = `
    SELECT email
    FROM subscriptions
    WHERE email = '${email}'
    `;

    const deleteQuery = `
    DELETE FROM subscriptions
    WHERE email = '${email}'
    `;

    if(!email) {
        console.log('No email inserted!')
        res.redirect('/unsub')
    } else {
        connection.query(matchingQuery, (err, data) => {
            if(data.length > 0) {
                connection.query(deleteQuery, (err, data) => {
                    if(err) {
                        console.log(`ERROR! Error message: ${err}`)
                    } else {
                        console.log('Email successfully removed!')
                        res.redirect('/unsub')
                    }
                })
            } else {
                console.log('No email found!')
                res.redirect('/unsub')
            }
        })
    }
}) 

app.get('/popularCity', (req, res) => {
    const locations = [
        { city: "Tokyo", state: "Tokyo", country: "Japan" },
        { city: "Hong Kong", state: "Hong Kong", country: "Hong Kong" },
        { city: "Mexico City", state: "Mexico City", country: "Mexico" },
        { city: "New York City", state: "New York", country: "USA" },
        { city: "Cairo City", state: "Cairo", country: "Egypt" }
    ];

    async function getAllCityRankings() {
        const promises = locations.map(location =>
             cityRanking(location.city, location.state, location.country)
                .then(data => data = {
                    city: data.city,
                    state: data.state,
                    country: data.country,
                    airQual: data.current
                })
        );
    
        return Promise.all(promises);
    }
    
    getAllCityRankings()
        .then(results => {
            res.send(results)
        });
})

app.get('/search', (req, res) => {
    if(!req.query.location) {
        return res.send('error', error)
    }
    geolocate(req.query.location).then(result => {
        if(!result) {
            return res.send({error: 'Unable to find city. Try again!'})
        }
        getAirQual(result[0].lat, result[0].long).then(result => {
            if(!result) {
                return res.send({error: 'Unable to find city or city not supported. Try again!'})
            }
            res.send(result)
        })
    })
})

app.post('/signup', (req, res) => {
    const email = req.body.email;
    const name = req.body.name;

    const insertQuery = `
    INSERT INTO subscriptions (name, email)
    VALUES ('${name}', '${email}')
    `;

    const matchingQuery = `
    SELECT email
    FROM subscriptions
    WHERE email = '${email}'
    `;

    if(!email) {
        console.log('No email inputted.')
        res.redirect('/')
    } else {
        connection.query(matchingQuery, (err, data) => {
            if(data.length > 0) {
                console.log('Email already in database!')
                res.redirect('/')
            } else {
                connection.query(insertQuery, function (error, data) {
                    console.log('Thanks for signing up')
                    res.redirect('/')
                })
            }
        })
    }
})

app.listen(3000, (err) => {
    if(err) {
        throw err;
    } else {
        console.log('Listening on port 3000')
    }
})