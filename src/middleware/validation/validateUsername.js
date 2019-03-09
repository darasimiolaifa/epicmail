const validateUsername = (url, users, username) => {
  const usernameErrors = [];
  let hasErrors;
  let statusCode;
  
  if (url === '/api/v1/auth/signup') {
    
    if (users.findIndex(user => user.username === username) > -1) {
      usernameErrors.push('The username already exists. Please choose another.');
    }
    
    if (username.search(new RegExp(/[^0-9A-za-z._]/)) > -1) {
      usernameErrors.push('Username should contain only alphanumeric, the dot, and underscore characters');
    }
    
    if (usernameErrors.length > 0) {
      statusCode = 400;
      hasErrors = true;
    }
  } 
  
  else {
    const userIndex = users.findIndex(user => user.username === username) === -1;
    if (userIndex) {
      usernameErrors.push('This username does not exist in our records.');
      statusCode = 404;
      hasErrors = true;
    }
  }
  
  return { usernameErrors, statusCode, hasErrors };
};

export default validateUsername;
