const { UserRepo } = require('../../repositories');

const checkFields = request => {
  if (
    !request.email ||
    !request.password ||
    !request.role ||
    !request.name ||
    !['user', 'blogger'].includes(request.role)
  ) return true;
  return false;
};

async function signUp(call, callback) {
  try {
    const { request } = call;
    if (checkFields(request)) {
      return callback({ success: false, message: 'Fieds are empty or wrong' });
    }

    const user = new UserRepo(request);
    const existsEmail = await user.existenceCheckByEmail();
    const existsUsername = await user.existenceCheckByName();

    if (existsEmail || existsUsername) {
      return callback(null, { success: false, message: 'User already exists' });
    }

    const savedUser = await user.createUser();
    if (savedUser) {
      return callback(null, { success: true, message: 'User saved' });
    }
    return callback(null, { success: false, message: 'Internal error' });
  } catch (error) {
    return callback(null, { success: false, message: 'Internal error' });
  }
}

module.exports = signUp;
