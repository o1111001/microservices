require('dotenv').config();

const {
  USERS_PORT,
  BLOGGERS_PORT,
} = process.env;
console.log(BLOGGERS_PORT)
module.exports = {
  usersService: USERS_PORT,
  bloggersService: BLOGGERS_PORT,
};
