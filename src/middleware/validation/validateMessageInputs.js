import checkMissingRequiredValues from './checkMissingRequiredValues';
import users from '../../dummy/messageData';

const validateMessageInputs = (req, res, next) => {
  const required = ['message', 'senderId', 'status', 'subject'];
  const error = {};
  let status = 200;
  
  const missingValueStatus = checkMissingRequiredValues(req.body, required);
  if (missingValueStatus.hasErrors) {
    const { missingValues, statusCode } = missingValueStatus;
    error.missingValues = missingValues;
    status = statusCode;
  }
  if (status !== 200) {
    return res.status(status).send({
      status,
      error,
    });
  }
  next();
};
export default validateMessageInputs;
