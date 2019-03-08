import messageControllers from '../controllers/messageControllers';

const {
  getAllMessages,
  getAllUnreadMessages,
  getAllSentMessages,
} = messageControllers;

export default (app) => {
  app.route('/api/v1/messages')
    .get(getAllMessages);
  
  app.route('/api/v1/messages/unread')
    .get(getAllUnreadMessages);
    
  app.route('/api/v1/messages/sent')
    .get(getAllSentMessages);
};
