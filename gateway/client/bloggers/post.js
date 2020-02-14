const client = require('./client');

function createPost(body, callback) {
  function signInCallback(error, credentials) {
    if (error) return callback(error, credentials);
    return callback(null, credentials);
  }
  client.createPost(body, signInCallback);
}

function createThread(body, callback) {
  function signInCallback(error, credentials) {
    if (error) return callback(error, credentials);
    return callback(null, credentials);
  }
  client.createThread(body, signInCallback);
}

function likePost(body, callback) {
  function signInCallback(error, credentials) {
    if (error) return callback(error, credentials);
    return callback(null, credentials);
  }
  client.likePost(body, signInCallback);
}
function getPost(body, callback) {
  function signInCallback(error, credentials) {
    if (error) return callback(error, credentials);
    return callback(null, credentials);
  }
  client.getPost(body, signInCallback);
}
function getFullPost(body, callback) {
  function signInCallback(error, credentials) {
    if (error) return callback(error, credentials);
    return callback(null, credentials);
  }
  client.getFullPost(body, signInCallback);
}

function getLatestPosts(body, callback) {
  function signInCallback(error, credentials) {
    if (error) return callback(error, credentials);
    return callback(null, credentials);
  }
  client.getLatestPosts(body, signInCallback);
}

module.exports = {
  createPost,
  createThread,
  likePost,
  getLatestPosts,
  getPost,
  getFullPost,
};
