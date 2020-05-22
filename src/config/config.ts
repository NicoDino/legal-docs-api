import * as dotenv from "dotenv";
dotenv.config();

export default {
  APP: process.env.APP,
  PORT: process.env.PORT,

  DB_DIALECT: process.env.DB_DIALECT,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRATION: process.env.JWT_EXPIRATION,
  SALT_ROUNDS: process.env.SALT_ROUNDS,
};
