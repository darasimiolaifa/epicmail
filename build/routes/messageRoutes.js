"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _messageControllers = _interopRequireDefault(require("../controllers/messageControllers"));

var _validateMessageInputs = _interopRequireDefault(require("../middleware/validation/validateMessageInputs"));

var _confirmDataInRecords = _interopRequireDefault(require("../middleware/validation/confirmDataInRecords"));

var _authenticate = _interopRequireDefault(require("../middleware/authentication/authenticate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAllMessages = _messageControllers.default.getAllMessages,
    getUnreadMessages = _messageControllers.default.getUnreadMessages,
    getSentMessages = _messageControllers.default.getSentMessages,
    getSpecificMessage = _messageControllers.default.getSpecificMessage,
    deleteSpecificMessage = _messageControllers.default.deleteSpecificMessage,
    sendMessage = _messageControllers.default.sendMessage;

var _default = function _default(app) {
  app.route('/api/v1/messages').get(_authenticate.default.verifyToken, getAllMessages).post(_validateMessageInputs.default, _authenticate.default.verifyToken, sendMessage);
  app.route('/api/v1/messages/unread').get(_authenticate.default.verifyToken, getUnreadMessages);
  app.route('/api/v1/messages/sent').get(_authenticate.default.verifyToken, getSentMessages);
  app.route('/api/v1/messages/:id').get(_authenticate.default.verifyToken, _confirmDataInRecords.default, getSpecificMessage).delete(_authenticate.default.verifyToken, _confirmDataInRecords.default, deleteSpecificMessage);
};

exports.default = _default;
//# sourceMappingURL=messageRoutes.js.map