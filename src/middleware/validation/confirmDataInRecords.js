import messageData from '../../dummy/messageData';
import serverResponse from '../../utils/serverResponse';

export default (req, res, next) => {
  const { id } = req.params;
  const index = messageData.findIndex(message => message.id === Number(id));
  if (index === -1) {
    const error = 'Message does not exist in our records';
    return serverResponse(res, error, 404);
  }
  req.body.index = index;
  return next();
};
