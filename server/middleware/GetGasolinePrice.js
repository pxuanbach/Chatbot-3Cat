const axios = require("axios");
const dotenv = require('dotenv')

dotenv.config()

async function getGasolinePrice() {
    try {
        const options = {
            method: 'GET',
            url: 'https://fuel-prices2.p.rapidapi.com/gasoline/Vietnam',
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'fuel-prices2.p.rapidapi.com'
            }
        };
    
        const response = await axios.request(options)
        if (response.data) {
            console.log(response.data) 
        } else {
            return "Xin lỗi mình cần học nhiều hơn"
        }
    } catch(err) {
        console.log(err.message)
        return "Đã có lỗi xảy ra"
    }
}

module.exports = getGasolinePrice