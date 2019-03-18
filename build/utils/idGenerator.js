"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(data) {
  return data.map(function (element) {
    return element.id;
  }).reduce(function (highest, currentValue) {
    return Math.max(highest, currentValue);
  });
};

exports.default = _default;
//# sourceMappingURL=idGenerator.js.map