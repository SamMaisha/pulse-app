// PG database client/connection setup
//require("dotenv").config();
require("dotenv").config({ path: "../.env" });
const { Pool } = require("pg");

const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

console.log(dbParams);

const db = new Pool(dbParams);

db.connect();

module.exports = db;