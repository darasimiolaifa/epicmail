"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _usersData = _interopRequireDefault(require("../dummy/usersData"));

var _serverResponse = _interopRequireDefault(require("./controllerHelpers/serverResponse"));

var _generateToken = _interopRequireDefault(require("./controllerHelpers/generateToken"));

var _idGenerator = _interopRequireDefault(require("./controllerHelpers/idGenerator"));

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
      var _req$body = req.body,
          username = _req$body.username,
          password = _req$body.password;

      var salt = _bcryptjs.default.genSaltSync();

      var hashedPassword = _bcryptjs.default.hashSync(password, salt);

      var email = "".concat(username, "@epicmail.com");
      var id = (0, _idGenerator.default)(_usersData.default) + 1;

      _usersData.default.push(_objectSpread({
        id: id,
        email: email,
        salt: salt
      }, req.body, {
        password: hashedPassword
      })); // generate token with users username


      var token = (0, _generateToken.default)(username);
      return (0, _serverResponse.default)(res, {
        token: token
      }, 201);
    }
  }, {
    key: "login",
    value: function login(req, res) {
      var username = req.body.username;
      var token = (0, _generateToken.default)(username);
      return (0, _serverResponse.default)(res, {
        token: token
      });
    }
  }]);

  return authControllers;
}();

exports.default = authControllers;
//# sourceMappingURL=authControllers.js.map