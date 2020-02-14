const { join } = require('path');
const PROTO_PATH = join(__dirname, '../../protos/blogger/blogger.proto');

const { bloggersService } = require('../../config/env');

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
const blogger = grpc.loadPackageDefinition(packageDefinition).blogger;
const client = new blogger.Blogger(bloggersService,
  grpc.credentials.createInsecure());

module.exports = client;
