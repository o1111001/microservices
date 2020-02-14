const { UserRepo } = require('../../repositories');

const checkName = request => {
  if (!request.name) return null;
  return request.name;
};

async function auth(call, callback) {
  try {
    const { request } = call;
    const name = checkName(request);

    if (!name) {
      return callback(null, { success: false, message: 'Username is required' });
    }

    const user = new UserRepo({ name });
    const existedUser = await user.getUserByName();
    if (existedUser) {
      return callback(null, {
        success: true,
        userId: existedUser._id,
      });
    }
    if (!user) {
      return callback(null, { success: false, message: 'User does not exist' });
    }

    const response = {
      success: true,
      user,
    };
    return callback(null, response);
  } catch (error) {
    return callback(null, { success: false, message: 'Internal error' });
  }
}

module.exports = auth;
