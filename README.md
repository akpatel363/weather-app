# Weather App

It's a weather app made using nodejs and it is deployed on [Heroku](https://weather-app-akp.herokuapp.com).

It uses API's provided by [LocationIQ.com](https://locationiq.com) and [Darksky.net](https://darksky.net) get the coordinates of the location provided and then to get the weather details respectively.

### Note
If you want to run this project locally on your machine. You must add env.js file in src folder with your API keys.
```javascript
let locationIQ_API_Key = "YOUR_API_KEY"
let darksky_API_Key = 'YOUR_API_KEY'

module.exports = {
    locationIQ_API_Key,
    darksky_API_Key
}
```