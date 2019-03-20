import serverResponse from '../utils/serverResponse';
import generateToken from '../utils/generateToken';
import userModel from '../models/userModel';

export default class authControllers {
  static async signup(req, res) {
    const response = await userModel.createUser(req.body);
    if (response.name && response.name === 'error') {
      return serverResponse(res, response, 500);
    }
    // generate token with users object
    const [user] = response;
    const token = generateToken(user);
    return serverResponse(res, { token, user }, 201);
  }
  
  static login(req, res) {
    const user = { ...req.body };
    const token = generateToken(user);
    return serverResponse(res, { token });
  }
}
