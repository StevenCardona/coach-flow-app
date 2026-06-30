require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}.local`,
});

const dialectOptions = {
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
};

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    dialectOptions,
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    dialectOptions,
  },
};
