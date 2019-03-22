import sanitizeInput from './sanitizeInput';
import serverResponse from '../../utils/serverResponse';

export default (req, res, next) => {
  const params = Object.entries(req.params);
  for (let index = 0; index < params.length; index += 1) {
    const [key, value] = [...params[index]];
    if (!sanitizeInput.checkParams(value)) {
      return serverResponse(res, `${key} should be a number`, 400);
    }
  }
  
  return next();
};
