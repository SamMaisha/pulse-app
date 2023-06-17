const db = require("../index");
const { Pool } = require("pg");

const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "final",
  port: 5432,
});

const addUser = function (user) {
  return new Promise((resolve, reject) => {
    pool
      .query(`INSERT INTO users (auth0_id, name) VALUES ($1, $2) RETURNING *`, [
        user.sub,
        user.name,
      ])
      .then((result) => {
        let newUser = result.rows;
        resolve(newUser);
      })
      .catch((err) => {
        reject(console.log(err.message));
      });
  });
};

const getAllUserIds = function () {
  return new Promise((resolve, reject) => {
    pool
      .query(`SELECT auth0_id FROM users`)
      .then((result) => {
        let allUserIds = result.rows;
        resolve(allUserIds);
      })
      .catch((err) => {
        reject(console.log(err.message));
      });
  });
};

const getUserId = function (auth0Id) {
  const queryParams = [auth0Id];
  const parameterizedQuery = `
  SELECT * from users
  WHERE auth0_id = $1
  `;
  return db.query(parameterizedQuery, queryParams).then((data) => {
    console.log(data.rows[0]);
    return data.rows[0];
  });
};

module.exports = {
  addUser,
  getAllUserIds,
  getUserId,
};
