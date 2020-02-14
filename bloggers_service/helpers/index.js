const auth = require('./helper/auth');
const getUserId = require('./helper/getUserId');

module.exports = {
  ...auth,
  ...getUserId,
};
