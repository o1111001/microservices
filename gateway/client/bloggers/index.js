const post = require('./post');
const comment = require('./comment');

module.exports = {
  ...post,
  ...comment,
};

