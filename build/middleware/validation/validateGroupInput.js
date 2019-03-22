"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _checkMissingRequiredValues = _interopRequireDefault(require("./checkMissingRequiredValues"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = function _default(req, res, next) {
  var required = ['name', 'description'];
  var missingValues = (0, _checkMissingRequiredValues.default)(req.body, required);

  var error = _objectSpread({}, missingValues);

  var status = Math.max(200, missingValues.status);

  if (status !== 200) {
    return res.status(status).send({
      status: status,
      error: error
    });
  }

  return next();
};

exports.default = _default;
//# sourceMappingURL=validateGroupInput.js.map