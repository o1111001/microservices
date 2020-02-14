const User = require('../../models/User');
const BaseRepo = require('../base.repositories');

class UserRepo extends BaseRepo  {
  constructor(fields) {
    super(fields);
  }

  createUser() {
    const newUser = new User();

    newUser.name = this.name;
    newUser.email = this.email;
    newUser.role = this.role;
    newUser.password = newUser.generateHash(this.password);

    const user = newUser.save();
    return user;
  }

  getUserById(id) {
    const user = User.findById(id).exec();
    return user;
  }

  getUserByEmail() {
    const { email } = this;
    const user = User.findOne({ email });
    return user;
  }

  getUserByName() {
    const { name } = this;
    const user = User.findOne({ name });
    return user;
  }

  checkPassword(user) {
    const { password } = this;
    const isValidPassword = user.validPassword(password);
    return isValidPassword;
  }

  existenceCheckByEmail() {
    const { email } = this;
    const user = User.findOne({ email });
    return user;
  }

  existenceCheckByName() {
    const { name } = this;
    const user = User.findOne({ name });
    return user;
  }
}



module.exports = UserRepo;
