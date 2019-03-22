"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sanitizeInput = _interopRequireDefault(require("./sanitizeInput"));

var _serverResponse = _interopRequireDefault(require("../../utils/serverResponse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _default = function _default(req, res, next) {
  var params = Object.entries(req.params);

  for (var index = 0; index < params.length; index += 1) {
    var _ref = _toConsumableArray(params[index]),
        key = _ref[0],
        value = _ref[1];

    if (!_sanitizeInput.default.checkParams(value)) {
      return (0, _serverResponse.default)(res, "".concat(key, " should be a number"), 400);
    }
  }

  return next();
};

exports.default = _default;
//# sourceMappingURL=checkParams.js.map