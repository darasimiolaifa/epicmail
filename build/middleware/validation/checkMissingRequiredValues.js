"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var checkMissingRequiredValues = function checkMissingRequiredValues(formInput, required) {
  var missingValues = [];
  var hasErrors;
  var statusCode;
  var fields = Object.entries(formInput);

  for (var index = 0; index < fields.length; index++) {
    var _ref = _toConsumableArray(fields[index]),
        key = _ref[0],
        value = _ref[1]; // populate missing but required values errors


    if (value === '' && required.includes(key)) {
      missingValues.push(key);
    }
  }

  if (missingValues.length > 0) {
    hasErrors = true;
    statusCode = 400;
  }

  return {
    missingValues: missingValues,
    statusCode: statusCode,
    hasErrors: hasErrors
  };
};

var _default = checkMissingRequiredValues;
exports.default = _default;
//# sourceMappingURL=checkMissingRequiredValues.js.map