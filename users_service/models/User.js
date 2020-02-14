const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    default: '',
  },
  password: {
    type: String,
    default: '',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
