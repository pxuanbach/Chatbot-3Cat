const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

async function getFact() {
  try {
    const axios = require("axios");

    const options = {
        method: 'GET',
        url: 'https://random-facts2.p.rapidapi.com/getfact',
        headers: {
          'X-RapidAPI-Key': '7709e99952mshfa38c17e834ae4cp17661ejsndf82abf78185',
          'X-RapidAPI-Host': 'random-facts2.p.rapidapi.com'
        }
      };

    const response = await axios.request(options);
    if (response.data) {
      return (
        response.data.Fact
      );
    } else {
      return "Xin lỗi mình cần học nhiều hơn";
    }
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = getFact;
