const request = require('request')
const { darksky_API_Key }= require('../env')

function getWeatherDetails(longitude,latitude,callback){
    let url = 'https://api.darksky.net/forecast/'+darksky_API_Key+'/'+latitude+','+longitude+'?units=si'
    request.get({ url, json:true},(error,{body}={})=>{
        if(error){
            callback(undefined,"Unable to connect to weather service.")
        }else if(body.error){
            callback(undefined,"Unable to find location.")
        }else{
            callback(body.daily.data[0].summary+` It is currently ${body.currently.temperature} degrees (Celcius) out. And there is a ${body.currently.precipProbability*100}% chance of rain.`)
        }
    })    
}

module.exports = getWeatherDetails