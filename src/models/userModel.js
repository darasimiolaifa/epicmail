import bcrypt from 'bcryptjs';
import queryFunction from '../database';

class UserModel {
  static async getAllusers() {
    const query = 'SELECT * FROM users';
    try {
      const { rows } = await queryFunction.query(query);
      return rows;
    } catch (error) {
      return error;
    }
  }
  
  static async getUserbyId(id) {
    const query = 'SELECT * FROM users wHERE id = $1';
    try {
      const { user } = await queryFunction.query(query, [id]);
      return user;
    } catch (error) {
      return error;
    }
  }
  
  static async createUser(payload) {
    const {
      username, password, firstName, lastName,
    } = payload;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const email = `${username}@epicmail.com`;
    const createdOn = new Date();
    const query = 'INSERT INTO users(first_name, last_name, password, created_on, username, email) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
    try {
      const { rows } = await queryFunction.query(query,
        [firstName, lastName, hashedPassword, createdOn, username, email]);
      return rows;
    } catch (error) {
      return error;
    }
  }
}

export default UserModel;
