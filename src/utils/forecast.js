const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=8581e77c1d7abd78de76c99e922b6993&query="+ encodeURIComponent(latitude) + "," + encodeURIComponent(longitude) + "&units=f"
   // console.log(url);
    request({url, json: true}, (error, response) => {
        //console.log(response.body);  
        const { body } = response
        if (error){

        } 
        else if (body.error) {
             console.log('Unable to find location');
            
             }
            else{ 
     //console.log(response.body.current) 
     callback(undefined, body) 
     console.log( body.current.weather_descriptions[0] + ". It's currently " + body.current.temperature + " it feels like " + body.current.feelslike);
    
    }     
    })
    
}

//forecast(-75.7088, 44.1545, 3333)

module.exports = forecast 