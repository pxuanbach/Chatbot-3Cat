const axios = require("axios");
const dotenv = require('dotenv')

dotenv.config()

async function convertCurrency(from, to, amount) {
    try {
        const options = {
            method: 'GET',
            url: 'https://currency-converter18.p.rapidapi.com/api/v1/convert',
            params: { from, to, amount },
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'currency-converter18.p.rapidapi.com'
            }
        };

        const response = await axios.request(options)
        if (response.data.success) {
            const { from, to, amountToConvert, convertedAmount } = response.data.result
            return `${amountToConvert} ${from} = ${Number.parseFloat(convertedAmount).toFixed(2)} ${to}`
        } else {
            return "Mình không biết tiền tệ bạn cần quy đổi"
        }
    } catch (err) {
        console.log(err.message)
        return "Đã có lỗi xảy ra"
    }
}

module.exports = convertCurrency