"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _serverResponse = _interopRequireDefault(require("../utils/serverResponse"));

var _messageModel = _interopRequireDefault(require("../models/messageModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    value: function getAllMessages(req, res) {
      var allMessages = _messageModel.default.getAllMessages();

      return (0, _serverResponse.default)(res, allMessages);
    }
  }, {
    key: "getUnreadMessages",
    value: function getUnreadMessages(req, res) {
      var unreadMessages = _messageModel.default.getUnreadMessages();

      return (0, _serverResponse.default)(res, unreadMessages);
    }
  }, {
    key: "getSentMessages",
    value: function getSentMessages(req, res) {
      var sentMessages = _messageModel.default.getSentMessages();

      return (0, _serverResponse.default)(res, sentMessages);
    }
  }, {
    key: "getSpecificMessage",
    value: function getSpecificMessage(req, res) {
      var id = req.body.id;

      var singleMessage = _messageModel.default.getSpecificMessage(id);

      return (0, _serverResponse.default)(res, singleMessage);
    }
  }, {
    key: "deleteSpecificMessage",
    value: function deleteSpecificMessage(req, res) {
      var id = req.body.id;

      var deletedMessage = _messageModel.default.deleteSpecificMessage(id);

      return (0, _serverResponse.default)(res, {
        message: deletedMessage.message
      });
    }
  }, {
    key: "sendMessage",
    value: function sendMessage(req, res) {
      var message = _messageModel.default.sendMessage(req.body);

      return (0, _serverResponse.default)(res, {
        message: message
      });
    }
  }]);

  return messageControllers;
}();

exports.default = messageControllers;
//# sourceMappingURL=messageControllers.js.map