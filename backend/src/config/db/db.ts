import { Sequelize } from "sequelize";
import { DATABASE_URL_DIRECT } from "../env";

export const sequelize = new Sequelize(DATABASE_URL_DIRECT, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
