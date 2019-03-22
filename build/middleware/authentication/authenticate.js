"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _database = _interopRequireDefault(require("../../database"));

var _serverResponse = _interopRequireDefault(require("../../utils/serverResponse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Authenticate = {
  verifyToken: function verifyToken(req, res, next) {
    return _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var token, _ref, sub, username, query, _ref2, rows, _rows, user;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              token = req.headers['x-access-token'];

              if (token) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", (0, _serverResponse.default)(res, 'Token is not provided', 400));

            case 3:
              _context.prev = 3;
              _context.next = 6;
              return _jsonwebtoken.default.verify(token, process.env.APP_SECRET);

            case 6:
              _ref = _context.sent;
              sub = _ref.sub;
              username = sub.username;
              query = 'SELECT * FROM users WHERE username = $1';
              _context.next = 12;
              return _database.default.query(query, [username]);

            case 12:
              _ref2 = _context.sent;
              rows = _ref2.rows;

              if (rows[0]) {
                _context.next = 16;
                break;
              }

              return _context.abrupt("return", (0, _serverResponse.default)(res, 'The token you provided is invalid', 400));

            case 16:
              _rows = _slicedToArray(rows, 1), user = _rows[0];
              req.user = user;
              return _context.abrupt("return", next());

            case 21:
              _context.prev = 21;
              _context.t0 = _context["catch"](3);
              return _context.abrupt("return", (0, _serverResponse.default)(res, _context.t0.message, 400));

            case 24:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 21]]);
    }))();
  }
};
var _default = Authenticate;
exports.default = _default;
//# sourceMappingURL=authenticate.js.map