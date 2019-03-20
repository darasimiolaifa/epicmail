import checkMissingRequiredValues from './checkMissingRequiredValues';
import validateUsername from './validateUsername';
import validatePassword from './validatePassword';
import serverResponse from '../../utils/serverResponse';
import userModel from '../../models/userModel';

const validateAuthData = async (req, res, next) => {
  let required;
  const { url, body } = req;
  const users = await userModel.getAllusers();
  
  if (url === '/api/v1/auth/signup') {
    required = ['firstName', 'lastName', 'username', 'password'];
  } else {
    required = ['username', 'password'];
  }
  let error;
  
  const missingAndEmptyErrors = checkMissingRequiredValues(req.body, required, error);
  const invalidUsernameErrors = validateUsername(url, users, body.username);
  const invalidPasswordErrors = validatePassword(url, users, body.password, body.username);
  
  error = { ...missingAndEmptyErrors };
  error.invalidInput = { ...invalidUsernameErrors, ...invalidPasswordErrors };
  
  const status = Math.max(
    200,
    missingAndEmptyErrors.status,
    invalidUsernameErrors.status,
    invalidPasswordErrors.status,
  );
  
  if (status !== 200) {
    return serverResponse(res, error, status);
  }
  
  return next();
};

export default validateAuthData;
