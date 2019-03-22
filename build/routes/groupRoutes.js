"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _groupControllers = _interopRequireDefault(require("../controllers/groupControllers"));

var _authenticate = _interopRequireDefault(require("../middleware/authentication/authenticate"));

var _validateGroupInput = _interopRequireDefault(require("../middleware/validation/validateGroupInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAllGroups = _groupControllers.default.getAllGroups,
    createGroup = _groupControllers.default.createGroup,
    addUserToGroup = _groupControllers.default.addUserToGroup,
    editGroupName = _groupControllers.default.editGroupName,
    deleteUserFromSpecificGroup = _groupControllers.default.deleteUserFromSpecificGroup,
    deleteSpecificGroup = _groupControllers.default.deleteSpecificGroup;

var _default = function _default(app) {
  app.route('/api/v1/groups').get(_authenticate.default.verifyToken, getAllGroups).post(_authenticate.default.verifyToken, _validateGroupInput.default, createGroup);
  app.route('/api/v1/groups/:groupId/name').patch(_authenticate.default.verifyToken, editGroupName);
  app.route('/api/v1/groups/:groupId/users').post(_authenticate.default.verifyToken, addUserToGroup);
  app.route('/api/v1/groups/:groupId/users/:userId').delete(_authenticate.default.verifyToken, deleteUserFromSpecificGroup);
  app.route('/api/v1/groups/:groupId').delete(_authenticate.default.verifyToken, deleteSpecificGroup);
};

exports.default = _default;
//# sourceMappingURL=groupRoutes.js.map