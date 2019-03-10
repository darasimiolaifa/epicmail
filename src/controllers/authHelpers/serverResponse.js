export default (res, data, status = 200) => {
  let response;
  if (status > 299) {
    response = { status, error: data };
  } else {
    response = { status, data };
  }
  res.setHeader('Accepts', 'application/json');
  res.status(status).send(response);
};
