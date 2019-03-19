import moment from 'moment';
import filterMessages from '../utils/filterData';
import generateIDFromData from '../utils/idGenerator';
import messagesData from '../dummy/messageData';

class MessageModel {
  constructor() {
    this.messages = messagesData;
  }
  
  getAllMessages() {
    return filterMessages(this.messages, 'status', ['unread', 'read']);
  }
  
  getSpecificMessage(index) {
    const specificMessage = this.messages[index];
    return specificMessage;
  }
  
  getSentMessages() {
    const sentMessages = filterMessages(this.messages, 'status', ['sent']);
    return sentMessages;
  }
  
  getUnreadMessages() {
    const unreadMessages = filterMessages(this.messages, 'status', ['unread']);
    return unreadMessages;
  }
  
  deleteSpecificMessage(index) {
    const deletedMessage = this.messages.splice(index, 1)[0];
    return deletedMessage;
  }
  
  sendMessage(payload) {
    const id = generateIDFromData(this.messages) + 1;
    const createdOn = new Date(moment.HTML5_FMT.DATETIME_LOCAL_MS);
    const message = {
      id,
      createdOn,
      ...payload,
      status: 'sent',
    };
    this.messages.push(message);
    return message;
  }
}

export default new MessageModel();
