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
  
  static getAllSentMessages(req, res) {
    const sentMessages = messageData.filter(message => message.status === 'sent');
    res.setHeader('content-type', 'application/json');
    return res.status(200).send({
      status: 200,
      data: sentMessages,
    });
  }
  
  static getSpecificMessage(req, res) {
    const { id } = req.params;
    const singleMessage = messageData.filter(message => message.id === Number(id))[0];
    res.setHeader('content-type', 'application/json');
    if (!singleMessage) {
      return res.status(404).send({
        status: 404,
        error: 'Message not found in our database',
      });
    }
    
    return res.status(200).send({
      status: 200,
      data: singleMessage,
    });
  }
}
