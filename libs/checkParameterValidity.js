module.exports = (req, allowedParams) => {
  const params = Object.keys(req.body);
  //params.forEach((param) => console.log(allowedParams.includes(param), param));
  return params.every((param) => allowedParams.includes(param));
};
