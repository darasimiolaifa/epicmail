"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _filterData = _interopRequireDefault(require("../utils/filterData"));

var _idGenerator = _interopRequireDefault(require("../utils/idGenerator"));

var _messageData = _interopRequireDefault(require("../dummy/messageData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MessageModel =
/*#__PURE__*/
function () {
  function MessageModel() {
    _classCallCheck(this, MessageModel);

    this.messages = _messageData.default;
  }

  _createClass(MessageModel, [{
    key: "getAllMessages",
    value: function getAllMessages() {
      return (0, _filterData.default)(this.messages, 'status', ['unread', 'read']);
    }
  }, {
    key: "getSpecificMessage",
    value: function getSpecificMessage(index) {
      var specificMessage = this.messages[index];
      return specificMessage;
    }
  }, {
    key: "getSentMessages",
    value: function getSentMessages() {
      var sentMessages = (0, _filterData.default)(this.messages, 'status', ['sent']);
      return sentMessages;
    }
  }, {
    key: "getUnreadMessages",
    value: function getUnreadMessages() {
      var unreadMessages = (0, _filterData.default)(this.messages, 'status', ['unread']);
      return unreadMessages;
    }
  }, {
    key: "deleteSpecificMessage",
    value: function deleteSpecificMessage(index) {
      var deletedMessage = this.messages.splice(index, 1)[0];
      return deletedMessage;
    }
  }, {
    key: "sendMessage",
    value: function sendMessage(payload) {
      var id = (0, _idGenerator.default)(this.messages) + 1;
      var createdOn = new Date(_moment.default.HTML5_FMT.DATETIME_LOCAL_MS);

      var message = _objectSpread({
        id: id,
        createdOn: createdOn
      }, payload, {
        status: 'sent'
      });

      this.messages.push(message);
      return message;
    }
  }]);

  return MessageModel;
}();

var _default = new MessageModel();

exports.default = _default;
//# sourceMappingURL=messageModel.js.map