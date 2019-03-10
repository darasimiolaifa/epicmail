"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = require("dotenv");

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _authRoutes = _interopRequireDefault(require("./routes/authRoutes"));

var _messageRoutes = _interopRequireDefault(require("./routes/messageRoutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)();
var app = (0, _express.default)();
var port = process.env.PORT || 3000; // configure app to use middlewares

app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
})); // add API routes to app

(0, _authRoutes.default)(app);
(0, _messageRoutes.default)(app);
app.listen(port, function () {
  return console.log("App listening on port ".concat(port));
});
var _default = app;
exports.default = _default;
//# sourceMappingURL=server.js.map