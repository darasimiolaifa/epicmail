"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var sanitizeInput =
/*#__PURE__*/
function () {
  function sanitizeInput() {
    _classCallCheck(this, sanitizeInput);
  }

  _createClass(sanitizeInput, null, [{
    key: "checkParams",
    value: function checkParams(param) {
      if (param.search(new RegExp(/[^0-9]/)) > -1) {
        return false;
      }

      return true;
    }
  }, {
    key: "convertToLowerCase",
    value: function convertToLowerCase(input) {
      var newInput = input.map(function (each) {
        each.toLowerCase();
      });
      return newInput;
    }
  }, {
    key: "stripWhiteSpace",
    value: function stripWhiteSpace(input) {
      var newInput = input.replace(' ', '');
      return newInput;
    }
  }]);

  return sanitizeInput;
}();

var _default = sanitizeInput;
exports.default = _default;
//# sourceMappingURL=sanitizeInput.js.map