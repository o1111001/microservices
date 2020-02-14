require('dotenv').config();

const production = require('./production');
const development = require('./development');
const test = require('./test');

const { NODE_ENV } = process.env;

const config = () => {
  if (NODE_ENV === 'production') return production;
  if (NODE_ENV === 'test') return test;
  return development;
};

module.exports = config();
