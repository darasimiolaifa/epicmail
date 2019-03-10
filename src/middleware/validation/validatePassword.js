import bcrypt from 'bcryptjs';

export default (url, users, password, username) => {
  const passwordErrors = [];
  const error = {};
  let status = 200;
  
  if (url === '/api/v1/auth/signup') {
    if (password.length < 8) {
      passwordErrors.push('Passwords must be 8 characters or more in length');
      status = 400;
    }
  } else {
    const foundUser = users.find(user => user.username === username);
    if (foundUser) {
      if (foundUser.password !== bcrypt.hashSync(password, foundUser.salt)) {
        passwordErrors.push('Username and password does not match');
        status = 400;
      }
    } else {
      status = 404;
    }
  }
  error.password = passwordErrors;
  error.status = status;
  return error;
};
