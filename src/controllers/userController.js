import users from '../dummy/usersData';
import serverResponse from './authHelpers/serverResponse';
import filterUser from './authHelpers/filterData';

export default class userControllers {
  static getAllUsers(req, res) {
    return serverResponse(res, users);
  }
  
  static getUserById(req, res) {
    const user = filterUser(users, 'id', req.id);
    return serverResponse(res, user);
  }
}
