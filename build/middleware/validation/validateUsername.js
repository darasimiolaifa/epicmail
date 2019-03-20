"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(url, users, username) {
  var usernameErrors = [];
  var error = {};
  var status = 200;

  if (url === '/api/v1/auth/signup') {
    if (users.findIndex(function (user) {
      return user.username === username;
    }) > -1) {
      usernameErrors.push('The username already exists. Please choose another.');
    }

    if (username.search(new RegExp(/[^0-9A-za-z._]/)) > -1) {
      usernameErrors.push('Username should contain only alphanumeric characters, and the underscore character');
    }

    if (usernameErrors.length > 0) {
      status = 400;
    }
  } else {
    var userIndex = users.findIndex(function (user) {
      return user.username === username;
    }) === -1;

    if (userIndex) {
      usernameErrors.push('This username does not exist in our records.');
      status = 404;
    }
  }

  error.username = usernameErrors;
  error.status = status;
  return error;
};

exports.default = _default;
//# sourceMappingURL=validateUsername.js.map