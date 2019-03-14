import checkMissingRequiredValues from './checkMissingRequiredValues';
import validateUsername from './validateUsername';
import validatePassword from './validatePassword';
import users from '../../dummy/usersData';
import serverResponse from '../../controllers/authHelpers/serverResponse';

const validateAuthData = (req, res, next) => {
  let required;
  const { url, body } = req;
  
  if (url === '/api/v1/auth/signup') {
    required = ['firstname', 'lastname', 'username', 'password'];
  } else {
    required = ['username', 'password'];
  }
  let error;
  
  const missingValues = checkMissingRequiredValues(req.body, required, error);
  const invalidUsernameErrors = validateUsername(url, users, body.username);
  const invalidPasswordErrors = validatePassword(url, users, body.password, body.username);
  
  error = { ...missingValues };
  error.invalidInput = { ...invalidUsernameErrors, ...invalidPasswordErrors };
  
  const status = Math.max(200, missingValues.status, invalidUsernameErrors.status, invalidPasswordErrors.status);
  if (status !== 200) {
    return serverResponse(res, error, status);
  }
  next();
};

export default validateAuthData;
