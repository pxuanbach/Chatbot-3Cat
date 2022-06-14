const {Wit, log} = require('node-wit');
const dotenv = require('dotenv')

dotenv.config()

const witClient = new Wit({
  accessToken: process.env.WIT_ACCESS_TOKEN,
  //logger: new log.Logger(log.DEBUG), // optional
});

module.exports = witClient;