import userControllers from '../controllers/userController';

const { getAllUsers, getUserById } = userControllers;

export default (app) => {
  // get all users
  app.route('/api/v1/users')
    .get(getAllUsers);
  
  // get specific user
  app.route('/api/v1/users/:id')
    .get(getUserById);
};
