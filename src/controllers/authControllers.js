/* eslint-disable no-trailing-spaces */
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import users from '../dummy/usersData';

export default class authControllers {
  static signup(req, res) {
    const { username, password } = req.body;
    
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);
    const id = users.length + 1;
    const email = `${username}@epicmail.com`;
    
    users.push({
      id,
      email,
      salt,
      ...req.body,
      password: hashedPassword,
    });
    
    // generate token with users username
    const token = JWT.sign({
      iss: 'epicmail',
      sub: username,
    }, process.env.APP_SECRET);
    
    return res.status(201).send({
      status: 201,
      data: {
        token,
      },
    });
  }
  
  static login(req, res) {
    const { username } = req.body;
    
    const token = JWT.sign({
      iss: 'epicmail',
      sub: username,
    }, process.env.APP_SECRET);
    
    return res.status(200).send({
      status: 200,
      data: {
        token,
      },
    });
  }
}
