"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _serverResponse = _interopRequireDefault(require("../utils/serverResponse"));

var _messageModel = _interopRequireDefault(require("../models/messageModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var messageControllers =
/*#__PURE__*/
function () {
  function messageControllers() {
    _classCallCheck(this, messageControllers);
  }

  _createClass(messageControllers, null, [{
    key: "getAllMessages",
    value: function () {
      var _getAllMessages = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var user, allReceivedMessages;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                user = req.user;
                _context.next = 3;
                return _messageModel.default.getAllReceivedMessages(user.id);

              case 3:
                allReceivedMessages = _context.sent;
                return _context.abrupt("return", (0, _serverResponse.default)(res, allReceivedMessages));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getAllMessages(_x, _x2) {
        return _getAllMessages.apply(this, arguments);
      }

      return getAllMessages;
    }()
  }, {
    key: "getUnreadMessages",
    value: function () {
      var _getUnreadMessages = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var user, unreadMessages;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                user = req.user;
                _context2.next = 3;
                return _messageModel.default.getUnreadMessages(user.id);

              case 3:
                unreadMessages = _context2.sent;
                return _context2.abrupt("return", (0, _serverResponse.default)(res, unreadMessages));

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getUnreadMessages(_x3, _x4) {
        return _getUnreadMessages.apply(this, arguments);
      }

      return getUnreadMessages;
    }()
  }, {
    key: "getSentMessages",
    value: function () {
      var _getSentMessages = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var sentMessages;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _messageModel.default.getSentMessages(req.user);

              case 2:
                sentMessages = _context3.sent;
                return _context3.abrupt("return", (0, _serverResponse.default)(res, sentMessages));

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getSentMessages(_x5, _x6) {
        return _getSentMessages.apply(this, arguments);
      }

      return getSentMessages;
    }()
  }, {
    key: "getSpecificMessage",
    value: function () {
      var _getSpecificMessage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var id, singleMessage;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = req.params.id;
                _context4.next = 3;
                return _messageModel.default.getSpecificMessage(id);

              case 3:
                singleMessage = _context4.sent;
                return _context4.abrupt("return", (0, _serverResponse.default)(res, singleMessage));

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function getSpecificMessage(_x7, _x8) {
        return _getSpecificMessage.apply(this, arguments);
      }

      return getSpecificMessage;
    }()
  }, {
    key: "deleteSpecificMessage",
    value: function () {
      var _deleteSpecificMessage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        var id, user, deletedMessage;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                id = req.params.id;
                user = req.user;
                _context5.next = 4;
                return _messageModel.default.deleteSpecificMessage(user, id);

              case 4:
                deletedMessage = _context5.sent;
                return _context5.abrupt("return", (0, _serverResponse.default)(res, {
                  message: deletedMessage.message
                }));

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function deleteSpecificMessage(_x9, _x10) {
        return _deleteSpecificMessage.apply(this, arguments);
      }

      return deleteSpecificMessage;
    }()
  }, {
    key: "sendMessage",
    value: function () {
      var _sendMessage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(req, res) {
        var message;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _messageModel.default.sendMessage(req);

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

      function sendMessage(_x11, _x12) {
        return _sendMessage.apply(this, arguments);
      }

      return sendMessage;
    }()
  }]);

  return messageControllers;
}();

exports.default = messageControllers;
//# sourceMappingURL=messageControllers.js.map