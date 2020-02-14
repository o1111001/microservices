const client = require('./client');

function likeComment(body, callback) {
  function signInCallback(error, credentials) {
    if (error) return callback(error, credentials);
    return callback(null, credentials);
  }
  client.likeComment(body, signInCallback);
}
function replyToComment(body, callback) {
  function signInCallback(error, credentials) {
    if (error) return callback(error, credentials);
    return callback(null, credentials);
  }
  client.createComment(body, signInCallback);
}

module.exports = {
  likeComment,
  replyToComment,
};
