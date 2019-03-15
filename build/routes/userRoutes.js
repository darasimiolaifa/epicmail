"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _userController = _interopRequireDefault(require("../controllers/userController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAllUsers = _userController.default.getAllUsers,
    getUserById = _userController.default.getUserById;

var _default = function _default(app) {
  // get all users
  app.route('/api/v1/users').get(getAllUsers); // get specific user

  app.route('/api/v1/users/:id').get(getUserById);
};

exports.default = _default;
//# sourceMappingURL=userRoutes.js.map