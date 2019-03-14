"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _messageData = _interopRequireDefault(require("../../dummy/messageData"));

var _serverResponse = _interopRequireDefault(require("../../controllers/authHelpers/serverResponse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(req, res, next) {
  var id = req.params.id;

  var index = _messageData.default.findIndex(function (message) {
    return message.id === Number(id);
  });

  if (index === -1) {
    var error = 'Message does not exist in our records';
    return (0, _serverResponse.default)(res, error, 404);
  }

  req.body.index = index;
  next();
};

exports.default = _default;
//# sourceMappingURL=confirmDataInRecords.js.map