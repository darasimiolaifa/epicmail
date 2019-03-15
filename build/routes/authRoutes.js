"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _authControllers = _interopRequireDefault(require("../controllers/authControllers"));

var _authValidation = _interopRequireDefault(require("../middleware/validation/authValidation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var signup = _authControllers.default.signup,
    login = _authControllers.default.login;

var _default = function _default(app) {
  // add signup route
  app.route('/api/v1/auth/signup').post(_authValidation.default, signup); // add signin route

  app.route('/api/v1/auth/login').post(_authValidation.default, login);
};

exports.default = _default;
//# sourceMappingURL=authRoutes.js.map