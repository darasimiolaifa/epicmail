export default (data, condition, values) => {
  const returnedData = [];
  values.forEach((value) => {
    const match = data.filter(element => element[condition] === value);
    returnedData.push(...match);
  });
  return returnedData;
};
