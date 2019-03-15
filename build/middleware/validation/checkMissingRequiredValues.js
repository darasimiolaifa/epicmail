"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _default = function _default(formInput, required) {
  var missingValues = [];
  var emptyValues = [];
  var error = {};
  var status = 200;
  var fields = Object.entries(formInput);

  for (var index = 0; index < fields.length; index += 1) {
    var _ref = _toConsumableArray(fields[index]),
        key = _ref[0],
        value = _ref[1];

    if (!required.includes(key)) {
      missingValues.push("You didn't fill the ".concat(key, " field. It is required. Kindly input a value"));
    } // populate missing but required values errors


    if (value.toString().trim() === '' && required.includes(key)) {
      emptyValues.push("".concat(key, " field is empty. Please send a value"));
      status = 400;
    }
  }

  error.missingValues = missingValues;
  error.emptyValues = emptyValues;
  error.status = status;
  return error;
};

exports.default = _default;
//# sourceMappingURL=checkMissingRequiredValues.js.map