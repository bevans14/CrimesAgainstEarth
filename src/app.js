const express = require('express')
const hbs = require('hbs')
const path = require('path')
const getAirQual = require('./utils/getAirQuality')
const geocode = require('./utils/geolocate')
const dbconfig = require('../dbconfig');

const app = express();

const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

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

app.get('/search', (req, res) => {
    if(!req.query.location) {
        return res.send('error', error)
    }
    geocode(req.query.location).then(result => {
        if(!result) {
            return res.send({error: 'Unable to find city. Try again!'})
        }
        getAirQual(result[0].lat, result[0].long).then(result => {
            if(!result) {
                return res.send({error: 'Unable to find city. Try again!'})
            }
            res.send(result)
        })
    })
})

app.listen(3000, (err) => {
    if(err) {
        throw err;
    } else {
        console.log('Listening on port 3000')
    }
})