import bcrypt from 'bcryptjs';
import users from '../../dummy/usersData';

const validateUsername = (url, username) => {
  const usernameErrors = [];
  let statusCode;
  if (url === '/api/v1/auth/signup') {
    if (users.findIndex(user => user.username === username) > -1) {
      usernameErrors.push('The username already exists. Please choose another.');
    }
    if (username.search(new RegExp(/[^0-9A-za-z._]/)) > -1) {
      usernameErrors.push('Username should contain only alphanumeric, the dot, and underscore characters');
    }
    statusCode = 400;
  } else if (url === '/api/v1/auth/login') {
    if (users.findIndex(user => user.username === username) === -1) {
      usernameErrors.push('This username does not exist in our records.');
    }
    statusCode = 404;
  }
  return { usernameErrors, statusCode };
};

const validatePassword = (url, password, username) => {
  const passwordErrors = [];
  let statusCode = 400;
  if (url === '/api/v1/auth/signup') {
    if (password.length < 8) {
      passwordErrors.push('Passwords must be 8 characters or more in length');
    }
  } else if (url === '/api/v1/auth/login') {
    const foundUser = users.find(user => user.username === username);
    if (foundUser) {
      if (foundUser.password !== bcrypt.hashSync(password, foundUser.salt)) {
        passwordErrors.push('Username and password does not match');
      }
    } else {
      statusCode = 404;
    }
  }
  
  return { passwordErrors, statusCode };
};

const validateInput = (req, res, next) => {
  const error = {};
  error.missingValues = [];
  error.invalidInput = {};
  
  let hasErrors;
  let status;
  
  const fields = Object.entries(req.body);
  for (let index = 0; index < fields.length; index++) {
    const [key, value] = [...fields[index]];
    
    // populate missing values errors
    if (value === '') {
      error.missingValues.push(key);
      status = 400;
      hasErrors = true;
    } else {
      // validate username and populate invalid input array acoordingly
      if (key === 'username') {
        const invalid = validateUsername(req.url, value);
        if (invalid.usernameErrors.length !== 0) {
          error.invalidInput.username = invalid.usernameErrors;
          status = invalid.statusCode;
          hasErrors = true;
        }
      }
      
      // validate the password field and populte invalid input array accordingly
      if (key === 'password') {
        const { url, body } = req;
        const invalid = validatePassword(url, value, body.username);
        if (invalid.passwordErrors.length !== 0) {
          error.invalidInput.password = invalid.passwordErrors;
          hasErrors = true;
          status = invalid.statusCode;
        }
      }
    }
  }
  
  // if errors exixst, return errors and halt request
  if (hasErrors) {
    return res.status(status).send({
      status,
      error,
    });
  }
  // else run next middleware;
  next();
};

export default validateInput;
