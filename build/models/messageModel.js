"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _database = _interopRequireDefault(require("../database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MessageModel =
/*#__PURE__*/
function () {
  function MessageModel() {
    _classCallCheck(this, MessageModel);
  }

  _createClass(MessageModel, null, [{
    key: "getAllReceivedMessages",
    value: function () {
      var _getAllReceivedMessages = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(userId) {
        var query, _ref, rows;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = 'SELECT * FROM messages INNER JOIN inbox on messages.id = inbox.message_id WHERE inbox.receiver_id = $1';
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

      function getAllReceivedMessages(_x) {
        return _getAllReceivedMessages.apply(this, arguments);
      }

      return getAllReceivedMessages;
    }()
  }, {
    key: "getSpecificMessage",
    value: function () {
      var _getSpecificMessage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(id) {
        var query, _ref2, rows;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = 'SELECT * FROM messages wHERE id = $1';
                _context2.prev = 1;
                _context2.next = 4;
                return _database.default.query(query, [id]);

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

      function getSpecificMessage(_x2) {
        return _getSpecificMessage.apply(this, arguments);
      }

      return getSpecificMessage;
    }()
  }, {
    key: "getSentMessages",
    value: function () {
      var _getSentMessages = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(user) {
        var query, _ref3, rows;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                query = 'SELECT * FROM messages wHERE sender_id = $1';
                _context3.prev = 1;
                _context3.next = 4;
                return _database.default.query(query, [user.id]);

              case 4:
                _ref3 = _context3.sent;
                rows = _ref3.rows;
                return _context3.abrupt("return", rows);

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

      function getSentMessages(_x3) {
        return _getSentMessages.apply(this, arguments);
      }

      return getSentMessages;
    }()
  }, {
    key: "getUnreadMessages",
    value: function () {
      var _getUnreadMessages = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(userId) {
        var query, _ref4, rows;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                query = 'SELECT * FROM messages INNER JOIN inbox on messages.id = inbox.message_id WHERE inbox.receiver_id = $1 AND inbox.status = $2';
                _context4.prev = 1;
                _context4.next = 4;
                return _database.default.query(query, [userId, 'unread']);

              case 4:
                _ref4 = _context4.sent;
                rows = _ref4.rows;
                return _context4.abrupt("return", rows);

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4["catch"](1);
                return _context4.abrupt("return", _context4.t0);

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 9]]);
      }));

      function getUnreadMessages(_x4) {
        return _getUnreadMessages.apply(this, arguments);
      }

      return getUnreadMessages;
    }()
  }, {
    key: "deleteSpecificMessage",
    value: function () {
      var _deleteSpecificMessage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(user, messageId) {
        var selectQuery, deleteQuery, _ref5, rows, message;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                selectQuery = 'SELECT sender_id, status FROM messages INNER JOIN inbox ON inbox.message_id = messages.id WHERE messages.id = $1';
                deleteQuery = 'DELETE FROM messages WHERE id = $1 RETURNING *';
                _context5.prev = 2;
                _context5.next = 5;
                return _database.default.query(selectQuery, [messageId]);

              case 5:
                _ref5 = _context5.sent;
                rows = _ref5.rows;

                if (!(rows[0].sender_id !== user.id)) {
                  _context5.next = 9;
                  break;
                }

                return _context5.abrupt("return", {
                  messaage: 'This message is not yours. You do not have access to it.'
                });

              case 9:
                if (!(rows.status === 'read')) {
                  _context5.next = 11;
                  break;
                }

                return _context5.abrupt("return", {
                  messaage: 'Message has been read already.'
                });

              case 11:
                _context5.next = 13;
                return _database.default.query(deleteQuery, [messageId]);

              case 13:
                message = _context5.sent;
                return _context5.abrupt("return", message.rows[0]);

              case 17:
                _context5.prev = 17;
                _context5.t0 = _context5["catch"](2);
                return _context5.abrupt("return", _context5.t0);

              case 20:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[2, 17]]);
      }));

      function deleteSpecificMessage(_x5, _x6) {
        return _deleteSpecificMessage.apply(this, arguments);
      }

      return deleteSpecificMessage;
    }()
  }, {
    key: "sendMessage",
    value: function () {
      var _sendMessage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(payload) {
        var _payload$body, subject, message, receiverEmail, user, createdOn, receiverQuery, messageQuery, inboxQuery, receiverResult, receiverId, _ref6, rows, savedMessage, results, inboxMessage;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _payload$body = payload.body, subject = _payload$body.subject, message = _payload$body.message, receiverEmail = _payload$body.receiverEmail;
                user = payload.user;
                createdOn = new Date();
                receiverQuery = 'SELECT * FROM users WHERE email = $1';
                messageQuery = 'INSERT INTO messages(subject, message, created_on, sender_id) VALUES($1, $2, $3, $4) RETURNING *';
                inboxQuery = 'INSERT INTO inbox(receiver_id, message_id, status) VALUES($1, $2, $3) RETURNING *';
                _context6.prev = 6;
                _context6.next = 9;
                return _database.default.query(receiverQuery, [receiverEmail]);

              case 9:
                receiverResult = _context6.sent;
                receiverId = receiverResult.rows[0].id;
                _context6.next = 13;
                return _database.default.query(messageQuery, [subject, message, createdOn, user.id]);

              case 13:
                _ref6 = _context6.sent;
                rows = _ref6.rows;
                savedMessage = rows[0];
                _context6.next = 18;
                return _database.default.query(inboxQuery, [receiverId, savedMessage.id, 'unread']);

              case 18:
                results = _context6.sent;
                inboxMessage = results.rows[0];
                return _context6.abrupt("return", _objectSpread({}, savedMessage, {
                  inbox_id: inboxMessage.id
                }));

              case 23:
                _context6.prev = 23;
                _context6.t0 = _context6["catch"](6);
                return _context6.abrupt("return", _context6.t0);

              case 26:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[6, 23]]);
      }));

      function sendMessage(_x7) {
        return _sendMessage.apply(this, arguments);
      }

      return sendMessage;
    }()
  }]);

  return MessageModel;
}();

var _default = MessageModel;
exports.default = _default;
//# sourceMappingURL=messageModel.js.map