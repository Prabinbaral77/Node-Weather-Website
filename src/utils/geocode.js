const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYmFyYWxwcmFiaW4iLCJhIjoiY2tuNGFiZDhuMWZnNjJvbzh4dWxwaW91NyJ9.RYFOQ7lBv4stfxu4-1mehA&limit=1'

    request( {url, json: true}, (error, response)=> {
        if(error){
            callback('unable to get coordinate services', undefined)
        }else if(response.body.features.length ===0){
            callback('Unable to find the coordinates. Try another Search.', undefined)
        }else{
            callback(undefined, {
                longitude: response.body.features[0].center[0],
               latitude: response.body.features[0].center[1],
               location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode