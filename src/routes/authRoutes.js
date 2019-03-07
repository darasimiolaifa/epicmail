import authControllers from '../controllers/authControllers';

const { signup } = authControllers;

export default (app) => {
  app.route('/api/v1/auth/signup')
    .post(signup);
};
