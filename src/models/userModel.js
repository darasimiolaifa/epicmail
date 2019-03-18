import bcrypt from 'bcryptjs';
import filterUser from '../utils/filterData';
import generateUserId from '../utils/idGenerator';
import userData from '../dummy/usersData';

class UserModel {
  constructor() {
    this.users = userData;
  }
  
  getAllusers() {
    return this.users;
  }
  
  getUserbyId(id) {
    const user = filterUser(this.user, 'id', id);
    return user;
  }
  
  createUser(payload) {
    const { username, password } = payload;
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);
    const email = `${username}@epicmail.com`;
    const id = generateUserId(this.users) + 1;
    
    const user = {
      id,
      email,
      salt,
      ...payload,
      password: hashedPassword,
    };
    
    this.users.push(user);
    return user;
  }
}

export default new UserModel();
