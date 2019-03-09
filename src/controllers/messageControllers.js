import moment from 'moment';
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
  
  static deleteSpecificMessage(req, res) {
    const { id } = req.params;
    const messageIndex = messageData.findIndex(message => message.id === Number(id));
    res.setHeader('content-type', 'application/json');
    if (messageIndex === -1) {
      return res.status(404).send({
        status: 404,
        error: 'Message not found in our database',
      });
    }
    
    const deletedMessage = messageData.splice(messageIndex, 1)[0];
    return res.status(200).send({
      status: 200,
      data: {
        message: deletedMessage.message,
      },
    });
  }
  
  static sendMessage(req, res) {
    const highestId = messageData
      .map(mail => mail.id)
      .reduce((maximun, currentId) => Math.max(maximun, currentId));
    
    const id = highestId + 1;
    const createdOn = moment.HTML5_FMT.DATETIME_LOCAL_MS;
    const message = { id, createdOn, ...req.body };
    messageData.push(message);
    
    return res.status(200).send({
      status: 200,
      data: {
        message,
      },
    });
  }
}
