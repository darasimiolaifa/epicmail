import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import users from '../dummy/usersData';

const authControllers = {
  signup(req, res) {
    // if any field in req.body is empty, return a 404 error
    const responseCode = this.checkRequestData(req.body);
    if (responseCode === 400) {
      return res.status(400).send({
        status: 400,
        error: 'There are missing fields in the data submitted. Please locate them, refill your form, and resubmit',
      });
    }
    
    // Check for unique username
    const { username, password } = req.body;
    
    if (users.findIndex(user => user.username === username) > -1) {
      return res.status(400).send({
        status: 400,
        error: 'The username already exists. Please choose another one',
      });
    }
    
    // else hash password and add the payload to users
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
    const token = this.generateToken(username);
    
    return res.status(201).send({
      status: 201,
      data: {
        token,
      },
    });
  },
  
  signin(req, res) {
    // check for empty fields in request
    const responseCode = this.checkRequestData(req.body);
    if (responseCode === 400) {
      return res.status(400).send({
        status: 400,
        error: 'There are missing fields in the data submitted. Please locate them, refill your form, and resubmit',
      });
    }
    
    const { username, password } = req.body;
    const foundUser = users.find(user => user.username === username);
    
    // check records for verified username
    if (!foundUser) {
      return res.status(404).send({
        status: 404,
        error: 'The username does not exist in our records',
      });
    }
    
    // check if password entered matches records
    if (foundUser.password !== bcrypt.hashSync(password, foundUser.salt)) {
      return res.status(400).send({
        status: 400,
        error: 'The password entered does not match the one in our record',
      });
    }
    
    const token = this.generateToken(username);
    
    return res.status(200).send({
      status: 200,
      token,
    });
  },
  
  checkRequestData(data) {
    const fields = Object.entries(data);
    let responseCode;
    for (let index = 0; index < fields.length; index++) {
      if (fields[index][1] === '') {
        responseCode = 400;
      }
    }
    return responseCode;
  },
  
  generateToken(username) {
    const token = JWT.sign({
      iss: 'epicmail',
      sub: username,
    }, process.env.APP_SECRET);
    
    return token;
  },
};

export default authControllers;
