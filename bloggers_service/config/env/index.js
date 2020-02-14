require('dotenv').config();

const production = require('./production');
const development = require('./development');

const { NODE_ENV } = process.env;

const config = () => {
  if (NODE_ENV === 'production') return production;
  return development;
};

module.exports = config();
