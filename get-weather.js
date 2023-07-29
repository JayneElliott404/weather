const https = require("https")

function getWeather(fn) {
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=54.92&lon=-1.74&appid=06ad7a2573a88b937cfd62fb09644957&units=metric"

    https.get(url, function (response) {

        response.on("data", function (data) {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const feelsLike = weatherData.main.feels_like
            const weatherDescription = weatherData.weather[0].description
            const windSpeed = weatherData.wind.speed
            const location = weatherData.name
            const icon = weatherData.weather[0].icon

          
            const windSpeedMph = convertToMph(windSpeed)


            fn({
                place: location,
                temperature: temp,
                feelsLike,
                description: weatherDescription,
                windSpeedMph,
                icon
            })
        })
    })
}

function convertToMph(speed){
    let mph = speed * 2.237
    mph = mph.toFixed(2)
    return mph
}

module.exports = getWeather