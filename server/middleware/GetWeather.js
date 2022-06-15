const dotenv = require('dotenv')
dotenv.config();

function getWeather(location) {
    return new Promise(async (resolve, reject) => {
        let url = encodeURI(`http://api.openweathermap.org/data/2.5/weather?q=${(location)}&appid=${process.env.OPENWEATHER_API_KEY}&lang=vi`)                 //fix the letter Đ encode incorrectly
        console.log(url)
        let res = await fetch(url)
        //console.log(res)
        if (res.status != 200) {
            console.log("Fetch OpenWeather API error")
            reject("Fetch OpenWeather API error")
            return
        } else {
            let obj = JSON.parse(await res.text())
            let result = {
                name: obj.name,
                temp: obj.main.temp - 273,
                temp_feel: obj.main.feels_like - 273,
                max_temp: obj.main.temp_max - 273,
                min_temp: obj.main.temp_min - 273,
                humidity: obj.main.humidity,
                desc: obj.weather[0].description,
                icon: obj.weather[0].icon,
                wind: obj.wind || { speed: 0, deg: 0, gust: 0 },
                rain: obj.rain || { past1h: 0, past3h: 0 },
                snow: obj.snow || { past1h: 0, past3h: 0 },
                visibility: obj.visibility
            }
            resolve(result)
        }
    })
}

module.exports = getWeather