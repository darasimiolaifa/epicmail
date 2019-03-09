"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var validateUsername = function validateUsername(url, users, username) {
  var usernameErrors = [];
  var hasErrors;
  var statusCode;

  if (url === '/api/v1/auth/signup') {
    if (users.findIndex(function (user) {
      return user.username === username;
    }) > -1) {
      usernameErrors.push('The username already exists. Please choose another.');
    }

    if (username.search(new RegExp(/[^0-9A-za-z._]/)) > -1) {
      usernameErrors.push('Username should contain only alphanumeric, the dot, and underscore characters');
    }

    if (usernameErrors.length > 0) {
      statusCode = 400;
      hasErrors = true;
    }
  } else {
    var userIndex = users.findIndex(function (user) {
      return user.username === username;
    }) === -1;

    if (userIndex) {
      usernameErrors.push('This username does not exist in our records.');
      statusCode = 404;
      hasErrors = true;
    }
  }

  return {
    usernameErrors: usernameErrors,
    statusCode: statusCode,
    hasErrors: hasErrors
  };
};

var _default = validateUsername;
exports.default = _default;
//# sourceMappingURL=validateUsername.js.map