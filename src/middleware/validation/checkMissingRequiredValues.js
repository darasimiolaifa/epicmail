const checkMissingRequiredValues = (formInput, required) => {
  const missingValues = [];
  
  let hasErrors;
  let statusCode;
  
  const fields = Object.entries(formInput);
  for (let index = 0; index < fields.length; index++) {
    const [key, value] = [...fields[index]];
    
    // populate missing but required values errors
    if (value === '' && required.includes(key)) {
      missingValues.push(key);
    }
  }
  
  if (missingValues.length > 0) {
    hasErrors = true;
    statusCode = 400;
  }
  
  return { missingValues, statusCode, hasErrors };
};

export default checkMissingRequiredValues;
