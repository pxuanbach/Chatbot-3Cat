const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

function convertData(data) {
  return {
    title: data.title,
    url: data.url,
    source: data.source,
  };
}

async function getNews() {
  try {
    const axios = require("axios");

    const options = {
        method: 'GET',
        url: 'https://blockchain-news1.p.rapidapi.com/news/NDTV',
        headers: {
          'X-RapidAPI-Key': '7709e99952mshfa38c17e834ae4cp17661ejsndf82abf78185',
          'X-RapidAPI-Host': 'blockchain-news1.p.rapidapi.com'
        }
      };

    const response = await axios.request(options);
    const random = Math.floor(Math.random() * response.data.length);
    if (response.data) {
      const data = convertData(response.data[random]);
      return (
        `Tiêu đề: ${data.title}\n` +
        `Đường dẫn: ${data.url}\n` +
        `Nguồn tin: ${data.source} `
      );
    } else {
      return "Xin lỗi mình cần học nhiều hơn";
    }
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = getNews;
