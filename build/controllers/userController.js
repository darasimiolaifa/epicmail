"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _usersData = _interopRequireDefault(require("../dummy/usersData"));

var _serverResponse = _interopRequireDefault(require("../utils/serverResponse"));

var _filterData = _interopRequireDefault(require("../utils/filterData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var userControllers =
/*#__PURE__*/
function () {
  function userControllers() {
    _classCallCheck(this, userControllers);
  }

  _createClass(userControllers, null, [{
    key: "getAllUsers",
    value: function getAllUsers(req, res) {
      return (0, _serverResponse.default)(res, _usersData.default);
    }
  }, {
    key: "getUserById",
    value: function getUserById(req, res) {
      var user = (0, _filterData.default)(_usersData.default, 'id', req.id);
      return (0, _serverResponse.default)(res, user);
    }
  }]);

  return userControllers;
}();

exports.default = userControllers;
//# sourceMappingURL=userController.js.map