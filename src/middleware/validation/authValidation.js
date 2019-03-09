import checkMissingRequiredValues from './checkMissingRequiredValues';
import validateUsername from './validateUsername';
import validatePassword from './validatePassword';
import users from '../../dummy/usersData';

const validateAuthData = (req, res, next) => {
  let required;
  const { url, body } = req;
  
  if (url === '/api/v1/auth/signup') {
    required = ['firstname', 'lastname', 'username', 'password'];
  } else {
    required = ['username', 'password'];
  }
  
  const error = { invalidInput: {} };
  let status = 200;
  
  const missingValueStatus = checkMissingRequiredValues(req.body, required);
  if (missingValueStatus.hasErrors) {
    const { missingValues, statusCode } = missingValueStatus;
    error.missingValues = missingValues;
    status = statusCode;
  }
  
  const invalidUsername = validateUsername(url, users, body.username);
  if (invalidUsername.hasErrors) {
    const { usernameErrors, statusCode } = invalidUsername;
    error.invalidInput.username = usernameErrors;
    status = statusCode;
  }
  
  const invalidPassword = validatePassword(url, users, body.password, body.username);
  if (invalidPassword.hasErrors) {
    const { passwordErrors, statusCode } = invalidPassword;
    error.invalidInput.password = passwordErrors;
    status = statusCode;
  }
  
  if (status !== 200) {
    return res.status(status).send({
      status,
      error,
    });
  }
  next();
};

export default validateAuthData;
