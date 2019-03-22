import serverResponse from '../utils/serverResponse';
import GroupModel from '../models/groupModel';

export default class groupControllers {
  static async getAllGroups(req, res) {
    const { user } = req;
    const allUserGroups = await GroupModel.getAllGroups(user.id);
    return serverResponse(res, allUserGroups);
  }
  
  static async createGroup(req, res) {
    const newGroup = await GroupModel.createGroup(req);
    return serverResponse(res, newGroup);
  }
  
  static async editGroupName(req, res) {
    const editedGroup = await GroupModel.editGroupName(req);
    return serverResponse(res, editedGroup);
  }
  
  static async addUserToGroup(req, res) {
    const newGroupUser = await GroupModel.addUserToGroup(req);
    return serverResponse(res, newGroupUser);
  }
  
  static async deleteUserFromSpecificGroup(req, res) {
    const deletedUser = await GroupModel.deleteUserFromSpecificGroup(req);
    return serverResponse(res, { message: deletedUser });
  }
  
  static async deleteSpecificGroup(req, res) {
    const message = await GroupModel.deleteSpecificGroup(req);
    return serverResponse(res, { message });
  }
}
