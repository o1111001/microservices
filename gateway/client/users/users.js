const client = require('./client');

function signUp(body, callback) {
  function signUpCallback(error, credentials) {
    if (error) return callback(error);
    return callback(null, credentials);
  }
  client.signUp(body, signUpCallback);
}

function signIn(body, callback) {
  function signInCallback(error, credentials) {
    if (error) return callback(error, credentials);
    return callback(null, credentials);
  }
  client.signIn(body, signInCallback);
}

function updatePassword(body, callback) {
  function signInCallback(error, credentials) {
    if (error) return callback(error, credentials);
    return callback(null, credentials);
  }
  client.updatePassword(body, signInCallback);
}

function updateName(body, callback) {
  function signInCallback(error, credentials) {
    if (error) return callback(error, credentials);
    return callback(null, credentials);
  }
  client.updateName(body, signInCallback);
}

function deleteProfile(body, callback) {
  function signInCallback(error, credentials) {
    if (error) return callback(error, credentials);
    return callback(null, credentials);
  }
  client.deleteProfile(body, signInCallback);
}

function auth(body, callback) {
  function signInCallback(error, credentials) {
    if (error) return callback(error, credentials);
    return callback(null, credentials);
  }
  client.auth(body, signInCallback);
}

module.exports = {
  signUp,
  signIn,
  updatePassword,
  updateName,
  deleteProfile,
  auth,
};
