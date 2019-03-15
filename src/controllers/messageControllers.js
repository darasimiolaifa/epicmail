import moment from 'moment';
import messageData from '../dummy/messageData';
import generateIDFromData from './authHelpers/idGenerator';
import serverResponse from './authHelpers/serverResponse';
import filterMessages from './authHelpers/filterData';

export default class messageControllers {
  static getAllMessages(req, res) {
    const allMessages = filterMessages(messageData, 'status', ['read', 'unread']);
    return serverResponse(res, allMessages);
  }
  
  static getAllUnreadMessages(req, res) {
    const unreadMessages = filterMessages(messageData, 'status', ['unread']);
    return serverResponse(res, unreadMessages);
  }
  
  static getAllSentMessages(req, res) {
    const sentMessages = filterMessages(messageData, 'status', ['sent']);
    return serverResponse(res, sentMessages);
  }
  
  static getSpecificMessage(req, res) {
    const { index } = req.body;
    const singleMessage = messageData[index];
    return serverResponse(res, singleMessage);
  }
  
  static deleteSpecificMessage(req, res) {
    const { index } = req.body;
    const deletedMessage = messageData.splice(index, 1)[0];
    return serverResponse(res, { message: deletedMessage.message });
  }
  
  static sendMessage(req, res) {
    const id = generateIDFromData(messageData) + 1;
    const createdOn = new Date(moment.HTML5_FMT.DATETIME_LOCAL_MS);
    const message = {
      id,
      createdOn,
      ...req.body,
      status: 'sent',
    };
    messageData.push(message);
    return serverResponse(res, { message });
  }
}
