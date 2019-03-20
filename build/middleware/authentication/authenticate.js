"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _database = _interopRequireDefault(require("../../database"));

var _serverResponse = _interopRequireDefault(require("../../utils/serverResponse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Authenticate = {
  verifyToken: function verifyToken(req, res, next) {
    return _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var token, decodedUser, query, _ref, rows;

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
              return _jsonwebtoken.default.verify(token, process.env.SECRET);

            case 6:
              decodedUser = _context.sent;
              query = 'SELECT * FROM users WHERE id = $1';
              _context.next = 10;
              return _database.default.query(query, [decodedUser.id]);

            case 10:
              _ref = _context.sent;
              rows = _ref.rows;

              if (rows[0]) {
                _context.next = 14;
                break;
              }

              return _context.abrupt("return", (0, _serverResponse.default)(res, 'The token you provided is invalid', 400));

            case 14:
              req.user = decodedUser;
              return _context.abrupt("return", next());

            case 18:
              _context.prev = 18;
              _context.t0 = _context["catch"](3);
              return _context.abrupt("return", (0, _serverResponse.default)(res, _context.t0.message, 400));

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 18]]);
    }))();
  }
};
var _default = Authenticate;
exports.default = _default;
//# sourceMappingURL=authenticate.js.map