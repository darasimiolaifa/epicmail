import messageControllers from '../controllers/messageControllers';

const { getAllMessages } = messageControllers;

export default (app) => {
  app.route('/api/v1/messages')
    .get(getAllMessages);
};
