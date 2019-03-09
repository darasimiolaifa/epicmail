"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validatePassword = function validatePassword(url, users, password, username) {
  var passwordErrors = [];
  var statusCode = 400;
  var hasErrors;

  if (url === '/api/v1/auth/signup') {
    if (password.length < 8) {
      passwordErrors.push('Passwords must be 8 characters or more in length');
      hasErrors = true;
    }
  } else {
    var foundUser = users.find(function (user) {
      return user.username === username;
    });

    if (foundUser) {
      if (foundUser.password !== _bcryptjs.default.hashSync(password, foundUser.salt)) {
        passwordErrors.push('Username and password does not match');
        hasErrors = true;
      }
    } else {
      statusCode = 404;
    }
  }

  return {
    passwordErrors: passwordErrors,
    statusCode: statusCode,
    hasErrors: hasErrors
  };
};

var _default = validatePassword;
exports.default = _default;
//# sourceMappingURL=validatePassword.js.map