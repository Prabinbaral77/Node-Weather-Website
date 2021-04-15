const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=94e26b38c51bd42e0caf5fb11cc55094&query='+ encodeURIComponent(latitude)+','+ encodeURIComponent(longitude)+'&units=m'

    request({ url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect with weather service.', undefined)
        }else if(body.error){
            callback('unable to find the location', undefined)
        }else{
            callback(undefined,  body.current.weather_descriptions[0] + ', It is currently '+body.current.temperature + ' degree out. It feels like '+body.current.feelslike + ' degree out at '+ body.location.name + ' The chance of rain is '+ body.current.precip + '%')
        }
    })
}

module.exports = forecast
