const Post = require('./posts');
const Thread = require('./comments');

module.exports = {
  ...Post,
  ...Thread,
};

