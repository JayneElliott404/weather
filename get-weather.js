import axios from "axios";
import moment from "moment"

async function getWeather() {
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=54.92&lon=-1.74&appid=06ad7a2573a88b937cfd62fb09644957&units=metric"
    const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=54.92&lon=-1.74&appid=06ad7a2573a88b937cfd62fb09644957&units=metric"


    const response = await axios.get(url)
    const temperature = response.data.main.temp
    const feelsLike = response.data.main.feels_like
    const description = response.data.weather[0].description
    const windSpeed = response.data.wind.speed
    const location = response.data.name
    const icon = response.data.weather[0].icon
    const windSpeedMph = convertToMph(windSpeed)



    const forecastResponse = await axios.get(forecastUrl)

    const forecasts = []

    for (let i = 0; i < forecastResponse.data.list.length; i++) {
        const dateText = forecastResponse.data.list[i].dt_txt.split(" ")[0]
        const dayNumber = new Date(dateText).getDay()
        const dateSplit = dateText.split("-")
        dateSplit.reverse()
        const date = dateSplit[0]

        let day

        switch (dayNumber) {
            case 0:
                day = "Sun"
                break;
            case 1:
                day = "Mon"
                break;
            case 2:
                day = "Tue"
                break;
            case 3:
                day = "Wed"
                break;
            case 4:
                day = "Thur"
                break;
            case 5:
                day = "Fri"
                break;
            case 6:
                day = "Sat"
            default:
                break;
        }

        if (!forecasts.find(x => x.day === day)) {
            forecasts.push({ day, date, hourlyForecasts: [] })
        }

        const timeSplit = forecastResponse.data.list[i].dt_txt.split(" ")[1].split(":")
        const hourData = {
            day,
            date,
            time: `${timeSplit[0]}:${timeSplit[1]}`,
            temperature: forecastResponse.data.list[i].main.temp,
            feelsLike: forecastResponse.data.list[i].main.feels_like,
            description: forecastResponse.data.list[i].weather[0].description,
            windSpeed: forecastResponse.data.list[i].wind.speed,
            icon: forecastResponse.data.list[i].weather[0].icon
        }
        const position = forecasts.findIndex(x => x.day === day)
        forecasts[position].hourlyForecasts.push(hourData)
    }

    return {
        temperature,
        feelsLike,
        description,
        windSpeedMph,
        location,
        icon,
        forecasts
    }
}

function convertToMph(speed) {
    let mph = speed * 2.237
    mph = mph.toFixed(2)
    return mph
}

export default getWeather
