require('dotenv').config();

const config = {
  PORT: process.env.PORT || '3000',
  ENV: process.env.ENV || 'test',
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || null,
};

if (config.env === 'test') {
  config.MONGOURI = process.env.TESTURI;
} else config.MONGOURI = process.env.MONGOURI;

module.exports = config;
