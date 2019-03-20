import jwt from 'jsonwebtoken';
import queryFunction from '../../database';
import serverResponse from '../../utils/serverResponse';

const Authenticate = {
  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return serverResponse(res, 'Token is not provided', 400);
    }
    try {
      const decodedUser = await jwt.verify(token, process.env.SECRET);
      const query = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await queryFunction.query(query, [decodedUser.id]);
      if (!rows[0]) {
        return serverResponse(res, 'The token you provided is invalid', 400);
      }
      req.user = decodedUser;
      return next();
    } catch (error) {
      return serverResponse(res, error.message, 400);
    }
  },
};

export default Authenticate;
