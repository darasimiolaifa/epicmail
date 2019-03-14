"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _checkMissingRequiredValues = _interopRequireDefault(require("./checkMissingRequiredValues"));

var _validateUsername = _interopRequireDefault(require("./validateUsername"));

var _validatePassword = _interopRequireDefault(require("./validatePassword"));

var _usersData = _interopRequireDefault(require("../../dummy/usersData"));

var _serverResponse = _interopRequireDefault(require("../../controllers/controllerHelpers/serverResponse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var validateAuthData = function validateAuthData(req, res, next) {
  var required;
  var url = req.url,
      body = req.body;

  if (url === '/api/v1/auth/signup') {
    required = ['firstname', 'lastname', 'username', 'password'];
  } else {
    required = ['username', 'password'];
  }

  var error;
  var missingValues = (0, _checkMissingRequiredValues.default)(req.body, required, error);
  var invalidUsernameErrors = (0, _validateUsername.default)(url, _usersData.default, body.username);
  var invalidPasswordErrors = (0, _validatePassword.default)(url, _usersData.default, body.password, body.username);
  error = _objectSpread({}, missingValues);
  error.invalidInput = _objectSpread({}, invalidUsernameErrors, invalidPasswordErrors);
  var status = Math.max(200, missingValues.status, invalidUsernameErrors.status, invalidPasswordErrors.status);

  if (status !== 200) {
    return (0, _serverResponse.default)(res, error, status);
  }

  return next();
};

var _default = validateAuthData;
exports.default = _default;
//# sourceMappingURL=authValidation.js.map