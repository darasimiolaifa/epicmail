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
        var query, messages;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = 'SELECT * FROM messages INNER JOIN inbox on messages.id = inbox.message_id WHERE inbox.user_id = $1';
                _context.prev = 1;
                _context.next = 4;
                return _database.default.query(query, [userId]);

              case 4:
                messages = _context.sent;
                return _context.abrupt("return", messages);

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);
                return _context.abrupt("return", _context.t0);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 8]]);
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
        var query, message;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = 'SELECT * FROM messages wHERE id = $1';
                _context2.prev = 1;
                _context2.next = 4;
                return _database.default.query(query, [id]);

              case 4:
                message = _context2.sent;
                return _context2.abrupt("return", message);

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](1);
                return _context2.abrupt("return", _context2.t0);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 8]]);
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
      regeneratorRuntime.mark(function _callee3(senderId) {
        var query, messages;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                query = 'SELECT * FROM messages wHERE sender_id = $1';
                _context3.prev = 1;
                _context3.next = 4;
                return _database.default.query(query, [senderId]);

              case 4:
                messages = _context3.sent;
                return _context3.abrupt("return", messages);

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](1);
                return _context3.abrupt("return", _context3.t0);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 8]]);
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
        var query, messages;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                query = 'SELECT * FROM messages INNER JOIN inbox on messages.id = inbox.message_id WHERE inbox.user_id = $1 AND message.status = $2';
                _context4.prev = 1;
                _context4.next = 4;
                return _database.default.query(query, [userId, 'unread']);

              case 4:
                messages = _context4.sent;
                return _context4.abrupt("return", messages);

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](1);
                return _context4.abrupt("return", _context4.t0);

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 8]]);
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
        var selectQuery, deleteQuery, _ref, rows, message;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                selectQuery = 'SELECT senderId, status FROM messages INNER JOIN inbox ON inbox.message_id = messages.id WHERE message.id = $1';
                deleteQuery = 'DELETE FROM messages WHERE id = $1 RETURNING *';
                _context5.prev = 2;
                _context5.next = 5;
                return _database.default.query(selectQuery, [messageId]);

              case 5:
                _ref = _context5.sent;
                rows = _ref.rows;

                if (!(rows.sender_id === user.id && rows.status === 'read')) {
                  _context5.next = 9;
                  break;
                }

                return _context5.abrupt("return", {
                  messaage: 'Message has been read already.'
                });

              case 9:
                _context5.next = 11;
                return _database.default.query(deleteQuery, [messageId]);

              case 11:
                message = _context5.sent;
                return _context5.abrupt("return", message);

              case 15:
                _context5.prev = 15;
                _context5.t0 = _context5["catch"](2);
                return _context5.abrupt("return", _context5.t0);

              case 18:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[2, 15]]);
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
        var subject, message, senderId, receiverId, createdOn, messageQuery, inboxQuery, _ref2, rows, result;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                subject = payload.subject, message = payload.message, senderId = payload.senderId, receiverId = payload.receiverId;
                createdOn = new Date();
                messageQuery = 'INSERT INTO messages(subject, message, created_on, sender_id, receiver_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING id';
                inboxQuery = 'INSERT INTO inbox(receiver_id, message_id, status) VALUES($1, $2, $3) RETURNING *';
                _context6.prev = 4;
                _context6.next = 7;
                return _database.default.query(messageQuery, [subject, message, createdOn, senderId, receiverId]);

              case 7:
                _ref2 = _context6.sent;
                rows = _ref2.rows;
                _context6.next = 11;
                return _database.default.query(inboxQuery, [receiverId, rows.id, 'unread']);

              case 11:
                result = _context6.sent;
                return _context6.abrupt("return", _objectSpread({}, rows, {
                  inbox_id: result.id
                }));

              case 15:
                _context6.prev = 15;
                _context6.t0 = _context6["catch"](4);
                return _context6.abrupt("return", _context6.t0);

              case 18:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[4, 15]]);
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