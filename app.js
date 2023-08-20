import express from "express";
import getWeather from "./get-weather.js"

const app = express()
const port = 3000

app.use(express.static("public"))


app.get("/", async (req, res) => {
    try {
        const weather = await getWeather()
        res.render("index.ejs", weather)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
