"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _serverResponse = _interopRequireDefault(require("../utils/serverResponse"));

var _generateToken = _interopRequireDefault(require("../utils/generateToken"));

var _userModel = _interopRequireDefault(require("../models/userModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var authControllers =
/*#__PURE__*/
function () {
  function authControllers() {
    _classCallCheck(this, authControllers);
  }

  _createClass(authControllers, null, [{
    key: "signup",
    value: function signup(req, res) {
      var user = _userModel.default.createUser(req.body); // generate token with users object


      var token = (0, _generateToken.default)(user);
      return (0, _serverResponse.default)(res, {
        token: token,
        user: user
      }, 201);
    }
  }, {
    key: "login",
    value: function login(req, res) {
      var user = _objectSpread({}, req.body);

      var token = (0, _generateToken.default)(user);
      return (0, _serverResponse.default)(res, {
        token: token
      });
    }
  }]);

  return authControllers;
}();

exports.default = authControllers;
//# sourceMappingURL=authControllers.js.map