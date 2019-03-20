import serverResponse from '../utils/serverResponse';
import MessageModel from '../models/messageModel';

export default class messageControllers {
  static getAllMessages(req, res) {
    const allMessages = MessageModel.getAllMessages();
    return serverResponse(res, allMessages);
  }
  
  static getUnreadMessages(req, res) {
    const unreadMessages = MessageModel.getUnreadMessages();
    return serverResponse(res, unreadMessages);
  }
  
  static getSentMessages(req, res) {
    const sentMessages = MessageModel.getSentMessages();
    return serverResponse(res, sentMessages);
  }
  
  static getSpecificMessage(req, res) {
    const { id } = req.body;
    const singleMessage = MessageModel.getSpecificMessage(id);
    return serverResponse(res, singleMessage);
  }
  
  static deleteSpecificMessage(req, res) {
    const { id } = req.body;
    const deletedMessage = MessageModel.deleteSpecificMessage(id);
    return serverResponse(res, { message: deletedMessage.message });
  }
  
  static sendMessage(req, res) {
    const message = MessageModel.sendMessage(req.body);
    return serverResponse(res, { message });
  }
}
