import queryFunction from '../database';

class MessageModel {
  static async getAllReceivedMessages(userId) {
    const query = 'SELECT * FROM messages INNER JOIN inbox on messages.id = inbox.message_id WHERE inbox.receiver_id = $1';
    try {
      const { rows } = await queryFunction.query(query, [userId]);
      return rows;
    } catch (error) {
      return error;
    }
  }
  
  static async getSpecificMessage(id) {
    const query = 'SELECT * FROM messages wHERE id = $1';
    try {
      const { rows } = await queryFunction.query(query, [id]);
      return rows[0];
    } catch (error) {
      return error;
    }
  }
  
  static async getSentMessages(user) {
    const query = 'SELECT * FROM messages wHERE sender_id = $1';
    try {
      const { rows } = await queryFunction.query(query, [user.id]);
      return rows;
    } catch (error) {
      return error;
    }
  }
  
  static async getUnreadMessages(userId) {
    const query = 'SELECT * FROM messages INNER JOIN inbox on messages.id = inbox.message_id WHERE inbox.receiver_id = $1 AND inbox.status = $2';
    try {
      const { rows } = await queryFunction.query(query, [userId, 'unread']);
      return rows;
    } catch (error) {
      return error;
    }
  }
  
  static async deleteSpecificMessage(user, messageId) {
    const selectQuery = 'SELECT sender_id, status FROM messages INNER JOIN inbox ON inbox.message_id = messages.id WHERE messages.id = $1';
    const deleteQuery = 'DELETE FROM messages WHERE id = $1 RETURNING *';
    try {
      const { rows } = await queryFunction.query(selectQuery, [messageId]);
      if (rows[0].sender_id !== user.id) {
        return { messaage: 'This message is not yours. You do not have access to it.' };
      }
      if (rows.status === 'read') {
        return { messaage: 'Message has been read already.' };
      }
      const message = await queryFunction.query(deleteQuery, [messageId]);
      return message.rows[0];
    } catch (error) {
      return error;
    }
  }
  
  static async sendMessage(payload) {
    const {
      subject, message, receiverEmail,
    } = payload.body;
    const { user } = payload;
    const createdOn = new Date();
    const receiverQuery = 'SELECT * FROM users WHERE email = $1';
    const messageQuery = 'INSERT INTO messages(subject, message, created_on, sender_id) VALUES($1, $2, $3, $4) RETURNING *';
    const inboxQuery = 'INSERT INTO inbox(receiver_id, message_id, status) VALUES($1, $2, $3) RETURNING *';
    try {
      const receiverResult = await queryFunction.query(receiverQuery, [receiverEmail]);
      const receiverId = receiverResult.rows[0].id;
      const { rows } = await queryFunction.query(messageQuery,
        [subject, message, createdOn, user.id]);
      const savedMessage = rows[0];
      const results = await queryFunction.query(inboxQuery, [receiverId, savedMessage.id, 'unread']);
      const inboxMessage = results.rows[0];
      return { ...savedMessage, inbox_id: inboxMessage.id };
    } catch (error) {
      return error;
    }
  }
}

export default MessageModel;
