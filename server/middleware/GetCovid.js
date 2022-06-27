const axios = require("axios");
const dotenv = require('dotenv')

dotenv.config()

function convertData(data) {
    return {
        country: data[0].Country,
        infectionRisk: data[0].Infection_Risk,      //Ty le lay nhiem
        testPer: data[0].Test_Percentage,           //ty le xet nghiem
        recoveryPer: data[0].Recovery_Proporation,  //ty le hoi phuc
        totalCases: data[0].TotalCases,     // tong so ca
        newCases: data[0].NewCases,         // so ca gan day
        totalDeaths: data[0].TotalDeaths,   // tong so ca tu vong
        newDeaths: data[0].NewDeaths,       // so ca tu vong gan day
        totalRecov: data[0].TotalRecovered, // tong so ca hoi phuc
        newRecov: data[0].NewRecovered,     // so ca hoi phuc gan day
    }
}

async function getCovid() {
    try {
        const options = {
            method: 'GET',
            url: 'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/country-report-iso-based/Vietnam/vnm',
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com'
            }
        };

        const response = await axios.request(options)
        if (response.data) {
            const data = convertData(response.data)
            return `Tình hình covid ở ${data.country}\n` +
            `Nguy cơ lây nhiễm: ${data.infectionRisk}%\n` +
            `Tỷ lệ xét nghiệm: ${data.testPer}%\n` +
            `Tỷ lệ hồi phục: ${data.recoveryPer}%\n` +
            `Tổng số ca: ${data.totalCases}\n` +
            `Số ca mắc mới: ${data.newCases}\n` +
            `Tổng số ca hồi phục: ${data.totalRecov}\n` +
            `Số ca hồi phục gần đây: ${data.newRecov}\n` +
            `Tổng số ca tử vong: ${data.totalDeaths}\n` +
            `Số ca tử vong gần đây: ${data.newDeaths}`;
        } else {
            return "Xin lỗi mình cần học nhiều hơn"
        }
    } catch (err) {
        console.log(err.message)
        return "Đã có lỗi xảy ra"
    }
}

module.exports = getCovid