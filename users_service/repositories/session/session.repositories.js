const UserSession = require('../../models/UserSession');
const BaseRepo = require('../base.repositories');

class Session extends BaseRepo  {
  constructor(fields) {
    super(fields);
  }

  createSession(userId) {
    const userSession = new UserSession();
    userSession.userId = userId;
    const session = userSession.save();
    return session;
  }

  getSessionByToken() {
    const { token } = this;
    const session = UserSession.findById(token).exec();
    return session;
  }

  deleteSessionByUserId(userId) {
    return UserSession.findOneAndRemove({ userId }).exec();
  }

  deleteSessionById(id) {
    UserSession.findByIdAndDelete(id).exec();
  }
}



module.exports = Session;
