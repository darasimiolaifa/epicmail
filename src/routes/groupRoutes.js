import groupControllers from '../controllers/groupControllers';
import Authenticate from '../middleware/authentication/authenticate';
import validateGroupInput from '../middleware/validation/validateGroupInput';

const {
  getAllGroups,
  createGroup,
  addUserToGroup,
  editGroupName,
  deleteUserFromSpecificGroup,
  deleteSpecificGroup,
} = groupControllers;

export default (app) => {
  app.route('/api/v1/groups')
    .get(Authenticate.verifyToken, getAllGroups)
    .post(Authenticate.verifyToken, validateGroupInput, createGroup);
  
  app.route('/api/v1/groups/:groupId/name')
    .patch(Authenticate.verifyToken, editGroupName);
    
  app.route('/api/v1/groups/:groupId/users')
    .post(addUserToGroup);
    
  app.route('/api/v1/groups/:groupId/users/:userId')
    .delete(deleteUserFromSpecificGroup);

  app.route('/api/v1/groups/:id')
    .delete(Authenticate.verifyToken, deleteSpecificGroup);
};
