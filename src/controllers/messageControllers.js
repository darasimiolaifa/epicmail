import serverResponse from '../utils/serverResponse';
import MessageModel from '../models/messageModel';

export default class messageControllers {
  static async getAllMessages(req, res) {
    const { user } = req;
    const allReceivedMessages = await MessageModel.getAllReceivedMessages(user.id);
    return serverResponse(res, allReceivedMessages);
  }
  
  static async getUnreadMessages(req, res) {
    const { user } = req;
    const unreadMessages = await MessageModel.getUnreadMessages(user.id);
    return serverResponse(res, unreadMessages);
  }
  
  static async getSentMessages(req, res) {
    const sentMessages = await MessageModel.getSentMessages();
    return serverResponse(res, sentMessages);
  }
  
  static async getSpecificMessage(req, res) {
    const { id } = req.params;
    const singleMessage = await MessageModel.getSpecificMessage(id);
    return serverResponse(res, singleMessage);
  }
  
  static async deleteSpecificMessage(req, res) {
    const { id } = req.params;
    const { user } = req;
    const deletedMessage = await MessageModel.deleteSpecificMessage(user, id);
    return serverResponse(res, { message: deletedMessage.message });
  }
  
  static async sendMessage(req, res) {
    const message = await MessageModel.sendMessage(req);
    return serverResponse(res, { message });
  }
}
