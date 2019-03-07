import authControllers from '../controllers/authControllers';

const { signup, signin } = authControllers;

export default (app) => {
  // add signup route
  app.route('/api/v1/auth/signup')
    .post(signup.bind(authControllers));
  
  // add signin route
  app.route('/api/v1/auth/signin')
    .post(signin.bind(authControllers));
};
