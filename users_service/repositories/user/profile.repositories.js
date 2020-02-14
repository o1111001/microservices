const User = require('../../models/User');
const BaseRepo = require('../base.repositories');
const bcrypt = require('bcrypt');

class ProfileRepo extends BaseRepo  {
  constructor(fields) {
    super(fields);
  }

  updatePasswordByUserId(id) {
    const { password } = this;
    const update = User.findByIdAndUpdate(id, {
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(8), null),
    }).exec();
    return update;
  }

  updateNameByUserId(id) {
    const { name } = this;
    const update = User.findByIdAndUpdate(id, {
      name,
    }).exec();
    return update;
  }

  deleteProfileByUserId(id) {
    const update = User.findByIdAndUpdate(id, {
      isDeleted: true,
    }).exec();
    return update;
  }
}



module.exports = ProfileRepo;
