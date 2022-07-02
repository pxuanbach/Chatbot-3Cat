const axios = require("axios");
const dotenv = require('dotenv')

dotenv.config()

function convertCurrency(from, to, amount) {
    const options = {
        method: 'GET',
        url: 'https://currency-converter18.p.rapidapi.com/api/v1/convert',
        params: { from, to, amount},
        headers: {
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'currency-converter18.p.rapidapi.com'
        }
    };

    const response = await axios.request(options)
    if (response.data) {
        console.log(response.data)
    } else {
        return "Rất tiêc mình không hiểu được nó"
    }
}

module.exports = convertCurrency