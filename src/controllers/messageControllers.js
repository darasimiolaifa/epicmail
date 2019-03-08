import messageData from '../dummy/messageData';

export default class messageControllers {
  static getAllMessages(req, res) {
    const allMessages = messageData.filter(message => message.status === 'read' || message.status === 'unread');
    res.setHeader('content-type', 'application/json');
    return res.status(200).send({
      status: 200,
      data: allMessages,
    });
  }
  
  static getAllUnreadMessages(req, res) {
    const unreadMessages = messageData.filter(message => message.status === 'unread');
    res.setHeader('content-type', 'application/json');
    return res.status(200).send({
      status: 200,
      data: unreadMessages,
    });
  }
}
