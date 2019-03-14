import messageControllers from '../controllers/messageControllers';
import validateMessageInputs from '../middleware/validation/validateMessageInputs';
import checkMessageExist from '../middleware/validation/confirmDataInRecords';

const {
  getAllMessages,
  getAllUnreadMessages,
  getAllSentMessages,
  getSpecificMessage,
  deleteSpecificMessage,
  sendMessage,
} = messageControllers;

export default (app) => {
  app.route('/api/v1/messages')
    .get(getAllMessages)
    .post(validateMessageInputs, sendMessage);
  
  app.route('/api/v1/messages/unread')
    .get(getAllUnreadMessages);
  
  app.route('/api/v1/messages/sent')
    .get(getAllSentMessages);

  app.route('/api/v1/messages/:id')
    .get(checkMessageExist, getSpecificMessage)
    .delete(checkMessageExist, deleteSpecificMessage);
};
