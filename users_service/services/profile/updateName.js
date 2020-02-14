const { ProfileRepo, SessionRepo } = require('../../repositories');

async function updateName(call, callback) {
  try {
    const session = new SessionRepo(call.request);
    const currentSession = await session.getSessionByToken();
    if (!currentSession) {
      return callback(null, {
        success: false,
        message: 'Invalid token',
      });
    }
    const { userId } = currentSession;

    const profile = new ProfileRepo(call.request);
    const updatedUser = await profile.updateNameByUserId(userId);
    if (updatedUser) {
      return callback(null, {
        success: true,
        message: 'Name has been updated',
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

module.exports = updateName;
