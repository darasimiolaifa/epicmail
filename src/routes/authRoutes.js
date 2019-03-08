/* eslint-disable no-trailing-spaces */
import authControllers from '../controllers/authControllers';
import validateInput from '../middleware/validation/validateInput';

const { signup, login } = authControllers;

export default (app) => {
  // add signup route
  app.route('/api/v1/auth/signup')
    .post(validateInput, signup);
  
  // add signin route
  app.route('/api/v1/auth/login')
    .post(validateInput, login);
};
