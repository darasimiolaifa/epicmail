import queryFunction from '../database';
import userModel from './userModel';

class GroupModel {
  static async getAllGroups(userId) {
    const query = 'SELECT * FROM groups WHERE owner_id = $1';
    try {
      const { rows } = await queryFunction.query(query, [userId]);
      return rows;
    } catch (error) {
      return error;
    }
  }
  
  static async createGroup(payload) {
    const {
      name, description,
    } = payload.body;
    const { user } = payload;
    console.log(payload.body);
    const createdOn = new Date();
    const nameCheck = 'SELECT * FROM groups WHERE name = $1';
    const query = 'INSERT INTO groups (name, description, owner_id, group_email, created_on) VALUES($1, $2, $3, $4, $5) RETURNING *';
    try {
      const { rowCount } = await queryFunction.query(nameCheck, [name]);
      if (rowCount > 0) {
        return { message: `The group name ${name} already exists. Please choose another` };
      }
      const groupEmail = `${name}@epicmail.com`;
      const { rows } = await queryFunction.query(query,
        [name, description, user.id, groupEmail, createdOn]);
      return rows[0];
    } catch (error) {
      return error;
    }
  }
  
  static async editGroupName(payload) {
    const { groupId, name } = payload;
    const { user } = payload;
    const query = 'UPDATE groups SET name = $1 WHERE id = $2 AND owner_id = $3 RETURNING *';
    try {
      const { rows } = await queryFunction.query(query, [name, groupId, user.id]);
      return rows[0];
    } catch (error) {
      return error;
    }
  }
  
  static async addUserToGroup(payload) {
    const { groupId, userEmail } = payload.body;
    const { user: owner } = payload;
    const newUser = userModel.getUserbyUsername(userEmail);
    const ownerShipQuery = 'SELECT * FROM groups WHERE group_id = $1';
    const query = 'INSERT INTO groups_members(group_id, user_id) VALUES($1, $2) RETURNING *';
    let response;
    try {
      const groupOwner = await queryFunction.query(ownerShipQuery, [groupId]);
      if (groupOwner.rowCount === 0) {
        response = { message: 'There is no such group in our records.' };
      } else if (groupOwner.rows[0].owner_id !== owner.id) {
        response = { message: 'You are not the owner of this group and so do not have access to it.' };
      } else {
        const { rows } = await queryFunction.query(query, [groupId, newUser.Id]);
        [response] = rows;
      }
      return response;
    } catch (error) {
      return error;
    }
  }
  
  static async deleteUserFromSpecificGroup(payload) {
    const { groupId, userEmail } = payload.body;
    const { user: owner } = payload;
    let response;
    const ownerShipQuery = 'SELECT * FROM groups WHERE group_id = $1';
    const newUser = userModel.getUserbyUsername(userEmail);
    const deleteQuery = 'DELETE FROM groups_members WHERE group_id = $1 AND member_id = $2 RETURNING *';
    try {
      const groupOwner = await queryFunction.query(ownerShipQuery, [groupId]);
      if (groupOwner.rowCount === 0) {
        response = { message: 'There is no such group in our records.' };
      } else if (groupOwner.rows[0].owner_id !== owner.id) {
        response = { message: 'You are not the owner of this group and so do not have access to it.' };
      } else {
        const { rows } = await queryFunction.query(deleteQuery, [groupId, newUser.Id]);
        response = { message: `User ${newUser.email} deleted from group successfully`, data: rows[0] };
      }
      return response;
    } catch (error) {
      return error;
    }
  }
  
  static async deleteSpecificGroup(payload) {
    const { groupId } = payload.body;
    const { user: owner } = payload;
    const ownerShipQuery = 'SELECT * FROM groups WHERE group_id = $1';
    const query = 'DELETE FROM groups WHERE id = $1';
    let response;
    try {
      const groupOwner = await queryFunction.query(ownerShipQuery, [groupId]);
      if (groupOwner.rowCount === 0) {
        response = { message: 'There is no such group in our records.' };
      } else if (groupOwner.rows[0].owner_id !== owner.id) {
        response = { message: 'You are not the owner of this group and so do not have access to it.' };
      } else {
        const { rows } = await queryFunction.query(query, [groupId, groupId]);
        [response] = rows;
      }
      return response;
    } catch (error) {
      return error;
    }
  }
}

export default GroupModel;
