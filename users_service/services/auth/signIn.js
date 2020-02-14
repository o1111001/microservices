const { UserRepo, SessionRepo } = require('../../repositories');

async function signIn(call, callback) {
  try {
    const user = new UserRepo(call.request);
    const existedUser = await user.getUserByEmail();
    if (!existedUser || existedUser.isDeleted) {
      return callback(null, {
        success: false,
        message: 'Invalid credentials',
      });
    }

    const { _id } = existedUser;
    const isCorrectPassword = await user.checkPassword(existedUser);
    if (!isCorrectPassword) {
      return callback(null, {
        success: false,
        message: 'Invalid credentials',
      });
    }
    const session = new SessionRepo(call.request);
    await session.deleteSessionByUserId(_id);
    const createdSession = await session.createSession(_id);

    const response = {
      success: true,
      token: createdSession._id,
    };
    return callback(null, response);
  } catch (error) {
    return callback(null, { success: false, message: 'Internal error' });
  }
}

module.exports = signIn;
