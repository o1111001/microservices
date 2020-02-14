const PROTO_PATH = __dirname + '/protos/user.proto';
const grpc = require('grpc');
const mongoose = require('mongoose');

const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });

const user = grpc.loadPackageDefinition(packageDefinition).user;

const {
  signUp,
  signIn,
  auth,
  updatePassword,
  updateName,
  deleteProfile,
  getUserId,
} = require('./services');

const config = require('./config/env');

function connectDB(cb) {
  mongoose.connect(config.db,
    { useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false },
    cb);
}

function getServer() {
  connectDB(err => {
    if (err) return console.error('DB connect error');
    return console.log('DB has been connected');
  });
  const server = new grpc.Server();
  server.addService(user.User.service, {
    signUp,
    signIn,
    auth,
    updatePassword,
    updateName,
    deleteProfile,
    getUserId,
  });
  return server;
}

if (require.main === module) {
  const routeServer = getServer();
  routeServer.bind(config.port, grpc.ServerCredentials.createInsecure());
  routeServer.start();
}

module.exports = {
  getServer,
  connectDB,
};

