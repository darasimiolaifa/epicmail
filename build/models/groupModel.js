"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _database = _interopRequireDefault(require("../database"));

var _userModel = _interopRequireDefault(require("./userModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GroupModel =
/*#__PURE__*/
function () {
  function GroupModel() {
    _classCallCheck(this, GroupModel);
  }

  _createClass(GroupModel, null, [{
    key: "getAllGroups",
    value: function () {
      var _getAllGroups = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(userId) {
        var query, _ref, rows;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = 'SELECT * FROM groups WHERE owner_id = $1';
                _context.prev = 1;
                _context.next = 4;
                return _database.default.query(query, [userId]);

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

      function getAllGroups(_x) {
        return _getAllGroups.apply(this, arguments);
      }

      return getAllGroups;
    }()
  }, {
    key: "createGroup",
    value: function () {
      var _createGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(payload) {
        var _payload$body, name, description, user, createdOn, nameCheck, query, _ref2, rowCount, groupEmail, _ref3, rows;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _payload$body = payload.body, name = _payload$body.name, description = _payload$body.description;
                user = payload.user;
                createdOn = new Date();
                nameCheck = 'SELECT * FROM groups WHERE name = $1';
                query = 'INSERT INTO groups (name, description, owner_id, group_email, created_on) VALUES($1, $2, $3, $4, $5) RETURNING *';
                _context2.prev = 5;
                _context2.next = 8;
                return _database.default.query(nameCheck, [name]);

              case 8:
                _ref2 = _context2.sent;
                rowCount = _ref2.rowCount;

                if (!(rowCount > 0)) {
                  _context2.next = 12;
                  break;
                }

                return _context2.abrupt("return", {
                  message: "The group name ".concat(name, " already exists. Please choose another")
                });

              case 12:
                groupEmail = "".concat(name, "@epicmail.com");
                _context2.next = 15;
                return _database.default.query(query, [name, description, user.id, groupEmail, createdOn]);

              case 15:
                _ref3 = _context2.sent;
                rows = _ref3.rows;
                return _context2.abrupt("return", rows[0]);

              case 20:
                _context2.prev = 20;
                _context2.t0 = _context2["catch"](5);
                return _context2.abrupt("return", _context2.t0);

              case 23:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[5, 20]]);
      }));

      function createGroup(_x2) {
        return _createGroup.apply(this, arguments);
      }

      return createGroup;
    }()
  }, {
    key: "editGroupName",
    value: function () {
      var _editGroupName = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(payload) {
        var name, groupId, user, query, _ref4, rows;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                name = payload.body.name;
                groupId = payload.params.groupId;
                user = payload.user;
                query = 'UPDATE groups SET name = $1 WHERE id = $2 AND owner_id = $3 RETURNING *';
                _context3.prev = 4;
                _context3.next = 7;
                return _database.default.query(query, [name, groupId, user.id]);

              case 7:
                _ref4 = _context3.sent;
                rows = _ref4.rows;
                return _context3.abrupt("return", rows[0]);

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3["catch"](4);
                return _context3.abrupt("return", _context3.t0);

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[4, 12]]);
      }));

      function editGroupName(_x3) {
        return _editGroupName.apply(this, arguments);
      }

      return editGroupName;
    }()
  }, {
    key: "addUserToGroup",
    value: function () {
      var _addUserToGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(payload) {
        var email, groupId, user, newUser, ownerShipQuery, query, response, groupOwner, _ref5, rows, _rows;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                email = payload.body.email;
                groupId = payload.params.groupId;
                user = payload.user;
                _context4.next = 5;
                return _userModel.default.getUserbyEmail(email);

              case 5:
                newUser = _context4.sent;
                ownerShipQuery = 'SELECT * FROM groups WHERE id = $1';
                query = 'INSERT INTO groups_members(group_id, member_id) VALUES($1, $2) RETURNING *';
                _context4.prev = 8;
                _context4.next = 11;
                return _database.default.query(ownerShipQuery, [groupId]);

              case 11:
                groupOwner = _context4.sent;

                if (groupOwner.rowCount === 0) {
                  response = {
                    message: 'There is no such group in our records.'
                  };
                } else if (groupOwner.rows[0].owner_id !== user.id) {
                  response = {
                    message: 'You are not the owner of this group and so do not have access to it.'
                  };
                }

                _context4.next = 15;
                return _database.default.query(query, [groupId, newUser.id]);

              case 15:
                _ref5 = _context4.sent;
                rows = _ref5.rows;
                _rows = _slicedToArray(rows, 1);
                response = _rows[0];
                return _context4.abrupt("return", response);

              case 22:
                _context4.prev = 22;
                _context4.t0 = _context4["catch"](8);
                return _context4.abrupt("return", _context4.t0);

              case 25:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[8, 22]]);
      }));

      function addUserToGroup(_x4) {
        return _addUserToGroup.apply(this, arguments);
      }

      return addUserToGroup;
    }()
  }, {
    key: "deleteUserFromSpecificGroup",
    value: function () {
      var _deleteUserFromSpecificGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(payload) {
        var _payload$params, groupId, userId, owner, response, ownerShipQuery, newUser, deleteQuery, groupOwner;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _payload$params = payload.params, groupId = _payload$params.groupId, userId = _payload$params.userId;
                owner = payload.user;
                ownerShipQuery = 'SELECT * FROM groups WHERE id = $1';
                _context5.next = 5;
                return _userModel.default.getUserbyId(userId);

              case 5:
                newUser = _context5.sent;
                deleteQuery = 'DELETE FROM groups_members WHERE group_id = $1 AND member_id = $2 RETURNING *';
                _context5.prev = 7;
                _context5.next = 10;
                return _database.default.query(ownerShipQuery, [groupId]);

              case 10:
                groupOwner = _context5.sent;

                if (!(groupOwner.rowCount === 0)) {
                  _context5.next = 15;
                  break;
                }

                response = {
                  message: 'There is no such group in our records.'
                };
                _context5.next = 22;
                break;

              case 15:
                if (!(groupOwner.rows[0].owner_id !== owner.id)) {
                  _context5.next = 19;
                  break;
                }

                response = {
                  message: 'You are not the owner of this group and so do not have access to it.'
                };
                _context5.next = 22;
                break;

              case 19:
                _context5.next = 21;
                return _database.default.query(deleteQuery, [groupId, newUser.id]);

              case 21:
                response = "User ".concat(newUser.email, " deleted from group successfully");

              case 22:
                return _context5.abrupt("return", response);

              case 25:
                _context5.prev = 25;
                _context5.t0 = _context5["catch"](7);
                return _context5.abrupt("return", _context5.t0);

              case 28:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[7, 25]]);
      }));

      function deleteUserFromSpecificGroup(_x5) {
        return _deleteUserFromSpecificGroup.apply(this, arguments);
      }

      return deleteUserFromSpecificGroup;
    }()
  }, {
    key: "deleteSpecificGroup",
    value: function () {
      var _deleteSpecificGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(payload) {
        var groupId, owner, ownerShipQuery, query, response, groupOwner, _ref6, rows, _rows2;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                groupId = payload.params.groupId;
                owner = payload.user;
                ownerShipQuery = 'SELECT * FROM groups WHERE id = $1';
                query = 'DELETE FROM groups WHERE id = $1 RETURNING *';
                _context6.prev = 4;
                _context6.next = 7;
                return _database.default.query(ownerShipQuery, [groupId]);

              case 7:
                groupOwner = _context6.sent;

                if (!(groupOwner.rowCount === 0)) {
                  _context6.next = 12;
                  break;
                }

                response = {
                  message: 'There is no such group in our records.'
                };
                _context6.next = 22;
                break;

              case 12:
                if (!(groupOwner.rows[0].owner_id !== owner.id)) {
                  _context6.next = 16;
                  break;
                }

                response = {
                  message: 'You are not the owner of this group and so do not have access to it.'
                };
                _context6.next = 22;
                break;

              case 16:
                _context6.next = 18;
                return _database.default.query(query, [groupId]);

              case 18:
                _ref6 = _context6.sent;
                rows = _ref6.rows;
                _rows2 = _slicedToArray(rows, 1);
                response = _rows2[0];

              case 22:
                return _context6.abrupt("return", response);

              case 25:
                _context6.prev = 25;
                _context6.t0 = _context6["catch"](4);
                return _context6.abrupt("return", _context6.t0);

              case 28:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[4, 25]]);
      }));

      function deleteSpecificGroup(_x6) {
        return _deleteSpecificGroup.apply(this, arguments);
      }

      return deleteSpecificGroup;
    }()
  }]);

  return GroupModel;
}();

var _default = GroupModel;
exports.default = _default;
//# sourceMappingURL=groupModel.js.map