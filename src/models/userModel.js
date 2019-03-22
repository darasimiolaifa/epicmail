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
  
  static async getUserbyUsername(username) {
    const query = 'SELECT * FROM users WHERE username = $1';
    try {
      const { rows } = await queryFunction.query(query, [username]);
      return rows[0];
    } catch (error) {
      return error;
    }
  }
  
  static async getUserbyEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await queryFunction.query(query, [email]);
      return rows[0];
    } catch (error) {
      return error;
    }
  }
  
  static async getUserbyId(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    try {
      const { rows } = await queryFunction.query(query, [id]);
      return rows[0];
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
    const email = `${username.toLowerCase()}@epicmail.com`;
    const createdOn = new Date();
    const query = 'INSERT INTO users(first_name, last_name, password, created_on, username, email) VALUES($1, $2, $3, $4, $5, $6) RETURNING id, first_name, last_name, username';
    try {
      const { rows } = await queryFunction.query(query, [
        firstName,
        lastName,
        hashedPassword,
        createdOn,
        username.toLowerCase(),
        email,
      ]);
      return rows;
    } catch (error) {
      return error;
    }
  }
  
  static async deleteUserbyId(id) {
    const query = 'DELETE * FROM users wHERE id = $1 RETURNING *';
    try {
      const { rows } = await queryFunction.query(query, [id]);
      return rows;
    } catch (error) {
      return error;
    }
  }
}

export default UserModel;
