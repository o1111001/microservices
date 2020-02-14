const { UserRepo, SessionRepo } = require('../../repositories');
const { getUserIdByToken } = require('../../helpers');

const checkFields = request => {
  if (!request.token) return true;
  return false;
};

async function auth(call, callback) {
  try {
    const { request } = call;
    if (checkFields(request)) {
      return callback(null, { success: false, message: 'Token is required' });
    }

    const session = new SessionRepo(call.request);
    const userId = await getUserIdByToken(session);
    if (userId instanceof Error) {
      return callback(null, {
        success: false,
        message: 'Invalid token',
      });
    }

    const userRepo = new UserRepo(call.request);
    const user = await userRepo.getUserById(userId);
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
