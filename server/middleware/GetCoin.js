const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

function convertData(data) {
  return {
    uuid: data.uuid,
    symbol: data.symbol,
    nameCoin: data.name,
    marketCap: data.marketCap,
    price: data.price,
    listedAt: data.listedAt,
    tier: data.tier,
    change: data.change,
    rank: data.rank,
    coinrankingUrl: data.coinrankingUrl,
    btcPrice: data.btcPrice,
  };
}

async function getCoin(search) {
  try {
    const axios = require("axios");

    const options = {
      method: "GET",
      url: "https://coinranking1.p.rapidapi.com/coins",
      params: {
        referenceCurrencyUuid: "yhjMzLPhuIDl",
        timePeriod: "24h",
        "tiers[0]": "1",
        orderBy: "marketCap",
        search,
        orderDirection: "desc",
        limit: "100",
        offset: "0",
      },
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    if (response.data) {
      const data = convertData(response.data.data.coins[0]);
      return (
        `Tên viết tắt: ${data.symbol}\n` +
        `Tên tiền ảo: ${data.nameCoin}\n` +
        `Vốn hóa thị trường: ${data.marketCap} USD\n` +
        `Giá đồng tiền: ${data.price} USD\n` +
        `Tỉ giá: ${data.change}\n` +
        `Xếp hạng giá trị: ${data.rank}\n` +
        `Giá trị theo đồng BTC: ${data.btcPrice} BTC`
      );
    } else {
      return "Xin lỗi mình cần học nhiều hơn";
    }
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = getCoin;
