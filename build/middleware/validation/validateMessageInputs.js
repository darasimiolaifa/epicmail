"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _checkMissingRequiredValues = _interopRequireDefault(require("./checkMissingRequiredValues"));

var _messageData = _interopRequireDefault(require("../../dummy/messageData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateMessageInputs = function validateMessageInputs(req, res, next) {
  var required = ['message', 'senderId', 'status', 'subject'];
  var error = {};
  var status = 200;
  var missingValueStatus = (0, _checkMissingRequiredValues.default)(req.body, required);

  if (missingValueStatus.hasErrors) {
    var missingValues = missingValueStatus.missingValues,
        statusCode = missingValueStatus.statusCode;
    error.missingValues = missingValues;
    status = statusCode;
  }

  if (status !== 200) {
    return res.status(status).send({
      status: status,
      error: error
    });
  }

  next();
};

var _default = validateMessageInputs;
exports.default = _default;
//# sourceMappingURL=validateMessageInputs.js.map