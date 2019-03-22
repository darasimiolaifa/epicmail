"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _serverResponse = _interopRequireDefault(require("../utils/serverResponse"));

var _generateToken = _interopRequireDefault(require("../utils/generateToken"));

var _userModel = _interopRequireDefault(require("../models/userModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var authControllers =
/*#__PURE__*/
function () {
  function authControllers() {
    _classCallCheck(this, authControllers);
  }

  _createClass(authControllers, null, [{
    key: "signup",
    value: function () {
      var _signup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var response, _response, user, token;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _userModel.default.createUser(req.body);

              case 2:
                response = _context.sent;

                if (!(response.name && response.name === 'error')) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", (0, _serverResponse.default)(res, response, 500));

              case 5:
                // generate token with users object
                _response = _slicedToArray(response, 1), user = _response[0];
                token = (0, _generateToken.default)(user);
                return _context.abrupt("return", (0, _serverResponse.default)(res, {
                  token: token,
                  user: user
                }, 201));

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function signup(_x, _x2) {
        return _signup.apply(this, arguments);
      }

      return signup;
    }()
  }, {
    key: "login",
    value: function () {
      var _login = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var username, user, token;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                username = req.body.username;
                _context2.next = 3;
                return _userModel.default.getUserbyUsername(username);

              case 3:
                user = _context2.sent;
                token = (0, _generateToken.default)(user);
                return _context2.abrupt("return", (0, _serverResponse.default)(res, {
                  token: token
                }));

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function login(_x3, _x4) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }]);

  return authControllers;
}();

exports.default = authControllers;
//# sourceMappingURL=authControllers.js.map