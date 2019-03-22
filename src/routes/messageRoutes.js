import messageControllers from '../controllers/messageControllers';
import validateMessageInputs from '../middleware/validation/validateMessageInputs';
import checkMessageExist from '../middleware/validation/confirmDataInRecords';
import Authenticate from '../middleware/authentication/authenticate';
import checkParams from '../middleware/validation/checkParams';

const {
  getAllMessages,
  getUnreadMessages,
  getSentMessages,
  getSpecificMessage,
  deleteSpecificMessage,
  sendMessage,
} = messageControllers;

export default (app) => {
  app.route('/api/v1/messages')
    .get(Authenticate.verifyToken, getAllMessages)
    .post(validateMessageInputs, Authenticate.verifyToken, sendMessage);
  
  app.route('/api/v1/messages/unread')
    .get(Authenticate.verifyToken, getUnreadMessages);
  
  app.route('/api/v1/messages/sent')
    .get(Authenticate.verifyToken, getSentMessages);

  app.route('/api/v1/messages/:id')
    .get(Authenticate.verifyToken, checkMessageExist, checkParams, getSpecificMessage)
    .delete(Authenticate.verifyToken, checkMessageExist, checkParams, deleteSpecificMessage);
};
