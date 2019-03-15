"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _messageData = _interopRequireDefault(require("../dummy/messageData"));

var _idGenerator = _interopRequireDefault(require("./authHelpers/idGenerator"));

var _serverResponse = _interopRequireDefault(require("./authHelpers/serverResponse"));

var _filterData = _interopRequireDefault(require("./authHelpers/filterData"));

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
      var allMessages = (0, _filterData.default)(_messageData.default, 'status', ['read', 'unread']);
      return (0, _serverResponse.default)(res, allMessages);
    }
  }, {
    key: "getAllUnreadMessages",
    value: function getAllUnreadMessages(req, res) {
      var unreadMessages = (0, _filterData.default)(_messageData.default, 'status', ['unread']);
      return (0, _serverResponse.default)(res, unreadMessages);
    }
  }, {
    key: "getAllSentMessages",
    value: function getAllSentMessages(req, res) {
      var sentMessages = (0, _filterData.default)(_messageData.default, 'status', ['sent']);
      return (0, _serverResponse.default)(res, sentMessages);
    }
  }, {
    key: "getSpecificMessage",
    value: function getSpecificMessage(req, res) {
      var index = req.body.index;
      var singleMessage = _messageData.default[index];
      return (0, _serverResponse.default)(res, singleMessage);
    }
  }, {
    key: "deleteSpecificMessage",
    value: function deleteSpecificMessage(req, res) {
      var index = req.body.index;

      var deletedMessage = _messageData.default.splice(index, 1)[0];

      return (0, _serverResponse.default)(res, {
        message: deletedMessage.message
      });
    }
  }, {
    key: "sendMessage",
    value: function sendMessage(req, res) {
      var id = (0, _idGenerator.default)(_messageData.default) + 1;
      var createdOn = new Date(_moment.default.HTML5_FMT.DATETIME_LOCAL_MS);

      var message = _objectSpread({
        id: id,
        createdOn: createdOn
      }, req.body, {
        status: 'sent'
      });

      _messageData.default.push(message);

      return (0, _serverResponse.default)(res, {
        message: message
      });
    }
  }]);

  return messageControllers;
}();

exports.default = messageControllers;
//# sourceMappingURL=messageControllers.js.map