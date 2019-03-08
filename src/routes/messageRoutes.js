import messageControllers from '../controllers/messageControllers';

const {
  getAllMessages,
  getAllUnreadMessages,
} = messageControllers;

export default (app) => {
  app.route('/api/v1/messages')
    .get(getAllMessages);
  
  app.route('/api/v1/messages/unread')
    .get(getAllUnreadMessages);
};
