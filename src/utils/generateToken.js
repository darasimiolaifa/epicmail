import JWT from 'jsonwebtoken';

export default (user) => {
  return JWT.sign({
    iss: 'epicmail',
    sub: user,
  }, process.env.APP_SECRET);
};
