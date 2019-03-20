"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _checkMissingRequiredValues = _interopRequireDefault(require("./checkMissingRequiredValues"));

var _validateUsername = _interopRequireDefault(require("./validateUsername"));

var _validatePassword = _interopRequireDefault(require("./validatePassword"));

var _serverResponse = _interopRequireDefault(require("../../utils/serverResponse"));

var _userModel = _interopRequireDefault(require("../../models/userModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var validateAuthData =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var required, url, body, users, error, missingAndEmptyErrors, invalidUsernameErrors, invalidPasswordErrors, status;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = req.url, body = req.body;
            _context.next = 3;
            return _userModel.default.getAllusers();

          case 3:
            users = _context.sent;

            if (url === '/api/v1/auth/signup') {
              required = ['firstName', 'lastName', 'username', 'password'];
            } else {
              required = ['username', 'password'];
            }

            missingAndEmptyErrors = (0, _checkMissingRequiredValues.default)(req.body, required, error);
            invalidUsernameErrors = (0, _validateUsername.default)(url, users, body.username);
            invalidPasswordErrors = (0, _validatePassword.default)(url, users, body.password, body.username);
            error = _objectSpread({}, missingAndEmptyErrors);
            error.invalidInput = _objectSpread({}, invalidUsernameErrors, invalidPasswordErrors);
            status = Math.max(200, missingAndEmptyErrors.status, invalidUsernameErrors.status, invalidPasswordErrors.status);

            if (!(status !== 200)) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", (0, _serverResponse.default)(res, error, status));

          case 13:
            return _context.abrupt("return", next());

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function validateAuthData(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = validateAuthData;
exports.default = _default;
//# sourceMappingURL=authValidation.js.map