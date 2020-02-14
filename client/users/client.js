
const { join } = require('path');
const PROTO_PATH = join(__dirname, '../../protos/user/user.proto');

const { usersService } = require('../../config/env');
console.log(usersService)
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
const client = new user.User(usersService,
  grpc.credentials.createInsecure());

module.exports = client;
