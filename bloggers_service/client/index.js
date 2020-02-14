const { join } = require('path');
const PROTO_PATH = join(__dirname, '../protos/auth/auth.proto');
const { authPort } = require('../config/env');

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  { keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });
const user = grpc.loadPackageDefinition(packageDefinition).user;
const client = new user.User(authPort,
  grpc.credentials.createInsecure());

function auth(body, callback) {
  function authCallback(error, credentials) {
    if (error) return callback(error, credentials);
    return callback(null, credentials);
  }
  client.auth(body, authCallback);
}

function getUserId(body, callback) {
  function getUserIdCallback(error, credentials) {
    if (error) return callback(error, credentials);
    return callback(null, credentials);
  }
  client.getUserId(body, getUserIdCallback);
}

module.exports = {
  auth,
  getUserId,
};
