/* eslint-disable no-trailing-spaces */
import bcrypt from 'bcryptjs';
import users from '../dummy/usersData';
import serverResponse from './authHelpers/serverResponse';
import generateToken from './authHelpers/generateToken';
import generateUserId from './authHelpers/idGenerator';

export default class authControllers {
  static signup(req, res) {
    const { username, password } = req.body;
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);
    const email = `${username}@epicmail.com`;
    const id = generateUserId(users) + 1;
    
    const user = {
      id,
      email,
      salt,
      ...req.body,
      password: hashedPassword,
    }; 
    users.push(user);
    
    // generate token with users username
    const token = generateToken(username);
    return serverResponse(res, { token, user }, 201);
  }
  
  static login(req, res) {
    const { username } = req.body; 
    const token = generateToken(username);
    return serverResponse(res, { token });
  }
}
