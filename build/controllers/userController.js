"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _serverResponse = _interopRequireDefault(require("../utils/serverResponse"));

var _userModel = _interopRequireDefault(require("../models/userModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
    value: function () {
      var _getAllUsers = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _userModel.default.getAllusers();

              case 2:
                response = _context.sent;

                if (!(response.name && response.name === 'error')) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", (0, _serverResponse.default)(res, response, 500));

              case 5:
                return _context.abrupt("return", (0, _serverResponse.default)(res, response));

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getAllUsers(_x, _x2) {
        return _getAllUsers.apply(this, arguments);
      }

      return getAllUsers;
    }()
  }, {
    key: "getUserById",
    value: function () {
      var _getUserById = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var id, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = req.params.id;
                _context2.next = 3;
                return _userModel.default.getUserbyId(id);

              case 3:
                response = _context2.sent;

                if (!(response.name && response.name === 'error')) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return", (0, _serverResponse.default)(res, response, 500));

              case 6:
                return _context2.abrupt("return", (0, _serverResponse.default)(res, response));

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getUserById(_x3, _x4) {
        return _getUserById.apply(this, arguments);
      }

      return getUserById;
    }()
  }, {
    key: "deleteUserById",
    value: function () {
      var _deleteUserById = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var id, response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = req.params.id;
                _context3.next = 3;
                return _userModel.default.deleteUserbyId(id);

              case 3:
                response = _context3.sent;

                if (!(response.name && response.name === 'error')) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt("return", (0, _serverResponse.default)(res, response, 500));

              case 6:
                return _context3.abrupt("return", (0, _serverResponse.default)(res, response));

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function deleteUserById(_x5, _x6) {
        return _deleteUserById.apply(this, arguments);
      }

      return deleteUserById;
    }()
  }]);

  return userControllers;
}();

exports.default = userControllers;
//# sourceMappingURL=userController.js.map