"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _database = _interopRequireDefault(require("../database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UserModel =
/*#__PURE__*/
function () {
  function UserModel() {
    _classCallCheck(this, UserModel);
  }

  _createClass(UserModel, null, [{
    key: "getAllusers",
    value: function () {
      var _getAllusers = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var query, _ref, rows;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = 'SELECT * FROM users';
                _context.prev = 1;
                _context.next = 4;
                return _database.default.query(query);

              case 4:
                _ref = _context.sent;
                rows = _ref.rows;
                return _context.abrupt("return", rows);

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](1);
                return _context.abrupt("return", _context.t0);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 9]]);
      }));

      function getAllusers() {
        return _getAllusers.apply(this, arguments);
      }

      return getAllusers;
    }()
  }, {
    key: "getUserbyUsername",
    value: function () {
      var _getUserbyUsername = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(username) {
        var query, _ref2, rows;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = 'SELECT * FROM users WHERE username = $1';
                _context2.prev = 1;
                _context2.next = 4;
                return _database.default.query(query, [username]);

              case 4:
                _ref2 = _context2.sent;
                rows = _ref2.rows;
                return _context2.abrupt("return", rows[0]);

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](1);
                return _context2.abrupt("return", _context2.t0);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 9]]);
      }));

      function getUserbyUsername(_x) {
        return _getUserbyUsername.apply(this, arguments);
      }

      return getUserbyUsername;
    }()
  }, {
    key: "getUserbyId",
    value: function () {
      var _getUserbyId = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(id) {
        var query, _ref3, rows;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                query = 'SELECT * FROM users WHERE id = $1';
                _context3.prev = 1;
                _context3.next = 4;
                return _database.default.query(query, [id]);

              case 4:
                _ref3 = _context3.sent;
                rows = _ref3.rows;
                return _context3.abrupt("return", rows[0]);

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3["catch"](1);
                return _context3.abrupt("return", _context3.t0);

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 9]]);
      }));

      function getUserbyId(_x2) {
        return _getUserbyId.apply(this, arguments);
      }

      return getUserbyId;
    }()
  }, {
    key: "createUser",
    value: function () {
      var _createUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(payload) {
        var username, password, firstName, lastName, salt, hashedPassword, email, createdOn, query, _ref4, rows;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                username = payload.username, password = payload.password, firstName = payload.firstName, lastName = payload.lastName;
                _context4.next = 3;
                return _bcryptjs.default.genSalt();

              case 3:
                salt = _context4.sent;
                _context4.next = 6;
                return _bcryptjs.default.hash(password, salt);

              case 6:
                hashedPassword = _context4.sent;
                email = "".concat(username.toLowerCase(), "@epicmail.com");
                createdOn = new Date();
                query = 'INSERT INTO users(first_name, last_name, password, created_on, username, email) VALUES($1, $2, $3, $4, $5, $6) RETURNING id, first_name, last_name, username';
                _context4.prev = 10;
                _context4.next = 13;
                return _database.default.query(query, [firstName.toLowerCase(), lastName.toLowerCase(), hashedPassword, createdOn, username.toLowerCase(), email]);

              case 13:
                _ref4 = _context4.sent;
                rows = _ref4.rows;
                return _context4.abrupt("return", rows);

              case 18:
                _context4.prev = 18;
                _context4.t0 = _context4["catch"](10);
                return _context4.abrupt("return", _context4.t0);

              case 21:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[10, 18]]);
      }));

      function createUser(_x3) {
        return _createUser.apply(this, arguments);
      }

      return createUser;
    }()
  }, {
    key: "deleteUserbyId",
    value: function () {
      var _deleteUserbyId = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(id) {
        var query, _ref5, rows;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                query = 'DELETE * FROM users wHERE id = $1 RETURNING *';
                _context5.prev = 1;
                _context5.next = 4;
                return _database.default.query(query, [id]);

              case 4:
                _ref5 = _context5.sent;
                rows = _ref5.rows;
                return _context5.abrupt("return", rows);

              case 9:
                _context5.prev = 9;
                _context5.t0 = _context5["catch"](1);
                return _context5.abrupt("return", _context5.t0);

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[1, 9]]);
      }));

      function deleteUserbyId(_x4) {
        return _deleteUserbyId.apply(this, arguments);
      }

      return deleteUserbyId;
    }()
  }]);

  return UserModel;
}();

var _default = UserModel;
exports.default = _default;
//# sourceMappingURL=userModel.js.map