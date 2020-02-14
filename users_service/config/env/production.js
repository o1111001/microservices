require('dotenv').config();

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_URL,
  MONGO_DB_USERS,
  USERS_PORT,
} = process.env;

module.exports = {
  port: USERS_PORT || '0.0.0.0:50051',
  db: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_DB_USERS}?authSource=admin`,
};
