"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _usersData = _interopRequireDefault(require("../dummy/usersData"));

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

      var id = _usersData.default.length + 1;
      var email = "".concat(username, "@epicmail.com");

      _usersData.default.push(_objectSpread({
        id: id,
        email: email,
        salt: salt
      }, req.body, {
        password: hashedPassword
      })); // generate token with users username


      var token = _jsonwebtoken.default.sign({
        iss: 'epicmail',
        sub: username
      }, process.env.APP_SECRET);

      return res.status(201).send({
        status: 201,
        data: {
          token: token
        }
      });
    }
  }, {
    key: "login",
    value: function login(req, res) {
      var username = req.body.username;

      var token = _jsonwebtoken.default.sign({
        iss: 'epicmail',
        sub: username
      }, process.env.APP_SECRET);

      return res.status(200).send({
        status: 200,
        data: {
          token: token
        }
      });
    }
  }]);

  return authControllers;
}();

exports.default = authControllers;
//# sourceMappingURL=authControllers.js.map