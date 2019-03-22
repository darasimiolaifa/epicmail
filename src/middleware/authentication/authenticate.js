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
      const { sub } = await jwt.verify(token, process.env.APP_SECRET);
      const { username } = sub;
      const query = 'SELECT * FROM users WHERE username = $1';
      const { rows } = await queryFunction.query(query, [username]);
      if (!rows[0]) {
        return serverResponse(res, 'The token you provided is invalid', 400);
      }
      const [user] = rows;
      req.user = user;
      return next();
    } catch (error) {
      return serverResponse(res, error.message, 400);
    }
  },
};

export default Authenticate;
