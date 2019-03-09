import bcrypt from 'bcryptjs';

const validatePassword = (url, users, password, username) => {
  const passwordErrors = [];
  let statusCode = 400;
  let hasErrors;
  if (url === '/api/v1/auth/signup') {
    if (password.length < 8) {
      passwordErrors.push('Passwords must be 8 characters or more in length');
      hasErrors = true;
    }
  } else {
    const foundUser = users.find(user => user.username === username);
    if (foundUser) {
      if (foundUser.password !== bcrypt.hashSync(password, foundUser.salt)) {
        passwordErrors.push('Username and password does not match');
        hasErrors = true;
      }
    } else {
      statusCode = 404;
    }
  }
  
  return { passwordErrors, statusCode, hasErrors };
};

export default validatePassword;
