"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _serverResponse = _interopRequireDefault(require("../../utils/serverResponse"));

var _database = _interopRequireDefault(require("../../database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var id, messageCheck, _ref2, rowCount, error;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = req.params.id;
            messageCheck = 'SELECT * FROM messages where id = $1';
            _context.prev = 2;
            _context.next = 5;
            return _database.default.query(messageCheck, [id]);

          case 5:
            _ref2 = _context.sent;
            rowCount = _ref2.rowCount;

            if (!(rowCount === 0)) {
              _context.next = 10;
              break;
            }

            error = 'Message does not exist in our records';
            return _context.abrupt("return", (0, _serverResponse.default)(res, error, 404));

          case 10:
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](2);
            return _context.abrupt("return", _context.t0);

          case 15:
            return _context.abrupt("return", next());

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 12]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;
//# sourceMappingURL=confirmDataInRecords.js.map