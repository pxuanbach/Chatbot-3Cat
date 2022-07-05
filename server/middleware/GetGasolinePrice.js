const axios = require("axios");
const convertCurrency = require('./ConvertCurrency')
const dotenv = require('dotenv')

dotenv.config()

async function getGasolinePrice() {
    try {
        const options = {
            method: 'GET',
            url: 'https://fuel-prices2.p.rapidapi.com/gasoline/Vietnam',
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY2,
                'X-RapidAPI-Host': 'fuel-prices2.p.rapidapi.com'
            }
        };
    
        const response = await axios.request(options)
        if (response.data) {
            console.log(response.data[0].gasoline_price)
            const gasoline_price = await convertCurrency("USD", "VND", response.data[0].gasoline_price)
            return `Xăng đang có giá ${gasoline_price}/lít`
        } else {
            return "Xin lỗi mình cần học nhiều hơn"
        }
    } catch(err) {
        console.log(err.message)
        return "Đã có lỗi xảy ra"
    }
}

module.exports = getGasolinePrice