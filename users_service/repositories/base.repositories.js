class BaseRepo {
  constructor(fields) {
    const {
      name,
      email,
      password,
      role,
      token,
    } = fields;

    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.token = token;
  }
}

module.exports = BaseRepo;
