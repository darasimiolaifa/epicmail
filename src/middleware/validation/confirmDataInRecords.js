import serverResponse from '../../utils/serverResponse';
import queryFunction from '../../database';

export default async (req, res, next) => {
  const { id } = req.params;
  const messageCheck = 'SELECT * FROM messages where id = $1';
  try {
    const { rowCount } = await queryFunction.query(messageCheck, [id]);
    if (rowCount === 0) {
      const error = 'Message does not exist in our records';
      return serverResponse(res, error, 404);
    }
  } catch (error) {
    return error;
  }
  return next();
};
