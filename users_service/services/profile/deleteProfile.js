const { ProfileRepo, SessionRepo } = require('../../repositories');

async function deleteProfile(call, callback) {
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
    const updatedUser = await profile.deleteProfileByUserId(userId);

    await session.deleteSessionByUserId(userId);

    if (updatedUser) {
      return callback(null, {
        success: true,
        message: 'Profile has been deleted',
      });
    }
    return callback(null, {
      success: false,
      message: 'Internal error',
    });
  } catch (error) {
    return callback(null, { success: false, message: 'Internal error' });
  }
}

module.exports = deleteProfile;
