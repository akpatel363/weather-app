const request = require('request')
const { locationIQ_API_Key } = require('../env')

let url = 'https://us1.locationiq.com/v1/search.php?key='+locationIQ_API_Key+'&limit=1&format=json&q='

function getCoordinates(search,callback){
    request.get({url:url+encodeURIComponent(search),json:true},(error,{body}={})=>{
        if(error){
            return callback('Unable to connect to server.',undefined)
        }else if(body.error){
            return callback(body.error,undefined)
        }
        callback(undefined,{
            lat:body[0].lat,
            lon:body[0].lon,
            name:body[0].display_name
        })
    })
}
module.exports = getCoordinates