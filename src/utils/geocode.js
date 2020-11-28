const request = require('request') 

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicnJpY2t5MTIyODkwIiwiYSI6ImNrZ3Iza2NrNTEzYW0yeG9pODBsbGxzdzAifQ.sp_3dU9p-w248pcvj8iCXQ&limit=1'

    request({url, json: true}, (error, response) => {
        const {body} = response
        if (error){
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0 ){
            callback('Unable to find location. Try another search' )
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    } 
     )
}

module.exports = geocode