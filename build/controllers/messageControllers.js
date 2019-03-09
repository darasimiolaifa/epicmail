"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _messageData = _interopRequireDefault(require("../dummy/messageData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      var allMessages = _messageData.default.filter(function (message) {
        return message.status === 'read' || message.status === 'unread';
      });

      res.setHeader('content-type', 'application/json');
      return res.status(200).send({
        status: 200,
        data: allMessages
      });
    }
  }, {
    key: "getAllUnreadMessages",
    value: function getAllUnreadMessages(req, res) {
      var unreadMessages = _messageData.default.filter(function (message) {
        return message.status === 'unread';
      });

      res.setHeader('content-type', 'application/json');
      return res.status(200).send({
        status: 200,
        data: unreadMessages
      });
    }
  }, {
    key: "getAllSentMessages",
    value: function getAllSentMessages(req, res) {
      var sentMessages = _messageData.default.filter(function (message) {
        return message.status === 'sent';
      });

      res.setHeader('content-type', 'application/json');
      return res.status(200).send({
        status: 200,
        data: sentMessages
      });
    }
  }, {
    key: "getSpecificMessage",
    value: function getSpecificMessage(req, res) {
      var id = req.params.id;

      var singleMessage = _messageData.default.filter(function (message) {
        return message.id === Number(id);
      })[0];

      res.setHeader('content-type', 'application/json');

      if (!singleMessage) {
        return res.status(404).send({
          status: 404,
          error: 'Message not found in our database'
        });
      }

      return res.status(200).send({
        status: 200,
        data: singleMessage
      });
    }
  }, {
    key: "deleteSpecificMessage",
    value: function deleteSpecificMessage(req, res) {
      var id = req.params.id;

      var messageIndex = _messageData.default.findIndex(function (message) {
        return message.id === Number(id);
      });

      res.setHeader('content-type', 'application/json');

      if (messageIndex === -1) {
        return res.status(404).send({
          status: 404,
          error: 'Message not found in our database'
        });
      }

      var deletedMessage = _messageData.default.splice(messageIndex, 1)[0];

      return res.status(200).send({
        status: 200,
        data: {
          message: deletedMessage.message
        }
      });
    }
  }, {
    key: "sendMessage",
    value: function sendMessage(req, res) {
      var highestId = _messageData.default.map(function (mail) {
        return mail.id;
      }).reduce(function (maximun, currentId) {
        return Math.max(maximun, currentId);
      });

      var id = highestId + 1;
      var createdOn = _moment.default.HTML5_FMT.DATETIME_LOCAL_MS;

      var message = _objectSpread({
        id: id,
        createdOn: createdOn
      }, req.body);

      _messageData.default.push(message);

      return res.status(200).send({
        status: 200,
        data: {
          message: message
        }
      });
    }
  }]);

  return messageControllers;
}();

exports.default = messageControllers;
//# sourceMappingURL=messageControllers.js.map