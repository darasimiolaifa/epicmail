export default (url, users, username) => {
  const usernameErrors = [];
  const error = {};
  let status = 200;
  
  if (url === '/api/v1/auth/signup') {
    if (users.findIndex(user => user.username.toLowerCase() === username.toLowerCase()) > -1) {
      usernameErrors.push('The username already exists. Please choose another.');
    }
    if (username.search(new RegExp(/[^0-9A-za-z._]/)) > -1) {
      usernameErrors.push('Username should contain only alphanumeric characters, and the underscore character');
    }
    if (usernameErrors.length > 0) {
      status = 400;
    }
  } else {
    const userIndex = users
      .findIndex(user => user.username.toLowerCase() === username.toLowerCase()) === -1;
    if (userIndex) {
      usernameErrors.push('This username does not exist in our records.');
      status = 404;
    }
  }
  error.username = usernameErrors;
  error.status = status;
  return error;
};
