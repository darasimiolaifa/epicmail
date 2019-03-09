"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _messageControllers = _interopRequireDefault(require("../controllers/messageControllers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAllMessages = _messageControllers.default.getAllMessages,
    getAllUnreadMessages = _messageControllers.default.getAllUnreadMessages,
    getAllSentMessages = _messageControllers.default.getAllSentMessages,
    getSpecificMessage = _messageControllers.default.getSpecificMessage,
    deleteSpecificMessage = _messageControllers.default.deleteSpecificMessage;

var _default = function _default(app) {
  app.route('/api/v1/messages').get(getAllMessages);
  app.route('/api/v1/messages/unread').get(getAllUnreadMessages);
  app.route('/api/v1/messages/sent').get(getAllSentMessages);
  app.route('/api/v1/messages/:id').get(getSpecificMessage).delete(deleteSpecificMessage);
};

exports.default = _default;
//# sourceMappingURL=messageRoutes.js.map