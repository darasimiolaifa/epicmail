export default (formInput, required) => {
  const missingValues = [];
  const error = {};
  let status = 200;
  
  const fields = Object.entries(formInput);
  for (let index = 0; index < fields.length; index++) {
    const [key, value] = [...fields[index]];
    
    // populate missing but required values errors
    if (value === '' && required.includes(key)) {
      missingValues.push(key);
      status = 400;
    }
  }
  error.missingValues = missingValues;
  error.status = status;
  return error;
};
