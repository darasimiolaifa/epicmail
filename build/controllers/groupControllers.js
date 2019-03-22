"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _serverResponse = _interopRequireDefault(require("../utils/serverResponse"));

var _groupModel = _interopRequireDefault(require("../models/groupModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var groupControllers =
/*#__PURE__*/
function () {
  function groupControllers() {
    _classCallCheck(this, groupControllers);
  }

  _createClass(groupControllers, null, [{
    key: "getAllGroups",
    value: function () {
      var _getAllGroups = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var user, allUserGroups;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                user = req.user;
                _context.next = 3;
                return _groupModel.default.getAllGroups(user.id);

              case 3:
                allUserGroups = _context.sent;
                return _context.abrupt("return", (0, _serverResponse.default)(res, allUserGroups));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getAllGroups(_x, _x2) {
        return _getAllGroups.apply(this, arguments);
      }

      return getAllGroups;
    }()
  }, {
    key: "createGroup",
    value: function () {
      var _createGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var newGroup;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _groupModel.default.createGroup(req);

              case 2:
                newGroup = _context2.sent;
                return _context2.abrupt("return", (0, _serverResponse.default)(res, newGroup));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function createGroup(_x3, _x4) {
        return _createGroup.apply(this, arguments);
      }

      return createGroup;
    }()
  }, {
    key: "editGroupName",
    value: function () {
      var _editGroupName = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var editedGroup;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _groupModel.default.editGroupName(req);

              case 2:
                editedGroup = _context3.sent;
                return _context3.abrupt("return", (0, _serverResponse.default)(res, editedGroup));

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function editGroupName(_x5, _x6) {
        return _editGroupName.apply(this, arguments);
      }

      return editGroupName;
    }()
  }, {
    key: "addUserToGroup",
    value: function () {
      var _addUserToGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var newGroupUser;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _groupModel.default.addUserToGroup(req);

              case 2:
                newGroupUser = _context4.sent;
                return _context4.abrupt("return", (0, _serverResponse.default)(res, newGroupUser));

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function addUserToGroup(_x7, _x8) {
        return _addUserToGroup.apply(this, arguments);
      }

      return addUserToGroup;
    }()
  }, {
    key: "deleteUserFromSpecificGroup",
    value: function () {
      var _deleteUserFromSpecificGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        var deletedUser;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _groupModel.default.deleteUserFromSpecificGroup(req);

              case 2:
                deletedUser = _context5.sent;
                return _context5.abrupt("return", (0, _serverResponse.default)(res, {
                  message: deletedUser
                }));

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function deleteUserFromSpecificGroup(_x9, _x10) {
        return _deleteUserFromSpecificGroup.apply(this, arguments);
      }

      return deleteUserFromSpecificGroup;
    }()
  }, {
    key: "deleteSpecificGroup",
    value: function () {
      var _deleteSpecificGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(req, res) {
        var message;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _groupModel.default.deleteSpecificGroup(req);

              case 2:
                message = _context6.sent;
                return _context6.abrupt("return", (0, _serverResponse.default)(res, {
                  message: message
                }));

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function deleteSpecificGroup(_x11, _x12) {
        return _deleteSpecificGroup.apply(this, arguments);
      }

      return deleteSpecificGroup;
    }()
  }]);

  return groupControllers;
}();

exports.default = groupControllers;
//# sourceMappingURL=groupControllers.js.map