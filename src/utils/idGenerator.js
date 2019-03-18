export default (data) => {
  return data
    .map(element => element.id)
    .reduce((highest, currentValue) => Math.max(highest, currentValue));
};
