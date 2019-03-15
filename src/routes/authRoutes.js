import authControllers from '../controllers/authControllers';
import authValidator from '../middleware/validation/authValidation';

const { signup, login } = authControllers;

export default (app) => {
  // add signup route
  app.route('/api/v1/auth/signup')
    .post(authValidator, signup);
  
  // add signin route
  app.route('/api/v1/auth/login')
    .post(authValidator, login);
};
