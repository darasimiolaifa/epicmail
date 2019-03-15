export default (formInput, required) => {
  const missingValues = [];
  const emptyValues = [];
  const error = {};
  let status = 200;
  
  const fields = Object.entries(formInput);
  for (let index = 0; index < fields.length; index += 1) {
    const [key, value] = [...fields[index]];
    if (!required.includes(key)) {
      missingValues.push(`You didn't fill the ${key} field. It is required. Kindly input a value`);
    }
    // populate missing but required values errors
    if (value.toString().trim() === '' && required.includes(key)) {
      emptyValues.push(`${key} field is empty. Please send a value`);
      status = 400;
    }
  }
  error.missingValues = missingValues;
  error.emptyValues = emptyValues;
  error.status = status;
  return error;
};
