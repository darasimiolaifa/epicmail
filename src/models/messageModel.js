import queryFunction from '../database';

class MessageModel {
  static async getAllReceivedMessages(userId) {
    const query = 'SELECT * FROM messages INNER JOIN inbox on messages.id = inbox.message_id WHERE inbox.user_id = $1';
    try {
      const messages = await queryFunction.query(query, [userId]);
      return messages;
    } catch (error) {
      return error;
    }
  }
  
  static async getSpecificMessage(id) {
    const query = 'SELECT * FROM messages wHERE id = $1';
    try {
      const message = await queryFunction.query(query, [id]);
      return message;
    } catch (error) {
      return error;
    }
  }
  
  static async getSentMessages(senderId) {
    const query = 'SELECT * FROM messages wHERE sender_id = $1';
    try {
      const messages = await queryFunction.query(query, [senderId]);
      return messages;
    } catch (error) {
      return error;
    }
  }
  
  static async getUnreadMessages(userId) {
    const query = 'SELECT * FROM messages INNER JOIN inbox on messages.id = inbox.message_id WHERE inbox.user_id = $1 AND message.status = $2';
    try {
      const messages = await queryFunction.query(query, [userId, 'unread']);
      return messages;
    } catch (error) {
      return error;
    }
  }
  
  static async deleteSpecificMessage(user, messageId) {
    const selectQuery = 'SELECT senderId, status FROM messages INNER JOIN inbox ON inbox.message_id = messages.id WHERE message.id = $1';
    const deleteQuery = 'DELETE FROM messages WHERE id = $1 RETURNING *';
    try {
      const { rows } = await queryFunction.query(selectQuery, [messageId]);
      if (rows.sender_id === user.id && rows.status === 'read') {
        return { messaage: 'Message has been read already.' };
      }
      const message = await queryFunction.query(deleteQuery, [messageId]);
      return message;
    } catch (error) {
      return error;
    }
  }
  
  static async sendMessage(payload) {
    const {
      subject, message, senderId, receiverId,
    } = payload;
    const createdOn = new Date();
    const messageQuery = 'INSERT INTO messages(subject, message, created_on, sender_id, receiver_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING id';
    const inboxQuery = 'INSERT INTO inbox(receiver_id, message_id, status) VALUES($1, $2, $3) RETURNING *';
    try {
      const { rows } = await queryFunction.query(messageQuery,
        [subject, message, createdOn, senderId, receiverId]);
      const result = await queryFunction.query(inboxQuery, [receiverId, rows.id, 'unread']);
      return { ...rows, inbox_id: result.id };
    } catch (error) {
      return error;
    }
  }
}

export default MessageModel;
