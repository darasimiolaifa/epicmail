"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _filterData = _interopRequireDefault(require("../utils/filterData"));

var _idGenerator = _interopRequireDefault(require("../utils/idGenerator"));

var _usersData = _interopRequireDefault(require("../dummy/usersData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UserModel =
/*#__PURE__*/
function () {
  function UserModel() {
    _classCallCheck(this, UserModel);

    this.users = _usersData.default;
  }

  _createClass(UserModel, [{
    key: "getAllusers",
    value: function getAllusers() {
      return this.users;
    }
  }, {
    key: "getUserbyId",
    value: function getUserbyId(id) {
      var user = (0, _filterData.default)(this.user, 'id', id);
      return user;
    }
  }, {
    key: "createUser",
    value: function createUser(payload) {
      var username = payload.username,
          password = payload.password;

      var salt = _bcryptjs.default.genSaltSync();

      var hashedPassword = _bcryptjs.default.hashSync(password, salt);

      var email = "".concat(username, "@epicmail.com");
      var id = (0, _idGenerator.default)(this.users) + 1;

      var user = _objectSpread({
        id: id,
        email: email,
        salt: salt
      }, payload, {
        password: hashedPassword
      });

      this.users.push(user);
      return user;
    }
  }]);

  return UserModel;
}();

var _default = new UserModel();

exports.default = _default;
//# sourceMappingURL=userModel.js.map