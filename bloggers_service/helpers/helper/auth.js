const { auth } = require('../../client');

const checkTokenExistence = request => {
  if (!request.token) return null;
  return request.token;
};

const userAuth = request => new Promise(resolve => {
  const token = checkTokenExistence(request);
  if (!token) {
    return resolve(null);
  }
  auth({ token }, (err, value) => {
    if (err) {
      return resolve(null);
    }
    if (!value.success || !value.user) {
      return resolve(null);
    }
    return resolve(value.user);
  });
});

module.exports = {
  userAuth,
};
