const { join } = require('path');
const PROTO_PATH = join(__dirname, './protos/blogger/blogger.proto');

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

const blogger = grpc.loadPackageDefinition(packageDefinition).blogger;

const {
  createPost,
  createThread,
  createComment,
  likePost,
  likeComment,
  getPost,
  getFullPost,
  getLatestPosts,
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
    if (err) {console.log(err); return console.error('DB connect error')};
    return console.log('DB has been connected');
  });
  const server = new grpc.Server();
  server.addService(blogger.Blogger.service, {
    createPost,
    createThread,
    createComment,
    likePost,
    likeComment,
    getPost,
    getFullPost,
    getLatestPosts,
  });
  return server;
}

const routeServer = getServer();
routeServer.bind(config.port, grpc.ServerCredentials.createInsecure());
routeServer.start();
