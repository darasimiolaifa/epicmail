"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(username) {
  return _jsonwebtoken.default.sign({
    iss: 'epicmail',
    sub: username
  }, process.env.APP_SECRET);
};

exports.default = _default;
//# sourceMappingURL=generateToken.js.map