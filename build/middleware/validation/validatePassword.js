"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(url, users, password, username) {
  var passwordErrors = [];
  var error = {};
  var status = 200;

  if (url === '/api/v1/auth/signup') {
    if (password.length < 8) {
      passwordErrors.push('Passwords must be 8 characters or more in length');
      status = 400;
    }
  } else {
    var foundUser = users.find(function (user) {
      return user.username === username;
    });

    if (foundUser) {
      if (!_bcryptjs.default.compareSync(password, foundUser.password)) {
        passwordErrors.push('Username and password does not match');
        status = 400;
      }
    } else {
      status = 404;
    }
  }

  error.password = passwordErrors;
  error.status = status;
  return error;
};

exports.default = _default;
//# sourceMappingURL=validatePassword.js.map