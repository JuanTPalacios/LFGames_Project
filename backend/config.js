require('dotenv').config();

const config = {
  PORT: process.env.PORT || '3000',
  USERNAME: process.env.USERNAME,
  PASSWORD: process.env.PASSWORD,
  DATABASE: process.env.DATABASE,
  ACCESS_TOKEN_SECRET: process.env.SECRET
};

module.exports = config;
