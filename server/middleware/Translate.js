const axios = require("axios");
const dotenv = require('dotenv')

dotenv.config()

async function getTranslate(text) {
    try {
        const encodedParams = new URLSearchParams();
        encodedParams.append("q", text);
        encodedParams.append("target", "vi");
        encodedParams.append("source", "en");

        const options = {
            method: 'POST',
            url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept-Encoding': 'application/gzip',
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
            },
            data: encodedParams
        };
    
        const response = await axios.request(options)
        if (response.data) {
            return response.data.translations[0].translatedText;
        } else {
            return "Rất tiêc mình không hiểu được nó"
        }
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = getTranslate