const { getUserId } = require('../../client');

const checkUserNameExistence = request => {
  if (!request.name) return null;
  return request.name;
};

const getUserIdByUsername = request => new Promise(resolve => {
  const name = checkUserNameExistence(request);
  if (!name) {
    return resolve(null);
  }
  getUserId({ name }, (err, value) => {
    if (err) {
      return resolve(null);
    }
    if (!value.userId) {
      return resolve(null);
    }
    return resolve(value.userId);
  });
});

module.exports = {
  getUserIdByUsername,
};
