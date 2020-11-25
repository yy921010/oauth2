const config = require('../config');
const PROTO_PATH = __dirname + './oauth2.proto';
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const Request = require('oauth2-server').Request;
const Response = require('oauth2-server').Response;
const OAuthServe = require('../oauth');
const errorHandle = require('../utils/errorHandle');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const oauthProto = grpc.loadPackageDefinition(packageDefinition).oauth;

const authenticate = (call, callback) => {
  const token = call.request.token;
  const request = new Request({
    headers: {
      authorization: token
    }
  });
  const response = new Response();
  const ctx = {
    response: {},
    status: 200
  };
  errorHandle(ctx, () => { return OAuthServe.authenticate(request, response); });
  callback(null, { message: 'Hello ' + call.request.name });
};

const main = () => {
  const server = new grpc.Server();
  // 注册服务
  server.addService(oauthProto.OAuth2Service.service, { authenticate });
  server.bindAsync(
    config.grpcServe,
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
    }
  );
};

module.exports = main;
