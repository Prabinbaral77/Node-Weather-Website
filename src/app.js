const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=> {
    res.render('index', {
        title: 'Weather App',
        name: 'Prabin Baral'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About us',
        name:'Prabin'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        helpText:'Help Page',
        title: 'Help',
        name: 'Prabin Baral'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address.'
        })
    }
  
    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({ error})
        }
        forecast(longitude, latitude, (error, forecastData)=>{
            if(error){
                return res.send({ error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
})
app.get('/products', (req, res)=> {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Prabin Baral',
        errorMessage: 'Help article not found'
    })
})
app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Prabin Baral',
        errorMessage: 'Page not found'
    })
})

app.listen(port,()=>{
    console.log('Server start at port'+ port);
})
