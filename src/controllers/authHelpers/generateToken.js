import JWT from 'jsonwebtoken';

export default (username) => {
  return JWT.sign({
    iss: 'epicmail',
    sub: username,
  }, process.env.APP_SECRET);
};
