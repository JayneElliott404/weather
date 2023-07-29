const express = require("express")
const path = require("path")
const getWeather = require("./get-weather")

const app = express()

app.use(express.static(path.join(__dirname, 'public')))


app.get("/", function (req, res) {
    getWeather(function (weather) {
        res.render("index.ejs", weather)
    })
})

// app.get("/weather", function (req, res) {
//     getWeather(function (weather) {
//         res.send(weather)
//     })
// })

app.listen(3000, function () {
    console.log("Server is running on port 3000")
})
