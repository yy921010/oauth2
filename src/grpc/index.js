const config = require('../config');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const Request = require('oauth2-server').Request;
const Response = require('oauth2-server').Response;
const OAuthServe = require('../oauth');
const { errorDeal } = require('../utils/errorHandle');
const log = require('../utils/log4j').getLogger('grpc');
const path = require('path');

const PROTO_PATH = path.join(__dirname, './oauth2.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const oauthProto = grpc.loadPackageDefinition(packageDefinition).oauth;

const authenticate = async(call, callback) => {
  const token = call.request.token;
  const request = new Request({
    method: 'get',
    query: {},
    headers: {
      authorization: token
    }
  });
  const response = new Response();
  log.info('[authenticate] token', token);
  await OAuthServe.authenticate(request, response)
    .catch(error => {
      log.error('[authenticate] error', error);
      const errorBody = errorDeal({
        status: 200
      }, error);
      callback(null, errorBody);
    });
  log.info('[authenticate] token is check pass');
  callback(null, {
    status: 200,
    error_code: '',
    error_message: ''
  });
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
