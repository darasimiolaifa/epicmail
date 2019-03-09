"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _checkMissingRequiredValues = _interopRequireDefault(require("./checkMissingRequiredValues"));

var _validateUsername = _interopRequireDefault(require("./validateUsername"));

var _validatePassword = _interopRequireDefault(require("./validatePassword"));

var _usersData = _interopRequireDefault(require("../../dummy/usersData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateAuthData = function validateAuthData(req, res, next) {
  var required;
  var url = req.url,
      body = req.body;

  if (url === '/api/v1/auth/signup') {
    required = ['firstname', 'lastname', 'username', 'password'];
  } else {
    required = ['username', 'password'];
  }

  var error = {
    invalidInput: {}
  };
  var status = 200;
  var missingValueStatus = (0, _checkMissingRequiredValues.default)(req.body, required);

  if (missingValueStatus.hasErrors) {
    var missingValues = missingValueStatus.missingValues,
        statusCode = missingValueStatus.statusCode;
    error.missingValues = missingValues;
    status = statusCode;
  }

  var invalidUsername = (0, _validateUsername.default)(url, _usersData.default, body.username);

  if (invalidUsername.hasErrors) {
    var usernameErrors = invalidUsername.usernameErrors,
        _statusCode = invalidUsername.statusCode;
    error.invalidInput.username = usernameErrors;
    status = _statusCode;
  }

  var invalidPassword = (0, _validatePassword.default)(url, _usersData.default, body.password, body.username);

  if (invalidPassword.hasErrors) {
    var passwordErrors = invalidPassword.passwordErrors,
        _statusCode2 = invalidPassword.statusCode;
    error.invalidInput.password = passwordErrors;
    status = _statusCode2;
  }

  if (status !== 200) {
    return res.status(status).send({
      status: status,
      error: error
    });
  }

  next();
};

var _default = validateAuthData;
exports.default = _default;
//# sourceMappingURL=authValidation.js.map