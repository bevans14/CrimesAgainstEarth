const express = require('express')
const hbs = require('hbs')
const path = require('path')

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
    })
})

app.listen(3000, (err) => {
    if(err) {
        throw err;
    } else {
        console.log('Listening on port 3000')
    }
})