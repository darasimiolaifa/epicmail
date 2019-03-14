"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(res, data) {
  var status = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;
  var response;

  if (status > 299) {
    response = {
      status: status,
      error: data
    };
  } else {
    response = {
      status: status,
      data: data
    };
  }

  res.setHeader('Accepts', 'application/json');
  res.status(status).send(response);
};

exports.default = _default;
//# sourceMappingURL=serverResponse.js.map