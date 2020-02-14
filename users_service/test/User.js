class User {
  constructor(fields) {
    const {
      email,
      password,
      role,
      name,
      token,
    } = fields;
    this._email = email;
    this._password = password;
    this._role = role;
    this._name = name;
    this._token = token;
  }
  get email() {
    return this._email;
  }
  get role() {
    return this._role;
  }
  get name() {
    return this._name;
  }
  set name(newName) {
    this._name = newName;
  }
  get password() {
    return this._password;
  }
  set password(newPassword) {
    this._password = newPassword;
  }
  get token() {
    return this._token;
  }
  set token(newToken) {
    this._token = newToken;
  }

  getAll() {
    return {
      email: this._email,
      password: this._password,
      role: this._role,
      name: this._name,
      token: this._token,
    };
  }
}

const user = new User({
  email: 'email1@gmail.com',
  password: '1',
  name: 'name1',
  role: 'user',
});

module.exports = user;
