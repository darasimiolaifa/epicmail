import serverResponse from '../utils/serverResponse';
import generateToken from '../utils/generateToken';
import userModel from '../models/userModel';

export default class authControllers {
  static signup(req, res) {
    const user = userModel.createUser(req.body);
    
    // generate token with users object
    const token = generateToken(user);
    return serverResponse(res, { token, user }, 201);
  }
  
  static login(req, res) {
    const user = { ...req.body };
    const token = generateToken(user);
    return serverResponse(res, { token });
  }
}
