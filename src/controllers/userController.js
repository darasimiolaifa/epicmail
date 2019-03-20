import serverResponse from '../utils/serverResponse';
import userModel from '../models/userModel';

export default class userControllers {
  static async getAllUsers(req, res) {
    const response = await userModel.getAllusers();
    if (response.name && response.name === 'error') {
      return serverResponse(res, response, 500);
    }
    return serverResponse(res, response);
  }
  
  static async getUserById(req, res) {
    const { id } = req.params;
    const response = await userModel.getUserbyId(id);
    if (response.name && response.name === 'error') {
      return serverResponse(res, response, 500);
    }
    return serverResponse(res, response);
  }
}
