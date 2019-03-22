class sanitizeInput {
  static checkParams(param) {
    if (param.search(new RegExp(/[^0-9]/)) > -1) {
      return `${param} should be a number.`;
    }
    return true;
  }
  
  static convertToLowerCase(input) {
    const newInput = input.map((each) => {
      each.toLowerCase();
    });
    return newInput;
  }
  
  static stripWhiteSpace(input) {
    const newInput = input.replace(' ', '');
    return newInput;
  }
}
