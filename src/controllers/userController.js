import users from '../dummy/usersData';
import serverResponse from '../utils/serverResponse';
import filterUser from '../utils/filterData';

export default class userControllers {
  static getAllUsers(req, res) {
    return serverResponse(res, users);
  }
  
  static getUserById(req, res) {
    const user = filterUser(users, 'id', req.id);
    return serverResponse(res, user);
  }
}
