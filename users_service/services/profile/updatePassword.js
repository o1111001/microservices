const { ProfileRepo, SessionRepo } = require('../../repositories');
const { getUserIdByToken } = require('../../helpers');

async function updatePassword(call, callback) {
  try {
    const session = new SessionRepo(call.request);
    const userId = await getUserIdByToken(session);
    if (userId instanceof Error) {
      return callback(null, {
        success: false,
        message: 'Invalid token',
      });
    }
    const profile = new ProfileRepo(call.request);
    const updatedUser = await profile.updatePasswordByUserId(userId);
    if (updatedUser) {
      return callback(null, {
        success: true,
        message: 'Password has been updated',
      });
    }
    return callback(null, {
      success: false,
      message: 'Error',
    });
  } catch (error) {
    return callback(null, { success: false, message: 'Internal error' });
  }
}

module.exports = updatePassword;
