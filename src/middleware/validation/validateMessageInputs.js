import checkMissingRequiredValues from './checkMissingRequiredValues';

export default (req, res, next) => {
  const required = ['message', 'senderId', 'status', 'subject'];
  
  const missingValues = checkMissingRequiredValues(req.body, required);
  const error = { ...missingValues };
  
  const status = Math.max(200, missingValues.status);
  if (status !== 200) {
    return res.status(status).send({
      status,
      error,
    });
  }
  next();
};
