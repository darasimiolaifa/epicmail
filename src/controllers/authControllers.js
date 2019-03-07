import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import users from '../dummy/usersData';

const authControllers = {
  signup(req, res) {
    const userProperties = ['firstname', 'lastname', 'password', 'username'];
    const sortedRequestProperties = Object.keys(req.body).sort();
    
    // if fields in req.body do not match expectations, send 404 error
    if (!(JSON.stringify(userProperties) === JSON.stringify(sortedRequestProperties))) {
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
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());
    const id = users.length + 1;
    const email = `${username}@epicmail.com`;
    users.push({
      id,
      email,
      ...req.body,
      password: hashedPassword,
    });
    
    // generate token with users username
    const secret = process.env.APP_SECRET;
    const token = JWT.sign({
      iss: 'epicmail',
      sub: username,
    }, secret);
    
    return res.status(201).send({
      status: 201,
      data: {
        token,
      },
    });
  },
};

export default authControllers;
