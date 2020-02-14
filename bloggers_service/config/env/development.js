require('dotenv').config();

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_DB_BLOGGERS,
  BLOGGERS_PORT,
  USERS_PORT,
  MONGO_URL,
} = process.env;

module.exports = {
  port: BLOGGERS_PORT || '0.0.0.0:50052',
  db: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_DB_BLOGGERS}?authSource=admin`,
  authPort: USERS_PORT || '0.0.0.0:50051',
};
