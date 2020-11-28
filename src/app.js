const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define Paths
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');




app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Rico' 
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Rico',
        name: 'Rico'

    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Here  is a whole paragraph about how you will need help',
        title: 'Help',
        name: 'Rico'
    })
} )

app.get('/weather', (req, res) => { 
    
    if(!req.query.address){
        return res.send({error: 'Must put an address'})
    }

    const location = req.query.address

if(!location){ 
    console.log("Please adda location");
} else {

geocode(location, (error, data = {}) => {
const {longitude, latitude, location} = data
if (error){
    return res.send({error: 'Must put an address'})
}

console.log(longitude);
forecast(longitude, latitude, (error, forecastData) => {
    if (error) {
        return console.log(error);
    }
     else{
    console.log(location, "HERE")
    res.send({location: location,
        climate:  forecastData.current.weather_descriptions[0],
       temperature:  forecastData.current.temperature,
        feels_like: forecastData.current.feelslike
    })
    console.log(forecast, "there")
     }
  })

})

}

    
} )

app.get('/products', (req, res) => {

    if (!req.query.search) {
         return res.send({
             error: 'You must provide a search term'
         })
    } 

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',
    {message: 'No Help Page'}
    )
})

app.get('*',  (req, res) => {
   res.render('404',
   {message: 'Page not found'}
   )
})

app.listen(3000, () => {
    console.log("Server is up")
})