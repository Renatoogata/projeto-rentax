"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAuthenticated = ensureAuthenticated;

var _jsonwebtoken = require("jsonwebtoken");

var _AppError = require("@shared/errors/AppError");

var _auth = _interopRequireDefault(require("@config/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new _AppError.AppError("Token is missing", 401);
  } //Bearer 90rufidsufdj420ifj90iwej
  //.spli esta separando a mensagem de cima quando tem espaço, na posição 0 que é a virgula nós ignoramos porque nao precisamos e na posição 1 
  //que é o token nos colocamos ele na variavel split


  const [, token] = authHeader.split(" ");

  try {
    const {
      sub: user_id
    } = (0, _jsonwebtoken.verify)(token, _auth.default.secret_token);
    request.user = {
      id: user_id
    };
    next();
  } catch {
    throw new _AppError.AppError("Invalid Token", 401);
  }
}